/// <mls fileReference="_102048_/l4/workflows/inventoryAdjustment.defs.ts" enhancement="_blank"/>

export const inventoryAdjustmentDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "inventoryAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "inventoryAdjustment",
      "title": "Ajuste e controle de estoque",
      "purpose": "Registrar movimentações de estoque, seja por ajustes manuais do gerente ou por baixa automática decorrente de vendas, mantendo snapshots de saldo atualizados para consulta e alertas.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "actors": [
        "managerOwner",
        "system"
      ],
      "states": [
        {
          "stateId": "initiated",
          "description": "Movimentação iniciada; dados do ajuste manual ou da baixa automática coletados, aguardando consolidação no saldo."
        },
        {
          "stateId": "posted",
          "description": "Movimentação consolidada, saldo atualizado e métricas de estoque baixo derivadas."
        },
        {
          "stateId": "reversed",
          "description": "Movimentação estornada; saldo revertido e métricas recalculadas."
        }
      ],
      "transitions": [
        {
          "from": "initiated",
          "to": "posted",
          "trigger": "postManualAdjustment",
          "actor": "managerOwner",
          "conditions": [
            "inventoryCannotGoNegativeByDefault"
          ],
          "actions": [
            "setInventoryTransactionStatusPosted",
            "setInventoryTransactionTypeAjuste",
            "upsertInventoryBalanceSnapshot",
            "upsertLowStockMetrics"
          ],
          "rulesApplied": [
            "inventoryCannotGoNegativeByDefault"
          ]
        },
        {
          "from": "initiated",
          "to": "posted",
          "trigger": "autoDeductOnSaleClose",
          "actor": "system",
          "conditions": [
            "inventoryDeductionHappensOnSaleEvent",
            "inventoryCannotGoNegativeByDefault"
          ],
          "actions": [
            "setInventoryTransactionStatusPosted",
            "setInventoryTransactionTypeBaixaVenda",
            "upsertInventoryBalanceSnapshot",
            "upsertLowStockMetrics"
          ],
          "rulesApplied": [
            "inventoryDeductionHappensOnSaleEvent",
            "inventoryCannotGoNegativeByDefault"
          ]
        },
        {
          "from": "posted",
          "to": "reversed",
          "trigger": "reverseTransaction",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "setInventoryTransactionStatusReversed",
            "upsertInventoryBalanceSnapshot",
            "upsertLowStockMetrics"
          ],
          "rulesApplied": []
        }
      ],
      "userActions": [
        "postManualAdjustment",
        "reverseTransaction",
        "listInventoryTransactions",
        "listInventoryBalances"
      ],
      "rulesApplied": [
        "inventoryCannotGoNegativeByDefault",
        "inventoryDeductionHappensOnSaleEvent"
      ],
      "requiredEntities": [
        "InventoryTransaction",
        "InventoryBalanceSnapshot"
      ],
      "persistenceRefs": [
        "inventoryTransaction",
        "inventoryBalanceSnapshot",
        "lowStockMetrics"
      ],
      "usecaseRefs": [
        "postInventoryAdjustment",
        "listInventoryTransactions",
        "listInventoryBalances",
        "getInventorySnapshotByItem"
      ],
      "metricRefs": [
        "lowStockMetrics"
      ],
      "moduleRefs": [
        "cafeFlow"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "cafeFlow",
          "entity": "InventoryTransaction"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "InventoryBalanceSnapshot"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "table",
          "artifactId": "inventoryTransaction"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "table",
          "artifactId": "inventoryBalanceSnapshot"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "lowStockMetrics"
        }
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "relatedPages": [
        "inventoryAdjustment",
        "inventoryDeductionBlock",
        "inventoryItemEditor",
        "inventoryLowStock",
        "inventoryManagement",
        "inventoryNegativeGuard",
        "inventoryTransactions",
        "posCheckout",
        "recipeEditor"
      ],
      "workflowScope": "singleModule",
      "taskConfig": {
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false,
        "taskTitleTemplate": ""
      },
      "implementationSuggestions": [
        {
          "suggestionId": "negativeStockGuard",
          "title": "Bloqueio de saldo negativo por padrão",
          "description": "Impedir que ajustes ou baixas deixem o saldo de um ingrediente negativo, respeitando a regra de negócio do MVP.",
          "priority": "now",
          "tradeoff": "Pode exigir override manual por gerente com registro de motivo em cenários de contagem física divergente."
        },
        {
          "suggestionId": "lowStockAlert",
          "title": "Alerta visual de estoque baixo",
          "description": "Destacar ingredientes com saldo abaixo do mínimo definido no dashboard e na tela de estoque.",
          "priority": "soon",
          "tradeoff": "Requer atualização periódica da métrica lowStockMetrics; pode gerar ruído se o limiar estiver mal calibrado."
        },
        {
          "suggestionId": "idempotencyTokenForAutoDeduction",
          "title": "Token de idempotência na baixa automática",
          "description": "Garantir que a baixa automática por pedido seja idempotente (não duplicada em reprocessamentos) usando orderId como chave única de deduplicação.",
          "priority": "now",
          "tradeoff": "Adiciona complexidade na camada de usecase, mas evita saldo incorreto em retries."
        },
        {
          "suggestionId": "reversalAuditTrail",
          "title": "Rastreabilidade completa de estornos",
          "description": "Manter o registro original intacto e criar nova transação de reversão vinculada, em vez de apagar ou sobrescrever dados.",
          "priority": "soon",
          "tradeoff": "Aumenta volume de registros, mas preserva auditoria e facilita relatórios de fechamento."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/inventoryAdjustment.defs.ts",
      "exportName": "inventoryAdjustmentDef",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryAdjustmentDef;
