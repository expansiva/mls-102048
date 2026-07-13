/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createTimeLog.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createTimeLog, type CreateTimeLogInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTimeLog.js';

export const buildFlowFsmCreateTimeLogHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CreateTimeLogInput>;

  if (!params.workTaskId || typeof params.workTaskId !== 'string' || params.workTaskId.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'workTaskId is required', 400, { field: 'workTaskId' });
  }

  if (!params.logDate || typeof params.logDate !== 'string' || params.logDate.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'logDate is required', 400, { field: 'logDate' });
  }

  if (params.hours === undefined || params.hours === null || typeof params.hours !== 'number' || params.hours <= 0) {
    throw new AppError('VALIDATION_ERROR', 'hours is required and must be a positive number', 400, { field: 'hours' });
  }

  const input: CreateTimeLogInput = {
    workTaskId: params.workTaskId,
    logDate: params.logDate,
    hours: params.hours,
  };

  const result = await createTimeLog(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.createTimeLog.createTimeLog', handler: buildFlowFsmCreateTimeLogHandler },
];
