/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmVoidTimeLogInput, BuildFlowFsmVoidTimeLogOutput } from './pmTimeLogManagement.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmVoidTimeLogInput = {
  timeLogId: string;
  voidReason: string;
};
type ExpectedBuildFlowFsmVoidTimeLogOutput = {
  timeLogId: string;
  status: "posted" | "voided";
  voidedAt: string;
  voidReason: string;
};

type _BuildFlowFsmVoidTimeLogInput = Assert<Equal<BuildFlowFsmVoidTimeLogInput, ExpectedBuildFlowFsmVoidTimeLogInput>>;
type _BuildFlowFsmVoidTimeLogOutput = Assert<Equal<BuildFlowFsmVoidTimeLogOutput, ExpectedBuildFlowFsmVoidTimeLogOutput>>;

export {};