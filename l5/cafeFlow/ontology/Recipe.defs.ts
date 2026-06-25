/// <mls fileReference="_102048_/l5/cafeFlow/ontology/Recipe.defs.ts" enhancement="_blank"/>

export const RecipeEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "Recipe",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 41,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "Recipe",
      "title": "Receita / Consumo por Item",
      "description": "Define o consumo padrão de ingredientes por venda de um item do cardápio; base para baixa automática.",
      "ownership": "mdmOwned",
      "kind": "mdm",
      "fields": [
        {
          "fieldId": "recipeId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da receita"
        },
        {
          "fieldId": "menuItemId",
          "type": "uuid",
          "required": true,
          "description": "Referência ao item do cardápio ao qual esta receita pertence"
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "enum": [
            "draft",
            "active",
            "archived"
          ],
          "description": "Situação atual da receita no ciclo de vida"
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro"
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro"
        }
      ],
      "statusEnum": [
        "draft",
        "active",
        "archived"
      ],
      "lifecycleStates": [
        "draft",
        "active",
        "archived"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default RecipeEntityDefinition;
