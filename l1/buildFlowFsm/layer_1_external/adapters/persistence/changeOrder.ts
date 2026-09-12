/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrder.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const changeOrderTableDef: TableDefinition = {
  moduleId: 'buildFlowFsm',
  repositoryName: 'buildFlowFsmChangeOrder',
  tableName: 'change_order',
  purpose: 'transacao',
  description: 'Change orders for build flow projects. Non-indexed fields (title, scopeDescription, amount, sentAt, approvedAt, rejectedAt, cancelledAt, rejectionReason, cancellationReason, updatedAt) stored in details JSONB.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'change_order_id', postgresType: 'UUID' },
    { name: 'project_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['change_order_id'],
  indexes: [
    { name: 'idx_change_order_project_id', columns: ['project_id'] },
    { name: 'idx_change_order_status', columns: ['status'] },
    { name: 'idx_change_order_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
