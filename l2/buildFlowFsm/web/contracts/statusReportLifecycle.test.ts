/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmGenerateStatusReportInput, BuildFlowFsmGenerateStatusReportOutput, BuildFlowFsmShareStatusReportInput, BuildFlowFsmShareStatusReportOutput } from './statusReportLifecycle.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmGenerateStatusReportInput = {
  projectId: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
};
type ExpectedBuildFlowFsmGenerateStatusReportOutput = {
  statusReportId: string;
  projectId: string;
  status: "generated" | "shared";
  content: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  generatedAt: string;
  llmModelUsed: string;
  createdAt: string;
};
type ExpectedBuildFlowFsmShareStatusReportInput = {
  statusReportId: string;
  sharedWithEmail: string;
};
type ExpectedBuildFlowFsmShareStatusReportOutput = {
  status: "generated" | "shared";
  sharedAt: string;
  shareLink: string;
  sharedWithEmail: string;
};

type _BuildFlowFsmGenerateStatusReportInput = Assert<Equal<BuildFlowFsmGenerateStatusReportInput, ExpectedBuildFlowFsmGenerateStatusReportInput>>;
type _BuildFlowFsmGenerateStatusReportOutput = Assert<Equal<BuildFlowFsmGenerateStatusReportOutput, ExpectedBuildFlowFsmGenerateStatusReportOutput>>;
type _BuildFlowFsmShareStatusReportInput = Assert<Equal<BuildFlowFsmShareStatusReportInput, ExpectedBuildFlowFsmShareStatusReportInput>>;
type _BuildFlowFsmShareStatusReportOutput = Assert<Equal<BuildFlowFsmShareStatusReportOutput, ExpectedBuildFlowFsmShareStatusReportOutput>>;

export {};