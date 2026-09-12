/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.ts" enhancement="_blank"/>

export interface BuildFlowFsmReviewChangeOrderInput {
  changeOrderId: string;
  decision: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  rejectionReason?: string;
}

export interface BuildFlowFsmReviewChangeOrderOutput {
  changeOrderId: string;
  title: string;
  scopeDescription: string;
  amount: number;
  status: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  sentAt: string;
}
