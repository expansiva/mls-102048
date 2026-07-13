/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.defs.ts" enhancement="_blank"/>

export const invoiceDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "Invoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Invoice",
    "fields": [
      {
        "fieldId": "invoiceId",
        "type": "uuid",
        "required": true,
        "description": "Primary identifier for the invoice record."
      },
      {
        "fieldId": "projectId",
        "type": "uuid",
        "required": true,
        "description": "Reference to the project this invoice belongs to."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Lifecycle state of the invoice: draft, issued, or voided.",
        "enum": [
          "draft",
          "issued",
          "voided"
        ]
      },
      {
        "fieldId": "laborCost",
        "type": "money",
        "required": true,
        "description": "Total labor cost accumulated from approved time logs on the project."
      },
      {
        "fieldId": "materialCost",
        "type": "money",
        "required": true,
        "description": "Total material cost accumulated from material usage records on the project."
      },
      {
        "fieldId": "changeOrderAmount",
        "type": "money",
        "required": true,
        "description": "Total amount from approved change orders included in this invoice."
      },
      {
        "fieldId": "totalAmount",
        "type": "money",
        "required": true,
        "description": "Calculated total of labor cost plus material cost plus approved change order amounts."
      },
      {
        "fieldId": "currency",
        "type": "string",
        "required": true,
        "description": "Currency code for all monetary figures on the invoice, always USD.",
        "enum": [
          "usd"
        ]
      },
      {
        "fieldId": "shareLink",
        "type": "string",
        "required": false,
        "description": "Shareable link generated for delivering the invoice to the client."
      },
      {
        "fieldId": "clientEmail",
        "type": "string",
        "required": false,
        "description": "Email address used to deliver the invoice to the client."
      },
      {
        "fieldId": "issuedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the invoice was issued to the client."
      },
      {
        "fieldId": "voidedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the invoice was voided."
      },
      {
        "fieldId": "voidReason",
        "type": "text",
        "required": false,
        "description": "Reason recorded when an invoice is voided."
      },
      {
        "fieldId": "notes",
        "type": "text",
        "required": false,
        "description": "Optional internal notes about the invoice."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the invoice record was created."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the invoice record was last updated."
      }
    ],
    "statusEnum": [
      "draft",
      "issued",
      "voided"
    ],
    "invariants": [
      "totalAmount must equal laborCost + materialCost + changeOrderAmount",
      "currency must always be USD",
      "status transitions: draft→issued, draft→voided, issued→voided",
      "issuedAt must be set when status is issued",
      "voidedAt and voidReason must be set when status is voided",
      "laborCost, materialCost, and changeOrderAmount must each be non-negative",
      "only approved change orders contribute to changeOrderAmount",
      "invoice lines must be consistent with the aggregate cost totals"
    ],
    "valueObjects": [
      {
        "name": "InvoiceLine",
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
        ],
        "collection": true
      }
    ]
  }
} as const;

export default invoiceDomainEntity;

export const pipeline = [
  {
    "id": "invoice__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.defs.ts",
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
