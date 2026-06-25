/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/inventoryBalanceSnapshot.defs.ts" enhancement="_blank"/>

export const inventoryBalanceSnapshotTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "inventoryBalanceSnapshot",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 54,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "inventoryBalanceSnapshot",
      "tableName": "inventory_balance_snapshot",
      "moduleId": "cafeFlow",
      "title": "Snapshot de Saldo de Estoque",
      "purpose": "Persistir snapshots periódicos/por evento do saldo calculado por ingrediente para leituras rápidas (ex.: estoque baixo) e suporte a relatórios sem recalcular todo o histórico a cada consulta.",
      "ownership": "moduleOwned",
      "rootEntity": "InventoryBalanceSnapshot",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do snapshot de saldo."
        },
        {
          "name": "inventory_item_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": false,
          "description": "Referência ao item de estoque cujo saldo foi registrado."
        },
        {
          "name": "daily_shift_id",
          "type": "uuid",
          "nullable": true,
          "primaryKey": false,
          "description": "Referência opcional ao turno em que o snapshot foi capturado (ex.: fechamento de turno)."
        },
        {
          "name": "quantity_on_hand",
          "type": "numeric",
          "nullable": false,
          "primaryKey": false,
          "description": "Quantidade em estoque no momento do snapshot."
        },
        {
          "name": "unit_cost",
          "type": "numeric",
          "nullable": true,
          "primaryKey": false,
          "description": "Custo unitário opcional no momento do snapshot para valorização."
        },
        {
          "name": "recorded_at",
          "type": "timestamptz",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora em que o snapshot foi registrado."
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "primaryKey": false,
          "default": "now()",
          "description": "Data e hora de criação do registro."
        },
        {
          "name": "updated_at",
          "type": "timestamptz",
          "nullable": false,
          "primaryKey": false,
          "default": "now()",
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "primaryKey": [
        "id"
      ],
      "foreignRefs": [
        {
          "fieldName": "inventory_item_id",
          "targetEntity": "InventoryItem",
          "targetOwnership": "mdmOwned",
          "reason": "Referência a item de estoque gerenciado em MDM para snapshots de saldo."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_inventory_balance_snapshot_item_recorded",
          "columns": [
            "inventory_item_id",
            "recorded_at"
          ],
          "unique": false,
          "reason": "Suporte a consultas rápidas por item e período para relatórios e alertas de estoque."
        },
        {
          "indexName": "idx_inventory_balance_snapshot_shift",
          "columns": [
            "daily_shift_id"
          ],
          "unique": false,
          "reason": "Busca rápida de snapshots por turno para fechamento e auditoria."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "InventoryBalanceSnapshotDetails",
        "reason": "Armazenar dados adicionais internos ou metadados do snapshot como JSON para flexibilidade sem alterar schema."
      },
      "metricUpdatePolicy": {
        "feedsMetrics": false,
        "metricRefs": [],
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
      "fileName": "tables/inventoryBalanceSnapshot.defs.ts",
      "exportName": "inventoryBalanceSnapshotTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryBalanceSnapshotTableDefinition;
