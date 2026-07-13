/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/reviewChangeOrder.defs.ts" enhancement="_blank"/>

export const reviewChangeOrderController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "reviewChangeOrder",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "changeOrderLifecycle",
    "controllerName": "ReviewChangeOrderController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmReviewChangeOrderHandler",
        "command": "reviewChangeOrder",
        "usecaseRef": "reviewChangeOrder",
        "inputTypeName": "ReviewChangeOrderInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "changeOrderId",
            "fieldRef": "ChangeOrder.changeOrderId",
            "required": true,
            "source": "routeParam",
            "description": "Identifier of the change order the client is reviewing, provided via the URL route."
          },
          {
            "inputId": "decision",
            "fieldRef": "ChangeOrder.status",
            "required": true,
            "source": "userInput",
            "description": "The client's decision: approve or reject the change order."
          },
          {
            "inputId": "rejectionReason",
            "fieldRef": "ChangeOrder.rejectionReason",
            "required": false,
            "source": "userInput",
            "description": "Optional reason the client provides when rejecting the change order."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "ChangeOrder.changeOrderId",
            "source": "routeParam",
            "originRef": "routeParam.changeOrderId",
            "description": "The change order id is extracted from the URL route parameter to identify which sent change order the client is reviewing."
          },
          {
            "targetRef": "ChangeOrder.approvedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "When the client approves, the server sets approvedAt to the current server timestamp."
          },
          {
            "targetRef": "ChangeOrder.rejectedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "When the client rejects, the server sets rejectedAt to the current server timestamp."
          },
          {
            "targetRef": "ChangeOrder.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The server refreshes updatedAt to the current server timestamp on every review action."
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
            "ChangeOrder.title",
            "ChangeOrder.scopeDescription",
            "ChangeOrder.amount",
            "ChangeOrder.status",
            "ChangeOrder.sentAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder",
        "handlerName": "buildFlowFsmReviewChangeOrderHandler"
      }
    ]
  }
} as const;

export default reviewChangeOrderController;

export const pipeline = [
  {
    "id": "reviewChangeOrder__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/reviewChangeOrder.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/reviewChangeOrder.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/reviewChangeOrder.d.ts",
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
