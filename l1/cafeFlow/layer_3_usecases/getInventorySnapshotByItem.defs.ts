/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/getInventorySnapshotByItem.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getInventorySnapshotByItem",
  "title": "Consultar snapshot de saldo por ingrediente",
  "purpose": "Obter detalhes do snapshot de saldo atual para um ingrediente específico conforme allowedOperations.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "InventoryBalanceSnapshot"
  ],
  "outputEntities": [
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
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "inventoryTransaction",
    "menuItem"
  ],
  "commands": [
    {
      "commandId": "getInventorySnapshotByItem",
      "input": [
        {
          "name": "itemId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "itemId",
          "type": "string"
        },
        {
          "name": "itemName",
          "type": "string"
        },
        {
          "name": "currentBalance",
          "type": "number"
        },
        {
          "name": "availableQuantity",
          "type": "number"
        },
        {
          "name": "reservedQuantity",
          "type": "number"
        },
        {
          "name": "unitOfMeasure",
          "type": "string"
        },
        {
          "name": "lastUpdatedAt",
          "type": "date"
        }
      ]
    }
  ]
} as const;

export default useCase;
