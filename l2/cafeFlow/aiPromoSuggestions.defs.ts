/// <mls fileReference="_102048_/l2/cafeFlow/aiPromoSuggestions.defs.ts" enhancement="_blank"/>

export const aiPromoSuggestionsPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "aiPromoSuggestions",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "aiPromoSuggestions",
      "pageName": "Sugestões de promoção (IA)",
      "actor": "managerOwner",
      "purpose": "Aplicar sugestões de promoção geradas pela IA, marcando itens para promover hoje e registrando um plano interno.",
      "capabilities": [
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
      "mdmRefs": [
        "menuItem"
      ],
      "pageInputs": [
        {
          "name": "aiInsightRunId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador da execução de insight de IA a ser exibida.",
          "entityRef": "AiInsightRun",
          "fieldRef": "aiInsightRunId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "aiAssistant",
          "trigger": "Após concluir execução de sugestões"
        },
        {
          "direction": "outbound",
          "pageId": "aiInsightDetail",
          "trigger": "Ver detalhes completos da execução"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo da execução",
          "mode": "view",
          "organisms": [
            {
              "organismName": "aiInsightSummary",
              "purpose": "Exibir status e texto do insight com contexto de janela temporal.",
              "userActions": [
                "Ver detalhes completos da execução"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [
                "AiInsightRun.aiInsightRunId",
                "AiInsightRun.status",
                "AiInsightRun.resultText",
                "AiInsightRun.timeWindowStart",
                "AiInsightRun.timeWindowEnd",
                "AiInsightRun.language",
                "AiInsightRun.createdAt",
                "AiInsightRun.errorMessage"
              ],
              "writesFields": [],
              "rulesApplied": [
                "aiUsesPlatformLlmProxy"
              ]
            }
          ]
        },
        {
          "sectionName": "Sugestões e marcação",
          "mode": "select",
          "organisms": [
            {
              "organismName": "promoSuggestionsList",
              "purpose": "Listar itens sugeridos pela IA e permitir marcar para promover hoje.",
              "userActions": [
                "Ver lista sugerida",
                "Marcar itens como \"promover hoje\"",
                "Compartilhar com equipe (fora do app ou export)"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [
                "AiInsightRun.resultText"
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
        "purpose": "Obter lista estruturada/texto de sugestões para renderização e marcação.",
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
            "name": "resultText",
            "type": "text"
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
            "name": "errorMessage",
            "type": "text"
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
        "rulesApplied": [
          "aiUsesPlatformLlmProxy"
        ]
      }
    ],
    "pendingQuestions": [
      "Qual é a entidade/registro que representa o “plano interno” de promoção e quais campos devem ser gravados ao marcar itens como “promover hoje” (ex.: promoPlanId, data, lista de menuItemIds, observações)?",
      "Existe um usecase já definido para criar/atualizar esse plano (ex.: createPromoPlan/markItemsForPromotion) e quais tabelas moduleOwned ele grava?",
      "As sugestões da IA vêm estruturadas com IDs de MenuItem (para seleção direta) ou apenas texto? Precisamos de um usecase adicional para mapear nomes para menuItemId?"
    ]
  }
} as const;

export default aiPromoSuggestionsPagePlan;
