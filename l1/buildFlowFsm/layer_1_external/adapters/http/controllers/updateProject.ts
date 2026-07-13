/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProject.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateProject, type UpdateProjectInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProject.js';

export const buildFlowFsmUpdateProjectHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateProjectInput> & Record<string, unknown>;

  // projectId — routeParam (client boundary)
  const projectId = params.projectId;
  if (!projectId || typeof projectId !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }

  // name — userInput (client boundary)
  const name = params.name;
  if (!name || typeof name !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }

  // clientId — userInput (client boundary)
  const clientId = params.clientId;
  if (!clientId || typeof clientId !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'clientId is required', 400, { field: 'clientId' });
  }

  // siteAddress — userInput (client boundary)
  const siteAddress = params.siteAddress;
  if (!siteAddress || typeof siteAddress !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'siteAddress is required', 400, { field: 'siteAddress' });
  }

  // budget — userInput (client boundary)
  const budget = params.budget;
  if (budget === undefined || budget === null || typeof budget !== 'number') {
    throw new AppError('VALIDATION_ERROR', 'budget is required and must be a number', 400, { field: 'budget' });
  }

  // startDate — userInput (client boundary)
  const startDate = params.startDate;
  if (!startDate || typeof startDate !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'startDate is required', 400, { field: 'startDate' });
  }

  // endDate — userInput (client boundary)
  const endDate = params.endDate;
  if (!endDate || typeof endDate !== 'string') {
    throw new AppError('VALIDATION_ERROR', 'endDate is required', 400, { field: 'endDate' });
  }

  // updatedAt is systemDefault — resolved inside the usecase from ctx.clock, NOT a client field.

  const input: UpdateProjectInput = {
    projectId,
    name,
    clientId,
    siteAddress,
    budget,
    startDate,
    endDate,
  };

  const result = await updateProject(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.updateProject.updateProject', handler: buildFlowFsmUpdateProjectHandler },
];
