/// <mls fileReference="_102048_/l2/cafeFlow/shiftClose.defs.ts" enhancement="_blank"/>

export const shiftClosePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "shiftClose",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "shiftClose",
      "pageName": "Fechar turno",
      "actor": "managerOwner",
      "purpose": "Iniciar o fechamento do turno e informar contagem de caixa para consolidar e encerrar o dia.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "dashboardToday",
          "trigger": "Tocar em \"Fechar turno\""
        },
        {
          "direction": "outbound",
          "pageId": "shiftCloseConfirm",
          "trigger": "Avançar para confirmar fechamento"
        },
        {
          "direction": "outbound",
          "pageId": "shiftCloseBlocked",
          "trigger": "Se houver bloqueio por pedidos em aberto"
        }
      ],
      "sections": [
        {
          "sectionName": "Contexto do turno",
          "mode": "view",
          "organisms": [
            {
              "organismName": "shiftContextCard",
              "purpose": "Exibir informações do turno aberto para confirmação visual antes do fechamento.",
              "userActions": [],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.shiftDate",
                "DailyShift.status",
                "DailyShift.openedAt",
                "DailyShift.openedBy"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Contagem de caixa",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "paymentCountForm",
              "purpose": "Registrar valores finais por forma de pagamento e observações do fechamento.",
              "userActions": [
                "Informar valores finais (dinheiro/cartão/outros)",
                "Adicionar observações de fechamento"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Resumo pré-fechamento",
          "mode": "view",
          "organisms": [
            {
              "organismName": "preCloseSummary",
              "purpose": "Revisar o resumo do dia antes de avançar para a confirmação do fechamento.",
              "userActions": [
                "Revisar resumo pré-fechamento"
              ],
              "requiredEntities": [
                "DailyShift",
                "Order"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.shiftDate",
                "Order.totalAmount",
                "Order.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Ações",
          "mode": "action",
          "organisms": [
            {
              "organismName": "advanceToConfirm",
              "purpose": "Permitir avançar para a confirmação do fechamento do turno.",
              "userActions": [
                "Avançar para confirmação"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getTodayDashboardMetrics",
        "purpose": "Buscar métricas do dia e dados do turno atual para o resumo pré-fechamento.",
        "kind": "query",
        "input": [],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "uuid"
          },
          {
            "name": "shiftDate",
            "type": "date"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "openedAt",
            "type": "datetime"
          },
          {
            "name": "openedBy",
            "type": "string"
          },
          {
            "name": "salesTotal",
            "type": "money"
          },
          {
            "name": "ordersCount",
            "type": "number"
          }
        ],
        "readsEntities": [
          "DailyShift"
        ],
        "writesEntities": [],
        "readsTables": [
          "today_sales_metrics",
          "top_selling_items_metrics",
          "low_stock_metrics",
          "daily_shift"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "getTodayDashboardMetrics"
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

export default shiftClosePagePlan;
