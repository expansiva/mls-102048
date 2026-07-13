/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewProject.defs.ts" enhancement="_blank"/>

export const viewProjectController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewProject",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "viewProject",
    "controllerName": "ViewProjectController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmViewProjectHandler",
        "command": "viewProject",
        "usecaseRef": "viewProject",
        "inputTypeName": "ViewProjectInput",
        "kind": "view",
        "inputContract": [
          {
            "inputId": "projectId",
            "fieldRef": "Project.projectId",
            "required": true,
            "source": "routeParam",
            "description": "The unique identifier of the project to view, provided via the route parameter."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Project.projectId",
            "source": "routeParam",
            "originRef": "routeParam.projectId",
            "description": "The projectId is extracted from the URL route parameter to load the single project record."
          },
          {
            "targetRef": "actorSession.actorId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "The authenticated companyAdmin's actorId is resolved from the session to authorize access to the project detail."
          },
          {
            "targetRef": "businessContext.activeCompanyId",
            "source": "businessContext",
            "originRef": "businessContext.activeCompanyId",
            "description": "The active company is resolved from the business context to scope the project lookup to the admin's company."
          }
        ],
        "accessPattern": {
          "kind": "getById",
          "description": "",
          "entity": "Project",
          "keyField": "Project.projectId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "Project.projectId",
            "Project.clientId",
            "Project.name",
            "Project.siteAddress",
            "Project.budget",
            "Project.startDate",
            "Project.endDate",
            "Project.status",
            "Project.completedAt",
            "Project.cancelledAt",
            "Project.cancellationReason",
            "Project.createdAt",
            "Project.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.viewProject.viewProject",
        "handlerName": "buildFlowFsmViewProjectHandler"
      }
    ]
  }
} as const;

export default viewProjectController;

export const pipeline = [
  {
    "id": "viewProject__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewProject.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewProject.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewProject.d.ts"
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
