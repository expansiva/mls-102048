/// <mls fileReference="_102048_/l2/cafeFlow/posCheckout.defs.ts" enhancement="_blank"/>

export const posCheckoutPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posCheckout",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 98,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posCheckout",
      "pageName": "Fechar pedido (checkout)",
      "actor": "attendantCashier",
      "purpose": "Selecionar forma de pagamento, confirmar total e fechar o pedido como venda, disparando a baixa automática de estoque.",
      "capabilities": [
        "autoInventoryDeduction",
        "trackOrderLifecycle"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "orderLifecycle",
          "inventoryAdjustment"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "recipe",
        "inventoryItem"
      ],
      "pageInputs": [
        {
          "name": "orderId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido a fechar",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "orderDetail",
          "trigger": "Tocar em \"Fechar pedido\""
        },
        {
          "direction": "outbound",
          "pageId": "inventoryDeductionBlock",
          "trigger": "Se baixa automática bloquear por saldo insuficiente"
        },
        {
          "direction": "outbound",
          "pageId": "ordersTracker",
          "trigger": "Após fechar como venda com sucesso"
        }
      ],
      "sections": [
        {
          "sectionName": "Selecionar pagamento",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "OrderSummary",
              "purpose": "Exibir itens e total final do pedido para conferência.",
              "userActions": [
                "Revisar itens e total"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.orderNumber",
                "Order.type",
                "Order.status",
                "Order.customerName",
                "Order.totalAmount"
              ],
              "writesFields": [],
              "rulesApplied": [
                "inventoryDeductionHappensOnSaleEvent"
              ]
            },
            {
              "organismName": "PaymentMethodSelector",
              "purpose": "Selecionar forma de pagamento para fechar a venda.",
              "userActions": [
                "Selecionar forma de pagamento"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.totalAmount"
              ],
              "writesFields": [
                "Order.details.paymentMethod"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Confirmar total",
          "mode": "review",
          "organisms": [
            {
              "organismName": "TotalConfirmation",
              "purpose": "Confirmar o total calculado antes do fechamento.",
              "userActions": [
                "Confirmar total"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.totalAmount"
              ],
              "writesFields": [
                "Order.details.totalConfirmed"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Finalizar venda",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "CloseOrderAction",
              "purpose": "Finalizar o pedido como venda e executar a baixa automática de estoque.",
              "userActions": [
                "Finalizar venda"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.totalAmount",
                "Order.status"
              ],
              "writesFields": [
                "Order.status",
                "Order.closedAt"
              ],
              "rulesApplied": [
                "inventoryDeductionHappensOnSaleEvent",
                "inventoryCannotGoNegativeByDefault"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderById",
        "purpose": "Carregar totais finais e itens antes do fechamento.",
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
            "name": "orderType",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "customerName",
            "type": "string"
          },
          {
            "name": "totalAmount",
            "type": "money"
          },
          {
            "name": "itemsSummary",
            "type": "string"
          }
        ],
        "readsEntities": [
          "Order",
          "DiningTable"
        ],
        "writesEntities": [],
        "readsTables": [
          "order",
          "order_item",
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
        "commandName": "closeOrderAsSaleAndDeductInventory",
        "purpose": "Fechar o pedido como venda e executar baixa de ingredientes conforme receita.",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "paymentMethod",
            "type": "string",
            "required": true
          },
          {
            "name": "totalConfirmed",
            "type": "boolean",
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
            "name": "closedAt",
            "type": "datetime"
          },
          {
            "name": "inventoryDeductionStatus",
            "type": "string"
          }
        ],
        "readsEntities": [
          "Order",
          "DailyShift",
          "InventoryBalanceSnapshot"
        ],
        "writesEntities": [
          "Order",
          "InventoryTransaction",
          "InventoryBalanceSnapshot"
        ],
        "readsTables": [
          "order",
          "daily_shift",
          "inventory_balance_snapshot"
        ],
        "writesTables": [
          "order",
          "inventory_transaction",
          "inventory_balance_snapshot",
          "today_sales_metrics",
          "top_selling_items_metrics",
          "low_stock_metrics",
          "shift_summary_metrics"
        ],
        "usecaseRefs": [
          "closeOrderAsSaleAndDeductInventory"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "inventoryDeductionHappensOnSaleEvent",
          "inventoryCannotGoNegativeByDefault"
        ]
      }
    ]
  }
} as const;

export default posCheckoutPagePlan;
