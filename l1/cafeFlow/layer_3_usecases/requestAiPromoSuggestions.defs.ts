/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/requestAiPromoSuggestions.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "requestAiPromoSuggestions",
  "title": "Gerar sugestões de promoção (7 dias) (IA)",
  "purpose": "Solicitar ao proxy LLM sugestões de itens para promover com base em histórico agregado (ex.: top itens) e registrar execução.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "AiInsightsAggregate"
  ],
  "outputEntities": [
    "AiInsightRun"
  ],
  "readsTables": [
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "ai_insight_run",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "aiUsesPlatformLlmProxy"
  ],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "menuItem",
    "order"
  ],
  "commands": [
    {
      "commandId": "requestAiPromoSuggestions",
      "input": [],
      "output": [
        {
          "name": "insightId",
          "type": "string"
        },
        {
          "name": "runId",
          "type": "string"
        },
        {
          "name": "suggestions",
          "type": "string"
        },
        {
          "name": "createdAt",
          "type": "date"
        }
      ]
    }
  ]
} as const;

export default useCase;
