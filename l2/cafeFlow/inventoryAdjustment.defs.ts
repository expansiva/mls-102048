/// <mls fileReference="_102048_/l2/cafeFlow/inventoryAdjustment.defs.ts" enhancement="_blank"/>

export const inventoryAdjustmentPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryAdjustment",
      "pageName": "Ajustar estoque (manual)",
      "actor": "managerOwner",
      "purpose": "Registrar entrada/perda/contagem para um ingrediente, gerando movimentação e atualizando o saldo.",
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
      "mdmRefs": [
        "inventoryItem"
      ],
      "pageInputs": [
        {
          "name": "inventoryItemId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do ingrediente que terá o ajuste manual.",
          "entityRef": "InventoryTransaction",
          "fieldRef": "inventoryItemId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "inventoryItemEditor",
          "trigger": "Tocar em \"Ajustar estoque\""
        },
        {
          "direction": "outbound",
          "pageId": "inventoryItemEditor",
          "trigger": "Após ajuste registrado"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryNegativeGuard",
          "trigger": "Se ajuste levar a saldo negativo"
        }
      ],
      "sections": [
        {
          "sectionName": "Saldo atual e contexto",
          "mode": "view",
          "organisms": [
            {
              "organismName": "inventorySnapshotSummary",
              "purpose": "Exibir saldo atual e unidade do ingrediente antes do ajuste.",
              "userActions": [],
              "requiredEntities": [
                "InventoryBalanceSnapshot"
              ],
              "readsFields": [
                "inventoryItemId",
                "quantityOnHand",
                "recordedAt"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Dados do ajuste manual",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "inventoryAdjustmentForm",
              "purpose": "Capturar tipo de ajuste, quantidade e motivo do gerente/dono.",
              "userActions": [
                "Escolher tipo de ajuste",
                "Informar quantidade",
                "Informar motivo"
              ],
              "requiredEntities": [
                "InventoryTransaction"
              ],
              "readsFields": [
                "inventoryItemId"
              ],
              "writesFields": [
                "transactionType",
                "quantityChange",
                "reason"
              ],
              "rulesApplied": [
                "inventoryCannotGoNegativeByDefault"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmação do ajuste",
          "mode": "commit",
          "organisms": [
            {
              "organismName": "inventoryAdjustmentConfirm",
              "purpose": "Confirmar e registrar a movimentação manual de estoque.",
              "userActions": [
                "Confirmar ajuste"
              ],
              "requiredEntities": [
                "InventoryTransaction",
                "InventoryBalanceSnapshot"
              ],
              "readsFields": [
                "inventoryItemId",
                "transactionType",
                "quantityChange",
                "reason"
              ],
              "writesFields": [
                "inventoryTransactionId"
              ],
              "rulesApplied": [
                "inventoryCannotGoNegativeByDefault"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getInventorySnapshotByItem",
        "purpose": "Exibir saldo atual antes do ajuste.",
        "kind": "query",
        "input": [
          {
            "name": "inventoryItemId",
            "type": "uuid",
            "required": true
          }
        ],
        "output": [
          {
            "name": "inventoryItemId",
            "type": "uuid"
          },
          {
            "name": "quantityOnHand",
            "type": "number"
          },
          {
            "name": "unit",
            "type": "string"
          },
          {
            "name": "recordedAt",
            "type": "datetime"
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
        "rulesApplied": []
      },
      {
        "commandName": "postInventoryAdjustment",
        "purpose": "Registrar movimentação manual e atualizar saldo.",
        "kind": "command",
        "input": [
          {
            "name": "inventoryItemId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "transactionType",
            "type": "string",
            "required": true
          },
          {
            "name": "quantityChange",
            "type": "number",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "inventoryTransactionId",
            "type": "uuid"
          },
          {
            "name": "newQuantityOnHand",
            "type": "number"
          }
        ],
        "readsEntities": [
          "InventoryBalanceSnapshot"
        ],
        "writesEntities": [
          "InventoryTransaction",
          "InventoryBalanceSnapshot"
        ],
        "readsTables": [
          "inventory_balance_snapshot"
        ],
        "writesTables": [
          "inventory_transaction",
          "inventory_balance_snapshot",
          "low_stock_metrics"
        ],
        "usecaseRefs": [
          "postInventoryAdjustment"
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

export default inventoryAdjustmentPagePlan;
