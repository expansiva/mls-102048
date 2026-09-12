/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.ts" enhancement="_blank"/>

export interface BuildFlowFsmVoidMaterialUsageInput {
  materialUsageId: string;
  voidReason: string;
}

export interface BuildFlowFsmVoidMaterialUsageOutput {
  materialUsageId: string;
  status: "posted" | "voided";
  voidedAt: string;
  voidReason: string;
}
