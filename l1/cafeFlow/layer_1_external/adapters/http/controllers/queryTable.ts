/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/queryTable.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { queryTableById, type QueryTableByIdInput } from '/_102048_/l1/cafeFlow/layer_2_application/usecases/queryTable.js';
import { queryTables, type QueryTablesInput, type TableView } from '/_102048_/l1/cafeFlow/layer_2_application/usecases/queryTable.js';
import type { CafeFlowQueryTableOutputItem, CafeFlowQueryTableOutput } from '/_102048_/l2/cafeFlow/web/contracts/queryTable.js';

// ── Helpers ───────────────────────────────────────────────────────────

function mapToContractItem(view: TableView): CafeFlowQueryTableOutputItem {
  return {
    tableId: view.tableId,
    tableNumber: view.tableNumber,
    capacity: view.capacity ?? 0,
    status: (view.status === 'inactive' ? 'inactive' : 'active') as 'active' | 'inactive',
    createdAt: view.createdAt,
    updatedAt: view.updatedAt,
  };
}

// ── Handlers ──────────────────────────────────────────────────────────

export const cafeFlowQueryTableByIdHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as QueryTableByIdInput;
  if (!input || !input.tableId) {
    throw new AppError('VALIDATION_ERROR', 'tableId is required', 400, { field: 'tableId' });
  }

  const result = await queryTableById(ctx, input);
  const output: CafeFlowQueryTableOutput = result ? [mapToContractItem(result)] : [];
  return ok(output);
};

export const cafeFlowQueryTablesHandler: BffHandler = async ({ request, ctx }) => {
  const input = (request.params ?? {}) as QueryTablesInput;

  const result = await queryTables(ctx, input);
  const output: CafeFlowQueryTableOutput = result.items.map(mapToContractItem);
  return ok(output);
};

// Canonical BFF route from l4 (bffName): dispatches to the variant matching the provided params.
export const cafeFlowQueryTableHandler: BffHandler = async (args) => {
  const params = (args.request.params ?? {}) as { tableId?: string };
  if (params.tableId) return cafeFlowQueryTableByIdHandler(args);
  return cafeFlowQueryTablesHandler(args);
};

// ── Routes ────────────────────────────────────────────────────────────

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.queryTable.queryTable', handler: cafeFlowQueryTableHandler },
  { key: 'cafeFlow.queryTable.queryTableById', handler: cafeFlowQueryTableByIdHandler },
  { key: 'cafeFlow.queryTable.queryTables', handler: cafeFlowQueryTablesHandler },
];
