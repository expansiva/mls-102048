/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/getOrderById.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getOrderById",
  "title": "Consultar pedido por id",
  "purpose": "Obter detalhes do pedido e itens para POS/KDS/acompanhar status.",
  "actor": "attendantCashier",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "Order",
    "DiningTable"
  ],
  "outputEntities": [
    "Order",
    "DiningTable"
  ],
  "readsTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "dining_table",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "menuItem",
    "order"
  ],
  "commands": [
    {
      "commandId": "getOrderById",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "orderId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "string"
        },
        {
          "name": "tableId",
          "type": "string"
        },
        {
          "name": "tableNumber",
          "type": "string"
        },
        {
          "name": "items",
          "type": "OrderItem[]"
        },
        {
          "name": "totalAmount",
          "type": "number"
        },
        {
          "name": "createdAt",
          "type": "date"
        }
      ]
    }
  ]
} as const;

export default useCase;
