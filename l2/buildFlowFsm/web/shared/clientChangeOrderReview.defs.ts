/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientChangeOrderReview",
  "pageName": "Change Order Review",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmClientChangeOrderReviewBase",
  "routePattern": "/buildFlowFsm/clientChangeOrderReview/:changeOrderId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:changeOrderLifecycle",
    "operation:reviewChangeOrder"
  ],
  "operationIds": [
    "reviewChangeOrder"
  ],
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
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientChangeOrderReview.defs.ts",
    "layoutId": "page11-wizard_flow"
  },
  "states": [
    {
      "stateKey": "ui.clientChangeOrderReview.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.action.reviewChangeOrder.status",
      "name": "reviewChangeOrderState",
      "kind": "actionStatus",
      "actionRef": "reviewChangeOrder",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId",
      "name": "reviewChangeOrderChangeOrderId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "reviewChangeOrder",
        "direction": "input",
        "field": "changeOrderId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.decision",
      "name": "reviewChangeOrderDecision",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "reviewChangeOrder",
        "direction": "input",
        "field": "decision"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason",
      "name": "reviewChangeOrderRejectionReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "reviewChangeOrder",
        "direction": "input",
        "field": "rejectionReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.output.reviewChangeOrder",
      "name": "OutputReviewChangeOrder",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-title",
      "name": "LayoutFldSummaryTitle",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-scope",
      "name": "LayoutFldSummaryScope",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-amount",
      "name": "LayoutFldSummaryAmount",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-status",
      "name": "LayoutFldSummaryStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-summary-sentAt",
      "name": "LayoutFldSummarySentAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-result-status",
      "name": "LayoutFldResultStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-result-approvedAt",
      "name": "LayoutFldResultApprovedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-result-rejectedAt",
      "name": "LayoutFldResultRejectedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientChangeOrderReview.layout.fld-result-updatedAt",
      "name": "LayoutFldResultUpdatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "reviewChangeOrder",
      "kind": "command",
      "commandRef": "reviewChangeOrder",
      "routeKey": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder",
      "purpose": "Approve or reject change order",
      "methodName": "reviewChangeOrder",
      "handlerName": "handleReviewChangeOrderClick",
      "inputStateKeys": [
        "ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId",
        "ui.clientChangeOrderReview.input.reviewChangeOrder.decision",
        "ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason"
      ],
      "routeParamInputStateKeys": [
        "ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.clientChangeOrderReview.output.reviewChangeOrder"
      ],
      "statusStateKey": "ui.clientChangeOrderReview.action.reviewChangeOrder.status"
    },
    {
      "actionId": "set.reviewChangeOrderChangeOrderId",
      "kind": "stateSetter",
      "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId",
      "methodName": "setReviewChangeOrderChangeOrderId",
      "handlerName": "handleReviewChangeOrderChangeOrderIdChange"
    },
    {
      "actionId": "set.reviewChangeOrderDecision",
      "kind": "stateSetter",
      "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.decision",
      "methodName": "setReviewChangeOrderDecision",
      "handlerName": "handleReviewChangeOrderDecisionChange"
    },
    {
      "actionId": "set.reviewChangeOrderRejectionReason",
      "kind": "stateSetter",
      "stateKey": "ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason",
      "methodName": "setReviewChangeOrderRejectionReason",
      "handlerName": "handleReviewChangeOrderRejectionReasonChange"
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
    "page.title": "Change Order Review",
    "section.review.title": "Change Order Review",
    "intent.summary.title": "Change Order Details",
    "intent.commandForm.title": "Your Decision",
    "intent.workflowStatus.title": "Decision Result",
    "field.title.label": "Title",
    "field.scopeDescription.label": "Scope Description",
    "field.amount.label": "Cost Impact",
    "field.status.label": "Status",
    "field.sentAt.label": "Sent At",
    "field.changeOrderId.label": "Change Order ID",
    "field.decision.label": "Decision",
    "field.rejectionReason.label": "Rejection Reason",
    "field.approvedAt.label": "Approved At",
    "field.rejectedAt.label": "Rejected At",
    "field.updatedAt.label": "Last Updated",
    "action.reviewChangeOrder.label": "Submit Decision",
    "empty.summary": "No change order details available",
    "empty.commandForm": "Please review the change order details above before making your decision.",
    "empty.workflowStatus": "No decision has been submitted yet.",
    "sec.change.order.review.title": "Sec change order review",
    "org.review.change.order.title": "Approve or reject change order"
  },
  "automation": {
    "statePrefix": "ui.clientChangeOrderReview",
    "stateKeys": [
      "ui.clientChangeOrderReview.status",
      "ui.clientChangeOrderReview.action.reviewChangeOrder.status",
      "ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId",
      "ui.clientChangeOrderReview.input.reviewChangeOrder.decision",
      "ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason",
      "ui.clientChangeOrderReview.output.reviewChangeOrder",
      "ui.clientChangeOrderReview.layout.fld-summary-title",
      "ui.clientChangeOrderReview.layout.fld-summary-scope",
      "ui.clientChangeOrderReview.layout.fld-summary-amount",
      "ui.clientChangeOrderReview.layout.fld-summary-status",
      "ui.clientChangeOrderReview.layout.fld-summary-sentAt",
      "ui.clientChangeOrderReview.layout.fld-result-status",
      "ui.clientChangeOrderReview.layout.fld-result-approvedAt",
      "ui.clientChangeOrderReview.layout.fld-result-rejectedAt",
      "ui.clientChangeOrderReview.layout.fld-result-updatedAt"
    ],
    "actionIds": [
      "reviewChangeOrder",
      "set.reviewChangeOrderChangeOrderId",
      "set.reviewChangeOrderDecision",
      "set.reviewChangeOrderRejectionReason"
    ]
  }
};

export const pipeline = [
  {
    "id": "clientChangeOrderReview__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "clientChangeOrderReview__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
