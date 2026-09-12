/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.ts" enhancement="_blank"/>

export type WorkTaskStatus = 'draft' | 'assigned' | 'inProgress' | 'completed' | 'cancelled';

export interface WorkTask {
  workTaskId: string;
  projectId: string;
  title: string;
  description: string;
  status: WorkTaskStatus;
  assignedWorkerId: string | null;
  assignedWorkerName: string | null;
  dueDate: string;
  budgetedCost: number | null;
  sequenceNumber: number | null;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export const WORK_TASK_STATUS_TRANSITIONS: Record<WorkTaskStatus, WorkTaskStatus[]> = {
  draft: ['assigned', 'cancelled'],
  assigned: ['inProgress', 'cancelled'],
  inProgress: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

export function canTransitionWorkTask(from: WorkTaskStatus, to: WorkTaskStatus): boolean {
  return WORK_TASK_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function workTaskRequiresWorker(
  task: Pick<WorkTask, 'status' | 'assignedWorkerId' | 'assignedWorkerName'>,
): boolean {
  if (task.status === 'assigned' || task.status === 'inProgress' || task.status === 'completed') {
    return task.assignedWorkerId !== null && task.assignedWorkerName !== null;
  }
  return true;
}

export function workTaskRequiresStartedAt(
  task: Pick<WorkTask, 'status' | 'startedAt'>,
): boolean {
  if (task.status === 'inProgress' || task.status === 'completed') {
    return task.startedAt !== null;
  }
  return true;
}

export function workTaskRequiresCompletedAt(
  task: Pick<WorkTask, 'status' | 'completedAt'>,
): boolean {
  if (task.status === 'completed') {
    return task.completedAt !== null;
  }
  return true;
}

export function workTaskRequiresCancellationInfo(
  task: Pick<WorkTask, 'status' | 'cancelledAt' | 'cancellationReason'>,
): boolean {
  if (task.status === 'cancelled') {
    return task.cancelledAt !== null && task.cancellationReason !== null;
  }
  return true;
}

export function workTaskBudgetedCostIsValid(
  task: Pick<WorkTask, 'budgetedCost'>,
): boolean {
  if (task.budgetedCost === null) {
    return true;
  }
  return task.budgetedCost >= 0;
}

export function workTaskDueDateWithinProject(
  dueDate: string,
  projectStartDate: string,
  projectEndDate: string,
): boolean {
  return dueDate >= projectStartDate && dueDate <= projectEndDate;
}

export function validateWorkTaskInvariants(
  task: Pick<
    WorkTask,
    'status' | 'assignedWorkerId' | 'assignedWorkerName' | 'startedAt' | 'completedAt' | 'cancelledAt' | 'cancellationReason' | 'budgetedCost'
  >,
): string[] {
  const errors: string[] = [];
  if (!workTaskRequiresWorker(task)) {
    errors.push('assignedWorkerId and assignedWorkerName must be set when status is assigned, inProgress, or completed');
  }
  if (!workTaskRequiresStartedAt(task)) {
    errors.push('startedAt must be set when status is inProgress or completed');
  }
  if (!workTaskRequiresCompletedAt(task)) {
    errors.push('completedAt must be set when status is completed');
  }
  if (!workTaskRequiresCancellationInfo(task)) {
    errors.push('cancelledAt and cancellationReason must be set when status is cancelled');
  }
  if (!workTaskBudgetedCostIsValid(task)) {
    errors.push('budgetedCost must be a non-negative monetary value if provided');
  }
  return errors;
}
