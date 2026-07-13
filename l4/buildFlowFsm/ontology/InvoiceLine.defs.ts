/// <mls fileReference="_102048_/l4/buildFlowFsm/ontology/InvoiceLine.defs.ts" enhancement="_blank"/>

export const buildFlowFsmEntityInvoiceLine = {
  "entityId": "InvoiceLine",
  "title": "Invoice Line",
  "description": "An itemized line on an invoice representing a labor, material, or approved change order cost component, snapshotting costs at invoice generation time.",
  "kind": "supporting",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "invoiceLineId",
      "type": "uuid",
      "required": true,
      "description": "Primary identifier for the invoice line record."
    },
    {
      "fieldId": "invoiceId",
      "type": "uuid",
      "required": true,
      "description": "Reference to the parent invoice this line belongs to."
    },
    {
      "fieldId": "lineType",
      "type": "string",
      "required": true,
      "description": "Category of the cost component: labor, material, or approved change order.",
      "enum": [
        "labor",
        "material",
        "changeOrder"
      ]
    },
    {
      "fieldId": "description",
      "type": "text",
      "required": true,
      "description": "Human-readable description of what this line item covers."
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantity of units billed on this line (e.g. hours for labor, units for materials)."
    },
    {
      "fieldId": "unit",
      "type": "string",
      "required": true,
      "description": "Unit of measurement for the quantity value.",
      "enum": [
        "hour",
        "unit",
        "lumpSum"
      ]
    },
    {
      "fieldId": "unitCost",
      "type": "money",
      "required": true,
      "description": "Cost per unit in USD at the time of invoice generation."
    },
    {
      "fieldId": "lineAmount",
      "type": "money",
      "required": true,
      "description": "Total amount for this line in USD, calculated as quantity times unitCost."
    },
    {
      "fieldId": "sourceRecordId",
      "type": "uuid",
      "required": false,
      "description": "Reference to the originating record (TimeLog, MaterialUsage, or ChangeOrder) from which this line was generated."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Timestamp when the invoice line was created."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Timestamp when the invoice line was last updated."
    }
  ]
} as const;

export default buildFlowFsmEntityInvoiceLine;
