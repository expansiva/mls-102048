/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProjectStatus.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateProjectStatus, type UpdateProjectStatusInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProjectStatus.js';

export const buildFlowFsmUpdateProjectStatusHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateProjectStatusInput>;

  if (!params.projectId) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }

  if (!params.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  const input: UpdateProjectStatusInput = {
    projectId: params.projectId,
    status: params.status,
    cancellationReason: params.cancellationReason,
  };

  const result = await updateProjectStatus(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.projectLifecycle.updateProjectStatus', handler: buildFlowFsmUpdateProjectStatusHandler },
];
