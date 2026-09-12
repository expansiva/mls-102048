/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.ts" enhancement="_blank"/>

export interface BuildFlowFsmCreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  budgetedCost?: number;
  sequenceNumber?: number;
  projectId: string;
}

export interface BuildFlowFsmCreateTaskOutput {
  workTaskId: string;
  title: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  dueDate: string;
  assignedWorkerName: string;
}

export interface BuildFlowFsmAssignTaskInput {
  workTaskId: string;
  assignedWorkerId: string;
  assignedWorkerName: string;
  dueDate: string;
}

export interface BuildFlowFsmAssignTaskOutput {
  workTaskId: string;
  title: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  assignedWorkerId: string;
  assignedWorkerName: string;
  dueDate: string;
}

export interface BuildFlowFsmUpdateTaskInput {
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

export interface BuildFlowFsmUpdateTaskOutput {
  workTaskId: string;
  title: string;
  description: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  assignedWorkerId: string;
  assignedWorkerName: string;
  dueDate: string;
  budgetedCost: number;
  sequenceNumber: number;
  updatedAt: string;
}
