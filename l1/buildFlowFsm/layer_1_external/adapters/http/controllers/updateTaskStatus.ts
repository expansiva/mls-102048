/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTaskStatus.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateTaskStatus, type UpdateTaskStatusInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTaskStatus.js';

export const buildFlowFsmUpdateTaskStatusHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateTaskStatusInput>;

  // Validate ONLY genuine client boundary inputs:
  //   workTaskId (selectedEntity) and status (userInput).
  // actorId, startedAt, completedAt, updatedAt are resolved inside the usecase
  // from ctx.sessionContext / ctx.clock and are NOT on UpdateTaskStatusInput.
  if (!params.workTaskId) {
    throw new AppError('VALIDATION_ERROR', 'workTaskId is required', 400, { field: 'workTaskId' });
  }
  if (!params.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  const input: UpdateTaskStatusInput = {
    workTaskId: params.workTaskId,
    status: params.status,
  };

  const result = await updateTaskStatus(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.workTaskLifecycle.updateTaskStatus', handler: buildFlowFsmUpdateTaskStatusHandler },
];
