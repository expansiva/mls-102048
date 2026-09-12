/// <mls fileReference="_102048_/l4/operations/viewInvoice.defs.ts" enhancement="_blank"/>

export const operationViewInvoice = {
  "operationId": "viewInvoice",
  "title": "Review invoice details",
  "actor": "client",
  "entity": "Invoice",
  "kind": "view",
  "reads": [
    "Invoice",
    "InvoiceLine"
  ],
  "writes": [],
  "rulesApplied": [
    "invoiceCalculation",
    "allFiguresUsdNoTax",
    "approvedChangeOrdersOnly",
    "invoiceIsInformational"
  ],
  "story": {
    "actor": "client",
    "goal": "Review the billing breakdown of an invoice received via a shareable link to confirm the charges are accurate and expected.",
    "steps": [
      "The client opens the invoice through a shareable link received by email or direct URL.",
      "The system loads the invoice and its line items by the invoice ID from the link.",
      "The client reviews the itemized cost breakdown: labor cost, material cost, and approved change order amounts.",
      "The client sees the total amount and confirms all figures are in USD with no tax line."
    ],
    "outcome": "The client has a clear, informational view of the invoice with a full cost breakdown and no payment processing options."
  },
  "accessPattern": {
    "kind": "getById",
    "entity": "Invoice",
    "keyField": "Invoice.invoiceId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Invoice.invoiceId",
      "Invoice.projectId",
      "Invoice.status",
      "Invoice.laborCost",
      "Invoice.materialCost",
      "Invoice.changeOrderAmount",
      "Invoice.totalAmount",
      "Invoice.currency",
      "Invoice.issuedAt",
      "Invoice.notes",
      "Invoice.shareLink",
      "Invoice.clientEmail"
    ]
  },
  "inputs": [
    {
      "inputId": "invoiceId",
      "fieldRef": "Invoice.invoiceId",
      "required": true,
      "source": "routeParam",
      "description": "The invoice identifier extracted from the shareable link URL the client opened."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Invoice.invoiceId",
      "source": "routeParam",
      "originRef": "routeParam.invoiceId",
      "description": "The backend reads the invoiceId path parameter from the shareable link route and loads the single Invoice record matching that id."
    }
  ],
  "acceptanceAssertions": [
    "The invoice is loaded by invoiceId from the route parameter and its status is 'issued'.",
    "The billing breakdown displays laborCost, materialCost, and changeOrderAmount as separate line items.",
    "The totalAmount equals laborCost plus materialCost plus changeOrderAmount.",
    "All monetary figures are displayed in USD and no tax calculation is shown.",
    "Only approved change order amounts are included in the displayed totals.",
    "The invoice view is informational only and contains no payment processing or payment gateway elements."
  ],
  "pageId": "viewInvoice",
  "commandName": "viewInvoice",
  "bffName": "buildFlowFsm.viewInvoice.viewInvoice",
  "capability": {
    "capabilityId": "viewInvoice",
    "title": "Review invoice details",
    "actor": "client",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewInvoice;
