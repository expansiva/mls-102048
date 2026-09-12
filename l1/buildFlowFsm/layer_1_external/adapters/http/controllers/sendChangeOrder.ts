/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/sendChangeOrder.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { sendChangeOrder, type SendChangeOrderInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/sendChangeOrder.js';
import type { BuildFlowFsmSendChangeOrderOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.js';

export const buildFlowFsmSendChangeOrderHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<SendChangeOrderInput>;

  if (!params.changeOrderId || typeof params.changeOrderId !== 'string' || params.changeOrderId.trim() === '') {
    throw new AppError('VALIDATION_ERROR', 'changeOrderId is required', 400, { field: 'changeOrderId' });
  }

  const input: SendChangeOrderInput = {
    changeOrderId: params.changeOrderId,
  };

  const result = await sendChangeOrder(ctx, input);

  const output: BuildFlowFsmSendChangeOrderOutput = {
    changeOrderId: result.changeOrderId,
    status: result.status as BuildFlowFsmSendChangeOrderOutput['status'],
    sentAt: result.sentAt,
    updatedAt: result.updatedAt,
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.changeOrderLifecycle.sendChangeOrder', handler: buildFlowFsmSendChangeOrderHandler },
];
