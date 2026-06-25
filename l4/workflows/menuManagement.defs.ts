/// <mls fileReference="_102048_/l4/workflows/menuManagement.defs.ts" enhancement="_blank"/>

export const menuManagementDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "menuManagement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "menuManagement",
      "title": "Gerenciamento de cardápio e receitas",
      "purpose": "Permitir ao gerente cadastrar e manter itens do cardápio, categorias e receitas com consumo de ingredientes, vinculando cada item do cardápio aos insumos necessários para a baixa de estoque.",
      "executionMode": "uiState",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "managerOwner"
      ],
      "states": [
        {
          "stateId": "menuList",
          "description": "Lista de itens e categorias do cardápio com filtros de status."
        },
        {
          "stateId": "menuItemEditing",
          "description": "Criação ou edição de item do cardápio e sua receita."
        },
        {
          "stateId": "recipeEditing",
          "description": "Edição das linhas de ingredientes da receita do item."
        },
        {
          "stateId": "menuItemSaved",
          "description": "Item do cardápio e receita salvos com sucesso."
        }
      ],
      "transitions": [
        {
          "from": "menuList",
          "to": "menuItemEditing",
          "trigger": "selectCreateOrEditMenuItem",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
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
            "RecipeIngredient.recipeId",
            "RecipeIngredient.inventoryItemId",
            "RecipeIngredient.quantity",
            "RecipeIngredient.unitOfMeasure"
          ],
          "rulesApplied": []
        },
        {
          "from": "menuItemEditing",
          "to": "recipeEditing",
          "trigger": "editRecipeIngredients",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "Recipe.recipeId",
            "Recipe.menuItemId",
            "Recipe.status",
            "RecipeIngredient.recipeIngredientId",
            "RecipeIngredient.recipeId",
            "RecipeIngredient.inventoryItemId",
            "RecipeIngredient.quantity",
            "RecipeIngredient.unitOfMeasure"
          ],
          "rulesApplied": []
        },
        {
          "from": "recipeEditing",
          "to": "menuItemEditing",
          "trigger": "saveRecipeIngredients",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "RecipeIngredient.recipeIngredientId",
            "RecipeIngredient.recipeId",
            "RecipeIngredient.inventoryItemId",
            "RecipeIngredient.quantity",
            "RecipeIngredient.unitOfMeasure",
            "Recipe.updatedAt"
          ],
          "rulesApplied": []
        },
        {
          "from": "menuItemEditing",
          "to": "menuItemSaved",
          "trigger": "submitMenuItemAndRecipe",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "MenuItem.menuItemId",
            "MenuItem.name",
            "MenuItem.description",
            "MenuItem.price",
            "MenuItem.status",
            "MenuItem.menuCategoryId",
            "MenuItem.sku",
            "MenuItem.imageUrl",
            "MenuItem.updatedAt",
            "Recipe.recipeId",
            "Recipe.menuItemId",
            "Recipe.status",
            "Recipe.updatedAt",
            "RecipeIngredient.recipeIngredientId",
            "RecipeIngredient.recipeId",
            "RecipeIngredient.inventoryItemId",
            "RecipeIngredient.quantity",
            "RecipeIngredient.unitOfMeasure",
            "RecipeIngredient.updatedAt"
          ],
          "rulesApplied": [
            "menuPriceIsSnapshottedOnOrderItem"
          ]
        },
        {
          "from": "menuItemSaved",
          "to": "menuList",
          "trigger": "returnToMenuList",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "MenuItem.menuItemId",
            "MenuItem.name",
            "MenuItem.price",
            "MenuItem.status",
            "MenuItem.menuCategoryId",
            "MenuCategory.menuCategoryId",
            "MenuCategory.name",
            "MenuCategory.status"
          ],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "MenuItem",
        "MenuCategory",
        "Recipe",
        "RecipeIngredient"
      ],
      "persistenceRefs": [],
      "usecaseRefs": [
        "upsertMenuItemAndRecipe",
        "listMenuItems",
        "getMenuItemWithRecipe"
      ],
      "metricRefs": [],
      "userActions": [
        "selectCreateOrEditMenuItem",
        "editRecipeIngredients",
        "saveRecipeIngredients",
        "submitMenuItemAndRecipe",
        "returnToMenuList"
      ],
      "relatedPages": [
        "menuItemEditor",
        "menuManagement",
        "menuValidation",
        "posMenuPicker",
        "recipeEditor"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "menuPriceIsSnapshottedOnOrderItem"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "recipeValidation",
          "title": "Validação de receita completa",
          "priority": "now",
          "description": "Alertar se um item ativo do cardápio não possuir receita definida, pois isso impede a baixa automática de estoque no fechamento do pedido.",
          "tradeoff": "Pode bloquear a publicação de itens em situações onde a receita ainda está em construção, exigindo opção de salvar como rascunho."
        },
        {
          "suggestionId": "taskNotCreated",
          "title": "Sem criação de tarefas",
          "priority": "now",
          "description": "Este fluxo é operado diretamente pelo gerente/dono na interface; não há necessidade de criar tarefas persistentes para este processo.",
          "tradeoff": "Sem tarefas, não há fila pendente nem acompanhamento assíncrono fora da tela."
        }
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "cafeFlow"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "cafeFlow",
          "entity": "MenuItem"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "MenuCategory"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "Recipe"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "RecipeIngredient"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "menuManagement"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/menuManagement.defs.ts",
      "exportName": "menuManagementDef",
      "saveAsDefs": true
    }
  }
} as const;

export default menuManagementDef;
