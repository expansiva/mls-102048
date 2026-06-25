/// <mls fileReference="_102048_/l5/cafeFlow/ontology/AiInsightRun.defs.ts" enhancement="_blank"/>

export const AiInsightRunEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "AiInsightRun",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "AiInsightRun",
      "title": "Execução de Insight de IA",
      "description": "Registro de cada geração de resumo/sugestões (tipo, parâmetros, janela temporal, idioma, prompt/versão) e o resultado gerado para rastreabilidade.",
      "ownership": "moduleOwned",
      "kind": "event",
      "fields": [
        {
          "fieldId": "aiInsightRunId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da execução de insight de IA"
        },
        {
          "fieldId": "dailyShiftId",
          "type": "uuid",
          "required": false,
          "description": "Referência ao turno diário quando o insight está relacionado a um turno específico"
        },
        {
          "fieldId": "insightType",
          "type": "string",
          "required": true,
          "description": "Categoria do insight solicitado",
          "enum": [
            "dailySummary",
            "salesTrend",
            "inventoryAlert",
            "menuSuggestion",
            "shiftClosing"
          ]
        },
        {
          "fieldId": "parameters",
          "type": "text",
          "required": false,
          "description": "Parâmetros adicionais da solicitação em formato JSON ou texto livre"
        },
        {
          "fieldId": "timeWindowStart",
          "type": "datetime",
          "required": false,
          "description": "Início da janela temporal dos dados analisados"
        },
        {
          "fieldId": "timeWindowEnd",
          "type": "datetime",
          "required": false,
          "description": "Fim da janela temporal dos dados analisados"
        },
        {
          "fieldId": "language",
          "type": "string",
          "required": true,
          "description": "Idioma solicitado para o insight e do resultado gerado",
          "enum": [
            "pt-BR",
            "en"
          ]
        },
        {
          "fieldId": "promptVersion",
          "type": "string",
          "required": false,
          "description": "Versão do prompt ou do modelo utilizado"
        },
        {
          "fieldId": "promptText",
          "type": "text",
          "required": false,
          "description": "Texto completo do prompt enviado ao serviço de IA"
        },
        {
          "fieldId": "resultText",
          "type": "text",
          "required": false,
          "description": "Resposta/resultado gerado pelo modelo de IA"
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status atual da execução do insight",
          "enum": [
            "requested",
            "succeeded",
            "failed"
          ]
        },
        {
          "fieldId": "errorMessage",
          "type": "text",
          "required": false,
          "description": "Detalhes do erro quando a execução falha"
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
        "requested",
        "succeeded",
        "failed"
      ],
      "lifecycleStates": [
        "requested",
        "succeeded",
        "failed"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default AiInsightRunEntityDefinition;
