/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/timeLog.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const timeLogTableDef: TableDefinition = {
  moduleId: 'buildFlowFsm',
  repositoryName: 'buildFlowFsmTimeLog',
  tableName: 'time_log',
  purpose: 'controle',
  description: 'Apontamentos de horas trabalhadas (append-only). Campos não indexados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'time_log_id', postgresType: 'UUID' },
    { name: 'work_task_id', postgresType: 'UUID' },
    { name: 'worker_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['time_log_id'],
  indexes: [
    { name: 'idx_time_log_work_task_id', columns: ['work_task_id'] },
    { name: 'idx_time_log_worker_id', columns: ['worker_id'] },
    { name: 'idx_time_log_status', columns: ['status'] },
    { name: 'idx_time_log_created_at', columns: ['created_at'] },
  ],
  retentionDays: 2555,
  version: 1,
};
