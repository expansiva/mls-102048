/// <mls fileReference="_102048_/l5/cafeFlow/ontology/DailyShift.defs.ts" enhancement="_blank"/>

export const DailyShiftEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "DailyShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 41,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "DailyShift",
      "title": "Turno Diário",
      "description": "Período operacional para consolidação de vendas, controle de abertura/fechamento e geração de relatório.",
      "ownership": "moduleOwned",
      "kind": "core",
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
      "rulesApplied": [
        "shiftMustBeOpenToCreateOrders"
      ]
    }
  }
} as const;

export default DailyShiftEntityDefinition;
