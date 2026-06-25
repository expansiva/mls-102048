/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listInventoryItems.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listInventoryItems",
  "title": "Listar ingredientes (MDM)",
  "purpose": "Listar itens de estoque (ingredientes) para gestão e composição de receitas.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "MenuAndRecipeCatalog"
  ],
  "outputEntities": [
    "MenuAndRecipeCatalog"
  ],
  "readsTables": [
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
      "commandId": "listInventoryItems",
      "input": [
        {
          "name": "searchQuery",
          "type": "string",
          "required": false
        },
        {
          "name": "category",
          "type": "string",
          "required": false
        },
        {
          "name": "isActive",
          "type": "boolean",
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
          "name": "items",
          "type": "inventoryItem[]"
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
