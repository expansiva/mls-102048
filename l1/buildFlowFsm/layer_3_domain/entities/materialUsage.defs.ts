/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.defs.ts" enhancement="_blank"/>

export const materialUsageDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "MaterialUsage",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "MaterialUsage",
    "fields": [
      {
        "fieldId": "materialUsageId",
        "type": "uuid",
        "required": true,
        "description": "Primary identifier for the material usage record."
      },
      {
        "fieldId": "projectId",
        "type": "uuid",
        "required": true,
        "description": "Project on which the material was consumed."
      },
      {
        "fieldId": "materialName",
        "type": "string",
        "required": true,
        "description": "Name of the material consumed on site."
      },
      {
        "fieldId": "quantity",
        "type": "number",
        "required": true,
        "description": "Quantity of material consumed."
      },
      {
        "fieldId": "unit",
        "type": "string",
        "required": true,
        "description": "Unit of measure for the material quantity.",
        "enum": [
          "kg",
          "liter",
          "meter",
          "portion",
          "unit",
          "bag",
          "box",
          "roll",
          "sheet"
        ]
      },
      {
        "fieldId": "unitCost",
        "type": "money",
        "required": true,
        "description": "Cost per unit of the material in USD."
      },
      {
        "fieldId": "totalCost",
        "type": "money",
        "required": true,
        "description": "Total cost of this material usage entry (quantity × unitCost) in USD."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Lifecycle status of the material usage record.",
        "enum": [
          "posted",
          "voided"
        ]
      },
      {
        "fieldId": "usageDate",
        "type": "date",
        "required": true,
        "description": "Date the material was consumed on the project site."
      },
      {
        "fieldId": "voidedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the material usage record was voided."
      },
      {
        "fieldId": "voidReason",
        "type": "text",
        "required": false,
        "description": "Reason for voiding the material usage record."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the material usage record was created."
      }
    ],
    "statusEnum": [
      "posted",
      "voided"
    ],
    "invariants": [],
    "valueObjects": []
  }
} as const;

export default materialUsageDomainEntity;

export const pipeline = [
  {
    "id": "materialUsage__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
