/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidMaterialUsage.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { voidMaterialUsage, type VoidMaterialUsageInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidMaterialUsage.js';

export const buildFlowFsmVoidMaterialUsageHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<VoidMaterialUsageInput>;

  if (!params.materialUsageId) {
    throw new AppError('VALIDATION_ERROR', 'materialUsageId is required', 400, { field: 'materialUsageId' });
  }
  if (!params.voidReason || params.voidReason.trim() === '') {
    throw new AppError('VALIDATION_ERROR', 'voidReason is required', 400, { field: 'voidReason' });
  }

  const input: VoidMaterialUsageInput = {
    materialUsageId: params.materialUsageId,
    voidReason: params.voidReason,
  };

  const result = await voidMaterialUsage(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.voidMaterialUsage.voidMaterialUsage', handler: buildFlowFsmVoidMaterialUsageHandler },
];
