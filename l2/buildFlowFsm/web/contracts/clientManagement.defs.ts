/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientManagement.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "browseClients",
    "bffName": "buildFlowFsm.browseClients.browseClients",
    "routeKey": "buildFlowFsm.browseClients.browseClients",
    "purpose": "Browse clients",
    "kind": "query",
    "outputShape": "paginated",
    "input": [
      {
        "name": "searchName",
        "type": "string",
        "required": false,
        "description": "Optional text to filter clients by contact name",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "filterPortalAccess",
        "type": "boolean",
        "required": false,
        "description": "Optional filter to show only clients with portal access enabled or disabled",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "clientId",
        "type": "string",
        "description": "Unique identifier for the client record."
      },
      {
        "name": "name",
        "type": "string",
        "description": "Full name of the client contact person."
      },
      {
        "name": "companyName",
        "type": "string",
        "description": "Legal name of the client's organization, if applicable."
      },
      {
        "name": "email",
        "type": "string",
        "description": "Primary email address used to send shareable project links and invoices."
      },
      {
        "name": "phone",
        "type": "string",
        "description": "Contact phone number for the client."
      },
      {
        "name": "portalAccessEnabled",
        "type": "boolean",
        "description": "Indicates whether the client may log in to the portal using platform authentication to view project information."
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Timestamp when the client record was created."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:browseClients",
      "operationId": "browseClients",
      "defPath": "_102048_/l4/operations/browseClients.defs.ts",
      "bffName": "buildFlowFsm.browseClients.browseClients"
    }
  },
  {
    "commandName": "createClient",
    "bffName": "buildFlowFsm.createClient.createClient",
    "routeKey": "buildFlowFsm.createClient.createClient",
    "purpose": "Create a client",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Full name of the client contact person.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "companyName",
        "type": "string",
        "required": false,
        "description": "Legal name of the client's organization, if applicable.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "email",
        "type": "string",
        "required": true,
        "description": "Primary email address used to send shareable project links and invoices.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "phone",
        "type": "string",
        "required": false,
        "description": "Contact phone number for the client.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "portalAccessEnabled",
        "type": "boolean",
        "required": true,
        "description": "Indicates whether the client may log in to the portal using platform authentication to view project information.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "billingAddress",
        "type": "string",
        "required": false,
        "description": "Postal address used on informational invoices sent to the client.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "clientId",
        "type": "string",
        "description": "Unique identifier for the client record."
      },
      {
        "name": "name",
        "type": "string",
        "description": "Full name of the client contact person."
      },
      {
        "name": "companyName",
        "type": "string",
        "description": "Legal name of the client's organization, if applicable."
      },
      {
        "name": "email",
        "type": "string",
        "description": "Primary email address used to send shareable project links and invoices."
      },
      {
        "name": "phone",
        "type": "string",
        "description": "Contact phone number for the client."
      },
      {
        "name": "portalAccessEnabled",
        "type": "boolean",
        "description": "Indicates whether the client may log in to the portal using platform authentication to view project information."
      },
      {
        "name": "billingAddress",
        "type": "string",
        "description": "Postal address used on informational invoices sent to the client."
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Timestamp when the client record was created."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:createClient",
      "operationId": "createClient",
      "defPath": "_102048_/l4/operations/createClient.defs.ts",
      "bffName": "buildFlowFsm.createClient.createClient"
    }
  },
  {
    "commandName": "updateClient",
    "bffName": "buildFlowFsm.updateClient.updateClient",
    "routeKey": "buildFlowFsm.updateClient.updateClient",
    "purpose": "Edit client details",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "clientId",
        "type": "string",
        "required": true,
        "description": "The identifier of the client record being edited.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Full name of the client contact person.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "companyName",
        "type": "string",
        "required": false,
        "description": "Legal name of the client's organization, if applicable.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "email",
        "type": "string",
        "required": true,
        "description": "Primary email address used to send shareable project links and invoices.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "phone",
        "type": "string",
        "required": false,
        "description": "Contact phone number for the client.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "portalAccessEnabled",
        "type": "boolean",
        "required": true,
        "description": "Toggle indicating whether the client may log in to the portal using platform authentication.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "billingAddress",
        "type": "string",
        "required": false,
        "description": "Postal address used on informational invoices sent to the client.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "clientId",
        "type": "string",
        "description": "Unique identifier for the client record."
      },
      {
        "name": "name",
        "type": "string",
        "description": "Full name of the client contact person."
      },
      {
        "name": "companyName",
        "type": "string",
        "description": "Legal name of the client's organization, if applicable."
      },
      {
        "name": "email",
        "type": "string",
        "description": "Primary email address used to send shareable project links and invoices."
      },
      {
        "name": "phone",
        "type": "string",
        "description": "Contact phone number for the client."
      },
      {
        "name": "portalAccessEnabled",
        "type": "boolean",
        "description": "Indicates whether the client may log in to the portal using platform authentication to view project information."
      },
      {
        "name": "billingAddress",
        "type": "string",
        "description": "Postal address used on informational invoices sent to the client."
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Timestamp when the client record was last modified."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:updateClient",
      "operationId": "updateClient",
      "defPath": "_102048_/l4/operations/updateClient.defs.ts",
      "bffName": "buildFlowFsm.updateClient.updateClient"
    }
  }
];

export const pipeline = [
  {
    "id": "clientManagement__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/clientManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientManagement.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
