/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/reviewChangeOrder.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { reviewChangeOrder, type ReviewChangeOrderInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/reviewChangeOrder.js';

export const buildFlowFsmReviewChangeOrderHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<ReviewChangeOrderInput>;

  if (!params.changeOrderId) {
    throw new AppError('VALIDATION_ERROR', 'changeOrderId is required', 400, { field: 'changeOrderId' });
  }

  if (!params.decision) {
    throw new AppError('VALIDATION_ERROR', 'decision is required', 400, { field: 'decision' });
  }

  const input: ReviewChangeOrderInput = {
    changeOrderId: params.changeOrderId,
    decision: params.decision,
    ...(params.rejectionReason !== undefined ? { rejectionReason: params.rejectionReason } : {}),
  };

  const result = await reviewChangeOrder(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.changeOrderLifecycle.reviewChangeOrder', handler: buildFlowFsmReviewChangeOrderHandler },
];
