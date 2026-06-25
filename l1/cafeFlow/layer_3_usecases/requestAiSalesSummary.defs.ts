/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/requestAiSalesSummary.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "requestAiSalesSummary",
  "title": "Gerar resumo de vendas do dia (IA)",
  "purpose": "Solicitar ao proxy LLM um resumo de vendas do dia e registrar a execução; pode usar métricas como contexto.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "DailyShift"
  ],
  "outputEntities": [
    "AiInsightRun"
  ],
  "readsTables": [
    {
      "tableName": "today_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
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
      "commandId": "requestAiSalesSummary",
      "input": [
        {
          "name": "targetDate",
          "type": "date",
          "required": false
        },
        {
          "name": "includeMetricsContext",
          "type": "boolean",
          "required": false
        }
      ],
      "output": [
        {
          "name": "runId",
          "type": "string"
        },
        {
          "name": "summary",
          "type": "string"
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    }
  ]
} as const;

export default useCase;
