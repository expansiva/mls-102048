/// <mls fileReference="_102048_/l2/cafeFlow/orderCancelBlocked.defs.ts" enhancement="_blank"/>

export const orderCancelBlockedPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "orderCancelBlocked",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "orderCancelBlocked",
      "pageName": "Cancelamento não permitido (bloqueio)",
      "actor": "attendantCashier",
      "purpose": "Explicar por que o pedido não pode ser cancelado no status atual e indicar alternativas (ex.: estorno fora do MVP).",
      "capabilities": [
        "trackOrderLifecycle"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "orderLifecycle"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "orderId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido bloqueado para cancelamento.",
          "entityRef": "Order",
          "fieldRef": "order.id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "orderCancelConfirm",
          "trigger": "Ao receber erro de cancelamento"
        },
        {
          "direction": "outbound",
          "pageId": "orderDetail",
          "trigger": "Voltar ao pedido",
          "description": "Retornar para o detalhe do pedido após entender o bloqueio."
        }
      ],
      "sections": [
        {
          "sectionName": "Motivo do bloqueio",
          "mode": "view",
          "organisms": [
            {
              "organismName": "orderCancelBlockReason",
              "purpose": "Exibir status atual do pedido e a explicação do bloqueio de cancelamento.",
              "userActions": [
                "Entender motivo do bloqueio"
              ],
              "requiredEntities": [
                "order"
              ],
              "readsFields": [
                "order.id",
                "order.status",
                "order.cancelAllowed",
                "order.cancelBlockReason",
                "order.updatedAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Resumo do pedido",
          "mode": "view",
          "organisms": [
            {
              "organismName": "orderSummaryCompact",
              "purpose": "Exibir identificação do pedido, mesa/takeout e total para contextualizar o bloqueio.",
              "userActions": [],
              "requiredEntities": [
                "order"
              ],
              "readsFields": [
                "order.id",
                "order.orderNumber",
                "order.orderType",
                "order.tableName",
                "order.totalAmount",
                "order.itemCount"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Ações",
          "mode": "view",
          "organisms": [
            {
              "organismName": "returnToOrderDetailAction",
              "purpose": "Permitir retornar ao detalhe do pedido para seguir o fluxo adequado.",
              "userActions": [
                "Voltar ao detalhe do pedido"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderById",
        "purpose": "Recarregar status atual para exibir motivo do bloqueio.",
        "kind": "query",
        "input": [
          {
            "name": "orderId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string"
          },
          {
            "name": "orderStatus",
            "type": "string"
          },
          {
            "name": "cancelAllowed",
            "type": "boolean"
          },
          {
            "name": "cancelBlockReason",
            "type": "string"
          },
          {
            "name": "orderNumber",
            "type": "string"
          },
          {
            "name": "orderType",
            "type": "string"
          },
          {
            "name": "tableName",
            "type": "string"
          },
          {
            "name": "totalAmount",
            "type": "number"
          },
          {
            "name": "itemCount",
            "type": "number"
          },
          {
            "name": "updatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Order",
          "DiningTable"
        ],
        "writesEntities": [],
        "readsTables": [
          "order",
          "dining_table"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "getOrderById"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "orderStatusTransitionsControlled"
        ]
      }
    ]
  }
} as const;

export default orderCancelBlockedPagePlan;
