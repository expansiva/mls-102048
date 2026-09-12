/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateClient.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateClient, type UpdateClientInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateClient.js';

export const buildFlowFsmUpdateClientHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<UpdateClientInput>;

  if (!params.clientId) {
    throw new AppError('VALIDATION_ERROR', 'clientId is required', 400, { field: 'clientId' });
  }
  if (!params.name || params.name.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (!params.email || params.email.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'email is required', 400, { field: 'email' });
  }
  if (typeof params.portalAccessEnabled !== 'boolean') {
    throw new AppError('VALIDATION_ERROR', 'portalAccessEnabled is required and must be a boolean', 400, { field: 'portalAccessEnabled' });
  }

  const input: UpdateClientInput = {
    clientId: params.clientId,
    name: params.name,
    companyName: params.companyName,
    email: params.email,
    phone: params.phone,
    portalAccessEnabled: params.portalAccessEnabled,
    billingAddress: params.billingAddress,
  };

  const result = await updateClient(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.updateClient.updateClient', handler: buildFlowFsmUpdateClientHandler },
];
