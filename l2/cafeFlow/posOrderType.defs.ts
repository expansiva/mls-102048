/// <mls fileReference="_102048_/l2/cafeFlow/posOrderType.defs.ts" enhancement="_blank"/>

export const posOrderTypePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posOrderType",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posOrderType",
      "pageName": "Tipo do pedido (mesa/takeout)",
      "actor": "attendantCashier",
      "purpose": "Selecionar se o pedido é para mesa ou takeout e associar a mesa/nome conforme necessário.",
      "capabilities": [
        "takeOrderPos"
      ],
      "flowRefs": {
        "experienceFlows": [
          "posOrderTaking"
        ],
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
          "description": "Identificador do pedido em rascunho.",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "posFast",
          "trigger": "Após criar pedido draft"
        },
        {
          "direction": "outbound",
          "pageId": "posMenuPicker",
          "trigger": "Tipo definido com sucesso"
        }
      ],
      "sections": [
        {
          "sectionName": "Escolher tipo do pedido",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "orderTypeSelector",
              "purpose": "Selecionar se o pedido é mesa ou takeout.",
              "userActions": [
                "Selecionar Mesa",
                "Selecionar Takeout"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [],
              "writesFields": [
                "Order.type"
              ],
              "rulesApplied": [
                "orderTypeMustBeTableOrTakeout"
              ]
            }
          ]
        },
        {
          "sectionName": "Selecionar mesa ou identificação",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "diningTableList",
              "purpose": "Listar mesas ativas para seleção quando o tipo for mesa.",
              "userActions": [
                "Selecionar mesa"
              ],
              "requiredEntities": [
                "DiningTable",
                "Order"
              ],
              "readsFields": [
                "DiningTable.diningTableId",
                "DiningTable.tableNumber",
                "DiningTable.status"
              ],
              "writesFields": [
                "Order.diningTableId"
              ],
              "rulesApplied": []
            },
            {
              "organismName": "takeoutIdentifierForm",
              "purpose": "Informar nome/identificação para pedidos takeout.",
              "userActions": [
                "Informar nome do cliente"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [],
              "writesFields": [
                "Order.customerName"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Confirmar tipo do pedido",
          "mode": "review",
          "organisms": [
            {
              "organismName": "confirmOrderType",
              "purpose": "Confirmar e persistir tipo do pedido e seleção de mesa ou identificação.",
              "userActions": [
                "Confirmar e avançar"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.type",
                "Order.diningTableId",
                "Order.customerName",
                "Order.status"
              ],
              "writesFields": [
                "Order.type",
                "Order.diningTableId",
                "Order.customerName"
              ],
              "rulesApplied": [
                "orderTypeMustBeTableOrTakeout"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listDiningTables",
        "purpose": "Listar mesas disponíveis/ativas para vincular ao pedido.",
        "kind": "query",
        "input": [
          {
            "name": "status",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "diningTableId",
            "type": "uuid"
          },
          {
            "name": "tableNumber",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          }
        ],
        "readsEntities": [
          "DiningTable"
        ],
        "writesEntities": [],
        "readsTables": [
          "dining_table"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listDiningTables"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "addOrUpdateOrderItems",
        "purpose": "Persistir metadados do pedido relacionados ao tipo (mesa/takeout) e avançar no fluxo de montagem.",
        "kind": "mutation",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "type",
            "type": "string",
            "required": true
          },
          {
            "name": "diningTableId",
            "type": "uuid",
            "required": false
          },
          {
            "name": "customerName",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid"
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
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "order",
          "menu_item"
        ],
        "writesTables": [
          "order"
        ],
        "usecaseRefs": [
          "addOrUpdateOrderItems"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "orderTypeMustBeTableOrTakeout"
        ]
      }
    ]
  }
} as const;

export default posOrderTypePagePlan;
