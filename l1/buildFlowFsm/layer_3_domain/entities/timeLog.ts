/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.ts" enhancement="_blank"/>
export type TimeLogStatus = 'posted' | 'voided';

export interface TimeLog {
  timeLogId: string;
  workTaskId: string;
  workerId: string;
  logDate: string;
  hours: number;
  workerRate: number;
  status: TimeLogStatus;
  voidedAt: string | null;
  voidReason: string | null;
  createdAt: string;
}

export const TIME_LOG_STATUS_TRANSITIONS: Record<TimeLogStatus, TimeLogStatus[]> = {
  posted: ['voided'],
  voided: [],
};

export function canTransitionTimeLog(from: TimeLogStatus, to: TimeLogStatus): boolean {
  return TIME_LOG_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function computeTimeLogCost(timeLog: Pick<TimeLog, 'hours' | 'workerRate'>): number {
  return timeLog.hours * timeLog.workerRate;
}
