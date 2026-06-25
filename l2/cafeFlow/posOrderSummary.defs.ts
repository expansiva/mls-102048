/// <mls fileReference="_102048_/l2/cafeFlow/posOrderSummary.defs.ts" enhancement="_blank"/>

export const posOrderSummaryPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posOrderSummary",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posOrderSummary",
      "pageName": "Resumo do pedido (POS)",
      "actor": "attendantCashier",
      "purpose": "Revisar itens/quantidades e total do pedido antes de enviar para a cozinha.",
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
          "description": "Identificador do pedido em rascunho a revisar",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "posMenuPicker",
          "trigger": "Abrir resumo"
        },
        {
          "direction": "outbound",
          "pageId": "posSendToKitchenConfirm",
          "trigger": "Tocar em \"Enviar para cozinha\""
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderHeaderSummary",
              "purpose": "Exibir cabeçalho do pedido e contexto (mesa/takeout).",
              "userActions": [
                "Ver número do pedido",
                "Ver tipo e mesa/cliente"
              ],
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
                "Order.notes"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "orderItemsReview",
              "purpose": "Revisar itens e quantidades do pedido.",
              "userActions": [
                "Ver itens",
                "Ver observações dos itens"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.totalAmount",
                "Order.items"
              ],
              "writesFields": [],
              "rulesApplied": [
                "menuPriceIsSnapshottedOnOrderItem"
              ]
            },
            {
              "organismName": "orderTotalsSummary",
              "purpose": "Exibir subtotal/total do pedido.",
              "userActions": [
                "Ver total"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.totalAmount"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Ajustes rápidos",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "orderItemsEditor",
              "purpose": "Remover ou ajustar quantidades antes do envio.",
              "userActions": [
                "Remover item",
                "Ajustar quantidade",
                "Atualizar observação de item"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.items"
              ],
              "writesFields": [
                "Order.items"
              ],
              "rulesApplied": [
                "orderStatusTransitionsControlled",
                "menuPriceIsSnapshottedOnOrderItem"
              ]
            }
          ]
        },
        {
          "sectionName": "Ações",
          "mode": "action",
          "organisms": [
            {
              "organismName": "sendToKitchenAction",
              "purpose": "Avançar para confirmação de envio à cozinha.",
              "userActions": [
                "Enviar para cozinha"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.status",
                "Order.items",
                "Order.totalAmount"
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
        "purpose": "Carregar o pedido para revisão antes de enviar.",
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
            "name": "items",
            "type": "OrderItem[]"
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
        "commandName": "addOrUpdateOrderItems",
        "purpose": "Aplicar ajustes finais nos itens do pedido antes do envio.",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "itemChanges",
            "type": "OrderItemChange[]",
            "required": true
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "totalAmount",
            "type": "money"
          },
          {
            "name": "items",
            "type": "OrderItem[]"
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
          "addOrUpdateOrderItems"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "menuPriceIsSnapshottedOnOrderItem",
          "orderStatusTransitionsControlled"
        ]
      }
    ]
  }
} as const;

export default posOrderSummaryPagePlan;
