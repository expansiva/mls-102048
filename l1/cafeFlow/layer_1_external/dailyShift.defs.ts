/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/dailyShift.defs.ts" enhancement="_blank"/>

export const dailyShiftTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "dailyShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 52,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "dailyShift",
      "tableName": "daily_shift",
      "moduleId": "cafeFlow",
      "title": "Turno Diário",
      "purpose": "Persistir abertura/fechamento de turno, valores de caixa declarados, usuário responsável e status, servindo de âncora para pedidos e relatórios do dia/turno.",
      "ownership": "moduleOwned",
      "rootEntity": "DailyShift",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "daily_shift_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do turno diário"
        },
        {
          "name": "shift_date",
          "type": "date",
          "nullable": false,
          "primaryKey": false,
          "description": "Data de referência do turno operacional"
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "primaryKey": false,
          "description": "Situação atual do turno (aberto ou fechado)"
        },
        {
          "name": "opened_at",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora da abertura do turno"
        },
        {
          "name": "closed_at",
          "type": "datetime",
          "nullable": true,
          "primaryKey": false,
          "description": "Data e hora do fechamento do turno"
        },
        {
          "name": "opened_by",
          "type": "string",
          "nullable": true,
          "primaryKey": false,
          "description": "Nome do operador que abriu o turno"
        },
        {
          "name": "closed_by",
          "type": "string",
          "nullable": true,
          "primaryKey": false,
          "description": "Nome do operador que fechou o turno"
        },
        {
          "name": "closing_notes",
          "type": "text",
          "nullable": true,
          "primaryKey": false,
          "description": "Observações gerais registradas no fechamento do turno"
        },
        {
          "name": "created_at",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora de criação do registro"
        },
        {
          "name": "updated_at",
          "type": "datetime",
          "nullable": false,
          "primaryKey": false,
          "description": "Data e hora da última atualização do registro"
        }
      ],
      "primaryKey": [
        "daily_shift_id"
      ],
      "foreignRefs": [],
      "indexes": [
        {
          "indexName": "idx_daily_shift_date",
          "columns": [
            "shift_date"
          ],
          "unique": false,
          "reason": "Busca rápida por data para dashboard e relatórios"
        },
        {
          "indexName": "idx_daily_shift_status",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Filtro por status aberto/fechado em workflows"
        },
        {
          "indexName": "idx_daily_shift_date_status",
          "columns": [
            "shift_date",
            "status"
          ],
          "unique": false,
          "reason": "Consultas combinadas para métricas e POS"
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "DailyShiftDetails",
        "reason": "Armazenar dados internos adicionais ou snapshots como JSONB"
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
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
        "shiftMustBeOpenToCreateOrders",
        "metricsDerivedFromClosedOrders"
      ]
    },
    "defsPlan": {
      "fileName": "tables/dailyShift.defs.ts",
      "exportName": "dailyShiftTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default dailyShiftTableDefinition;
