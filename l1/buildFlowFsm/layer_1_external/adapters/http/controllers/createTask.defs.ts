/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createTask.defs.ts" enhancement="_blank"/>

export const createTaskController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "createTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "workTaskLifecycle",
    "controllerName": "CreateTaskController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmCreateTaskHandler",
        "command": "createTask",
        "usecaseRef": "createTask",
        "inputTypeName": "CreateTaskInput",
        "kind": "create",
        "inputContract": [
          {
            "inputId": "title",
            "fieldRef": "WorkTask.title",
            "required": true,
            "source": "userInput",
            "description": "Short name of the task entered by the project manager."
          },
          {
            "inputId": "description",
            "fieldRef": "WorkTask.description",
            "required": true,
            "source": "userInput",
            "description": "Detailed description of the work to be performed."
          },
          {
            "inputId": "dueDate",
            "fieldRef": "WorkTask.dueDate",
            "required": true,
            "source": "userInput",
            "description": "Deadline by which the task should be completed."
          },
          {
            "inputId": "assignedWorkerId",
            "fieldRef": "WorkTask.assignedWorkerId",
            "required": false,
            "source": "userInput",
            "description": "Identifier of the field worker to assign to this task, if known at creation time."
          },
          {
            "inputId": "assignedWorkerName",
            "fieldRef": "WorkTask.assignedWorkerName",
            "required": false,
            "source": "userInput",
            "description": "Display name of the assigned field worker, denormalized from the platform user profile."
          },
          {
            "inputId": "budgetedCost",
            "fieldRef": "WorkTask.budgetedCost",
            "required": false,
            "source": "userInput",
            "description": "Planned cost budgeted for this task."
          },
          {
            "inputId": "sequenceNumber",
            "fieldRef": "WorkTask.sequenceNumber",
            "required": false,
            "source": "userInput",
            "description": "Position of the task in the simplified timeline sequence view."
          },
          {
            "inputId": "projectId",
            "fieldRef": "WorkTask.projectId",
            "required": true,
            "source": "routeParam",
            "description": "Identifier of the parent project this task belongs to, taken from the current route."
          },
          {
            "inputId": "workTaskId",
            "fieldRef": "WorkTask.workTaskId",
            "required": true,
            "source": "systemDefault",
            "description": "System-generated UUID for the new task."
          },
          {
            "inputId": "status",
            "fieldRef": "WorkTask.status",
            "required": true,
            "source": "systemDefault",
            "description": "Initial lifecycle status, set to draft on creation."
          },
          {
            "inputId": "createdAt",
            "fieldRef": "WorkTask.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Record creation timestamp."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "WorkTask.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Last update timestamp, set to the creation time."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "WorkTask.projectId",
            "source": "routeParam",
            "originRef": "routeParam.projectId",
            "description": "The projectId is extracted from the current route parameter identifying the open project."
          },
          {
            "targetRef": "WorkTask.workTaskId",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "The backend generates a new UUID for the work task primary identifier."
          },
          {
            "targetRef": "WorkTask.status",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets the initial status to 'draft' as the default lifecycle entry state for new tasks."
          },
          {
            "targetRef": "WorkTask.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets createdAt to the current server timestamp at creation time."
          },
          {
            "targetRef": "WorkTask.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets updatedAt to the current server timestamp at creation time."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "WorkTask",
          "keyField": "WorkTask.workTaskId",
          "pagination": "none",
          "selection": "none",
          "output": [
            "WorkTask.workTaskId",
            "WorkTask.title",
            "WorkTask.status",
            "WorkTask.dueDate",
            "WorkTask.assignedWorkerName"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.workTaskLifecycle.createTask",
        "handlerName": "buildFlowFsmCreateTaskHandler"
      }
    ]
  }
} as const;

export default createTaskController;

export const pipeline = [
  {
    "id": "createTask__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createTask.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTask.d.ts",
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
