/// <mls fileReference="_102048_/l2/cafeFlow/shiftCloseReport.defs.ts" enhancement="_blank"/>

export const shiftCloseReportPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "shiftCloseReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "shiftCloseReport",
      "pageName": "Relatório de fechamento de turno",
      "actor": "managerOwner",
      "purpose": "Visualizar, salvar e compartilhar o relatório oficial do turno encerrado.",
      "capabilities": [
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
          "description": "Identificador do turno diário encerrado.",
          "entityRef": "DailyShift",
          "fieldRef": "dailyShiftId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "shiftCloseConfirm",
          "trigger": "Após fechamento concluído"
        },
        {
          "direction": "outbound",
          "pageId": "dashboardToday",
          "trigger": "Voltar ao dashboard"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do turno",
          "mode": "view",
          "organisms": [
            {
              "organismName": "ShiftSummaryTotals",
              "purpose": "Exibir totais financeiros e operacionais consolidados do turno.",
              "userActions": [
                "Revisar totais do turno"
              ],
              "requiredEntities": [
                "DailyShift",
                "Order"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.shiftDate",
                "DailyShift.openedAt",
                "DailyShift.closedAt",
                "DailyShift.closedBy",
                "Order.totalAmount"
              ],
              "writesFields": [],
              "rulesApplied": [
                "metricsDerivedFromClosedOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Detalhamento e divergências",
          "mode": "view",
          "organisms": [
            {
              "organismName": "ShiftReportBreakdown",
              "purpose": "Mostrar breakdown por categoria/itens e eventuais divergências do turno.",
              "userActions": [
                "Revisar totais do turno"
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
                "Order.closedAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "metricsDerivedFromClosedOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Ações de exportação",
          "mode": "action",
          "organisms": [
            {
              "organismName": "ReportExportActions",
              "purpose": "Permitir exportar ou compartilhar o relatório do turno encerrado.",
              "userActions": [
                "Exportar/compartilhar relatório"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId"
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
        "commandName": "getShiftCloseReport",
        "purpose": "Buscar o relatório consolidado do turno.",
        "kind": "query",
        "input": [
          {
            "name": "shiftId",
            "type": "uuid",
            "required": true
          }
        ],
        "output": [
          {
            "name": "shiftId",
            "type": "uuid"
          },
          {
            "name": "shiftDate",
            "type": "date"
          },
          {
            "name": "openedAt",
            "type": "datetime"
          },
          {
            "name": "closedAt",
            "type": "datetime"
          },
          {
            "name": "closedBy",
            "type": "string"
          },
          {
            "name": "totalRevenue",
            "type": "money"
          },
          {
            "name": "totalOrders",
            "type": "number"
          },
          {
            "name": "totalItemsSold",
            "type": "number"
          },
          {
            "name": "averageTicket",
            "type": "money"
          },
          {
            "name": "breakdownItems",
            "type": "string"
          },
          {
            "name": "divergences",
            "type": "string"
          }
        ],
        "readsEntities": [
          "DailyShift",
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "daily_shift",
          "shift_summary_metrics",
          "order"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "getShiftCloseReport"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "metricsDerivedFromClosedOrders"
        ]
      }
    ]
  }
} as const;

export default shiftCloseReportPagePlan;
