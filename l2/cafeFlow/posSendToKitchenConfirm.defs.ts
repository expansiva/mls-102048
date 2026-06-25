/// <mls fileReference="_102048_/l2/cafeFlow/posSendToKitchenConfirm.defs.ts" enhancement="_blank"/>

export const posSendToKitchenConfirmPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posSendToKitchenConfirm",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 100,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posSendToKitchenConfirm",
      "pageName": "Confirmar envio para cozinha",
      "actor": "attendantCashier",
      "purpose": "Confirmar o envio do pedido para a fila da cozinha (KDS) e mudar o status do pedido.",
      "capabilities": [
        "takeOrderPos"
      ],
      "flowRefs": {
        "experienceFlows": [
          "posOrderTaking"
        ],
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
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido em rascunho a ser enviado para a cozinha.",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "posOrderSummary",
          "trigger": "Tocar em \"Enviar para cozinha\""
        },
        {
          "direction": "outbound",
          "pageId": "ordersTracker",
          "trigger": "Após envio bem-sucedido para acompanhar status"
        },
        {
          "direction": "outbound",
          "pageId": "kdsBoard",
          "trigger": "Pedido passa a aparecer no KDS (para cozinha)"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "OrderSummaryCard",
              "purpose": "Exibir número do pedido, tipo (mesa/takeout), itens e total para revisão final antes do envio.",
              "userActions": [],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.orderNumber",
                "Order.type",
                "Order.status",
                "Order.diningTableId",
                "Order.customerName",
                "Order.notes",
                "Order.totalAmount",
                "Order.updatedAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmação de envio",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "SendToKitchenConfirmation",
              "purpose": "Confirmar envio do pedido para a cozinha ou cancelar e voltar ao resumo.",
              "userActions": [
                "Confirmar envio",
                "Cancelar e voltar ao resumo"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.status"
              ],
              "writesFields": [
                "Order.status",
                "Order.sentToKitchenAt",
                "Order.updatedAt"
              ],
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
        "purpose": "Consultar detalhes do pedido para exibição no resumo antes do envio.",
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
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "orderNumber",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "diningTableId",
            "type": "uuid"
          },
          {
            "name": "customerName",
            "type": "string"
          },
          {
            "name": "notes",
            "type": "string"
          },
          {
            "name": "totalAmount",
            "type": "money"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
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
        "commandName": "sendOrderToKitchen",
        "purpose": "Transicionar o pedido de draft para sentToKitchen e publicar na fila do KDS.",
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
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "sentToKitchenAt",
            "type": "datetime"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "Order",
          "DailyShift"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "order",
          "daily_shift"
        ],
        "writesTables": [
          "order"
        ],
        "usecaseRefs": [
          "sendOrderToKitchen"
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

export default posSendToKitchenConfirmPagePlan;
