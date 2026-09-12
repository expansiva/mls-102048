/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewStatusReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IStatusReportRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { StatusReport } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';
import type { Project } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';

export interface ViewStatusReportInput {
  statusReportId: string;
}

export interface ViewStatusReportOutput {
  statusReportId: string;
  projectId: string;
  status: string;
  content: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  generatedAt: string;
  llmModelUsed?: string | null;
  sharedAt?: string | null;
  shareLink?: string | null;
  sharedWithEmail?: string | null;
  projectName: string;
  projectSiteAddress: string;
}

export async function viewStatusReport(
  ctx: RequestContext,
  input: ViewStatusReportInput,
): Promise<ViewStatusReportOutput> {
  const statusReports = resolveRepository<IStatusReportRepository>(ctx, 'StatusReport');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');

  // Step 1: Load the StatusReport by statusReportId
  const report: StatusReport = await statusReports.getById(input.statusReportId);

  // Step 2: Apply rule clientSeesPmStatusReport — report must be 'shared'
  if (String(report.status) !== 'shared') {
    throw new AppError(
      'VALIDATION_ERROR',
      'clientSeesPmStatusReport: the status report has not yet been shared by the PM.',
      400,
      { ruleId: 'clientSeesPmStatusReport', currentStatus: report.status },
    );
  }

  // Step 3: Verify sharedAt and shareLink are present
  if (report.sharedAt === null || report.shareLink === null) {
    throw new AppError(
      'VALIDATION_ERROR',
      'clientSeesPmStatusReport: the report was not properly shared (missing sharedAt or shareLink).',
      400,
      { ruleId: 'clientSeesPmStatusReport', sharedAt: report.sharedAt, shareLink: report.shareLink },
    );
  }

  // Step 4: Load the parent Project to enrich the response
  const project: Project = await projects.getById(report.projectId);

  // Step 5: Return the full report content along with project context fields
  return {
    statusReportId: report.statusReportId,
    projectId: report.projectId,
    status: report.status,
    content: report.content,
    reportPeriodStart: report.reportPeriodStart,
    reportPeriodEnd: report.reportPeriodEnd,
    generatedAt: report.generatedAt,
    llmModelUsed: report.llmModelUsed,
    sharedAt: report.sharedAt,
    shareLink: report.shareLink,
    sharedWithEmail: report.sharedWithEmail,
    projectName: project.name,
    projectSiteAddress: project.siteAddress,
  };
}
