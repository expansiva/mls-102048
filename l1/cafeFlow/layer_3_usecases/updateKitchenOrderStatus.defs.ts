/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/updateKitchenOrderStatus.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "updateKitchenOrderStatus",
  "title": "Atualizar status do pedido (cozinha)",
  "purpose": "Cozinha atualiza status do pedido (sentToKitchen→inPreparation→ready) de forma controlada.",
  "actor": "cook",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "Order"
  ],
  "outputEntities": [
    "Order"
  ],
  "readsTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderStatusTransitionsControlled"
  ],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "order"
  ],
  "commands": [
    {
      "commandId": "updateKitchenOrderStatus",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        },
        {
          "name": "targetStatus",
          "type": "string",
          "required": true
        },
        {
          "name": "cookId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "orderId",
          "type": "string"
        },
        {
          "name": "previousStatus",
          "type": "string"
        },
        {
          "name": "currentStatus",
          "type": "string"
        },
        {
          "name": "updatedAt",
          "type": "date"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "O identificador do cozinheiro (cookId) deve ser recebido explicitamente no comando ou obtido do contexto de autenticação/autorização?",
    "O comando deve receber o status de destino (targetStatus) ou apenas avançar automaticamente para o próximo status válido na sequência (sentToKitchen → inPreparation → ready)?",
    "O retorno deve incluir o aggregate completo do pedido (OrderAggregate) ou apenas os campos essenciais de status atualizados?"
  ]
} as const;

export default useCase;
