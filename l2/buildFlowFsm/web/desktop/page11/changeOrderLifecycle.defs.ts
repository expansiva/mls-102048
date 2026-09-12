/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/changeOrderLifecycle.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "changeOrderLifecycle",
  "pageName": "Change Order Management",
  "baseClassName": "BuildFlowFsmChangeOrderLifecycleBase",
  "actor": "projectManager",
  "purpose": "Executar Change Order Management.",
  "capabilities": [
    "changeOrderLifecycle"
  ],
  "flowRefs": {
    "experienceFlows": [
      "changeOrderLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "changeOrderLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "changeOrderLifecycle",
    "workspaceKind": "workflow",
    "workflowId": "changeOrderLifecycle",
    "actor": "projectManager",
    "entity": "ChangeOrder",
    "owners": [
      {
        "kind": "workflow",
        "id": "changeOrderLifecycle",
        "defPath": "_102048_/l4/workflows/changeOrderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createChangeOrder",
        "defPath": "_102048_/l4/operations/createChangeOrder.defs.ts"
      },
      {
        "kind": "operation",
        "id": "sendChangeOrder",
        "defPath": "_102048_/l4/operations/sendChangeOrder.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "The project manager creates a change order on the project to document a scope change, including a description of the change.",
        "The project manager enters the cost amount associated with the change so the client understands the financial impact.",
        "The project manager sends the change order to the client for in-app approval, creating a record of the request.",
        "The client reviews the scope description and cost impact, then approves or rejects the change order in-app.",
        "The project manager is notified of the decision, and only an approved change order is included in job costing and invoicing."
      ],
      "operations": [
        {
          "operationId": "createChangeOrder",
          "commandName": "createChangeOrder",
          "steps": [
            "The project manager opens the change order creation form from a project detail page.",
            "They enter a title, a detailed scope description, and the cost amount for the change.",
            "The system validates the project association and creates the change order in draft status.",
            "The change order is saved and ready to be sent to the client for in-app approval."
          ]
        },
        {
          "operationId": "sendChangeOrder",
          "commandName": "sendChangeOrder",
          "steps": [
            "The project manager selects a draft change order from the project's change order list.",
            "The system verifies the change order is in draft status and is linked to a project.",
            "The system transitions the change order status to sent and records the sentAt timestamp.",
            "The client receives a notification with a shareable link or email to review and approve or reject the change order."
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_changeOrderManagement",
      "type": "section",
      "sectionName": "sec_changeOrderManagement",
      "titleKey": "sec.changeOrderManagement.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org_createChangeOrder",
          "type": "organism",
          "organismName": "CreateChangeOrder",
          "titleKey": "org.createChangeOrder.title",
          "purpose": "Create a change order documenting a scope change with title, scope description, and cost amount",
          "userActions": [
            "createChangeOrder"
          ],
          "requiredEntities": [
            "ChangeOrder",
            "Project"
          ],
          "readsFields": [
            "projectId"
          ],
          "writesFields": [
            "title",
            "scopeDescription",
            "amount",
            "status",
            "createdAt"
          ],
          "rulesApplied": [
            "changeOrderRequiresProject",
            "changeOrderInAppApproval"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int_createChangeOrder_form",
              "intent": "commandForm",
              "stateKey": "ui.changeOrderLifecycle.action.createChangeOrder.status",
              "action": "createChangeOrder",
              "submitAction": "createChangeOrder",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "org_sendChangeOrder",
      "type": "section",
      "sectionName": "org_sendChangeOrder",
      "titleKey": "org.sendChangeOrder.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org_sendChangeOrder_inner",
          "type": "organism",
          "organismName": "SendChangeOrder",
          "titleKey": "org.sendChangeOrder.inner.title",
          "purpose": "Select a draft change order from the list and send it to the client for in-app approval",
          "userActions": [
            "sendChangeOrder"
          ],
          "requiredEntities": [
            "ChangeOrder",
            "Project"
          ],
          "readsFields": [
            "changeOrderId",
            "status",
            "title",
            "amount",
            "createdAt"
          ],
          "writesFields": [
            "status",
            "sentAt",
            "updatedAt"
          ],
          "rulesApplied": [
            "changeOrderInAppApproval",
            "changeOrderRequiresProject",
            "approvedChangeOrdersOnly"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "int_sendChangeOrder_list",
              "intent": "queryList",
              "order": 10
            },
            {
              "id": "int_sendChangeOrder_form",
              "intent": "commandForm",
              "stateKey": "ui.changeOrderLifecycle.action.sendChangeOrder.status",
              "action": "sendChangeOrder",
              "submitAction": "sendChangeOrder",
              "order": 20
            }
          ]
        }
      ]
    },
    {
      "id": "org_reviewSummary",
      "type": "section",
      "sectionName": "org_reviewSummary",
      "titleKey": "org.reviewSummary.title",
      "mode": "read",
      "order": 30,
      "organisms": [
        {
          "id": "org_reviewSummary_inner",
          "type": "organism",
          "organismName": "ReviewSummary",
          "titleKey": "org.reviewSummary.inner.title",
          "purpose": "Review the change order details and lifecycle status after creation and sending",
          "userActions": [],
          "requiredEntities": [
            "ChangeOrder"
          ],
          "readsFields": [
            "title",
            "scopeDescription",
            "amount",
            "status",
            "createdAt",
            "sentAt",
            "approvedAt",
            "rejectedAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "approvedChangeOrdersOnly",
            "changeOrderInAppApproval"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "int_review_summary",
              "intent": "summary",
              "order": 10
            },
            {
              "id": "int_review_workflowStatus",
              "intent": "workflowStatus",
              "stateKey": "ui.changeOrderLifecycle.status",
              "order": 20
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
        "id": "sec_changeOrderManagement",
        "type": "section",
        "sectionName": "sec_changeOrderManagement",
        "titleKey": "sec.changeOrderManagement.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org_createChangeOrder",
            "type": "organism",
            "organismName": "CreateChangeOrder",
            "titleKey": "org.createChangeOrder.title",
            "purpose": "Create a change order documenting a scope change with title, scope description, and cost amount",
            "userActions": [
              "createChangeOrder"
            ],
            "requiredEntities": [
              "ChangeOrder",
              "Project"
            ],
            "readsFields": [
              "projectId"
            ],
            "writesFields": [
              "title",
              "scopeDescription",
              "amount",
              "status",
              "createdAt"
            ],
            "rulesApplied": [
              "changeOrderRequiresProject",
              "changeOrderInAppApproval"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int_createChangeOrder_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intention.createForm.title",
                "action": "createChangeOrder",
                "submitAction": "createChangeOrder",
                "displayHint": "wizard-step-1",
                "stateKey": "ui.changeOrderLifecycle.action.createChangeOrder.status",
                "fields": [
                  {
                    "id": "fld_create_projectId",
                    "field": "projectId",
                    "labelKey": "field.projectId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "routeParam",
                    "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.projectId"
                  },
                  {
                    "id": "fld_create_title",
                    "field": "title",
                    "labelKey": "field.title.label",
                    "order": 20,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.title"
                  },
                  {
                    "id": "fld_create_scopeDescription",
                    "field": "scopeDescription",
                    "labelKey": "field.scopeDescription.label",
                    "order": 30,
                    "required": true,
                    "inputType": "textarea",
                    "source": "userInput",
                    "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription"
                  },
                  {
                    "id": "fld_create_amount",
                    "field": "amount",
                    "labelKey": "field.amount.label",
                    "order": 40,
                    "required": true,
                    "inputType": "number",
                    "format": "money",
                    "source": "userInput",
                    "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.amount"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_create_submit",
                    "action": "createChangeOrder",
                    "labelKey": "action.createChangeOrder.label",
                    "order": 10,
                    "displayHint": "primary-submit",
                    "actionKey": "createChangeOrder"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "org_sendChangeOrder",
        "type": "section",
        "sectionName": "org_sendChangeOrder",
        "titleKey": "org.sendChangeOrder.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org_sendChangeOrder_inner",
            "type": "organism",
            "organismName": "SendChangeOrder",
            "titleKey": "org.sendChangeOrder.inner.title",
            "purpose": "Select a draft change order from the list and send it to the client for in-app approval",
            "userActions": [
              "sendChangeOrder"
            ],
            "requiredEntities": [
              "ChangeOrder",
              "Project"
            ],
            "readsFields": [
              "changeOrderId",
              "status",
              "title",
              "amount",
              "createdAt"
            ],
            "writesFields": [
              "status",
              "sentAt",
              "updatedAt"
            ],
            "rulesApplied": [
              "changeOrderInAppApproval",
              "changeOrderRequiresProject",
              "approvedChangeOrdersOnly"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "int_sendChangeOrder_list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intention.draftList.title",
                "emptyKey": "intention.draftList.empty",
                "displayHint": "wizard-step-2-selection",
                "fields": [],
                "columns": [
                  {
                    "id": "col_list_title",
                    "field": "title",
                    "labelKey": "field.title.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.changeOrderLifecycle.layout.col_list_title"
                  },
                  {
                    "id": "col_list_amount",
                    "field": "amount",
                    "labelKey": "field.amount.label",
                    "order": 20,
                    "required": false,
                    "inputType": "number",
                    "format": "money",
                    "stateKey": "ui.changeOrderLifecycle.layout.col_list_amount"
                  },
                  {
                    "id": "col_list_status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.changeOrderLifecycle.layout.col_list_status"
                  },
                  {
                    "id": "col_list_createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 40,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "stateKey": "ui.changeOrderLifecycle.layout.col_list_createdAt"
                  }
                ],
                "filters": [
                  {
                    "id": "flt_list_status",
                    "field": "status",
                    "labelKey": "filter.status.label",
                    "order": 10,
                    "required": false,
                    "inputType": "select",
                    "source": "system",
                    "stateKey": "ui.changeOrderLifecycle.layout.flt_list_status"
                  }
                ],
                "toolbar": [],
                "rowActions": [
                  {
                    "id": "row_sendChangeOrder",
                    "action": "sendChangeOrder",
                    "labelKey": "action.sendChangeOrder.label",
                    "order": 10,
                    "displayHint": "row-action-primary",
                    "actionKey": "sendChangeOrder"
                  }
                ],
                "actions": []
              },
              {
                "id": "int_sendChangeOrder_form",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "intention.sendForm.title",
                "action": "sendChangeOrder",
                "submitAction": "sendChangeOrder",
                "displayHint": "wizard-step-2-confirm",
                "stateKey": "ui.changeOrderLifecycle.action.sendChangeOrder.status",
                "fields": [
                  {
                    "id": "fld_send_changeOrderId",
                    "field": "changeOrderId",
                    "labelKey": "field.changeOrderId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "source": "selectedEntity",
                    "stateKey": "ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_send_submit",
                    "action": "sendChangeOrder",
                    "labelKey": "action.sendChangeOrder.label",
                    "order": 10,
                    "displayHint": "primary-submit",
                    "actionKey": "sendChangeOrder"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "org_reviewSummary",
        "type": "section",
        "sectionName": "org_reviewSummary",
        "titleKey": "org.reviewSummary.title",
        "mode": "read",
        "order": 30,
        "organisms": [
          {
            "id": "org_reviewSummary_inner",
            "type": "organism",
            "organismName": "ReviewSummary",
            "titleKey": "org.reviewSummary.inner.title",
            "purpose": "Review the change order details and lifecycle status after creation and sending",
            "userActions": [],
            "requiredEntities": [
              "ChangeOrder"
            ],
            "readsFields": [
              "title",
              "scopeDescription",
              "amount",
              "status",
              "createdAt",
              "sentAt",
              "approvedAt",
              "rejectedAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "approvedChangeOrdersOnly",
              "changeOrderInAppApproval"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "int_review_summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "intention.summary.title",
                "emptyKey": "intention.summary.empty",
                "displayHint": "wizard-step-3-review",
                "fields": [],
                "columns": [
                  {
                    "id": "col_summary_title",
                    "field": "title",
                    "labelKey": "field.title.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_summary_scopeDescription",
                    "field": "scopeDescription",
                    "labelKey": "field.scopeDescription.label",
                    "order": 20,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_summary_amount",
                    "field": "amount",
                    "labelKey": "field.amount.label",
                    "order": 30,
                    "required": false,
                    "inputType": "number",
                    "format": "money"
                  },
                  {
                    "id": "col_summary_status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 40,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_summary_createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt.label",
                    "order": 50,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime"
                  },
                  {
                    "id": "col_summary_sentAt",
                    "field": "sentAt",
                    "labelKey": "field.sentAt.label",
                    "order": 60,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int_review_workflowStatus",
                "intent": "workflowStatus",
                "order": 20,
                "titleKey": "intention.workflowStatus.title",
                "displayHint": "lifecycle-timeline",
                "stateKey": "ui.changeOrderLifecycle.status",
                "fields": [],
                "columns": [
                  {
                    "id": "col_wf_status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_wf_sentAt",
                    "field": "sentAt",
                    "labelKey": "field.sentAt.label",
                    "order": 20,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime"
                  },
                  {
                    "id": "col_wf_approvedAt",
                    "field": "approvedAt",
                    "labelKey": "field.approvedAt.label",
                    "order": 30,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime"
                  },
                  {
                    "id": "col_wf_rejectedAt",
                    "field": "rejectedAt",
                    "labelKey": "field.rejectedAt.label",
                    "order": 40,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime"
                  },
                  {
                    "id": "col_wf_updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 50,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime"
                  }
                ],
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
      "id": "db_createChangeOrder",
      "source": "buildFlowFsm.changeOrderLifecycle.createChangeOrder",
      "entity": "ChangeOrder",
      "command": "createChangeOrder",
      "description": "Creates a change order in draft status linked to the current project",
      "stateKey": "ui.changeOrderLifecycle.output.createChangeOrder",
      "inputStateKeys": [
        "ui.changeOrderLifecycle.input.createChangeOrder.projectId",
        "ui.changeOrderLifecycle.input.createChangeOrder.title",
        "ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription",
        "ui.changeOrderLifecycle.input.createChangeOrder.amount"
      ]
    },
    {
      "id": "db_sendChangeOrder",
      "source": "buildFlowFsm.changeOrderLifecycle.sendChangeOrder",
      "entity": "ChangeOrder",
      "command": "sendChangeOrder",
      "description": "Transitions a draft change order to sent status and records sentAt timestamp",
      "stateKey": "ui.changeOrderLifecycle.output.sendChangeOrder",
      "inputStateKeys": [
        "ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "changeOrderLifecycle__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/changeOrderLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/changeOrderLifecycle.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "changeOrderLifecycle__l2_shared"
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
