/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.ts" enhancement="_blank"/>

export interface BuildFlowFsmViewInvoiceInput {
  invoiceId: string;
}

export interface BuildFlowFsmViewInvoiceOutputItem {
  invoiceId: string;
  projectId: string;
  status: "draft" | "issued" | "voided";
  laborCost: number;
  materialCost: number;
  changeOrderAmount: number;
  totalAmount: number;
  currency: "usd";
  issuedAt: string;
  notes: string;
  shareLink: string;
  clientEmail: string;
}

export type BuildFlowFsmViewInvoiceOutput = BuildFlowFsmViewInvoiceOutputItem;
