/// <mls fileReference="_102048_/l2/cafeFlow/inventoryNegativeGuard.defs.ts" enhancement="_blank"/>

export const inventoryNegativeGuardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryNegativeGuard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryNegativeGuard",
      "pageName": "Ajuste inválido (saldo negativo)",
      "actor": "managerOwner",
      "purpose": "Bloquear ajuste que levaria o saldo abaixo de zero e orientar correção de quantidade/procedimento supervisionado.",
      "capabilities": [
        "manageInventoryItems"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "inventoryAdjustment"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "inventoryItemId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do ingrediente cujo ajuste foi bloqueado.",
          "entityRef": "InventoryAggregate",
          "fieldRef": "inventoryItemId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "inventoryAdjustment",
          "trigger": "Ao tentar ajustar para valor negativo"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryAdjustment",
          "trigger": "Voltar para corrigir"
        }
      ],
      "sections": [
        {
          "sectionName": "Motivo do bloqueio",
          "mode": "view",
          "organisms": [
            {
              "organismName": "negativeStockExplanation",
              "purpose": "Explicar que o ajuste foi bloqueado por saldo negativo e apresentar a regra aplicada.",
              "userActions": [
                "Entender motivo do bloqueio"
              ],
              "requiredEntities": [
                "InventoryAggregate"
              ],
              "readsFields": [
                "currentBalance",
                "negativeStockPolicy"
              ],
              "writesFields": [],
              "rulesApplied": [
                "inventoryCannotGoNegativeByDefault"
              ]
            }
          ]
        },
        {
          "sectionName": "Saldo atual do ingrediente",
          "mode": "view",
          "organisms": [
            {
              "organismName": "inventorySnapshotSummary",
              "purpose": "Mostrar o saldo atual e limites para orientar a correção do ajuste.",
              "userActions": [
                "Consultar saldo atual"
              ],
              "requiredEntities": [
                "InventoryAggregate"
              ],
              "readsFields": [
                "inventoryItemId",
                "currentBalance",
                "unit",
                "minimumThreshold"
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
          "mode": "action",
          "organisms": [
            {
              "organismName": "returnToAdjustment",
              "purpose": "Voltar para corrigir o ajuste com quantidade válida ou procedimento supervisionado.",
              "userActions": [
                "Voltar e corrigir ajuste"
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
        "commandName": "getInventorySnapshotByItem",
        "purpose": "Recarregar saldo atual para exibir limite e orientar correção.",
        "kind": "query",
        "input": [
          {
            "name": "inventoryItemId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "inventoryItemId",
            "type": "string"
          },
          {
            "name": "currentBalance",
            "type": "number"
          },
          {
            "name": "unit",
            "type": "string"
          },
          {
            "name": "minimumThreshold",
            "type": "number"
          },
          {
            "name": "negativeStockPolicy",
            "type": "string"
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
          "getInventorySnapshotByItem"
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

export default inventoryNegativeGuardPagePlan;
