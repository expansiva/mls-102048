/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidTimeLog.defs.ts" enhancement="_blank"/>

export const voidTimeLogController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "voidTimeLog",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "voidTimeLog",
    "controllerName": "VoidTimeLogController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmVoidTimeLogHandler",
        "command": "voidTimeLog",
        "usecaseRef": "voidTimeLog",
        "inputTypeName": "VoidTimeLogInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "timeLogId",
            "fieldRef": "TimeLog.timeLogId",
            "required": true,
            "source": "selectedEntity",
            "description": "The identifier of the posted time log entry to be voided."
          },
          {
            "inputId": "voidReason",
            "fieldRef": "TimeLog.voidReason",
            "required": true,
            "source": "userInput",
            "description": "Text reason explaining why the time log is being voided."
          },
          {
            "inputId": "voidedAt",
            "fieldRef": "TimeLog.voidedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp recording when the void action was performed."
          },
          {
            "inputId": "actorId",
            "fieldRef": "TimeLog.timeLogId",
            "required": true,
            "source": "actorSession",
            "description": "The project manager performing the void, recorded for audit purposes."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "TimeLog.timeLogId",
            "source": "selectedEntity",
            "originRef": "TimeLog.timeLogId",
            "description": "The time log selected by the project manager from the task's time log list; the backend resolves it from the currently selected entity in the workspace context."
          },
          {
            "targetRef": "TimeLog.voidedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets voidedAt to the current server timestamp at the moment the void command is processed."
          },
          {
            "targetRef": "actorSession.actorId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "The backend resolves the acting project manager's id from the authenticated session for audit attribution."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "TimeLog",
          "keyField": "TimeLog.timeLogId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "TimeLog.timeLogId",
            "TimeLog.status",
            "TimeLog.voidedAt",
            "TimeLog.voidReason"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.voidTimeLog.voidTimeLog",
        "handlerName": "buildFlowFsmVoidTimeLogHandler"
      }
    ]
  }
} as const;

export default voidTimeLogController;

export const pipeline = [
  {
    "id": "voidTimeLog__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidTimeLog.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/voidTimeLog.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidTimeLog.d.ts"
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
