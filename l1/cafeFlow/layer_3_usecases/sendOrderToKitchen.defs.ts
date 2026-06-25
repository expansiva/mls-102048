/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/sendOrderToKitchen.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "sendOrderToKitchen",
  "title": "Enviar pedido para cozinha",
  "purpose": "Transicionar pedido de draft para sentToKitchen e disponibilizar na fila do KDS.",
  "actor": "attendantCashier",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "Order",
    "DailyShift"
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
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderStatusTransitionsControlled",
    "shiftMustBeOpenToCreateOrders"
  ],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "order"
  ],
  "commands": [
    {
      "commandId": "sendOrderToKitchen",
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
          "name": "sentAt",
          "type": "date"
        }
      ]
    }
  ]
} as const;

export default useCase;
