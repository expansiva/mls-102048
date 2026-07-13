/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTaskRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const workTaskRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "WorkTaskRepositoryAdapter",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "WorkTaskRepository",
    "entityId": "WorkTask",
    "portRef": "IWorkTaskRepository",
    "tableRef": "work_tasks",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): work_task_id, project_id, status, assigned_worker_id, created_at",
      "details JSONB: title, description, assigned_worker_name, due_date, budgeted_cost, sequence_number, started_at, completed_at, cancelled_at, cancellation_reason, updated_at",
      "Uses ctx.data.moduleData for local table access"
    ]
  }
} as const;

export default workTaskRepositoryAdapter;

export const pipeline = [
  {
    "id": "workTaskRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTaskRepositoryAdapter.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTaskRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTask.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.d.ts"
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
