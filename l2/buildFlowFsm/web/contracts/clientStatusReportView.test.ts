/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmViewStatusReportInput, BuildFlowFsmViewStatusReportOutput, BuildFlowFsmViewStatusReportOutputItem } from './clientStatusReportView.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmViewStatusReportInput = {
  statusReportId: string;
};
type ExpectedBuildFlowFsmViewStatusReportOutputItem = {
  statusReportId: string;
  projectId: string;
  status: "generated" | "shared";
  content: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  generatedAt: string;
  llmModelUsed: string;
  sharedAt: string;
  shareLink: string;
  sharedWithEmail: string;
};
type ExpectedBuildFlowFsmViewStatusReportOutput = ExpectedBuildFlowFsmViewStatusReportOutputItem;

type _BuildFlowFsmViewStatusReportInput = Assert<Equal<BuildFlowFsmViewStatusReportInput, ExpectedBuildFlowFsmViewStatusReportInput>>;
type _BuildFlowFsmViewStatusReportOutputItem = Assert<Equal<BuildFlowFsmViewStatusReportOutputItem, ExpectedBuildFlowFsmViewStatusReportOutputItem>>;
type _BuildFlowFsmViewStatusReportOutput = Assert<Equal<BuildFlowFsmViewStatusReportOutput, ExpectedBuildFlowFsmViewStatusReportOutput>>;

export {};