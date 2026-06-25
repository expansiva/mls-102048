/// <mls fileReference="_102048_/l5/cafeFlow/ontology/DiningTable.defs.ts" enhancement="_blank"/>

export const DiningTableEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "DiningTable",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "DiningTable",
      "title": "Mesa",
      "description": "Identificador operacional de mesa para pedidos no salão; simples e configurável para operação local.",
      "ownership": "moduleOwned",
      "kind": "supporting",
      "fields": [
        {
          "fieldId": "diningTableId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da mesa"
        },
        {
          "fieldId": "tableNumber",
          "type": "string",
          "required": true,
          "description": "Número ou identificador operacional da mesa (ex: 1, A1, 10)"
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "enum": [
            "active",
            "inactive"
          ],
          "description": "Estado operacional da mesa"
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
        "active",
        "inactive"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default DiningTableEntityDefinition;
