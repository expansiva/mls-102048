/// <mls fileReference="_102048_/l1/cafeFlow/layer_4_entities/menuItem.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "menuItem",
  "title": "Catálogo de Cardápio e Receitas (MDM)",
  "purpose": "Manter itens do cardápio, categorias e receitas/consumo por item via MDM; suportar consulta para POS e configuração de baixa de estoque.",
  "layer": "layer_4_entities",
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
  "ontologyEntities": [
    "MenuItem",
    "MenuCategory",
    "Recipe",
    "RecipeIngredient",
    "InventoryItem"
  ],
  "sourceTables": [
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "menu_category",
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
  "storage": [
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "MenuItem",
      "domainId": "menuItem",
      "sourceOfTruth": "Plataforma MDM compartilhada (projeto 102034)",
      "governanceRules": [
        "Cada item deve pertencer a uma categoria ativa",
        "Status permitido: active ou inactive",
        "Preço deve ser maior ou igual a zero",
        "Nome do item deve ser único por categoria dentro do tenant",
        "Alterações de preço não afetam pedidos já fechados (snapshot no OrderItem)"
      ]
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "MenuCategory",
      "domainId": "menuItem",
      "sourceOfTruth": "Plataforma MDM compartilhada (projeto 102034)",
      "governanceRules": [
        "Cada item deve pertencer a uma categoria ativa",
        "Status permitido: active ou inactive",
        "Preço deve ser maior ou igual a zero",
        "Nome do item deve ser único por categoria dentro do tenant",
        "Alterações de preço não afetam pedidos já fechados (snapshot no OrderItem)"
      ]
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "Recipe",
      "domainId": "recipe",
      "sourceOfTruth": "Plataforma MDM compartilhada (projeto 102034)",
      "governanceRules": [
        "Apenas uma receita ativa por item do cardápio",
        "Ingredientes da receita devem referenciar itens de estoque ativos",
        "Quantidades consumidas devem ser maiores que zero",
        "Status permitido: draft, active ou archived",
        "Alterações na receita afetam apenas baixas futuras; pedidos fechados preservam histórico via OrderItem"
      ]
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "RecipeIngredient",
      "domainId": "recipe",
      "sourceOfTruth": "Plataforma MDM compartilhada (projeto 102034)",
      "governanceRules": [
        "Apenas uma receita ativa por item do cardápio",
        "Ingredientes da receita devem referenciar itens de estoque ativos",
        "Quantidades consumidas devem ser maiores que zero",
        "Status permitido: draft, active ou archived",
        "Alterações na receita afetam apenas baixas futuras; pedidos fechados preservam histórico via OrderItem"
      ]
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "InventoryItem",
      "domainId": "inventoryItem",
      "sourceOfTruth": "Plataforma MDM compartilhada (projeto 102034)",
      "governanceRules": [
        "Unidade de medida obrigatória e padronizada",
        "Limiar de estoque baixo deve ser maior ou igual a zero",
        "Status permitido: active ou inactive",
        "Nome do ingrediente deve ser único dentro do tenant",
        "Saldo atual é derivado das movimentações e não deve ser editado diretamente"
      ]
    }
  ],
  "allowedOperations": [
    "createMenuItem",
    "updateMenuItem",
    "deactivateMenuItem",
    "listMenuItems",
    "getMenuItem",
    "listMenuCategories",
    "upsertRecipeForMenuItem",
    "getRecipeByMenuItem",
    "listRecipes"
  ],
  "rulesApplied": [
    "bilingualUiViaPlatformI18n"
  ],
  "usecaseRefs": [
    "createOrderDraft",
    "addOrUpdateOrderItems",
    "closeOrderAsSaleAndDeductInventory",
    "getOrderById",
    "listKitchenQueue",
    "upsertMenuItemAndRecipe",
    "listMenuItems",
    "getMenuItemWithRecipe",
    "upsertInventoryItem",
    "listInventoryItems",
    "postInventoryAdjustment",
    "listInventoryTransactions",
    "listInventoryBalances",
    "getInventorySnapshotByItem",
    "requestAiSalesSummary",
    "requestAiPromoSuggestions"
  ],
  "materialization": {
    "fileName": "layer_4_entities/MenuItemEntity.ts",
    "className": "MenuItemEntity",
    "contractName": "IMenuItemEntity"
  }
} as const;

export default entity;
