/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listInventoryTransactions.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listInventoryTransactions",
  "title": "Listar movimentações de estoque",
  "purpose": "Consultar movimentações de estoque (ajustes e baixas) para auditoria simples.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "InventoryTransaction"
  ],
  "outputEntities": [
    "InventoryTransaction"
  ],
  "readsTables": [
    {
      "tableName": "inventory_transaction",
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
      "commandId": "listInventoryTransactions",
      "input": [
        {
          "name": "startDate",
          "type": "date",
          "required": false
        },
        {
          "name": "endDate",
          "type": "date",
          "required": false
        },
        {
          "name": "inventoryItemId",
          "type": "string",
          "required": false
        },
        {
          "name": "transactionType",
          "type": "string",
          "required": false
        },
        {
          "name": "page",
          "type": "number",
          "required": false
        },
        {
          "name": "pageSize",
          "type": "number",
          "required": false
        }
      ],
      "output": [
        {
          "name": "totalCount",
          "type": "number"
        },
        {
          "name": "transactions",
          "type": "InventoryTransaction"
        }
      ]
    }
  ]
} as const;

export default useCase;
