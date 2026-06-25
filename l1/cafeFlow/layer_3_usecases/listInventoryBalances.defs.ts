/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listInventoryBalances.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listInventoryBalances",
  "title": "Listar saldos de estoque (snapshots)",
  "purpose": "Listar saldos atuais por ingrediente para acompanhamento.",
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
      "commandId": "listInventoryBalances",
      "input": [
        {
          "name": "ingredientId",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "items",
          "type": "InventoryAggregate[]"
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
