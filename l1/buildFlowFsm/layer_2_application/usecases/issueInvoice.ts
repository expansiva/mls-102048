/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/issueInvoice.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IInvoiceRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.js';
import type { Invoice } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';
import {
  canTransitionInvoice,
  recomputeInvoiceTotal,
  validateInvoiceCurrency,
  validateNonNegativeCosts,
} from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';

export interface IssueInvoiceInput {
  invoiceId: string;
  clientEmail?: string;
}

export interface IssueInvoiceOutput {
  invoiceId: string;
  status: string;
  totalAmount: number;
  shareLink: string;
  clientEmail?: string;
  issuedAt: string;
}

export async function issueInvoice(
  ctx: RequestContext,
  input: IssueInvoiceInput,
): Promise<IssueInvoiceOutput> {
  const invoices = resolveRepository<IInvoiceRepository>(ctx, 'Invoice');

  // Step 1: Load the Invoice aggregate by invoiceId.
  const invoice = await invoices.getById(input.invoiceId);

  // Step 2: Validate that invoice.status === 'draft'.
  if (invoice.status !== 'draft') {
    throw new AppError(
      'VALIDATION_ERROR',
      'invoiceIsInformational: only draft invoices can be issued',
      400,
      { ruleId: 'invoiceIsInformational', currentStatus: invoice.status },
    );
  }

  // Step 3: Apply rule 'allFiguresUsdNoTax' — currency must be USD.
  if (!validateInvoiceCurrency(invoice)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'allFiguresUsdNoTax: invoice currency must be USD',
      400,
      { ruleId: 'allFiguresUsdNoTax', currency: invoice.currency },
    );
  }

  // Step 4: Apply rule 'invoiceCalculation' — recompute totalAmount.
  const computedTotal = recomputeInvoiceTotal(
    invoice.laborCost,
    invoice.materialCost,
    invoice.changeOrderAmount,
  );
  if (invoice.totalAmount !== computedTotal) {
    invoice.totalAmount = computedTotal;
  }

  // Step 5: Apply rule 'approvedChangeOrdersOnly' — changeOrderAmount must be non-negative.
  if (!validateNonNegativeCosts(invoice)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'approvedChangeOrdersOnly: changeOrderAmount must be non-negative (only approved change orders are included)',
      400,
      { ruleId: 'approvedChangeOrdersOnly', changeOrderAmount: invoice.changeOrderAmount },
    );
  }

  // Step 6: Apply rule 'invoiceIsInformational' — no payment processing.
  // The status transition to 'issued' is informational only; no external payment calls are made.

  // Verify the domain transition is valid (draft -> issued).
  if (!canTransitionInvoice(invoice.status, 'issued')) {
    throw new AppError(
      'CONFLICT',
      `Cannot transition invoice from '${invoice.status}' to 'issued'`,
      409,
      { from: invoice.status, to: 'issued' },
    );
  }

  // Step 7: Resolve system-default values.
  const now = ctx.clock.nowIso();
  const shareLink = ctx.idGenerator.newId();

  // Step 8: Set clientEmail if provided; otherwise leave existing value.
  if (input.clientEmail !== undefined) {
    invoice.clientEmail = input.clientEmail;
  }

  // Step 9: Update invoice fields for the issued transition.
  invoice.status = 'issued';
  invoice.issuedAt = now;
  invoice.shareLink = shareLink;
  invoice.updatedAt = now;

  // Step 10: Save inside a transaction.
  await ctx.data.runInTransaction(async () => {
    await invoices.save(invoice);
  });

  // Step 11: Return the output.
  return {
    invoiceId: invoice.invoiceId,
    status: invoice.status,
    totalAmount: invoice.totalAmount,
    shareLink: invoice.shareLink ?? shareLink,
    clientEmail: invoice.clientEmail ?? undefined,
    issuedAt: invoice.issuedAt ?? now,
  };
}
