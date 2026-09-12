/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceLineRepository.ts" enhancement="_blank"/>
import type { InvoiceLine } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';

export type InvoiceLineId = string;
export type InvoiceId = string;

export interface InvoiceLineFilter {
  invoiceId?: InvoiceId;
  status?: string;
}

export interface IInvoiceLineRepository {
  getById(id: InvoiceLineId): Promise<InvoiceLine | null>;
  list(filter: InvoiceLineFilter): Promise<InvoiceLine[]>;
  save(aggregate: InvoiceLine): Promise<void>;
  listByInvoiceId(invoiceId: InvoiceId): Promise<InvoiceLine[]>;
}
