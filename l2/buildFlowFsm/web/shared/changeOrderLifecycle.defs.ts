/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "changeOrderLifecycle",
  "pageName": "Change Order Management",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmChangeOrderLifecycleBase",
  "routePattern": "/buildFlowFsm/changeOrderLifecycle/:projectId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:changeOrderLifecycle",
    "operation:createChangeOrder",
    "operation:sendChangeOrder"
  ],
  "operationIds": [
    "createChangeOrder",
    "sendChangeOrder"
  ],
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
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/changeOrderLifecycle.defs.ts",
    "layoutId": "wizard_flow_page11"
  },
  "states": [
    {
      "stateKey": "ui.changeOrderLifecycle.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.action.createChangeOrder.status",
      "name": "createChangeOrderState",
      "kind": "actionStatus",
      "actionRef": "createChangeOrder",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.projectId",
      "name": "createChangeOrderProjectId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "createChangeOrder",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.title",
      "name": "createChangeOrderTitle",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createChangeOrder",
        "direction": "input",
        "field": "title"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription",
      "name": "createChangeOrderScopeDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createChangeOrder",
        "direction": "input",
        "field": "scopeDescription"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.amount",
      "name": "createChangeOrderAmount",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createChangeOrder",
        "direction": "input",
        "field": "amount"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.action.sendChangeOrder.status",
      "name": "sendChangeOrderState",
      "kind": "actionStatus",
      "actionRef": "sendChangeOrder",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId",
      "name": "sendChangeOrderChangeOrderId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "sendChangeOrder",
        "direction": "input",
        "field": "changeOrderId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.output.createChangeOrder",
      "name": "OutputCreateChangeOrder",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.changeOrderLifecycle.output.sendChangeOrder",
      "name": "OutputSendChangeOrder",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.changeOrderLifecycle.layout.col_list_title",
      "name": "LayoutColListTitle",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.layout.col_list_amount",
      "name": "LayoutColListAmount",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.layout.col_list_status",
      "name": "LayoutColListStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.layout.col_list_createdAt",
      "name": "LayoutColListCreatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.changeOrderLifecycle.layout.flt_list_status",
      "name": "LayoutFltListStatus",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "createChangeOrder",
      "kind": "command",
      "commandRef": "createChangeOrder",
      "routeKey": "buildFlowFsm.changeOrderLifecycle.createChangeOrder",
      "purpose": "Create a change order",
      "methodName": "createChangeOrder",
      "handlerName": "handleCreateChangeOrderClick",
      "inputStateKeys": [
        "ui.changeOrderLifecycle.input.createChangeOrder.projectId",
        "ui.changeOrderLifecycle.input.createChangeOrder.title",
        "ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription",
        "ui.changeOrderLifecycle.input.createChangeOrder.amount"
      ],
      "routeParamInputStateKeys": [
        "ui.changeOrderLifecycle.input.createChangeOrder.projectId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.changeOrderLifecycle.output.createChangeOrder"
      ],
      "statusStateKey": "ui.changeOrderLifecycle.action.createChangeOrder.status"
    },
    {
      "actionId": "sendChangeOrder",
      "kind": "command",
      "commandRef": "sendChangeOrder",
      "routeKey": "buildFlowFsm.changeOrderLifecycle.sendChangeOrder",
      "purpose": "Send change order to client",
      "methodName": "sendChangeOrder",
      "handlerName": "handleSendChangeOrderClick",
      "inputStateKeys": [
        "ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId"
      ],
      "outputStateKeys": [
        "ui.changeOrderLifecycle.output.sendChangeOrder"
      ],
      "statusStateKey": "ui.changeOrderLifecycle.action.sendChangeOrder.status"
    },
    {
      "actionId": "set.createChangeOrderProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.projectId",
      "methodName": "setCreateChangeOrderProjectId",
      "handlerName": "handleCreateChangeOrderProjectIdChange"
    },
    {
      "actionId": "set.createChangeOrderTitle",
      "kind": "stateSetter",
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.title",
      "methodName": "setCreateChangeOrderTitle",
      "handlerName": "handleCreateChangeOrderTitleChange"
    },
    {
      "actionId": "set.createChangeOrderScopeDescription",
      "kind": "stateSetter",
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription",
      "methodName": "setCreateChangeOrderScopeDescription",
      "handlerName": "handleCreateChangeOrderScopeDescriptionChange"
    },
    {
      "actionId": "set.createChangeOrderAmount",
      "kind": "stateSetter",
      "stateKey": "ui.changeOrderLifecycle.input.createChangeOrder.amount",
      "methodName": "setCreateChangeOrderAmount",
      "handlerName": "handleCreateChangeOrderAmountChange"
    },
    {
      "actionId": "set.sendChangeOrderChangeOrderId",
      "kind": "stateSetter",
      "stateKey": "ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId",
      "methodName": "setSendChangeOrderChangeOrderId",
      "handlerName": "handleSendChangeOrderChangeOrderIdChange"
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
    "section.changeOrderManagement": "Change Order Management",
    "organism.createChangeOrder.title": "Create Change Order",
    "organism.createChangeOrder.purpose": "Document a scope change with its cost impact",
    "organism.sendChangeOrder.title": "Send to Client",
    "organism.sendChangeOrder.purpose": "Send the draft change order to the client for in-app approval",
    "organism.reviewSummary.title": "Review & Status",
    "organism.reviewSummary.purpose": "Review the change order lifecycle status",
    "intention.createForm.title": "New Change Order Details",
    "intention.draftList.title": "Draft Change Orders",
    "intention.draftList.empty": "No draft change orders available. Create one first.",
    "intention.sendForm.title": "Send Change Order",
    "intention.summary.title": "Change Order Summary",
    "intention.summary.empty": "No change order selected.",
    "intention.workflowStatus.title": "Lifecycle Status",
    "field.projectId.label": "Project",
    "field.title.label": "Title",
    "field.scopeDescription.label": "Scope Description",
    "field.amount.label": "Cost Amount (USD)",
    "field.changeOrderId.label": "Change Order",
    "field.status.label": "Status",
    "field.sentAt.label": "Sent At",
    "field.createdAt.label": "Created At",
    "field.updatedAt.label": "Updated At",
    "field.approvedAt.label": "Approved At",
    "field.rejectedAt.label": "Rejected At",
    "action.createChangeOrder.label": "Create Change Order",
    "action.sendChangeOrder.label": "Send to Client",
    "filter.status.label": "Status",
    "sec.changeOrderManagement.title": "Sec change Order Management",
    "org.createChangeOrder.title": "Create a change order documenting a scope change with title, scope description, and cost amount",
    "org.sendChangeOrder.title": "Org send Change Order",
    "org.sendChangeOrder.inner.title": "Select a draft change order from the list and send it to the client for in app approval",
    "org.reviewSummary.title": "Org review Summary",
    "org.reviewSummary.inner.title": "Review the change order details and lifecycle status after creation and sending"
  },
  "automation": {
    "statePrefix": "ui.changeOrderLifecycle",
    "stateKeys": [
      "ui.changeOrderLifecycle.status",
      "ui.changeOrderLifecycle.action.createChangeOrder.status",
      "ui.changeOrderLifecycle.input.createChangeOrder.projectId",
      "ui.changeOrderLifecycle.input.createChangeOrder.title",
      "ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription",
      "ui.changeOrderLifecycle.input.createChangeOrder.amount",
      "ui.changeOrderLifecycle.action.sendChangeOrder.status",
      "ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId",
      "ui.changeOrderLifecycle.output.createChangeOrder",
      "ui.changeOrderLifecycle.output.sendChangeOrder",
      "ui.changeOrderLifecycle.layout.col_list_title",
      "ui.changeOrderLifecycle.layout.col_list_amount",
      "ui.changeOrderLifecycle.layout.col_list_status",
      "ui.changeOrderLifecycle.layout.col_list_createdAt",
      "ui.changeOrderLifecycle.layout.flt_list_status"
    ],
    "actionIds": [
      "createChangeOrder",
      "sendChangeOrder",
      "set.createChangeOrderProjectId",
      "set.createChangeOrderTitle",
      "set.createChangeOrderScopeDescription",
      "set.createChangeOrderAmount",
      "set.sendChangeOrderChangeOrderId"
    ]
  }
};

export const pipeline = [
  {
    "id": "changeOrderLifecycle__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "changeOrderLifecycle__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
