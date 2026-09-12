/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/shareStatusReport.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { shareStatusReport, type ShareStatusReportInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/shareStatusReport.js';
import type { BuildFlowFsmShareStatusReportOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.js';

export const buildFlowFsmShareStatusReportHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<ShareStatusReportInput>;

  if (!params.statusReportId) {
    throw new AppError('VALIDATION_ERROR', 'statusReportId is required', 400, { field: 'statusReportId' });
  }
  if (!params.sharedWithEmail) {
    throw new AppError('VALIDATION_ERROR', 'sharedWithEmail is required', 400, { field: 'sharedWithEmail' });
  }

  const input: ShareStatusReportInput = {
    statusReportId: params.statusReportId,
    sharedWithEmail: params.sharedWithEmail,
  };

  const result = await shareStatusReport(ctx, input);

  const output: BuildFlowFsmShareStatusReportOutput = {
    status: result.status as 'generated' | 'shared',
    sharedAt: result.sharedAt,
    shareLink: result.shareLink,
    sharedWithEmail: result.sharedWithEmail,
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.statusReportLifecycle.shareStatusReport', handler: buildFlowFsmShareStatusReportHandler },
];
