/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmBrowseTasksInput, BuildFlowFsmBrowseTasksOutput, BuildFlowFsmBrowseTasksOutputItem, BuildFlowFsmCreateMaterialUsageInput, BuildFlowFsmCreateMaterialUsageOutput, BuildFlowFsmCreateTimeLogInput, BuildFlowFsmCreateTimeLogOutput, BuildFlowFsmUpdateTaskStatusInput, BuildFlowFsmUpdateTaskStatusOutput } from './fieldWorkerWorkspace.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmBrowseTasksInput = {};
type ExpectedBuildFlowFsmBrowseTasksOutputItem = {
  workTaskId: string;
  title: string;
  description: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  dueDate: string;
  projectId: string;
  sequenceNumber: number;
  assignedWorkerName: string;
  startedAt: string;
  completedAt: string;
};
type ExpectedBuildFlowFsmBrowseTasksOutput = { items: ExpectedBuildFlowFsmBrowseTasksOutputItem[]; total: number; page?: number; pageSize?: number; };
type ExpectedBuildFlowFsmUpdateTaskStatusInput = {
  workTaskId: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
};
type ExpectedBuildFlowFsmUpdateTaskStatusOutput = {
  workTaskId: string;
  title: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  startedAt: string;
  completedAt: string;
  updatedAt: string;
};
type ExpectedBuildFlowFsmCreateTimeLogInput = {
  workTaskId: string;
  logDate: string;
  hours: number;
};
type ExpectedBuildFlowFsmCreateTimeLogOutput = {
  timeLogId: string;
  workTaskId: string;
  workerId: string;
  logDate: string;
  hours: number;
  workerRate: number;
  status: "posted" | "voided";
  createdAt: string;
};
type ExpectedBuildFlowFsmCreateMaterialUsageInput = {
  projectId: string;
  materialName: string;
  quantity: number;
  unit: "kg" | "liter" | "meter" | "portion" | "unit" | "bag" | "box" | "roll" | "sheet";
  unitCost: number;
  totalCost: number;
  usageDate: string;
};
type ExpectedBuildFlowFsmCreateMaterialUsageOutput = {
  materialUsageId: string;
  materialName: string;
  quantity: number;
  unit: "kg" | "liter" | "meter" | "portion" | "unit" | "bag" | "box" | "roll" | "sheet";
  unitCost: number;
  totalCost: number;
  status: "posted" | "voided";
  usageDate: string;
};

type _BuildFlowFsmBrowseTasksInput = Assert<Equal<BuildFlowFsmBrowseTasksInput, ExpectedBuildFlowFsmBrowseTasksInput>>;
type _BuildFlowFsmBrowseTasksOutputItem = Assert<Equal<BuildFlowFsmBrowseTasksOutputItem, ExpectedBuildFlowFsmBrowseTasksOutputItem>>;
type _BuildFlowFsmBrowseTasksOutput = Assert<Equal<BuildFlowFsmBrowseTasksOutput, ExpectedBuildFlowFsmBrowseTasksOutput>>;
type _BuildFlowFsmUpdateTaskStatusInput = Assert<Equal<BuildFlowFsmUpdateTaskStatusInput, ExpectedBuildFlowFsmUpdateTaskStatusInput>>;
type _BuildFlowFsmUpdateTaskStatusOutput = Assert<Equal<BuildFlowFsmUpdateTaskStatusOutput, ExpectedBuildFlowFsmUpdateTaskStatusOutput>>;
type _BuildFlowFsmCreateTimeLogInput = Assert<Equal<BuildFlowFsmCreateTimeLogInput, ExpectedBuildFlowFsmCreateTimeLogInput>>;
type _BuildFlowFsmCreateTimeLogOutput = Assert<Equal<BuildFlowFsmCreateTimeLogOutput, ExpectedBuildFlowFsmCreateTimeLogOutput>>;
type _BuildFlowFsmCreateMaterialUsageInput = Assert<Equal<BuildFlowFsmCreateMaterialUsageInput, ExpectedBuildFlowFsmCreateMaterialUsageInput>>;
type _BuildFlowFsmCreateMaterialUsageOutput = Assert<Equal<BuildFlowFsmCreateMaterialUsageOutput, ExpectedBuildFlowFsmCreateMaterialUsageOutput>>;

export {};