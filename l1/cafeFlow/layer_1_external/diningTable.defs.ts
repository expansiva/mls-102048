/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/diningTable.defs.ts" enhancement="_blank"/>

export const diningTableTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "diningTable",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 51,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "diningTable",
      "tableName": "dining_table",
      "moduleId": "cafeFlow",
      "title": "Mesa",
      "purpose": "Manter cadastro operacional de mesas (ativas/inativas) para pedidos do tipo mesa e para UX do POS/KDS.",
      "ownership": "moduleOwned",
      "rootEntity": "DiningTable",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "diningTableId",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único da mesa"
        },
        {
          "name": "tableNumber",
          "type": "string",
          "nullable": false,
          "primaryKey": false,
          "description": "Número ou identificador operacional da mesa (ex: 1, A1, 10)"
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "primaryKey": false,
          "description": "Estado operacional da mesa"
        },
        {
          "name": "createdAt",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora de criação do registro"
        },
        {
          "name": "updatedAt",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora da última atualização do registro"
        }
      ],
      "primaryKey": [
        "diningTableId"
      ],
      "foreignRefs": [],
      "indexes": [
        {
          "indexName": "idx_dining_table_number",
          "columns": [
            "tableNumber"
          ],
          "unique": true,
          "reason": "Garantir unicidade do número da mesa para operação local"
        },
        {
          "indexName": "idx_dining_table_status",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Busca rápida de mesas ativas para POS e KDS"
        }
      ],
      "detailsColumn": {
        "enabled": false,
        "reason": "Sem dados filhos ou internos para armazenar como JSON"
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
        "orderTypeMustBeTableOrTakeout"
      ]
    },
    "defsPlan": {
      "fileName": "tables/diningTable.defs.ts",
      "exportName": "diningTableTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default diningTableTableDefinition;
