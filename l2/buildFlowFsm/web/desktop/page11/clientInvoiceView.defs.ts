/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientInvoiceView.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientInvoiceView",
  "pageName": "Invoice Review",
  "baseClassName": "BuildFlowFsmClientInvoiceViewBase",
  "actor": "client",
  "purpose": "Executar Invoice Review.",
  "capabilities": [
    "viewInvoice"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
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
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_invoice_review",
      "type": "section",
      "sectionName": "Invoice Review",
      "titleKey": "section.invoiceReview",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org_invoice_header",
          "type": "organism",
          "organismName": "InvoiceHeader",
          "titleKey": "org.invoice.header.title",
          "purpose": "Load invoice by ID from the shareable link and display invoice header information including status, issue date, and recipient.",
          "userActions": [
            "viewInvoice"
          ],
          "requiredEntities": [
            "Invoice"
          ],
          "readsFields": [
            "invoiceId",
            "status",
            "issuedAt",
            "clientEmail",
            "notes",
            "projectId"
          ],
          "writesFields": [],
          "rulesApplied": [
            "invoiceIsInformational"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_load_invoice",
              "intent": "queryList",
              "stateKey": "ui.clientInvoiceView.data.viewInvoice",
              "action": "viewInvoice",
              "submitAction": "viewInvoice",
              "order": 10
            }
          ]
        },
        {
          "id": "org_invoice_line_items",
          "type": "organism",
          "organismName": "InvoiceLineItems",
          "titleKey": "org.invoice.line.items.title",
          "purpose": "Display the itemized cost breakdown as a master list of invoice line items: labor, material, and approved change order amounts.",
          "userActions": [
            "viewInvoice"
          ],
          "requiredEntities": [
            "InvoiceLine"
          ],
          "readsFields": [
            "invoiceLineId",
            "invoiceId",
            "lineType",
            "description",
            "quantity",
            "unit",
            "unitCost",
            "lineAmount"
          ],
          "writesFields": [],
          "rulesApplied": [
            "approvedChangeOrdersOnly",
            "invoiceCalculation"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent_line_items_list",
              "intent": "queryList",
              "stateKey": "ui.clientInvoiceView.data.viewInvoice",
              "action": "viewInvoice",
              "submitAction": "viewInvoice",
              "order": 10
            }
          ]
        },
        {
          "id": "org_invoice_summary",
          "type": "organism",
          "organismName": "InvoiceSummary",
          "titleKey": "org.invoice.summary.title",
          "purpose": "Display the total amount and cost category subtotals, confirming all figures are in USD with no tax line.",
          "userActions": [
            "viewInvoice"
          ],
          "requiredEntities": [
            "Invoice"
          ],
          "readsFields": [
            "laborCost",
            "materialCost",
            "changeOrderAmount",
            "totalAmount",
            "currency"
          ],
          "writesFields": [],
          "rulesApplied": [
            "invoiceCalculation",
            "allFiguresUsdNoTax"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent_invoice_summary",
              "intent": "summary",
              "stateKey": "ui.clientInvoiceView.data.viewInvoice",
              "action": "viewInvoice",
              "submitAction": "viewInvoice",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "split_detail_page11",
    "type": "page",
    "sections": [
      {
        "id": "sec_invoice_review",
        "type": "section",
        "sectionName": "Invoice Review",
        "titleKey": "section.invoiceReview",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org_invoice_header",
            "type": "organism",
            "organismName": "InvoiceHeader",
            "titleKey": "org.invoice.header.title",
            "purpose": "Load invoice by ID from the shareable link and display invoice header information including status, issue date, and recipient.",
            "userActions": [
              "viewInvoice"
            ],
            "requiredEntities": [
              "Invoice"
            ],
            "readsFields": [
              "invoiceId",
              "status",
              "issuedAt",
              "clientEmail",
              "notes",
              "projectId"
            ],
            "writesFields": [],
            "rulesApplied": [
              "invoiceIsInformational"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_load_invoice",
                "intent": "queryList",
                "order": 10,
                "titleKey": "organism.invoiceHeader.title",
                "source": "buildFlowFsm.viewInvoice.viewInvoice",
                "binding": "viewInvoice",
                "action": "viewInvoice",
                "submitAction": "viewInvoice",
                "emptyKey": "empty.invoiceHeader",
                "displayHint": "detailPanel",
                "stateKey": "ui.clientInvoiceView.data.viewInvoice",
                "fields": [
                  {
                    "id": "fld_invoice_id",
                    "field": "invoiceId",
                    "labelKey": "field.invoiceId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "routeParam",
                    "stateKey": "ui.clientInvoiceView.input.viewInvoice.invoiceId"
                  },
                  {
                    "id": "fld_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 20,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_issued_at",
                    "field": "issuedAt",
                    "labelKey": "field.issuedAt",
                    "order": 30,
                    "required": false,
                    "inputType": "readonly",
                    "format": "date",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_client_email",
                    "field": "clientEmail",
                    "labelKey": "field.clientEmail",
                    "order": 40,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_project_id",
                    "field": "projectId",
                    "labelKey": "field.projectId",
                    "order": 50,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_notes",
                    "field": "notes",
                    "labelKey": "field.notes",
                    "order": 60,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org_invoice_line_items",
            "type": "organism",
            "organismName": "InvoiceLineItems",
            "titleKey": "org.invoice.line.items.title",
            "purpose": "Display the itemized cost breakdown as a master list of invoice line items: labor, material, and approved change order amounts.",
            "userActions": [
              "viewInvoice"
            ],
            "requiredEntities": [
              "InvoiceLine"
            ],
            "readsFields": [
              "invoiceLineId",
              "invoiceId",
              "lineType",
              "description",
              "quantity",
              "unit",
              "unitCost",
              "lineAmount"
            ],
            "writesFields": [],
            "rulesApplied": [
              "approvedChangeOrdersOnly",
              "invoiceCalculation"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent_line_items_list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "organism.invoiceLineItems.title",
                "source": "buildFlowFsm.viewInvoice.viewInvoice",
                "binding": "viewInvoice",
                "action": "viewInvoice",
                "submitAction": "viewInvoice",
                "emptyKey": "empty.invoiceLineItems",
                "displayHint": "masterList",
                "stateKey": "ui.clientInvoiceView.data.viewInvoice",
                "fields": [],
                "columns": [
                  {
                    "id": "col_line_type",
                    "field": "lineType",
                    "labelKey": "column.lineType",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.layout.col_line_type"
                  },
                  {
                    "id": "col_description",
                    "field": "description",
                    "labelKey": "column.description",
                    "order": 20,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.layout.col_description"
                  },
                  {
                    "id": "col_quantity",
                    "field": "quantity",
                    "labelKey": "column.quantity",
                    "order": 30,
                    "required": true,
                    "inputType": "number",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.layout.col_quantity"
                  },
                  {
                    "id": "col_unit",
                    "field": "unit",
                    "labelKey": "column.unit",
                    "order": 40,
                    "required": true,
                    "inputType": "text",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.layout.col_unit"
                  },
                  {
                    "id": "col_unit_cost",
                    "field": "unitCost",
                    "labelKey": "column.unitCost",
                    "order": 50,
                    "required": true,
                    "inputType": "money",
                    "format": "currency",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.layout.col_unit_cost"
                  },
                  {
                    "id": "col_line_amount",
                    "field": "lineAmount",
                    "labelKey": "column.lineAmount",
                    "order": 60,
                    "required": true,
                    "inputType": "money",
                    "format": "currency",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.layout.col_line_amount"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org_invoice_summary",
            "type": "organism",
            "organismName": "InvoiceSummary",
            "titleKey": "org.invoice.summary.title",
            "purpose": "Display the total amount and cost category subtotals, confirming all figures are in USD with no tax line.",
            "userActions": [
              "viewInvoice"
            ],
            "requiredEntities": [
              "Invoice"
            ],
            "readsFields": [
              "laborCost",
              "materialCost",
              "changeOrderAmount",
              "totalAmount",
              "currency"
            ],
            "writesFields": [],
            "rulesApplied": [
              "invoiceCalculation",
              "allFiguresUsdNoTax"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent_invoice_summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "organism.invoiceSummary.title",
                "source": "buildFlowFsm.viewInvoice.viewInvoice",
                "binding": "viewInvoice",
                "action": "viewInvoice",
                "submitAction": "viewInvoice",
                "emptyKey": "empty.invoiceSummary",
                "displayHint": "summaryPanel",
                "stateKey": "ui.clientInvoiceView.data.viewInvoice",
                "fields": [
                  {
                    "id": "fld_labor_cost",
                    "field": "laborCost",
                    "labelKey": "field.laborCost",
                    "order": 10,
                    "required": false,
                    "inputType": "readonly",
                    "format": "currency",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_material_cost",
                    "field": "materialCost",
                    "labelKey": "field.materialCost",
                    "order": 20,
                    "required": false,
                    "inputType": "readonly",
                    "format": "currency",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_change_order_amount",
                    "field": "changeOrderAmount",
                    "labelKey": "field.changeOrderAmount",
                    "order": 30,
                    "required": false,
                    "inputType": "readonly",
                    "format": "currency",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_total_amount",
                    "field": "totalAmount",
                    "labelKey": "field.totalAmount",
                    "order": 40,
                    "required": false,
                    "inputType": "readonly",
                    "format": "currency",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  },
                  {
                    "id": "fld_currency",
                    "field": "currency",
                    "labelKey": "field.currency",
                    "order": 50,
                    "required": false,
                    "inputType": "readonly",
                    "source": "ui.clientInvoiceView.data.viewInvoice",
                    "stateKey": "ui.clientInvoiceView.data.viewInvoice"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "binding_viewInvoice",
      "source": "buildFlowFsm.viewInvoice.viewInvoice",
      "entity": "Invoice",
      "command": "viewInvoice",
      "description": "Loads the invoice and its line items by invoice ID from the shareable link URL.",
      "stateKey": "ui.clientInvoiceView.data.viewInvoice",
      "inputStateKeys": [
        "ui.clientInvoiceView.input.viewInvoice.invoiceId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "clientInvoiceView__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientInvoiceView.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientInvoiceView.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "clientInvoiceView__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "Dashboard-first, data-dense, status-driven UI with timeline views, cost tracking panels, and mobile-friendly field logging"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
