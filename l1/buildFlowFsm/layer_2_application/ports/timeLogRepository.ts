/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.ts" enhancement="_blank"/>
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

/**
 * Append-only repository port for TimeLog events.
 * Events are immutable once recorded — no save/update/delete.
 */
export interface ITimeLogRepository {
  /** Append-only write: insert a new time log event. No update or delete. */
  append(record: TimeLog): Promise<void>;

  /** Read finder: all time log events for the owning work task. */
  listByOwnerId(ownerId: string): Promise<TimeLog[]>;

  /** Read finder: time log events for the owning work task within a time period. */
  listByOwnerIdAndPeriod(ownerId: string, start: string, end: string): Promise<TimeLog[]>;

  /** Read finder: all time log events recorded by a specific worker. */
  listByWorkerId(workerId: string): Promise<TimeLog[]>;
}
