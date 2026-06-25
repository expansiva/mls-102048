/// <mls fileReference="_102048_/l1/cafeFlow/layer_4_entities/dailyShift.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "dailyShift",
  "title": "Agregado de Turno Diário",
  "purpose": "Abrir/fechar turno diário, consolidar vendas e gerar dados para relatório e métricas do turno.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "dailyShiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do turno diário"
    },
    {
      "fieldId": "shiftDate",
      "type": "date",
      "required": true,
      "description": "Data de referência do turno operacional"
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "enum": [
        "open",
        "closed"
      ],
      "description": "Situação atual do turno (aberto ou fechado)"
    },
    {
      "fieldId": "openedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da abertura do turno"
    },
    {
      "fieldId": "closedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora do fechamento do turno"
    },
    {
      "fieldId": "openedBy",
      "type": "string",
      "required": false,
      "description": "Nome do operador que abriu o turno"
    },
    {
      "fieldId": "closedBy",
      "type": "string",
      "required": false,
      "description": "Nome do operador que fechou o turno"
    },
    {
      "fieldId": "closingNotes",
      "type": "text",
      "required": false,
      "description": "Observações gerais registradas no fechamento do turno"
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
    "open",
    "closed"
  ],
  "lifecycleStates": [
    "open",
    "closed"
  ],
  "ontologyEntities": [
    "DailyShift",
    "Order"
  ],
  "sourceTables": [
    {
      "tableName": "daily_shift",
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
      "tableName": "shift_summary_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "today_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "dailyShift",
      "tableName": "daily_shift",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/dailyShift.defs.ts"
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
      "kind": "metricTable",
      "metricTableId": "shiftSummaryMetrics",
      "tableName": "shift_summary_metrics",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/shiftSummaryMetrics.defs.ts"
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
    }
  ],
  "allowedOperations": [
    "openShift",
    "closeShift",
    "getShiftById",
    "getOpenShift",
    "listShifts",
    "getShiftCloseReport"
  ],
  "rulesApplied": [
    "shiftMustBeOpenToCreateOrders",
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
    "openDailyShift",
    "closeDailyShiftAndGenerateReport",
    "getShiftCloseReport",
    "getTodayDashboardMetrics",
    "requestAiSalesSummary",
    "requestAiPromoSuggestions"
  ],
  "materialization": {
    "fileName": "layer_4_entities/DailyShiftEntity.ts",
    "className": "DailyShiftEntity",
    "contractName": "IDailyShiftEntity"
  }
} as const;

export default entity;
