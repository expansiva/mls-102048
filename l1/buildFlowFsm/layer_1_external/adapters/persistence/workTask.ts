/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTask.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const workTaskTableDef: TableDefinition = {
  moduleId: 'buildFlowFsm',
  repositoryName: 'buildFlowFsmWorkTask',
  tableName: 'work_task',
  purpose: 'transacao',
  description: 'Work tasks for build flow projects. Non-indexed fields stored in details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'work_task_id', postgresType: 'UUID' },
    { name: 'project_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'assigned_worker_id', postgresType: 'UUID' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['work_task_id'],
  indexes: [
    { name: 'idx_work_task_project_id', columns: ['project_id'] },
    { name: 'idx_work_task_status', columns: ['status'] },
    { name: 'idx_work_task_assigned_worker_id', columns: ['assigned_worker_id'] },
    { name: 'idx_work_task_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
