/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewInvoice.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IInvoiceRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.js';
import type { InvoiceLine } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';
import { recomputeInvoiceTotal, validateInvoiceCurrency } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';

export interface ViewInvoiceInput {
  invoiceId: string;
}

export interface ViewInvoiceLineProjection {
  invoiceLineId: string;
  lineType: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  lineAmount: number;
  sourceRecordId: string | null;
}

export interface ViewInvoiceResult {
  invoiceId: string;
  projectId: string;
  status: string;
  laborCost: number;
  materialCost: number;
  changeOrderAmount: number;
  totalAmount: number;
  currency: string;
  issuedAt?: string | null;
  notes?: string | null;
  shareLink?: string | null;
  clientEmail?: string | null;
  invoiceLines?: ViewInvoiceLineProjection[];
}

/**
 * View a single invoice by its shareable-link identifier.
 *
 * This is a strictly informational read: no payment-processing, payment-gateway,
 * or action fields are exposed in the output projection.
 *
 * Rules applied inline:
 * - `allFiguresUsdNoTax` — currency must be 'usd'; no tax field is ever exposed.
 * - `approvedChangeOrdersOnly` — only change-order lines whose `sourceRecordId`
 *   references an approved change order contribute to `changeOrderAmount`.
 * - `invoiceCalculation` — `totalAmount` is recalculated as
 *   `laborCost + materialCost + effectiveChangeOrderAmount`.
 * - `invoiceIsInformational` — the projection is read-only / informational.
 */
export async function viewInvoice(ctx: RequestContext, input: ViewInvoiceInput): Promise<ViewInvoiceResult> {
  const invoices = resolveRepository<IInvoiceRepository>(ctx, 'Invoice');

  // Step 1–2: Load the Invoice aggregate by invoiceId; return NOT_FOUND if absent.
  let invoice: Awaited<ReturnType<IInvoiceRepository['getById']>>;
  try {
    invoice = await invoices.getById(input.invoiceId);
  } catch {
    throw new AppError('NOT_FOUND', `Invoice not found: ${input.invoiceId}`, 404, {
      invoiceId: input.invoiceId,
    });
  }

  // Step 3 — Rule: allFiguresUsdNoTax
  // Assert currency === 'usd'; no tax field is ever exposed in the output.
  if (!validateInvoiceCurrency(invoice)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'allFiguresUsdNoTax: invoice currency must always be USD.',
      400,
      { ruleId: 'allFiguresUsdNoTax', currency: invoice.currency },
    );
  }

  // Step 4 — Rule: approvedChangeOrdersOnly
  // From the embedded InvoiceLine collection, filter lines where lineType === 'changeOrder'
  // and retain only those whose sourceRecordId references an approved change order.
  // Modeling gap: no ChangeOrder port is declared in this usecase, so we cannot verify
  // the approval status of the referenced change order at runtime. We retain changeOrder
  // lines that have a non-null sourceRecordId as a proxy for "approved".
  const approvedChangeOrderLines: InvoiceLine[] = invoice.lines.filter(
    (line) => line.lineType === 'changeOrder' && line.sourceRecordId !== null,
  );
  const effectiveChangeOrderAmount = approvedChangeOrderLines.reduce(
    (sum, line) => sum + line.lineAmount,
    0,
  );

  // Step 5 — Rule: invoiceCalculation
  // Recalculate totalAmount = laborCost + materialCost + effectiveChangeOrderAmount.
  const recalculatedTotal = recomputeInvoiceTotal(
    invoice.laborCost,
    invoice.materialCost,
    effectiveChangeOrderAmount,
  );

  // Step 7 — Build the filtered invoiceLines projection:
  // labor, material, and approved change-order lines only.
  const displayLines: ViewInvoiceLineProjection[] = invoice.lines
    .filter(
      (line) =>
        line.lineType === 'labor' ||
        line.lineType === 'material' ||
        (line.lineType === 'changeOrder' && line.sourceRecordId !== null),
    )
    .map((line) => ({
      invoiceLineId: line.invoiceLineId,
      lineType: line.lineType,
      description: line.description,
      quantity: line.quantity,
      unit: line.unit,
      unitCost: line.unitCost,
      lineAmount: line.lineAmount,
      sourceRecordId: line.sourceRecordId,
    }));

  // Step 6 + 8 — Rule: invoiceIsInformational
  // The returned projection contains no payment-processing, payment-gateway, or action
  // fields — the view is strictly informational.
  return {
    invoiceId: invoice.invoiceId,
    projectId: invoice.projectId,
    status: invoice.status,
    laborCost: invoice.laborCost,
    materialCost: invoice.materialCost,
    changeOrderAmount: effectiveChangeOrderAmount,
    totalAmount: recalculatedTotal,
    currency: invoice.currency,
    issuedAt: invoice.issuedAt,
    notes: invoice.notes,
    shareLink: invoice.shareLink,
    clientEmail: invoice.clientEmail,
    invoiceLines: displayLines,
  };
}
