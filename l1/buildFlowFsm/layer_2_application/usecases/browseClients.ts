/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseClients.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseClientsInput {
  searchName?: string;
  filterPortalAccess?: boolean;
}

export interface ClientSummary {
  clientId: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  createdAt: string;
}

export interface BrowseClientsOutput {
  clients: ClientSummary[];
}

export async function browseClients(ctx: RequestContext, input: BrowseClientsInput): Promise<BrowseClientsOutput> {
  // Step 1: Retrieve all Client MDM records via listByType (Client is master-data in the shared MDM store).
  const listResult = await ctx.mdm.collection.listByType({ type: 'buildFlowFsm.Client' });

  if (listResult.items.length === 0) {
    return { clients: [] };
  }

  // Fetch full entity details for all listed clients (plural-first: batch read, no per-id loop).
  const mdmIds = listResult.items.map((item) => item.mdmId);
  const entities = await ctx.mdm.collection.getMany({ mdmIds });

  const searchName = input.searchName?.trim().toLowerCase() ?? '';

  const clients: ClientSummary[] = [];

  for (const entity of entities) {
    const details = entity.details as unknown as Record<string, unknown>;

    const name = typeof details.name === 'string' ? details.name : '';
    const companyName = typeof details.companyName === 'string' ? details.companyName : undefined;
    const email = typeof details.email === 'string' ? details.email : '';
    const phone = typeof details.phone === 'string' ? details.phone : undefined;
    const portalAccessEnabled = details.portalAccessEnabled === true;
    const createdAt = typeof details.createdAt === 'string' ? details.createdAt : entity.index.createdAt;

    // Step 2: Filter by searchName (case-insensitive contains match).
    if (searchName && !name.toLowerCase().includes(searchName)) {
      continue;
    }

    // Step 3: Filter by portalAccessEnabled when provided.
    if (input.filterPortalAccess !== undefined && input.filterPortalAccess !== null) {
      if (portalAccessEnabled !== input.filterPortalAccess) {
        continue;
      }
    }

    // Step 4: Project to output shape.
    clients.push({
      clientId: entity.mdmId,
      name,
      companyName,
      email,
      phone,
      portalAccessEnabled,
      createdAt,
    });
  }

  // Step 6: Sort by createdAt descending (most recent first).
  clients.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // Step 5 / rule 'projectRequiresClient': return the filtered list; an empty list signals
  // "no eligible client" and the caller handles that case.
  return { clients };
}
