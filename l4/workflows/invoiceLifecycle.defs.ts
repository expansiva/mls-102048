/// <mls fileReference="_102048_/l4/workflows/invoiceLifecycle.defs.ts" enhancement="_blank"/>

export const workflowInvoiceLifecycle = {
  "workflowId": "invoiceLifecycle",
  "title": "Invoice Lifecycle",
  "executionMode": "sequential",
  "trigger": "Company admin selects a project and generates an invoice from accumulated time logs, material costs, and approved change orders.",
  "actors": [
    "companyAdmin"
  ],
  "states": [
    "draft",
    "issued"
  ],
  "transitions": [
    {
      "from": "draft",
      "to": "issued",
      "on": "issueInvoice",
      "by": "companyAdmin",
      "guard": "Only approved change orders are included; total = laborCost + materialCost + approved change order amounts, all in USD."
    }
  ],
  "operationIds": [
    "generateInvoice",
    "issueInvoice"
  ],
  "entities": [
    "Invoice",
    "Project",
    "ChangeOrder",
    "InvoiceLine"
  ],
  "rulesApplied": [
    "invoiceCalculation",
    "allFiguresUsdNoTax",
    "approvedChangeOrdersOnly",
    "invoiceIsInformational"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "Generate an accurate invoice from accumulated job costs and deliver it to the client for review and payment.",
    "steps": [
      "Select the project to bill and open the billing summary showing accumulated time logs, material usage, and approved change orders.",
      "Review the consolidated cost breakdown — labor hours and rates, material costs, and approved change order amounts — to confirm everything is accurate.",
      "Generate the invoice from the confirmed costs, with the total calculated as labor cost plus material cost plus approved change order amounts in USD.",
      "Issue the invoice to the client via a shareable link or email so the client can review the charges and arrange payment."
    ],
    "outcome": "An invoice is generated from actual job costs and delivered to the client as an informational billing summary for review and payment."
  },
  "pageId": "invoiceLifecycle",
  "capabilities": [
    {
      "capabilityId": "invoiceLifecycle",
      "title": "Invoice Lifecycle",
      "actor": "companyAdmin",
      "priority": "now"
    }
  ],
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default workflowInvoiceLifecycle;
