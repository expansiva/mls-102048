/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/projectRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const projectRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "ProjectRepositoryAdapter",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "ProjectRepository",
    "entityId": "Project",
    "portRef": "IProjectRepository",
    "tableRef": "projects",
    "mdmReads": [
      "Client"
    ],
    "notes": [
      "Real columns (snake_case): project_id, client_id, status, created_at",
      "details JSONB: name, site_address, budget, start_date, end_date, completed_at, cancelled_at, cancellation_reason, updated_at",
      "MDM Client resolved via ctx.mdm.collection.getMany/hydrateMany by canonical type; ids collected in bulk, never call ctx.mdm.entity.get inside loop",
      "Uses ctx.data.moduleData for local table access"
    ]
  }
} as const;

export default projectRepositoryAdapter;

export const pipeline = [
  {
    "id": "projectRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/projectRepositoryAdapter.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/projectRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts"
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
