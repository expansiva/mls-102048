/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createProject.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createProject, type CreateProjectInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/createProject.js';

export const buildFlowFsmCreateProjectHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CreateProjectInput>;

  // Validate ONLY genuine client inputs (source: userInput).
  // projectId, createdAt, updatedAt are systemDefault — resolved inside the usecase from ctx.

  if (!params.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (!params.clientId) {
    throw new AppError('VALIDATION_ERROR', 'clientId is required', 400, { field: 'clientId' });
  }
  if (!params.siteAddress) {
    throw new AppError('VALIDATION_ERROR', 'siteAddress is required', 400, { field: 'siteAddress' });
  }
  if (params.budget === undefined || params.budget === null) {
    throw new AppError('VALIDATION_ERROR', 'budget is required', 400, { field: 'budget' });
  }
  if (!params.startDate) {
    throw new AppError('VALIDATION_ERROR', 'startDate is required', 400, { field: 'startDate' });
  }
  if (!params.endDate) {
    throw new AppError('VALIDATION_ERROR', 'endDate is required', 400, { field: 'endDate' });
  }
  if (!params.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  const input: CreateProjectInput = {
    name: params.name,
    clientId: params.clientId,
    siteAddress: params.siteAddress,
    budget: params.budget,
    startDate: params.startDate,
    endDate: params.endDate,
    status: params.status,
  };

  const result = await createProject(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.projectLifecycle.createProject', handler: buildFlowFsmCreateProjectHandler },
];
