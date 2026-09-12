/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/issueInvoice.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { issueInvoice, type IssueInvoiceInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/issueInvoice.js';
import type { BuildFlowFsmIssueInvoiceOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.js';

export const buildFlowFsmIssueInvoiceHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<IssueInvoiceInput>;

  // Validate only genuine client boundary inputs (selectedEntity + userInput).
  if (!params.invoiceId) {
    throw new AppError('VALIDATION_ERROR', 'invoiceId is required', 400, { field: 'invoiceId' });
  }

  // Build an explicit input with only the client-provided fields.
  // actorId, issuedAt, and shareLink are resolved inside the usecase from ctx — NOT forwarded.
  const input: IssueInvoiceInput = {
    invoiceId: params.invoiceId,
    ...(params.clientEmail !== undefined ? { clientEmail: params.clientEmail } : {}),
  };

  const result = await issueInvoice(ctx, input);

  // Map to the frontend contract output.
  const output: BuildFlowFsmIssueInvoiceOutput = {
    invoiceId: result.invoiceId,
    status: result.status as 'draft' | 'issued' | 'voided',
    totalAmount: result.totalAmount,
    shareLink: result.shareLink,
    clientEmail: result.clientEmail ?? '',
    issuedAt: result.issuedAt,
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.invoiceLifecycle.issueInvoice', handler: buildFlowFsmIssueInvoiceHandler },
];
