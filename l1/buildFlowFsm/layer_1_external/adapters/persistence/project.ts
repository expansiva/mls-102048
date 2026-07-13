/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/project.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const projectTableDef: TableDefinition = {
  moduleId: 'buildFlowFsm',
  repositoryName: 'buildFlowFsmProject',
  tableName: 'project',
  purpose: 'transacao',
  description: 'Projetos. Campos não indexados (name, siteAddress, budget, startDate, endDate, completedAt, cancelledAt, cancellationReason, updatedAt) em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'project_id', postgresType: 'UUID' },
    { name: 'client_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['project_id'],
  indexes: [
    { name: 'idx_project_client_id', columns: ['client_id'] },
    { name: 'idx_project_status', columns: ['status'] },
    { name: 'idx_project_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
