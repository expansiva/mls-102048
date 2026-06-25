/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/getAiInsightRun.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getAiInsightRun",
  "title": "Consultar execução de insight de IA",
  "purpose": "Obter status e conteúdo de uma execução de insight de IA (requested/succeeded/failed).",
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
      "commandId": "getAiInsightRun",
      "input": [
        {
          "name": "runId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "runId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "requestedAt",
          "type": "date"
        },
        {
          "name": "completedAt",
          "type": "date"
        },
        {
          "name": "errorMessage",
          "type": "string"
        }
      ]
    }
  ]
} as const;

export default useCase;
