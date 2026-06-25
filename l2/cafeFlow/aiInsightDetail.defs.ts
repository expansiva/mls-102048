/// <mls fileReference="_102048_/l2/cafeFlow/aiInsightDetail.defs.ts" enhancement="_blank"/>

export const aiInsightDetailPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "aiInsightDetail",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "aiInsightDetail",
      "pageName": "Detalhe do insight de IA",
      "actor": "managerOwner",
      "purpose": "Ler o resultado do insight de IA (texto) e salvar para consulta/decisão.",
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
          "description": "Identificador da execução do insight de IA",
          "entityRef": "AiInsightRun",
          "fieldRef": "aiInsightRunId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "aiAssistant",
          "trigger": "Abrir execução concluída"
        },
        {
          "direction": "outbound",
          "pageId": "aiAssistant",
          "trigger": "Voltar"
        }
      ],
      "sections": [
        {
          "sectionName": "Status e metadados",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Painel de status da execução",
              "purpose": "Exibir status, tipo, janela temporal e timestamps da execução do insight.",
              "userActions": [
                "Ler status e metadados"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [
                "aiInsightRunId",
                "insightType",
                "timeWindowStart",
                "timeWindowEnd",
                "status",
                "createdAt",
                "updatedAt",
                "language"
              ],
              "writesFields": [],
              "rulesApplied": [
                "aiUsesPlatformLlmProxy"
              ]
            }
          ]
        },
        {
          "sectionName": "Resultado do insight",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Conteúdo do insight",
              "purpose": "Mostrar o texto gerado pela IA ou mensagem de erro quando aplicável.",
              "userActions": [
                "Ler insight"
              ],
              "requiredEntities": [
                "AiInsightRun"
              ],
              "readsFields": [
                "resultText",
                "errorMessage",
                "status",
                "promptVersion"
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
        "purpose": "Carregar o conteúdo e status de uma execução de insight.",
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
            "name": "insightType",
            "type": "string"
          },
          {
            "name": "parameters",
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
            "name": "promptVersion",
            "type": "string"
          },
          {
            "name": "promptText",
            "type": "text"
          },
          {
            "name": "resultText",
            "type": "text"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "errorMessage",
            "type": "text"
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
        "rulesApplied": [
          "aiUsesPlatformLlmProxy"
        ]
      }
    ]
  }
} as const;

export default aiInsightDetailPagePlan;
