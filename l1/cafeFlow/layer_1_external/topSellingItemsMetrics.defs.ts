/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts" enhancement="_blank"/>

export const topSellingItemsMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "topSellingItemsMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 63,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "moduleId": "cafeFlow",
      "title": "Itens Mais Vendidos",
      "purpose": "Identificar quais itens do cardápio geram mais volume e receita",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_timestamp",
      "columns": [
        {
          "name": "event_timestamp",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do evento de fechamento do pedido"
        },
        {
          "name": "menu_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item do cardápio"
        },
        {
          "name": "menu_category_id",
          "type": "uuid",
          "nullable": true,
          "description": "Categoria do cardápio"
        },
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderItemReferencesOrder (OrderItem -> Order)"
        },
        {
          "name": "dining_table_id",
          "type": "uuid",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderOptionallyReferencesDiningTable (Order -> DiningTable)"
        },
        {
          "name": "daily_shift_id",
          "type": "uuid",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderBelongsToShift (Order -> DailyShift)"
        },
        {
          "name": "quantity_sold",
          "type": "integer",
          "nullable": false,
          "default": "0",
          "description": "Quantidade vendida do item"
        },
        {
          "name": "item_revenue",
          "type": "numeric",
          "nullable": false,
          "default": "0",
          "description": "Receita gerada pelo item"
        }
      ],
      "dimensions": [
        {
          "dimensionId": "menuItemId",
          "column": "menu_item_id",
          "type": "uuid",
          "description": "Item do cardápio"
        },
        {
          "dimensionId": "menuCategoryId",
          "column": "menu_category_id",
          "type": "uuid",
          "description": "Categoria do cardápio"
        },
        {
          "dimensionId": "orderId",
          "column": "order_id",
          "type": "uuid",
          "description": "FK dimension derived from ontology relationship orderItemReferencesOrder (OrderItem -> Order)"
        },
        {
          "dimensionId": "diningTableId",
          "column": "dining_table_id",
          "type": "uuid",
          "description": "FK dimension derived from ontology relationship orderOptionallyReferencesDiningTable (Order -> DiningTable)"
        },
        {
          "dimensionId": "dailyShiftId",
          "column": "daily_shift_id",
          "type": "uuid",
          "description": "FK dimension derived from ontology relationship orderBelongsToShift (Order -> DailyShift)"
        }
      ],
      "measures": [
        {
          "measureId": "quantitySold",
          "column": "quantity_sold",
          "aggregation": "sum",
          "description": "Quantidade vendida do item"
        },
        {
          "measureId": "itemRevenue",
          "column": "item_revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita gerada pelo item"
        }
      ],
      "sourceWriteEvents": [
        "orderClosed"
      ],
      "hypertable": {
        "timeColumn": "event_timestamp",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "1 year",
        "indexes": [
          {
            "indexName": "idx_top_selling_items_metrics_time",
            "columns": [
              "event_timestamp"
            ],
            "purpose": "Hypertable time index",
            "unique": false
          },
          {
            "indexName": "idx_top_selling_items_metrics_menu_item",
            "columns": [
              "menu_item_id",
              "event_timestamp"
            ],
            "purpose": "Dimension index for menu item analysis",
            "unique": false
          },
          {
            "indexName": "idx_top_selling_items_metrics_daily_shift",
            "columns": [
              "daily_shift_id",
              "event_timestamp"
            ],
            "purpose": "Dimension index for shift-based queries",
            "unique": false
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "closeOrderL3Handler"
        ]
      },
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "rulesApplied": [
        "metricsDerivedFromClosedOrders",
        "menuPriceIsSnapshottedOnOrderItem",
        "updatedOnlyByLayer3Usecases"
      ]
    },
    "defsPlan": {
      "fileName": "tables/topSellingItemsMetrics.defs.ts",
      "exportName": "topSellingItemsMetricsTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default topSellingItemsMetricsTableDefinition;
