/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReport.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const statusReportTableDef: TableDefinition = {
  moduleId: 'buildFlowFsm',
  repositoryName: 'buildFlowFsmStatusReport',
  tableName: 'status_report',
  purpose: 'transacao',
  description: 'Status reports for build flow projects. Non-indexed fields stored in details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'status_report_id', postgresType: 'UUID' },
    { name: 'project_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['status_report_id'],
  indexes: [
    { name: 'idx_status_report_project_id', columns: ['project_id'] },
    { name: 'idx_status_report_status', columns: ['status'] },
    { name: 'idx_status_report_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
