/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewStatusReport.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewStatusReport, type ViewStatusReportInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewStatusReport.js';

export const buildFlowFsmViewStatusReportHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<ViewStatusReportInput>;

  if (!params.statusReportId) {
    throw new AppError('VALIDATION_ERROR', 'statusReportId is required', 400, { field: 'statusReportId' });
  }

  const input: ViewStatusReportInput = {
    statusReportId: params.statusReportId,
  };

  const result = await viewStatusReport(ctx, input);
  return ok(result);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.viewStatusReport.viewStatusReport', handler: buildFlowFsmViewStatusReportHandler },
];
