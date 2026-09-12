/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientManagement",
  "pageName": "Client Management",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmClientManagementBase",
  "routePattern": "/buildFlowFsm/clientManagement",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:browseClients",
    "operation:createClient",
    "operation:updateClient"
  ],
  "operationIds": [
    "browseClients",
    "createClient",
    "updateClient"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "clientManagement",
    "workspaceKind": "entityManagement",
    "actor": "companyAdmin",
    "entity": "Client",
    "owners": [
      {
        "kind": "operation",
        "id": "browseClients",
        "defPath": "_102048_/l4/operations/browseClients.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createClient",
        "defPath": "_102048_/l4/operations/createClient.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateClient",
        "defPath": "_102048_/l4/operations/updateClient.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "browseClients",
          "commandName": "browseClients",
          "steps": [
            "Open the client browse screen",
            "Optionally filter by name or portal access status",
            "Review the matching client records with contact and access details",
            "Select a client to link to the new project"
          ]
        },
        {
          "operationId": "createClient",
          "commandName": "createClient",
          "steps": [
            "The companyAdmin opens the client creation form and enters the client contact name, email, and optional company name, phone, and billing address.",
            "The companyAdmin decides whether to enable portal access for the client, which determines whether the client may log in using platform authentication.",
            "The system generates a unique clientId and sets createdAt and updatedAt timestamps.",
            "The system persists the client record, making it available for project linkage and activation."
          ]
        },
        {
          "operationId": "updateClient",
          "commandName": "updateClient",
          "steps": [
            "The admin opens a client record from the client list.",
            "The admin edits the client's name, company name, email, phone, billing address, and portal access toggle.",
            "The admin confirms the changes and the system persists the updated fields with a refreshed updatedAt timestamp."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientManagement.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/clientManagement.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientManagement.defs.ts",
    "layoutId": "page11-tabular_classic"
  },
  "states": [
    {
      "stateKey": "ui.clientManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.action.browseClients.status",
      "name": "browseClientsState",
      "kind": "actionStatus",
      "actionRef": "browseClients",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.clientManagement.input.browseClients.searchName",
      "name": "browseClientsSearchName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "browseClients",
        "direction": "input",
        "field": "searchName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.browseClients.filterPortalAccess",
      "name": "browseClientsFilterPortalAccess",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "browseClients",
        "direction": "input",
        "field": "filterPortalAccess"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.data.browseClients",
      "name": "browseClientsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "browseClients",
        "direction": "output"
      },
      "outputShape": "paginated",
      "collection": false,
      "defaultValue": {
        "items": [],
        "total": 0
      }
    },
    {
      "stateKey": "ui.clientManagement.action.createClient.status",
      "name": "createClientState",
      "kind": "actionStatus",
      "actionRef": "createClient",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.clientManagement.input.createClient.name",
      "name": "createClientName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createClient",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.createClient.companyName",
      "name": "createClientCompanyName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createClient",
        "direction": "input",
        "field": "companyName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.createClient.email",
      "name": "createClientEmail",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createClient",
        "direction": "input",
        "field": "email"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.createClient.phone",
      "name": "createClientPhone",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createClient",
        "direction": "input",
        "field": "phone"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.createClient.portalAccessEnabled",
      "name": "createClientPortalAccessEnabled",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createClient",
        "direction": "input",
        "field": "portalAccessEnabled"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.createClient.billingAddress",
      "name": "createClientBillingAddress",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createClient",
        "direction": "input",
        "field": "billingAddress"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.action.updateClient.status",
      "name": "updateClientState",
      "kind": "actionStatus",
      "actionRef": "updateClient",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.clientManagement.input.updateClient.clientId",
      "name": "updateClientClientId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "updateClient",
        "direction": "input",
        "field": "clientId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.updateClient.name",
      "name": "updateClientName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateClient",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.updateClient.companyName",
      "name": "updateClientCompanyName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateClient",
        "direction": "input",
        "field": "companyName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.updateClient.email",
      "name": "updateClientEmail",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateClient",
        "direction": "input",
        "field": "email"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.updateClient.phone",
      "name": "updateClientPhone",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateClient",
        "direction": "input",
        "field": "phone"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.updateClient.portalAccessEnabled",
      "name": "updateClientPortalAccessEnabled",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateClient",
        "direction": "input",
        "field": "portalAccessEnabled"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.input.updateClient.billingAddress",
      "name": "updateClientBillingAddress",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateClient",
        "direction": "input",
        "field": "billingAddress"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.output.createClient",
      "name": "OutputCreateClient",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.clientManagement.output.updateClient",
      "name": "OutputUpdateClient",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.clientManagement.layout.fld-sum-billingAddress",
      "name": "LayoutFldSumBillingAddress",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientManagement.layout.fld-sum-updatedAt",
      "name": "LayoutFldSumUpdatedAt",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "browseClients",
      "kind": "query",
      "commandRef": "browseClients",
      "routeKey": "buildFlowFsm.browseClients.browseClients",
      "purpose": "Browse clients",
      "methodName": "loadBrowseClients",
      "handlerName": "handleBrowseClientsClick",
      "inputStateKeys": [
        "ui.clientManagement.input.browseClients.searchName",
        "ui.clientManagement.input.browseClients.filterPortalAccess"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.clientManagement.data.browseClients"
      ],
      "statusStateKey": "ui.clientManagement.action.browseClients.status"
    },
    {
      "actionId": "createClient",
      "kind": "command",
      "commandRef": "createClient",
      "routeKey": "buildFlowFsm.createClient.createClient",
      "purpose": "Create a client",
      "methodName": "createClient",
      "handlerName": "handleCreateClientClick",
      "inputStateKeys": [
        "ui.clientManagement.input.createClient.name",
        "ui.clientManagement.input.createClient.companyName",
        "ui.clientManagement.input.createClient.email",
        "ui.clientManagement.input.createClient.phone",
        "ui.clientManagement.input.createClient.portalAccessEnabled",
        "ui.clientManagement.input.createClient.billingAddress"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.clientManagement.output.createClient"
      ],
      "statusStateKey": "ui.clientManagement.action.createClient.status",
      "refreshActionIds": [
        "browseClients"
      ]
    },
    {
      "actionId": "updateClient",
      "kind": "command",
      "commandRef": "updateClient",
      "routeKey": "buildFlowFsm.updateClient.updateClient",
      "purpose": "Edit client details",
      "methodName": "updateClient",
      "handlerName": "handleUpdateClientClick",
      "inputStateKeys": [
        "ui.clientManagement.input.updateClient.clientId",
        "ui.clientManagement.input.updateClient.name",
        "ui.clientManagement.input.updateClient.companyName",
        "ui.clientManagement.input.updateClient.email",
        "ui.clientManagement.input.updateClient.phone",
        "ui.clientManagement.input.updateClient.portalAccessEnabled",
        "ui.clientManagement.input.updateClient.billingAddress"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.clientManagement.input.updateClient.clientId"
      ],
      "outputStateKeys": [
        "ui.clientManagement.output.updateClient"
      ],
      "statusStateKey": "ui.clientManagement.action.updateClient.status",
      "refreshActionIds": [
        "browseClients"
      ]
    },
    {
      "actionId": "set.browseClientsSearchName",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.browseClients.searchName",
      "methodName": "setBrowseClientsSearchName",
      "handlerName": "handleBrowseClientsSearchNameChange"
    },
    {
      "actionId": "set.browseClientsFilterPortalAccess",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.browseClients.filterPortalAccess",
      "methodName": "setBrowseClientsFilterPortalAccess",
      "handlerName": "handleBrowseClientsFilterPortalAccessChange"
    },
    {
      "actionId": "set.createClientName",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.createClient.name",
      "methodName": "setCreateClientName",
      "handlerName": "handleCreateClientNameChange"
    },
    {
      "actionId": "set.createClientCompanyName",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.createClient.companyName",
      "methodName": "setCreateClientCompanyName",
      "handlerName": "handleCreateClientCompanyNameChange"
    },
    {
      "actionId": "set.createClientEmail",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.createClient.email",
      "methodName": "setCreateClientEmail",
      "handlerName": "handleCreateClientEmailChange"
    },
    {
      "actionId": "set.createClientPhone",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.createClient.phone",
      "methodName": "setCreateClientPhone",
      "handlerName": "handleCreateClientPhoneChange"
    },
    {
      "actionId": "set.createClientPortalAccessEnabled",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.createClient.portalAccessEnabled",
      "methodName": "setCreateClientPortalAccessEnabled",
      "handlerName": "handleCreateClientPortalAccessEnabledChange"
    },
    {
      "actionId": "set.createClientBillingAddress",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.createClient.billingAddress",
      "methodName": "setCreateClientBillingAddress",
      "handlerName": "handleCreateClientBillingAddressChange"
    },
    {
      "actionId": "set.updateClientClientId",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.updateClient.clientId",
      "methodName": "setUpdateClientClientId",
      "handlerName": "handleUpdateClientClientIdChange"
    },
    {
      "actionId": "set.updateClientName",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.updateClient.name",
      "methodName": "setUpdateClientName",
      "handlerName": "handleUpdateClientNameChange"
    },
    {
      "actionId": "set.updateClientCompanyName",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.updateClient.companyName",
      "methodName": "setUpdateClientCompanyName",
      "handlerName": "handleUpdateClientCompanyNameChange"
    },
    {
      "actionId": "set.updateClientEmail",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.updateClient.email",
      "methodName": "setUpdateClientEmail",
      "handlerName": "handleUpdateClientEmailChange"
    },
    {
      "actionId": "set.updateClientPhone",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.updateClient.phone",
      "methodName": "setUpdateClientPhone",
      "handlerName": "handleUpdateClientPhoneChange"
    },
    {
      "actionId": "set.updateClientPortalAccessEnabled",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.updateClient.portalAccessEnabled",
      "methodName": "setUpdateClientPortalAccessEnabled",
      "handlerName": "handleUpdateClientPortalAccessEnabledChange"
    },
    {
      "actionId": "set.updateClientBillingAddress",
      "kind": "stateSetter",
      "stateKey": "ui.clientManagement.input.updateClient.billingAddress",
      "methodName": "setUpdateClientBillingAddress",
      "handlerName": "handleUpdateClientBillingAddressChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "browseClients",
      "stateKey": "ui.clientManagement.data.browseClients"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "en",
    "activeLocales": [
      "en"
    ]
  },
  "i18n": {
    "page.title": "Client Management",
    "section.clientManagement": "Client Management",
    "section.clientSummary": "Client Summary",
    "intention.queryList.title": "Browse Clients",
    "intention.createForm.title": "Create Client",
    "intention.updateForm.title": "Edit Client",
    "intention.summary.title": "Client Details",
    "column.clientId": "Client ID",
    "column.name": "Name",
    "column.companyName": "Company",
    "column.email": "Email",
    "column.phone": "Phone",
    "column.portalAccessEnabled": "Portal Access",
    "column.createdAt": "Created",
    "filter.searchName": "Search by name",
    "filter.filterPortalAccess": "Portal access only",
    "field.name": "Contact name",
    "field.companyName": "Company name",
    "field.email": "Email",
    "field.phone": "Phone",
    "field.portalAccessEnabled": "Enable portal access",
    "field.billingAddress": "Billing address",
    "field.clientId": "Client ID",
    "field.createdAt": "Created at",
    "field.updatedAt": "Updated at",
    "action.createClient": "Add Client",
    "action.updateClient": "Edit",
    "action.browseClients": "Search",
    "empty.clientList": "No clients found. Adjust your filters or create a new client.",
    "empty.createForm": "Fill in the client details to create a new record.",
    "empty.updateForm": "Select a client from the list to edit their details.",
    "empty.summary": "Select a client to view their details.",
    "org.clientList.title": "Browse, filter and select clients from a paginated table; create new clients via toolbar; edit existing clients via row action",
    "org.clientSummary.title": "Review the selected client's details and the result of the last create or update action"
  },
  "automation": {
    "statePrefix": "ui.clientManagement",
    "stateKeys": [
      "ui.clientManagement.status",
      "ui.clientManagement.action.browseClients.status",
      "ui.clientManagement.input.browseClients.searchName",
      "ui.clientManagement.input.browseClients.filterPortalAccess",
      "ui.clientManagement.data.browseClients",
      "ui.clientManagement.action.createClient.status",
      "ui.clientManagement.input.createClient.name",
      "ui.clientManagement.input.createClient.companyName",
      "ui.clientManagement.input.createClient.email",
      "ui.clientManagement.input.createClient.phone",
      "ui.clientManagement.input.createClient.portalAccessEnabled",
      "ui.clientManagement.input.createClient.billingAddress",
      "ui.clientManagement.action.updateClient.status",
      "ui.clientManagement.input.updateClient.clientId",
      "ui.clientManagement.input.updateClient.name",
      "ui.clientManagement.input.updateClient.companyName",
      "ui.clientManagement.input.updateClient.email",
      "ui.clientManagement.input.updateClient.phone",
      "ui.clientManagement.input.updateClient.portalAccessEnabled",
      "ui.clientManagement.input.updateClient.billingAddress",
      "ui.clientManagement.output.createClient",
      "ui.clientManagement.output.updateClient",
      "ui.clientManagement.layout.fld-sum-billingAddress",
      "ui.clientManagement.layout.fld-sum-updatedAt"
    ],
    "actionIds": [
      "browseClients",
      "createClient",
      "updateClient",
      "set.browseClientsSearchName",
      "set.browseClientsFilterPortalAccess",
      "set.createClientName",
      "set.createClientCompanyName",
      "set.createClientEmail",
      "set.createClientPhone",
      "set.createClientPortalAccessEnabled",
      "set.createClientBillingAddress",
      "set.updateClientClientId",
      "set.updateClientName",
      "set.updateClientCompanyName",
      "set.updateClientEmail",
      "set.updateClientPhone",
      "set.updateClientPortalAccessEnabled",
      "set.updateClientBillingAddress"
    ]
  }
};

export const pipeline = [
  {
    "id": "clientManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/clientManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/clientManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/clientManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "clientManagement__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
