/// <mls fileReference="_102048_/l4/workflows/dailyShiftLifecycle.defs.ts" enhancement="_blank"/>

export const dailyShiftLifecycleDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "dailyShiftLifecycle",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "dailyShiftLifecycle",
      "title": "Abertura e fechamento de turno diário",
      "purpose": "Controlar o ciclo de vida do turno diário, assegurando que apenas um turno esteja aberto por dia, validando pendências antes do fechamento e consolidando métricas e relatórios gerenciais.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "actors": [
        "managerOwner"
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "cafeFlow"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "cafeFlow",
          "entity": "DailyShift"
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
          "artifactId": "dailyShift"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "shiftSummaryMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "todaySalesMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "topSellingItemsMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "openDailyShift"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "closeDailyShiftAndGenerateReport"
        }
      ],
      "persistenceRefs": [
        "dailyShift",
        "order",
        "shiftSummaryMetrics",
        "todaySalesMetrics",
        "topSellingItemsMetrics"
      ],
      "usecaseRefs": [
        "openDailyShift",
        "closeDailyShiftAndGenerateReport",
        "getShiftCloseReport",
        "getTodayDashboardMetrics"
      ],
      "metricRefs": [
        "shiftSummaryMetrics",
        "todaySalesMetrics",
        "topSellingItemsMetrics"
      ],
      "requiredEntities": [
        "DailyShift",
        "Order"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "relatedPages": [
        "dashboardToday",
        "managerMetricsDashboard",
        "shiftClose",
        "shiftCloseBlocked",
        "shiftCloseConfirm",
        "shiftCloseReport",
        "shiftOpen",
        "shiftRequiredBlock"
      ],
      "userActions": [
        "openShift",
        "closeShift"
      ],
      "rulesApplied": [
        "shiftMustBeOpenToCreateOrders",
        "metricsDerivedFromClosedOrders"
      ],
      "states": [
        {
          "stateId": "initial",
          "description": "Nenhum turno diário aberto para a data corrente"
        },
        {
          "stateId": "open",
          "description": "Turno diário aberto, permitindo criação e gestão de pedidos"
        },
        {
          "stateId": "closed",
          "description": "Turno diário fechado, com relatório e métricas consolidados"
        }
      ],
      "transitions": [
        {
          "from": "initial",
          "to": "open",
          "trigger": "openShift",
          "actor": "managerOwner",
          "conditions": [
            "noOpenShiftExistsForToday"
          ],
          "actions": [
            "setStatusOpen",
            "setOpenedAt",
            "setOpenedBy"
          ],
          "rulesApplied": [
            "shiftMustBeOpenToCreateOrders"
          ]
        },
        {
          "from": "open",
          "to": "closed",
          "trigger": "closeShift",
          "actor": "managerOwner",
          "conditions": [
            "noPendingOrdersInOpenShift"
          ],
          "actions": [
            "setStatusClosed",
            "setClosedAt",
            "setClosedBy",
            "setClosingNotes"
          ],
          "rulesApplied": [
            "metricsDerivedFromClosedOrders"
          ]
        }
      ],
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "implementationSuggestions": [
        {
          "suggestionId": "blockOrdersIfNoShift",
          "title": "Bloqueio de pedidos sem turno aberto",
          "description": "O POS deve impedir a criação de novos pedidos caso não exista um turno aberto no dia corrente.",
          "priority": "now",
          "tradeoff": "Requer verificação síncrona no início do fluxo de criação de pedidos, mas evita inconsistências de vendas sem turno."
        },
        {
          "suggestionId": "shiftCloseValidation",
          "title": "Validação de pedidos pendentes no fechamento",
          "description": "Alertar o gerente se existirem pedidos em aberto (não entregues/fechados) antes de permitir o fechamento do turno.",
          "priority": "now",
          "tradeoff": "Adiciona uma etapa de verificação no fechamento, mas garante integridade dos dados do relatório final."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/dailyShiftLifecycle.defs.ts",
      "exportName": "dailyShiftLifecycleDef",
      "saveAsDefs": true
    }
  }
} as const;

export default dailyShiftLifecycleDef;
