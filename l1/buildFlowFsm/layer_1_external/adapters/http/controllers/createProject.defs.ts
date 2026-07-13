/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createProject.defs.ts" enhancement="_blank"/>

export const createProjectController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "createProject",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "projectLifecycle",
    "controllerName": "CreateProjectController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmCreateProjectHandler",
        "command": "createProject",
        "usecaseRef": "createProject",
        "inputTypeName": "CreateProjectInput",
        "kind": "create",
        "inputContract": [
          {
            "inputId": "name",
            "fieldRef": "Project.name",
            "required": true,
            "source": "userInput",
            "description": "Project name or title shown on dashboards and reports"
          },
          {
            "inputId": "clientId",
            "fieldRef": "Project.clientId",
            "required": true,
            "source": "userInput",
            "description": "Reference to the client who owns this project; selected from existing clients"
          },
          {
            "inputId": "siteAddress",
            "fieldRef": "Project.siteAddress",
            "required": true,
            "source": "userInput",
            "description": "Physical address of the construction or remodeling site"
          },
          {
            "inputId": "budget",
            "fieldRef": "Project.budget",
            "required": true,
            "source": "userInput",
            "description": "Approved project budget in USD; must be a positive amount"
          },
          {
            "inputId": "startDate",
            "fieldRef": "Project.startDate",
            "required": true,
            "source": "userInput",
            "description": "Planned project start date"
          },
          {
            "inputId": "endDate",
            "fieldRef": "Project.endDate",
            "required": true,
            "source": "userInput",
            "description": "Planned project end date; must be on or after the start date"
          },
          {
            "inputId": "status",
            "fieldRef": "Project.status",
            "required": true,
            "source": "userInput",
            "description": "Initial lifecycle status of the project; admin can set to draft or active"
          },
          {
            "inputId": "projectId",
            "fieldRef": "Project.projectId",
            "required": true,
            "source": "systemDefault",
            "description": "System-generated unique identifier for the project"
          },
          {
            "inputId": "createdAt",
            "fieldRef": "Project.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp when the project record is created"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Project.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp when the project record is last updated; set equal to createdAt on creation"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Project.projectId",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "The backend generates a new UUID for the project identifier at creation time"
          },
          {
            "targetRef": "Project.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets the creation timestamp to the current server time when the project record is persisted"
          },
          {
            "targetRef": "Project.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets the last-updated timestamp to the current server time when the project record is persisted"
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
            "Project.status",
            "Project.createdAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.projectLifecycle.createProject",
        "handlerName": "buildFlowFsmCreateProjectHandler"
      }
    ]
  }
} as const;

export default createProjectController;

export const pipeline = [
  {
    "id": "createProject__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createProject.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createProject.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createProject.d.ts"
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
