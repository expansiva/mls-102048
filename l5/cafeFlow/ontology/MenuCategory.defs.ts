/// <mls fileReference="_102048_/l5/cafeFlow/ontology/MenuCategory.defs.ts" enhancement="_blank"/>

export const MenuCategoryEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "MenuCategory",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 39,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "MenuCategory",
      "title": "Categoria de Cardápio",
      "description": "Agrupamento estável para itens do cardápio (ex.: Cafés, Salgados, Doces) usado em navegação do POS e relatórios.",
      "ownership": "mdmOwned",
      "kind": "mdm",
      "fields": [
        {
          "fieldId": "menuCategoryId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da categoria."
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome da categoria exibido no POS e relatórios (ex.: Cafés, Salgados, Doces)."
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição opcional da categoria."
        },
        {
          "fieldId": "displayOrder",
          "type": "number",
          "required": false,
          "description": "Ordem de exibição na navegação do POS (menor valor aparece primeiro)."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Estado da categoria no ciclo de vida.",
          "enum": [
            "active",
            "inactive"
          ]
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
      "statusEnum": [
        "active",
        "inactive"
      ],
      "lifecycleStates": [
        "active",
        "inactive"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default MenuCategoryEntityDefinition;
