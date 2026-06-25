/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/upsertMenuItemAndRecipe.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "upsertMenuItemAndRecipe",
  "title": "Criar/editar/desativar item do cardápio e receita",
  "purpose": "Manter item do cardápio e sua receita/ingredientes (consumo) via MDM, garantindo consistência para baixa automática.",
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
    },
    {
      "tableName": "menu_category",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
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
    }
  ],
  "rulesApplied": [],
  "entityRefs": [
    "aiInsightRun",
    "inventoryTransaction",
    "menuItem",
    "order"
  ],
  "commands": [
    {
      "commandId": "upsertMenuItemAndRecipe",
      "input": [
        {
          "name": "menuItemId",
          "type": "string",
          "required": false
        },
        {
          "name": "name",
          "type": "string",
          "required": true
        },
        {
          "name": "description",
          "type": "string",
          "required": false
        },
        {
          "name": "price",
          "type": "number",
          "required": true
        },
        {
          "name": "categoryId",
          "type": "string",
          "required": true
        },
        {
          "name": "isActive",
          "type": "boolean",
          "required": false
        },
        {
          "name": "recipeInstructions",
          "type": "string",
          "required": false
        },
        {
          "name": "recipeYield",
          "type": "number",
          "required": false
        },
        {
          "name": "ingredients",
          "type": "RecipeIngredientInput[]",
          "required": false
        }
      ],
      "output": [
        {
          "name": "menuItemId",
          "type": "string"
        },
        {
          "name": "recipeId",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "price",
          "type": "number"
        },
        {
          "name": "categoryId",
          "type": "string"
        },
        {
          "name": "isActive",
          "type": "boolean"
        },
        {
          "name": "updatedAt",
          "type": "date"
        }
      ]
    }
  ]
} as const;

export default useCase;
