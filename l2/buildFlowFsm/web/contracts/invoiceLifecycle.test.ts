/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmGenerateInvoiceInput, BuildFlowFsmGenerateInvoiceOutput, BuildFlowFsmIssueInvoiceInput, BuildFlowFsmIssueInvoiceOutput } from './invoiceLifecycle.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmGenerateInvoiceInput = {
  projectId: string;
  clientEmail?: string;
  notes?: string;
};
type ExpectedBuildFlowFsmGenerateInvoiceOutput = {
  invoiceId: string;
  status: "draft" | "issued" | "voided";
  laborCost: number;
  materialCost: number;
  changeOrderAmount: number;
  totalAmount: number;
  currency: "usd";
  shareLink: string;
  clientEmail: string;
};
type ExpectedBuildFlowFsmIssueInvoiceInput = {
  invoiceId: string;
  clientEmail?: string;
};
type ExpectedBuildFlowFsmIssueInvoiceOutput = {
  invoiceId: string;
  status: "draft" | "issued" | "voided";
  totalAmount: number;
  shareLink: string;
  clientEmail: string;
  issuedAt: string;
};

type _BuildFlowFsmGenerateInvoiceInput = Assert<Equal<BuildFlowFsmGenerateInvoiceInput, ExpectedBuildFlowFsmGenerateInvoiceInput>>;
type _BuildFlowFsmGenerateInvoiceOutput = Assert<Equal<BuildFlowFsmGenerateInvoiceOutput, ExpectedBuildFlowFsmGenerateInvoiceOutput>>;
type _BuildFlowFsmIssueInvoiceInput = Assert<Equal<BuildFlowFsmIssueInvoiceInput, ExpectedBuildFlowFsmIssueInvoiceInput>>;
type _BuildFlowFsmIssueInvoiceOutput = Assert<Equal<BuildFlowFsmIssueInvoiceOutput, ExpectedBuildFlowFsmIssueInvoiceOutput>>;

export {};