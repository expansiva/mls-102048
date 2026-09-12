/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/projectManagement.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmCreateProjectInput, BuildFlowFsmCreateProjectOutput, BuildFlowFsmUpdateProjectInput, BuildFlowFsmUpdateProjectOutput, BuildFlowFsmUpdateProjectStatusInput, BuildFlowFsmUpdateProjectStatusOutput, BuildFlowFsmViewDashboardInput, BuildFlowFsmViewDashboardOutput, BuildFlowFsmViewDashboardOutputItem, BuildFlowFsmViewProjectInput, BuildFlowFsmViewProjectOutput, BuildFlowFsmViewProjectOutputItem } from './projectManagement.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmCreateProjectInput = {
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "cancelled";
};
type ExpectedBuildFlowFsmCreateProjectOutput = {
  projectId: string;
  name: string;
  status: "draft" | "active" | "completed" | "cancelled";
  createdAt: string;
};
type ExpectedBuildFlowFsmUpdateProjectStatusInput = {
  projectId: string;
  status: "draft" | "active" | "completed" | "cancelled";
  cancellationReason?: string;
};
type ExpectedBuildFlowFsmUpdateProjectStatusOutput = {
  projectId: string;
  name: string;
  status: "draft" | "active" | "completed" | "cancelled";
  completedAt: string;
  cancelledAt: string;
  cancellationReason: string;
  updatedAt: string;
};
type ExpectedBuildFlowFsmUpdateProjectInput = {
  projectId: string;
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
};
type ExpectedBuildFlowFsmUpdateProjectOutput = {
  projectId: string;
  name: string;
  clientId: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "cancelled";
  updatedAt: string;
};
type ExpectedBuildFlowFsmViewProjectInput = {
  projectId: string;
};
type ExpectedBuildFlowFsmViewProjectOutputItem = {
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
};
type ExpectedBuildFlowFsmViewProjectOutput = ExpectedBuildFlowFsmViewProjectOutputItem;
type ExpectedBuildFlowFsmViewDashboardInput = {};
type ExpectedBuildFlowFsmViewDashboardOutputItem = {
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
};
type ExpectedBuildFlowFsmViewDashboardOutput = { items: ExpectedBuildFlowFsmViewDashboardOutputItem[]; total: number; page?: number; pageSize?: number; };

type _BuildFlowFsmCreateProjectInput = Assert<Equal<BuildFlowFsmCreateProjectInput, ExpectedBuildFlowFsmCreateProjectInput>>;
type _BuildFlowFsmCreateProjectOutput = Assert<Equal<BuildFlowFsmCreateProjectOutput, ExpectedBuildFlowFsmCreateProjectOutput>>;
type _BuildFlowFsmUpdateProjectStatusInput = Assert<Equal<BuildFlowFsmUpdateProjectStatusInput, ExpectedBuildFlowFsmUpdateProjectStatusInput>>;
type _BuildFlowFsmUpdateProjectStatusOutput = Assert<Equal<BuildFlowFsmUpdateProjectStatusOutput, ExpectedBuildFlowFsmUpdateProjectStatusOutput>>;
type _BuildFlowFsmUpdateProjectInput = Assert<Equal<BuildFlowFsmUpdateProjectInput, ExpectedBuildFlowFsmUpdateProjectInput>>;
type _BuildFlowFsmUpdateProjectOutput = Assert<Equal<BuildFlowFsmUpdateProjectOutput, ExpectedBuildFlowFsmUpdateProjectOutput>>;
type _BuildFlowFsmViewProjectInput = Assert<Equal<BuildFlowFsmViewProjectInput, ExpectedBuildFlowFsmViewProjectInput>>;
type _BuildFlowFsmViewProjectOutputItem = Assert<Equal<BuildFlowFsmViewProjectOutputItem, ExpectedBuildFlowFsmViewProjectOutputItem>>;
type _BuildFlowFsmViewProjectOutput = Assert<Equal<BuildFlowFsmViewProjectOutput, ExpectedBuildFlowFsmViewProjectOutput>>;
type _BuildFlowFsmViewDashboardInput = Assert<Equal<BuildFlowFsmViewDashboardInput, ExpectedBuildFlowFsmViewDashboardInput>>;
type _BuildFlowFsmViewDashboardOutputItem = Assert<Equal<BuildFlowFsmViewDashboardOutputItem, ExpectedBuildFlowFsmViewDashboardOutputItem>>;
type _BuildFlowFsmViewDashboardOutput = Assert<Equal<BuildFlowFsmViewDashboardOutput, ExpectedBuildFlowFsmViewDashboardOutput>>;

export {};