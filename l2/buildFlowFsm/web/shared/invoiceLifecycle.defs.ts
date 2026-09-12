/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "invoiceLifecycle",
  "pageName": "Invoice Generation",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmInvoiceLifecycleBase",
  "routePattern": "/buildFlowFsm/invoiceLifecycle",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:invoiceLifecycle",
    "operation:generateInvoice",
    "operation:issueInvoice"
  ],
  "operationIds": [
    "generateInvoice",
    "issueInvoice"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "invoiceLifecycle",
    "workspaceKind": "workflow",
    "workflowId": "invoiceLifecycle",
    "actor": "companyAdmin",
    "entity": "Invoice",
    "owners": [
      {
        "kind": "workflow",
        "id": "invoiceLifecycle",
        "defPath": "_102048_/l4/workflows/invoiceLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "generateInvoice",
        "defPath": "_102048_/l4/operations/generateInvoice.defs.ts"
      },
      {
        "kind": "operation",
        "id": "issueInvoice",
        "defPath": "_102048_/l4/operations/issueInvoice.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "Select the project to bill and open the billing summary showing accumulated time logs, material usage, and approved change orders.",
        "Review the consolidated cost breakdown — labor hours and rates, material costs, and approved change order amounts — to confirm everything is accurate.",
        "Generate the invoice from the confirmed costs, with the total calculated as labor cost plus material cost plus approved change order amounts in USD.",
        "Issue the invoice to the client via a shareable link or email so the client can review the charges and arrange payment."
      ],
      "operations": [
        {
          "operationId": "generateInvoice",
          "commandName": "generateInvoice",
          "steps": [
            "Select a project that has accumulated time logs, material usage, and approved change orders",
            "Review the billing summary showing labor costs, material costs, and approved change order amounts",
            "Generate the invoice with calculated totals in USD and send it to the client via a shareable link or email"
          ]
        },
        {
          "operationId": "issueInvoice",
          "commandName": "issueInvoice",
          "steps": [
            "The admin selects a draft invoice that has been reviewed for accuracy.",
            "The admin optionally provides a client email address for delivery.",
            "The system generates a shareable link, sets the invoice status to issued, records the issuedAt timestamp, and delivers the invoice to the client.",
            "The invoice serves as an informational billing summary — no payment processing is initiated."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/invoiceLifecycle.defs.ts",
    "layoutId": "wizard_flow_page11"
  },
  "states": [
    {
      "stateKey": "ui.invoiceLifecycle.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.invoiceLifecycle.action.generateInvoice.status",
      "name": "generateInvoiceState",
      "kind": "actionStatus",
      "actionRef": "generateInvoice",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.invoiceLifecycle.input.generateInvoice.projectId",
      "name": "generateInvoiceProjectId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "generateInvoice",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.invoiceLifecycle.input.generateInvoice.clientEmail",
      "name": "generateInvoiceClientEmail",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "generateInvoice",
        "direction": "input",
        "field": "clientEmail"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.invoiceLifecycle.input.generateInvoice.notes",
      "name": "generateInvoiceNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "generateInvoice",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.invoiceLifecycle.action.issueInvoice.status",
      "name": "issueInvoiceState",
      "kind": "actionStatus",
      "actionRef": "issueInvoice",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.invoiceLifecycle.input.issueInvoice.invoiceId",
      "name": "issueInvoiceInvoiceId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "issueInvoice",
        "direction": "input",
        "field": "invoiceId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.invoiceLifecycle.input.issueInvoice.clientEmail",
      "name": "issueInvoiceClientEmail",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "issueInvoice",
        "direction": "input",
        "field": "clientEmail"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.invoiceLifecycle.output.generateInvoice",
      "name": "OutputGenerateInvoice",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.invoiceLifecycle.output.issueInvoice",
      "name": "OutputIssueInvoice",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.invoiceLifecycle.layout.fld_wf_status",
      "name": "LayoutFldWfStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.invoiceLifecycle.layout.fld_wf_total",
      "name": "LayoutFldWfTotal",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "generateInvoice",
      "kind": "command",
      "commandRef": "generateInvoice",
      "routeKey": "buildFlowFsm.invoiceLifecycle.generateInvoice",
      "purpose": "Generate invoice from job costs",
      "methodName": "generateInvoice",
      "handlerName": "handleGenerateInvoiceClick",
      "inputStateKeys": [
        "ui.invoiceLifecycle.input.generateInvoice.projectId",
        "ui.invoiceLifecycle.input.generateInvoice.clientEmail",
        "ui.invoiceLifecycle.input.generateInvoice.notes"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.invoiceLifecycle.input.generateInvoice.projectId"
      ],
      "outputStateKeys": [
        "ui.invoiceLifecycle.output.generateInvoice"
      ],
      "statusStateKey": "ui.invoiceLifecycle.action.generateInvoice.status"
    },
    {
      "actionId": "issueInvoice",
      "kind": "command",
      "commandRef": "issueInvoice",
      "routeKey": "buildFlowFsm.invoiceLifecycle.issueInvoice",
      "purpose": "Issue and send invoice to client",
      "methodName": "issueInvoice",
      "handlerName": "handleIssueInvoiceClick",
      "inputStateKeys": [
        "ui.invoiceLifecycle.input.issueInvoice.invoiceId",
        "ui.invoiceLifecycle.input.issueInvoice.clientEmail"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.invoiceLifecycle.input.issueInvoice.invoiceId"
      ],
      "outputStateKeys": [
        "ui.invoiceLifecycle.output.issueInvoice"
      ],
      "statusStateKey": "ui.invoiceLifecycle.action.issueInvoice.status"
    },
    {
      "actionId": "set.generateInvoiceProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.invoiceLifecycle.input.generateInvoice.projectId",
      "methodName": "setGenerateInvoiceProjectId",
      "handlerName": "handleGenerateInvoiceProjectIdChange"
    },
    {
      "actionId": "set.generateInvoiceClientEmail",
      "kind": "stateSetter",
      "stateKey": "ui.invoiceLifecycle.input.generateInvoice.clientEmail",
      "methodName": "setGenerateInvoiceClientEmail",
      "handlerName": "handleGenerateInvoiceClientEmailChange"
    },
    {
      "actionId": "set.generateInvoiceNotes",
      "kind": "stateSetter",
      "stateKey": "ui.invoiceLifecycle.input.generateInvoice.notes",
      "methodName": "setGenerateInvoiceNotes",
      "handlerName": "handleGenerateInvoiceNotesChange"
    },
    {
      "actionId": "set.issueInvoiceInvoiceId",
      "kind": "stateSetter",
      "stateKey": "ui.invoiceLifecycle.input.issueInvoice.invoiceId",
      "methodName": "setIssueInvoiceInvoiceId",
      "handlerName": "handleIssueInvoiceInvoiceIdChange"
    },
    {
      "actionId": "set.issueInvoiceClientEmail",
      "kind": "stateSetter",
      "stateKey": "ui.invoiceLifecycle.input.issueInvoice.clientEmail",
      "methodName": "setIssueInvoiceClientEmail",
      "handlerName": "handleIssueInvoiceClientEmailChange"
    }
  ],
  "initialLoads": [],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "en",
    "activeLocales": [
      "en"
    ]
  },
  "i18n": {
    "section.projectSelection.title": "Select Project to Bill",
    "section.billingSummary.title": "Billing Summary",
    "section.generateInvoice.title": "Generate Invoice",
    "section.issueInvoice.title": "Issue Invoice",
    "section.invoiceResult.title": "Invoice Result",
    "intent.projectList.title": "Projects",
    "intent.projectList.empty": "No projects available to bill",
    "intent.costBreakdown.title": "Cost Breakdown",
    "intent.costBreakdown.empty": "Select a project to view the cost breakdown",
    "intent.generateForm.title": "Generate Invoice from Job Costs",
    "intent.issueForm.title": "Issue and Send Invoice",
    "intent.workflowStatus.title": "Invoice Status",
    "intent.invoiceSummary.title": "Invoice Details",
    "intent.invoiceSummary.empty": "No invoice has been generated yet",
    "col.projectName": "Project Name",
    "col.projectStatus": "Status",
    "col.projectBudget": "Budget",
    "col.projectClient": "Client",
    "filter.projectStatus": "Filter by Status",
    "field.projectId": "Project",
    "field.clientEmail": "Client Email",
    "field.notes": "Notes",
    "field.invoiceId": "Invoice ID",
    "field.invoiceStatus": "Status",
    "field.laborCost": "Labor Cost",
    "field.materialCost": "Material Cost",
    "field.changeOrderAmount": "Change Order Amount",
    "field.totalAmount": "Total Amount",
    "field.currency": "Currency",
    "field.shareLink": "Share Link",
    "field.issuedAt": "Issued At",
    "action.generateInvoice": "Generate Invoice",
    "action.issueInvoice": "Issue Invoice",
    "org.project.selector.title": "Select the project to bill and view accumulated costs",
    "org.billing.summary.title": "Review consolidated cost breakdown before generating invoice",
    "org.generate.invoice.title": "Generate invoice from confirmed job costs",
    "org.issue.invoice.title": "Issue and send invoice to client via shareable link or email",
    "org.invoice.result.title": "Review the issued invoice details, share link and delivery status"
  },
  "automation": {
    "statePrefix": "ui.invoiceLifecycle",
    "stateKeys": [
      "ui.invoiceLifecycle.status",
      "ui.invoiceLifecycle.action.generateInvoice.status",
      "ui.invoiceLifecycle.input.generateInvoice.projectId",
      "ui.invoiceLifecycle.input.generateInvoice.clientEmail",
      "ui.invoiceLifecycle.input.generateInvoice.notes",
      "ui.invoiceLifecycle.action.issueInvoice.status",
      "ui.invoiceLifecycle.input.issueInvoice.invoiceId",
      "ui.invoiceLifecycle.input.issueInvoice.clientEmail",
      "ui.invoiceLifecycle.output.generateInvoice",
      "ui.invoiceLifecycle.output.issueInvoice",
      "ui.invoiceLifecycle.layout.fld_wf_status",
      "ui.invoiceLifecycle.layout.fld_wf_total"
    ],
    "actionIds": [
      "generateInvoice",
      "issueInvoice",
      "set.generateInvoiceProjectId",
      "set.generateInvoiceClientEmail",
      "set.generateInvoiceNotes",
      "set.issueInvoiceInvoiceId",
      "set.issueInvoiceClientEmail"
    ]
  }
};

export const pipeline = [
  {
    "id": "invoiceLifecycle__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "invoiceLifecycle__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
