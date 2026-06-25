/// <mls fileReference="_102048_/l2/cafeFlow/shiftRequiredBlock.defs.ts" enhancement="_blank"/>

export const shiftRequiredBlockPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "shiftRequiredBlock",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "shiftRequiredBlock",
      "pageName": "Turno obrigatório (bloqueio)",
      "actor": "attendantCashier",
      "purpose": "Bloquear criação/envio de pedidos quando o turno está fechado e orientar o atendente a acionar o gerente.",
      "capabilities": [
        "takeOrderPos",
        "dailyShiftOpenClose"
      ],
      "flowRefs": {
        "experienceFlows": [
          "posOrderTaking"
        ],
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
          "pageId": "posFast",
          "trigger": "Ao tentar criar pedido com turno fechado"
        },
        {
          "direction": "outbound",
          "pageId": "posFast",
          "trigger": "Após turno abrir, tentar novamente"
        },
        {
          "direction": "outbound",
          "pageId": "dashboardToday",
          "trigger": "(Opcional) direcionar gerente para abrir turno"
        }
      ],
      "sections": [
        {
          "sectionName": "Aviso de bloqueio",
          "mode": "view",
          "organisms": [
            {
              "organismName": "BloqueioDeTurnoFechado",
              "purpose": "Informar que o turno está fechado e impedir a criação/envio de pedidos.",
              "userActions": [
                "Voltar ao POS"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.status",
                "DailyShift.shiftDate"
              ],
              "writesFields": [],
              "rulesApplied": [
                "shiftMustBeOpenToCreateOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Status do turno hoje",
          "mode": "view",
          "organisms": [
            {
              "organismName": "ResumoTurnoHoje",
              "purpose": "Exibir status do turno e pendências para explicar o bloqueio.",
              "userActions": [
                "Ver motivo do bloqueio"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.status",
                "DailyShift.shiftDate",
                "DailyShift.openedAt",
                "DailyShift.closedAt",
                "DailyShift.openedBy",
                "DailyShift.closedBy"
              ],
              "writesFields": [],
              "rulesApplied": [
                "shiftMustBeOpenToCreateOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Orientação e próximos passos",
          "mode": "view",
          "organisms": [
            {
              "organismName": "OrientacaoAcionarGerente",
              "purpose": "Orientar o atendente a chamar o gerente para abrir o turno.",
              "userActions": [
                "Chamar gerente (orientação)"
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
        "purpose": "Checar rapidamente status do turno para explicar o bloqueio.",
        "kind": "query",
        "input": [
          {
            "name": "currentDate",
            "type": "date",
            "required": true
          }
        ],
        "output": [
          {
            "name": "dailyShiftStatus",
            "type": "string"
          },
          {
            "name": "dailyShiftId",
            "type": "string"
          },
          {
            "name": "shiftDate",
            "type": "date"
          },
          {
            "name": "openedAt",
            "type": "date"
          },
          {
            "name": "closedAt",
            "type": "date"
          },
          {
            "name": "openedBy",
            "type": "string"
          },
          {
            "name": "closedBy",
            "type": "string"
          },
          {
            "name": "pendingOrdersCount",
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

export default shiftRequiredBlockPagePlan;
