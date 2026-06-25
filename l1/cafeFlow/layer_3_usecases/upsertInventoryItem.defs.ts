/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/upsertInventoryItem.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "upsertInventoryItem",
  "title": "Criar/editar/desativar ingrediente (MDM)",
  "purpose": "Manter cadastro de itens de estoque (ingredientes/insumos) via MDM.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "MenuAndRecipeCatalog"
  ],
  "outputEntities": [
    "MenuAndRecipeCatalog"
  ],
  "readsTables": [
    {
      "tableName": "inventory_item",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "inventory_item",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [],
  "entityRefs": [
    "inventoryTransaction",
    "menuItem"
  ],
  "commands": [
    {
      "commandId": "upsertInventoryItem",
      "input": [
        {
          "name": "inventoryItemId",
          "type": "string",
          "required": false
        },
        {
          "name": "name",
          "type": "string",
          "required": true
        },
        {
          "name": "unitOfMeasure",
          "type": "string",
          "required": true
        },
        {
          "name": "sku",
          "type": "string",
          "required": false
        },
        {
          "name": "categoryId",
          "type": "string",
          "required": false
        },
        {
          "name": "costReference",
          "type": "number",
          "required": false
        },
        {
          "name": "isActive",
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
          "name": "sku",
          "type": "string"
        },
        {
          "name": "categoryId",
          "type": "string"
        },
        {
          "name": "costReference",
          "type": "number"
        },
        {
          "name": "isActive",
          "type": "boolean"
        },
        {
          "name": "updatedAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "deactivateInventoryItem",
      "input": [
        {
          "name": "inventoryItemId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "inventoryItemId",
          "type": "string"
        },
        {
          "name": "isActive",
          "type": "boolean"
        },
        {
          "name": "deactivatedAt",
          "type": "date"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "A desativação do ingrediente é lógica (soft delete via flag isActive) ou física (remoção do registro)?",
    "Há campos obrigatórios adicionais na tabela inventory_item que devem constar no input (ex: tenantId, restaurantId, externalMdmId, barcode, conversionFactor)?",
    "O comando upsert deve permitir reativação (isActive=true) ou apenas a criação/edição de dados cadastrais, ficando a desativação/reativação exclusiva para o comando deactivate?"
  ]
} as const;

export default useCase;
