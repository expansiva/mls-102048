/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createTask.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createTask, type CreateTaskInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTask.js';
import type { BuildFlowFsmCreateTaskOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.js';

export const buildFlowFsmCreateTaskHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CreateTaskInput>;

  // Validate only genuine client boundary inputs (userInput + routeParam).
  if (!params.title) {
    throw new AppError('VALIDATION_ERROR', 'title is required', 400, { field: 'title' });
  }
  if (!params.description) {
    throw new AppError('VALIDATION_ERROR', 'description is required', 400, { field: 'description' });
  }
  if (!params.dueDate) {
    throw new AppError('VALIDATION_ERROR', 'dueDate is required', 400, { field: 'dueDate' });
  }
  if (!params.projectId) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }

  // Build an explicit input with only the client-provided fields.
  // systemDefault fields (workTaskId, status, createdAt, updatedAt) are resolved inside the usecase.
  const input: CreateTaskInput = {
    projectId: params.projectId,
    title: params.title,
    description: params.description,
    dueDate: params.dueDate,
    assignedWorkerId: params.assignedWorkerId,
    assignedWorkerName: params.assignedWorkerName,
    budgetedCost: params.budgetedCost,
    sequenceNumber: params.sequenceNumber,
  };

  const result = await createTask(ctx, input);

  // Map to the frontend contract output.
  const output: BuildFlowFsmCreateTaskOutput = {
    workTaskId: result.workTaskId,
    title: result.title,
    status: result.status as BuildFlowFsmCreateTaskOutput['status'],
    dueDate: result.dueDate,
    assignedWorkerName: result.assignedWorkerName ?? '',
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.workTaskLifecycle.createTask', handler: buildFlowFsmCreateTaskHandler },
];
