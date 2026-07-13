/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTask.defs.ts" enhancement="_blank"/>

export const workTaskTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "WorkTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "WorkTask",
    "tableName": "work_task",
    "columns": [
      {
        "name": "work_task_id",
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
        "name": "assigned_worker_id",
        "type": "string",
        "nullable": false,
        "description": "pk/fk"
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
        "description": "title, description, assignedWorkerName, dueDate, budgetedCost, sequenceNumber, startedAt, completedAt, cancelledAt, cancellationReason, updatedAt"
      }
    ],
    "primaryKey": [
      "work_task_id"
    ],
    "indexes": [
      {
        "indexName": "idx_work_task_project_id",
        "columns": [
          "project_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_work_task_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_work_task_assigned_worker_id",
        "columns": [
          "assigned_worker_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_work_task_created_at",
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

export default workTaskTableDefinition;

export const pipeline = [
  {
    "id": "workTask__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTask.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.d.ts"
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
