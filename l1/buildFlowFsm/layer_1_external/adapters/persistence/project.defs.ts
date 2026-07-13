/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/project.defs.ts" enhancement="_blank"/>

export const projectTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "Project",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "Project",
    "tableName": "project",
    "columns": [
      {
        "name": "project_id",
        "type": "string",
        "nullable": false,
        "description": "pk/fk"
      },
      {
        "name": "client_id",
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
        "description": "name, siteAddress, budget, startDate, endDate, completedAt, cancelledAt, cancellationReason, updatedAt"
      }
    ],
    "primaryKey": [
      "project_id"
    ],
    "indexes": [
      {
        "indexName": "idx_project_client_id",
        "columns": [
          "client_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_project_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_project_created_at",
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

export default projectTableDefinition;

export const pipeline = [
  {
    "id": "project__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/project.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/project.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts"
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
