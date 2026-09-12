/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.ts" enhancement="_blank"/>

export interface BuildFlowFsmVoidTimeLogInput {
  timeLogId: string;
  voidReason: string;
}

export interface BuildFlowFsmVoidTimeLogOutput {
  timeLogId: string;
  status: "posted" | "voided";
  voidedAt: string;
  voidReason: string;
}
