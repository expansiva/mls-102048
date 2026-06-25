/// <mls fileReference="_102048_/l4/workflows/aiInsightExecution.defs.ts" enhancement="_blank"/>

export const aiInsightExecutionDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "aiInsightExecution",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "aiInsightExecution",
      "title": "Execução de insights por IA",
      "purpose": "Orquestrar a geração assíncrona de resumos de vendas e sugestões de promoção via proxy LLM da plataforma, rastreando o estado de cada execução e disponibilizando os resultados ao gerente.",
      "executionMode": "automation",
      "createsTask": false,
      "actors": [
        "managerOwner"
      ],
      "states": [
        {
          "stateId": "requested",
          "description": "Execução de insight solicitada e aguardando resposta do proxy LLM"
        },
        {
          "stateId": "succeeded",
          "description": "Insight gerado com sucesso e resultado disponível para consulta"
        },
        {
          "stateId": "failed",
          "description": "Falha na geração do insight com registro do erro"
        }
      ],
      "transitions": [
        {
          "from": "",
          "to": "requested",
          "trigger": "requestSalesSummary",
          "actor": "managerOwner",
          "actions": [
            "createAiInsightRun",
            "setInsightTypeDailySummary",
            "setStatusRequested"
          ],
          "conditions": [],
          "rulesApplied": [
            "aiUsesPlatformLlmProxy"
          ]
        },
        {
          "from": "",
          "to": "requested",
          "trigger": "requestPromoSuggestions",
          "actor": "managerOwner",
          "actions": [
            "createAiInsightRun",
            "setInsightTypeMenuSuggestion",
            "setStatusRequested"
          ],
          "conditions": [],
          "rulesApplied": [
            "aiUsesPlatformLlmProxy"
          ]
        },
        {
          "from": "requested",
          "to": "succeeded",
          "trigger": "llmProxySucceeded",
          "actor": "managerOwner",
          "actions": [
            "setStatusSucceeded",
            "storeResultText"
          ],
          "conditions": [],
          "rulesApplied": []
        },
        {
          "from": "requested",
          "to": "failed",
          "trigger": "llmProxyFailed",
          "actor": "managerOwner",
          "actions": [
            "setStatusFailed",
            "storeErrorMessage"
          ],
          "conditions": [],
          "rulesApplied": []
        }
      ],
      "userActions": [
        "requestAiSalesSummary",
        "requestAiPromoSuggestions",
        "getAiInsightRun",
        "listAiInsightRuns"
      ],
      "requiredEntities": [
        "AiInsightRun",
        "Order"
      ],
      "rulesApplied": [
        "aiUsesPlatformLlmProxy"
      ],
      "persistenceRefs": [
        "aiInsightRun",
        "order"
      ],
      "usecaseRefs": [
        "requestAiSalesSummary",
        "requestAiPromoSuggestions",
        "getAiInsightRun",
        "listAiInsightRuns"
      ],
      "metricRefs": [],
      "moduleRefs": [
        "cafeFlow"
      ],
      "workflowScope": "singleModule",
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "cafeFlow",
          "entity": "AiInsightRun"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "Order"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "table",
          "artifactId": "aiInsightRun"
        }
      ],
      "relatedAgents": [],
      "relatedPages": [
        "aiAssistant",
        "aiInsightDetail",
        "aiInsightError",
        "aiPromoSuggestions"
      ],
      "relatedPlugins": [],
      "taskConfig": {
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false,
        "taskTitleTemplate": ""
      },
      "implementationSuggestions": [
        {
          "suggestionId": "asyncAiPolling",
          "title": "Polling ou notificação assíncrona para IA",
          "description": "As chamadas ao LLM podem ter latência variável; o frontend deve acompanhar o status da execução via polling ou eventos.",
          "priority": "soon",
          "tradeoff": "Aumenta tráfego de rede leve ou exige infraestrutura de eventos, mas garante UX responsiva sem bloqueio."
        },
        {
          "suggestionId": "aiCacheWindow",
          "title": "Cache de resultados IA por janela temporal",
          "description": "Evitar reprocessamento idêntico dentro do mesmo dia para o mesmo tipo de insight, reduzindo custo e tempo de resposta.",
          "priority": "later",
          "tradeoff": "Economia de tokens e latência, mas aumenta complexidade de invalidação e consistência."
        },
        {
          "suggestionId": "automationWithoutTask",
          "title": "Execução como automação sem tarefa",
          "description": "O workflow rastreia o ciclo de vida da execução de IA de forma autônoma; o gerente consulta resultados via listagem/polling, não necessitando de tarefa atribuída.",
          "priority": "now",
          "tradeoff": "Reduz ruído na caixa de tarefas, porém exige que o usuário navegue até a tela de insights para acompanhar conclusão."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/aiInsightExecution.defs.ts",
      "exportName": "aiInsightExecutionDef",
      "saveAsDefs": true
    }
  }
} as const;

export default aiInsightExecutionDef;
