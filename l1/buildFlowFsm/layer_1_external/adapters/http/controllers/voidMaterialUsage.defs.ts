/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidMaterialUsage.defs.ts" enhancement="_blank"/>

export const voidMaterialUsageController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "voidMaterialUsage",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "voidMaterialUsage",
    "controllerName": "VoidMaterialUsageController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmVoidMaterialUsageHandler",
        "command": "voidMaterialUsage",
        "usecaseRef": "voidMaterialUsage",
        "inputTypeName": "VoidMaterialUsageInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "materialUsageId",
            "fieldRef": "MaterialUsage.materialUsageId",
            "required": true,
            "source": "selectedEntity",
            "description": "The material usage record selected by the project manager to be voided."
          },
          {
            "inputId": "voidReason",
            "fieldRef": "MaterialUsage.voidReason",
            "required": true,
            "source": "userInput",
            "description": "Text reason explaining why the material usage record is being voided."
          },
          {
            "inputId": "voidedAt",
            "fieldRef": "MaterialUsage.voidedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp recorded when the void action is executed."
          },
          {
            "inputId": "actorId",
            "fieldRef": "MaterialUsage.materialUsageId",
            "required": true,
            "source": "actorSession",
            "description": "The project manager performing the void, used for audit attribution."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "MaterialUsage.materialUsageId",
            "source": "selectedEntity",
            "originRef": "MaterialUsage.materialUsageId",
            "description": "The single material usage record the project manager selected from the project's material tracking list; resolved from the selected entity context in the workspace."
          },
          {
            "targetRef": "MaterialUsage.voidedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The current server timestamp captured at the moment the void command is processed."
          },
          {
            "targetRef": "actorSession.actorId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "The authenticated project manager's actor id from the session, used to attribute the void action for audit."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "MaterialUsage",
          "keyField": "MaterialUsage.materialUsageId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "MaterialUsage.materialUsageId",
            "MaterialUsage.status",
            "MaterialUsage.voidedAt",
            "MaterialUsage.voidReason"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.voidMaterialUsage.voidMaterialUsage",
        "handlerName": "buildFlowFsmVoidMaterialUsageHandler"
      }
    ]
  }
} as const;

export default voidMaterialUsageController;

export const pipeline = [
  {
    "id": "voidMaterialUsage__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidMaterialUsage.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidMaterialUsage.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidMaterialUsage.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
