/// <mls fileReference="_102048_/l2/cafeFlow/ordersTracker.defs.ts" enhancement="_blank"/>

export const ordersTrackerPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "ordersTracker",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "ordersTracker",
      "pageName": "Painel de pedidos (tracker)",
      "actor": "attendantCashier",
      "purpose": "Acompanhar pedidos por status (em andamento/fechados/cancelados), buscar por mesa/takeout e abrir detalhes.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "orderDetail",
          "trigger": "Tocar em um pedido da lista"
        },
        {
          "direction": "outbound",
          "pageId": "posFast",
          "trigger": "Criar novo pedido a partir do tracker (atalho)"
        }
      ],
      "sections": [
        {
          "sectionName": "Filtros e busca",
          "mode": "filter",
          "organisms": [
            {
              "organismName": "FiltroDeStatus",
              "purpose": "Selecionar o status de pedidos a listar (em andamento/fechados/cancelados).",
              "userActions": [
                "Selecionar status",
                "Aplicar filtro"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "BuscaMesaOuTakeout",
              "purpose": "Buscar pedidos por mesa ou referência takeout.",
              "userActions": [
                "Digitar mesa/takeout",
                "Limpar busca"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.diningTableId",
                "Order.type",
                "Order.customerName",
                "Order.orderNumber"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Lista de pedidos",
          "mode": "list",
          "organisms": [
            {
              "organismName": "ListaDePedidosPorStatus",
              "purpose": "Exibir pedidos filtrados com status e tempos para acompanhamento e acesso ao detalhe.",
              "userActions": [
                "Abrir detalhe do pedido",
                "Atualizar lista"
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
                "Order.totalAmount",
                "Order.createdAt",
                "Order.updatedAt",
                "Order.sentToKitchenAt",
                "Order.readyAt",
                "Order.deliveredAt",
                "Order.closedAt",
                "Order.cancelledAt"
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
        "commandName": "listOrdersByStatus",
        "purpose": "Listar pedidos por status para o tracker (e opcionalmente por mesa/takeout).",
        "kind": "query",
        "input": [
          {
            "name": "status",
            "type": "string",
            "required": true
          },
          {
            "name": "search",
            "type": "string",
            "required": false
          },
          {
            "name": "shiftWindowStart",
            "type": "datetime",
            "required": false
          },
          {
            "name": "shiftWindowEnd",
            "type": "datetime",
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
            "name": "diningTableId",
            "type": "uuid"
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
            "name": "createdAt",
            "type": "datetime"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          },
          {
            "name": "sentToKitchenAt",
            "type": "datetime"
          },
          {
            "name": "readyAt",
            "type": "datetime"
          },
          {
            "name": "deliveredAt",
            "type": "datetime"
          },
          {
            "name": "closedAt",
            "type": "datetime"
          },
          {
            "name": "cancelledAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "Order",
          "DailyShift",
          "DiningTable"
        ],
        "writesEntities": [],
        "readsTables": [
          "order",
          "daily_shift",
          "dining_table"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listOrdersByStatus"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      }
    ]
  }
} as const;

export default ordersTrackerPagePlan;
