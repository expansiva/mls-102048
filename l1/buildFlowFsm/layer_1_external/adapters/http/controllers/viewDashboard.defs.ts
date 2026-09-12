/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewDashboard.defs.ts" enhancement="_blank"/>

export const viewDashboardController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewDashboard",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "viewDashboard",
    "controllerName": "ViewDashboardController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmViewDashboardHandler",
        "command": "viewDashboard",
        "usecaseRef": "viewDashboard",
        "inputTypeName": "ViewDashboardInput",
        "kind": "query",
        "inputContract": [
          {
            "inputId": "actorId",
            "fieldRef": "Project.projectId",
            "required": true,
            "source": "actorSession",
            "description": "The admin viewing the dashboard; used to scope projects to the admin's company."
          },
          {
            "inputId": "activeCompanyId",
            "fieldRef": "Project.clientId",
            "required": true,
            "source": "businessContext",
            "description": "The company context that scopes which projects are visible on the dashboard."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "actorSession.actorId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "Resolved from the authenticated admin session to identify the viewer and scope data to their company."
          },
          {
            "targetRef": "businessContext.activeCompanyId",
            "source": "businessContext",
            "originRef": "businessContext.activeCompanyId",
            "description": "Resolved from the current business context to filter projects belonging to the admin's company."
          }
        ],
        "accessPattern": {
          "kind": "list",
          "description": "",
          "entity": "Project",
          "keyField": "Project.projectId",
          "pagination": "optional",
          "selection": "none",
          "output": [
            "Project.projectId",
            "Project.name",
            "Project.budget",
            "Project.startDate",
            "Project.endDate",
            "Project.status",
            "Project.clientId",
            "Client.name",
            "WorkTask.title",
            "WorkTask.dueDate",
            "WorkTask.status",
            "TimeLog.hours",
            "MaterialUsage.cost",
            "ChangeOrder.amount",
            "ChangeOrder.status"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.viewDashboard.viewDashboard",
        "handlerName": "buildFlowFsmViewDashboardHandler"
      }
    ]
  }
} as const;

export default viewDashboardController;

export const pipeline = [
  {
    "id": "viewDashboard__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewDashboard.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewDashboard.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewDashboard.d.ts"
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
