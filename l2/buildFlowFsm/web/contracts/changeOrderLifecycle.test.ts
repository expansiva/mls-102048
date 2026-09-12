/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmCreateChangeOrderInput, BuildFlowFsmCreateChangeOrderOutput, BuildFlowFsmSendChangeOrderInput, BuildFlowFsmSendChangeOrderOutput } from './changeOrderLifecycle.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmCreateChangeOrderInput = {
  projectId: string;
  title: string;
  scopeDescription: string;
  amount: number;
};
type ExpectedBuildFlowFsmCreateChangeOrderOutput = {
  changeOrderId: string;
  projectId: string;
  title: string;
  scopeDescription: string;
  amount: number;
  status: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  createdAt: string;
};
type ExpectedBuildFlowFsmSendChangeOrderInput = {
  changeOrderId: string;
};
type ExpectedBuildFlowFsmSendChangeOrderOutput = {
  changeOrderId: string;
  status: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  sentAt: string;
  updatedAt: string;
};

type _BuildFlowFsmCreateChangeOrderInput = Assert<Equal<BuildFlowFsmCreateChangeOrderInput, ExpectedBuildFlowFsmCreateChangeOrderInput>>;
type _BuildFlowFsmCreateChangeOrderOutput = Assert<Equal<BuildFlowFsmCreateChangeOrderOutput, ExpectedBuildFlowFsmCreateChangeOrderOutput>>;
type _BuildFlowFsmSendChangeOrderInput = Assert<Equal<BuildFlowFsmSendChangeOrderInput, ExpectedBuildFlowFsmSendChangeOrderInput>>;
type _BuildFlowFsmSendChangeOrderOutput = Assert<Equal<BuildFlowFsmSendChangeOrderOutput, ExpectedBuildFlowFsmSendChangeOrderOutput>>;

export {};