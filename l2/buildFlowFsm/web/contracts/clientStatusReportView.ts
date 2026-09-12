/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.ts" enhancement="_blank"/>

export interface BuildFlowFsmViewStatusReportInput {
  statusReportId: string;
}

export interface BuildFlowFsmViewStatusReportOutputItem {
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
}

export type BuildFlowFsmViewStatusReportOutput = BuildFlowFsmViewStatusReportOutputItem;
