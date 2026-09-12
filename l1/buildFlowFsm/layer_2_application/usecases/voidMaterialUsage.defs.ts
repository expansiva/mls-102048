/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidMaterialUsage.defs.ts" enhancement="_blank"/>

export const voidMaterialUsageUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "voidMaterialUsage",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "voidMaterialUsage",
    "ports": [
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "voidMaterialUsage",
        "inputTypeName": "VoidMaterialUsageInput",
        "outputTypeName": "VoidMaterialUsageOutput",
        "input": [
          {
            "name": "materialUsageId",
            "type": "uuid",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "The material usage record selected by the project manager to be voided."
          },
          {
            "name": "voidReason",
            "type": "text",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "Text reason explaining why the material usage record is being voided."
          }
        ],
        "output": [
          {
            "name": "materialUsageId",
            "type": "uuid",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "voidedAt",
            "type": "datetime",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "voidReason",
            "type": "text",
            "required": true,
            "ofEntity": "MaterialUsage"
          }
        ],
        "ports": [
          "MaterialUsage",
          "Project"
        ],
        "rulesApplied": [
          "materialUsageRequiresProject"
        ],
        "transactional": true,
        "steps": [
          "Resolve voidedAt from ctx.clock.now() and actorId from ctx.sessionContext.actorId (context, not public input).",
          "Load the MaterialUsage aggregate by materialUsageId via the MaterialUsage port (getById). If not found, return a validation error.",
          "Validate the current status is 'posted'; if already 'voided', reject with a validation error referencing the append-only / no-double-void rule.",
          "Apply rule materialUsageRequiresProject: verify the loaded MaterialUsage has a non-null projectId, then load the Project by that projectId via the Project port (getById). If the Project does not exist, reject with a validation error including rule id 'materialUsageRequiresProject'.",
          "Mutate the MaterialUsage in-memory: set status to 'voided', set voidedAt to the resolved timestamp, set voidReason to the provided reason text. Preserve projectId and all original fields (append-only audit policy — no deletion).",
          "Save the MaterialUsage aggregate via the MaterialUsage port inside the same transaction (ctx.data transaction wrapper).",
          "Return materialUsageId, status ('voided'), voidedAt, and voidReason."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default voidMaterialUsageUsecase;

export const pipeline = [
  {
    "id": "voidMaterialUsage__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidMaterialUsage.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidMaterialUsage.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
