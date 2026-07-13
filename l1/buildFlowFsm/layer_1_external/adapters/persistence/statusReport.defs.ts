/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReport.defs.ts" enhancement="_blank"/>

export const statusReportTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "StatusReport",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "StatusReport",
    "tableName": "status_report",
    "columns": [
      {
        "name": "status_report_id",
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
        "description": "content, reportPeriodStart, reportPeriodEnd, generatedAt, llmModelUsed, sharedAt, shareLink, sharedWithEmail, updatedAt"
      }
    ],
    "primaryKey": [
      "status_report_id"
    ],
    "indexes": [
      {
        "indexName": "idx_status_report_project_id",
        "columns": [
          "project_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_status_report_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_status_report_created_at",
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

export default statusReportTableDefinition;

export const pipeline = [
  {
    "id": "statusReport__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReport.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReport.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.d.ts"
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
