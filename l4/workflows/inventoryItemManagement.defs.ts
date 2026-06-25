/// <mls fileReference="_102048_/l4/workflows/inventoryItemManagement.defs.ts" enhancement="_blank"/>

export const inventoryItemManagementDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "inventoryItemManagement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "inventoryItemManagement",
      "title": "Gerenciamento de ingredientes",
      "purpose": "Cadastrar e manter os ingredientes e insumos utilizados nas receitas do cardápio e nas movimentações de estoque, definindo unidades de medida e saldos iniciais.",
      "executionMode": "uiState",
      "createsTask": false,
      "actors": [
        "managerOwner"
      ],
      "states": [
        {
          "stateId": "listing",
          "description": "Listagem dos ingredientes cadastrados com busca, filtros e ações de cadastro/edição"
        },
        {
          "stateId": "creating",
          "description": "Formulário para cadastro de novo ingrediente com unidade de medida e saldo inicial"
        },
        {
          "stateId": "editing",
          "description": "Formulário para edição dos dados do ingrediente ou desativação"
        }
      ],
      "transitions": [
        {
          "from": "listing",
          "to": "creating",
          "trigger": "clickNew",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "initializeEmptyDraft"
          ],
          "rulesApplied": []
        },
        {
          "from": "listing",
          "to": "editing",
          "trigger": "clickEdit",
          "actor": "managerOwner",
          "conditions": [
            "selectedItemIdNotEmpty"
          ],
          "actions": [
            "loadSelectedItemIntoDraft"
          ],
          "rulesApplied": []
        },
        {
          "from": "creating",
          "to": "listing",
          "trigger": "save",
          "actor": "managerOwner",
          "conditions": [
            "formValid"
          ],
          "actions": [
            "callUpsertInventoryItem",
            "clearDraft"
          ],
          "rulesApplied": []
        },
        {
          "from": "creating",
          "to": "listing",
          "trigger": "cancel",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "clearDraft"
          ],
          "rulesApplied": []
        },
        {
          "from": "editing",
          "to": "listing",
          "trigger": "save",
          "actor": "managerOwner",
          "conditions": [
            "formValid"
          ],
          "actions": [
            "callUpsertInventoryItem",
            "clearDraft"
          ],
          "rulesApplied": []
        },
        {
          "from": "editing",
          "to": "listing",
          "trigger": "deactivate",
          "actor": "managerOwner",
          "conditions": [
            "itemStatusIsActive"
          ],
          "actions": [
            "callUpsertInventoryItemWithStatusInactive",
            "clearDraft"
          ],
          "rulesApplied": []
        },
        {
          "from": "editing",
          "to": "listing",
          "trigger": "cancel",
          "actor": "managerOwner",
          "conditions": [],
          "actions": [
            "clearDraft"
          ],
          "rulesApplied": []
        }
      ],
      "userActions": [
        "addInventoryItem",
        "editInventoryItem",
        "saveInventoryItem",
        "cancelInventoryItemForm",
        "deactivateInventoryItem",
        "filterInventoryItems",
        "searchInventoryItems"
      ],
      "rulesApplied": [
        "inventoryCannotGoNegativeByDefault"
      ],
      "persistenceRefs": [],
      "usecaseRefs": [
        "upsertInventoryItem",
        "listInventoryItems"
      ],
      "metricRefs": [],
      "relatedPages": [
        "inventoryItemEditor",
        "inventoryManagement",
        "recipeEditor"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "requiredEntities": [
        "InventoryItem"
      ],
      "moduleRefs": [
        "cafeFlow"
      ],
      "workflowScope": "singleModule",
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "cafeFlow",
          "entity": "InventoryItem"
        }
      ],
      "writesArtifacts": [],
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "implementationSuggestions": [
        {
          "suggestionId": "unitOfMeasureStandard",
          "title": "Padronização de unidade de medida",
          "description": "Garantir que receitas e ajustes de estoque usem unidades compatíveis para cálculo correto de saldo e baixa automática.",
          "priority": "now",
          "tradeoff": "Requer definição de catálogo de unidades ou validação por enum, aumentando rigidez mas evitando erros de conversão."
        },
        {
          "suggestionId": "noTaskNeeded",
          "title": "Fluxo self-service sem tarefa",
          "description": "Como o ator é o próprio gerente/dono realizando CRUD de ingredientes, não há necessidade de criar tarefas ou atribuições; o workflow opera em uiState com feedback imediato.",
          "priority": "now",
          "tradeoff": "Elimina overhead de fila de tarefas, mas perde rastreamento formal de pendências para aprovações (não necessário neste domínio)."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/inventoryItemManagement.defs.ts",
      "exportName": "inventoryItemManagementDef",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryItemManagementDef;
