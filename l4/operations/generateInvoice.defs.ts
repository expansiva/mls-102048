/// <mls fileReference="_102048_/l4/operations/generateInvoice.defs.ts" enhancement="_blank"/>

export const operationGenerateInvoice = {
  "operationId": "generateInvoice",
  "title": "Generate invoice from job costs",
  "actor": "companyAdmin",
  "entity": "Invoice",
  "kind": "create",
  "reads": [
    "Project",
    "TimeLog",
    "MaterialUsage",
    "ChangeOrder",
    "Client"
  ],
  "writes": [
    "Invoice"
  ],
  "rulesApplied": [
    "invoiceCalculation",
    "allFiguresUsdNoTax",
    "approvedChangeOrdersOnly",
    "invoiceIsInformational"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "Generate an invoice from accumulated project costs and deliver it to the client for review and payment",
    "steps": [
      "Select a project that has accumulated time logs, material usage, and approved change orders",
      "Review the billing summary showing labor costs, material costs, and approved change order amounts",
      "Generate the invoice with calculated totals in USD and send it to the client via a shareable link or email"
    ],
    "outcome": "A draft invoice is created with itemized costs in USD, a shareable link for client delivery, and no payment processing initiated"
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "Invoice",
    "keyField": "Invoice.invoiceId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Invoice.invoiceId",
      "Invoice.status",
      "Invoice.laborCost",
      "Invoice.materialCost",
      "Invoice.changeOrderAmount",
      "Invoice.totalAmount",
      "Invoice.currency",
      "Invoice.shareLink",
      "Invoice.clientEmail"
    ]
  },
  "inputs": [
    {
      "inputId": "projectId",
      "fieldRef": "Invoice.projectId",
      "required": true,
      "source": "selectedEntity",
      "description": "The project to generate an invoice for, selected by the admin from the project list"
    },
    {
      "inputId": "clientEmail",
      "fieldRef": "Invoice.clientEmail",
      "required": false,
      "source": "userInput",
      "description": "Optional email address to deliver the invoice to the client"
    },
    {
      "inputId": "notes",
      "fieldRef": "Invoice.notes",
      "required": false,
      "source": "userInput",
      "description": "Optional internal notes about the invoice"
    },
    {
      "inputId": "laborCost",
      "fieldRef": "Invoice.laborCost",
      "required": true,
      "source": "previousStepOutput",
      "description": "Total labor cost computed from approved time logs on the project"
    },
    {
      "inputId": "materialCost",
      "fieldRef": "Invoice.materialCost",
      "required": true,
      "source": "previousStepOutput",
      "description": "Total material cost computed from material usage records on the project"
    },
    {
      "inputId": "changeOrderAmount",
      "fieldRef": "Invoice.changeOrderAmount",
      "required": true,
      "source": "previousStepOutput",
      "description": "Total amount from approved change orders on the project"
    },
    {
      "inputId": "totalAmount",
      "fieldRef": "Invoice.totalAmount",
      "required": true,
      "source": "previousStepOutput",
      "description": "Calculated total of labor cost plus material cost plus approved change order amounts"
    },
    {
      "inputId": "currency",
      "fieldRef": "Invoice.currency",
      "required": true,
      "source": "systemDefault",
      "description": "Currency code for all monetary figures, always USD"
    },
    {
      "inputId": "shareLink",
      "fieldRef": "Invoice.shareLink",
      "required": false,
      "source": "systemDefault",
      "description": "System-generated shareable link for delivering the invoice to the client"
    },
    {
      "inputId": "invoiceId",
      "fieldRef": "Invoice.invoiceId",
      "required": true,
      "source": "systemDefault",
      "description": "System-generated unique identifier for the invoice record"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "Invoice.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp when the invoice record is created"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "Invoice.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp when the invoice record is last updated, set to creation time"
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Invoice.projectId",
      "source": "selectedEntity",
      "originRef": "Project.projectId",
      "description": "The project selected by the admin in the project picker, resolved from the current selection context"
    },
    {
      "targetRef": "Invoice.laborCost",
      "source": "previousStepOutput",
      "originRef": "Invoice.laborCost",
      "description": "Computed by summing approved TimeLog costs for the selected project during the billing summary review step"
    },
    {
      "targetRef": "Invoice.materialCost",
      "source": "previousStepOutput",
      "originRef": "Invoice.materialCost",
      "description": "Computed by summing MaterialUsage costs for the selected project during the billing summary review step"
    },
    {
      "targetRef": "Invoice.changeOrderAmount",
      "source": "previousStepOutput",
      "originRef": "Invoice.changeOrderAmount",
      "description": "Computed by summing only approved ChangeOrder amounts for the selected project during the billing summary review step"
    },
    {
      "targetRef": "Invoice.totalAmount",
      "source": "previousStepOutput",
      "originRef": "Invoice.totalAmount",
      "description": "Calculated as laborCost plus materialCost plus changeOrderAmount during the billing summary review step"
    },
    {
      "targetRef": "Invoice.currency",
      "source": "systemDefault",
      "originRef": "systemDefault.locale",
      "description": "Resolved to USD based on system configuration; all monetary figures must be in USD per domain rule"
    },
    {
      "targetRef": "Invoice.shareLink",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "System generates a unique token used to construct a shareable link for the invoice"
    },
    {
      "targetRef": "Invoice.invoiceId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "System generates a new UUID as the primary identifier for the invoice record"
    },
    {
      "targetRef": "Invoice.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Current timestamp captured at the moment of invoice creation"
    },
    {
      "targetRef": "Invoice.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Current timestamp captured at the moment of invoice creation, matching createdAt"
    }
  ],
  "acceptanceAssertions": [
    "After generation the invoice exists with status draft",
    "The invoice totalAmount equals laborCost plus materialCost plus changeOrderAmount",
    "Only change orders with approved status are included in the changeOrderAmount calculation",
    "All monetary figures on the invoice are expressed in USD with no tax computation",
    "The invoice does not initiate or process any payment — it serves as an informational billing summary only",
    "A shareable link is generated for delivering the invoice to the client",
    "The invoice references the selected project via projectId"
  ],
  "pageId": "invoiceLifecycle",
  "commandName": "generateInvoice",
  "bffName": "buildFlowFsm.invoiceLifecycle.generateInvoice",
  "capability": {
    "capabilityId": "invoiceLifecycle",
    "title": "Invoice Lifecycle",
    "actor": "companyAdmin",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationGenerateInvoice;
