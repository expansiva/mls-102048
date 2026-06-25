/// <mls fileReference="_102048_/l2/cafeFlow/inventoryItemEditor.defs.ts" enhancement="_blank"/>

export const inventoryItemEditorPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryItemEditor",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 98,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryItemEditor",
      "pageName": "Editar ingrediente",
      "actor": "managerOwner",
      "purpose": "Criar/editar/desativar ingrediente (unidade, nome, status) e acessar ajuste manual de estoque.",
      "capabilities": [
        "manageInventoryItems"
      ],
      "flowRefs": {
        "experienceFlows": [
          "inventoryItemManagement"
        ],
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
          "type": "InventoryItemId",
          "required": false,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do ingrediente para edição."
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "inventoryManagement",
          "trigger": "Editar/criar ingrediente"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryAdjustment",
          "trigger": "Tocar em \"Ajustar estoque\"",
          "description": "Abrir ajuste manual para o ingrediente atual."
        },
        {
          "direction": "outbound",
          "pageId": "inventoryManagement",
          "trigger": "Salvar e voltar"
        }
      ],
      "sections": [
        {
          "sectionName": "contextoDoIngrediente",
          "mode": "view",
          "organisms": [
            {
              "organismName": "inventoryItemHeader",
              "purpose": "Exibir nome/unidade/status e saldo atual do ingrediente (quando existente).",
              "userActions": [
                "Visualizar saldo atual",
                "Ver status atual"
              ],
              "requiredEntities": [
                "InventoryItem",
                "InventoryBalanceSnapshot"
              ],
              "readsFields": [
                "InventoryItem.name",
                "InventoryItem.unit",
                "InventoryItem.status",
                "InventoryBalanceSnapshot.currentBalance",
                "InventoryBalanceSnapshot.asOfDate"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "formularioDoIngrediente",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "inventoryItemForm",
              "purpose": "Editar nome, unidade e status do ingrediente ou cadastrar novo.",
              "userActions": [
                "Editar nome",
                "Selecionar unidade",
                "Ativar/desativar",
                "Salvar"
              ],
              "requiredEntities": [
                "InventoryItem"
              ],
              "readsFields": [
                "InventoryItem.name",
                "InventoryItem.unit",
                "InventoryItem.status"
              ],
              "writesFields": [
                "InventoryItem.name",
                "InventoryItem.unit",
                "InventoryItem.status"
              ],
              "rulesApplied": []
            },
            {
              "organismName": "inventoryAdjustmentShortcut",
              "purpose": "Acessar ajuste manual de estoque para o ingrediente atual.",
              "userActions": [
                "Abrir ajuste de estoque"
              ],
              "requiredEntities": [
                "InventoryItem"
              ],
              "readsFields": [
                "InventoryItem.id",
                "InventoryItem.name"
              ],
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
        "purpose": "Carregar saldo atual e metadados do ingrediente para contexto de edição/ajuste.",
        "kind": "query",
        "input": [
          {
            "name": "inventoryItemId",
            "type": "InventoryItemId",
            "required": true
          }
        ],
        "output": [
          {
            "name": "inventoryItemId",
            "type": "InventoryItemId"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "unit",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "currentBalance",
            "type": "number"
          },
          {
            "name": "asOfDate",
            "type": "date"
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
        "commandName": "upsertInventoryItem",
        "purpose": "Salvar cadastro do ingrediente (criar/editar/desativar).",
        "kind": "command",
        "input": [
          {
            "name": "inventoryItemId",
            "type": "InventoryItemId",
            "required": false
          },
          {
            "name": "name",
            "type": "string",
            "required": true
          },
          {
            "name": "unit",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "inventoryItemId",
            "type": "InventoryItemId"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "unit",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          }
        ],
        "readsEntities": [
          "InventoryItem"
        ],
        "writesEntities": [
          "InventoryItem"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "upsertInventoryItem"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      }
    ]
  }
} as const;

export default inventoryItemEditorPagePlan;
