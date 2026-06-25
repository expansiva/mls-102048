/// <mls fileReference="_102048_/l5/_traceTemp/rules.defs.ts" enhancement="_blank"/>

export const rulesPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "rules",
  "artifactId": "_traceTempRules",
  "moduleName": "_traceTemp",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "moduleName": "_traceTemp",
    "rules": [
      {
        "ruleId": "orderTypeMustBeTableOrTakeout",
        "title": "Tipo de pedido restrito no MVP",
        "description": "No MVP, pedidos devem ser somente 'mesa' (com referência a Mesa) ou 'takeout' (sem mesa). Delivery fica fora do escopo.",
        "appliesTo": [
          "Order",
          "createOrderCommand"
        ],
        "layer": "domain"
      },
      {
        "ruleId": "orderStatusTransitionsControlled",
        "title": "Transições controladas de status do pedido",
        "description": "Mudanças de status do Pedido devem seguir um grafo de transições permitido (ex.: não pular diretamente de 'sentToKitchen' para 'delivered' se não permitido).",
        "appliesTo": [
          "Order",
          "changeOrderStatusCommand",
          "kitchenStatusWorkflow"
        ],
        "layer": "domain"
      },
      {
        "ruleId": "inventoryDeductionHappensOnSaleEvent",
        "title": "Baixa de estoque ocorre no evento de venda definido",
        "description": "A baixa automática por ingrediente deve ocorrer em um único evento definido (fechamento/pagamento do pedido), com idempotência e possibilidade de estorno em cancelamentos.",
        "appliesTo": [
          "InventoryTransaction",
          "closeOrderAndDeductInventoryCommand",
          "Order"
        ],
        "layer": "domain"
      },
      {
        "ruleId": "inventoryCannotGoNegativeByDefault",
        "title": "Evitar estoque negativo (padrão)",
        "description": "Por padrão, impedir que uma baixa automática resulte em saldo negativo; permitir override por gerente com registro de motivo (configurável).",
        "appliesTo": [
          "InventoryTransaction",
          "closeOrderAndDeductInventoryCommand",
          "inventoryAdjustmentWorkflow"
        ],
        "layer": "domain"
      },
      {
        "ruleId": "shiftMustBeOpenToCreateOrders",
        "title": "Turno aberto é pré-requisito para pedidos",
        "description": "Pedidos só podem ser criados/fechados quando existir um Turno Diário aberto; caso não exista, solicitar abertura.",
        "appliesTo": [
          "DailyShift",
          "Order",
          "createOrderCommand",
          "openShiftCommand"
        ],
        "layer": "domain"
      },
      {
        "ruleId": "menuPriceIsSnapshottedOnOrderItem",
        "title": "Preço é copiado para o item do pedido",
        "description": "O preço do Item do Cardápio deve ser copiado para o Item do Pedido no momento do lançamento/fechamento para preservar histórico mesmo com mudança futura de preço.",
        "appliesTo": [
          "OrderItem",
          "createOrderCommand"
        ],
        "layer": "domain"
      },
      {
        "ruleId": "metricsDerivedFromClosedOrders",
        "title": "Métricas derivam de pedidos fechados",
        "description": "Métricas de vendas/top sellers/turno devem ser calculadas apenas a partir de pedidos marcados como 'closed' (ou equivalente), para consistência.",
        "appliesTo": [
          "Order",
          "salesTodayMetricTable",
          "topSellingItemsMetricTable",
          "shiftSummaryMetricTable"
        ],
        "layer": "metrics"
      },
      {
        "ruleId": "aiUsesPlatformLlmProxy",
        "title": "IA via proxy LLM da plataforma",
        "description": "Gerações de IA devem chamar o proxy LLM da plataforma; não armazenar credenciais de provedor no módulo.",
        "appliesTo": [
          "salesInsightsAgent",
          "generateAiSalesSummaryCommand",
          "generateAiPromoSuggestionsCommand"
        ],
        "layer": "application"
      },
      {
        "ruleId": "bilingualUiViaPlatformI18n",
        "title": "Bilíngue via i18n da plataforma",
        "description": "Textos de UI e respostas do assistente devem respeitar locale pt-BR/en usando i18n da plataforma.",
        "appliesTo": [
          "dashboardPage",
          "posQuickOrderPage",
          "kitchenDisplayPage",
          "menuManagementPage",
          "inventoryManagementPage",
          "shiftCloseReportPage",
          "aiAssistantPage"
        ],
        "layer": "ui"
      }
    ]
  }
} as const;

export default rulesPlan;
