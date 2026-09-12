/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/invoiceLifecycle.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "invoiceLifecycle",
  "pageName": "Invoice Generation",
  "baseClassName": "BuildFlowFsmInvoiceLifecycleBase",
  "actor": "companyAdmin",
  "purpose": "Executar Invoice Generation.",
  "capabilities": [
    "invoiceLifecycle"
  ],
  "flowRefs": {
    "experienceFlows": [
      "invoiceLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "invoiceLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
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
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_project_selection",
      "type": "section",
      "sectionName": "Project Selection",
      "titleKey": "section.projectSelection.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org_project_selector",
          "type": "organism",
          "organismName": "ProjectSelector",
          "titleKey": "org.project.selector.title",
          "purpose": "Select the project to bill and view accumulated costs",
          "userActions": [],
          "requiredEntities": [
            "Project",
            "Client"
          ],
          "readsFields": [
            "projectId",
            "name",
            "status",
            "budget",
            "clientId"
          ],
          "writesFields": [
            "projectId"
          ],
          "rulesApplied": [],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_project_list",
              "intent": "queryList",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec_billing_summary",
      "type": "section",
      "sectionName": "Billing Summary",
      "titleKey": "section.billingSummary.title",
      "mode": "view",
      "order": 20,
      "organisms": [
        {
          "id": "org_billing_summary",
          "type": "organism",
          "organismName": "BillingSummary",
          "titleKey": "org.billing.summary.title",
          "purpose": "Review consolidated cost breakdown before generating invoice",
          "userActions": [],
          "requiredEntities": [
            "TimeLog",
            "MaterialUsage",
            "ChangeOrder",
            "Project"
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
            "allFiguresUsdNoTax",
            "approvedChangeOrdersOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_cost_breakdown",
              "intent": "summary",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec_generate_invoice",
      "type": "section",
      "sectionName": "Generate Invoice",
      "titleKey": "section.generateInvoice.title",
      "mode": "edit",
      "order": 30,
      "organisms": [
        {
          "id": "org_generate_invoice",
          "type": "organism",
          "organismName": "GenerateInvoice",
          "titleKey": "org.generate.invoice.title",
          "purpose": "Generate invoice from confirmed job costs",
          "userActions": [
            "generateInvoice"
          ],
          "requiredEntities": [
            "Invoice",
            "Project",
            "TimeLog",
            "MaterialUsage",
            "ChangeOrder",
            "Client"
          ],
          "readsFields": [
            "projectId"
          ],
          "writesFields": [
            "invoiceId",
            "status",
            "laborCost",
            "materialCost",
            "changeOrderAmount",
            "totalAmount",
            "currency",
            "shareLink",
            "clientEmail"
          ],
          "rulesApplied": [
            "invoiceCalculation",
            "allFiguresUsdNoTax",
            "approvedChangeOrdersOnly",
            "invoiceIsInformational"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_generate_form",
              "intent": "commandForm",
              "stateKey": "ui.invoiceLifecycle.action.generateInvoice.status",
              "action": "generateInvoice",
              "submitAction": "generateInvoice",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec_issue_invoice",
      "type": "section",
      "sectionName": "Issue Invoice",
      "titleKey": "section.issueInvoice.title",
      "mode": "edit",
      "order": 40,
      "organisms": [
        {
          "id": "org_issue_invoice",
          "type": "organism",
          "organismName": "IssueInvoice",
          "titleKey": "org.issue.invoice.title",
          "purpose": "Issue and send invoice to client via shareable link or email",
          "userActions": [
            "issueInvoice"
          ],
          "requiredEntities": [
            "Invoice",
            "Client"
          ],
          "readsFields": [
            "invoiceId",
            "status",
            "totalAmount",
            "shareLink"
          ],
          "writesFields": [
            "status",
            "issuedAt",
            "shareLink",
            "clientEmail"
          ],
          "rulesApplied": [
            "invoiceCalculation",
            "allFiguresUsdNoTax",
            "approvedChangeOrdersOnly",
            "invoiceIsInformational"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_workflow_status",
              "intent": "workflowStatus",
              "stateKey": "ui.invoiceLifecycle.status",
              "order": 10
            },
            {
              "id": "intent_issue_form",
              "intent": "commandForm",
              "stateKey": "ui.invoiceLifecycle.action.issueInvoice.status",
              "action": "issueInvoice",
              "submitAction": "issueInvoice",
              "order": 20
            }
          ]
        }
      ]
    },
    {
      "id": "sec_invoice_result",
      "type": "section",
      "sectionName": "Invoice Result",
      "titleKey": "section.invoiceResult.title",
      "mode": "view",
      "order": 50,
      "organisms": [
        {
          "id": "org_invoice_result",
          "type": "organism",
          "organismName": "InvoiceResult",
          "titleKey": "org.invoice.result.title",
          "purpose": "Review the issued invoice details, share link and delivery status",
          "userActions": [],
          "requiredEntities": [
            "Invoice",
            "Client"
          ],
          "readsFields": [
            "invoiceId",
            "status",
            "totalAmount",
            "shareLink",
            "clientEmail",
            "issuedAt",
            "laborCost",
            "materialCost",
            "changeOrderAmount",
            "currency"
          ],
          "writesFields": [],
          "rulesApplied": [
            "invoiceIsInformational"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_invoice_summary",
              "intent": "summary",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "wizard_flow_page11",
    "type": "page",
    "sections": [
      {
        "id": "sec_project_selection",
        "type": "section",
        "sectionName": "Project Selection",
        "titleKey": "section.projectSelection.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org_project_selector",
            "type": "organism",
            "organismName": "ProjectSelector",
            "titleKey": "org.project.selector.title",
            "purpose": "Select the project to bill and view accumulated costs",
            "userActions": [],
            "requiredEntities": [
              "Project",
              "Client"
            ],
            "readsFields": [
              "projectId",
              "name",
              "status",
              "budget",
              "clientId"
            ],
            "writesFields": [
              "projectId"
            ],
            "rulesApplied": [],
            "order": 10,
            "intentions": [
              {
                "id": "intent_project_list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.projectList.title",
                "emptyKey": "intent.projectList.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "col_proj_name",
                    "field": "name",
                    "labelKey": "col.projectName",
                    "order": 10,
                    "required": false
                  },
                  {
                    "id": "col_proj_status",
                    "field": "status",
                    "labelKey": "col.projectStatus",
                    "order": 20,
                    "required": false
                  },
                  {
                    "id": "col_proj_budget",
                    "field": "budget",
                    "labelKey": "col.projectBudget",
                    "order": 30,
                    "required": false,
                    "format": "money"
                  },
                  {
                    "id": "col_proj_client",
                    "field": "clientId",
                    "labelKey": "col.projectClient",
                    "order": 40,
                    "required": false
                  }
                ],
                "filters": [
                  {
                    "id": "flt_proj_status",
                    "field": "status",
                    "labelKey": "filter.projectStatus",
                    "order": 10,
                    "required": false,
                    "inputType": "select"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      },
      {
        "id": "sec_billing_summary",
        "type": "section",
        "sectionName": "Billing Summary",
        "titleKey": "section.billingSummary.title",
        "mode": "view",
        "order": 20,
        "organisms": [
          {
            "id": "org_billing_summary",
            "type": "organism",
            "organismName": "BillingSummary",
            "titleKey": "org.billing.summary.title",
            "purpose": "Review consolidated cost breakdown before generating invoice",
            "userActions": [],
            "requiredEntities": [
              "TimeLog",
              "MaterialUsage",
              "ChangeOrder",
              "Project"
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
              "allFiguresUsdNoTax",
              "approvedChangeOrdersOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_cost_breakdown",
                "intent": "summary",
                "order": 10,
                "titleKey": "intent.costBreakdown.title",
                "emptyKey": "intent.costBreakdown.empty",
                "fields": [
                  {
                    "id": "fld_labor_cost",
                    "field": "laborCost",
                    "labelKey": "field.laborCost",
                    "order": 10,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_material_cost",
                    "field": "materialCost",
                    "labelKey": "field.materialCost",
                    "order": 20,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_change_order_amount",
                    "field": "changeOrderAmount",
                    "labelKey": "field.changeOrderAmount",
                    "order": 30,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_total_amount",
                    "field": "totalAmount",
                    "labelKey": "field.totalAmount",
                    "order": 40,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_currency",
                    "field": "currency",
                    "labelKey": "field.currency",
                    "order": 50,
                    "required": false,
                    "inputType": "display"
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
      },
      {
        "id": "sec_generate_invoice",
        "type": "section",
        "sectionName": "Generate Invoice",
        "titleKey": "section.generateInvoice.title",
        "mode": "edit",
        "order": 30,
        "organisms": [
          {
            "id": "org_generate_invoice",
            "type": "organism",
            "organismName": "GenerateInvoice",
            "titleKey": "org.generate.invoice.title",
            "purpose": "Generate invoice from confirmed job costs",
            "userActions": [
              "generateInvoice"
            ],
            "requiredEntities": [
              "Invoice",
              "Project",
              "TimeLog",
              "MaterialUsage",
              "ChangeOrder",
              "Client"
            ],
            "readsFields": [
              "projectId"
            ],
            "writesFields": [
              "invoiceId",
              "status",
              "laborCost",
              "materialCost",
              "changeOrderAmount",
              "totalAmount",
              "currency",
              "shareLink",
              "clientEmail"
            ],
            "rulesApplied": [
              "invoiceCalculation",
              "allFiguresUsdNoTax",
              "approvedChangeOrdersOnly",
              "invoiceIsInformational"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_generate_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.generateForm.title",
                "action": "generateInvoice",
                "submitAction": "generateInvoice",
                "stateKey": "ui.invoiceLifecycle.action.generateInvoice.status",
                "fields": [
                  {
                    "id": "fld_gen_projectId",
                    "field": "projectId",
                    "labelKey": "field.projectId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.invoiceLifecycle.input.generateInvoice.projectId"
                  },
                  {
                    "id": "fld_gen_clientEmail",
                    "field": "clientEmail",
                    "labelKey": "field.clientEmail",
                    "order": 20,
                    "required": false,
                    "inputType": "email",
                    "source": "userInput",
                    "stateKey": "ui.invoiceLifecycle.input.generateInvoice.clientEmail"
                  },
                  {
                    "id": "fld_gen_notes",
                    "field": "notes",
                    "labelKey": "field.notes",
                    "order": 30,
                    "required": false,
                    "inputType": "textarea",
                    "source": "userInput",
                    "stateKey": "ui.invoiceLifecycle.input.generateInvoice.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_generate",
                    "action": "generateInvoice",
                    "labelKey": "action.generateInvoice",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "generateInvoice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec_issue_invoice",
        "type": "section",
        "sectionName": "Issue Invoice",
        "titleKey": "section.issueInvoice.title",
        "mode": "edit",
        "order": 40,
        "organisms": [
          {
            "id": "org_issue_invoice",
            "type": "organism",
            "organismName": "IssueInvoice",
            "titleKey": "org.issue.invoice.title",
            "purpose": "Issue and send invoice to client via shareable link or email",
            "userActions": [
              "issueInvoice"
            ],
            "requiredEntities": [
              "Invoice",
              "Client"
            ],
            "readsFields": [
              "invoiceId",
              "status",
              "totalAmount",
              "shareLink"
            ],
            "writesFields": [
              "status",
              "issuedAt",
              "shareLink",
              "clientEmail"
            ],
            "rulesApplied": [
              "invoiceCalculation",
              "allFiguresUsdNoTax",
              "approvedChangeOrdersOnly",
              "invoiceIsInformational"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_workflow_status",
                "intent": "workflowStatus",
                "order": 10,
                "titleKey": "intent.workflowStatus.title",
                "stateKey": "ui.invoiceLifecycle.status",
                "fields": [
                  {
                    "id": "fld_wf_status",
                    "field": "status",
                    "labelKey": "field.invoiceStatus",
                    "order": 10,
                    "required": false,
                    "inputType": "display",
                    "stateKey": "ui.invoiceLifecycle.layout.fld_wf_status"
                  },
                  {
                    "id": "fld_wf_invoiceId",
                    "field": "invoiceId",
                    "labelKey": "field.invoiceId",
                    "order": 20,
                    "required": false,
                    "inputType": "display",
                    "stateKey": "ui.invoiceLifecycle.input.issueInvoice.invoiceId"
                  },
                  {
                    "id": "fld_wf_total",
                    "field": "totalAmount",
                    "labelKey": "field.totalAmount",
                    "order": 30,
                    "required": false,
                    "inputType": "display",
                    "format": "money",
                    "stateKey": "ui.invoiceLifecycle.layout.fld_wf_total"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "intent_issue_form",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "intent.issueForm.title",
                "action": "issueInvoice",
                "submitAction": "issueInvoice",
                "stateKey": "ui.invoiceLifecycle.action.issueInvoice.status",
                "fields": [
                  {
                    "id": "fld_iss_invoiceId",
                    "field": "invoiceId",
                    "labelKey": "field.invoiceId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.invoiceLifecycle.input.issueInvoice.invoiceId"
                  },
                  {
                    "id": "fld_iss_clientEmail",
                    "field": "clientEmail",
                    "labelKey": "field.clientEmail",
                    "order": 20,
                    "required": false,
                    "inputType": "email",
                    "source": "userInput",
                    "stateKey": "ui.invoiceLifecycle.input.issueInvoice.clientEmail"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_issue",
                    "action": "issueInvoice",
                    "labelKey": "action.issueInvoice",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "issueInvoice"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec_invoice_result",
        "type": "section",
        "sectionName": "Invoice Result",
        "titleKey": "section.invoiceResult.title",
        "mode": "view",
        "order": 50,
        "organisms": [
          {
            "id": "org_invoice_result",
            "type": "organism",
            "organismName": "InvoiceResult",
            "titleKey": "org.invoice.result.title",
            "purpose": "Review the issued invoice details, share link and delivery status",
            "userActions": [],
            "requiredEntities": [
              "Invoice",
              "Client"
            ],
            "readsFields": [
              "invoiceId",
              "status",
              "totalAmount",
              "shareLink",
              "clientEmail",
              "issuedAt",
              "laborCost",
              "materialCost",
              "changeOrderAmount",
              "currency"
            ],
            "writesFields": [],
            "rulesApplied": [
              "invoiceIsInformational"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_invoice_summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "intent.invoiceSummary.title",
                "emptyKey": "intent.invoiceSummary.empty",
                "fields": [
                  {
                    "id": "fld_res_invoiceId",
                    "field": "invoiceId",
                    "labelKey": "field.invoiceId",
                    "order": 10,
                    "required": false,
                    "inputType": "display"
                  },
                  {
                    "id": "fld_res_status",
                    "field": "status",
                    "labelKey": "field.invoiceStatus",
                    "order": 20,
                    "required": false,
                    "inputType": "display"
                  },
                  {
                    "id": "fld_res_laborCost",
                    "field": "laborCost",
                    "labelKey": "field.laborCost",
                    "order": 30,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_res_materialCost",
                    "field": "materialCost",
                    "labelKey": "field.materialCost",
                    "order": 40,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_res_changeOrderAmount",
                    "field": "changeOrderAmount",
                    "labelKey": "field.changeOrderAmount",
                    "order": 50,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_res_totalAmount",
                    "field": "totalAmount",
                    "labelKey": "field.totalAmount",
                    "order": 60,
                    "required": false,
                    "inputType": "display",
                    "format": "money"
                  },
                  {
                    "id": "fld_res_currency",
                    "field": "currency",
                    "labelKey": "field.currency",
                    "order": 70,
                    "required": false,
                    "inputType": "display"
                  },
                  {
                    "id": "fld_res_shareLink",
                    "field": "shareLink",
                    "labelKey": "field.shareLink",
                    "order": 80,
                    "required": false,
                    "inputType": "display"
                  },
                  {
                    "id": "fld_res_clientEmail",
                    "field": "clientEmail",
                    "labelKey": "field.clientEmail",
                    "order": 90,
                    "required": false,
                    "inputType": "display"
                  },
                  {
                    "id": "fld_res_issuedAt",
                    "field": "issuedAt",
                    "labelKey": "field.issuedAt",
                    "order": 100,
                    "required": false,
                    "inputType": "display",
                    "format": "datetime"
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
      "id": "bind_generateInvoice",
      "source": "buildFlowFsm.invoiceLifecycle.generateInvoice",
      "entity": "Invoice",
      "command": "generateInvoice",
      "description": "Generate invoice from accumulated job costs",
      "stateKey": "ui.invoiceLifecycle.output.generateInvoice",
      "inputStateKeys": [
        "ui.invoiceLifecycle.input.generateInvoice.projectId",
        "ui.invoiceLifecycle.input.generateInvoice.clientEmail",
        "ui.invoiceLifecycle.input.generateInvoice.notes"
      ]
    },
    {
      "id": "bind_issueInvoice",
      "source": "buildFlowFsm.invoiceLifecycle.issueInvoice",
      "entity": "Invoice",
      "command": "issueInvoice",
      "description": "Issue and send invoice to client",
      "stateKey": "ui.invoiceLifecycle.output.issueInvoice",
      "inputStateKeys": [
        "ui.invoiceLifecycle.input.issueInvoice.invoiceId",
        "ui.invoiceLifecycle.input.issueInvoice.clientEmail"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "invoiceLifecycle__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/invoiceLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/invoiceLifecycle.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "invoiceLifecycle__l2_shared"
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
