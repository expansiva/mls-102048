/// <mls fileReference="_102048_/l4/operations/reviewChangeOrder.defs.ts" enhancement="_blank"/>

export const operationReviewChangeOrder = {
  "operationId": "reviewChangeOrder",
  "title": "Approve or reject change order",
  "actor": "client",
  "entity": "ChangeOrder",
  "kind": "update",
  "reads": [
    "ChangeOrder"
  ],
  "writes": [
    "ChangeOrder"
  ],
  "rulesApplied": [
    "changeOrderInAppApproval",
    "approvedChangeOrdersOnly"
  ],
  "story": {
    "actor": "client",
    "goal": "Review a sent change order and decide whether to approve or reject it based on the scope description and cost impact.",
    "steps": [
      "Client opens the change order from a shareable link or email notification",
      "Client reviews the scope description and cost amount displayed on the change order",
      "Client chooses to approve or reject the change order",
      "If rejecting, the client may provide a rejection reason",
      "The system updates the change order status, records the decision timestamp, and refreshes updatedAt"
    ],
    "outcome": "The change order status reflects the client's in-app decision, and the project manager knows whether to proceed with the scope change."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "ChangeOrder",
    "keyField": "ChangeOrder.changeOrderId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "ChangeOrder.changeOrderId",
      "ChangeOrder.title",
      "ChangeOrder.scopeDescription",
      "ChangeOrder.amount",
      "ChangeOrder.status",
      "ChangeOrder.sentAt"
    ]
  },
  "inputs": [
    {
      "inputId": "changeOrderId",
      "fieldRef": "ChangeOrder.changeOrderId",
      "required": true,
      "source": "routeParam",
      "description": "Identifier of the change order the client is reviewing, provided via the URL route."
    },
    {
      "inputId": "decision",
      "fieldRef": "ChangeOrder.status",
      "required": true,
      "source": "userInput",
      "description": "The client's decision: approve or reject the change order."
    },
    {
      "inputId": "rejectionReason",
      "fieldRef": "ChangeOrder.rejectionReason",
      "required": false,
      "source": "userInput",
      "description": "Optional reason the client provides when rejecting the change order."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "ChangeOrder.changeOrderId",
      "source": "routeParam",
      "originRef": "routeParam.changeOrderId",
      "description": "The change order id is extracted from the URL route parameter to identify which sent change order the client is reviewing."
    },
    {
      "targetRef": "ChangeOrder.approvedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "When the client approves, the server sets approvedAt to the current server timestamp."
    },
    {
      "targetRef": "ChangeOrder.rejectedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "When the client rejects, the server sets rejectedAt to the current server timestamp."
    },
    {
      "targetRef": "ChangeOrder.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The server refreshes updatedAt to the current server timestamp on every review action."
    }
  ],
  "acceptanceAssertions": [
    "After approval, the change order exists with status 'approved' and approvedAt is set to the current timestamp.",
    "After rejection, the change order exists with status 'rejected', rejectedAt is set to the current timestamp, and rejectionReason is populated if the client provided one.",
    "Only a change order with status 'sent' can be reviewed; a change order in 'draft', 'approved', 'rejected', or 'cancelled' status cannot be reviewed again.",
    "An approved change order becomes eligible for inclusion in job costing calculations and invoice line items; a rejected change order is excluded from all financial calculations.",
    "The updatedAt timestamp is refreshed to the current time on every approve or reject action.",
    "No e-signature is required for the approval; the in-app status change is sufficient to record the client's decision."
  ],
  "pageId": "changeOrderLifecycle",
  "commandName": "reviewChangeOrder",
  "bffName": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder",
  "capability": {
    "capabilityId": "changeOrderLifecycle",
    "title": "Change Order Lifecycle",
    "actor": "client",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationReviewChangeOrder;
