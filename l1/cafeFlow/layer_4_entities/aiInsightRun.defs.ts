/// <mls fileReference="_102048_/l1/cafeFlow/layer_4_entities/aiInsightRun.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "aiInsightRun",
  "title": "Execuções de Insights de IA",
  "purpose": "Registrar e consultar execuções de insights de IA (às solicitações, sucesso/falha) e armazenar resultados para exibição no assistente.",
  "layer": "layer_4_entities",
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
  "ontologyEntities": [
    "AiInsightRun",
    "Order",
    "MenuItem"
  ],
  "sourceTables": [
    {
      "tableName": "ai_insight_run",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order_item",
      "ownership": "moduleOwned"
    },
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
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "aiInsightRun",
      "tableName": "ai_insight_run",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/aiInsightRun.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "order",
      "tableName": "order",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/order.defs.ts"
    },
    {
      "kind": "unknown",
      "tableName": "order_item",
      "ownership": "moduleOwned"
    },
    {
      "kind": "metricTable",
      "metricTableId": "todaySalesMetrics",
      "tableName": "today_sales_metrics",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/todaySalesMetrics.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "fileRef": "_102048_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts"
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "MenuItem",
      "domainId": "menuItem",
      "sourceOfTruth": "Plataforma MDM compartilhada (projeto 102034)",
      "governanceRules": [
        "Cada item deve pertencer a uma categoria ativa",
        "Status permitido: active ou inactive",
        "Preço deve ser maior ou igual a zero",
        "Nome do item deve ser único por categoria dentro do tenant",
        "Alterações de preço não afetam pedidos já fechados (snapshot no OrderItem)"
      ]
    }
  ],
  "allowedOperations": [
    "requestSalesSummary",
    "requestPromoSuggestions",
    "getAiInsightRun",
    "listAiInsightRuns",
    "markAiRunSucceeded",
    "markAiRunFailed"
  ],
  "rulesApplied": [
    "aiUsesPlatformLlmProxy",
    "metricsDerivedFromClosedOrders"
  ],
  "usecaseRefs": [
    "createOrderDraft",
    "addOrUpdateOrderItems",
    "sendOrderToKitchen",
    "updateKitchenOrderStatus",
    "markOrderDelivered",
    "closeOrderAsSaleAndDeductInventory",
    "cancelOrder",
    "getOrderById",
    "listOrdersByStatus",
    "listKitchenQueue",
    "closeDailyShiftAndGenerateReport",
    "getShiftCloseReport",
    "getTodayDashboardMetrics",
    "upsertMenuItemAndRecipe",
    "listMenuItems",
    "getMenuItemWithRecipe",
    "requestAiSalesSummary",
    "requestAiPromoSuggestions",
    "getAiInsightRun",
    "listAiInsightRuns"
  ],
  "materialization": {
    "fileName": "layer_4_entities/AiInsightRunEntity.ts",
    "className": "AiInsightRunEntity",
    "contractName": "IAiInsightRunEntity"
  }
} as const;

export default entity;
