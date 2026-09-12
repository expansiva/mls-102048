/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrder.defs.ts" enhancement="_blank"/>

export const changeOrderTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "ChangeOrder",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "ChangeOrder",
    "tableName": "change_order",
    "columns": [
      {
        "name": "change_order_id",
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
        "name": "created_at",
        "type": "timestamp",
        "nullable": false,
        "description": "ordering"
      },
      {
        "name": "details",
        "type": "jsonb",
        "nullable": true,
        "description": "title, scopeDescription, amount, sentAt, approvedAt, rejectedAt, cancelledAt, rejectionReason, cancellationReason, updatedAt"
      }
    ],
    "primaryKey": [
      "change_order_id"
    ],
    "indexes": [
      {
        "indexName": "idx_change_order_project_id",
        "columns": [
          "project_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_change_order_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_change_order_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "childCollections": []
    }
  }
} as const;

export default changeOrderTableDefinition;

export const pipeline = [
  {
    "id": "changeOrder__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrder.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrder.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.d.ts"
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
