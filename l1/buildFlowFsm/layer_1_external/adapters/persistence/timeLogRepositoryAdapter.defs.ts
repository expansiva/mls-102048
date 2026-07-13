/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/timeLogRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const timeLogRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "TimeLogRepositoryAdapter",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "TimeLogRepository",
    "entityId": "TimeLog",
    "portRef": "ITimeLogRepository",
    "tableRef": "time_logs",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): time_log_id, work_task_id, worker_id, status, created_at",
      "details JSONB: log_date, hours, worker_rate, voided_at, void_reason",
      "Append-only event adapter: insert row only, no update/delete",
      "Uses ctx.data.moduleData for local table access"
    ]
  }
} as const;

export default timeLogRepositoryAdapter;

export const pipeline = [
  {
    "id": "timeLogRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/timeLogRepositoryAdapter.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/timeLogRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/timeLog.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.d.ts"
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
