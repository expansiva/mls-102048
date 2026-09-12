/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/shareStatusReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IStatusReportRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { StatusReport } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';
import { canTransitionStatusReport, validateStatusReportInvariants } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';

export interface ShareStatusReportInput {
  statusReportId: string;
  sharedWithEmail: string;
}

export interface ShareStatusReportOutput {
  statusReportId: string;
  status: string;
  sharedAt: string;
  shareLink: string;
  sharedWithEmail: string;
}

export async function shareStatusReport(
  ctx: RequestContext,
  input: ShareStatusReportInput,
): Promise<ShareStatusReportOutput> {
  const statusReports = resolveRepository<IStatusReportRepository>(ctx, 'StatusReport');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');

  // 1. Load the StatusReport by statusReportId
  const report = await statusReports.getById(input.statusReportId);
  if (!report) {
    throw new AppError('NOT_FOUND', `StatusReport not found: ${input.statusReportId}`, 404, {
      statusReportId: input.statusReportId,
    });
  }

  // 2. Validate the report status is 'generated'
  if (report.status !== 'generated') {
    throw new AppError(
      'VALIDATION_ERROR',
      'clientSeesPmStatusReport: the status report must be in "generated" state before sharing.',
      400,
      { ruleId: 'clientSeesPmStatusReport', currentStatus: report.status },
    );
  }

  // Check domain transition is allowed
  if (!canTransitionStatusReport(report.status, 'shared')) {
    throw new AppError(
      'CONFLICT',
      'StatusReport cannot transition from current status to "shared".',
      409,
      { ruleId: 'clientSeesPmStatusReport', from: report.status, to: 'shared' },
    );
  }

  // 3. Load the parent Project to obtain clientId
  const project = await projects.getById(report.projectId);
  if (!project) {
    throw new AppError('NOT_FOUND', `Project not found: ${report.projectId}`, 404, {
      projectId: report.projectId,
    });
  }

  // 4. Resolve the Client from MDM by clientId to verify it exists
  const clientEntity = await ctx.mdm.entity.get({ mdmId: project.clientId });
  if (!clientEntity) {
    throw new AppError('NOT_FOUND', `Client not found in MDM: ${project.clientId}`, 404, {
      clientId: project.clientId,
    });
  }

  // 5. Resolve actorId from session context
  const actorId = ctx.sessionContext.actorSession.actorId ?? null;

  // 6 & 7. Generate sharedAt and shareLink token
  const now = ctx.clock.nowIso();
  const shareToken = ctx.idGenerator.newId();
  const shareLink = `/shared/status-report/${report.statusReportId}?token=${shareToken}`;

  // 8. Mutate the StatusReport
  const updatedReport: StatusReport = {
    ...report,
    status: 'shared',
    sharedAt: now,
    shareLink,
    sharedWithEmail: input.sharedWithEmail,
    updatedAt: now,
  };

  // Validate invariants before saving
  const violations = validateStatusReportInvariants(updatedReport);
  if (violations.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      `StatusReport invariant violations: ${violations.join('; ')}`,
      400,
      { ruleId: 'clientSeesPmStatusReport', violations },
    );
  }

  // 9. Save inside a transaction
  await ctx.data.runInTransaction(async () => {
    await statusReports.save(updatedReport);
  });

  // 10. Return the output
  return {
    statusReportId: updatedReport.statusReportId,
    status: updatedReport.status,
    sharedAt: updatedReport.sharedAt as string,
    shareLink: updatedReport.shareLink as string,
    sharedWithEmail: updatedReport.sharedWithEmail as string,
  };
}
