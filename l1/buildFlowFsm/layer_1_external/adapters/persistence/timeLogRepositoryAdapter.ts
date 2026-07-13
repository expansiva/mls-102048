/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/timeLogRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { TimeLog, TimeLogStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

interface TimeLogRow {
  time_log_id: string;
  work_task_id: string;
  worker_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface TimeLogDetails {
  log_date: string;
  hours: number;
  worker_rate: number;
  voided_at: string | null;
  void_reason: string | null;
}

function toRow(record: TimeLog): TimeLogRow {
  const details: TimeLogDetails = {
    log_date: record.logDate,
    hours: record.hours,
    worker_rate: record.workerRate,
    voided_at: record.voidedAt,
    void_reason: record.voidReason,
  };
  return {
    time_log_id: record.timeLogId,
    work_task_id: record.workTaskId,
    worker_id: record.workerId,
    status: record.status,
    created_at: record.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: TimeLogRow): TimeLogDetails {
  try {
    return JSON.parse(row.details ?? '{}') as TimeLogDetails;
  } catch {
    return {
      log_date: row.created_at,
      hours: 0,
      worker_rate: 0,
      voided_at: null,
      void_reason: null,
    };
  }
}

function toDomain(row: TimeLogRow): TimeLog {
  const d = parseDetails(row);
  return {
    timeLogId: row.time_log_id,
    workTaskId: row.work_task_id,
    workerId: row.worker_id,
    logDate: d.log_date,
    hours: d.hours,
    workerRate: d.worker_rate,
    status: row.status as TimeLogStatus,
    voidedAt: d.voided_at,
    voidReason: d.void_reason,
    createdAt: row.created_at,
  };
}

export function createTimeLogRepositoryAdapter(ctx: RequestContext): ITimeLogRepository {
  const getTable = () => ctx.data.moduleData.getTable<TimeLogRow>('time_log');

  return {
    async append(record: TimeLog): Promise<void> {
      const repo = await getTable();
      await repo.insert({ record: toRow(record) });
    },

    async listByOwnerId(ownerId: string): Promise<TimeLog[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { work_task_id: ownerId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async listByOwnerIdAndPeriod(ownerId: string, start: string, end: string): Promise<TimeLog[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { work_task_id: ownerId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows
        .filter((row) => row.created_at >= start && row.created_at <= end)
        .map(toDomain);
    },

    async listByWorkerId(workerId: string): Promise<TimeLog[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { worker_id: workerId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },
  };
}
