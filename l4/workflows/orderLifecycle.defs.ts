/// <mls fileReference="_102048_/l4/workflows/orderLifecycle.defs.ts" enhancement="_blank"/>

export const orderLifecycleDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "orderLifecycle",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "orderLifecycle",
      "title": "Ciclo de vida do pedido (POS → Cozinha → Entrega)",
      "purpose": "Coordenar o fluxo completo de um pedido desde o rascunho no POS, passando pela fila da cozinha (KDS), até a entrega, retirada e fechamento como venda, incluindo a baixa automática de estoque por ingrediente.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "actors": [
        "attendantCashier",
        "cook"
      ],
      "states": [
        {
          "stateId": "draft",
          "description": "Pedido em rascunho no POS; itens podem ser adicionados, editados ou removidos antes do envio à cozinha."
        },
        {
          "stateId": "sentToKitchen",
          "description": "Pedido enviado para a cozinha e visível na fila do KDS aguardando início do preparo."
        },
        {
          "stateId": "inPreparation",
          "description": "Cozinha iniciou o preparo do pedido; status atualizado pelo cozinheiro na tela KDS."
        },
        {
          "stateId": "ready",
          "description": "Pedido finalizado na cozinha e pronto para entrega ou retirada."
        },
        {
          "stateId": "delivered",
          "description": "Pedido entregue ao cliente na mesa ou retirado no balcão."
        },
        {
          "stateId": "closed",
          "description": "Pedido fechado como venda; estoque baixado automaticamente por ingrediente e métricas derivadas atualizadas."
        },
        {
          "stateId": "cancelled",
          "description": "Pedido cancelado antes do fechamento; sem geração de venda ou impacto em métricas de faturamento."
        }
      ],
      "transitions": [
        {
          "from": "draft",
          "to": "sentToKitchen",
          "trigger": "sendToKitchen",
          "actor": "attendantCashier",
          "actions": [
            "setOrderStatusSentToKitchen",
            "setOrderSentToKitchenAt"
          ],
          "conditions": [
            "orderHasAtLeastOneItem",
            "dailyShiftIsOpen"
          ],
          "rulesApplied": [
            "orderStatusTransitionsControlled",
            "shiftMustBeOpenToCreateOrders"
          ]
        },
        {
          "from": "sentToKitchen",
          "to": "inPreparation",
          "trigger": "startPreparation",
          "actor": "cook",
          "actions": [
            "setOrderStatusInPreparation"
          ],
          "conditions": [],
          "rulesApplied": [
            "orderStatusTransitionsControlled"
          ]
        },
        {
          "from": "inPreparation",
          "to": "ready",
          "trigger": "finishPreparation",
          "actor": "cook",
          "actions": [
            "setOrderStatusReady",
            "setOrderReadyAt"
          ],
          "conditions": [],
          "rulesApplied": [
            "orderStatusTransitionsControlled"
          ]
        },
        {
          "from": "ready",
          "to": "delivered",
          "trigger": "markDelivered",
          "actor": "attendantCashier",
          "actions": [
            "setOrderStatusDelivered",
            "setOrderDeliveredAt"
          ],
          "conditions": [],
          "rulesApplied": [
            "orderStatusTransitionsControlled"
          ]
        },
        {
          "from": "delivered",
          "to": "closed",
          "trigger": "closeAsSale",
          "actor": "attendantCashier",
          "actions": [
            "setOrderStatusClosed",
            "setOrderClosedAt",
            "createInventoryTransaction",
            "createInventoryBalanceSnapshot",
            "insertTodaySalesMetrics",
            "insertTopSellingItemsMetrics",
            "insertShiftSummaryMetrics"
          ],
          "conditions": [
            "inventoryBalanceSufficientOrManagerOverride"
          ],
          "rulesApplied": [
            "orderStatusTransitionsControlled",
            "inventoryDeductionHappensOnSaleEvent",
            "inventoryCannotGoNegativeByDefault",
            "metricsDerivedFromClosedOrders"
          ]
        },
        {
          "from": "draft",
          "to": "cancelled",
          "trigger": "cancelOrder",
          "actor": "attendantCashier",
          "actions": [
            "setOrderStatusCancelled",
            "setOrderCancelledAt",
            "setOrderCancellationReason"
          ],
          "conditions": [],
          "rulesApplied": [
            "orderStatusTransitionsControlled"
          ]
        },
        {
          "from": "sentToKitchen",
          "to": "cancelled",
          "trigger": "cancelOrder",
          "actor": "attendantCashier",
          "actions": [
            "setOrderStatusCancelled",
            "setOrderCancelledAt",
            "setOrderCancellationReason"
          ],
          "conditions": [
            "noInventoryTransactionPostedForOrder"
          ],
          "rulesApplied": [
            "orderStatusTransitionsControlled",
            "inventoryDeductionHappensOnSaleEvent"
          ]
        },
        {
          "from": "inPreparation",
          "to": "cancelled",
          "trigger": "cancelOrder",
          "actor": "attendantCashier",
          "actions": [
            "setOrderStatusCancelled",
            "setOrderCancelledAt",
            "setOrderCancellationReason"
          ],
          "conditions": [
            "noInventoryTransactionPostedForOrder"
          ],
          "rulesApplied": [
            "orderStatusTransitionsControlled",
            "inventoryDeductionHappensOnSaleEvent"
          ]
        },
        {
          "from": "ready",
          "to": "cancelled",
          "trigger": "cancelOrder",
          "actor": "attendantCashier",
          "actions": [
            "setOrderStatusCancelled",
            "setOrderCancelledAt",
            "setOrderCancellationReason"
          ],
          "conditions": [
            "noInventoryTransactionPostedForOrder"
          ],
          "rulesApplied": [
            "orderStatusTransitionsControlled",
            "inventoryDeductionHappensOnSaleEvent"
          ]
        }
      ],
      "userActions": [
        "createOrderDraft",
        "addOrUpdateOrderItems",
        "sendOrderToKitchen",
        "updateKitchenOrderStatus",
        "markOrderDelivered",
        "closeOrderAsSaleAndDeductInventory",
        "cancelOrder",
        "getOrderById",
        "listOrdersByStatus",
        "listKitchenQueue"
      ],
      "rulesApplied": [
        "orderTypeMustBeTableOrTakeout",
        "orderStatusTransitionsControlled",
        "shiftMustBeOpenToCreateOrders",
        "menuPriceIsSnapshottedOnOrderItem",
        "inventoryDeductionHappensOnSaleEvent",
        "inventoryCannotGoNegativeByDefault",
        "metricsDerivedFromClosedOrders"
      ],
      "requiredEntities": [
        "Order",
        "OrderItem",
        "DiningTable",
        "InventoryTransaction",
        "InventoryBalanceSnapshot"
      ],
      "persistenceRefs": [
        "order",
        "inventoryTransaction",
        "inventoryBalanceSnapshot",
        "todaySalesMetrics",
        "topSellingItemsMetrics",
        "shiftSummaryMetrics"
      ],
      "usecaseRefs": [
        "createOrderDraft",
        "addOrUpdateOrderItems",
        "sendOrderToKitchen",
        "updateKitchenOrderStatus",
        "markOrderDelivered",
        "closeOrderAsSaleAndDeductInventory",
        "cancelOrder",
        "listKitchenQueue",
        "getOrderById",
        "listOrdersByStatus"
      ],
      "metricRefs": [
        "todaySalesMetrics",
        "topSellingItemsMetrics",
        "shiftSummaryMetrics"
      ],
      "moduleRefs": [
        "cafeFlow"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "cafeFlow",
          "entity": "Order"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "OrderItem"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "DiningTable"
        },
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
          "artifactId": "order"
        },
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
          "artifactId": "todaySalesMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "topSellingItemsMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "shiftSummaryMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "createOrderDraft"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "addOrUpdateOrderItems"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "sendOrderToKitchen"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "updateKitchenOrderStatus"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "markOrderDelivered"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "closeOrderAsSaleAndDeductInventory"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "cancelOrder"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "listKitchenQueue"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "getOrderById"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "listOrdersByStatus"
        }
      ],
      "workflowScope": "singleModule",
      "relatedAgents": [
        "attendantCashier",
        "cook"
      ],
      "relatedPages": [
        "inventoryDeductionBlock",
        "inventoryTransactions",
        "kdsBoard",
        "kdsIssueFlag",
        "kdsOrderDetail",
        "kdsStatusGuard",
        "orderCancelBlocked",
        "orderCancelConfirm",
        "orderDetail",
        "ordersTracker",
        "posCheckout",
        "posFast",
        "posMenuPicker",
        "posOrderSummary",
        "posOrderType",
        "posSendToKitchenConfirm",
        "shiftCloseBlocked"
      ],
      "relatedPlugins": [],
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "implementationSuggestions": [
        {
          "suggestionId": "kdsAutoRefresh",
          "title": "Atualização automática da fila KDS",
          "description": "A tela da cozinha deve refletir novos pedidos e mudanças de status em tempo real sem recarregamento manual.",
          "priority": "now",
          "tradeoff": "Requer infraestrutura de eventos em tempo real (WebSocket/SSE) ou polling otimizado; aumenta complexidade operacional."
        },
        {
          "suggestionId": "inventoryDeductionOnClose",
          "title": "Baixa de estoque atômica no fechamento",
          "description": "Garantir que a baixa de ingredientes ocorra na mesma transação do fechamento do pedido para evitar inconsistências entre venda e estoque.",
          "priority": "now",
          "tradeoff": "Transações longas podem aumentar contenção no banco; exige retry e idempotência em caso de falha parcial."
        },
        {
          "suggestionId": "noTaskWorkflow",
          "title": "Operação síncrona sem criação de tasks",
          "description": "O workflow não cria tasks porque as transições são ações imediatas de atendentes e cozinheiros no POS/KDS, sem necessidade de atribuição assíncrona ou fila de tarefas.",
          "priority": "now",
          "tradeoff": "Perde-se a capacidade de filtrar/escalar por tasks, mas ganha-se simplicidade e velocidade na operação do caixa e cozinha."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/orderLifecycle.defs.ts",
      "exportName": "orderLifecycleDef",
      "saveAsDefs": true
    }
  }
} as const;

export default orderLifecycleDef;
