/// <mls fileReference="_102048_/l2/cafeFlow/inventoryTransactions.defs.ts" enhancement="_blank"/>

export const inventoryTransactionsPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryTransactions",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryTransactions",
      "pageName": "Movimentações de estoque",
      "actor": "managerOwner",
      "purpose": "Consultar histórico de movimentações (ajustes manuais e baixas automáticas) para auditoria e conferência.",
      "capabilities": [
        "manageInventoryItems",
        "autoInventoryDeduction"
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "inventoryManagement",
          "trigger": "Abrir movimentações de estoque"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryItemEditor",
          "trigger": "Abrir ingrediente relacionado (atalho)"
        }
      ],
      "sections": [
        {
          "sectionName": "Filtros de movimentações",
          "mode": "filter",
          "organisms": [
            {
              "organismName": "inventoryTransactionFilters",
              "purpose": "Filtrar movimentações por ingrediente, período, tipo e status.",
              "userActions": [
                "Aplicar filtros",
                "Limpar filtros"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Lista de movimentações",
          "mode": "list",
          "organisms": [
            {
              "organismName": "inventoryTransactionList",
              "purpose": "Exibir lista paginada de movimentações com origem e quantidades para auditoria.",
              "userActions": [
                "Ordenar por data",
                "Abrir detalhes da movimentação",
                "Abrir ingrediente relacionado"
              ],
              "requiredEntities": [
                "InventoryTransaction"
              ],
              "readsFields": [
                "InventoryTransaction.inventoryTransactionId",
                "InventoryTransaction.inventoryItemId",
                "InventoryTransaction.orderId",
                "InventoryTransaction.transactionType",
                "InventoryTransaction.quantityChange",
                "InventoryTransaction.reason",
                "InventoryTransaction.status",
                "InventoryTransaction.recordedAt"
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
        "commandName": "listInventoryTransactions",
        "purpose": "Listar movimentações de estoque para auditoria.",
        "kind": "query",
        "input": [
          {
            "name": "startDate",
            "type": "date",
            "required": false
          },
          {
            "name": "endDate",
            "type": "date",
            "required": false
          },
          {
            "name": "inventoryItemId",
            "type": "uuid",
            "required": false
          },
          {
            "name": "transactionType",
            "type": "string",
            "required": false
          },
          {
            "name": "status",
            "type": "string",
            "required": false
          },
          {
            "name": "page",
            "type": "number",
            "required": false
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false
          }
        ],
        "output": [
          {
            "name": "inventoryTransactionId",
            "type": "uuid"
          },
          {
            "name": "inventoryItemId",
            "type": "uuid"
          },
          {
            "name": "inventoryItemName",
            "type": "string"
          },
          {
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "transactionType",
            "type": "string"
          },
          {
            "name": "quantityChange",
            "type": "number"
          },
          {
            "name": "reason",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "recordedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "InventoryTransaction"
        ],
        "writesEntities": [],
        "readsTables": [
          "inventory_transaction"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listInventoryTransactions"
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

export default inventoryTransactionsPagePlan;
