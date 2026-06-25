/// <mls fileReference="_102048_/l2/cafeFlow/managerMetricsDashboard.defs.ts" enhancement="_blank"/>

export const managerMetricsDashboardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "managerMetricsDashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "managerMetricsDashboard",
      "pageName": "Dashboard de Métricas do Gerente",
      "actor": "managerOwner",
      "purpose": "Ver dashboards e tabelas de métricas habilitadas para o gerente em uma visão dedicada.",
      "capabilities": [
        "viewDashboardToday"
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
          "direction": "outbound",
          "pageId": "dashboardToday",
          "trigger": "Abrir visão \"Hoje\" para detalhes operacionais"
        }
      ],
      "sections": [
        {
          "sectionName": "Visão geral das métricas do dia",
          "mode": "view",
          "organisms": [
            {
              "organismName": "tabelasDeMetricasDoDia",
              "purpose": "Exibir tabelas de vendas de hoje, itens mais vendidos, estoque baixo e resumo do turno.",
              "userActions": [
                "Explorar tabelas de métricas",
                "Alternar visões/tabelas"
              ],
              "requiredEntities": [
                "todaySalesMetrics",
                "topSellingItemsMetrics",
                "lowStockMetrics",
                "shiftSummaryMetrics"
              ],
              "readsFields": [
                "todaySalesMetrics.totalRevenue",
                "todaySalesMetrics.totalOrders",
                "todaySalesMetrics.totalItemsSold",
                "todaySalesMetrics.averageTicket",
                "topSellingItemsMetrics.menuItemId",
                "topSellingItemsMetrics.quantitySold",
                "topSellingItemsMetrics.itemRevenue",
                "lowStockMetrics.inventoryItemId",
                "lowStockMetrics.currentBalance",
                "lowStockMetrics.minThreshold",
                "lowStockMetrics.belowThresholdFlag",
                "shiftSummaryMetrics.shiftRevenue",
                "shiftSummaryMetrics.shiftOrders",
                "shiftSummaryMetrics.shiftItemsSold",
                "shiftSummaryMetrics.shiftAverageTicket"
              ],
              "writesFields": [],
              "rulesApplied": [
                "metricsDerivedFromClosedOrders"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getTodayDashboardMetrics",
        "purpose": "Abastecer as tabelas do dashboard de métricas do gerente.",
        "kind": "query",
        "input": [],
        "output": [
          {
            "name": "todaySalesMetrics",
            "type": "todaySalesMetricRow[]"
          },
          {
            "name": "topSellingItemsMetrics",
            "type": "topSellingItemsMetricRow[]"
          },
          {
            "name": "lowStockMetrics",
            "type": "lowStockMetricRow[]"
          },
          {
            "name": "shiftSummaryMetrics",
            "type": "shiftSummaryMetricRow[]"
          },
          {
            "name": "currentShiftId",
            "type": "string"
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
        "rulesApplied": [
          "metricsDerivedFromClosedOrders"
        ]
      }
    ]
  }
} as const;

export default managerMetricsDashboardPagePlan;
