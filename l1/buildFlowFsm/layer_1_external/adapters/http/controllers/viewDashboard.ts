/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewDashboard.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewDashboard, type ViewDashboardInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewDashboard.js';

export const buildFlowFsmViewDashboardHandler: BffHandler = async ({ ctx }) => {
  // All input fields (actorId, activeCompanyId) are resolved from session/business context
  // inside the usecase — they are NOT public client boundary inputs. ViewDashboardInput is empty.
  const input: ViewDashboardInput = {};
  const result = await viewDashboard(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.viewDashboard.viewDashboard', handler: buildFlowFsmViewDashboardHandler },
];
