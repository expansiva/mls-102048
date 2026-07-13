/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoiceRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const invoiceRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "InvoiceRepositoryAdapter",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "InvoiceRepository",
    "entityId": "Invoice",
    "portRef": "IInvoiceRepository",
    "tableRef": "invoices",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): invoice_id, project_id, status, currency, created_at",
      "details JSONB: labor_cost, material_cost, change_order_amount, total_amount, share_link, client_email, issued_at, voided_at, void_reason, notes, updated_at",
      "Embedded InvoiceLine collection stored in details.invoice_lines",
      "Uses ctx.data.moduleData for local table access"
    ]
  }
} as const;

export default invoiceRepositoryAdapter;

export const pipeline = [
  {
    "id": "invoiceRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoiceRepositoryAdapter.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoiceRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoice.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
