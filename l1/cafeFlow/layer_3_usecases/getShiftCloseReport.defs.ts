/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/getShiftCloseReport.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getShiftCloseReport",
  "title": "Obter relatório de fechamento de turno",
  "purpose": "Consultar relatório consolidado do turno (vendas, itens, totais) para exibição/impressão.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "DailyShift",
    "Order"
  ],
  "outputEntities": [
    "DailyShift",
    "Order"
  ],
  "readsTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "shift_summary_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order",
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
      "commandId": "getShiftCloseReport",
      "input": [
        {
          "name": "shiftId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "shiftId",
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
          "name": "status",
          "type": "string"
        },
        {
          "name": "totalSales",
          "type": "number"
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
          "name": "totalDiscounts",
          "type": "number"
        },
        {
          "name": "netSales",
          "type": "number"
        },
        {
          "name": "averageTicket",
          "type": "number"
        }
      ]
    }
  ]
} as const;

export default useCase;
