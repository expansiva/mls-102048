/// <mls fileReference="_102048_/l1/cafeFlow/layer_4_entities/inventoryTransaction.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "inventoryTransaction",
  "title": "Agregado de Estoque (Movimentação e Saldos)",
  "purpose": "Registrar ajustes manuais e baixas automáticas por venda, manter snapshots de saldo e atualizar métricas de estoque baixo.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "inventoryTransactionId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da movimentação de estoque."
    },
    {
      "fieldId": "inventoryItemId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao ingrediente/insumo movimentado."
    },
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": false,
      "description": "Referência ao pedido origem em caso de baixa automática por venda."
    },
    {
      "fieldId": "transactionType",
      "type": "string",
      "required": true,
      "description": "Tipo da movimentação: entrada de estoque, baixa por venda ou ajuste manual.",
      "enum": [
        "entrada",
        "baixaVenda",
        "ajuste"
      ]
    },
    {
      "fieldId": "quantityChange",
      "type": "number",
      "required": true,
      "description": "Quantidade alterada no estoque. Positivo para entrada, negativo para baixa ou ajuste de redução."
    },
    {
      "fieldId": "reason",
      "type": "text",
      "required": false,
      "description": "Motivo do ajuste manual ou observação sobre a movimentação."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status do registro: lançado ou estornado.",
      "enum": [
        "posted",
        "reversed"
      ]
    },
    {
      "fieldId": "recordedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que a movimentação ocorreu efetivamente."
    },
    {
      "fieldId": "createdBy",
      "type": "string",
      "required": false,
      "description": "Identificador do usuário responsável pelo registro."
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
    "posted",
    "reversed"
  ],
  "ontologyEntities": [
    "InventoryTransaction",
    "InventoryBalanceSnapshot",
    "Order",
    "InventoryItem",
    "Recipe",
    "RecipeIngredient",
    "MenuItem"
  ],
  "sourceTables": [
    {
      "tableName": "inventory_transaction",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_balance_snapshot",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order_item",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_item",
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
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "inventoryTransaction",
      "tableName": "inventory_transaction",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/inventoryTransaction.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "inventoryBalanceSnapshot",
      "tableName": "inventory_balance_snapshot",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/inventoryBalanceSnapshot.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "lowStockMetrics",
      "tableName": "low_stock_metrics",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/lowStockMetrics.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "order",
      "tableName": "order",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/order.defs.ts"
    },
    {
      "kind": "unknown",
      "tableName": "order_item",
      "ownership": "moduleOwned"
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
    }
  ],
  "allowedOperations": [
    "postInventoryAdjustment",
    "deductInventoryFromClosedOrder",
    "reverseInventoryTransaction",
    "getInventorySnapshotByItem",
    "listInventorySnapshots",
    "listInventoryTransactions",
    "getLowStockList"
  ],
  "rulesApplied": [
    "inventoryDeductionHappensOnSaleEvent",
    "inventoryCannotGoNegativeByDefault",
    "metricsDerivedFromClosedOrders"
  ],
  "usecaseRefs": [
    "createOrderDraft",
    "addOrUpdateOrderItems",
    "sendOrderToKitchen",
    "updateKitchenOrderStatus",
    "markOrderDelivered",
    "closeOrderAsSaleAndDeductInventory",
    "cancelOrder",
    "getOrderById",
    "listOrdersByStatus",
    "listKitchenQueue",
    "closeDailyShiftAndGenerateReport",
    "getShiftCloseReport",
    "getTodayDashboardMetrics",
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
    "fileName": "layer_4_entities/InventoryTransactionEntity.ts",
    "className": "InventoryTransactionEntity",
    "contractName": "IInventoryTransactionEntity"
  }
} as const;

export default entity;
