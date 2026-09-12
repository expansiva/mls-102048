/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientManagement",
  "pageName": "Client Management",
  "baseClassName": "BuildFlowFsmClientManagementBase",
  "actor": "companyAdmin",
  "purpose": "Executar Client Management.",
  "capabilities": [
    "browseClients",
    "createClient",
    "updateClient"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
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
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec-clientManagement",
      "type": "section",
      "sectionName": "Client Management",
      "titleKey": "section.clientManagement",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-clientList",
          "type": "organism",
          "organismName": "ClientList",
          "titleKey": "org.clientList.title",
          "purpose": "Browse, filter and select clients from a paginated table; create new clients via toolbar; edit existing clients via row action.",
          "userActions": [
            "browseClients",
            "createClient",
            "updateClient"
          ],
          "requiredEntities": [
            "Client"
          ],
          "readsFields": [
            "clientId",
            "name",
            "companyName",
            "email",
            "phone",
            "portalAccessEnabled",
            "createdAt"
          ],
          "writesFields": [
            "name",
            "companyName",
            "email",
            "phone",
            "portalAccessEnabled",
            "billingAddress"
          ],
          "rulesApplied": [
            "projectRequiresClient",
            "clientAccessViaLinksOrAuth"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-queryList",
              "intent": "queryList",
              "stateKey": "ui.clientManagement.data.browseClients",
              "action": "browseClients",
              "submitAction": "browseClients",
              "order": 10
            },
            {
              "id": "intent-createForm",
              "intent": "commandForm",
              "action": "createClient",
              "submitAction": "createClient",
              "order": 20
            },
            {
              "id": "intent-updateForm",
              "intent": "commandForm",
              "action": "updateClient",
              "submitAction": "updateClient",
              "order": 30
            }
          ]
        }
      ]
    },
    {
      "id": "sec-summary",
      "type": "section",
      "sectionName": "Client Summary",
      "titleKey": "section.clientSummary",
      "mode": "read",
      "order": 20,
      "organisms": [
        {
          "id": "org-clientSummary",
          "type": "organism",
          "organismName": "ClientSummary",
          "titleKey": "org.clientSummary.title",
          "purpose": "Review the selected client's details and the result of the last create or update action.",
          "userActions": [
            "browseClients",
            "createClient",
            "updateClient"
          ],
          "requiredEntities": [
            "Client"
          ],
          "readsFields": [
            "clientId",
            "name",
            "companyName",
            "email",
            "phone",
            "portalAccessEnabled",
            "billingAddress",
            "createdAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "projectRequiresClient",
            "clientAccessViaLinksOrAuth"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-summary",
              "intent": "summary",
              "action": "browseClients",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "page11-tabular_classic",
    "type": "page",
    "sections": [
      {
        "id": "sec-clientManagement",
        "type": "section",
        "sectionName": "Client Management",
        "titleKey": "section.clientManagement",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-clientList",
            "type": "organism",
            "organismName": "ClientList",
            "titleKey": "org.clientList.title",
            "purpose": "Browse, filter and select clients from a paginated table; create new clients via toolbar; edit existing clients via row action.",
            "userActions": [
              "browseClients",
              "createClient",
              "updateClient"
            ],
            "requiredEntities": [
              "Client"
            ],
            "readsFields": [
              "clientId",
              "name",
              "companyName",
              "email",
              "phone",
              "portalAccessEnabled",
              "createdAt"
            ],
            "writesFields": [
              "name",
              "companyName",
              "email",
              "phone",
              "portalAccessEnabled",
              "billingAddress"
            ],
            "rulesApplied": [
              "projectRequiresClient",
              "clientAccessViaLinksOrAuth"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-queryList",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intention.queryList.title",
                "source": "browseClients",
                "binding": "query",
                "action": "browseClients",
                "submitAction": "browseClients",
                "emptyKey": "empty.clientList",
                "displayHint": "table",
                "fields": [],
                "columns": [
                  {
                    "id": "col-clientId",
                    "field": "clientId",
                    "labelKey": "column.clientId",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "col-name",
                    "field": "name",
                    "labelKey": "column.name",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "col-companyName",
                    "field": "companyName",
                    "labelKey": "column.companyName",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "col-email",
                    "field": "email",
                    "labelKey": "column.email",
                    "order": 40,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "col-phone",
                    "field": "phone",
                    "labelKey": "column.phone",
                    "order": 50,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "col-portalAccessEnabled",
                    "field": "portalAccessEnabled",
                    "labelKey": "column.portalAccessEnabled",
                    "order": 60,
                    "required": false,
                    "inputType": "boolean",
                    "format": "boolean",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "col-createdAt",
                    "field": "createdAt",
                    "labelKey": "column.createdAt",
                    "order": 70,
                    "required": false,
                    "inputType": "date",
                    "format": "date",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  }
                ],
                "filters": [
                  {
                    "id": "flt-searchName",
                    "field": "searchName",
                    "labelKey": "filter.searchName",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.input.browseClients.searchName"
                  },
                  {
                    "id": "flt-filterPortalAccess",
                    "field": "filterPortalAccess",
                    "labelKey": "filter.filterPortalAccess",
                    "order": 20,
                    "required": false,
                    "inputType": "boolean",
                    "format": "boolean",
                    "stateKey": "ui.clientManagement.input.browseClients.filterPortalAccess"
                  }
                ],
                "toolbar": [
                  {
                    "id": "tb-createClient",
                    "action": "createClient",
                    "labelKey": "action.createClient",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "createClient"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra-updateClient",
                    "action": "updateClient",
                    "labelKey": "action.updateClient",
                    "order": 10,
                    "displayHint": "inline",
                    "actionKey": "updateClient"
                  }
                ],
                "actions": [
                  {
                    "id": "act-browseClients",
                    "action": "browseClients",
                    "labelKey": "action.browseClients",
                    "order": 10,
                    "displayHint": "secondary",
                    "actionKey": "browseClients"
                  }
                ],
                "stateKey": "ui.clientManagement.data.browseClients"
              },
              {
                "id": "intent-createForm",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "intention.createForm.title",
                "source": "createClient",
                "binding": "command",
                "action": "createClient",
                "submitAction": "createClient",
                "emptyKey": "empty.createForm",
                "displayHint": "form",
                "fields": [
                  {
                    "id": "fld-create-name",
                    "field": "name",
                    "labelKey": "field.name",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.input.createClient.name"
                  },
                  {
                    "id": "fld-create-email",
                    "field": "email",
                    "labelKey": "field.email",
                    "order": 20,
                    "required": true,
                    "inputType": "email",
                    "format": "email",
                    "stateKey": "ui.clientManagement.input.createClient.email"
                  },
                  {
                    "id": "fld-create-companyName",
                    "field": "companyName",
                    "labelKey": "field.companyName",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.input.createClient.companyName"
                  },
                  {
                    "id": "fld-create-phone",
                    "field": "phone",
                    "labelKey": "field.phone",
                    "order": 40,
                    "required": false,
                    "inputType": "tel",
                    "format": "tel",
                    "stateKey": "ui.clientManagement.input.createClient.phone"
                  },
                  {
                    "id": "fld-create-portalAccessEnabled",
                    "field": "portalAccessEnabled",
                    "labelKey": "field.portalAccessEnabled",
                    "order": 50,
                    "required": true,
                    "inputType": "boolean",
                    "format": "boolean",
                    "stateKey": "ui.clientManagement.input.createClient.portalAccessEnabled"
                  },
                  {
                    "id": "fld-create-billingAddress",
                    "field": "billingAddress",
                    "labelKey": "field.billingAddress",
                    "order": 60,
                    "required": false,
                    "inputType": "textarea",
                    "format": "text",
                    "stateKey": "ui.clientManagement.input.createClient.billingAddress"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submitCreate",
                    "action": "createClient",
                    "labelKey": "action.createClient",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "createClient"
                  }
                ]
              },
              {
                "id": "intent-updateForm",
                "intent": "commandForm",
                "order": 30,
                "titleKey": "intention.updateForm.title",
                "source": "updateClient",
                "binding": "command",
                "action": "updateClient",
                "submitAction": "updateClient",
                "emptyKey": "empty.updateForm",
                "displayHint": "form",
                "fields": [
                  {
                    "id": "fld-update-clientId",
                    "field": "clientId",
                    "labelKey": "field.clientId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "format": "text",
                    "source": "selectedEntity",
                    "stateKey": "ui.clientManagement.input.updateClient.clientId"
                  },
                  {
                    "id": "fld-update-name",
                    "field": "name",
                    "labelKey": "field.name",
                    "order": 20,
                    "required": true,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.input.updateClient.name"
                  },
                  {
                    "id": "fld-update-email",
                    "field": "email",
                    "labelKey": "field.email",
                    "order": 30,
                    "required": true,
                    "inputType": "email",
                    "format": "email",
                    "stateKey": "ui.clientManagement.input.updateClient.email"
                  },
                  {
                    "id": "fld-update-companyName",
                    "field": "companyName",
                    "labelKey": "field.companyName",
                    "order": 40,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.input.updateClient.companyName"
                  },
                  {
                    "id": "fld-update-phone",
                    "field": "phone",
                    "labelKey": "field.phone",
                    "order": 50,
                    "required": false,
                    "inputType": "tel",
                    "format": "tel",
                    "stateKey": "ui.clientManagement.input.updateClient.phone"
                  },
                  {
                    "id": "fld-update-portalAccessEnabled",
                    "field": "portalAccessEnabled",
                    "labelKey": "field.portalAccessEnabled",
                    "order": 60,
                    "required": true,
                    "inputType": "boolean",
                    "format": "boolean",
                    "stateKey": "ui.clientManagement.input.updateClient.portalAccessEnabled"
                  },
                  {
                    "id": "fld-update-billingAddress",
                    "field": "billingAddress",
                    "labelKey": "field.billingAddress",
                    "order": 70,
                    "required": false,
                    "inputType": "textarea",
                    "format": "text",
                    "stateKey": "ui.clientManagement.input.updateClient.billingAddress"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-submitUpdate",
                    "action": "updateClient",
                    "labelKey": "action.updateClient",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "updateClient"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec-summary",
        "type": "section",
        "sectionName": "Client Summary",
        "titleKey": "section.clientSummary",
        "mode": "read",
        "order": 20,
        "organisms": [
          {
            "id": "org-clientSummary",
            "type": "organism",
            "organismName": "ClientSummary",
            "titleKey": "org.clientSummary.title",
            "purpose": "Review the selected client's details and the result of the last create or update action.",
            "userActions": [
              "browseClients",
              "createClient",
              "updateClient"
            ],
            "requiredEntities": [
              "Client"
            ],
            "readsFields": [
              "clientId",
              "name",
              "companyName",
              "email",
              "phone",
              "portalAccessEnabled",
              "billingAddress",
              "createdAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "projectRequiresClient",
              "clientAccessViaLinksOrAuth"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "intention.summary.title",
                "source": "browseClients",
                "binding": "query",
                "action": "browseClients",
                "emptyKey": "empty.summary",
                "displayHint": "card",
                "fields": [
                  {
                    "id": "fld-sum-clientId",
                    "field": "clientId",
                    "labelKey": "field.clientId",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "fld-sum-name",
                    "field": "name",
                    "labelKey": "field.name",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "fld-sum-companyName",
                    "field": "companyName",
                    "labelKey": "field.companyName",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "fld-sum-email",
                    "field": "email",
                    "labelKey": "field.email",
                    "order": 40,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "fld-sum-phone",
                    "field": "phone",
                    "labelKey": "field.phone",
                    "order": 50,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "fld-sum-portalAccessEnabled",
                    "field": "portalAccessEnabled",
                    "labelKey": "field.portalAccessEnabled",
                    "order": 60,
                    "required": false,
                    "inputType": "boolean",
                    "format": "boolean",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "fld-sum-billingAddress",
                    "field": "billingAddress",
                    "labelKey": "field.billingAddress",
                    "order": 70,
                    "required": false,
                    "inputType": "text",
                    "format": "text",
                    "stateKey": "ui.clientManagement.layout.fld-sum-billingAddress"
                  },
                  {
                    "id": "fld-sum-createdAt",
                    "field": "createdAt",
                    "labelKey": "field.createdAt",
                    "order": 80,
                    "required": false,
                    "inputType": "date",
                    "format": "date",
                    "stateKey": "ui.clientManagement.data.browseClients"
                  },
                  {
                    "id": "fld-sum-updatedAt",
                    "field": "updatedAt",
                    "labelKey": "field.updatedAt",
                    "order": 90,
                    "required": false,
                    "inputType": "date",
                    "format": "date",
                    "stateKey": "ui.clientManagement.layout.fld-sum-updatedAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind-browseClients",
      "source": "buildFlowFsm.browseClients.browseClients",
      "entity": "Client",
      "command": "browseClients",
      "description": "Query paginated client list with optional name and portal access filters",
      "stateKey": "ui.clientManagement.data.browseClients",
      "inputStateKeys": [
        "ui.clientManagement.input.browseClients.searchName",
        "ui.clientManagement.input.browseClients.filterPortalAccess"
      ]
    },
    {
      "id": "bind-createClient",
      "source": "buildFlowFsm.createClient.createClient",
      "entity": "Client",
      "command": "createClient",
      "description": "Create a new client record with contact and portal access details",
      "stateKey": "ui.clientManagement.output.createClient",
      "inputStateKeys": [
        "ui.clientManagement.input.createClient.name",
        "ui.clientManagement.input.createClient.companyName",
        "ui.clientManagement.input.createClient.email",
        "ui.clientManagement.input.createClient.phone",
        "ui.clientManagement.input.createClient.portalAccessEnabled",
        "ui.clientManagement.input.createClient.billingAddress"
      ]
    },
    {
      "id": "bind-updateClient",
      "source": "buildFlowFsm.updateClient.updateClient",
      "entity": "Client",
      "command": "updateClient",
      "description": "Update an existing client record with edited contact and portal access details",
      "stateKey": "ui.clientManagement.output.updateClient",
      "inputStateKeys": [
        "ui.clientManagement.input.updateClient.clientId",
        "ui.clientManagement.input.updateClient.name",
        "ui.clientManagement.input.updateClient.companyName",
        "ui.clientManagement.input.updateClient.email",
        "ui.clientManagement.input.updateClient.phone",
        "ui.clientManagement.input.updateClient.portalAccessEnabled",
        "ui.clientManagement.input.updateClient.billingAddress"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "clientManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/clientManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/clientManagement.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientManagement.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "clientManagement__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "Dashboard-first, data-dense, status-driven UI with timeline views, cost tracking panels, and mobile-friendly field logging"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
