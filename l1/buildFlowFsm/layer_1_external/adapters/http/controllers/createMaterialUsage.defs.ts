/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createMaterialUsage.defs.ts" enhancement="_blank"/>

export const createMaterialUsageController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "createMaterialUsage",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "createMaterialUsage",
    "controllerName": "CreateMaterialUsageController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmCreateMaterialUsageHandler",
        "command": "createMaterialUsage",
        "usecaseRef": "createMaterialUsage",
        "inputTypeName": "CreateMaterialUsageInput",
        "kind": "create",
        "inputContract": [
          {
            "inputId": "projectId",
            "fieldRef": "MaterialUsage.projectId",
            "required": true,
            "source": "routeParam",
            "description": "The project on which the material was consumed, provided via the route parameter."
          },
          {
            "inputId": "materialName",
            "fieldRef": "MaterialUsage.materialName",
            "required": true,
            "source": "userInput",
            "description": "Name of the material consumed on site."
          },
          {
            "inputId": "quantity",
            "fieldRef": "MaterialUsage.quantity",
            "required": true,
            "source": "userInput",
            "description": "Quantity of material consumed."
          },
          {
            "inputId": "unit",
            "fieldRef": "MaterialUsage.unit",
            "required": true,
            "source": "userInput",
            "description": "Unit of measure for the material quantity (kg, liter, meter, portion, unit, bag, box, roll, or sheet)."
          },
          {
            "inputId": "unitCost",
            "fieldRef": "MaterialUsage.unitCost",
            "required": true,
            "source": "userInput",
            "description": "Cost per unit of the material in USD."
          },
          {
            "inputId": "totalCost",
            "fieldRef": "MaterialUsage.totalCost",
            "required": true,
            "source": "userInput",
            "description": "Total cost computed by the frontend as quantity multiplied by unitCost, submitted for server-side validation."
          },
          {
            "inputId": "usageDate",
            "fieldRef": "MaterialUsage.usageDate",
            "required": true,
            "source": "userInput",
            "description": "Date the material was consumed on the project site."
          },
          {
            "inputId": "materialUsageId",
            "fieldRef": "MaterialUsage.materialUsageId",
            "required": true,
            "source": "systemDefault",
            "description": "System-generated unique identifier for the new material usage record."
          },
          {
            "inputId": "status",
            "fieldRef": "MaterialUsage.status",
            "required": true,
            "source": "systemDefault",
            "description": "Lifecycle status of the material usage record, defaulted to 'posted' on creation."
          },
          {
            "inputId": "createdAt",
            "fieldRef": "MaterialUsage.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp when the material usage record was created."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "MaterialUsage.projectId",
            "source": "routeParam",
            "originRef": "routeParam.projectId",
            "description": "The projectId is extracted from the route parameter identifying the currently viewed project."
          },
          {
            "targetRef": "MaterialUsage.materialUsageId",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "A new UUID is generated server-side as the primary identifier for the material usage record."
          },
          {
            "targetRef": "MaterialUsage.status",
            "source": "workflowState",
            "originRef": "MaterialUsage.status",
            "description": "New material usage records are initialized with status 'posted' as the default workflow state upon creation."
          },
          {
            "targetRef": "MaterialUsage.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The current server timestamp is captured at the moment of record creation."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "MaterialUsage",
          "keyField": "MaterialUsage.materialUsageId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "MaterialUsage.materialUsageId",
            "MaterialUsage.materialName",
            "MaterialUsage.quantity",
            "MaterialUsage.unit",
            "MaterialUsage.unitCost",
            "MaterialUsage.totalCost",
            "MaterialUsage.status",
            "MaterialUsage.usageDate"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.createMaterialUsage.createMaterialUsage",
        "handlerName": "buildFlowFsmCreateMaterialUsageHandler"
      }
    ]
  }
} as const;

export default createMaterialUsageController;

export const pipeline = [
  {
    "id": "createMaterialUsage__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createMaterialUsage.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createMaterialUsage.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createMaterialUsage.d.ts"
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
