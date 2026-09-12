/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.ts" enhancement="_blank"/>
import type { Invoice, InvoiceStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';

/** Branded identity type for an Invoice. */
export type InvoiceId = string;

/** Branded identity type for a Project. */
export type ProjectId = string;

/** ISO-8601 calendar date (e.g. `2026-07-12`). */
export type LocalDate = string;

/** Queryable / indexed fields for listing invoices. */
export interface InvoiceFilter {
  invoiceId?: InvoiceId;
  projectId?: ProjectId;
  status?: InvoiceStatus;
}

export interface IInvoiceRepository {
  /** Retrieve a single invoice by its identity. Throws NOT_FOUND when absent. */
  getById(id: InvoiceId): Promise<Invoice>;

  /** List invoices matching the supplied domain filter. */
  list(filter?: InvoiceFilter): Promise<Invoice[]>;

  /** Persist the invoice aggregate root and its invoice lines. */
  save(aggregate: Invoice): Promise<void>;

  /** Domain finder: all invoices issued for a project. */
  findByProjectId(projectId: ProjectId): Promise<Invoice[]>;

  /** Domain finder: all invoices in a given lifecycle status. */
  findByStatus(status: InvoiceStatus): Promise<Invoice[]>;

  /** Domain finder: invoices whose due date is before the given date and remain unpaid. */
  findOverdue(asOfDate: LocalDate): Promise<Invoice[]>;
}
