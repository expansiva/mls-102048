/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProjectStatus.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { Project, ProjectStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import {
  canTransitionProject,
  projectEndDateMustBeOnOrAfterStartDate,
  projectClientIdMustBeSetToActivate,
} from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

export interface UpdateProjectStatusInput {
  projectId: string;
  status: string;
  cancellationReason?: string;
}

export interface UpdateProjectStatusOutput {
  projectId: string;
  name: string;
  status: string;
  completedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  updatedAt: string;
}

const ALLOWED_STATUSES: ProjectStatus[] = ['active', 'completed', 'cancelled'];

export async function updateProjectStatus(
  ctx: RequestContext,
  input: UpdateProjectStatusInput,
): Promise<UpdateProjectStatusOutput> {
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const materialUsages = resolveRepository<IMaterialUsageRepository>(ctx, 'MaterialUsage');

  // Step 1: Load the Project aggregate by projectId
  let project: Project;
  try {
    project = await projects.getById(input.projectId);
  } catch {
    throw new AppError('NOT_FOUND', `Project not found: ${input.projectId}`, 404, {
      projectId: input.projectId,
    });
  }

  // Step 2: Validate the requested status is one of the allowed enum values
  if (!ALLOWED_STATUSES.includes(input.status as ProjectStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid status "${input.status}". Allowed values: active, completed, cancelled.`,
      400,
      { providedStatus: input.status, allowedStatuses: ALLOWED_STATUSES },
    );
  }
  const newStatus = input.status as ProjectStatus;

  // Check domain state transition
  if (!canTransitionProject(project.status, newStatus)) {
    throw new AppError(
      'CONFLICT',
      `Cannot transition project from "${project.status}" to "${newStatus}".`,
      409,
      { currentStatus: project.status, requestedStatus: newStatus },
    );
  }

  // Step 3: Apply rule projectDateRangeValid
  if (!projectEndDateMustBeOnOrAfterStartDate(project)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'projectDateRangeValid: project endDate must be on or after startDate.',
      400,
      { ruleId: 'projectDateRangeValid', startDate: project.startDate, endDate: project.endDate },
    );
  }

  // Step 4: Apply rule projectRequiresClient — when activating, clientId must be set and client must exist in MDM
  if (newStatus === 'active') {
    if (!projectClientIdMustBeSetToActivate(project, newStatus)) {
      throw new AppError(
        'VALIDATION_ERROR',
        'projectRequiresClient: project must have a clientId to be activated.',
        400,
        { ruleId: 'projectRequiresClient', projectId: project.projectId },
      );
    }
    try {
      await ctx.mdm.entity.get({ mdmId: project.clientId });
    } catch {
      throw new AppError(
        'VALIDATION_ERROR',
        `projectRequiresClient: referenced client not found in MDM: ${project.clientId}`,
        400,
        { ruleId: 'projectRequiresClient', clientId: project.clientId },
      );
    }
  }

  // Step 5: If the new status is 'cancelled', validate cancellationReason is provided and non-empty
  if (newStatus === 'cancelled') {
    if (!input.cancellationReason || input.cancellationReason.trim() === '') {
      throw new AppError(
        'VALIDATION_ERROR',
        'cancellationReason is required when status is set to cancelled.',
        400,
        { projectId: project.projectId },
      );
    }
  }

  // Step 6: Resolve system-default timestamps from ctx.clock
  const now = ctx.clock.nowIso();
  const previousStatus = project.status;

  // Step 7: Mutate the Project aggregate with the new status, timestamps, and cancellationReason
  const updatedProject: Project = {
    ...project,
    status: newStatus,
    updatedAt: now,
    completedAt: newStatus === 'completed' ? now : project.completedAt,
    cancelledAt: newStatus === 'cancelled' ? now : project.cancelledAt,
    cancellationReason:
      newStatus === 'cancelled' ? (input.cancellationReason ?? null) : project.cancellationReason,
  };

  // Step 7 + 8: Save the Project and append a MaterialUsage audit event inside the same transaction
  await ctx.data.runInTransaction(async () => {
    await projects.save(updatedProject);

    const auditEvent: MaterialUsage = {
      materialUsageId: ctx.idGenerator.newId(),
      projectId: updatedProject.projectId,
      materialName: `ProjectStatusChange:${previousStatus}->${newStatus}`,
      quantity: 0,
      unit: 'unit',
      unitCost: 0,
      totalCost: 0,
      status: 'posted',
      usageDate: now,
      voidedAt: null,
      voidReason: null,
      createdAt: now,
    };
    await materialUsages.append(auditEvent);
  });

  // Step 9: rule dashboardShowsActiveOnly — satisfied by the status field value stored;
  // the dashboard read-side filters by status='active' only. No extra write needed.

  // Step 10: Return the updated project fields
  return {
    projectId: updatedProject.projectId,
    name: updatedProject.name,
    status: updatedProject.status,
    completedAt: updatedProject.completedAt,
    cancelledAt: updatedProject.cancelledAt,
    cancellationReason: updatedProject.cancellationReason,
    updatedAt: updatedProject.updatedAt,
  };
}
