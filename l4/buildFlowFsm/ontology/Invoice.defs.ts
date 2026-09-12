/// <mls fileReference="_102048_/l4/buildFlowFsm/ontology/Invoice.defs.ts" enhancement="_blank"/>

export const buildFlowFsmEntityInvoice = {
  "entityId": "Invoice",
  "title": "Invoice",
  "description": "A billing document generated from accumulated time logs, material costs, and approved change orders, delivered to the client via shareable link or email for payment.",
  "kind": "core",
  "ownership": "moduleOwned",
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
  "lifecycleStates": [
    "draft",
    "issued",
    "voided"
  ]
} as const;

export default buildFlowFsmEntityInvoice;
