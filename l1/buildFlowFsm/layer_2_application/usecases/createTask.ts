/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTask.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { WorkTask } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import { workTaskDueDateWithinProject } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

export interface CreateTaskInput {
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  budgetedCost?: number;
  sequenceNumber?: number;
}

export interface CreateTaskOutput {
  workTaskId: string;
  title: string;
  status: string;
  dueDate: string;
  assignedWorkerName: string | null;
}

/**
 * Rule: taskRequiresWorkerAssignment
 * If assignedWorkerId is provided, assignedWorkerName must also be provided (and vice versa).
 */
function taskRequiresWorkerAssignment(
  assignedWorkerId: string | undefined,
  assignedWorkerName: string | undefined,
): boolean {
  const hasId = assignedWorkerId !== undefined && assignedWorkerId !== null && assignedWorkerId !== '';
  const hasName = assignedWorkerName !== undefined && assignedWorkerName !== null && assignedWorkerName !== '';
  return hasId === hasName;
}

export async function createTask(ctx: RequestContext, input: CreateTaskInput): Promise<CreateTaskOutput> {
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const workTasks = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const timeLogs = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');

  // Step 1: Load the parent Project to obtain startDate and endDate.
  const project = await projects.getById(input.projectId);

  // Step 2: Apply rule taskDueDateWithinProject.
  if (!workTaskDueDateWithinProject(input.dueDate, project.startDate, project.endDate)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'taskDueDateWithinProject: a data de vencimento da tarefa deve estar dentro do período do projeto.',
      400,
      {
        ruleId: 'taskDueDateWithinProject',
        dueDate: input.dueDate,
        projectStartDate: project.startDate,
        projectEndDate: project.endDate,
      },
    );
  }

  // Step 3: Apply rule taskRequiresWorkerAssignment.
  if (!taskRequiresWorkerAssignment(input.assignedWorkerId, input.assignedWorkerName)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'taskRequiresWorkerAssignment: assignedWorkerId e assignedWorkerName devem ser fornecidos juntos ou omitidos juntos.',
      400,
      {
        ruleId: 'taskRequiresWorkerAssignment',
        assignedWorkerId: input.assignedWorkerId ?? null,
        assignedWorkerName: input.assignedWorkerName ?? null,
      },
    );
  }

  const now = ctx.clock.nowIso();
  const workTaskId = ctx.idGenerator.newId();

  const assignedWorkerId = input.assignedWorkerId && input.assignedWorkerId !== '' ? input.assignedWorkerId : null;
  const assignedWorkerName = input.assignedWorkerName && input.assignedWorkerName !== '' ? input.assignedWorkerName : null;

  // Step 4 & 5: Build the WorkTask aggregate with system defaults.
  const workTask: WorkTask = {
    workTaskId,
    projectId: input.projectId,
    title: input.title,
    description: input.description,
    status: 'draft',
    assignedWorkerId,
    assignedWorkerName,
    dueDate: input.dueDate,
    budgetedCost: input.budgetedCost ?? null,
    sequenceNumber: input.sequenceNumber ?? null,
    startedAt: null,
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
    createdAt: now,
    updatedAt: now,
  };

  // Step 6: Build the TimeLog audit event recording the creation of the work task.
  const auditTimeLog: TimeLog = {
    timeLogId: ctx.idGenerator.newId(),
    workTaskId,
    workerId: assignedWorkerId ?? ctx.sessionContext.actorSession.actorId ?? 'system',
    logDate: now.slice(0, 10),
    hours: 0,
    workerRate: 0,
    status: 'posted',
    voidedAt: null,
    voidReason: null,
    createdAt: now,
  };

  // Step 5 & 6: Persist the WorkTask and append the TimeLog audit event inside a single transaction.
  await ctx.data.runInTransaction(async () => {
    await workTasks.save(workTask);
    await timeLogs.append(auditTimeLog);
  });

  // Step 7: Return the created task summary.
  return {
    workTaskId,
    title: workTask.title,
    status: workTask.status,
    dueDate: workTask.dueDate,
    assignedWorkerName: workTask.assignedWorkerName,
  };
}
