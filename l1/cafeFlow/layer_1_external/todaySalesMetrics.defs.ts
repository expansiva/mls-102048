/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/todaySalesMetrics.defs.ts" enhancement="_blank"/>

export const todaySalesMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "todaySalesMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "todaySalesMetrics",
      "tableName": "today_sales_metrics",
      "moduleId": "cafeFlow",
      "title": "Vendas de Hoje",
      "purpose": "Acompanhar receita, quantidade de pedidos e ticket médio em tempo real durante o turno",
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
          "name": "order_type",
          "type": "string",
          "nullable": false,
          "description": "Tipo do pedido: mesa ou takeout"
        },
        {
          "name": "menu_item_id",
          "type": "uuid",
          "nullable": true,
          "description": "Item do cardápio"
        },
        {
          "name": "menu_category_id",
          "type": "uuid",
          "nullable": true,
          "description": "Categoria do cardápio"
        },
        {
          "name": "dining_table_id",
          "type": "uuid",
          "nullable": true,
          "description": "Mesa"
        },
        {
          "name": "daily_shift_id",
          "type": "uuid",
          "nullable": false,
          "description": "FK dimension derived from ontology relationship orderBelongsToShift (Order -> DailyShift)"
        },
        {
          "name": "total_revenue",
          "type": "numeric",
          "nullable": false,
          "default": "0",
          "description": "Receita total"
        },
        {
          "name": "order_count",
          "type": "integer",
          "nullable": false,
          "default": "0",
          "description": "Quantidade de pedidos"
        },
        {
          "name": "item_quantity",
          "type": "integer",
          "nullable": false,
          "default": "0",
          "description": "Quantidade total de itens vendidos"
        },
        {
          "name": "ticket_value",
          "type": "numeric",
          "nullable": false,
          "default": "0",
          "description": "Ticket médio"
        }
      ],
      "dimensions": [
        {
          "dimensionId": "orderType",
          "column": "order_type",
          "type": "string",
          "description": "Tipo do pedido: mesa ou takeout"
        },
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
          "dimensionId": "diningTableId",
          "column": "dining_table_id",
          "type": "uuid",
          "description": "Mesa"
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
          "measureId": "totalRevenue",
          "column": "total_revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita total"
        },
        {
          "measureId": "totalOrders",
          "column": "order_count",
          "aggregation": "sum",
          "description": "Quantidade de pedidos"
        },
        {
          "measureId": "totalItemsSold",
          "column": "item_quantity",
          "aggregation": "sum",
          "description": "Quantidade total de itens vendidos"
        },
        {
          "measureId": "averageTicket",
          "column": "ticket_value",
          "aggregation": "avg",
          "unit": "BRL",
          "description": "Ticket médio"
        }
      ],
      "sourceWriteEvents": [
        "orderClosed"
      ],
      "hypertable": {
        "timeColumn": "event_timestamp",
        "chunkTimeInterval": "1 day",
        "retentionPolicy": "90 days",
        "indexes": [
          {
            "indexName": "idx_today_sales_metrics_time",
            "columns": [
              "event_timestamp"
            ],
            "purpose": "Hypertable time-based partitioning and queries",
            "unique": false
          },
          {
            "indexName": "idx_today_sales_metrics_shift_type",
            "columns": [
              "daily_shift_id",
              "order_type"
            ],
            "purpose": "Dimension index for shift and order type filtering",
            "unique": false
          },
          {
            "indexName": "idx_today_sales_metrics_menu_item",
            "columns": [
              "menu_item_id"
            ],
            "purpose": "Dimension index for menu item aggregation",
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
        "shiftMustBeOpenToCreateOrders",
        "updatedOnlyByLayer3Usecases"
      ]
    },
    "defsPlan": {
      "fileName": "tables/todaySalesMetrics.defs.ts",
      "exportName": "todaySalesMetricsTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default todaySalesMetricsTableDefinition;
