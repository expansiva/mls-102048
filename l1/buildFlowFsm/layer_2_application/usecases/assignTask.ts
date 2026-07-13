/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/assignTask.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { WorkTask, WorkTaskStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import { canTransitionWorkTask, workTaskDueDateWithinProject } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

export interface AssignTaskInput {
  workTaskId: string;
  assignedWorkerId: string;
  assignedWorkerName: string;
  dueDate: string;
}

export interface AssignTaskOutput {
  workTaskId: string;
  title: string;
  status: string;
  assignedWorkerId: string;
  assignedWorkerName: string;
  dueDate: string;
}

export async function assignTask(ctx: RequestContext, input: AssignTaskInput): Promise<AssignTaskOutput> {
  const workTasks = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const timeLogs = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');

  // Step 1: Load the WorkTask by workTaskId
  const task = await workTasks.getById(input.workTaskId);
  if (!task) {
    throw new AppError('NOT_FOUND', `WorkTask not found: ${input.workTaskId}`, 404, { workTaskId: input.workTaskId });
  }

  // Step 2: Validate current status is not 'completed' or 'cancelled'
  if (task.status === 'completed' || task.status === 'cancelled') {
    throw new AppError(
      'VALIDATION_ERROR',
      `Cannot assign a task with status '${task.status}'.`,
      400,
      { ruleId: 'statusGuard', currentStatus: task.status },
    );
  }

  // Step 3: Apply rule taskRequiresWorkerAssignment
  if (!input.assignedWorkerId || input.assignedWorkerId.trim() === '' || !input.assignedWorkerName || input.assignedWorkerName.trim() === '') {
    throw new AppError(
      'VALIDATION_ERROR',
      'taskRequiresWorkerAssignment: assignedWorkerId and assignedWorkerName must both be non-empty strings.',
      400,
      { ruleId: 'taskRequiresWorkerAssignment' },
    );
  }

  // Step 4: Load the parent Project
  const project = await projects.getById(task.projectId);
  if (!project) {
    throw new AppError('NOT_FOUND', `Project not found: ${task.projectId}`, 404, { projectId: task.projectId });
  }

  // Step 5: Apply rule taskDueDateWithinProject
  if (!workTaskDueDateWithinProject(input.dueDate, project.startDate, project.endDate)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'taskDueDateWithinProject: dueDate must fall within the project date range.',
      400,
      {
        ruleId: 'taskDueDateWithinProject',
        dueDate: input.dueDate,
        projectStartDate: project.startDate,
        projectEndDate: project.endDate,
      },
    );
  }

  // Step 6: Check domain transition (allow reassignment when already 'assigned')
  const targetStatus: WorkTaskStatus = 'assigned';
  if (task.status !== targetStatus && !canTransitionWorkTask(task.status, targetStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Cannot transition WorkTask from '${task.status}' to '${targetStatus}'.`,
      400,
      { ruleId: 'invalidStatusTransition', from: task.status, to: targetStatus },
    );
  }

  const now = ctx.clock.nowIso();

  // Mutate the WorkTask in memory
  const updatedTask: WorkTask = {
    ...task,
    assignedWorkerId: input.assignedWorkerId,
    assignedWorkerName: input.assignedWorkerName,
    dueDate: input.dueDate,
    status: targetStatus,
    updatedAt: now,
  };

  // Step 7 & 8: Save WorkTask and append TimeLog audit event inside the same transaction
  await ctx.data.runInTransaction(async () => {
    await workTasks.save(updatedTask);

    const auditEvent: TimeLog = {
      timeLogId: ctx.idGenerator.newId(),
      workTaskId: updatedTask.workTaskId,
      workerId: input.assignedWorkerId,
      logDate: now.slice(0, 10),
      hours: 0,
      workerRate: 0,
      status: 'posted',
      voidedAt: null,
      voidReason: null,
      createdAt: now,
    };
    await timeLogs.append(auditEvent);
  });

  // Step 9: Return projected output fields
  return {
    workTaskId: updatedTask.workTaskId,
    title: updatedTask.title,
    status: updatedTask.status,
    assignedWorkerId: updatedTask.assignedWorkerId!,
    assignedWorkerName: updatedTask.assignedWorkerName!,
    dueDate: updatedTask.dueDate,
  };
}
