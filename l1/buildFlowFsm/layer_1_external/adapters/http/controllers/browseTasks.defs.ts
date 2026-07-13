/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseTasks.defs.ts" enhancement="_blank"/>

export const browseTasksController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "browseTasks",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "browseTasks",
    "controllerName": "BrowseTasksController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmBrowseTasksHandler",
        "command": "browseTasks",
        "usecaseRef": "browseTasks",
        "inputTypeName": "BrowseTasksInput",
        "kind": "query",
        "inputContract": [
          {
            "inputId": "assignedWorkerId",
            "fieldRef": "WorkTask.assignedWorkerId",
            "required": true,
            "source": "actorSession",
            "description": "The field worker's identifier from the session, used to filter only tasks assigned to them."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "WorkTask.assignedWorkerId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "The backend resolves the field worker's actor ID from the authenticated session and filters WorkTask records where assignedWorkerId equals that actor ID."
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "",
          "entity": "WorkTask",
          "keyField": "WorkTask.workTaskId",
          "pagination": "optional",
          "selection": "none",
          "output": [
            "WorkTask.workTaskId",
            "WorkTask.title",
            "WorkTask.description",
            "WorkTask.status",
            "WorkTask.dueDate",
            "WorkTask.projectId",
            "WorkTask.sequenceNumber",
            "WorkTask.assignedWorkerName",
            "WorkTask.startedAt",
            "WorkTask.completedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.browseTasks.browseTasks",
        "handlerName": "buildFlowFsmBrowseTasksHandler"
      }
    ]
  }
} as const;

export default browseTasksController;

export const pipeline = [
  {
    "id": "browseTasks__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseTasks.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseTasks.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseTasks.d.ts"
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
