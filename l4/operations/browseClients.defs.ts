/// <mls fileReference="_102048_/l4/operations/browseClients.defs.ts" enhancement="_blank"/>

export const operationBrowseClients = {
  "operationId": "browseClients",
  "title": "Browse clients",
  "actor": "companyAdmin",
  "entity": "Client",
  "kind": "query",
  "reads": [
    "Client"
  ],
  "writes": [],
  "rulesApplied": [
    "projectRequiresClient"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "Browse the list of clients to find and select the right customer when creating a project",
    "steps": [
      "Open the client browse screen",
      "Optionally filter by name or portal access status",
      "Review the matching client records with contact and access details",
      "Select a client to link to the new project"
    ],
    "outcome": "The admin sees a paginated list of clients with key contact and portal access information, ready to pick one for project creation"
  },
  "accessPattern": {
    "kind": "list",
    "entity": "Client",
    "keyField": "Client.clientId",
    "pagination": "optional",
    "selection": "single",
    "output": [
      "Client.clientId",
      "Client.name",
      "Client.companyName",
      "Client.email",
      "Client.phone",
      "Client.portalAccessEnabled",
      "Client.createdAt"
    ]
  },
  "inputs": [
    {
      "inputId": "searchName",
      "fieldRef": "Client.name",
      "required": false,
      "source": "userInput",
      "description": "Optional text to filter clients by contact name"
    },
    {
      "inputId": "filterPortalAccess",
      "fieldRef": "Client.portalAccessEnabled",
      "required": false,
      "source": "userInput",
      "description": "Optional filter to show only clients with portal access enabled or disabled"
    }
  ],
  "contextResolution": [],
  "acceptanceAssertions": [
    "The returned list contains only Client records with clientId, name, email, and portalAccessEnabled fields populated",
    "When searchName is provided, only clients whose name contains the search text are returned",
    "When filterPortalAccess is provided, only clients whose portalAccessEnabled matches the requested value are returned",
    "The list supports optional pagination so the admin can browse large numbers of clients",
    "A single client can be selected from the list to be linked to a new project, satisfying the project-requires-client rule"
  ],
  "pageId": "browseClients",
  "commandName": "browseClients",
  "bffName": "buildFlowFsm.browseClients.browseClients",
  "capability": {
    "capabilityId": "browseClients",
    "title": "Browse clients",
    "actor": "companyAdmin",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationBrowseClients;
