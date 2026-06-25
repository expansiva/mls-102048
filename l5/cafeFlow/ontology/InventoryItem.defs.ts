/// <mls fileReference="_102048_/l5/cafeFlow/ontology/InventoryItem.defs.ts" enhancement="_blank"/>

export const InventoryItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "InventoryItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 40,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "InventoryItem",
      "title": "Item de Estoque (Ingrediente/Insumo)",
      "description": "Ingrediente/insumo controlado por unidade (ex.: café em grãos, leite), com saldo atual e limiar de estoque baixo.",
      "ownership": "mdmOwned",
      "kind": "mdm",
      "fields": [
        {
          "fieldId": "inventoryItemId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do item de estoque"
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome do ingrediente ou insumo (ex.: café em grãos, leite integral)"
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição opcional do item de estoque"
        },
        {
          "fieldId": "unitOfMeasure",
          "type": "string",
          "required": true,
          "description": "Unidade de medida do item (ex.: kg, L, g, ml, unidade)"
        },
        {
          "fieldId": "currentBalance",
          "type": "number",
          "required": true,
          "description": "Saldo atual em estoque na unidade de medida definida"
        },
        {
          "fieldId": "lowStockThreshold",
          "type": "number",
          "required": true,
          "description": "Limiar mínimo para alerta de estoque baixo"
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Situação do item no sistema",
          "enum": [
            "active",
            "inactive"
          ]
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro"
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro"
        }
      ],
      "statusEnum": [
        "active",
        "inactive"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default InventoryItemEntityDefinition;
