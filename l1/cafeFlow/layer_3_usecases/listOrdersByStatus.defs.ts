/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listOrdersByStatus.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listOrdersByStatus",
  "title": "Listar pedidos por status",
  "purpose": "Listar pedidos (ex.: em aberto) filtrando por status e turno, para POS e acompanhamento.",
  "actor": "attendantCashier",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "Order",
    "DailyShift",
    "DiningTable"
  ],
  "outputEntities": [
    "Order",
    "DailyShift",
    "DiningTable"
  ],
  "readsTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "dining_table",
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
      "commandId": "listOrdersByStatus",
      "input": [
        {
          "name": "status",
          "type": "string",
          "required": true
        },
        {
          "name": "shiftId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "orders",
          "type": "OrderAggregate[]"
        }
      ]
    }
  ]
} as const;

export default useCase;
