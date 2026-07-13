/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewInvoice.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewInvoice, type ViewInvoiceInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewInvoice.js';

export const buildFlowFsmViewInvoiceHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<ViewInvoiceInput>;

  if (!params.invoiceId) {
    throw new AppError('VALIDATION_ERROR', 'invoiceId is required', 400, { field: 'invoiceId' });
  }

  const input: ViewInvoiceInput = {
    invoiceId: params.invoiceId,
  };

  const result = await viewInvoice(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.viewInvoice.viewInvoice', handler: buildFlowFsmViewInvoiceHandler },
];
