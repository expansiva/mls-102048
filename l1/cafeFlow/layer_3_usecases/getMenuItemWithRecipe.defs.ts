/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/getMenuItemWithRecipe.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getMenuItemWithRecipe",
  "title": "Consultar item do cardápio com receita",
  "purpose": "Obter detalhes de um item e sua receita/ingredientes para edição e validação.",
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
      "tableName": "recipe",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "recipe_ingredient",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "inventory_item",
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
      "commandId": "getMenuItemWithRecipe",
      "input": [
        {
          "name": "menuItemId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "menuItem",
          "type": "MenuItem"
        },
        {
          "name": "recipe",
          "type": "Recipe"
        },
        {
          "name": "ingredients",
          "type": "RecipeIngredient[]"
        }
      ]
    }
  ]
} as const;

export default useCase;
