/// <mls fileReference="_102048_/l5/cafeFlow/ontology/OrderItem.defs.ts" enhancement="_blank"/>

export const OrderItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "OrderItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 39,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "OrderItem",
      "title": "Item do Pedido",
      "description": "Linha do pedido com item do cardápio, quantidade, preço no momento da venda e observações; base para métricas e baixa de estoque.",
      "ownership": "moduleOwned",
      "kind": "core",
      "fields": [
        {
          "fieldId": "orderItemId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do item do pedido"
        },
        {
          "fieldId": "orderId",
          "type": "uuid",
          "required": true,
          "description": "Referência ao pedido ao qual este item pertence"
        },
        {
          "fieldId": "menuItemId",
          "type": "uuid",
          "required": true,
          "description": "Referência ao item do cardápio vendido"
        },
        {
          "fieldId": "quantity",
          "type": "number",
          "required": true,
          "description": "Quantidade do item solicitada"
        },
        {
          "fieldId": "unitPrice",
          "type": "money",
          "required": true,
          "description": "Preço unitário no momento da venda (snapshot histórico)"
        },
        {
          "fieldId": "totalPrice",
          "type": "money",
          "required": true,
          "description": "Valor total da linha (quantidade × preço unitário)"
        },
        {
          "fieldId": "observations",
          "type": "text",
          "required": false,
          "description": "Observações do cliente ou do atendente sobre o item"
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
      "rulesApplied": [
        "menuPriceIsSnapshottedOnOrderItem"
      ]
    }
  }
} as const;

export default OrderItemEntityDefinition;
