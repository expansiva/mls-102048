/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientInvoiceView",
  "pageName": "Invoice Review",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmClientInvoiceViewBase",
  "routePattern": "/buildFlowFsm/clientInvoiceView/:invoiceId?",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:viewInvoice"
  ],
  "operationIds": [
    "viewInvoice"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "clientInvoiceView",
    "workspaceKind": "operation",
    "actor": "client",
    "entity": "Invoice",
    "owners": [
      {
        "kind": "operation",
        "id": "viewInvoice",
        "defPath": "_102048_/l4/operations/viewInvoice.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "viewInvoice",
          "commandName": "viewInvoice",
          "steps": [
            "The client opens the invoice through a shareable link received by email or direct URL.",
            "The system loads the invoice and its line items by the invoice ID from the link.",
            "The client reviews the itemized cost breakdown: labor cost, material cost, and approved change order amounts.",
            "The client sees the total amount and confirms all figures are in USD with no tax line."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientInvoiceView.defs.ts",
    "layoutId": "split_detail_page11"
  },
  "states": [
    {
      "stateKey": "ui.clientInvoiceView.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientInvoiceView.action.viewInvoice.status",
      "name": "viewInvoiceState",
      "kind": "actionStatus",
      "actionRef": "viewInvoice",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.clientInvoiceView.input.viewInvoice.invoiceId",
      "name": "viewInvoiceInvoiceId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "viewInvoice",
        "direction": "input",
        "field": "invoiceId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientInvoiceView.data.viewInvoice",
      "name": "viewInvoiceData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewInvoice",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.clientInvoiceView.layout.col_line_type",
      "name": "LayoutColLineType",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientInvoiceView.layout.col_description",
      "name": "LayoutColDescription",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientInvoiceView.layout.col_quantity",
      "name": "LayoutColQuantity",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientInvoiceView.layout.col_unit",
      "name": "LayoutColUnit",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientInvoiceView.layout.col_unit_cost",
      "name": "LayoutColUnitCost",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientInvoiceView.layout.col_line_amount",
      "name": "LayoutColLineAmount",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "viewInvoice",
      "kind": "query",
      "commandRef": "viewInvoice",
      "routeKey": "buildFlowFsm.viewInvoice.viewInvoice",
      "purpose": "Review invoice details",
      "methodName": "loadViewInvoice",
      "handlerName": "handleViewInvoiceClick",
      "inputStateKeys": [
        "ui.clientInvoiceView.input.viewInvoice.invoiceId"
      ],
      "routeParamInputStateKeys": [
        "ui.clientInvoiceView.input.viewInvoice.invoiceId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.clientInvoiceView.data.viewInvoice"
      ],
      "statusStateKey": "ui.clientInvoiceView.action.viewInvoice.status"
    },
    {
      "actionId": "set.viewInvoiceInvoiceId",
      "kind": "stateSetter",
      "stateKey": "ui.clientInvoiceView.input.viewInvoice.invoiceId",
      "methodName": "setViewInvoiceInvoiceId",
      "handlerName": "handleViewInvoiceInvoiceIdChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewInvoice",
      "stateKey": "ui.clientInvoiceView.data.viewInvoice"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "en",
    "activeLocales": [
      "en"
    ]
  },
  "i18n": {
    "section.invoiceReview": "Invoice Review",
    "organism.invoiceHeader.title": "Invoice Details",
    "organism.invoiceLineItems.title": "Cost Breakdown",
    "organism.invoiceSummary.title": "Invoice Summary",
    "field.invoiceId": "Invoice ID",
    "field.status": "Status",
    "field.issuedAt": "Issued Date",
    "field.clientEmail": "Client Email",
    "field.projectId": "Project",
    "field.notes": "Notes",
    "field.laborCost": "Labor Cost",
    "field.materialCost": "Material Cost",
    "field.changeOrderAmount": "Approved Change Orders",
    "field.totalAmount": "Total Amount",
    "field.currency": "Currency",
    "column.lineType": "Type",
    "column.description": "Description",
    "column.quantity": "Quantity",
    "column.unit": "Unit",
    "column.unitCost": "Unit Cost",
    "column.lineAmount": "Line Amount",
    "empty.invoiceHeader": "No invoice loaded. Please open the invoice through the shareable link you received.",
    "empty.invoiceLineItems": "No line items found for this invoice.",
    "empty.invoiceSummary": "Invoice summary is not available.",
    "hint.usdNoTax": "All figures are in USD. No tax is applied.",
    "status.draft": "Draft",
    "status.issued": "Issued",
    "status.voided": "Voided",
    "lineType.labor": "Labor",
    "lineType.material": "Material",
    "lineType.changeOrder": "Change Order",
    "unit.hour": "Hour",
    "unit.unit": "Unit",
    "unit.lumpSum": "Lump Sum",
    "org.invoice.header.title": "Load invoice by ID from the shareable link and display invoice header information including status, issue date, and recipient",
    "org.invoice.line.items.title": "Display the itemized cost breakdown as a master list of invoice line items: labor, material, and approved change order amounts",
    "org.invoice.summary.title": "Display the total amount and cost category subtotals, confirming all figures are in USD with no tax line"
  },
  "automation": {
    "statePrefix": "ui.clientInvoiceView",
    "stateKeys": [
      "ui.clientInvoiceView.status",
      "ui.clientInvoiceView.action.viewInvoice.status",
      "ui.clientInvoiceView.input.viewInvoice.invoiceId",
      "ui.clientInvoiceView.data.viewInvoice",
      "ui.clientInvoiceView.layout.col_line_type",
      "ui.clientInvoiceView.layout.col_description",
      "ui.clientInvoiceView.layout.col_quantity",
      "ui.clientInvoiceView.layout.col_unit",
      "ui.clientInvoiceView.layout.col_unit_cost",
      "ui.clientInvoiceView.layout.col_line_amount"
    ],
    "actionIds": [
      "viewInvoice",
      "set.viewInvoiceInvoiceId"
    ]
  }
};

export const pipeline = [
  {
    "id": "clientInvoiceView__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "clientInvoiceView__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
