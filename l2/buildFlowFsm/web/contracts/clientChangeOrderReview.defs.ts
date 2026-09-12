/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "reviewChangeOrder",
    "bffName": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder",
    "routeKey": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder",
    "purpose": "Approve or reject change order",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "changeOrderId",
        "type": "string",
        "required": true,
        "description": "Identifier of the change order the client is reviewing, provided via the URL route.",
        "source": "routeParam",
        "presentation": "route"
      },
      {
        "name": "decision",
        "type": "string",
        "required": true,
        "enum": [
          "draft",
          "sent",
          "approved",
          "rejected",
          "cancelled"
        ],
        "description": "The client's decision: approve or reject the change order.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "rejectionReason",
        "type": "string",
        "required": false,
        "description": "Optional reason the client provides when rejecting the change order.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "changeOrderId",
        "type": "string",
        "description": "Primary identifier for the change order record."
      },
      {
        "name": "title",
        "type": "string",
        "description": "Short title summarizing the scope change."
      },
      {
        "name": "scopeDescription",
        "type": "string",
        "description": "Detailed description of the scope change being requested."
      },
      {
        "name": "amount",
        "type": "number",
        "description": "Cost impact of the change order in USD; only included in invoicing and job costing when approved."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "sent",
          "approved",
          "rejected",
          "cancelled"
        ],
        "description": "In-app approval status of the change order; determines whether it affects job costing and invoicing."
      },
      {
        "name": "sentAt",
        "type": "date",
        "description": "Timestamp when the change order was sent to the client for approval."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:reviewChangeOrder",
      "operationId": "reviewChangeOrder",
      "defPath": "_102048_/l4/operations/reviewChangeOrder.defs.ts",
      "bffName": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder"
    }
  }
];

export const pipeline = [
  {
    "id": "clientChangeOrderReview__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
