/// <mls fileReference="_102048_/l2/cafeFlow/menuValidation.defs.ts" enhancement="_blank"/>

export const menuValidationPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "menuValidation",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 98,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "menuValidation",
      "pageName": "Validação de cardápio (itens sem receita)",
      "actor": "managerOwner",
      "purpose": "Exibir alertas de itens importantes sem receita ativa e orientar correção para evitar baixa automática incompleta.",
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
        "recipe"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "menuManagement",
          "trigger": "Abrir alerta de validação"
        },
        {
          "direction": "outbound",
          "pageId": "menuItemEditor",
          "trigger": "Selecionar item para corrigir"
        }
      ],
      "sections": [
        {
          "sectionName": "Alertas de itens sem receita ativa",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Lista de itens sem receita ativa",
              "purpose": "Listar itens do cardápio com receita ausente ou inativa para correção rápida.",
              "userActions": [
                "Ver detalhes do item",
                "Selecionar item para corrigir receita"
              ],
              "requiredEntities": [
                "MenuItem",
                "Recipe"
              ],
              "readsFields": [
                "MenuItem.menuItemId",
                "MenuItem.name",
                "MenuItem.status",
                "MenuItem.menuCategoryId",
                "MenuItem.price",
                "Recipe.status",
                "Recipe.recipeId"
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
        "purpose": "Listar itens do cardápio com indicador de receita ativa para validação.",
        "kind": "query",
        "input": [
          {
            "name": "missingActiveRecipeOnly",
            "type": "boolean",
            "required": false
          }
        ],
        "output": [
          {
            "name": "menuItemId",
            "type": "MenuItemId"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "menuCategoryId",
            "type": "MenuCategoryId"
          },
          {
            "name": "price",
            "type": "number"
          },
          {
            "name": "recipeId",
            "type": "RecipeId"
          },
          {
            "name": "recipeStatus",
            "type": "string"
          },
          {
            "name": "hasActiveRecipe",
            "type": "boolean"
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
      }
    ]
  }
} as const;

export default menuValidationPagePlan;
