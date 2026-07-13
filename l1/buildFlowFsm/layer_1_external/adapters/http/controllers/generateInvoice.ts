/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateInvoice.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { generateInvoice, type GenerateInvoiceInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateInvoice.js';
import type { BuildFlowFsmGenerateInvoiceOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.js';

export const buildFlowFsmGenerateInvoiceHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<GenerateInvoiceInput>;

  // Validate only genuine client boundary inputs (selectedEntity + userInput)
  if (!params.projectId) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }

  const input: GenerateInvoiceInput = {
    projectId: params.projectId,
    ...(params.clientEmail !== undefined ? { clientEmail: params.clientEmail } : {}),
    ...(params.notes !== undefined ? { notes: params.notes } : {}),
  };

  const result = await generateInvoice(ctx, input);

  // Map usecase output to the frontend contract
  const output: BuildFlowFsmGenerateInvoiceOutput = {
    invoiceId: result.invoiceId,
    status: result.status as 'draft' | 'issued' | 'voided',
    laborCost: result.laborCost,
    materialCost: result.materialCost,
    changeOrderAmount: result.changeOrderAmount,
    totalAmount: result.totalAmount,
    currency: 'usd',
    shareLink: result.shareLink ?? '',
    clientEmail: result.clientEmail ?? '',
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.invoiceLifecycle.generateInvoice', handler: buildFlowFsmGenerateInvoiceHandler },
];
