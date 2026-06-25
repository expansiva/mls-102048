/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/cancelOrder.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "cancelOrder",
  "title": "Cancelar pedido",
  "purpose": "Cancelar pedido não fechado, respeitando transições; se já houver movimentação de estoque associada (ex.: venda), impedir ou exigir reversão.",
  "actor": "attendantCashier",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "Order",
    "InventoryTransaction"
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
      "tableName": "inventory_transaction",
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
      "commandId": "cancelOrder",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        },
        {
          "name": "reason",
          "type": "string",
          "required": false
        },
        {
          "name": "allowInventoryReversal",
          "type": "boolean",
          "required": false
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
          "name": "canceledAt",
          "type": "date"
        },
        {
          "name": "inventoryMovementDetected",
          "type": "boolean"
        },
        {
          "name": "inventoryReversed",
          "type": "boolean"
        }
      ]
    }
  ]
} as const;

export default useCase;
