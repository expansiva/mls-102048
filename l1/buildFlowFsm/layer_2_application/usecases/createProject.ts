/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createProject.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { Project, ProjectStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import {
  projectBudgetMustBePositive,
  projectEndDateMustBeOnOrAfterStartDate,
  projectClientIdMustBeSetToActivate,
} from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

export interface CreateProjectInput {
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
}

export interface CreateProjectOutput {
  projectId: string;
  name: string;
  status: string;
  createdAt: string;
}

const ALLOWED_PROJECT_STATUSES: ProjectStatus[] = ['draft', 'active', 'completed', 'cancelled'];

export async function createProject(ctx: RequestContext, input: CreateProjectInput): Promise<CreateProjectOutput> {
  // Rule: projectBudgetPositive — budget must be a positive amount greater than zero
  if (!projectBudgetMustBePositive({ budget: input.budget })) {
    throw new AppError(
      'VALIDATION_ERROR',
      'projectBudgetPositive: budget must be a positive amount greater than zero.',
      400,
      { ruleId: 'projectBudgetPositive', budget: input.budget },
    );
  }

  // Rule: projectDateRangeValid — startDate must be on or before endDate
  if (!projectEndDateMustBeOnOrAfterStartDate({ startDate: input.startDate, endDate: input.endDate })) {
    throw new AppError(
      'VALIDATION_ERROR',
      'projectDateRangeValid: endDate must be on or after startDate.',
      400,
      { ruleId: 'projectDateRangeValid', startDate: input.startDate, endDate: input.endDate },
    );
  }

  // Validate status is one of the allowed enum values
  if (!ALLOWED_PROJECT_STATUSES.includes(input.status as ProjectStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid project status "${input.status}". Allowed values: draft, active, completed, cancelled.`,
      400,
      { status: input.status, allowed: ALLOWED_PROJECT_STATUSES },
    );
  }

  const status = input.status as ProjectStatus;

  // Rule: projectRequiresClient — validate the client exists in MDM
  const clientResults = await ctx.mdm.collection.getMany({ mdmIds: [input.clientId] });
  if (clientResults.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      `projectRequiresClient: client not found for clientId "${input.clientId}".`,
      400,
      { ruleId: 'projectRequiresClient', clientId: input.clientId },
    );
  }

  // Domain invariant: client must be set when activating
  if (!projectClientIdMustBeSetToActivate({ clientId: input.clientId, status }, status)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'projectClientIdMustBeSetToActivate: a client must be set to activate a project.',
      400,
      { ruleId: 'projectClientIdMustBeSetToActivate' },
    );
  }

  const now = ctx.clock.nowIso();
  const projectId = ctx.idGenerator.newId();

  const project: Project = {
    projectId,
    clientId: input.clientId,
    name: input.name,
    siteAddress: input.siteAddress,
    budget: input.budget,
    startDate: input.startDate,
    endDate: input.endDate,
    status,
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
    createdAt: now,
    updatedAt: now,
  };

  // Build MaterialUsage audit event recording the project creation
  const auditEvent: MaterialUsage = {
    materialUsageId: ctx.idGenerator.newId(),
    projectId,
    materialName: 'projectCreated',
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

  await ctx.data.runInTransaction(async () => {
    const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
    const materialUsages = resolveRepository<IMaterialUsageRepository>(ctx, 'MaterialUsage');

    await projects.save(project);
    await materialUsages.append(auditEvent);
  });

  return {
    projectId,
    name: input.name,
    status,
    createdAt: now,
  };
}
