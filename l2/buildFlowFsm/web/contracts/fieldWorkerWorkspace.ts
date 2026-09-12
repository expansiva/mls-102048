/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.ts" enhancement="_blank"/>

export interface BuildFlowFsmBrowseTasksInput {}

export interface BuildFlowFsmBrowseTasksOutputItem {
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
}

export interface BuildFlowFsmBrowseTasksOutput {
  items: BuildFlowFsmBrowseTasksOutputItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface BuildFlowFsmUpdateTaskStatusInput {
  workTaskId: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
}

export interface BuildFlowFsmUpdateTaskStatusOutput {
  workTaskId: string;
  title: string;
  status: "draft" | "assigned" | "inProgress" | "completed" | "cancelled";
  startedAt: string;
  completedAt: string;
  updatedAt: string;
}

export interface BuildFlowFsmCreateTimeLogInput {
  workTaskId: string;
  logDate: string;
  hours: number;
}

export interface BuildFlowFsmCreateTimeLogOutput {
  timeLogId: string;
  workTaskId: string;
  workerId: string;
  logDate: string;
  hours: number;
  workerRate: number;
  status: "posted" | "voided";
  createdAt: string;
}

export interface BuildFlowFsmCreateMaterialUsageInput {
  projectId: string;
  materialName: string;
  quantity: number;
  unit: "kg" | "liter" | "meter" | "portion" | "unit" | "bag" | "box" | "roll" | "sheet";
  unitCost: number;
  totalCost: number;
  usageDate: string;
}

export interface BuildFlowFsmCreateMaterialUsageOutput {
  materialUsageId: string;
  materialName: string;
  quantity: number;
  unit: "kg" | "liter" | "meter" | "portion" | "unit" | "bag" | "box" | "roll" | "sheet";
  unitCost: number;
  totalCost: number;
  status: "posted" | "voided";
  usageDate: string;
}
