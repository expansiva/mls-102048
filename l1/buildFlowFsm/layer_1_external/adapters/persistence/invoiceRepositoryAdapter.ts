/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoiceRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IInvoiceRepository, InvoiceFilter, InvoiceId, ProjectId, LocalDate } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.js';
import type { Invoice, InvoiceLine, InvoiceStatus, InvoiceCurrency, InvoiceLineType, InvoiceLineUnit } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';

interface InvoiceRow {
  invoice_id: string;
  project_id: string;
  status: string;
  currency: string;
  created_at: string;
  details: string | null;
}

interface InvoiceDetails {
  laborCost: number;
  materialCost: number;
  changeOrderAmount: number;
  totalAmount: number;
  shareLink: string | null;
  clientEmail: string | null;
  issuedAt: string | null;
  voidedAt: string | null;
  voidReason: string | null;
  notes: string | null;
  updatedAt: string;
  invoiceLines: InvoiceLine[];
}

function toRow(invoice: Invoice): InvoiceRow {
  const details: InvoiceDetails = {
    laborCost: invoice.laborCost,
    materialCost: invoice.materialCost,
    changeOrderAmount: invoice.changeOrderAmount,
    totalAmount: invoice.totalAmount,
    shareLink: invoice.shareLink,
    clientEmail: invoice.clientEmail,
    issuedAt: invoice.issuedAt,
    voidedAt: invoice.voidedAt,
    voidReason: invoice.voidReason,
    notes: invoice.notes,
    updatedAt: invoice.updatedAt,
    invoiceLines: invoice.lines,
  };
  return {
    invoice_id: invoice.invoiceId,
    project_id: invoice.projectId,
    status: invoice.status,
    currency: invoice.currency,
    created_at: invoice.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: InvoiceRow): InvoiceDetails {
  try {
    return JSON.parse(row.details ?? '{}') as InvoiceDetails;
  } catch {
    return {
      laborCost: 0,
      materialCost: 0,
      changeOrderAmount: 0,
      totalAmount: 0,
      shareLink: null,
      clientEmail: null,
      issuedAt: null,
      voidedAt: null,
      voidReason: null,
      notes: null,
      updatedAt: row.created_at,
      invoiceLines: [],
    };
  }
}

function toDomain(row: InvoiceRow): Invoice {
  const d = parseDetails(row);
  return {
    invoiceId: row.invoice_id,
    projectId: row.project_id,
    status: row.status as InvoiceStatus,
    laborCost: d.laborCost,
    materialCost: d.materialCost,
    changeOrderAmount: d.changeOrderAmount,
    totalAmount: d.totalAmount,
    currency: row.currency as InvoiceCurrency,
    shareLink: d.shareLink,
    clientEmail: d.clientEmail,
    issuedAt: d.issuedAt,
    voidedAt: d.voidedAt,
    voidReason: d.voidReason,
    notes: d.notes,
    lines: d.invoiceLines ?? [],
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createInvoiceRepositoryAdapter(ctx: RequestContext): IInvoiceRepository {
  const getTable = () => ctx.data.moduleData.getTable<InvoiceRow>('invoice');

  return {
    async getById(id: InvoiceId): Promise<Invoice> {
      const repo = await getTable();
      const row = await repo.findOne({ where: { invoice_id: id } });
      if (!row) throw new AppError('NOT_FOUND', `Invoice ${id} not found`, 404, { invoiceId: id });
      return toDomain(row);
    },

    async list(filter?: InvoiceFilter): Promise<Invoice[]> {
      const repo = await getTable();
      const where: Partial<InvoiceRow> = {};
      if (filter?.invoiceId) where.invoice_id = filter.invoiceId;
      if (filter?.projectId) where.project_id = filter.projectId;
      if (filter?.status) where.status = filter.status;
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async save(aggregate: Invoice): Promise<void> {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { invoice_id: aggregate.invoiceId } });
      if (existing) {
        await repo.update({ where: { invoice_id: aggregate.invoiceId }, patch: toRow(aggregate) });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByProjectId(projectId: ProjectId): Promise<Invoice[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { project_id: projectId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async findByStatus(status: InvoiceStatus): Promise<Invoice[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { status },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async findOverdue(asOfDate: LocalDate): Promise<Invoice[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { status: 'issued' },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      const invoices = rows.map(toDomain);
      return invoices.filter((inv) => {
        if (!inv.issuedAt) return false;
        return inv.issuedAt.slice(0, 10) < asOfDate;
      });
    },
  };
}
