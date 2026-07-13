/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidTimeLog.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

export interface VoidTimeLogInput {
  timeLogId: string;
  voidReason: string;
}

export interface VoidTimeLogOutput {
  timeLogId: string;
  status: string;
  voidedAt: string;
  voidReason: string;
}

export async function voidTimeLog(ctx: RequestContext, input: VoidTimeLogInput): Promise<VoidTimeLogOutput> {
  const timeLogs = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');

  return ctx.data.runInTransaction(async () => {
    // 1. Load the TimeLog by timeLogId
    const timeLog = await timeLogs.getById(input.timeLogId);
    if (!timeLog) {
      throw new AppError('NOT_FOUND', `TimeLog not found: ${input.timeLogId}`, 404, { timeLogId: input.timeLogId });
    }

    // 2. Validate status is 'posted'
    if (String(timeLog.status) !== 'posted') {
      throw new AppError(
        'VALIDATION_ERROR',
        'timeLogRequiresTaskAndWorker: only a posted time log can be voided.',
        400,
        { ruleId: 'timeLogRequiresTaskAndWorker', currentStatus: timeLog.status },
      );
    }

    // 3. Validate workTaskId and workerId are non-null (rule timeLogRequiresTaskAndWorker)
    if (!timeLog.workTaskId || !timeLog.workerId) {
      throw new AppError(
        'VALIDATION_ERROR',
        'timeLogRequiresTaskAndWorker: the time log must have a workTaskId and workerId.',
        400,
        { ruleId: 'timeLogRequiresTaskAndWorker', workTaskId: timeLog.workTaskId, workerId: timeLog.workerId },
      );
    }

    // 4. Resolve system values
    const voidedAt = ctx.clock.nowIso();

    // 5. Mutate the TimeLog: set status to 'voided', voidedAt, voidReason; preserve other fields
    const voidedTimeLog: TimeLog = {
      ...timeLog,
      status: 'voided',
      voidedAt,
      voidReason: input.voidReason,
      updatedAt: voidedAt,
    };

    // 6. Save the mutated TimeLog
    await timeLogs.save(voidedTimeLog);

    // 7. Return the result
    return {
      timeLogId: voidedTimeLog.timeLogId,
      status: voidedTimeLog.status,
      voidedAt: voidedTimeLog.voidedAt as string,
      voidReason: voidedTimeLog.voidReason as string,
    };
  });
}
