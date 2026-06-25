/// <mls fileReference="_102048_/l2/cafeFlow/aiAssistant.defs.ts" enhancement="_blank"/>

export const aiAssistantPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "aiAssistant",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 98,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "aiAssistant",
      "pageName": "Assistente IA",
      "actor": "managerOwner",
      "purpose": "Solicitar insights de IA (resumo de vendas do dia e sugestões de promoção 7 dias) e acompanhar execuções.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "aiInsightDetail",
          "trigger": "Abrir uma execução concluída"
        },
        {
          "direction": "outbound",
          "pageId": "aiInsightError",
          "trigger": "Abrir uma execução com falha"
        },
        {
          "direction": "outbound",
          "pageId": "aiPromoSuggestions",
          "trigger": "Abrir sugestões e marcar itens para promover"
        }
      ],
      "sections": [
        {
          "sectionName": "Solicitar insights",
          "mode": "create",
          "organisms": [
            {
              "organismName": "painelSolicitacaoResumoVendasDia",
              "purpose": "Disparar a geração do resumo de vendas do dia via IA.",
              "userActions": [
                "Solicitar resumo de vendas do dia"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [],
              "writesFields": [
                "AiInsightRun.aiInsightRunId",
                "AiInsightRun.insightType",
                "AiInsightRun.status",
                "AiInsightRun.createdAt"
              ],
              "rulesApplied": [
                "aiUsesPlatformLlmProxy"
              ]
            },
            {
              "organismName": "painelSolicitacaoSugestoesPromocao7Dias",
              "purpose": "Disparar a geração de sugestões de promoção para os próximos 7 dias via IA.",
              "userActions": [
                "Solicitar sugestões de promoção (7 dias)"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [],
              "writesFields": [
                "AiInsightRun.aiInsightRunId",
                "AiInsightRun.insightType",
                "AiInsightRun.status",
                "AiInsightRun.createdAt"
              ],
              "rulesApplied": [
                "aiUsesPlatformLlmProxy"
              ]
            }
          ]
        },
        {
          "sectionName": "Histórico de execuções",
          "mode": "view",
          "organisms": [
            {
              "organismName": "listaExecucoesInsights",
              "purpose": "Listar execuções recentes para acompanhamento e abertura de detalhes/erros.",
              "userActions": [
                "Ver histórico de execuções",
                "Abrir uma execução concluída",
                "Abrir uma execução com falha"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [
                "AiInsightRun.aiInsightRunId",
                "AiInsightRun.insightType",
                "AiInsightRun.status",
                "AiInsightRun.timeWindowStart",
                "AiInsightRun.timeWindowEnd",
                "AiInsightRun.language",
                "AiInsightRun.createdAt",
                "AiInsightRun.updatedAt",
                "AiInsightRun.errorMessage"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listAiInsightRuns",
        "purpose": "Listar execuções de insights para acompanhamento.",
        "kind": "query",
        "input": [
          {
            "name": "insightType",
            "type": "string",
            "required": false
          },
          {
            "name": "periodStart",
            "type": "date",
            "required": false
          },
          {
            "name": "periodEnd",
            "type": "date",
            "required": false
          }
        ],
        "output": [
          {
            "name": "aiInsightRunId",
            "type": "uuid"
          },
          {
            "name": "insightType",
            "type": "string"
          },
          {
            "name": "status",
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
          },
          {
            "name": "errorMessage",
            "type": "string"
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
          "listAiInsightRuns"
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
        "purpose": "Criar uma execução de IA para resumo de vendas do dia.",
        "kind": "command",
        "input": [
          {
            "name": "dailyShiftId",
            "type": "uuid",
            "required": false
          },
          {
            "name": "date",
            "type": "date",
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
        "purpose": "Criar uma execução de IA para sugestões de promoção (7 dias).",
        "kind": "command",
        "input": [
          {
            "name": "windowDays",
            "type": "number",
            "required": true
          },
          {
            "name": "goal",
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
          "AiInsightRun"
        ],
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

export default aiAssistantPagePlan;
