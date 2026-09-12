/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoice.defs.ts" enhancement="_blank"/>

export const invoiceTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "Invoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "Invoice",
    "tableName": "invoice",
    "columns": [
      {
        "name": "invoice_id",
        "type": "string",
        "nullable": false,
        "description": "pk/fk"
      },
      {
        "name": "project_id",
        "type": "string",
        "nullable": false,
        "description": "pk/fk"
      },
      {
        "name": "status",
        "type": "string",
        "nullable": false,
        "description": "status"
      },
      {
        "name": "currency",
        "type": "string",
        "nullable": false,
        "description": "status"
      },
      {
        "name": "created_at",
        "type": "timestamp",
        "nullable": false,
        "description": "ordering"
      },
      {
        "name": "details",
        "type": "jsonb",
        "nullable": true,
        "description": "laborCost, materialCost, changeOrderAmount, totalAmount, shareLink, clientEmail, issuedAt, voidedAt, voidReason, notes, updatedAt"
      }
    ],
    "primaryKey": [
      "invoice_id"
    ],
    "indexes": [
      {
        "indexName": "idx_invoice_project_id",
        "columns": [
          "project_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_invoice_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_invoice_currency",
        "columns": [
          "currency"
        ],
        "unique": false
      },
      {
        "indexName": "idx_invoice_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "childCollections": [
        "InvoiceLine"
      ]
    }
  }
} as const;

export default invoiceTableDefinition;

export const pipeline = [
  {
    "id": "invoice__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/invoice.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/persistenceTable.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
