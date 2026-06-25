/// <mls fileReference="_102048_/l2/cafeFlow/kdsStatusGuard.defs.ts" enhancement="_blank"/>

export const kdsStatusGuardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "kdsStatusGuard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 98,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "kdsStatusGuard",
      "pageName": "Transição de status inválida (KDS)",
      "actor": "cook",
      "purpose": "Explicar bloqueio ao tentar pular etapas de status e orientar a seguir o fluxo correto.",
      "capabilities": [
        "updateOrderStatusKitchen"
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
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido que teve a transição inválida.",
          "entityRef": "Order",
          "fieldRef": "order.id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "kdsOrderDetail",
          "trigger": "Ao tentar transição inválida"
        },
        {
          "direction": "outbound",
          "pageId": "kdsOrderDetail",
          "trigger": "Voltar ao pedido",
          "description": "Retorna ao detalhe para aplicar a próxima transição válida."
        }
      ],
      "sections": [
        {
          "sectionName": "Aviso de bloqueio",
          "mode": "read",
          "organisms": [
            {
              "organismName": "InvalidStatusTransitionMessage",
              "purpose": "Informar que a transição solicitada não é permitida e explicar o motivo do bloqueio.",
              "userActions": [
                "Entender motivo do bloqueio"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Status atual e próximas etapas",
          "mode": "read",
          "organisms": [
            {
              "organismName": "CurrentStatusAndAllowedTransitions",
              "purpose": "Exibir o status atual do pedido e as próximas transições válidas para orientar a ação correta.",
              "userActions": [
                "Ver status atual",
                "Identificar próxima transição válida"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status",
                "Order.allowedNextStatusTransitions"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransitionsControlled"
              ]
            }
          ]
        },
        {
          "sectionName": "Ação de retorno",
          "mode": "action",
          "organisms": [
            {
              "organismName": "BackToOrderDetailAction",
              "purpose": "Permitir retornar ao detalhe do pedido para aplicar a próxima transição válida.",
              "userActions": [
                "Voltar ao detalhe e aplicar próxima transição válida"
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
        "purpose": "Recarregar status atual para orientar transição válida.",
        "kind": "query",
        "input": [
          {
            "name": "orderId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "allowedNextStatusTransitions",
            "type": "string[]"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "order"
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
        "rulesApplied": [
          "orderStatusTransitionsControlled"
        ]
      }
    ]
  }
} as const;

export default kdsStatusGuardPagePlan;
