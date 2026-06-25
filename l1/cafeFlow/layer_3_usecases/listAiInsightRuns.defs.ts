/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listAiInsightRuns.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listAiInsightRuns",
  "title": "Listar execuções de insights de IA",
  "purpose": "Listar execuções recentes para histórico e reabertura no assistente.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "AiInsightRun"
  ],
  "outputEntities": [
    "AiInsightRun"
  ],
  "readsTables": [
    {
      "tableName": "ai_insight_run",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "aiInsightRun"
  ],
  "commands": [
    {
      "commandId": "listAiInsightRuns",
      "input": [
        {
          "name": "limit",
          "type": "number",
          "required": false
        },
        {
          "name": "statusFilter",
          "type": "string",
          "required": false
        },
        {
          "name": "fromDate",
          "type": "date",
          "required": false
        }
      ],
      "output": [
        {
          "name": "runs",
          "type": "AiInsightRun[]"
        },
        {
          "name": "totalCount",
          "type": "number"
        }
      ]
    }
  ]
} as const;

export default useCase;
