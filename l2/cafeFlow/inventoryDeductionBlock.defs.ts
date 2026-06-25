/// <mls fileReference="_102048_/l2/cafeFlow/inventoryDeductionBlock.defs.ts" enhancement="_blank"/>

export const inventoryDeductionBlockPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryDeductionBlock",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryDeductionBlock",
      "pageName": "Bloqueio de baixa de estoque",
      "actor": "attendantCashier",
      "purpose": "Informar que a venda não pode ser finalizada por estoque insuficiente (evitar negativo) e orientar próximos passos.",
      "capabilities": [
        "autoInventoryDeduction",
        "manageInventoryItems"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "inventoryAdjustment",
          "orderLifecycle"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "orderId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido que tentou fechar.",
          "entityRef": "OrderAggregate",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "posCheckout",
          "trigger": "Ao tentar finalizar e falhar por estoque insuficiente"
        },
        {
          "direction": "outbound",
          "pageId": "posCheckout",
          "trigger": "Voltar ao checkout para tentar novamente"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryManagement",
          "trigger": "(Gerente) ir para estoque para ajustar"
        }
      ],
      "sections": [
        {
          "sectionName": "Alerta de bloqueio",
          "mode": "view",
          "organisms": [
            {
              "organismName": "InventoryDeductionBlockedNotice",
              "purpose": "Explicar o bloqueio por estoque insuficiente e evitar saldo negativo.",
              "userActions": [
                "Entender motivo do bloqueio"
              ],
              "requiredEntities": [
                "OrderAggregate"
              ],
              "readsFields": [
                "OrderAggregate.id",
                "OrderAggregate.status"
              ],
              "writesFields": [],
              "rulesApplied": [
                "inventoryCannotGoNegativeByDefault"
              ]
            }
          ]
        },
        {
          "sectionName": "Itens do pedido e impacto",
          "mode": "view",
          "organisms": [
            {
              "organismName": "OrderItemsSummary",
              "purpose": "Relembrar os itens/receitas envolvidos no pedido que gerou o bloqueio.",
              "userActions": [
                "Ver itens do pedido"
              ],
              "requiredEntities": [
                "OrderAggregate"
              ],
              "readsFields": [
                "OrderAggregate.items",
                "OrderAggregate.totalAmount",
                "OrderAggregate.orderType",
                "OrderAggregate.tableRef"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "InsufficientIngredientsList",
              "purpose": "Mostrar ingredientes com saldo insuficiente e seus níveis atuais.",
              "userActions": [
                "Ver ingredientes insuficientes"
              ],
              "requiredEntities": [
                "InventoryAggregate"
              ],
              "readsFields": [
                "InventoryAggregate.inventoryItemId",
                "InventoryAggregate.quantityOnHand",
                "InventoryAggregate.criticalLevel"
              ],
              "writesFields": [],
              "rulesApplied": [
                "inventoryCannotGoNegativeByDefault"
              ]
            }
          ]
        },
        {
          "sectionName": "Próximos passos",
          "mode": "view",
          "organisms": [
            {
              "organismName": "NextStepsActions",
              "purpose": "Orientar o atendente a voltar ao checkout ou acionar gerente para ajuste de estoque.",
              "userActions": [
                "Voltar ao checkout",
                "Orientar gerente a ajustar estoque"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderById",
        "purpose": "Carregar o pedido e itens para explicar o bloqueio.",
        "kind": "query",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          }
        ],
        "output": [
          {
            "name": "order",
            "type": "OrderAggregate"
          }
        ],
        "readsEntities": [
          "Order",
          "DiningTable"
        ],
        "writesEntities": [],
        "readsTables": [
          "order",
          "dining_table"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "getOrderById"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "listInventoryBalances",
        "purpose": "Listar saldos atuais dos ingredientes relacionados ao bloqueio.",
        "kind": "query",
        "input": [
          {
            "name": "inventoryItemIds",
            "type": "uuid[]",
            "required": false
          }
        ],
        "output": [
          {
            "name": "balances",
            "type": "InventoryAggregate[]"
          }
        ],
        "readsEntities": [
          "InventoryBalanceSnapshot"
        ],
        "writesEntities": [],
        "readsTables": [
          "inventory_balance_snapshot"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listInventoryBalances"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "inventoryCannotGoNegativeByDefault"
        ]
      }
    ]
  }
} as const;

export default inventoryDeductionBlockPagePlan;
