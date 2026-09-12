/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrderRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const changeOrderRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "ChangeOrderRepositoryAdapter",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "ChangeOrderRepository",
    "entityId": "ChangeOrder",
    "portRef": "IChangeOrderRepository",
    "tableRef": "change_orders",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): change_order_id, project_id, status, created_at",
      "details JSONB: title, scope_description, amount, sent_at, approved_at, rejected_at, cancelled_at, rejection_reason, cancellation_reason, updated_at",
      "Uses ctx.data.moduleData for local table access"
    ]
  }
} as const;

export default changeOrderRepositoryAdapter;

export const pipeline = [
  {
    "id": "changeOrderRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrderRepositoryAdapter.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrderRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrder.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.d.ts"
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
