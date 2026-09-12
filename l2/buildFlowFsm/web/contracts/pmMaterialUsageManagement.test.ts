/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmVoidMaterialUsageInput, BuildFlowFsmVoidMaterialUsageOutput } from './pmMaterialUsageManagement.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmVoidMaterialUsageInput = {
  materialUsageId: string;
  voidReason: string;
};
type ExpectedBuildFlowFsmVoidMaterialUsageOutput = {
  materialUsageId: string;
  status: "posted" | "voided";
  voidedAt: string;
  voidReason: string;
};

type _BuildFlowFsmVoidMaterialUsageInput = Assert<Equal<BuildFlowFsmVoidMaterialUsageInput, ExpectedBuildFlowFsmVoidMaterialUsageInput>>;
type _BuildFlowFsmVoidMaterialUsageOutput = Assert<Equal<BuildFlowFsmVoidMaterialUsageOutput, ExpectedBuildFlowFsmVoidMaterialUsageOutput>>;

export {};