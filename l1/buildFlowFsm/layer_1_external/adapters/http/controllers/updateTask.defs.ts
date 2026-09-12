/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTask.defs.ts" enhancement="_blank"/>

export const updateTaskController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "updateTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "updateTask",
    "controllerName": "UpdateTaskController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmUpdateTaskHandler",
        "command": "updateTask",
        "usecaseRef": "updateTask",
        "inputTypeName": "UpdateTaskInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "workTaskId",
            "fieldRef": "WorkTask.workTaskId",
            "required": true,
            "source": "routeParam",
            "description": "Identifier of the work task to update, provided via the route parameter."
          },
          {
            "inputId": "projectId",
            "fieldRef": "WorkTask.projectId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identifier of the parent project, used to validate the due date range."
          },
          {
            "inputId": "title",
            "fieldRef": "WorkTask.title",
            "required": true,
            "source": "userInput",
            "description": "Updated short name of the task."
          },
          {
            "inputId": "description",
            "fieldRef": "WorkTask.description",
            "required": true,
            "source": "userInput",
            "description": "Updated detailed description of the work to be performed."
          },
          {
            "inputId": "assignedWorkerId",
            "fieldRef": "WorkTask.assignedWorkerId",
            "required": false,
            "source": "userInput",
            "description": "Identifier of the field worker to assign or reassign to this task."
          },
          {
            "inputId": "assignedWorkerName",
            "fieldRef": "WorkTask.assignedWorkerName",
            "required": false,
            "source": "userInput",
            "description": "Display name of the assigned field worker, denormalized from the platform user profile."
          },
          {
            "inputId": "dueDate",
            "fieldRef": "WorkTask.dueDate",
            "required": true,
            "source": "userInput",
            "description": "Updated deadline by which the task should be completed."
          },
          {
            "inputId": "budgetedCost",
            "fieldRef": "WorkTask.budgetedCost",
            "required": false,
            "source": "userInput",
            "description": "Updated planned cost budgeted for this task."
          },
          {
            "inputId": "sequenceNumber",
            "fieldRef": "WorkTask.sequenceNumber",
            "required": false,
            "source": "userInput",
            "description": "Updated position of the task in the simplified timeline sequence view."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "WorkTask.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp of the update, set to the current server time."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "WorkTask.workTaskId",
            "source": "routeParam",
            "originRef": "routeParam.workTaskId",
            "description": "The work task id is extracted from the route parameter identifying which task the project manager opened for editing."
          },
          {
            "targetRef": "WorkTask.projectId",
            "source": "selectedEntity",
            "originRef": "WorkTask.projectId",
            "description": "The parent project id is read from the currently selected work task record to validate the due date against the project date range."
          },
          {
            "targetRef": "WorkTask.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The updatedAt timestamp is set to the current server time at the moment the update is persisted."
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
            "WorkTask.description",
            "WorkTask.status",
            "WorkTask.assignedWorkerId",
            "WorkTask.assignedWorkerName",
            "WorkTask.dueDate",
            "WorkTask.budgetedCost",
            "WorkTask.sequenceNumber",
            "WorkTask.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.updateTask.updateTask",
        "handlerName": "buildFlowFsmUpdateTaskHandler"
      }
    ]
  }
} as const;

export default updateTaskController;

export const pipeline = [
  {
    "id": "updateTask__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateTask.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTask.d.ts"
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
