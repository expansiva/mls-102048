/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientChangeOrderReview.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientChangeOrderReview",
  "pageName": "Change Order Review",
  "baseClassName": "BuildFlowFsmClientChangeOrderReviewBase",
  "actor": "client",
  "purpose": "Executar Change Order Review.",
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
    "workspaceId": "clientChangeOrderReview",
    "workspaceKind": "workflow",
    "workflowId": "changeOrderLifecycle",
    "actor": "client",
    "entity": "ChangeOrder",
    "owners": [
      {
        "kind": "workflow",
        "id": "changeOrderLifecycle",
        "defPath": "_102048_/l4/workflows/changeOrderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "reviewChangeOrder",
        "defPath": "_102048_/l4/operations/reviewChangeOrder.defs.ts"
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
          "operationId": "reviewChangeOrder",
          "commandName": "reviewChangeOrder",
          "steps": [
            "Client opens the change order from a shareable link or email notification",
            "Client reviews the scope description and cost amount displayed on the change order",
            "Client chooses to approve or reject the change order",
            "If rejecting, the client may provide a rejection reason",
            "The system updates the change order status, records the decision timestamp, and refreshes updatedAt"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec-change-order-review",
      "type": "section",
      "sectionName": "sec-change-order-review",
      "titleKey": "sec.change.order.review.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-review-change-order",
          "type": "organism",
          "organismName": "ReviewChangeOrder",
          "titleKey": "org.review.change.order.title",
          "purpose": "Approve or reject change order",
          "userActions": [
            "reviewChangeOrder"
          ],
          "requiredEntities": [
            "ChangeOrder"
          ],
          "readsFields": [
            "title",
            "scopeDescription",
            "amount",
            "status",
            "sentAt",
            "changeOrderId"
          ],
          "writesFields": [
            "decision",
            "rejectionReason",
            "status",
            "approvedAt",
            "rejectedAt",
            "updatedAt"
          ],
          "rulesApplied": [
            "changeOrderInAppApproval",
            "approvedChangeOrdersOnly",
            "changeOrderRequiresProject"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-co-summary",
              "intent": "summary",
              "order": 10
            },
            {
              "id": "intent-co-decision",
              "intent": "commandForm",
              "submitAction": "reviewChangeOrder",
              "order": 20
            },
            {
              "id": "intent-co-result",
              "intent": "workflowStatus",
              "stateKey": "ui.clientChangeOrderReview.action.reviewChangeOrder.status",
              "order": 30
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "page11-wizard_flow",
    "type": "page",
    "sections": [
      {
        "id": "sec-change-order-review",
        "type": "section",
        "sectionName": "sec-change-order-review",
        "titleKey": "sec.change.order.review.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-review-change-order",
            "type": "organism",
            "organismName": "ReviewChangeOrder",
            "titleKey": "org.review.change.order.title",
            "purpose": "Approve or reject change order",
            "userActions": [
              "reviewChangeOrder"
            ],
            "requiredEntities": [
              "ChangeOrder"
            ],
            "readsFields": [
              "title",
              "scopeDescription",
              "amount",
              "status",
              "sentAt",
              "changeOrderId"
            ],
            "writesFields": [
              "decision",
              "rejectionReason",
              "status",
              "approvedAt",
              "rejectedAt",
              "updatedAt"
            ],
            "rulesApplied": [
              "changeOrderInAppApproval",
              "approvedChangeOrdersOnly",
              "changeOrderRequiresProject"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-co-summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "intent.summary.title",
                "emptyKey": "empty.summary",
                "displayHint": "read-only",
                "fields": [
                  {
                    "id": "fld-summary-title",
                    "field": "title",
                    "labelKey": "field.title.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-title"
                  },
                  {
                    "id": "fld-summary-scope",
                    "field": "scopeDescription",
                    "labelKey": "field.scopeDescription.label",
                    "order": 20,
                    "required": false,
                    "inputType": "textarea",
                    "format": "text",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-scope"
                  },
                  {
                    "id": "fld-summary-amount",
                    "field": "amount",
                    "labelKey": "field.amount.label",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "format": "money",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-amount"
                  },
                  {
                    "id": "fld-summary-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 40,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-status"
                  },
                  {
                    "id": "fld-summary-sentAt",
                    "field": "sentAt",
                    "labelKey": "field.sentAt.label",
                    "order": 50,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-sentAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "intent-co-decision",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "intent.commandForm.title",
                "submitAction": "reviewChangeOrder",
                "emptyKey": "empty.commandForm",
                "displayHint": "form",
                "fields": [
                  {
                    "id": "fld-input-changeOrderId",
                    "field": "changeOrderId",
                    "labelKey": "field.changeOrderId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "format": "uuid",
                    "source": "routeParam",
                    "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId"
                  },
                  {
                    "id": "fld-input-decision",
                    "field": "decision",
                    "labelKey": "field.decision.label",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "format": "enum",
                    "source": "userInput",
                    "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.decision"
                  },
                  {
                    "id": "fld-input-rejectionReason",
                    "field": "rejectionReason",
                    "labelKey": "field.rejectionReason.label",
                    "order": 30,
                    "required": false,
                    "inputType": "textarea",
                    "format": "text",
                    "source": "userInput",
                    "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submit-review",
                    "action": "reviewChangeOrder",
                    "labelKey": "action.reviewChangeOrder.label",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "reviewChangeOrder"
                  }
                ]
              },
              {
                "id": "intent-co-result",
                "intent": "workflowStatus",
                "order": 30,
                "titleKey": "intent.workflowStatus.title",
                "emptyKey": "empty.workflowStatus",
                "displayHint": "read-only",
                "stateKey": "ui.clientChangeOrderReview.action.reviewChangeOrder.status",
                "fields": [
                  {
                    "id": "fld-result-status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-result-status"
                  },
                  {
                    "id": "fld-result-approvedAt",
                    "field": "approvedAt",
                    "labelKey": "field.approvedAt.label",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-result-approvedAt"
                  },
                  {
                    "id": "fld-result-rejectedAt",
                    "field": "rejectedAt",
                    "labelKey": "field.rejectedAt.label",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-result-rejectedAt"
                  },
                  {
                    "id": "fld-result-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt.label",
                    "order": 40,
                    "required": false,
                    "inputType": "text",
                    "format": "datetime",
                    "source": "output",
                    "stateKey": "ui.clientChangeOrderReview.layout.fld-result-updatedAt"
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
      "id": "bind-reviewChangeOrder",
      "source": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder",
      "entity": "ChangeOrder",
      "command": "reviewChangeOrder",
      "description": "Submits the client's approve or reject decision for the change order.",
      "stateKey": "ui.clientChangeOrderReview.output.reviewChangeOrder",
      "inputStateKeys": [
        "ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId",
        "ui.clientChangeOrderReview.input.reviewChangeOrder.decision",
        "ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "clientChangeOrderReview__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientChangeOrderReview.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientChangeOrderReview.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "clientChangeOrderReview__l2_shared"
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
