/// <mls fileReference="_102048_/l4/workflows/changeOrderLifecycle.defs.ts" enhancement="_blank"/>

export const workflowChangeOrderLifecycle = {
  "workflowId": "changeOrderLifecycle",
  "title": "Change Order Lifecycle",
  "executionMode": "sequential",
  "trigger": "A project manager creates a change order on a project to document a scope change with a cost impact.",
  "actors": [
    "projectManager",
    "client"
  ],
  "states": [
    "draft",
    "sent",
    "approved",
    "rejected"
  ],
  "transitions": [
    {
      "from": "draft",
      "to": "sent",
      "on": "sendChangeOrder",
      "by": "projectManager",
      "guard": "Change order must have a title, scope description, and amount before sending"
    },
    {
      "from": "sent",
      "to": "approved",
      "on": "reviewChangeOrder",
      "by": "client",
      "guard": "Client approves the change order based on scope and cost"
    },
    {
      "from": "sent",
      "to": "rejected",
      "on": "reviewChangeOrder",
      "by": "client",
      "guard": "Client rejects the change order with a rejection reason"
    }
  ],
  "operationIds": [
    "createChangeOrder",
    "sendChangeOrder",
    "reviewChangeOrder"
  ],
  "entities": [
    "ChangeOrder",
    "Project",
    "Client"
  ],
  "rulesApplied": [
    "approvedChangeOrdersOnly",
    "changeOrderInAppApproval",
    "changeOrderRequiresProject"
  ],
  "story": {
    "actor": "projectManager",
    "goal": "Document a scope change with its cost impact and get client approval before proceeding so the project budget and billing stay accurate.",
    "steps": [
      "The project manager creates a change order on the project to document a scope change, including a description of the change.",
      "The project manager enters the cost amount associated with the change so the client understands the financial impact.",
      "The project manager sends the change order to the client for in-app approval, creating a record of the request.",
      "The client reviews the scope description and cost impact, then approves or rejects the change order in-app.",
      "The project manager is notified of the decision, and only an approved change order is included in job costing and invoicing."
    ],
    "outcome": "The change order is approved or rejected by the client; only approved change orders affect job costing and invoicing."
  },
  "pageId": "changeOrderLifecycle",
  "capabilities": [
    {
      "capabilityId": "changeOrderLifecycle",
      "title": "Change Order Lifecycle",
      "actor": "projectManager",
      "priority": "now"
    }
  ],
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default workflowChangeOrderLifecycle;
