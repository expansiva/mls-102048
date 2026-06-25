/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listKitchenQueue.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listKitchenQueue",
  "title": "Listar fila da cozinha (KDS)",
  "purpose": "Exibir fila de pedidos enviados à cozinha e em preparação/prontos.",
  "actor": "cook",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "Order"
  ],
  "outputEntities": [
    "Order"
  ],
  "readsTables": [
    {
      "tableName": "order",
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
      "commandId": "listKitchenQueue",
      "input": [
        {
          "name": "statusFilter",
          "type": "string",
          "required": false
        },
        {
          "name": "limit",
          "type": "number",
          "required": false
        },
        {
          "name": "offset",
          "type": "number",
          "required": false
        }
      ],
      "output": [
        {
          "name": "orders",
          "type": "OrderAggregate[]"
        },
        {
          "name": "totalCount",
          "type": "number"
        }
      ]
    }
  ]
} as const;

export default useCase;
