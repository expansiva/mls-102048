/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "createChangeOrder",
    "bffName": "buildFlowFsm.changeOrderLifecycle.createChangeOrder",
    "routeKey": "buildFlowFsm.changeOrderLifecycle.createChangeOrder",
    "purpose": "Create a change order",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "The project this change order belongs to, sourced from the current route.",
        "source": "routeParam",
        "presentation": "route"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Short title summarizing the scope change.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "scopeDescription",
        "type": "string",
        "required": true,
        "description": "Detailed description of the scope change being requested.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "amount",
        "type": "number",
        "required": true,
        "description": "Cost impact of the change order in USD.",
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
        "name": "projectId",
        "type": "string",
        "description": "Reference to the project this change order belongs to."
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
        "name": "createdAt",
        "type": "date",
        "description": "Timestamp when the change order record was created."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:createChangeOrder",
      "operationId": "createChangeOrder",
      "defPath": "_102048_/l4/operations/createChangeOrder.defs.ts",
      "bffName": "buildFlowFsm.changeOrderLifecycle.createChangeOrder"
    }
  },
  {
    "commandName": "sendChangeOrder",
    "bffName": "buildFlowFsm.changeOrderLifecycle.sendChangeOrder",
    "routeKey": "buildFlowFsm.changeOrderLifecycle.sendChangeOrder",
    "purpose": "Send change order to client",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "changeOrderId",
        "type": "string",
        "required": true,
        "description": "The change order the project manager selected to send to the client.",
        "source": "selectedEntity",
        "presentation": "selection"
      }
    ],
    "output": [
      {
        "name": "changeOrderId",
        "type": "string",
        "description": "Primary identifier for the change order record."
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
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Timestamp of the last modification to the change order record."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:sendChangeOrder",
      "operationId": "sendChangeOrder",
      "defPath": "_102048_/l4/operations/sendChangeOrder.defs.ts",
      "bffName": "buildFlowFsm.changeOrderLifecycle.sendChangeOrder"
    }
  }
];

export const pipeline = [
  {
    "id": "changeOrderLifecycle__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
