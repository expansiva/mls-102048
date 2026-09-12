/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateStatusReport.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler, type ControllerRoute } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { generateStatusReport, type GenerateStatusReportInput } from '/_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateStatusReport.js';
import type { BuildFlowFsmGenerateStatusReportOutput } from '/_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.js';

export const buildFlowFsmGenerateStatusReportHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Partial<GenerateStatusReportInput>;

  if (!params.projectId) {
    throw new AppError('VALIDATION_ERROR', 'projectId is required', 400, { field: 'projectId' });
  }
  if (!params.reportPeriodStart) {
    throw new AppError('VALIDATION_ERROR', 'reportPeriodStart is required', 400, { field: 'reportPeriodStart' });
  }
  if (!params.reportPeriodEnd) {
    throw new AppError('VALIDATION_ERROR', 'reportPeriodEnd is required', 400, { field: 'reportPeriodEnd' });
  }

  const input: GenerateStatusReportInput = {
    projectId: params.projectId,
    reportPeriodStart: params.reportPeriodStart,
    reportPeriodEnd: params.reportPeriodEnd,
  };

  const result = await generateStatusReport(ctx, input);

  const output: BuildFlowFsmGenerateStatusReportOutput = {
    statusReportId: result.statusReportId,
    projectId: result.projectId,
    status: result.status as 'generated' | 'shared',
    content: result.content,
    reportPeriodStart: result.reportPeriodStart,
    reportPeriodEnd: result.reportPeriodEnd,
    generatedAt: result.generatedAt,
    llmModelUsed: result.llmModelUsed ?? '',
    createdAt: result.createdAt,
  };

  return ok(output);
};

export const routes: ControllerRoute[] = [
  { key: 'buildFlowFsm.statusReportLifecycle.generateStatusReport', handler: buildFlowFsmGenerateStatusReportHandler },
];
