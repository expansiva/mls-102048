/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/sendChangeOrder.defs.ts" enhancement="_blank"/>

export const sendChangeOrderController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "sendChangeOrder",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "changeOrderLifecycle",
    "controllerName": "SendChangeOrderController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmSendChangeOrderHandler",
        "command": "sendChangeOrder",
        "usecaseRef": "sendChangeOrder",
        "inputTypeName": "SendChangeOrderInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "changeOrderId",
            "fieldRef": "ChangeOrder.changeOrderId",
            "required": true,
            "source": "selectedEntity",
            "description": "The change order the project manager selected to send to the client."
          },
          {
            "inputId": "sentAt",
            "fieldRef": "ChangeOrder.sentAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp recorded when the change order is sent to the client."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "ChangeOrder.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp of the last modification, updated when the change order is sent."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "ChangeOrder.changeOrderId",
            "source": "selectedEntity",
            "originRef": "ChangeOrder.changeOrderId",
            "description": "The change order selected by the project manager from the project's change order list, resolved from the current selection context."
          },
          {
            "targetRef": "ChangeOrder.sentAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The current server timestamp captured at the moment the send action is executed."
          },
          {
            "targetRef": "ChangeOrder.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The current server timestamp captured at the moment the send action is executed, used to update the record's last-modified timestamp."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "ChangeOrder",
          "keyField": "ChangeOrder.changeOrderId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "ChangeOrder.changeOrderId",
            "ChangeOrder.status",
            "ChangeOrder.sentAt",
            "ChangeOrder.updatedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.changeOrderLifecycle.sendChangeOrder",
        "handlerName": "buildFlowFsmSendChangeOrderHandler"
      }
    ]
  }
} as const;

export default sendChangeOrderController;

export const pipeline = [
  {
    "id": "sendChangeOrder__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/sendChangeOrder.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/sendChangeOrder.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/sendChangeOrder.d.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.ts"
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
