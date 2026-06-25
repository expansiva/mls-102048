/// <mls fileReference="_102048_/l2/cafeFlow/inventoryLowStock.defs.ts" enhancement="_blank"/>

export const inventoryLowStockPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryLowStock",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryLowStock",
      "pageName": "Estoque baixo (lista)",
      "actor": "managerOwner",
      "purpose": "Ver ingredientes abaixo do nível crítico e investigar impacto em receitas importantes.",
      "capabilities": [
        "manageInventoryItems",
        "viewDashboardToday"
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
        "inventoryItem",
        "recipe"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "dashboardToday",
          "trigger": "Tocar no card \"Estoque baixo\""
        },
        {
          "direction": "outbound",
          "pageId": "inventoryItemEditor",
          "trigger": "Selecionar ingrediente para ver/editar"
        }
      ],
      "sections": [
        {
          "sectionName": "Lista de ingredientes críticos",
          "mode": "list",
          "organisms": [
            {
              "organismName": "Lista de estoque baixo",
              "purpose": "Exibir ingredientes abaixo do nível crítico com saldo atual e limiar mínimo para priorizar ação.",
              "userActions": [
                "Ver itens críticos",
                "Abrir detalhe do ingrediente"
              ],
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
          "sectionName": "Ações rápidas",
          "mode": "actionPanel",
          "organisms": [
            {
              "organismName": "Priorizar ação",
              "purpose": "Direcionar o gerente para compra ou ajuste manual do ingrediente selecionado.",
              "userActions": [
                "Priorizar ação (compra/ajuste)"
              ],
              "requiredEntities": [
                "InventoryBalanceSnapshot"
              ],
              "readsFields": [
                "inventoryItemId",
                "quantityOnHand"
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
        "commandName": "listInventoryBalances",
        "purpose": "Listar saldos críticos (baixo estoque).",
        "kind": "query",
        "input": [],
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
            "name": "minThreshold",
            "type": "number"
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

export default inventoryLowStockPagePlan;
