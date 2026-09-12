/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmViewInvoiceInput, BuildFlowFsmViewInvoiceOutput, BuildFlowFsmViewInvoiceOutputItem } from './clientInvoiceView.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmViewInvoiceInput = {
  invoiceId: string;
};
type ExpectedBuildFlowFsmViewInvoiceOutputItem = {
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
};
type ExpectedBuildFlowFsmViewInvoiceOutput = ExpectedBuildFlowFsmViewInvoiceOutputItem;

type _BuildFlowFsmViewInvoiceInput = Assert<Equal<BuildFlowFsmViewInvoiceInput, ExpectedBuildFlowFsmViewInvoiceInput>>;
type _BuildFlowFsmViewInvoiceOutputItem = Assert<Equal<BuildFlowFsmViewInvoiceOutputItem, ExpectedBuildFlowFsmViewInvoiceOutputItem>>;
type _BuildFlowFsmViewInvoiceOutput = Assert<Equal<BuildFlowFsmViewInvoiceOutput, ExpectedBuildFlowFsmViewInvoiceOutput>>;

export {};