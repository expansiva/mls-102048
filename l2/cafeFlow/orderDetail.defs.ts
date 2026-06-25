/// <mls fileReference="_102048_/l2/cafeFlow/orderDetail.defs.ts" enhancement="_blank"/>

export const orderDetailPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "orderDetail",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 100,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "orderDetail",
      "pageName": "Detalhe do pedido",
      "actor": "attendantCashier",
      "purpose": "Ver itens e status do pedido, marcar entregue/retirado, fechar como venda ou cancelar (quando permitido).",
      "capabilities": [
        "trackOrderLifecycle",
        "autoInventoryDeduction"
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
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam"
          ],
          "description": "Identificador do pedido para carregar detalhes.",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "ordersTracker",
          "trigger": "Abrir pedido"
        },
        {
          "direction": "outbound",
          "pageId": "posCheckout",
          "trigger": "Tocar em \"Fechar pedido\""
        },
        {
          "direction": "outbound",
          "pageId": "orderCancelConfirm",
          "trigger": "Tocar em \"Cancelar pedido\""
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderHeaderCard",
              "purpose": "Exibir número, tipo (mesa/takeout), cliente/mesa e total do pedido.",
              "userActions": [],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.orderNumber",
                "Order.type",
                "Order.customerName",
                "Order.diningTableId",
                "Order.totalAmount",
                "Order.status",
                "Order.createdAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Itens do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderItemsList",
              "purpose": "Listar itens, quantidades, observações e preços snapshot do pedido.",
              "userActions": [
                "Ver itens"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.totalAmount"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Status e ações",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderStatusTimeline",
              "purpose": "Mostrar status atual e timestamps relevantes.",
              "userActions": [
                "Ver status e itens"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status",
                "Order.sentToKitchenAt",
                "Order.readyAt",
                "Order.deliveredAt",
                "Order.closedAt",
                "Order.cancelledAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            },
            {
              "organismName": "markDeliveredAction",
              "purpose": "Marcar pedido como entregue/retirado quando estiver pronto.",
              "userActions": [
                "Marcar entregue/retirado"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status",
                "Order.id"
              ],
              "writesFields": [
                "Order.status",
                "Order.deliveredAt"
              ],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            },
            {
              "organismName": "nextStepsActions",
              "purpose": "Encaminhar para fechamento do pedido ou cancelamento conforme permitido.",
              "userActions": [
                "Iniciar fechamento (checkout)",
                "Iniciar cancelamento"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status",
                "Order.id"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderById",
        "purpose": "Carregar detalhes do pedido para atendimento.",
        "kind": "query",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          }
        ],
        "output": [
          {
            "name": "order",
            "type": "Order"
          },
          {
            "name": "diningTable",
            "type": "DiningTable"
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
        "rulesApplied": []
      },
      {
        "commandName": "markOrderDelivered",
        "purpose": "Marcar pedido como entregue/retirado quando estiver pronto.",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          }
        ],
        "output": [
          {
            "name": "order",
            "type": "Order"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "order"
        ],
        "writesTables": [
          "order"
        ],
        "usecaseRefs": [
          "markOrderDelivered"
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

export default orderDetailPagePlan;
