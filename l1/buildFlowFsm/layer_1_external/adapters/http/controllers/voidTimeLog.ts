/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidTimeLog.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { voidTimeLog, type VoidTimeLogInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidTimeLog.js';

export const buildFlowFsmVoidTimeLogHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<VoidTimeLogInput>;

  // Validate ONLY genuine client boundary inputs:
  //   timeLogId (selectedEntity) and voidReason (userInput).
  //   voidedAt (systemDefault) and actorId (actorSession) are resolved inside the usecase
  //   from ctx and are NOT on the usecase Input type.
  if (!params.timeLogId) {
    throw new AppError('VALIDATION_ERROR', 'timeLogId is required', 400, { field: 'timeLogId' });
  }
  if (!params.voidReason) {
    throw new AppError('VALIDATION_ERROR', 'voidReason is required', 400, { field: 'voidReason' });
  }

  const input: VoidTimeLogInput = {
    timeLogId: params.timeLogId,
    voidReason: params.voidReason,
  };

  const result = await voidTimeLog(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.voidTimeLog.voidTimeLog', handler: buildFlowFsmVoidTimeLogHandler },
];
