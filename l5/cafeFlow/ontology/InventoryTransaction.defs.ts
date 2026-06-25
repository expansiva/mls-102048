/// <mls fileReference="_102048_/l5/cafeFlow/ontology/InventoryTransaction.defs.ts" enhancement="_blank"/>

export const InventoryTransactionEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "InventoryTransaction",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 39,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "InventoryTransaction",
      "title": "Movimentação de Estoque",
      "description": "Registro imutável de entradas/saídas/ajustes de ingredientes, incluindo baixa automática por venda e ajustes manuais com motivo.",
      "ownership": "moduleOwned",
      "kind": "event",
      "fields": [
        {
          "fieldId": "inventoryTransactionId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da movimentação de estoque."
        },
        {
          "fieldId": "inventoryItemId",
          "type": "uuid",
          "required": true,
          "description": "Referência ao ingrediente/insumo movimentado."
        },
        {
          "fieldId": "orderId",
          "type": "uuid",
          "required": false,
          "description": "Referência ao pedido origem em caso de baixa automática por venda."
        },
        {
          "fieldId": "transactionType",
          "type": "string",
          "required": true,
          "description": "Tipo da movimentação: entrada de estoque, baixa por venda ou ajuste manual.",
          "enum": [
            "entrada",
            "baixaVenda",
            "ajuste"
          ]
        },
        {
          "fieldId": "quantityChange",
          "type": "number",
          "required": true,
          "description": "Quantidade alterada no estoque. Positivo para entrada, negativo para baixa ou ajuste de redução."
        },
        {
          "fieldId": "reason",
          "type": "text",
          "required": false,
          "description": "Motivo do ajuste manual ou observação sobre a movimentação."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status do registro: lançado ou estornado.",
          "enum": [
            "posted",
            "reversed"
          ]
        },
        {
          "fieldId": "recordedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora em que a movimentação ocorreu efetivamente."
        },
        {
          "fieldId": "createdBy",
          "type": "string",
          "required": false,
          "description": "Identificador do usuário responsável pelo registro."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "statusEnum": [
        "posted",
        "reversed"
      ],
      "rulesApplied": [
        "inventoryDeductionHappensOnSaleEvent",
        "inventoryCannotGoNegativeByDefault"
      ]
    }
  }
} as const;

export default InventoryTransactionEntityDefinition;
