/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProjectStatus.defs.ts" enhancement="_blank"/>

export const updateProjectStatusController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "updateProjectStatus",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "projectLifecycle",
    "controllerName": "UpdateProjectStatusController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmUpdateProjectStatusHandler",
        "command": "updateProjectStatus",
        "usecaseRef": "updateProjectStatus",
        "inputTypeName": "UpdateProjectStatusInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "projectId",
            "fieldRef": "Project.projectId",
            "required": true,
            "source": "selectedEntity",
            "description": "The project whose status is being changed"
          },
          {
            "inputId": "status",
            "fieldRef": "Project.status",
            "required": true,
            "source": "userInput",
            "description": "The new lifecycle status for the project (active, completed, or cancelled)"
          },
          {
            "inputId": "cancellationReason",
            "fieldRef": "Project.cancellationReason",
            "required": false,
            "source": "userInput",
            "description": "Reason recorded when the project is cancelled; required only when status is set to cancelled"
          },
          {
            "inputId": "completedAt",
            "fieldRef": "Project.completedAt",
            "required": false,
            "source": "systemDefault",
            "description": "Timestamp set automatically when the project is marked completed"
          },
          {
            "inputId": "cancelledAt",
            "fieldRef": "Project.cancelledAt",
            "required": false,
            "source": "systemDefault",
            "description": "Timestamp set automatically when the project is cancelled"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Project.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp of the last update, refreshed on every status change"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Project.projectId",
            "source": "selectedEntity",
            "originRef": "Project.projectId",
            "description": "Resolved from the currently selected project in the workspace — the backend reads the projectId from the selected entity context"
          },
          {
            "targetRef": "Project.completedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Set to the current server timestamp when the project transitions to completed status"
          },
          {
            "targetRef": "Project.cancelledAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Set to the current server timestamp when the project transitions to cancelled status"
          },
          {
            "targetRef": "Project.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Set to the current server timestamp on every status update"
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
            "Project.completedAt",
            "Project.cancelledAt",
            "Project.cancellationReason",
            "Project.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.projectLifecycle.updateProjectStatus",
        "handlerName": "buildFlowFsmUpdateProjectStatusHandler"
      }
    ]
  }
} as const;

export default updateProjectStatusController;

export const pipeline = [
  {
    "id": "updateProjectStatus__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProjectStatus.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateProjectStatus.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProjectStatus.d.ts"
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
