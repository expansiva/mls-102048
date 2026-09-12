/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateClient.defs.ts" enhancement="_blank"/>

export const updateClientController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "updateClient",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "updateClient",
    "controllerName": "UpdateClientController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmUpdateClientHandler",
        "command": "updateClient",
        "usecaseRef": "updateClient",
        "inputTypeName": "UpdateClientInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "clientId",
            "fieldRef": "Client.clientId",
            "required": true,
            "source": "selectedEntity",
            "description": "The identifier of the client record being edited."
          },
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
            "description": "Toggle indicating whether the client may log in to the portal using platform authentication."
          },
          {
            "inputId": "billingAddress",
            "fieldRef": "Client.billingAddress",
            "required": false,
            "source": "userInput",
            "description": "Postal address used on informational invoices sent to the client."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Client.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp set to the current time when the client record is modified."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Client.clientId",
            "source": "selectedEntity",
            "originRef": "Client.clientId",
            "description": "The clientId of the client record currently selected in the admin's workspace, resolved from the selected entity context."
          },
          {
            "targetRef": "Client.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The server-side current timestamp applied at the moment the update is persisted."
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
            "Client.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.updateClient.updateClient",
        "handlerName": "buildFlowFsmUpdateClientHandler"
      }
    ]
  }
} as const;

export default updateClientController;

export const pipeline = [
  {
    "id": "updateClient__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateClient.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/updateClient.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateClient.d.ts"
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
