/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.ts" enhancement="_blank"/>

export interface BuildFlowFsmCreateChangeOrderInput {
  projectId: string;
  title: string;
  scopeDescription: string;
  amount: number;
}

export interface BuildFlowFsmCreateChangeOrderOutput {
  changeOrderId: string;
  projectId: string;
  title: string;
  scopeDescription: string;
  amount: number;
  status: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  createdAt: string;
}

export interface BuildFlowFsmSendChangeOrderInput {
  changeOrderId: string;
}

export interface BuildFlowFsmSendChangeOrderOutput {
  changeOrderId: string;
  status: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  sentAt: string;
  updatedAt: string;
}
