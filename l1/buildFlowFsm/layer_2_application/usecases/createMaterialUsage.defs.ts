/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createMaterialUsage.defs.ts" enhancement="_blank"/>

export const createMaterialUsageUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createMaterialUsage",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createMaterialUsage",
    "ports": [
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "createMaterialUsage",
        "inputTypeName": "CreateMaterialUsageInput",
        "outputTypeName": "CreateMaterialUsageOutput",
        "input": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "The project on which the material was consumed, provided via the route parameter."
          },
          {
            "name": "materialName",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "Name of the material consumed on site."
          },
          {
            "name": "quantity",
            "type": "number",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "Quantity of material consumed."
          },
          {
            "name": "unit",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "Unit of measure for the material quantity (kg, liter, meter, portion, unit, bag, box, roll, or sheet)."
          },
          {
            "name": "unitCost",
            "type": "number",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "Cost per unit of the material in USD."
          },
          {
            "name": "totalCost",
            "type": "number",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "Total cost computed by the frontend as quantity multiplied by unitCost, submitted for server-side validation."
          },
          {
            "name": "usageDate",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "Date the material was consumed on the project site."
          }
        ],
        "output": [
          {
            "name": "materialUsageId",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "System-generated unique identifier for the new material usage record."
          },
          {
            "name": "materialName",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "quantity",
            "type": "number",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "unit",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "unitCost",
            "type": "number",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "totalCost",
            "type": "number",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage"
          },
          {
            "name": "usageDate",
            "type": "string",
            "required": true,
            "ofEntity": "MaterialUsage"
          }
        ],
        "ports": [
          "Project",
          "MaterialUsage"
        ],
        "rulesApplied": [
          "materialUsageRequiresProject"
        ],
        "transactional": true,
        "steps": [
          "1. Load the Project referenced by projectId through the Project port (getById). If not found, reject with validation error referencing rule materialUsageRequiresProject — the material usage record cannot be saved without a valid project linkage.",
          "2. Validate that unit is one of the allowed enum values: kg, liter, meter, portion, unit, bag, box, roll, sheet. Reject with a validation error if invalid.",
          "3. Server-side validation: compute expectedTotalCost = quantity * unitCost and compare to the submitted totalCost. If they do not match (within floating-point tolerance of 0.01), reject with a validation error.",
          "4. Generate materialUsageId via ctx.idGenerator (systemDefault uuid).",
          "5. Set status to 'posted' (workflowState default for new material usage records) and createdAt to ctx.clock.now() (systemDefault timestamp).",
          "6. Persist the new MaterialUsage record through the MaterialUsage port inside a single transaction (ctx.data transaction wrapper).",
          "7. Return the created record fields: materialUsageId, materialName, quantity, unit, unitCost, totalCost, status, usageDate."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default createMaterialUsageUsecase;

export const pipeline = [
  {
    "id": "createMaterialUsage__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createMaterialUsage.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createMaterialUsage.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
