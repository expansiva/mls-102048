/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTask.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { WorkTask } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import { workTaskDueDateWithinProject } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

export interface UpdateTaskInput {
  workTaskId: string;
  projectId: string;
  title: string;
  description: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  dueDate: string;
  budgetedCost?: number;
  sequenceNumber?: number;
}

export interface UpdateTaskOutput {
  workTaskId: string;
  title: string;
  description: string;
  status: string;
  assignedWorkerId: string | null;
  assignedWorkerName: string | null;
  dueDate: string;
  budgetedCost: number | null;
  sequenceNumber: number | null;
  updatedAt: string;
}

export async function updateTask(ctx: RequestContext, input: UpdateTaskInput): Promise<UpdateTaskOutput> {
  const workTasks = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');

  // Step 1: Load the existing WorkTask
  const existing = await workTasks.getById(input.workTaskId);
  if (!existing) {
    throw new AppError('NOT_FOUND', `WorkTask not found: ${input.workTaskId}`, 404, { workTaskId: input.workTaskId });
  }

  // Step 2: Load the parent Project
  const project = await projects.getById(input.projectId);
  if (!project) {
    throw new AppError('NOT_FOUND', `Project not found: ${input.projectId}`, 404, { projectId: input.projectId });
  }

  // Step 3: Apply rule taskDueDateWithinProject
  if (!workTaskDueDateWithinProject(input.dueDate, project.startDate, project.endDate)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `taskDueDateWithinProject: dueDate ${input.dueDate} must fall within [${project.startDate}, ${project.endDate}].`,
      400,
      { ruleId: 'taskDueDateWithinProject', dueDate: input.dueDate, projectStartDate: project.startDate, projectEndDate: project.endDate },
    );
  }

  // Step 4: Apply rule taskRequiresWorkerAssignment
  const assignedWorkerId = input.assignedWorkerId ?? null;
  const assignedWorkerName = input.assignedWorkerName ?? null;
  if (String(existing.status) === 'inProgress' && (!assignedWorkerId || assignedWorkerId.trim() === '')) {
    throw new AppError(
      'VALIDATION_ERROR',
      'taskRequiresWorkerAssignment: a task in progress must have an assigned worker.',
      400,
      { ruleId: 'taskRequiresWorkerAssignment', workTaskId: input.workTaskId, status: existing.status },
    );
  }

  // Step 5: Mutate the WorkTask in memory
  const now = ctx.clock.nowIso();
  const updatedTask: WorkTask = {
    ...existing,
    title: input.title,
    description: input.description,
    assignedWorkerId,
    assignedWorkerName,
    dueDate: input.dueDate,
    budgetedCost: input.budgetedCost ?? null,
    sequenceNumber: input.sequenceNumber ?? null,
    updatedAt: now,
  };

  // Step 8: Build a TimeLog audit event record
  const timeLogRecord: TimeLog = {
    timeLogId: ctx.idGenerator.newId(),
    workTaskId: existing.workTaskId,
    workerId: assignedWorkerId ?? existing.assignedWorkerId ?? ctx.sessionContext.actorId ?? 'system',
    logDate: now.slice(0, 10),
    hours: 0,
    workerRate: 0,
    status: 'posted',
    voidedAt: null,
    voidReason: null,
    createdAt: now,
  };

  // Steps 7 & 8: Save WorkTask and append TimeLog inside the same transaction
  await ctx.data.runInTransaction(async (tx) => {
    const txCtx = { ...ctx, data: tx };
    const txWorkTasks = resolveRepository<IWorkTaskRepository>(txCtx, 'WorkTask');
    const txTimeLogs = resolveRepository<ITimeLogRepository>(txCtx, 'TimeLog');
    await txWorkTasks.save(updatedTask);
    await txTimeLogs.append(timeLogRecord);
  });

  // Step 9: Return the updated WorkTask projection
  return {
    workTaskId: updatedTask.workTaskId,
    title: updatedTask.title,
    description: updatedTask.description,
    status: updatedTask.status,
    assignedWorkerId: updatedTask.assignedWorkerId,
    assignedWorkerName: updatedTask.assignedWorkerName,
    dueDate: updatedTask.dueDate,
    budgetedCost: updatedTask.budgetedCost,
    sequenceNumber: updatedTask.sequenceNumber,
    updatedAt: updatedTask.updatedAt,
  };
}
