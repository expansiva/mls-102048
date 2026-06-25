/// <mls fileReference="_102048_/l2/cafeFlow/posMenuPicker.defs.ts" enhancement="_blank"/>

export const posMenuPickerPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posMenuPicker",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 97,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posMenuPicker",
      "pageName": "Selecionar itens do cardápio (POS)",
      "actor": "attendantCashier",
      "purpose": "Adicionar itens do cardápio ao pedido com quantidades e observações rapidamente.",
      "capabilities": [
        "takeOrderPos",
        "bilingualUi"
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
      "mdmRefs": [
        "menuItem"
      ],
      "pageInputs": [
        {
          "name": "orderId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido em rascunho para adicionar itens.",
          "entityRef": "Order",
          "fieldRef": "id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "posOrderType",
          "trigger": "Após definir tipo do pedido"
        },
        {
          "direction": "outbound",
          "pageId": "posOrderSummary",
          "trigger": "Tocar em \"Resumo\"/\"Ver pedido\""
        }
      ],
      "sections": [
        {
          "sectionName": "Explorar cardápio",
          "mode": "browse",
          "organisms": [
            {
              "organismName": "MenuCategoryFilter",
              "purpose": "Filtrar itens por categoria e busca rápida.",
              "userActions": [
                "Selecionar categoria",
                "Buscar item"
              ],
              "requiredEntities": [
                "MenuItem",
                "MenuCategory"
              ],
              "readsFields": [
                "MenuItem.id",
                "MenuItem.name",
                "MenuItem.price",
                "MenuItem.categoryId",
                "MenuItem.isActive",
                "MenuCategory.id",
                "MenuCategory.name"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "MenuItemGrid",
              "purpose": "Listar itens do cardápio para adicionar ao pedido.",
              "userActions": [
                "Adicionar item"
              ],
              "requiredEntities": [
                "MenuItem",
                "Order"
              ],
              "readsFields": [
                "MenuItem.id",
                "MenuItem.name",
                "MenuItem.price",
                "MenuItem.categoryId",
                "MenuItem.isActive"
              ],
              "writesFields": [
                "Order.items"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Itens do pedido",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "OrderItemEditor",
              "purpose": "Exibir itens selecionados, ajustar quantidade e observações.",
              "userActions": [
                "Ajustar quantidade",
                "Adicionar observações",
                "Remover item"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.items",
                "Order.totalAmount"
              ],
              "writesFields": [
                "Order.items",
                "Order.totalAmount"
              ],
              "rulesApplied": [
                "menuPriceIsSnapshottedOnOrderItem"
              ]
            },
            {
              "organismName": "OrderSummaryBar",
              "purpose": "Mostrar total parcial e atalho para o resumo do pedido.",
              "userActions": [
                "Ir para resumo do pedido"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.id",
                "Order.totalAmount",
                "Order.items"
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
        "commandName": "listMenuItems",
        "purpose": "Carregar itens do cardápio para seleção no POS.",
        "kind": "query",
        "input": [
          {
            "name": "categoryId",
            "type": "uuid",
            "required": false
          },
          {
            "name": "searchText",
            "type": "string",
            "required": false
          },
          {
            "name": "onlyActive",
            "type": "boolean",
            "required": false
          }
        ],
        "output": [
          {
            "name": "menuItemId",
            "type": "uuid"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "price",
            "type": "money"
          },
          {
            "name": "categoryId",
            "type": "uuid"
          },
          {
            "name": "isActive",
            "type": "boolean"
          },
          {
            "name": "categoryName",
            "type": "string"
          }
        ],
        "readsEntities": [
          "MenuAndRecipeCatalog"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "listMenuItems"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "getOrderById",
        "purpose": "Carregar o pedido em rascunho e seus itens para edição no POS.",
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
            "name": "status",
            "type": "string"
          },
          {
            "name": "type",
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
          },
          {
            "name": "totalAmount",
            "type": "money"
          },
          {
            "name": "items",
            "type": "OrderItem[]"
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
      },
      {
        "commandName": "addOrUpdateOrderItems",
        "purpose": "Adicionar/atualizar itens e observações no pedido em rascunho.",
        "kind": "mutation",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "items",
            "type": "OrderItemInput[]",
            "required": true
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "totalAmount",
            "type": "money"
          },
          {
            "name": "items",
            "type": "OrderItem[]"
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
          "addOrUpdateOrderItems"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "menuPriceIsSnapshottedOnOrderItem",
          "orderStatusTransitionsControlled"
        ]
      }
    ]
  }
} as const;

export default posMenuPickerPagePlan;
