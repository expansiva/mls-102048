/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTimeLog.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

export interface CreateTimeLogInput {
  workTaskId: string;
  logDate: string;
  hours: number;
}

export interface CreateTimeLogOutput {
  timeLogId: string;
  workTaskId: string;
  workerId: string;
  logDate: string;
  hours: number;
  workerRate: number;
  status: string;
  createdAt: string;
}

/**
 * Resolve the hourly cost rate from the worker's MDM profile details.
 * The rate may be stored under a module namespace key or as a top-level field.
 */
function extractWorkerRate(details: Record<string, unknown>): number | null {
  // Check common top-level field names
  const directRate = details['workerRate'] ?? details['hourlyRate'] ?? details['rate'];
  if (typeof directRate === 'number' && directRate >= 0) {
    return directRate;
  }
  // Check module-namespaced keys (e.g. details.buildFlowFsm.workerRate)
  for (const key of Object.keys(details)) {
    const section = details[key];
    if (section && typeof section === 'object' && !Array.isArray(section)) {
      const sectionObj = section as Record<string, unknown>;
      const nestedRate = sectionObj['workerRate'] ?? sectionObj['hourlyRate'] ?? sectionObj['rate'];
      if (typeof nestedRate === 'number' && nestedRate >= 0) {
        return nestedRate;
      }
    }
  }
  return null;
}

export async function createTimeLog(ctx: RequestContext, input: CreateTimeLogInput): Promise<CreateTimeLogOutput> {
  // Step 1: Resolve workerId from session context (actorSession)
  const workerId = ctx.sessionContext.actorId ?? null;

  // Step 3: Validate workTaskId is provided (rule: timeLogRequiresTaskAndWorker)
  if (!input.workTaskId || input.workTaskId.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'workTaskId is required to create a time log.',
      400,
      { ruleId: 'timeLogRequiresTaskAndWorker' },
    );
  }

  // Step 4: Validate workerId is resolved from session (rule: timeLogRequiresTaskAndWorker)
  if (!workerId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'workerId could not be resolved from the active session.',
      400,
      { ruleId: 'timeLogRequiresTaskAndWorker' },
    );
  }

  // Step 2: Resolve workerRate from the platform user profile via MDM (rule: workerRateFromProfile)
  let workerRate: number;
  try {
    const profile = await ctx.mdm.entity.get({ mdmId: workerId });
    const details = profile.details as unknown as Record<string, unknown>;
    const rate = extractWorkerRate(details);
    if (rate === null) {
      throw new AppError(
        'VALIDATION_ERROR',
        'Worker hourly rate not found in user profile.',
        400,
        { ruleId: 'workerRateFromProfile', workerId },
      );
    }
    workerRate = rate;
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }
    throw new AppError(
      'VALIDATION_ERROR',
      'Unable to resolve worker rate from user profile.',
      400,
      { ruleId: 'workerRateFromProfile', workerId, error: String(e) },
    );
  }

  // Step 5: Load the WorkTask aggregate to confirm it exists and is valid
  const workTasks = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  let workTask;
  try {
    workTask = await workTasks.getById(input.workTaskId);
  } catch {
    throw new AppError(
      'NOT_FOUND',
      `Referenced work task does not exist: ${input.workTaskId}`,
      404,
      { workTaskId: input.workTaskId },
    );
  }
  if (!workTask) {
    throw new AppError(
      'NOT_FOUND',
      `Referenced work task does not exist: ${input.workTaskId}`,
      404,
      { workTaskId: input.workTaskId },
    );
  }

  // Steps 6-8: Construct the TimeLog entity with all resolved fields
  const now = ctx.clock.nowIso();
  const timeLogId = ctx.idGenerator.newId();

  const timeLog: TimeLog = {
    timeLogId,
    workTaskId: input.workTaskId,
    workerId,
    logDate: input.logDate,
    hours: input.hours,
    workerRate,
    status: 'posted',
    voidedAt: null,
    voidReason: null,
    createdAt: now,
  };

  // Step 9: Persist the TimeLog through the TimeLog port inside a single transaction
  const timeLogs = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');
  await ctx.data.runInTransaction(async () => {
    await timeLogs.append(timeLog);
  });

  // Step 10: Return the created TimeLog projection
  return {
    timeLogId: timeLog.timeLogId,
    workTaskId: timeLog.workTaskId,
    workerId: timeLog.workerId,
    logDate: timeLog.logDate,
    hours: timeLog.hours,
    workerRate: timeLog.workerRate,
    status: timeLog.status,
    createdAt: timeLog.createdAt,
  };
}
