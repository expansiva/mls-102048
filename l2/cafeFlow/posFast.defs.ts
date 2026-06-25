/// <mls fileReference="_102048_/l2/cafeFlow/posFast.defs.ts" enhancement="_blank"/>

export const posFastPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posFast",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 98,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posFast",
      "pageName": "POS rápido",
      "actor": "attendantCashier",
      "purpose": "Iniciar um novo pedido de forma rápida durante o turno e acessar o fluxo de montagem do pedido.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "posOrderType",
          "trigger": "Após iniciar novo pedido (draft)"
        },
        {
          "direction": "outbound",
          "pageId": "shiftRequiredBlock",
          "trigger": "Se turno estiver fechado"
        }
      ],
      "sections": [
        {
          "sectionName": "Ações rápidas",
          "mode": "create",
          "organisms": [
            {
              "organismName": "novoPedidoCta",
              "purpose": "Iniciar um novo pedido rapidamente no POS.",
              "userActions": [
                "Tocar em \"Novo pedido\""
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [],
              "writesFields": [
                "Order.id",
                "Order.status",
                "Order.dailyShiftId"
              ],
              "rulesApplied": [
                "shiftMustBeOpenToCreateOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Pedidos em andamento",
          "mode": "view",
          "organisms": [
            {
              "organismName": "listaPedidosEmAndamento",
              "purpose": "Retomar pedidos em andamento do turno atual.",
              "userActions": [
                "Retomar pedido em andamento (se aplicável)"
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
                "Order.updatedAt"
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
        "commandName": "createOrderDraft",
        "purpose": "Criar um Order em estado draft para montagem no POS.",
        "kind": "command",
        "input": [],
        "output": [
          {
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          }
        ],
        "readsEntities": [
          "DailyShift"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "daily_shift"
        ],
        "writesTables": [
          "order"
        ],
        "usecaseRefs": [
          "createOrderDraft"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "shiftMustBeOpenToCreateOrders"
        ]
      },
      {
        "commandName": "listOrdersByStatus",
        "purpose": "Listar pedidos em andamento do turno para retomar no POS.",
        "kind": "query",
        "input": [
          {
            "name": "status",
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
            "name": "updatedAt",
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

export default posFastPagePlan;
