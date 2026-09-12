/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "voidMaterialUsage",
    "bffName": "buildFlowFsm.voidMaterialUsage.voidMaterialUsage",
    "routeKey": "buildFlowFsm.voidMaterialUsage.voidMaterialUsage",
    "purpose": "Void a material usage record",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "materialUsageId",
        "type": "string",
        "required": true,
        "description": "The material usage record selected by the project manager to be voided.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "voidReason",
        "type": "string",
        "required": true,
        "description": "Text reason explaining why the material usage record is being voided.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "materialUsageId",
        "type": "string",
        "description": "Primary identifier for the material usage record."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "posted",
          "voided"
        ],
        "description": "Lifecycle status of the material usage record."
      },
      {
        "name": "voidedAt",
        "type": "date",
        "description": "Timestamp when the material usage record was voided."
      },
      {
        "name": "voidReason",
        "type": "string",
        "description": "Reason for voiding the material usage record."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:voidMaterialUsage",
      "operationId": "voidMaterialUsage",
      "defPath": "_102048_/l4/operations/voidMaterialUsage.defs.ts",
      "bffName": "buildFlowFsm.voidMaterialUsage.voidMaterialUsage"
    }
  }
];

export const pipeline = [
  {
    "id": "pmMaterialUsageManagement__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
