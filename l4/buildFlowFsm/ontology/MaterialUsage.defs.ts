/// <mls fileReference="_102048_/l4/buildFlowFsm/ontology/MaterialUsage.defs.ts" enhancement="_blank"/>

export const buildFlowFsmEntityMaterialUsage = {
  "entityId": "MaterialUsage",
  "title": "Material Usage",
  "description": "An append-only record of materials consumed on a project site with associated costs, tracked for material job costing and budget variance analysis.",
  "kind": "event",
  "ownership": "moduleOwned",
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
  "eventPolicy": {
    "purpose": "audit",
    "retentionDays": 1825
  }
} as const;

export default buildFlowFsmEntityMaterialUsage;
