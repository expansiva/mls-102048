/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createClient.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface CreateClientInput {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
}

export interface CreateClientOutput {
  clientId: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
  createdAt: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createClient(ctx: RequestContext, input: CreateClientInput): Promise<CreateClientOutput> {
  // Step 1: Validate required user inputs
  if (!input.name || input.name.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'name is required and must be a non-empty string.', 400, { field: 'name' });
  }
  if (!input.email || input.email.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'email is required and must be a non-empty string.', 400, { field: 'email' });
  }
  if (!EMAIL_REGEX.test(input.email)) {
    throw new AppError('VALIDATION_ERROR', 'email must be a valid email address.', 400, { field: 'email' });
  }

  // Step 2: Apply rule clientAccessViaLinksOrAuth — portalAccessEnabled must be an explicit boolean
  if (typeof input.portalAccessEnabled !== 'boolean') {
    throw new AppError(
      'VALIDATION_ERROR',
      'portalAccessEnabled must be an explicit boolean chosen by the actor — when true the client may use platform authentication; when false the client can only access project information via shareable links.',
      400,
      { ruleId: 'clientAccessViaLinksOrAuth', field: 'portalAccessEnabled' },
    );
  }

  // Step 3: Generate clientId via ctx.idGenerator
  const clientId = ctx.idGenerator.newId();

  // Step 4: Resolve timestamps from ctx.clock
  const now = ctx.clock.nowIso();

  // Step 5: Client entity has no companyId/unitId scoping field — no business-context filter applied (modeling gap recorded).

  // Steps 6-7: Build the MDM entity payload and create inside a single transaction
  await ctx.data.runInTransaction(async () => {
    await ctx.mdm.entity.create({
      details: {
        subtype: 'Person',
        name: input.name,
        status: 'Active',
        moduleTypes: ['buildFlowFsm.Client'],
        tags: ['buildFlowFsm'],
        buildFlowFsm: {
          clientId,
          companyName: input.companyName ?? null,
          email: input.email,
          phone: input.phone ?? null,
          portalAccessEnabled: input.portalAccessEnabled,
          billingAddress: input.billingAddress ?? null,
          createdAt: now,
          updatedAt: now,
        },
      },
    });
  });

  // Step 8: Return the created client projection
  return {
    clientId,
    name: input.name,
    companyName: input.companyName,
    email: input.email,
    phone: input.phone,
    portalAccessEnabled: input.portalAccessEnabled,
    billingAddress: input.billingAddress,
    createdAt: now,
  };
}
