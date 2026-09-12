/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoice.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const invoiceTableDef: TableDefinition = {
  moduleId: 'buildFlowFsm',
  repositoryName: 'buildFlowFsmInvoice',
  tableName: 'invoice',
  purpose: 'transacao',
  description: 'Invoices for build flow projects. Non-indexed fields and embedded InvoiceLine child collections stored in details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'invoice_id', postgresType: 'UUID' },
    { name: 'project_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'currency', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['invoice_id'],
  indexes: [
    { name: 'idx_invoice_project_id', columns: ['project_id'] },
    { name: 'idx_invoice_status', columns: ['status'] },
    { name: 'idx_invoice_currency', columns: ['currency'] },
    { name: 'idx_invoice_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
