/// <mls fileReference="_102048_/l2/cafeFlow/aiInsightError.defs.ts" enhancement="_blank"/>

export const aiInsightErrorPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "aiInsightError",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "aiInsightError",
      "pageName": "Falha no insight de IA",
      "actor": "managerOwner",
      "purpose": "Mostrar erro de execução de IA e permitir retentativa.",
      "capabilities": [
        "aiSalesSummary",
        "aiPromoSuggestions"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": [
          "aiInsightExecution"
        ]
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "aiInsightRunId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador da execução de insight com falha.",
          "entityRef": "AiInsightRun",
          "fieldRef": "aiInsightRunId"
        },
        {
          "name": "insightType",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "queryParam",
            "previousStepResult"
          ],
          "description": "Tipo de insight solicitado para guiar a retentativa.",
          "entityRef": "AiInsightRun",
          "fieldRef": "insightType"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "aiAssistant",
          "trigger": "Abrir execução com falha"
        },
        {
          "direction": "outbound",
          "pageId": "aiAssistant",
          "trigger": "Após solicitar retentativa"
        }
      ],
      "sections": [
        {
          "sectionName": "Mensagem de erro",
          "mode": "view",
          "organisms": [
            {
              "organismName": "aiInsightRunErrorPanel",
              "purpose": "Exibir status de falha, mensagem de erro e parâmetros da execução de IA.",
              "userActions": [
                "Ver mensagem de erro"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [
                "aiInsightRunId",
                "status",
                "errorMessage",
                "insightType",
                "parameters",
                "timeWindowStart",
                "timeWindowEnd",
                "dailyShiftId",
                "language",
                "createdAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "aiUsesPlatformLlmProxy"
              ]
            }
          ]
        },
        {
          "sectionName": "Retentativa",
          "mode": "action",
          "organisms": [
            {
              "organismName": "aiInsightRetryActions",
              "purpose": "Permitir retentar o insight com os parâmetros da execução falhada.",
              "userActions": [
                "Tentar novamente resumo de vendas",
                "Tentar novamente sugestões de promoção"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [
                "insightType",
                "parameters",
                "timeWindowStart",
                "timeWindowEnd",
                "dailyShiftId",
                "language"
              ],
              "writesFields": [],
              "rulesApplied": [
                "aiUsesPlatformLlmProxy"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getAiInsightRun",
        "purpose": "Carregar erro e detalhes da execução falhada.",
        "kind": "query",
        "input": [
          {
            "name": "aiInsightRunId",
            "type": "uuid",
            "required": true
          }
        ],
        "output": [
          {
            "name": "aiInsightRunId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "errorMessage",
            "type": "string"
          },
          {
            "name": "insightType",
            "type": "string"
          },
          {
            "name": "parameters",
            "type": "string"
          },
          {
            "name": "timeWindowStart",
            "type": "datetime"
          },
          {
            "name": "timeWindowEnd",
            "type": "datetime"
          },
          {
            "name": "dailyShiftId",
            "type": "uuid"
          },
          {
            "name": "language",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "datetime"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "AiInsightRun"
        ],
        "writesEntities": [],
        "readsTables": [
          "ai_insight_run"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "getAiInsightRun"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "requestAiSalesSummary",
        "purpose": "Retentar resumo de vendas criando nova execução.",
        "kind": "command",
        "input": [
          {
            "name": "dailyShiftId",
            "type": "uuid",
            "required": false
          },
          {
            "name": "timeWindowStart",
            "type": "datetime",
            "required": false
          },
          {
            "name": "timeWindowEnd",
            "type": "datetime",
            "required": false
          },
          {
            "name": "language",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "aiInsightRunId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          }
        ],
        "readsEntities": [
          "DailyShift"
        ],
        "writesEntities": [
          "AiInsightRun"
        ],
        "readsTables": [
          "today_sales_metrics",
          "top_selling_items_metrics",
          "daily_shift"
        ],
        "writesTables": [
          "ai_insight_run"
        ],
        "usecaseRefs": [
          "requestAiSalesSummary"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "aiUsesPlatformLlmProxy"
        ]
      },
      {
        "commandName": "requestAiPromoSuggestions",
        "purpose": "Retentar sugestões criando nova execução.",
        "kind": "command",
        "input": [
          {
            "name": "timeWindowStart",
            "type": "datetime",
            "required": false
          },
          {
            "name": "timeWindowEnd",
            "type": "datetime",
            "required": false
          },
          {
            "name": "language",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "aiInsightRunId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          }
        ],
        "readsEntities": [],
        "writesEntities": [
          "AiInsightRun"
        ],
        "readsTables": [
          "top_selling_items_metrics"
        ],
        "writesTables": [
          "ai_insight_run"
        ],
        "usecaseRefs": [
          "requestAiPromoSuggestions"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "aiUsesPlatformLlmProxy"
        ]
      }
    ]
  }
} as const;

export default aiInsightErrorPagePlan;
