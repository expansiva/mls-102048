/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/assignTask.defs.ts" enhancement="_blank"/>

export const assignTaskController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "assignTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "workTaskLifecycle",
    "controllerName": "AssignTaskController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmAssignTaskHandler",
        "command": "assignTask",
        "usecaseRef": "assignTask",
        "inputTypeName": "AssignTaskInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "workTaskId",
            "fieldRef": "WorkTask.workTaskId",
            "required": true,
            "source": "selectedEntity",
            "description": "The work task to assign a worker and due date to."
          },
          {
            "inputId": "assignedWorkerId",
            "fieldRef": "WorkTask.assignedWorkerId",
            "required": true,
            "source": "userInput",
            "description": "Identifier of the field worker selected to perform this task."
          },
          {
            "inputId": "assignedWorkerName",
            "fieldRef": "WorkTask.assignedWorkerName",
            "required": true,
            "source": "userInput",
            "description": "Display name of the selected field worker, denormalized onto the task."
          },
          {
            "inputId": "dueDate",
            "fieldRef": "WorkTask.dueDate",
            "required": true,
            "source": "userInput",
            "description": "Deadline by which the task should be completed."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "WorkTask.workTaskId",
            "source": "selectedEntity",
            "originRef": "WorkTask.workTaskId",
            "description": "The work task currently selected by the project manager in the task list view is resolved from the selection context."
          },
          {
            "targetRef": "WorkTask.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The server sets the current timestamp as updatedAt when the task assignment is persisted."
          },
          {
            "targetRef": "WorkTask.projectId",
            "source": "selectedEntity",
            "originRef": "WorkTask.projectId",
            "description": "The parent project id is read from the selected work task to validate the due date against the project date range."
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
            "WorkTask.assignedWorkerId",
            "WorkTask.assignedWorkerName",
            "WorkTask.dueDate"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.workTaskLifecycle.assignTask",
        "handlerName": "buildFlowFsmAssignTaskHandler"
      }
    ]
  }
} as const;

export default assignTaskController;

export const pipeline = [
  {
    "id": "assignTask__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/assignTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/assignTask.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/assignTask.d.ts",
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
