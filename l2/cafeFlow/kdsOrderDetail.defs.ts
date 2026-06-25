/// <mls fileReference="_102048_/l2/cafeFlow/kdsOrderDetail.defs.ts" enhancement="_blank"/>

export const kdsOrderDetailPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "kdsOrderDetail",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "kdsOrderDetail",
      "pageName": "Detalhe do pedido (KDS)",
      "actor": "cook",
      "purpose": "Ver itens e observações do pedido e atualizar o status de preparo (em preparo/pronto).",
      "capabilities": [
        "updateOrderStatusKitchen"
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
          "description": "Identificador do pedido aberto no KDS.",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "kdsBoard",
          "trigger": "Abrir um pedido da fila"
        },
        {
          "direction": "outbound",
          "pageId": "kdsIssueFlag",
          "trigger": "Tocar em \"Problema/Indisponível\""
        },
        {
          "direction": "outbound",
          "pageId": "kdsStatusGuard",
          "trigger": "Ao tentar transição inválida"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderHeader",
              "purpose": "Exibir identificação e status atual do pedido para preparo.",
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
                "Order.createdAt",
                "Order.sentToKitchenAt"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Itens e observações",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderItemsList",
              "purpose": "Listar itens do pedido com observações e notas gerais.",
              "userActions": [
                "Ler observações de itens"
              ],
              "requiredEntities": [
                "Order",
                "OrderItem"
              ],
              "readsFields": [
                "Order.notes",
                "OrderItem.name",
                "OrderItem.quantity",
                "OrderItem.notes"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Ações de preparo",
          "mode": "action",
          "organisms": [
            {
              "organismName": "kitchenStatusActions",
              "purpose": "Atualizar status do pedido na cozinha.",
              "userActions": [
                "Marcar \"Em preparo\"",
                "Marcar \"Pronto\""
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
                "Order.updatedAt",
                "Order.readyAt"
              ],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            },
            {
              "organismName": "issueFlagShortcut",
              "purpose": "Acessar fluxo de problema/indisponível.",
              "userActions": [
                "Sinalizar problema/indisponível"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.status"
              ],
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
        "purpose": "Carregar detalhes completos do pedido para preparo.",
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
            "type": "OrderAggregate"
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
        "commandName": "updateKitchenOrderStatus",
        "purpose": "Atualizar status do pedido na cozinha (ex.: inPreparation, ready).",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "newStatus",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "order",
            "type": "OrderAggregate"
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
          "updateKitchenOrderStatus"
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

export default kdsOrderDetailPagePlan;
