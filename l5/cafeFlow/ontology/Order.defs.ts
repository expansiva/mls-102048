/// <mls fileReference="_102048_/l5/cafeFlow/ontology/Order.defs.ts" enhancement="_blank"/>

export const OrderEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "Order",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "Order",
      "title": "Pedido",
      "description": "Pedido para mesa ou takeout com itens, observações e status de preparo/atendimento; ligado a um turno e gera venda/métricas conforme regras.",
      "ownership": "moduleOwned",
      "kind": "core",
      "fields": [
        {
          "fieldId": "id",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do pedido"
        },
        {
          "fieldId": "orderNumber",
          "type": "string",
          "required": true,
          "description": "Número sequencial ou código de exibição do pedido"
        },
        {
          "fieldId": "type",
          "type": "string",
          "required": true,
          "enum": [
            "mesa",
            "takeout"
          ],
          "description": "Tipo do pedido: mesa (com clientes sentados) ou takeout (para viagem)"
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "enum": [
            "draft",
            "sentToKitchen",
            "inPreparation",
            "ready",
            "delivered",
            "closed",
            "cancelled"
          ],
          "description": "Status atual do pedido no fluxo de preparo e atendimento"
        },
        {
          "fieldId": "diningTableId",
          "type": "uuid",
          "required": false,
          "description": "Referência à mesa (obrigatório apenas quando tipo for 'mesa')"
        },
        {
          "fieldId": "dailyShiftId",
          "type": "uuid",
          "required": true,
          "description": "Referência ao turno diário em que o pedido foi criado"
        },
        {
          "fieldId": "customerName",
          "type": "string",
          "required": false,
          "description": "Nome do cliente (útil para takeout)"
        },
        {
          "fieldId": "notes",
          "type": "text",
          "required": false,
          "description": "Observações gerais do pedido"
        },
        {
          "fieldId": "totalAmount",
          "type": "money",
          "required": true,
          "description": "Valor total do pedido calculado a partir dos itens"
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data/hora de criação do pedido"
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data/hora da última atualização do pedido"
        },
        {
          "fieldId": "sentToKitchenAt",
          "type": "datetime",
          "required": false,
          "description": "Data/hora em que o pedido foi enviado para a cozinha"
        },
        {
          "fieldId": "readyAt",
          "type": "datetime",
          "required": false,
          "description": "Data/hora em que o pedido ficou pronto para entrega"
        },
        {
          "fieldId": "deliveredAt",
          "type": "datetime",
          "required": false,
          "description": "Data/hora da entrega do pedido ao cliente"
        },
        {
          "fieldId": "closedAt",
          "type": "datetime",
          "required": false,
          "description": "Data/hora do fechamento/pagamento do pedido"
        },
        {
          "fieldId": "cancelledAt",
          "type": "datetime",
          "required": false,
          "description": "Data/hora do cancelamento do pedido"
        },
        {
          "fieldId": "cancellationReason",
          "type": "text",
          "required": false,
          "description": "Motivo do cancelamento, quando aplicável"
        }
      ],
      "statusEnum": [
        "draft",
        "sentToKitchen",
        "inPreparation",
        "ready",
        "delivered",
        "closed",
        "cancelled"
      ],
      "lifecycleStates": [
        "draft",
        "sentToKitchen",
        "inPreparation",
        "ready",
        "delivered",
        "closed",
        "cancelled"
      ],
      "rulesApplied": [
        "orderTypeMustBeTableOrTakeout",
        "orderStatusTransitionsControlled",
        "inventoryDeductionHappensOnSaleEvent",
        "shiftMustBeOpenToCreateOrders",
        "metricsDerivedFromClosedOrders"
      ]
    }
  }
} as const;

export default OrderEntityDefinition;
