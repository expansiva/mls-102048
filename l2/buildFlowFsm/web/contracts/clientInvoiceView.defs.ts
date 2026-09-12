/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "viewInvoice",
    "bffName": "buildFlowFsm.viewInvoice.viewInvoice",
    "routeKey": "buildFlowFsm.viewInvoice.viewInvoice",
    "purpose": "Review invoice details",
    "kind": "query",
    "outputShape": "object",
    "input": [
      {
        "name": "invoiceId",
        "type": "string",
        "required": true,
        "description": "The invoice identifier extracted from the shareable link URL the client opened.",
        "source": "routeParam",
        "presentation": "route"
      }
    ],
    "output": [
      {
        "name": "invoiceId",
        "type": "string",
        "description": "Primary identifier for the invoice record."
      },
      {
        "name": "projectId",
        "type": "string",
        "description": "Reference to the project this invoice belongs to."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "issued",
          "voided"
        ],
        "description": "Lifecycle state of the invoice: draft, issued, or voided."
      },
      {
        "name": "laborCost",
        "type": "number",
        "description": "Total labor cost accumulated from approved time logs on the project."
      },
      {
        "name": "materialCost",
        "type": "number",
        "description": "Total material cost accumulated from material usage records on the project."
      },
      {
        "name": "changeOrderAmount",
        "type": "number",
        "description": "Total amount from approved change orders included in this invoice."
      },
      {
        "name": "totalAmount",
        "type": "number",
        "description": "Calculated total of labor cost plus material cost plus approved change order amounts."
      },
      {
        "name": "currency",
        "type": "string",
        "enum": [
          "usd"
        ],
        "description": "Currency code for all monetary figures on the invoice, always USD."
      },
      {
        "name": "issuedAt",
        "type": "date",
        "description": "Timestamp when the invoice was issued to the client."
      },
      {
        "name": "notes",
        "type": "string",
        "description": "Optional internal notes about the invoice."
      },
      {
        "name": "shareLink",
        "type": "string",
        "description": "Shareable link generated for delivering the invoice to the client."
      },
      {
        "name": "clientEmail",
        "type": "string",
        "description": "Email address used to deliver the invoice to the client."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewInvoice",
      "operationId": "viewInvoice",
      "defPath": "_102048_/l4/operations/viewInvoice.defs.ts",
      "bffName": "buildFlowFsm.viewInvoice.viewInvoice"
    }
  }
];

export const pipeline = [
  {
    "id": "clientInvoiceView__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
