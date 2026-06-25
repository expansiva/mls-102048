/// <mls fileReference="_102048_/l2/cafeFlow/kdsIssueFlag.defs.ts" enhancement="_blank"/>

export const kdsIssueFlagPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "kdsIssueFlag",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "kdsIssueFlag",
      "pageName": "Sinalizar problema no pedido (KDS)",
      "actor": "cook",
      "purpose": "Registrar indisponibilidade/problema no pedido com descrição para ação do atendente.",
      "capabilities": [
        "updateOrderStatusKitchen",
        "trackOrderLifecycle"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
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
          "description": "Identificador do pedido para sinalizar problema.",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "kdsOrderDetail",
          "trigger": "Tocar em \"Problema/Indisponível\""
        },
        {
          "direction": "outbound",
          "pageId": "kdsOrderDetail",
          "trigger": "Após registrar problema"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "kdsOrderSummaryCard",
              "purpose": "Exibir informações essenciais do pedido para confirmar o alvo da sinalização.",
              "userActions": [],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.orderNumber",
                "Order.type",
                "Order.status",
                "Order.diningTableId",
                "Order.customerName",
                "Order.notes"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Detalhes do problema",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "issueTypeSelector",
              "purpose": "Selecionar o tipo de problema/indisponibilidade.",
              "userActions": [
                "Selecionar tipo de problema"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id"
              ],
              "writesFields": [
                "Order.status"
              ],
              "rulesApplied": []
            },
            {
              "organismName": "issueDescriptionInput",
              "purpose": "Descrever impacto/observação para o atendente.",
              "userActions": [
                "Descrever impacto"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id"
              ],
              "writesFields": [
                "Order.notes"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Confirmar sinalização",
          "mode": "commit",
          "organisms": [
            {
              "organismName": "issueConfirmAction",
              "purpose": "Confirmar a sinalização de problema no pedido.",
              "userActions": [
                "Confirmar sinalização"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id"
              ],
              "writesFields": [
                "Order.status",
                "Order.notes"
              ],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderById",
        "purpose": "Carregar detalhes básicos do pedido para confirmação da sinalização.",
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
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "orderNumber",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "diningTableId",
            "type": "uuid"
          },
          {
            "name": "customerName",
            "type": "string"
          },
          {
            "name": "notes",
            "type": "string"
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
        "commandName": "updateKitchenOrderStatus",
        "purpose": "Registrar flag/estado de problema no pedido com descrição para visibilidade do atendimento.",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "issueFlag",
            "type": "string",
            "required": true
          },
          {
            "name": "issueDescription",
            "type": "text",
            "required": true
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "notes",
            "type": "string"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "order"
        ],
        "writesTables": [
          "order"
        ],
        "usecaseRefs": [
          "updateKitchenOrderStatus"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "orderStatusTransitionsControlled"
        ]
      }
    ]
  }
} as const;

export default kdsIssueFlagPagePlan;
