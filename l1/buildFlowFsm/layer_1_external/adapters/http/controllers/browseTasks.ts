/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseTasks.ts" enhancement="_blank"/>
import { ok, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { browseTasks, type BrowseTasksInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseTasks.js';

export const buildFlowFsmBrowseTasksHandler: BffHandler = async ({ ctx }) => {
  // assignedWorkerId is resolved from ctx.sessionContext.actorId inside the usecase
  // (source: actorSession), so the controller sends an empty input.
  const input: BrowseTasksInput = {};
  const result = await browseTasks(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.browseTasks.browseTasks', handler: buildFlowFsmBrowseTasksHandler },
];
