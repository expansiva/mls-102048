/// <mls fileReference="_102048_/l2/cafeFlow/menuItemEditor.defs.ts" enhancement="_blank"/>

export const menuItemEditorPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "menuItemEditor",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "menuItemEditor",
      "pageName": "Editar item do cardápio",
      "actor": "managerOwner",
      "purpose": "Criar/editar/desativar item do cardápio e acessar a edição de receita sem afetar pedidos antigos.",
      "capabilities": [
        "manageMenuItems",
        "autoInventoryDeduction"
      ],
      "flowRefs": {
        "experienceFlows": [
          "menuManagement"
        ],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "menuItem",
        "recipe"
      ],
      "pageInputs": [
        {
          "name": "menuItemId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do item do cardápio quando em edição.",
          "entityRef": "MenuItem",
          "fieldRef": "menuItemId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "menuManagement",
          "trigger": "Editar/criar item"
        },
        {
          "direction": "outbound",
          "pageId": "recipeEditor",
          "trigger": "Abrir aba Receita"
        },
        {
          "direction": "outbound",
          "pageId": "menuManagement",
          "trigger": "Salvar e voltar"
        }
      ],
      "sections": [
        {
          "sectionName": "Dados do item",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "menuItemForm",
              "purpose": "Editar nome, categoria, preço, status e campos básicos do item do cardápio.",
              "userActions": [
                "Editar nome/categoria/preço/status"
              ],
              "requiredEntities": [
                "MenuItem",
                "MenuCategory"
              ],
              "readsFields": [
                "MenuItem.menuItemId",
                "MenuItem.name",
                "MenuItem.description",
                "MenuItem.price",
                "MenuItem.status",
                "MenuItem.menuCategoryId",
                "MenuItem.sku",
                "MenuItem.imageUrl",
                "MenuCategory.menuCategoryId",
                "MenuCategory.name",
                "MenuCategory.status"
              ],
              "writesFields": [
                "MenuItem.name",
                "MenuItem.description",
                "MenuItem.price",
                "MenuItem.status",
                "MenuItem.menuCategoryId",
                "MenuItem.sku",
                "MenuItem.imageUrl"
              ],
              "rulesApplied": [
                "menuPriceIsSnapshottedOnOrderItem"
              ]
            }
          ]
        },
        {
          "sectionName": "Receita vinculada",
          "mode": "view",
          "organisms": [
            {
              "organismName": "recipeLinkCard",
              "purpose": "Exibir status da receita vinculada e permitir abrir a edição da receita do item.",
              "userActions": [
                "Abrir aba Receita"
              ],
              "requiredEntities": [
                "Recipe",
                "RecipeIngredient"
              ],
              "readsFields": [
                "Recipe.recipeId",
                "Recipe.menuItemId",
                "Recipe.status",
                "RecipeIngredient.recipeIngredientId",
                "RecipeIngredient.inventoryItemId",
                "RecipeIngredient.quantity",
                "RecipeIngredient.unitOfMeasure"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Salvar alterações",
          "mode": "commit",
          "organisms": [
            {
              "organismName": "saveMenuItemAction",
              "purpose": "Salvar alterações do item e receita vinculada quando aplicável.",
              "userActions": [
                "Salvar alterações"
              ],
              "requiredEntities": [
                "MenuItem",
                "Recipe",
                "RecipeIngredient"
              ],
              "readsFields": [
                "MenuItem.menuItemId",
                "MenuItem.name",
                "MenuItem.description",
                "MenuItem.price",
                "MenuItem.status",
                "MenuItem.menuCategoryId",
                "MenuItem.sku",
                "MenuItem.imageUrl",
                "Recipe.recipeId",
                "Recipe.menuItemId",
                "Recipe.status",
                "RecipeIngredient.recipeIngredientId",
                "RecipeIngredient.inventoryItemId",
                "RecipeIngredient.quantity",
                "RecipeIngredient.unitOfMeasure"
              ],
              "writesFields": [
                "MenuItem",
                "Recipe",
                "RecipeIngredient"
              ],
              "rulesApplied": [
                "menuPriceIsSnapshottedOnOrderItem"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getMenuItemWithRecipe",
        "purpose": "Carregar item e receita para edição.",
        "kind": "query",
        "input": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "menuItemId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "price",
            "type": "number"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "menuCategoryId",
            "type": "string"
          },
          {
            "name": "sku",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "recipeId",
            "type": "string"
          },
          {
            "name": "recipeStatus",
            "type": "string"
          },
          {
            "name": "recipeIngredientId",
            "type": "string"
          },
          {
            "name": "inventoryItemId",
            "type": "string"
          },
          {
            "name": "quantity",
            "type": "number"
          },
          {
            "name": "unitOfMeasure",
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
          "getMenuItemWithRecipe"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "upsertMenuItemAndRecipe",
        "purpose": "Salvar alterações do MenuItem (e opcionalmente receita vinculada).",
        "kind": "command",
        "input": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": false
          },
          {
            "name": "name",
            "type": "string",
            "required": true
          },
          {
            "name": "description",
            "type": "string",
            "required": false
          },
          {
            "name": "price",
            "type": "number",
            "required": true
          },
          {
            "name": "status",
            "type": "string",
            "required": true
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": true
          },
          {
            "name": "sku",
            "type": "string",
            "required": false
          },
          {
            "name": "imageUrl",
            "type": "string",
            "required": false
          },
          {
            "name": "recipeId",
            "type": "string",
            "required": false
          },
          {
            "name": "recipeStatus",
            "type": "string",
            "required": false
          },
          {
            "name": "recipeIngredients",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "menuItemId",
            "type": "string"
          },
          {
            "name": "updatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "MenuAndRecipeCatalog"
        ],
        "writesEntities": [
          "MenuAndRecipeCatalog"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "upsertMenuItemAndRecipe"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "menuPriceIsSnapshottedOnOrderItem"
        ]
      }
    ]
  }
} as const;

export default menuItemEditorPagePlan;
