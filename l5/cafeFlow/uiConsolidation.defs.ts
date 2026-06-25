/// <mls fileReference="_102048_/l5/cafeFlow/uiConsolidation.defs.ts" enhancement="_blank"/>

export const uiConsolidationPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "uiConsolidation",
  "artifactId": "uiConsolidation",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUiConsolidation",
    "stepId": 28,
    "planId": "plan-ui-consolidation"
  },
  "data": {
    "sharedComponents": [
      {
        "componentId": "inventorySnapshotSummary",
        "title": "inventorySnapshotSummary",
        "kind": "organism",
        "pages": [
          "inventoryAdjustment",
          "inventoryNegativeGuard"
        ],
        "replacesOrganisms": [
          "inventoryAdjustment.inventorySnapshotSummary",
          "inventoryNegativeGuard.inventorySnapshotSummary"
        ],
        "responsibilities": "Exibir saldo atual e unidade do ingrediente antes do ajuste."
      },
      {
        "componentId": "orderItemsList",
        "title": "orderItemsList",
        "kind": "organism",
        "pages": [
          "kdsOrderDetail",
          "orderDetail"
        ],
        "replacesOrganisms": [
          "kdsOrderDetail.orderItemsList",
          "orderDetail.orderItemsList"
        ],
        "responsibilities": "Listar itens do pedido com observações e quantidades."
      },
      {
        "componentId": "orderSummaryCard",
        "title": "OrderSummaryCard",
        "kind": "organism",
        "pages": [
          "orderCancelConfirm",
          "posSendToKitchenConfirm"
        ],
        "replacesOrganisms": [
          "orderCancelConfirm.OrderSummaryCard",
          "posSendToKitchenConfirm.OrderSummaryCard"
        ],
        "responsibilities": "Exibir dados essenciais do pedido para confirmação do cancelamento ou envio."
      }
    ],
    "namingFixes": [
      {
        "pageId": "aiInsightDetail",
        "organismName": "Painel de status da execução",
        "suggestedName": "executionStatusPanel",
        "reason": "Align to consistent camelCase convention"
      },
      {
        "pageId": "aiInsightDetail",
        "organismName": "Conteúdo do insight",
        "suggestedName": "insightContentPanel",
        "reason": "Align to consistent camelCase convention"
      },
      {
        "pageId": "inventoryLowStock",
        "organismName": "Lista de estoque baixo",
        "suggestedName": "lowStockList",
        "reason": "Align to consistent camelCase convention"
      },
      {
        "pageId": "inventoryLowStock",
        "organismName": "Priorizar ação",
        "suggestedName": "prioritizeActionPanel",
        "reason": "Align to consistent camelCase convention"
      },
      {
        "pageId": "inventoryManagement",
        "organismName": "Filtro e busca de ingredientes",
        "suggestedName": "ingredientFilterSearch",
        "reason": "Align to consistent camelCase convention"
      },
      {
        "pageId": "inventoryManagement",
        "organismName": "Tabela de ingredientes com saldo atual",
        "suggestedName": "ingredientsBalanceTable",
        "reason": "Align to consistent camelCase convention"
      }
    ],
    "notes": [
      "Consolidated only organisms with identical responsibilities from deterministic candidates",
      "Page-specific organisms remain unchanged per conservative rule",
      "namingFixes applied only to non-camelCase names for cross-page consistency",
      "No new responsibilities invented"
    ]
  }
} as const;

export default uiConsolidationPlan;
