/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createMaterialUsage.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMaterialUsage, type CreateMaterialUsageInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/createMaterialUsage.js';

export const buildFlowFsmCreateMaterialUsageHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CreateMaterialUsageInput>;

  if (!params.projectId) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }
  if (!params.materialName) {
    throw new AppError('VALIDATION_ERROR', 'materialName is required', 400, { field: 'materialName' });
  }
  if (params.quantity === undefined || params.quantity === null) {
    throw new AppError('VALIDATION_ERROR', 'quantity is required', 400, { field: 'quantity' });
  }
  if (!params.unit) {
    throw new AppError('VALIDATION_ERROR', 'unit is required', 400, { field: 'unit' });
  }
  if (params.unitCost === undefined || params.unitCost === null) {
    throw new AppError('VALIDATION_ERROR', 'unitCost is required', 400, { field: 'unitCost' });
  }
  if (params.totalCost === undefined || params.totalCost === null) {
    throw new AppError('VALIDATION_ERROR', 'totalCost is required', 400, { field: 'totalCost' });
  }
  if (!params.usageDate) {
    throw new AppError('VALIDATION_ERROR', 'usageDate is required', 400, { field: 'usageDate' });
  }

  const input: CreateMaterialUsageInput = {
    projectId: params.projectId,
    materialName: params.materialName,
    quantity: params.quantity,
    unit: params.unit,
    unitCost: params.unitCost,
    totalCost: params.totalCost,
    usageDate: params.usageDate,
  };

  const result = await createMaterialUsage(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.createMaterialUsage.createMaterialUsage', handler: buildFlowFsmCreateMaterialUsageHandler },
];
