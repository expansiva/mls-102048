/// <mls fileReference="_102048_/l5/cafeFlow/ontology/RecipeIngredient.defs.ts" enhancement="_blank"/>

export const RecipeIngredientEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "RecipeIngredient",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "RecipeIngredient",
      "title": "Ingrediente da Receita",
      "description": "Linha de receita que relaciona um item do cardápio a um ingrediente/insumo e sua quantidade consumida por unidade vendida.",
      "ownership": "mdmOwned",
      "kind": "mdm",
      "fields": [
        {
          "fieldId": "recipeIngredientId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da linha de ingrediente da receita."
        },
        {
          "fieldId": "recipeId",
          "type": "uuid",
          "required": true,
          "description": "Referência à receita (Recipe) à qual este ingrediente pertence."
        },
        {
          "fieldId": "inventoryItemId",
          "type": "uuid",
          "required": true,
          "description": "Referência ao item de estoque (InventoryItem) consumido nesta linha."
        },
        {
          "fieldId": "quantity",
          "type": "number",
          "required": true,
          "description": "Quantidade do ingrediente consumida por unidade vendida do item do cardápio."
        },
        {
          "fieldId": "unitOfMeasure",
          "type": "string",
          "required": true,
          "description": "Unidade de medida da quantidade (ex: g, ml, unidade)."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "rulesApplied": []
    }
  }
} as const;

export default RecipeIngredientEntityDefinition;
