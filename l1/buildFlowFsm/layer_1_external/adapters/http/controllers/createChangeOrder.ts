/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createChangeOrder.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createChangeOrder, type CreateChangeOrderInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/createChangeOrder.js';
import type { BuildFlowFsmCreateChangeOrderOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.js';

export const buildFlowFsmCreateChangeOrderHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CreateChangeOrderInput>;

  if (!params.projectId || params.projectId.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }
  if (!params.title || params.title.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'title is required', 400, { field: 'title' });
  }
  if (!params.scopeDescription || params.scopeDescription.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'scopeDescription is required', 400, { field: 'scopeDescription' });
  }
  if (params.amount === undefined || params.amount === null || typeof params.amount !== 'number') {
    throw new AppError('VALIDATION_ERROR', 'amount is required and must be a number', 400, { field: 'amount' });
  }

  const input: CreateChangeOrderInput = {
    projectId: params.projectId,
    title: params.title,
    scopeDescription: params.scopeDescription,
    amount: params.amount,
  };

  const result = await createChangeOrder(ctx, input);

  const output: BuildFlowFsmCreateChangeOrderOutput = {
    changeOrderId: result.changeOrderId,
    projectId: result.projectId,
    title: result.title,
    scopeDescription: result.scopeDescription,
    amount: result.amount,
    status: result.status as BuildFlowFsmCreateChangeOrderOutput['status'],
    createdAt: result.createdAt,
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.changeOrderLifecycle.createChangeOrder', handler: buildFlowFsmCreateChangeOrderHandler },
];
