/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/assignTask.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { assignTask, type AssignTaskInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/assignTask.js';
import type { BuildFlowFsmAssignTaskOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.js';

export const buildFlowFsmAssignTaskHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<AssignTaskInput>;

  if (!params.workTaskId) {
    throw new AppError('VALIDATION_ERROR', 'workTaskId is required', 400, { field: 'workTaskId' });
  }
  if (!params.assignedWorkerId) {
    throw new AppError('VALIDATION_ERROR', 'assignedWorkerId is required', 400, { field: 'assignedWorkerId' });
  }
  if (!params.assignedWorkerName) {
    throw new AppError('VALIDATION_ERROR', 'assignedWorkerName is required', 400, { field: 'assignedWorkerName' });
  }
  if (!params.dueDate) {
    throw new AppError('VALIDATION_ERROR', 'dueDate is required', 400, { field: 'dueDate' });
  }

  const input: AssignTaskInput = {
    workTaskId: params.workTaskId,
    assignedWorkerId: params.assignedWorkerId,
    assignedWorkerName: params.assignedWorkerName,
    dueDate: params.dueDate,
  };

  const result = await assignTask(ctx, input);

  const output: BuildFlowFsmAssignTaskOutput = {
    workTaskId: result.workTaskId,
    title: result.title,
    status: result.status as BuildFlowFsmAssignTaskOutput['status'],
    assignedWorkerId: result.assignedWorkerId,
    assignedWorkerName: result.assignedWorkerName,
    dueDate: result.dueDate,
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.workTaskLifecycle.assignTask', handler: buildFlowFsmAssignTaskHandler },
];
