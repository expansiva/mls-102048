/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateClient.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmDetailRecord } from '/_102034_/l1/mdm/module.js';

export interface UpdateClientInput {
  clientId: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
}

export interface UpdateClientOutput {
  clientId: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
  updatedAt: string;
}

/**
 * Rule clientAccessViaLinksOrAuth (inline):
 * When `portalAccessEnabled` is true the client is granted platform-authentication
 * access to project information. When false the client may only access project
 * information via shareable links. The `portalAccessEnabled` flag IS the enforcement
 * point — no additional state mutation is required beyond persisting the flag value.
 */
function assertClientAccessViaLinksOrAuth(portalAccessEnabled: boolean): void {
  // The flag itself is the enforcement point. This helper exists to document the
  // rule inline and to serve as a single place to extend if additional checks are
  // needed in the future.
  if (typeof portalAccessEnabled !== 'boolean') {
    throw new AppError(
      'VALIDATION_ERROR',
      'portalAccessEnabled must be a boolean value.',
      400,
      { ruleId: 'clientAccessViaLinksOrAuth', field: 'portalAccessEnabled' },
    );
  }
}

export async function updateClient(
  ctx: RequestContext,
  input: UpdateClientInput,
): Promise<UpdateClientOutput> {
  // Step 1: Load the existing Client MDM record
  const existing = await ctx.mdm.entity.get({ mdmId: input.clientId });
  if (!existing) {
    throw new AppError(
      'NOT_FOUND',
      `Client not found: ${input.clientId}`,
      404,
      { ruleId: 'clientAccessViaLinksOrAuth', clientId: input.clientId },
    );
  }

  // Step 2: Validate required fields
  if (!input.name || input.name.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'name is required and must be a non-empty string.',
      400,
      { field: 'name' },
    );
  }
  if (!input.email || input.email.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'email is required and must be a non-empty string.',
      400,
      { field: 'email' },
    );
  }

  // Step 3: Apply rule clientAccessViaLinksOrAuth inline
  assertClientAccessViaLinksOrAuth(input.portalAccessEnabled);

  // Step 4: Resolve updatedAt server-side (systemDefault — never from client)
  const updatedAt = ctx.clock.nowIso();

  // Step 5: Update the Client MDM record via the MDM facade
  const patch = {
    name: input.name,
    buildFlowFsm: {
      companyName: input.companyName ?? null,
      email: input.email,
      phone: input.phone ?? null,
      portalAccessEnabled: input.portalAccessEnabled,
      billingAddress: input.billingAddress ?? null,
      updatedAt,
    },
  } as unknown as Partial<MdmDetailRecord>;

  await ctx.mdm.entity.update({
    mdmId: input.clientId,
    expectedVersion: existing.version,
    patch,
  });

  // Step 6: Return the updated client fields
  return {
    clientId: input.clientId,
    name: input.name,
    companyName: input.companyName,
    email: input.email,
    phone: input.phone,
    portalAccessEnabled: input.portalAccessEnabled,
    billingAddress: input.billingAddress,
    updatedAt,
  };
}
