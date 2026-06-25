/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/lowStockMetrics.defs.ts" enhancement="_blank"/>

export const lowStockMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "lowStockMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 64,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "lowStockMetrics",
      "tableName": "low_stock_metrics",
      "moduleId": "cafeFlow",
      "title": "Estoque Baixo",
      "purpose": "Monitorar saldos de ingredientes e alertar sobre itens abaixo do nível crítico",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_timestamp",
      "columns": [
        {
          "name": "event_timestamp",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do evento que atualiza a métrica"
        },
        {
          "name": "inventory_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item de estoque (ingrediente)"
        },
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship inventoryTxOptionallyReferencesOrder (InventoryTransaction -> Order)"
        },
        {
          "name": "daily_shift_id",
          "type": "uuid",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship snapshotByShift (InventoryBalanceSnapshot -> DailyShift)"
        },
        {
          "name": "balance_quantity",
          "type": "numeric",
          "nullable": true,
          "description": "Saldo atual em estoque"
        },
        {
          "name": "min_threshold",
          "type": "numeric",
          "nullable": true,
          "description": "Estoque mínimo configurado"
        },
        {
          "name": "is_below_threshold",
          "type": "integer",
          "nullable": true,
          "description": "Indicador de estoque abaixo do mínimo (1=sim, 0=não)"
        }
      ],
      "dimensions": [
        {
          "dimensionId": "inventoryItemId",
          "column": "inventory_item_id",
          "type": "uuid",
          "description": "Item de estoque (ingrediente)"
        },
        {
          "dimensionId": "orderId",
          "column": "order_id",
          "type": "uuid",
          "description": "FK dimension derived from ontology relationship inventoryTxOptionallyReferencesOrder (InventoryTransaction -> Order)"
        },
        {
          "dimensionId": "dailyShiftId",
          "column": "daily_shift_id",
          "type": "uuid",
          "description": "FK dimension derived from ontology relationship snapshotByShift (InventoryBalanceSnapshot -> DailyShift)"
        }
      ],
      "measures": [
        {
          "measureId": "currentBalance",
          "column": "balance_quantity",
          "aggregation": "last",
          "unit": "unidade",
          "description": "Saldo atual em estoque"
        },
        {
          "measureId": "minThreshold",
          "column": "min_threshold",
          "aggregation": "last",
          "unit": "unidade",
          "description": "Estoque mínimo configurado"
        },
        {
          "measureId": "belowThresholdFlag",
          "column": "is_below_threshold",
          "aggregation": "max",
          "description": "Indicador de estoque abaixo do mínimo (1=sim, 0=não)"
        }
      ],
      "sourceWriteEvents": [
        "inventoryTransactionPosted",
        "inventoryAdjustmentPosted",
        "orderClosed"
      ],
      "hypertable": {
        "timeColumn": "event_timestamp",
        "chunkTimeInterval": "1 day",
        "retentionPolicy": "90 days",
        "indexes": [
          {
            "indexName": "idx_low_stock_metrics_time",
            "columns": [
              "event_timestamp"
            ],
            "purpose": "Hypertable time-based chunking and queries",
            "unique": false
          },
          {
            "indexName": "idx_low_stock_metrics_item_time",
            "columns": [
              "inventory_item_id",
              "event_timestamp"
            ],
            "purpose": "Query by inventory item over time",
            "unique": false
          },
          {
            "indexName": "idx_low_stock_metrics_shift",
            "columns": [
              "daily_shift_id"
            ],
            "purpose": "Filter by shift for daily views",
            "unique": false
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "closeOrderAndDeductInventoryCommand",
          "postInventoryAdjustmentCommand"
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
        "inventoryDeductionHappensOnSaleEvent",
        "inventoryCannotGoNegativeByDefault",
        "updatedOnlyByLayer3Usecases"
      ]
    },
    "defsPlan": {
      "fileName": "tables/lowStockMetrics.defs.ts",
      "exportName": "lowStockMetricsTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default lowStockMetricsTableDefinition;
