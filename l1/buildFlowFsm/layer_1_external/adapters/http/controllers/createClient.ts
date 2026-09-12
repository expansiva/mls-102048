/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createClient.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createClient, type CreateClientInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/createClient.js';

export const buildFlowFsmCreateClientHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<CreateClientInput>;

  if (!params.name || params.name.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }

  if (!params.email || params.email.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'email is required', 400, { field: 'email' });
  }

  if (typeof params.portalAccessEnabled !== 'boolean') {
    throw new AppError('VALIDATION_ERROR', 'portalAccessEnabled must be an explicit boolean', 400, { field: 'portalAccessEnabled' });
  }

  const input: CreateClientInput = {
    name: params.name,
    email: params.email,
    portalAccessEnabled: params.portalAccessEnabled,
    companyName: params.companyName,
    phone: params.phone,
    billingAddress: params.billingAddress,
  };

  const result = await createClient(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.createClient.createClient', handler: buildFlowFsmCreateClientHandler },
];
