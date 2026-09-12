/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/projectManagement.ts" enhancement="_blank"/>

export interface BuildFlowFsmCreateProjectInput {
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "cancelled";
}

export interface BuildFlowFsmCreateProjectOutput {
  projectId: string;
  name: string;
  status: "draft" | "active" | "completed" | "cancelled";
  createdAt: string;
}

export interface BuildFlowFsmUpdateProjectStatusInput {
  projectId: string;
  status: "draft" | "active" | "completed" | "cancelled";
  cancellationReason?: string;
}

export interface BuildFlowFsmUpdateProjectStatusOutput {
  projectId: string;
  name: string;
  status: "draft" | "active" | "completed" | "cancelled";
  completedAt: string;
  cancelledAt: string;
  cancellationReason: string;
  updatedAt: string;
}

export interface BuildFlowFsmUpdateProjectInput {
  projectId: string;
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
}

export interface BuildFlowFsmUpdateProjectOutput {
  projectId: string;
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "cancelled";
  updatedAt: string;
}

export interface BuildFlowFsmViewProjectInput {
  projectId: string;
}

export interface BuildFlowFsmViewProjectOutputItem {
  projectId: string;
  clientId: string;
  name: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "cancelled";
  completedAt: string;
  cancelledAt: string;
  cancellationReason: string;
  createdAt: string;
  updatedAt: string;
}

export type BuildFlowFsmViewProjectOutput = BuildFlowFsmViewProjectOutputItem;

export interface BuildFlowFsmViewDashboardInput {}

export interface BuildFlowFsmViewDashboardOutputItem {
  projectId: string;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "cancelled";
  clientId: string;
  title: string;
  dueDate: string;
  hours: number;
  cost?: string;
  amount: number;
}

export interface BuildFlowFsmViewDashboardOutput {
  items: BuildFlowFsmViewDashboardOutputItem[];
  total: number;
  page?: number;
  pageSize?: number;
}
