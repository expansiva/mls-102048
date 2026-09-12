/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.ts" enhancement="_blank"/>

export interface BuildFlowFsmGenerateStatusReportInput {
  projectId: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
}

export interface BuildFlowFsmGenerateStatusReportOutput {
  statusReportId: string;
  projectId: string;
  status: "generated" | "shared";
  content: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  generatedAt: string;
  llmModelUsed: string;
  createdAt: string;
}

export interface BuildFlowFsmShareStatusReportInput {
  statusReportId: string;
  sharedWithEmail: string;
}

export interface BuildFlowFsmShareStatusReportOutput {
  status: "generated" | "shared";
  sharedAt: string;
  shareLink: string;
  sharedWithEmail: string;
}
