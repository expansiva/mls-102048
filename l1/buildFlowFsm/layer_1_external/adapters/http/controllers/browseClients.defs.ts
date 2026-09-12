/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseClients.defs.ts" enhancement="_blank"/>

export const browseClientsController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "browseClients",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "browseClients",
    "controllerName": "BrowseClientsController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmBrowseClientsHandler",
        "command": "browseClients",
        "usecaseRef": "browseClients",
        "inputTypeName": "BrowseClientsInput",
        "kind": "query",
        "inputContract": [
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
        "accessPattern": {
          "kind": "list",
          "description": "",
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
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.browseClients.browseClients",
        "handlerName": "buildFlowFsmBrowseClientsHandler"
      }
    ]
  }
} as const;

export default browseClientsController;

export const pipeline = [
  {
    "id": "browseClients__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseClients.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/browseClients.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseClients.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
