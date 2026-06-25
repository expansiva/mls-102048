/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/postInventoryAdjustment.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "postInventoryAdjustment",
  "title": "Registrar ajuste manual de estoque",
  "purpose": "Registrar uma movimentação manual (entrada/saída/contagem) e atualizar snapshot de saldo e métricas de estoque baixo.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "InventoryBalanceSnapshot"
  ],
  "outputEntities": [
    "InventoryTransaction",
    "InventoryBalanceSnapshot"
  ],
  "readsTables": [
    {
      "tableName": "inventory_balance_snapshot",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_item",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "inventory_transaction",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_balance_snapshot",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "inventoryCannotGoNegativeByDefault"
  ],
  "entityRefs": [
    "inventoryTransaction",
    "menuItem"
  ],
  "commands": [
    {
      "commandId": "postAdjustment",
      "input": [
        {
          "name": "itemId",
          "type": "string",
          "required": true
        },
        {
          "name": "movementType",
          "type": "string",
          "required": true
        },
        {
          "name": "quantity",
          "type": "number",
          "required": true
        },
        {
          "name": "costPerUnit",
          "type": "number",
          "required": false
        },
        {
          "name": "reasonCode",
          "type": "string",
          "required": false
        },
        {
          "name": "notes",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "transactionId",
          "type": "string"
        },
        {
          "name": "itemId",
          "type": "string"
        },
        {
          "name": "previousBalance",
          "type": "number"
        },
        {
          "name": "newBalance",
          "type": "number"
        },
        {
          "name": "lowStockAlert",
          "type": "boolean"
        },
        {
          "name": "recordedAt",
          "type": "date"
        }
      ]
    }
  ]
} as const;

export default useCase;
