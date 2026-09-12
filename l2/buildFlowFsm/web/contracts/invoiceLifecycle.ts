/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.ts" enhancement="_blank"/>

export interface BuildFlowFsmGenerateInvoiceInput {
  projectId: string;
  clientEmail?: string;
  notes?: string;
}

export interface BuildFlowFsmGenerateInvoiceOutput {
  invoiceId: string;
  status: "draft" | "issued" | "voided";
  laborCost: number;
  materialCost: number;
  changeOrderAmount: number;
  totalAmount: number;
  currency: "usd";
  shareLink: string;
  clientEmail: string;
}

export interface BuildFlowFsmIssueInvoiceInput {
  invoiceId: string;
  clientEmail?: string;
}

export interface BuildFlowFsmIssueInvoiceOutput {
  invoiceId: string;
  status: "draft" | "issued" | "voided";
  totalAmount: number;
  shareLink: string;
  clientEmail: string;
  issuedAt: string;
}
