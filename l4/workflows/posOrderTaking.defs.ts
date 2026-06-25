/// <mls fileReference="_102048_/l4/workflows/posOrderTaking.defs.ts" enhancement="_blank"/>

export const posOrderTakingDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "posOrderTaking",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "posOrderTaking",
      "title": "Montagem do pedido no POS",
      "purpose": "Guiar o atendente no processo de montagem do pedido: seleção do tipo (mesa ou takeout), escolha de itens do cardápio e confirmação antes do envio à cozinha, com interface otimizada para touch.",
      "executionMode": "uiState",
      "createsTask": false,
      "actors": [
        "attendantCashier"
      ],
      "states": [
        {
          "stateId": "selectingOrderType",
          "description": "Tela inicial de escolha entre pedido mesa ou takeout. O atendente seleciona o tipo para iniciar o rascunho do pedido."
        },
        {
          "stateId": "selectingTable",
          "description": "Exibição das mesas ativas para seleção. Apresenta visual de ocupação quando disponível. Somente para pedidos do tipo mesa."
        },
        {
          "stateId": "addingItems",
          "description": "Tela de adição de itens do cardápio ao pedido. Permite ajustar quantidades, observações e visualizar total parcial."
        },
        {
          "stateId": "reviewingOrder",
          "description": "Tela de revisão do pedido antes do envio. Exibe itens, totais, observações e opção de voltar para edição."
        },
        {
          "stateId": "orderSent",
          "description": "Confirmação de envio à cozinha. Exibe resumo e permite iniciar novo pedido."
        }
      ],
      "transitions": [
        {
          "from": "selectingOrderType",
          "to": "selectingTable",
          "trigger": "selectTableType",
          "actor": "attendantCashier",
          "conditions": [],
          "actions": [
            "Order.type = 'mesa'",
            "Order.status = 'draft'"
          ],
          "rulesApplied": [
            "orderTypeMustBeTableOrTakeout",
            "shiftMustBeOpenToCreateOrders"
          ]
        },
        {
          "from": "selectingOrderType",
          "to": "addingItems",
          "trigger": "selectTakeoutType",
          "actor": "attendantCashier",
          "conditions": [],
          "actions": [
            "Order.type = 'takeout'",
            "Order.status = 'draft'"
          ],
          "rulesApplied": [
            "orderTypeMustBeTableOrTakeout",
            "shiftMustBeOpenToCreateOrders"
          ]
        },
        {
          "from": "selectingTable",
          "to": "selectingOrderType",
          "trigger": "backToType",
          "actor": "attendantCashier",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "selectingTable",
          "to": "addingItems",
          "trigger": "confirmTable",
          "actor": "attendantCashier",
          "conditions": [],
          "actions": [
            "Order.diningTableId = selectedTableId"
          ],
          "rulesApplied": []
        },
        {
          "from": "addingItems",
          "to": "selectingTable",
          "trigger": "backToTable",
          "actor": "attendantCashier",
          "conditions": [
            "Order.type == 'mesa'"
          ],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "addingItems",
          "to": "selectingOrderType",
          "trigger": "backToType",
          "actor": "attendantCashier",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "addingItems",
          "to": "reviewingOrder",
          "trigger": "reviewOrder",
          "actor": "attendantCashier",
          "conditions": [
            "OrderItem.count > 0"
          ],
          "actions": [],
          "rulesApplied": [
            "menuPriceIsSnapshottedOnOrderItem"
          ]
        },
        {
          "from": "reviewingOrder",
          "to": "addingItems",
          "trigger": "backToItems",
          "actor": "attendantCashier",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "reviewingOrder",
          "to": "orderSent",
          "trigger": "sendToKitchen",
          "actor": "attendantCashier",
          "conditions": [
            "OrderItem.count > 0"
          ],
          "actions": [
            "Order.status = 'sentToKitchen'"
          ],
          "rulesApplied": [
            "orderStatusTransitionsControlled",
            "shiftMustBeOpenToCreateOrders"
          ]
        },
        {
          "from": "orderSent",
          "to": "selectingOrderType",
          "trigger": "startNewOrder",
          "actor": "attendantCashier",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        }
      ],
      "userActions": [
        "selectTableType",
        "selectTakeoutType",
        "backToType",
        "confirmTable",
        "backToTable",
        "reviewOrder",
        "backToItems",
        "sendToKitchen",
        "startNewOrder"
      ],
      "rulesApplied": [
        "orderTypeMustBeTableOrTakeout",
        "shiftMustBeOpenToCreateOrders",
        "menuPriceIsSnapshottedOnOrderItem"
      ],
      "persistenceRefs": [
        "order"
      ],
      "usecaseRefs": [
        "createOrderDraft",
        "addOrUpdateOrderItems",
        "sendOrderToKitchen",
        "listDiningTables"
      ],
      "metricRefs": [],
      "requiredEntities": [
        "Order",
        "OrderItem",
        "DiningTable"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "relatedPages": [
        "posFast",
        "posMenuPicker",
        "posOrderSummary",
        "posOrderType",
        "posSendToKitchenConfirm",
        "shiftRequiredBlock"
      ],
      "workflowScope": "singleModule",
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
          "artifactId": "listDiningTables"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "posOrderTaking"
        }
      ],
      "taskConfig": {
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false,
        "taskTitleTemplate": ""
      },
      "implementationSuggestions": [
        {
          "suggestionId": "largeTouchTargets",
          "title": "Componentes grandes otimizados para touch",
          "description": "O POS é tablet-first; botões, cards e controles devem ter áreas de toque amplas para operação rápida.",
          "priority": "now",
          "tradeoff": "Pode reduzir a densidade de informação por tela, exigindo mais scroll ou navegação em etapas."
        },
        {
          "suggestionId": "tableStatusVisual",
          "title": "Indicador visual de ocupação de mesas",
          "description": "Facilitar a escolha de mesas livres diretamente na tela de seleção de tipo de pedido.",
          "priority": "soon",
          "tradeoff": "Requer consulta em tempo real ou cache de ocupação, podendo aumentar complexidade de sincronização."
        },
        {
          "suggestionId": "noTaskForPosUi",
          "title": "Fluxo POS sem criação de tarefa",
          "description": "Este workflow opera em modo uiState e não gera tarefas. O atendente interage diretamente com a interface do POS sem fila de atribuição, pois o trabalho é síncrono e local ao caixa.",
          "priority": "now",
          "tradeoff": "Perde rastreamento assíncrono em filas de trabalho, mas ganha velocidade e simplicidade na operação tablet."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/posOrderTaking.defs.ts",
      "exportName": "posOrderTakingDef",
      "saveAsDefs": true
    }
  }
} as const;

export default posOrderTakingDef;
