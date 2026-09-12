/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTaskStatus.defs.ts" enhancement="_blank"/>

export const updateTaskStatusController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "updateTaskStatus",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "workTaskLifecycle",
    "controllerName": "UpdateTaskStatusController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmUpdateTaskStatusHandler",
        "command": "updateTaskStatus",
        "usecaseRef": "updateTaskStatus",
        "inputTypeName": "UpdateTaskStatusInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "workTaskId",
            "fieldRef": "WorkTask.workTaskId",
            "required": true,
            "source": "selectedEntity",
            "description": "The work task selected by the field worker whose status will be updated."
          },
          {
            "inputId": "status",
            "fieldRef": "WorkTask.status",
            "required": true,
            "source": "userInput",
            "description": "The new lifecycle status chosen by the field worker — inProgress or completed."
          },
          {
            "inputId": "actorId",
            "fieldRef": "WorkTask.assignedWorkerId",
            "required": true,
            "source": "actorSession",
            "description": "The authenticated field worker's identity, used to verify they are the assigned worker for this task."
          },
          {
            "inputId": "startedAt",
            "fieldRef": "WorkTask.startedAt",
            "required": false,
            "source": "systemDefault",
            "description": "Server-side timestamp recorded when the task transitions to inProgress."
          },
          {
            "inputId": "completedAt",
            "fieldRef": "WorkTask.completedAt",
            "required": false,
            "source": "systemDefault",
            "description": "Server-side timestamp recorded when the task transitions to completed."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "WorkTask.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Server-side timestamp refreshed on every update."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "WorkTask.workTaskId",
            "source": "selectedEntity",
            "originRef": "WorkTask.workTaskId",
            "description": "The work task currently selected by the field worker in the assigned task list."
          },
          {
            "targetRef": "WorkTask.assignedWorkerId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "The authenticated field worker's actor id from the session, matched against the task's assignedWorkerId to confirm ownership."
          },
          {
            "targetRef": "WorkTask.startedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Server-side current timestamp set when the task transitions to inProgress."
          },
          {
            "targetRef": "WorkTask.completedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Server-side current timestamp set when the task transitions to completed."
          },
          {
            "targetRef": "WorkTask.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Server-side current timestamp recorded on every task update."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "WorkTask",
          "keyField": "WorkTask.workTaskId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "WorkTask.workTaskId",
            "WorkTask.title",
            "WorkTask.status",
            "WorkTask.startedAt",
            "WorkTask.completedAt",
            "WorkTask.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.workTaskLifecycle.updateTaskStatus",
        "handlerName": "buildFlowFsmUpdateTaskStatusHandler"
      }
    ]
  }
} as const;

export default updateTaskStatusController;

export const pipeline = [
  {
    "id": "updateTaskStatus__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTaskStatus.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTaskStatus.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTaskStatus.d.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.ts"
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
