/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.ts" enhancement="_blank"/>

export type InvoiceStatus = 'draft' | 'issued' | 'voided';
export type InvoiceCurrency = 'usd';
export type InvoiceLineType = 'labor' | 'material' | 'changeOrder';
export type InvoiceLineUnit = 'hour' | 'unit' | 'lumpSum';

export interface InvoiceLine {
  invoiceLineId: string;
  invoiceId: string;
  lineType: InvoiceLineType;
  description: string;
  quantity: number;
  unit: InvoiceLineUnit;
  unitCost: number;
  lineAmount: number;
  sourceRecordId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  invoiceId: string;
  projectId: string;
  status: InvoiceStatus;
  laborCost: number;
  materialCost: number;
  changeOrderAmount: number;
  totalAmount: number;
  currency: InvoiceCurrency;
  shareLink: string | null;
  clientEmail: string | null;
  issuedAt: string | null;
  voidedAt: string | null;
  voidReason: string | null;
  notes: string | null;
  lines: InvoiceLine[];
  createdAt: string;
  updatedAt: string;
}

export const INVOICE_STATUS_TRANSITIONS: Record<InvoiceStatus, InvoiceStatus[]> = {
  draft: ['issued', 'voided'],
  issued: ['voided'],
  voided: [],
};

export function canTransitionInvoice(from: InvoiceStatus, to: InvoiceStatus): boolean {
  return INVOICE_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function recomputeInvoiceTotal(
  laborCost: number,
  materialCost: number,
  changeOrderAmount: number,
): number {
  return laborCost + materialCost + changeOrderAmount;
}

export function validateInvoiceTotal(invoice: Pick<Invoice, 'laborCost' | 'materialCost' | 'changeOrderAmount' | 'totalAmount'>): boolean {
  const expected = recomputeInvoiceTotal(invoice.laborCost, invoice.materialCost, invoice.changeOrderAmount);
  return invoice.totalAmount === expected;
}

export function validateInvoiceCurrency(invoice: Pick<Invoice, 'currency'>): boolean {
  return invoice.currency === 'usd';
}

export function validateNonNegativeCosts(invoice: Pick<Invoice, 'laborCost' | 'materialCost' | 'changeOrderAmount'>): boolean {
  return invoice.laborCost >= 0 && invoice.materialCost >= 0 && invoice.changeOrderAmount >= 0;
}

export function validateIssuedAt(invoice: Pick<Invoice, 'status' | 'issuedAt'>): boolean {
  if (invoice.status === 'issued') {
    return invoice.issuedAt !== null;
  }
  return true;
}

export function validateVoidedFields(invoice: Pick<Invoice, 'status' | 'voidedAt' | 'voidReason'>): boolean {
  if (invoice.status === 'voided') {
    return invoice.voidedAt !== null && invoice.voidReason !== null;
  }
  return true;
}

export function recomputeLineAmount(quantity: number, unitCost: number): number {
  return quantity * unitCost;
}

export function validateInvoiceLineAmount(line: Pick<InvoiceLine, 'quantity' | 'unitCost' | 'lineAmount'>): boolean {
  return line.lineAmount === recomputeLineAmount(line.quantity, line.unitCost);
}

export function validateLinesConsistency(
  invoice: Pick<Invoice, 'lines' | 'laborCost' | 'materialCost' | 'changeOrderAmount'>,
): boolean {
  const laborTotal = invoice.lines
    .filter((line) => line.lineType === 'labor')
    .reduce((sum, line) => sum + line.lineAmount, 0);
  const materialTotal = invoice.lines
    .filter((line) => line.lineType === 'material')
    .reduce((sum, line) => sum + line.lineAmount, 0);
  const changeOrderTotal = invoice.lines
    .filter((line) => line.lineType === 'changeOrder')
    .reduce((sum, line) => sum + line.lineAmount, 0);

  return (
    laborTotal === invoice.laborCost &&
    materialTotal === invoice.materialCost &&
    changeOrderTotal === invoice.changeOrderAmount
  );
}

export function validateInvoice(invoice: Invoice): string[] {
  const errors: string[] = [];

  if (!validateInvoiceCurrency(invoice)) {
    errors.push('currency must always be USD');
  }
  if (!validateNonNegativeCosts(invoice)) {
    errors.push('laborCost, materialCost, and changeOrderAmount must each be non-negative');
  }
  if (!validateInvoiceTotal(invoice)) {
    errors.push('totalAmount must equal laborCost + materialCost + changeOrderAmount');
  }
  if (!validateIssuedAt(invoice)) {
    errors.push('issuedAt must be set when status is issued');
  }
  if (!validateVoidedFields(invoice)) {
    errors.push('voidedAt and voidReason must be set when status is voided');
  }
  if (!validateLinesConsistency(invoice)) {
    errors.push('invoice lines must be consistent with the aggregate cost totals');
  }

  return errors;
}
