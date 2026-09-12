/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmAssignTaskInput, BuildFlowFsmAssignTaskOutput, BuildFlowFsmCreateTaskInput, BuildFlowFsmCreateTaskOutput, BuildFlowFsmUpdateTaskInput, BuildFlowFsmUpdateTaskOutput } from './workTaskLifecycle.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmCreateTaskInput = {
  title: string;
  description: string;
  dueDate: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  budgetedCost?: number;
  sequenceNumber?: number;
  projectId: string;
};
type ExpectedBuildFlowFsmCreateTaskOutput = {
  workTaskId: string;
  title: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  dueDate: string;
  assignedWorkerName: string;
};
type ExpectedBuildFlowFsmAssignTaskInput = {
  workTaskId: string;
  assignedWorkerId: string;
  assignedWorkerName: string;
  dueDate: string;
};
type ExpectedBuildFlowFsmAssignTaskOutput = {
  workTaskId: string;
  title: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  assignedWorkerId: string;
  assignedWorkerName: string;
  dueDate: string;
};
type ExpectedBuildFlowFsmUpdateTaskInput = {
  workTaskId: string;
  projectId: string;
  title: string;
  description: string;
  assignedWorkerId?: string;
  assignedWorkerName?: string;
  dueDate: string;
  budgetedCost?: number;
  sequenceNumber?: number;
};
type ExpectedBuildFlowFsmUpdateTaskOutput = {
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
};

type _BuildFlowFsmCreateTaskInput = Assert<Equal<BuildFlowFsmCreateTaskInput, ExpectedBuildFlowFsmCreateTaskInput>>;
type _BuildFlowFsmCreateTaskOutput = Assert<Equal<BuildFlowFsmCreateTaskOutput, ExpectedBuildFlowFsmCreateTaskOutput>>;
type _BuildFlowFsmAssignTaskInput = Assert<Equal<BuildFlowFsmAssignTaskInput, ExpectedBuildFlowFsmAssignTaskInput>>;
type _BuildFlowFsmAssignTaskOutput = Assert<Equal<BuildFlowFsmAssignTaskOutput, ExpectedBuildFlowFsmAssignTaskOutput>>;
type _BuildFlowFsmUpdateTaskInput = Assert<Equal<BuildFlowFsmUpdateTaskInput, ExpectedBuildFlowFsmUpdateTaskInput>>;
type _BuildFlowFsmUpdateTaskOutput = Assert<Equal<BuildFlowFsmUpdateTaskOutput, ExpectedBuildFlowFsmUpdateTaskOutput>>;

export {};