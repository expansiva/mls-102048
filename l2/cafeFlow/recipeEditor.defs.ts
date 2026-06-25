/// <mls fileReference="_102048_/l2/cafeFlow/recipeEditor.defs.ts" enhancement="_blank"/>

export const recipeEditorPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "recipeEditor",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 101,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "recipeEditor",
      "pageName": "Editar receita do item",
      "actor": "managerOwner",
      "purpose": "Definir/editar consumo de ingredientes por item para permitir baixa automática no fechamento do pedido.",
      "capabilities": [
        "manageMenuItems",
        "autoInventoryDeduction",
        "manageInventoryItems"
      ],
      "flowRefs": {
        "experienceFlows": [
          "menuManagement"
        ],
        "entityLifecycles": [
          "inventoryAdjustment"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "recipe",
        "inventoryItem"
      ],
      "pageInputs": [
        {
          "name": "menuItemId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do item do cardápio cuja receita será editada.",
          "entityRef": "MenuItem",
          "fieldRef": "MenuItem.menuItemId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "menuItemEditor",
          "trigger": "Abrir aba Receita"
        },
        {
          "direction": "outbound",
          "pageId": "menuItemEditor",
          "trigger": "Salvar receita e voltar"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do item",
          "mode": "view",
          "organisms": [
            {
              "organismName": "menuItemRecipeHeader",
              "purpose": "Exibir dados básicos do item do cardápio e status da receita ativa para contexto.",
              "userActions": [],
              "requiredEntities": [
                "MenuItem",
                "Recipe"
              ],
              "readsFields": [
                "MenuItem.menuItemId",
                "MenuItem.name",
                "MenuItem.status",
                "Recipe.recipeId",
                "Recipe.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Ingredientes da receita",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "recipeIngredientsEditor",
              "purpose": "Adicionar/remover ingredientes e definir quantidade e unidade de consumo.",
              "userActions": [
                "Adicionar ingrediente à receita",
                "Definir quantidade/unidade",
                "Ativar/desativar receita"
              ],
              "requiredEntities": [
                "Recipe",
                "RecipeIngredient",
                "InventoryItem"
              ],
              "readsFields": [
                "Recipe.recipeId",
                "Recipe.menuItemId",
                "Recipe.status",
                "RecipeIngredient.recipeIngredientId",
                "RecipeIngredient.recipeId",
                "RecipeIngredient.inventoryItemId",
                "RecipeIngredient.quantity",
                "RecipeIngredient.unitOfMeasure",
                "InventoryItem.inventoryItemId",
                "InventoryItem.name",
                "InventoryItem.unitOfMeasure",
                "InventoryItem.status"
              ],
              "writesFields": [
                "Recipe.status",
                "RecipeIngredient.recipeIngredientId",
                "RecipeIngredient.inventoryItemId",
                "RecipeIngredient.quantity",
                "RecipeIngredient.unitOfMeasure"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Salvar",
          "mode": "action",
          "organisms": [
            {
              "organismName": "saveRecipeAction",
              "purpose": "Salvar a receita e retornar ao editor do item.",
              "userActions": [
                "Salvar"
              ],
              "requiredEntities": [
                "MenuItem",
                "Recipe",
                "RecipeIngredient"
              ],
              "readsFields": [
                "MenuItem.menuItemId",
                "Recipe.recipeId",
                "Recipe.status",
                "RecipeIngredient.recipeIngredientId",
                "RecipeIngredient.inventoryItemId",
                "RecipeIngredient.quantity",
                "RecipeIngredient.unitOfMeasure"
              ],
              "writesFields": [
                "Recipe.status",
                "RecipeIngredient.recipeIngredientId",
                "RecipeIngredient.inventoryItemId",
                "RecipeIngredient.quantity",
                "RecipeIngredient.unitOfMeasure"
              ],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listInventoryItems",
        "purpose": "Listar ingredientes disponíveis para compor receita.",
        "kind": "query",
        "input": [
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
          "MenuAndRecipeCatalog"
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
        "commandName": "getMenuItemWithRecipe",
        "purpose": "Carregar item do cardápio e receita atual para edição.",
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
            "name": "menuItemName",
            "type": "string"
          },
          {
            "name": "menuItemStatus",
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
        "purpose": "Salvar a receita (ingredientes/quantidades) associada ao item do cardápio.",
        "kind": "command",
        "input": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": true
          },
          {
            "name": "recipeStatus",
            "type": "string",
            "required": true
          },
          {
            "name": "recipeId",
            "type": "string",
            "required": false
          },
          {
            "name": "recipeIngredientId",
            "type": "string",
            "required": false
          },
          {
            "name": "inventoryItemId",
            "type": "string",
            "required": true
          },
          {
            "name": "quantity",
            "type": "number",
            "required": true
          },
          {
            "name": "unitOfMeasure",
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
        "rulesApplied": []
      }
    ]
  }
} as const;

export default recipeEditorPagePlan;
