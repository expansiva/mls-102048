/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsage.defs.ts" enhancement="_blank"/>

export const materialUsageTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "MaterialUsage",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "MaterialUsage",
    "tableName": "material_usage",
    "columns": [
      {
        "name": "material_usage_id",
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
        "name": "unit",
        "type": "string",
        "nullable": false,
        "description": "status"
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
        "description": "materialName, quantity, unitCost, totalCost, usageDate, voidedAt, voidReason"
      }
    ],
    "primaryKey": [
      "material_usage_id"
    ],
    "indexes": [
      {
        "indexName": "idx_material_usage_project_id",
        "columns": [
          "project_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_material_usage_unit",
        "columns": [
          "unit"
        ],
        "unique": false
      },
      {
        "indexName": "idx_material_usage_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_material_usage_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "childCollections": []
    },
    "appendOnly": true,
    "purpose": "controle",
    "retentionDays": 1825
  }
} as const;

export default materialUsageTableDefinition;

export const pipeline = [
  {
    "id": "materialUsage__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsage.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsage.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts"
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
