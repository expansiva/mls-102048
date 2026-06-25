/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/markOrderDelivered.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "markOrderDelivered",
  "title": "Marcar pedido como entregue/retirado",
  "purpose": "Transicionar pedido ready→delivered para mesa ou retirada.",
  "actor": "attendantCashier",
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
    }
  ],
  "writesTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderStatusTransitionsControlled"
  ],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "order"
  ],
  "commands": [
    {
      "commandId": "markOrderDelivered",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        },
        {
          "name": "operatorId",
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
          "name": "deliveredAt",
          "type": "date"
        },
        {
          "name": "orderType",
          "type": "string"
        }
      ]
    }
  ]
} as const;

export default useCase;
