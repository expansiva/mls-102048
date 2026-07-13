/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewProject.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewProject, type ViewProjectInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewProject.js';

export const buildFlowFsmViewProjectHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<ViewProjectInput>;

  if (!params.projectId) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }

  const input: ViewProjectInput = {
    projectId: params.projectId,
  };

  const result = await viewProject(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.viewProject.viewProject', handler: buildFlowFsmViewProjectHandler },
];
