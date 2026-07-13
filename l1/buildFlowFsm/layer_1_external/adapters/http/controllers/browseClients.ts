/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseClients.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { browseClients, type BrowseClientsInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseClients.js';

export const buildFlowFsmBrowseClientsHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<BrowseClientsInput>;

  const input: BrowseClientsInput = {
    searchName: typeof params.searchName === 'string' ? params.searchName : undefined,
    filterPortalAccess: typeof params.filterPortalAccess === 'boolean' ? params.filterPortalAccess : undefined,
  };

  const result = await browseClients(ctx, input);
  return ok(result.clients);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.browseClients.browseClients', handler: buildFlowFsmBrowseClientsHandler },
];
