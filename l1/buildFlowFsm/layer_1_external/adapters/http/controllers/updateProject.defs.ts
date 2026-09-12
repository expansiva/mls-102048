/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProject.defs.ts" enhancement="_blank"/>

export const updateProjectController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "updateProject",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "updateProject",
    "controllerName": "UpdateProjectController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmUpdateProjectHandler",
        "command": "updateProject",
        "usecaseRef": "updateProject",
        "inputTypeName": "UpdateProjectInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "projectId",
            "fieldRef": "Project.projectId",
            "required": true,
            "source": "routeParam",
            "description": "Identifier of the project being edited, taken from the route parameter."
          },
          {
            "inputId": "name",
            "fieldRef": "Project.name",
            "required": true,
            "source": "userInput",
            "description": "Updated project name or title."
          },
          {
            "inputId": "clientId",
            "fieldRef": "Project.clientId",
            "required": true,
            "source": "userInput",
            "description": "Updated reference to the client who owns this project."
          },
          {
            "inputId": "siteAddress",
            "fieldRef": "Project.siteAddress",
            "required": true,
            "source": "userInput",
            "description": "Updated physical address of the construction or remodeling site."
          },
          {
            "inputId": "budget",
            "fieldRef": "Project.budget",
            "required": true,
            "source": "userInput",
            "description": "Updated approved project budget in USD; must be a positive amount."
          },
          {
            "inputId": "startDate",
            "fieldRef": "Project.startDate",
            "required": true,
            "source": "userInput",
            "description": "Updated planned project start date."
          },
          {
            "inputId": "endDate",
            "fieldRef": "Project.endDate",
            "required": true,
            "source": "userInput",
            "description": "Updated planned project end date; must be on or after the start date."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Project.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp of the update, set automatically by the server."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Project.projectId",
            "source": "routeParam",
            "originRef": "routeParam.projectId",
            "description": "The project id is extracted from the route parameter identifying which project the admin opened for editing."
          },
          {
            "targetRef": "Project.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The server sets updatedAt to the current timestamp at the moment the update is persisted."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "Project",
          "keyField": "Project.projectId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "Project.projectId",
            "Project.name",
            "Project.clientId",
            "Project.siteAddress",
            "Project.budget",
            "Project.startDate",
            "Project.endDate",
            "Project.status",
            "Project.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.updateProject.updateProject",
        "handlerName": "buildFlowFsmUpdateProjectHandler"
      }
    ]
  }
} as const;

export default updateProjectController;

export const pipeline = [
  {
    "id": "updateProject__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProject.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProject.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProject.d.ts"
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
