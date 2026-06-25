/// <mls fileReference="_102048_/l2/cafeFlow/orderCancelConfirm.defs.ts" enhancement="_blank"/>

export const orderCancelConfirmPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "orderCancelConfirm",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "orderCancelConfirm",
      "pageName": "Confirmar cancelamento do pedido",
      "actor": "attendantCashier",
      "purpose": "Cancelar um pedido com motivo, respeitando regras de status.",
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
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido a cancelar.",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "orderDetail",
          "trigger": "Tocar em \"Cancelar pedido\""
        },
        {
          "direction": "outbound",
          "pageId": "ordersTracker",
          "trigger": "Após cancelar com sucesso"
        },
        {
          "direction": "outbound",
          "pageId": "orderCancelBlocked",
          "trigger": "Se cancelamento não for permitido"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "OrderSummaryCard",
              "purpose": "Exibir dados essenciais do pedido para confirmação do cancelamento.",
              "userActions": [
                "Visualizar número e status",
                "Voltar ao detalhe"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.orderNumber",
                "Order.type",
                "Order.status",
                "Order.totalAmount",
                "Order.createdAt",
                "Order.customerName",
                "Order.diningTableId"
              ],
              "writesFields": [],
              "rulesApplied": [
                "RULE_orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Motivo do cancelamento",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "CancellationReasonForm",
              "purpose": "Registrar o motivo do cancelamento antes de confirmar.",
              "userActions": [
                "Selecionar motivo",
                "Editar motivo"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.cancellationReason"
              ],
              "writesFields": [
                "Order.cancellationReason"
              ],
              "rulesApplied": [
                "RULE_orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmação",
          "mode": "action",
          "organisms": [
            {
              "organismName": "CancelOrderActions",
              "purpose": "Confirmar o cancelamento ou voltar sem cancelar.",
              "userActions": [
                "Confirmar cancelamento",
                "Voltar ao detalhe"
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
                "Order.cancelledAt",
                "Order.cancellationReason"
              ],
              "rulesApplied": [
                "RULE_orderStatusTransitionsControlled"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderById",
        "purpose": "Carregar detalhes do pedido para revisão antes do cancelamento.",
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
            "name": "totalAmount",
            "type": "money"
          },
          {
            "name": "createdAt",
            "type": "datetime"
          },
          {
            "name": "customerName",
            "type": "string"
          },
          {
            "name": "diningTableId",
            "type": "uuid"
          },
          {
            "name": "cancellationReason",
            "type": "text"
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
        "commandName": "cancelOrder",
        "purpose": "Cancelar o pedido registrando o motivo e atualizando o status.",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "motivoCancelamento",
            "type": "text",
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
            "name": "cancelledAt",
            "type": "datetime"
          },
          {
            "name": "cancellationReason",
            "type": "text"
          }
        ],
        "readsEntities": [
          "Order",
          "InventoryTransaction"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "order",
          "inventory_transaction"
        ],
        "writesTables": [
          "order"
        ],
        "usecaseRefs": [
          "cancelOrder"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "RULE_orderStatusTransitionsControlled"
        ]
      }
    ]
  }
} as const;

export default orderCancelConfirmPagePlan;
