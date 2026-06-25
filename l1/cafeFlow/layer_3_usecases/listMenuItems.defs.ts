/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listMenuItems.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listMenuItems",
  "title": "Listar itens do cardápio",
  "purpose": "Listar itens do cardápio (ativos/inativos), categorias e preços para POS e gestão.",
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
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "menu_category",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "aiInsightRun",
    "inventoryTransaction",
    "menuItem",
    "order"
  ],
  "commands": [
    {
      "commandId": "listMenuItems",
      "input": [
        {
          "name": "status",
          "type": "string",
          "required": false
        },
        {
          "name": "categoryId",
          "type": "string",
          "required": false
        },
        {
          "name": "searchTerm",
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
          "name": "items",
          "type": "menuItem[]"
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
