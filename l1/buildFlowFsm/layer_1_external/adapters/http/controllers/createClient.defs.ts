/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createClient.defs.ts" enhancement="_blank"/>

export const createClientController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "createClient",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "createClient",
    "controllerName": "CreateClientController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmCreateClientHandler",
        "command": "createClient",
        "usecaseRef": "createClient",
        "inputTypeName": "CreateClientInput",
        "kind": "create",
        "inputContract": [
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
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
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
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.createClient.createClient",
        "handlerName": "buildFlowFsmCreateClientHandler"
      }
    ]
  }
} as const;

export default createClientController;

export const pipeline = [
  {
    "id": "createClient__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createClient.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/createClient.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createClient.d.ts"
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
