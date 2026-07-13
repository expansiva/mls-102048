/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTaskStatus.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { WorkTask, WorkTaskStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import { canTransitionWorkTask } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

export interface UpdateTaskStatusInput {
  workTaskId: string;
  status: string;
}

export interface UpdateTaskStatusOutput {
  workTaskId: string;
  title: string;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  updatedAt: string;
}

const ALLOWED_TARGET_STATUSES: WorkTaskStatus[] = ['inProgress', 'completed'];

export async function updateTaskStatus(
  ctx: RequestContext,
  input: UpdateTaskStatusInput,
): Promise<UpdateTaskStatusOutput> {
  const workTasks = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const timeLogs = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');

  // Step 1 — Load the WorkTask aggregate
  let task: WorkTask;
  try {
    task = await workTasks.getById(input.workTaskId);
  } catch {
    throw new AppError(
      'WORK_TASK_NOT_FOUND',
      'Work task not found.',
      404,
      { workTaskId: input.workTaskId },
    );
  }

  // Step 2 — Verify the actor is the assigned worker
  const actorId = ctx.sessionContext.actorSession.actorId ?? null;
  if (!actorId || task.assignedWorkerId !== actorId) {
    throw new AppError(
      'NOT_ASSIGNED_WORKER',
      'Only the assigned worker can update this task.',
      403,
      { workTaskId: input.workTaskId, actorId: actorId ?? null },
    );
  }

  // Step 3 — Apply rule taskRequiresWorkerAssignment
  const requestedStatus = input.status as WorkTaskStatus;
  if (
    requestedStatus === 'inProgress' &&
    (!task.assignedWorkerId || task.assignedWorkerId.trim() === '')
  ) {
    throw new AppError(
      'TASK_REQUIRES_WORKER_ASSIGNMENT',
      'Task requires a worker assignment before it can be started.',
      400,
      { ruleId: 'taskRequiresWorkerAssignment', workTaskId: input.workTaskId },
    );
  }

  // Step 4 — Validate the requested status is an allowed transition target
  if (!ALLOWED_TARGET_STATUSES.includes(requestedStatus)) {
    throw new AppError(
      'INVALID_STATUS_TRANSITION',
      'The requested status is not an allowed transition target.',
      400,
      { workTaskId: input.workTaskId, requestedStatus: input.status },
    );
  }

  if (!canTransitionWorkTask(task.status, requestedStatus)) {
    throw new AppError(
      'INVALID_STATUS_TRANSITION',
      `Cannot transition from "${task.status}" to "${requestedStatus}".`,
      400,
      { workTaskId: input.workTaskId, currentStatus: task.status, requestedStatus },
    );
  }

  const now = ctx.clock.nowIso();

  // Steps 5–8 — Update task fields
  task.status = requestedStatus;
  if (requestedStatus === 'inProgress' && !task.startedAt) {
    task.startedAt = now;
  }
  if (requestedStatus === 'completed') {
    task.completedAt = now;
  }
  task.updatedAt = now;

  // Steps 9–10 — Save task and append TimeLog audit event in one transaction
  await ctx.data.runInTransaction(async () => {
    await workTasks.save(task);

    const auditEvent: TimeLog = {
      timeLogId: ctx.idGenerator.newId(),
      workTaskId: task.workTaskId,
      workerId: actorId,
      logDate: now,
      hours: 0,
      workerRate: 0,
      status: 'posted',
      voidedAt: null,
      voidReason: null,
      createdAt: now,
    };
    await timeLogs.append(auditEvent);
  });

  // Step 11 — Return projected output
  return {
    workTaskId: task.workTaskId,
    title: task.title,
    status: task.status,
    startedAt: task.startedAt,
    completedAt: task.completedAt,
    updatedAt: task.updatedAt,
  };
}
