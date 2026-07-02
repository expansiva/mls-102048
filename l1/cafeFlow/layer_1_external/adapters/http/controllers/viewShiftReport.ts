/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftReport.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  viewShiftReportById,
  viewShiftReportByDailyShiftId,
  type ViewShiftReportByIdInput,
  type ViewShiftReportByDailyShiftIdInput,
} from '/_102048_/l1/cafeFlow/layer_2_application/usecases/viewShiftReport.js';
import type {
  CafeFlowViewShiftReportOutput,
  CafeFlowViewShiftReportOutputItem,
} from '/_102048_/l2/cafeFlow/web/contracts/shiftLifecycle.js';

function toContractOutput(view: {
  shiftCloseReportId: string;
  dailyShiftId: string;
  totalSales: number;
  totalOrders: number;
  bestSellingItems: string;
  stockConsumptionSummary: string;
  operationalMetrics: string;
  createdAt: string;
}): CafeFlowViewShiftReportOutput {
  const item: CafeFlowViewShiftReportOutputItem = {
    shiftCloseReportId: view.shiftCloseReportId,
    dailyShiftId: view.dailyShiftId,
    totalSales: view.totalSales,
    totalOrders: view.totalOrders,
    bestSellingItems: view.bestSellingItems,
    stockConsumptionSummary: view.stockConsumptionSummary,
    operationalMetrics: view.operationalMetrics,
    createdAt: view.createdAt,
  };
  return [item];
}

export const cafeFlowViewShiftReportByIdHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ViewShiftReportByIdInput;
  if (!input || !input.shiftCloseReportId) {
    throw new AppError('VALIDATION_ERROR', 'shiftCloseReportId is required', 400, { field: 'shiftCloseReportId' });
  }
  const result = await viewShiftReportById(ctx, input);
  return ok(toContractOutput(result));
};

export const cafeFlowViewShiftReportByDailyShiftIdHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ViewShiftReportByDailyShiftIdInput;
  if (!input || !input.dailyShiftId) {
    throw new AppError('VALIDATION_ERROR', 'dailyShiftId is required', 400, { field: 'dailyShiftId' });
  }
  const result = await viewShiftReportByDailyShiftId(ctx, input);
  return ok(toContractOutput(result));
};

// Canonical BFF route from l4 (bffName): dispatches to the variant matching the provided params.
export const cafeFlowViewShiftReportHandler: BffHandler = async (args) => {
  const params = (args.request.params ?? {}) as { shiftCloseReportId?: string; dailyShiftId?: string };
  if (params.shiftCloseReportId) return cafeFlowViewShiftReportByIdHandler(args);
  if (params.dailyShiftId) return cafeFlowViewShiftReportByDailyShiftIdHandler(args);
  throw new AppError('VALIDATION_ERROR', 'shiftCloseReportId or dailyShiftId is required', 400, { fields: ['shiftCloseReportId', 'dailyShiftId'] });
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.shiftLifecycle.viewShiftReport', handler: cafeFlowViewShiftReportHandler },
  { key: 'cafeFlow.shiftLifecycle.viewShiftReportById', handler: cafeFlowViewShiftReportByIdHandler },
  { key: 'cafeFlow.shiftLifecycle.viewShiftReportByDailyShiftId', handler: cafeFlowViewShiftReportByDailyShiftIdHandler },
];
