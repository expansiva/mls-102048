/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/getTodayDashboardMetrics.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getTodayDashboardMetrics",
  "title": "Obter métricas do dashboard de hoje",
  "purpose": "Buscar métricas do dia (vendas, itens mais vendidos, alertas de estoque baixo) para o dashboard do gerente.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "DailyShift"
  ],
  "outputEntities": [
    "DailyShift"
  ],
  "readsTables": [
    {
      "tableName": "today_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "order"
  ],
  "commands": [
    {
      "commandId": "getTodayDashboardMetrics",
      "input": [],
      "output": [
        {
          "name": "todaySalesMetrics",
          "type": "OrderAggregate"
        },
        {
          "name": "topSellingItemsMetrics",
          "type": "OrderAggregate"
        },
        {
          "name": "lowStockAlerts",
          "type": "InventoryAggregate"
        },
        {
          "name": "currentShift",
          "type": "ShiftAggregate"
        }
      ]
    }
  ]
} as const;

export default useCase;
