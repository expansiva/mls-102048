/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/inventoryTransaction.defs.ts" enhancement="_blank"/>

export const inventoryTransactionTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "inventoryTransaction",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 53,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "inventoryTransaction",
      "tableName": "inventory_transaction",
      "moduleId": "cafeFlow",
      "title": "Movimentação de Estoque",
      "purpose": "Registrar eventos de movimentação de estoque (ajuste manual e baixa automática por venda), com rastreabilidade e possibilidade de reversão.",
      "ownership": "moduleOwned",
      "rootEntity": "InventoryTransaction",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "inventoryTransactionId",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único da movimentação de estoque."
        },
        {
          "name": "inventoryItemId",
          "type": "uuid",
          "nullable": false,
          "primaryKey": false,
          "description": "Referência ao ingrediente/insumo movimentado."
        },
        {
          "name": "orderId",
          "type": "uuid",
          "nullable": true,
          "primaryKey": false,
          "description": "Referência ao pedido origem em caso de baixa automática por venda."
        },
        {
          "name": "transactionType",
          "type": "string",
          "nullable": false,
          "primaryKey": false,
          "description": "Tipo da movimentação: entrada de estoque, baixa por venda ou ajuste manual."
        },
        {
          "name": "quantityChange",
          "type": "number",
          "nullable": false,
          "primaryKey": false,
          "description": "Quantidade alterada no estoque. Positivo para entrada, negativo para baixa ou ajuste de redução."
        },
        {
          "name": "reason",
          "type": "text",
          "nullable": true,
          "primaryKey": false,
          "description": "Motivo do ajuste manual ou observação sobre a movimentação."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "primaryKey": false,
          "description": "Status do registro: lançado ou estornado."
        },
        {
          "name": "recordedAt",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora em que a movimentação ocorreu efetivamente."
        },
        {
          "name": "createdBy",
          "type": "string",
          "nullable": true,
          "primaryKey": false,
          "description": "Identificador do usuário responsável pelo registro."
        },
        {
          "name": "createdAt",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora de criação do registro."
        },
        {
          "name": "updatedAt",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "primaryKey": [
        "inventoryTransactionId"
      ],
      "foreignRefs": [
        {
          "fieldName": "inventoryItemId",
          "targetEntity": "InventoryItem",
          "targetOwnership": "mdmOwned",
          "reason": "Referência ao item de inventário gerenciado em MDM para rastreabilidade de estoque."
        },
        {
          "fieldName": "orderId",
          "targetEntity": "Order",
          "targetOwnership": "existingModuleOwned",
          "reason": "Referência opcional ao pedido para baixa automática por venda."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_inventory_transaction_item_recorded",
          "columns": [
            "inventoryItemId",
            "recordedAt"
          ],
          "unique": false,
          "reason": "Consulta frequente de histórico por ingrediente e período para relatórios e dashboards."
        },
        {
          "indexName": "idx_inventory_transaction_status",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Filtragem por status (posted/reversed) em workflows de estorno e auditoria."
        },
        {
          "indexName": "idx_inventory_transaction_order",
          "columns": [
            "orderId"
          ],
          "unique": false,
          "reason": "Lookup de transações por pedido para idempotência e reversão."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "InventoryTransactionDetails",
        "reason": "Armazenamento de metadados adicionais da transação (ex: snapshot de receita) como JSON para flexibilidade sem colunas extras."
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "lowStockMetricTable",
          "shiftSummaryMetricTable"
        ],
        "updatedByLayer": "layer_3_usecases"
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
        "inventoryCannotGoNegativeByDefault"
      ]
    },
    "defsPlan": {
      "fileName": "tables/inventoryTransaction.defs.ts",
      "exportName": "inventoryTransactionTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryTransactionTableDefinition;
