/// <mls fileReference="_102048_/l4/operations/createClient.defs.ts" enhancement="_blank"/>

export const operationCreateClient = {
  "operationId": "createClient",
  "title": "Create a client",
  "actor": "companyAdmin",
  "entity": "Client",
  "kind": "create",
  "reads": [
    "Client"
  ],
  "writes": [
    "Client"
  ],
  "rulesApplied": [
    "clientAccessViaLinksOrAuth"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "Create a new client record so that projects can be linked to the correct customer and invoices, shareable links, and optional portal access can be configured.",
    "steps": [
      "The companyAdmin opens the client creation form and enters the client contact name, email, and optional company name, phone, and billing address.",
      "The companyAdmin decides whether to enable portal access for the client, which determines whether the client may log in using platform authentication.",
      "The system generates a unique clientId and sets createdAt and updatedAt timestamps.",
      "The system persists the client record, making it available for project linkage and activation."
    ],
    "outcome": "A new client record exists in the system with all required fields populated and can be associated with one or more projects."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "Client",
    "keyField": "Client.clientId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Client.clientId",
      "Client.name",
      "Client.companyName",
      "Client.email",
      "Client.phone",
      "Client.portalAccessEnabled",
      "Client.billingAddress",
      "Client.createdAt"
    ]
  },
  "inputs": [
    {
      "inputId": "name",
      "fieldRef": "Client.name",
      "required": true,
      "source": "userInput",
      "description": "Full name of the client contact person."
    },
    {
      "inputId": "companyName",
      "fieldRef": "Client.companyName",
      "required": false,
      "source": "userInput",
      "description": "Legal name of the client's organization, if applicable."
    },
    {
      "inputId": "email",
      "fieldRef": "Client.email",
      "required": true,
      "source": "userInput",
      "description": "Primary email address used to send shareable project links and invoices."
    },
    {
      "inputId": "phone",
      "fieldRef": "Client.phone",
      "required": false,
      "source": "userInput",
      "description": "Contact phone number for the client."
    },
    {
      "inputId": "portalAccessEnabled",
      "fieldRef": "Client.portalAccessEnabled",
      "required": true,
      "source": "userInput",
      "description": "Indicates whether the client may log in to the portal using platform authentication to view project information."
    },
    {
      "inputId": "billingAddress",
      "fieldRef": "Client.billingAddress",
      "required": false,
      "source": "userInput",
      "description": "Postal address used on informational invoices sent to the client."
    },
    {
      "inputId": "clientId",
      "fieldRef": "Client.clientId",
      "required": true,
      "source": "systemDefault",
      "description": "System-generated unique identifier for the client record."
    },
    {
      "inputId": "createdAt",
      "fieldRef": "Client.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp when the client record was created."
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "Client.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp when the client record was last modified."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Client.clientId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "The backend generates a new UUID for the client record at creation time."
    },
    {
      "targetRef": "Client.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The backend sets createdAt to the current server timestamp when the record is persisted."
    },
    {
      "targetRef": "Client.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The backend sets updatedAt to the current server timestamp when the record is persisted."
    }
  ],
  "acceptanceAssertions": [
    "After creation the client record exists with a non-null clientId and the provided name and email values.",
    "After creation the client record has portalAccessEnabled set to the value chosen by the companyAdmin, governing whether the client may use platform authentication per the clientAccessViaLinksOrAuth rule.",
    "After creation the client record has createdAt and updatedAt populated with the current server timestamp.",
    "After creation the client is available to be linked to a project so that the project can be activated per the projectRequiresClient rule."
  ],
  "pageId": "createClient",
  "commandName": "createClient",
  "bffName": "buildFlowFsm.createClient.createClient",
  "capability": {
    "capabilityId": "createClient",
    "title": "Create a client",
    "actor": "companyAdmin",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateClient;
