/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsageRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const materialUsageRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "MaterialUsageRepositoryAdapter",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "MaterialUsageRepository",
    "entityId": "MaterialUsage",
    "portRef": "IMaterialUsageRepository",
    "tableRef": "material_usages",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): material_usage_id, project_id, unit, status, created_at",
      "details JSONB: material_name, quantity, unit_cost, total_cost, usage_date, voided_at, void_reason",
      "Append-only event adapter: insert row only, no update/delete",
      "Uses ctx.data.moduleData for local table access"
    ]
  }
} as const;

export default materialUsageRepositoryAdapter;

export const pipeline = [
  {
    "id": "materialUsageRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsageRepositoryAdapter.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsageRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsage.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts"
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
