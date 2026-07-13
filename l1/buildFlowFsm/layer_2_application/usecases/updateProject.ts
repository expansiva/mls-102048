/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProject.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { Project } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import {
  projectBudgetMustBePositive,
  projectEndDateMustBeOnOrAfterStartDate,
} from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

export interface UpdateProjectInput {
  projectId: string;
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
}

export interface UpdateProjectOutput {
  projectId: string;
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
  updatedAt: string;
}

export async function updateProject(
  ctx: RequestContext,
  input: UpdateProjectInput,
): Promise<UpdateProjectOutput> {
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const materialUsages = resolveRepository<IMaterialUsageRepository>(ctx, 'MaterialUsage');

  // Step 1: Load the existing Project aggregate by projectId.
  let existing: Project;
  try {
    existing = await projects.getById(input.projectId);
  } catch {
    throw new AppError(
      'NOT_FOUND',
      `Project not found: ${input.projectId}`,
      404,
      { projectId: input.projectId },
    );
  }

  // Step 2: Validate projectBudgetPositive.
  if (!projectBudgetMustBePositive({ budget: input.budget })) {
    throw new AppError(
      'VALIDATION_ERROR',
      'projectBudgetPositive: budget must be a positive amount.',
      400,
      { ruleId: 'projectBudgetPositive' },
    );
  }

  // Step 3: Validate projectDateRangeValid.
  if (
    !projectEndDateMustBeOnOrAfterStartDate({
      startDate: input.startDate,
      endDate: input.endDate,
    })
  ) {
    throw new AppError(
      'VALIDATION_ERROR',
      'projectDateRangeValid: endDate must be on or after startDate.',
      400,
      { ruleId: 'projectDateRangeValid' },
    );
  }

  // Step 4: Validate projectRequiresClient — resolve the clientId in MDM.
  const clientEntity = await ctx.mdm.entity
    .get({ mdmId: input.clientId })
    .catch(() => null);

  if (!clientEntity) {
    throw new AppError(
      'VALIDATION_ERROR',
      `projectRequiresClient: referenced client does not exist: ${input.clientId}`,
      400,
      { ruleId: 'projectRequiresClient', clientId: input.clientId },
    );
  }

  // If the existing project status is 'active', the client must also be active.
  if (
    String(existing.status) === 'active' &&
    String(clientEntity.details.status) === 'Inactive'
  ) {
    throw new AppError(
      'VALIDATION_ERROR',
      `projectRequiresClient: referenced client is inactive: ${input.clientId}`,
      400,
      { ruleId: 'projectRequiresClient', clientId: input.clientId },
    );
  }

  // Step 5: Apply field updates to the loaded Project.
  const now = ctx.clock.nowIso();
  const updatedProject: Project = {
    ...existing,
    name: input.name,
    clientId: input.clientId,
    siteAddress: input.siteAddress,
    budget: input.budget,
    startDate: input.startDate,
    endDate: input.endDate,
    updatedAt: now,
  };

  // Step 6 & 7: Save the updated Project and append a MaterialUsage audit event
  // inside the same transaction.
  await ctx.data.runInTransaction(async () => {
    await projects.save(updatedProject);

    const auditEvent: MaterialUsage = {
      materialUsageId: ctx.idGenerator.newId(),
      projectId: updatedProject.projectId,
      materialName: `Project updated: ${input.name}`,
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

  // Step 8: Return the updated project fields.
  return {
    projectId: updatedProject.projectId,
    name: updatedProject.name,
    clientId: updatedProject.clientId,
    siteAddress: updatedProject.siteAddress,
    budget: updatedProject.budget,
    startDate: updatedProject.startDate,
    endDate: updatedProject.endDate,
    status: updatedProject.status,
    updatedAt: updatedProject.updatedAt,
  };
}
