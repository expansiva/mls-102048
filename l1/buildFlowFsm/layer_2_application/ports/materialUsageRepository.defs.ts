/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.defs.ts" enhancement="_blank"/>

export const materialUsageRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "MaterialUsageRepository",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "MaterialUsage",
    "interfaceName": "IMaterialUsageRepository",
    "methods": [
      {
        "name": "append",
        "params": [
          "record: MaterialUsage"
        ],
        "returns": "void",
        "description": "Append-only write: insert a new material usage event. No update or delete."
      },
      {
        "name": "listByOwnerId",
        "params": [
          "ownerId: ProjectId"
        ],
        "returns": "MaterialUsage[]",
        "description": "Read finder: all material usage events for the owning project."
      },
      {
        "name": "listByOwnerIdAndPeriod",
        "params": [
          "ownerId: ProjectId",
          "start: Instant",
          "end: Instant"
        ],
        "returns": "MaterialUsage[]",
        "description": "Read finder: material usage events for the owning project within a time period."
      },
      {
        "name": "listByMaterialId",
        "params": [
          "materialId: MaterialId"
        ],
        "returns": "MaterialUsage[]",
        "description": "Read finder: all usage events for a specific material across projects."
      }
    ]
  }
} as const;

export default materialUsageRepositoryPort;

export const pipeline = [
  {
    "id": "materialUsageRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
