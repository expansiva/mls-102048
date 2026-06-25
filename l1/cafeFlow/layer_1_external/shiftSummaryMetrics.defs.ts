/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/shiftSummaryMetrics.defs.ts" enhancement="_blank"/>

export const shiftSummaryMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "shiftSummaryMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 65,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "shiftSummaryMetrics",
      "tableName": "shift_summary_metrics",
      "moduleId": "cafeFlow",
      "title": "Resumo do Turno",
      "purpose": "Consolidar indicadores financeiros e operacionais ao final de cada turno diário",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_timestamp",
      "columns": [
        {
          "name": "event_timestamp",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do evento de fechamento do pedido ou turno"
        },
        {
          "name": "menu_item_id",
          "type": "uuid",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderItemReferencesMenuItem (OrderItem -> MenuItem)"
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
          "nullable": false,
          "description": "FK dimension derived from ontology relationship orderBelongsToShift (Order -> DailyShift)"
        },
        {
          "name": "order_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderHasItems (OrderItem -> Order)"
        },
        {
          "name": "revenue",
          "type": "numeric",
          "nullable": false,
          "default": "0",
          "description": "Receita total do turno"
        },
        {
          "name": "order_count",
          "type": "integer",
          "nullable": false,
          "default": "0",
          "description": "Total de pedidos no turno"
        },
        {
          "name": "items_sold",
          "type": "integer",
          "nullable": false,
          "default": "0",
          "description": "Total de itens vendidos no turno"
        },
        {
          "name": "ticket_value",
          "type": "numeric",
          "nullable": false,
          "default": "0",
          "description": "Ticket médio do turno"
        }
      ],
      "dimensions": [
        {
          "dimensionId": "menuItemId",
          "column": "menu_item_id",
          "type": "uuid",
          "description": "FK dimension derived from ontology relationship orderItemReferencesMenuItem (OrderItem -> MenuItem)"
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
        },
        {
          "dimensionId": "orderId",
          "column": "order_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship orderHasItems (OrderItem -> Order)"
        }
      ],
      "measures": [
        {
          "measureId": "shiftRevenue",
          "column": "revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita total do turno"
        },
        {
          "measureId": "shiftOrders",
          "column": "order_count",
          "aggregation": "sum",
          "description": "Total de pedidos no turno"
        },
        {
          "measureId": "shiftItemsSold",
          "column": "items_sold",
          "aggregation": "sum",
          "description": "Total de itens vendidos no turno"
        },
        {
          "measureId": "shiftAverageTicket",
          "column": "ticket_value",
          "aggregation": "avg",
          "unit": "BRL",
          "description": "Ticket médio do turno"
        }
      ],
      "sourceWriteEvents": [
        "dailyShiftClosed",
        "orderClosed"
      ],
      "hypertable": {
        "timeColumn": "event_timestamp",
        "chunkTimeInterval": "1 day",
        "retentionPolicy": "5 years",
        "indexes": [
          {
            "indexName": "idx_shift_summary_metrics_time",
            "columns": [
              "event_timestamp"
            ],
            "purpose": "Hypertable time-based partitioning and queries",
            "unique": false
          },
          {
            "indexName": "idx_shift_summary_metrics_shift_item",
            "columns": [
              "daily_shift_id",
              "menu_item_id"
            ],
            "purpose": "Dimension index for shift and menu item breakdowns",
            "unique": false
          },
          {
            "indexName": "idx_shift_summary_metrics_dining_table",
            "columns": [
              "dining_table_id"
            ],
            "purpose": "Dimension index for dining table",
            "unique": false
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "closeShiftCommand",
          "closeOrderAndDeductInventoryCommand"
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
        "shiftMustBeOpenToCreateOrders",
        "updatedOnlyByLayer3Usecases"
      ]
    },
    "defsPlan": {
      "fileName": "tables/shiftSummaryMetrics.defs.ts",
      "exportName": "shiftSummaryMetricsTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default shiftSummaryMetricsTableDefinition;
