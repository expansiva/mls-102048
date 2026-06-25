/// <mls fileReference="_102048_/l1/cafeFlow/layer_4_entities/order.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "order",
  "title": "Agregado de Pedido",
  "purpose": "Manter o ciclo de vida do pedido (draft→…→closed/cancelled), itens, preços snapshot, vínculo com mesa/takeout e turno; base para POS, KDS e relatórios.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "id",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do pedido"
    },
    {
      "fieldId": "orderNumber",
      "type": "string",
      "required": true,
      "description": "Número sequencial ou código de exibição do pedido"
    },
    {
      "fieldId": "type",
      "type": "string",
      "required": true,
      "enum": [
        "mesa",
        "takeout"
      ],
      "description": "Tipo do pedido: mesa (com clientes sentados) ou takeout (para viagem)"
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "enum": [
        "draft",
        "sentToKitchen",
        "inPreparation",
        "ready",
        "delivered",
        "closed",
        "cancelled"
      ],
      "description": "Status atual do pedido no fluxo de preparo e atendimento"
    },
    {
      "fieldId": "diningTableId",
      "type": "uuid",
      "required": false,
      "description": "Referência à mesa (obrigatório apenas quando tipo for 'mesa')"
    },
    {
      "fieldId": "dailyShiftId",
      "type": "uuid",
      "required": true,
      "description": "Referência ao turno diário em que o pedido foi criado"
    },
    {
      "fieldId": "customerName",
      "type": "string",
      "required": false,
      "description": "Nome do cliente (útil para takeout)"
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações gerais do pedido"
    },
    {
      "fieldId": "totalAmount",
      "type": "money",
      "required": true,
      "description": "Valor total do pedido calculado a partir dos itens"
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data/hora de criação do pedido"
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data/hora da última atualização do pedido"
    },
    {
      "fieldId": "sentToKitchenAt",
      "type": "datetime",
      "required": false,
      "description": "Data/hora em que o pedido foi enviado para a cozinha"
    },
    {
      "fieldId": "readyAt",
      "type": "datetime",
      "required": false,
      "description": "Data/hora em que o pedido ficou pronto para entrega"
    },
    {
      "fieldId": "deliveredAt",
      "type": "datetime",
      "required": false,
      "description": "Data/hora da entrega do pedido ao cliente"
    },
    {
      "fieldId": "closedAt",
      "type": "datetime",
      "required": false,
      "description": "Data/hora do fechamento/pagamento do pedido"
    },
    {
      "fieldId": "cancelledAt",
      "type": "datetime",
      "required": false,
      "description": "Data/hora do cancelamento do pedido"
    },
    {
      "fieldId": "cancellationReason",
      "type": "text",
      "required": false,
      "description": "Motivo do cancelamento, quando aplicável"
    }
  ],
  "statusEnum": [
    "draft",
    "sentToKitchen",
    "inPreparation",
    "ready",
    "delivered",
    "closed",
    "cancelled"
  ],
  "lifecycleStates": [
    "draft",
    "sentToKitchen",
    "inPreparation",
    "ready",
    "delivered",
    "closed",
    "cancelled"
  ],
  "ontologyEntities": [
    "Order",
    "DailyShift",
    "DiningTable",
    "MenuItem",
    "MenuCategory"
  ],
  "sourceTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order_item",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "dining_table",
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
      "tableName": "shift_summary_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "menu_category",
      "ownership": "mdmOwned"
    }
  ],
  "storage": [
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
      "kind": "moduleTable",
      "tableId": "dailyShift",
      "tableName": "daily_shift",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/dailyShift.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "diningTable",
      "tableName": "dining_table",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/diningTable.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "todaySalesMetrics",
      "tableName": "today_sales_metrics",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/todaySalesMetrics.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "shiftSummaryMetrics",
      "tableName": "shift_summary_metrics",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/shiftSummaryMetrics.defs.ts"
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
    }
  ],
  "allowedOperations": [
    "createDraftOrderWithItems",
    "updateOrderItems",
    "sendToKitchen",
    "transitionKitchenStatus",
    "markDelivered",
    "closeAsSale",
    "cancelOrder",
    "getOrderById",
    "listOrdersByStatus",
    "listKitchenQueue",
    "listOrdersForShift",
    "listDiningTables",
    "getShiftOpenIfAny"
  ],
  "rulesApplied": [
    "orderTypeMustBeTableOrTakeout",
    "orderStatusTransitionsControlled",
    "shiftMustBeOpenToCreateOrders",
    "menuPriceIsSnapshottedOnOrderItem",
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
    "listDiningTables",
    "openDailyShift",
    "closeDailyShiftAndGenerateReport",
    "getShiftCloseReport",
    "getTodayDashboardMetrics",
    "upsertMenuItemAndRecipe",
    "listMenuItems",
    "getMenuItemWithRecipe",
    "requestAiSalesSummary",
    "requestAiPromoSuggestions"
  ],
  "materialization": {
    "fileName": "layer_4_entities/OrderEntity.ts",
    "className": "OrderEntity",
    "contractName": "IOrderEntity"
  }
} as const;

export default entity;
