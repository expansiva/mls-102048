/// <mls fileReference="_102048_/l2/cafeFlow/kdsBoard.defs.ts" enhancement="_blank"/>

export const kdsBoardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "kdsBoard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 100,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "kdsBoard",
      "pageName": "Tela da cozinha (KDS)",
      "actor": "cook",
      "purpose": "Ver a fila de pedidos por colunas de status e priorizar preparo.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "kdsOrderDetail",
          "trigger": "Tocar em um pedido",
          "description": "Abrir detalhes do pedido selecionado."
        }
      ],
      "sections": [
        {
          "sectionName": "Fila da cozinha por status",
          "mode": "kanban",
          "organisms": [
            {
              "organismName": "kdsQueueBoard",
              "purpose": "Exibir pedidos por colunas de status com dados essenciais para preparo.",
              "userActions": [
                "Visualizar pedidos por status",
                "Tocar em um pedido para abrir detalhes"
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
                "Order.notes",
                "Order.sentToKitchenAt",
                "Order.createdAt",
                "Order.updatedAt"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "kdsQuickStatusAction",
              "purpose": "Atualizar rapidamente o status do pedido diretamente no cartão, quando permitido.",
              "userActions": [
                "Iniciar preparo",
                "Marcar pronto"
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
                "Order.readyAt"
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
        "commandName": "listKitchenQueue",
        "purpose": "Carregar pedidos na fila da cozinha com itens e observações essenciais.",
        "kind": "query",
        "input": [
          {
            "name": "statusFilter",
            "type": "string",
            "required": false
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
            "name": "customerName",
            "type": "string"
          },
          {
            "name": "notes",
            "type": "string"
          },
          {
            "name": "sentToKitchenAt",
            "type": "datetime"
          },
          {
            "name": "createdAt",
            "type": "datetime"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          },
          {
            "name": "itemsSummary",
            "type": "string"
          },
          {
            "name": "elapsedMinutes",
            "type": "number"
          },
          {
            "name": "hasAlerts",
            "type": "boolean"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "order"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listKitchenQueue"
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
        "purpose": "Atualizar o status do pedido na cozinha (em preparo ou pronto).",
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
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          },
          {
            "name": "readyAt",
            "type": "datetime"
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

export default kdsBoardPagePlan;
