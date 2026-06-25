/// <mls fileReference="_102048_/l2/cafeFlow/shiftCloseBlocked.defs.ts" enhancement="_blank"/>

export const shiftCloseBlockedPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "shiftCloseBlocked",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "shiftCloseBlocked",
      "pageName": "Bloqueio ao fechar turno",
      "actor": "managerOwner",
      "purpose": "Explicar por que o turno não pode ser fechado e direcionar para resolver pendências (ex.: pedidos em aberto).",
      "capabilities": [
        "dailyShiftOpenClose",
        "viewShiftCloseReport"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "dailyShiftLifecycle"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "shiftId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do turno diário que está tentando ser fechado.",
          "entityRef": "DailyShift",
          "fieldRef": "dailyShiftId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "shiftClose",
          "trigger": "Ao tentar fechar com pendências"
        },
        {
          "direction": "outbound",
          "pageId": "ordersTracker",
          "trigger": "Abrir lista de pedidos pendentes"
        },
        {
          "direction": "outbound",
          "pageId": "shiftClose",
          "trigger": "Tentar fechar novamente"
        }
      ],
      "sections": [
        {
          "sectionName": "Aviso de bloqueio",
          "mode": "view",
          "organisms": [
            {
              "organismName": "MotivoDoBloqueio",
              "purpose": "Informar que há pendências que impedem o fechamento do turno e orientar os próximos passos.",
              "userActions": [
                "Ir para pedidos pendentes",
                "Voltar ao fechamento"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Pedidos pendentes no turno",
          "mode": "view",
          "organisms": [
            {
              "organismName": "ListaDePedidosPendentes",
              "purpose": "Exibir pedidos que ainda não estão fechados/cancelados no turno atual.",
              "userActions": [
                "Abrir lista completa de pedidos no tracker"
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
                "Order.createdAt"
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
        "purpose": "Listar pedidos que ainda impedem o fechamento (ex.: não closed/cancelled) no turno atual.",
        "kind": "query",
        "input": [
          {
            "name": "shiftId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "statusList",
            "type": "string[]",
            "required": true
          }
        ],
        "output": [
          {
            "name": "orders",
            "type": "Order[]"
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

export default shiftCloseBlockedPagePlan;
