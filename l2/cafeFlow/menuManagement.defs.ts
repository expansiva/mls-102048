/// <mls fileReference="_102048_/l2/cafeFlow/menuManagement.defs.ts" enhancement="_blank"/>

export const menuManagementPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "menuManagement",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 104,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "menuManagement",
      "pageName": "Gerenciamento de cardápio",
      "actor": "managerOwner",
      "purpose": "Ver e organizar itens do cardápio por categorias, ativar/desativar itens e acessar edição e validações de receita.",
      "capabilities": [
        "manageMenuItems"
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "menuItemEditor",
          "trigger": "Tocar em \"Novo item\" ou editar item"
        },
        {
          "direction": "outbound",
          "pageId": "menuValidation",
          "trigger": "Abrir alerta/validação de item sem receita"
        }
      ],
      "sections": [
        {
          "sectionName": "Filtros e busca",
          "mode": "view",
          "organisms": [
            {
              "organismName": "menuFilters",
              "purpose": "Filtrar itens por categoria, status e texto para localizar rapidamente itens do cardápio.",
              "userActions": [
                "Filtrar por categoria",
                "Filtrar por status",
                "Buscar por nome"
              ],
              "requiredEntities": [
                "MenuItem",
                "MenuCategory"
              ],
              "readsFields": [
                "MenuItem.menuItemId",
                "MenuItem.name",
                "MenuItem.status",
                "MenuItem.price",
                "MenuItem.menuCategoryId",
                "MenuCategory.menuCategoryId",
                "MenuCategory.name",
                "MenuCategory.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Lista do cardápio",
          "mode": "view",
          "organisms": [
            {
              "organismName": "menuItemList",
              "purpose": "Exibir itens do cardápio com categoria, preço e status para gestão.",
              "userActions": [
                "Listar itens ativos/inativos",
                "Abrir item para editar",
                "Criar novo item"
              ],
              "requiredEntities": [
                "MenuItem",
                "MenuCategory"
              ],
              "readsFields": [
                "MenuItem.menuItemId",
                "MenuItem.name",
                "MenuItem.status",
                "MenuItem.price",
                "MenuItem.menuCategoryId",
                "MenuCategory.menuCategoryId",
                "MenuCategory.name"
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
        "purpose": "Carregar lista do cardápio para gestão.",
        "kind": "query",
        "input": [
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": false
          },
          {
            "name": "status",
            "type": "string",
            "required": false
          },
          {
            "name": "searchText",
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
            "name": "name",
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
            "name": "menuCategoryName",
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
      }
    ],
    "pendingQuestions": [
      "Existe um usecase L3 aprovado para desativar item do cardápio (ex.: deactivateMenuItem)? Se sim, informe o usecaseId para expor a ação \"Desativar item\" nesta página.",
      "A validação de itens sem receita deve ser acionada por uma consulta específica (usecase) nesta página ou apenas por navegação para \"menuValidation\"? Se houver usecase, informe o usecaseId."
    ]
  }
} as const;

export default menuManagementPagePlan;
