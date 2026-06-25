/// <mls fileReference="_102048_/l2/cafeFlow/inventoryManagement.defs.ts" enhancement="_blank"/>

export const inventoryManagementPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryManagement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryManagement",
      "pageName": "Gerenciamento de estoque (ingredientes)",
      "actor": "managerOwner",
      "purpose": "Ver lista de ingredientes, saldos (snapshots) e alertas, e acessar edição e ajustes manuais.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "inventoryItemEditor",
          "trigger": "Tocar em \"Novo ingrediente\" ou editar ingrediente"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryLowStock",
          "trigger": "Aplicar filtro/atalho de estoque baixo"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryTransactions",
          "trigger": "Abrir movimentações de estoque"
        }
      ],
      "sections": [
        {
          "sectionName": "Lista de ingredientes e saldos",
          "mode": "list",
          "organisms": [
            {
              "organismName": "Filtro e busca de ingredientes",
              "purpose": "Permitir busca e filtro rápido, incluindo estoque baixo.",
              "userActions": [
                "Listar ingredientes",
                "Filtrar por saldo baixo"
              ],
              "requiredEntities": [
                "InventoryItem"
              ],
              "readsFields": [
                "InventoryItem.id",
                "InventoryItem.name",
                "InventoryItem.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "Tabela de ingredientes com saldo atual",
              "purpose": "Exibir ingredientes com saldo atual e indicação de nível crítico.",
              "userActions": [
                "Abrir ingrediente para editar",
                "Ver movimentações"
              ],
              "requiredEntities": [
                "InventoryItem",
                "InventoryBalanceSnapshot"
              ],
              "readsFields": [
                "InventoryItem.id",
                "InventoryItem.name",
                "InventoryItem.unitOfMeasure",
                "InventoryItem.status",
                "InventoryBalanceSnapshot.inventoryItemId",
                "InventoryBalanceSnapshot.quantityOnHand",
                "InventoryBalanceSnapshot.recordedAt"
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
        "commandName": "listInventoryItems",
        "purpose": "Carregar cadastro de ingredientes para gestão.",
        "kind": "query",
        "input": [
          {
            "name": "search",
            "type": "string",
            "required": false
          },
          {
            "name": "status",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "inventoryItemId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "unitOfMeasure",
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
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "listInventoryItems"
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
        "purpose": "Carregar snapshots de saldo para exibir saldo atual e alertas.",
        "kind": "query",
        "input": [
          {
            "name": "onlyCritical",
            "type": "boolean",
            "required": false
          },
          {
            "name": "inventoryItemIds",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "inventoryBalanceSnapshotId",
            "type": "string"
          },
          {
            "name": "inventoryItemId",
            "type": "string"
          },
          {
            "name": "quantityOnHand",
            "type": "number"
          },
          {
            "name": "recordedAt",
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
          "listInventoryBalances"
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

export default inventoryManagementPagePlan;
