/// <mls fileReference="_102048_/l5/cafeFlow/ontology/MenuItem.defs.ts" enhancement="_blank"/>

export const MenuItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "MenuItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "MenuItem",
      "title": "Item do Cardápio",
      "description": "Produto vendido no POS (ex.: cappuccino, pão de queijo), com categoria e preço; referenciado em pedidos e métricas. Receita/consumo é mantida separadamente para suportar baixa de estoque.",
      "ownership": "mdmOwned",
      "kind": "mdm",
      "fields": [
        {
          "fieldId": "menuItemId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do item do cardápio"
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome do produto para exibição no POS e no KDS"
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição opcional do produto para o cardápio digital"
        },
        {
          "fieldId": "price",
          "type": "money",
          "required": true,
          "description": "Preço de venda praticado no caixa"
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "enum": [
            "active",
            "inactive"
          ],
          "description": "Situação do item no cardápio (ativo ou inativo)"
        },
        {
          "fieldId": "menuCategoryId",
          "type": "uuid",
          "required": true,
          "description": "Referência à categoria do cardápio à qual o item pertence"
        },
        {
          "fieldId": "sku",
          "type": "string",
          "required": false,
          "description": "Código interno de controle (SKU) do produto"
        },
        {
          "fieldId": "imageUrl",
          "type": "string",
          "required": false,
          "description": "URL da imagem do produto para exibição no POS"
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
        "active",
        "inactive"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default MenuItemEntityDefinition;
