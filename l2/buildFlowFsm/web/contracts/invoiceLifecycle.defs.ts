/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "generateInvoice",
    "bffName": "buildFlowFsm.invoiceLifecycle.generateInvoice",
    "routeKey": "buildFlowFsm.invoiceLifecycle.generateInvoice",
    "purpose": "Generate invoice from job costs",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "The project to generate an invoice for, selected by the admin from the project list",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "clientEmail",
        "type": "string",
        "required": false,
        "description": "Optional email address to deliver the invoice to the client",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "description": "Optional internal notes about the invoice",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "invoiceId",
        "type": "string",
        "description": "Primary identifier for the invoice record."
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
      "ownerId": "operation:generateInvoice",
      "operationId": "generateInvoice",
      "defPath": "_102048_/l4/operations/generateInvoice.defs.ts",
      "bffName": "buildFlowFsm.invoiceLifecycle.generateInvoice"
    }
  },
  {
    "commandName": "issueInvoice",
    "bffName": "buildFlowFsm.invoiceLifecycle.issueInvoice",
    "routeKey": "buildFlowFsm.invoiceLifecycle.issueInvoice",
    "purpose": "Issue and send invoice to client",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "invoiceId",
        "type": "string",
        "required": true,
        "description": "The draft invoice to be issued and sent to the client.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "clientEmail",
        "type": "string",
        "required": false,
        "description": "Optional email address to deliver the invoice to the client; if omitted, only the shareable link is generated.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "invoiceId",
        "type": "string",
        "description": "Primary identifier for the invoice record."
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
        "name": "totalAmount",
        "type": "number",
        "description": "Calculated total of labor cost plus material cost plus approved change order amounts."
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
      },
      {
        "name": "issuedAt",
        "type": "date",
        "description": "Timestamp when the invoice was issued to the client."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:issueInvoice",
      "operationId": "issueInvoice",
      "defPath": "_102048_/l4/operations/issueInvoice.defs.ts",
      "bffName": "buildFlowFsm.invoiceLifecycle.issueInvoice"
    }
  }
];

export const pipeline = [
  {
    "id": "invoiceLifecycle__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
