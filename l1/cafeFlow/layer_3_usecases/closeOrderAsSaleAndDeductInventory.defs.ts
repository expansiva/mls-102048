/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/closeOrderAsSaleAndDeductInventory.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "closeOrderAsSaleAndDeductInventory",
  "title": "Fechar pedido (registrar venda) e baixar estoque",
  "purpose": "Transicionar pedido delivered→closed, registrar evento de venda, efetuar baixa automática por receita e atualizar métricas derivadas.",
  "actor": "attendantCashier",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "Order",
    "DailyShift",
    "InventoryBalanceSnapshot"
  ],
  "outputEntities": [
    "Order",
    "InventoryTransaction",
    "InventoryBalanceSnapshot"
  ],
  "readsTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
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
      "tableName": "inventory_balance_snapshot",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_transaction",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_balance_snapshot",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "today_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "shift_summary_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderStatusTransitionsControlled",
    "inventoryDeductionHappensOnSaleEvent",
    "inventoryCannotGoNegativeByDefault",
    "metricsDerivedFromClosedOrders"
  ],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "menuItem",
    "order"
  ],
  "commands": [
    {
      "commandId": "closeOrderAsSaleAndDeductInventory",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "orderId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "string"
        },
        {
          "name": "closedAt",
          "type": "date"
        },
        {
          "name": "inventoryTransactionsCount",
          "type": "number"
        }
      ]
    }
  ]
} as const;

export default useCase;
