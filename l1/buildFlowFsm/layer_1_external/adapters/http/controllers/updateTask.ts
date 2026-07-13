/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTask.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateTask, type UpdateTaskInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTask.js';

export const buildFlowFsmUpdateTaskHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateTaskInput>;

  if (!params.workTaskId) {
    throw new AppError('VALIDATION_ERROR', 'workTaskId is required', 400, { field: 'workTaskId' });
  }
  if (!params.projectId) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }
  if (!params.title) {
    throw new AppError('VALIDATION_ERROR', 'title is required', 400, { field: 'title' });
  }
  if (!params.description) {
    throw new AppError('VALIDATION_ERROR', 'description is required', 400, { field: 'description' });
  }
  if (!params.dueDate) {
    throw new AppError('VALIDATION_ERROR', 'dueDate is required', 400, { field: 'dueDate' });
  }

  const input: UpdateTaskInput = {
    workTaskId: params.workTaskId,
    projectId: params.projectId,
    title: params.title,
    description: params.description,
    assignedWorkerId: params.assignedWorkerId,
    assignedWorkerName: params.assignedWorkerName,
    dueDate: params.dueDate,
    budgetedCost: params.budgetedCost,
    sequenceNumber: params.sequenceNumber,
  };

  const result = await updateTask(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.updateTask.updateTask', handler: buildFlowFsmUpdateTaskHandler },
];
