/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/createOrderDraft.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "createOrderDraft",
  "title": "Criar pedido (rascunho)",
  "purpose": "Criar um pedido draft para mesa ou takeout, vinculado ao turno aberto, com itens iniciais e preços snapshot.",
  "actor": "attendantCashier",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "DailyShift",
    "DiningTable"
  ],
  "outputEntities": [
    "Order"
  ],
  "readsTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "dining_table",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "menu_category",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderTypeMustBeTableOrTakeout",
    "shiftMustBeOpenToCreateOrders",
    "menuPriceIsSnapshottedOnOrderItem"
  ],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "menuItem",
    "order"
  ],
  "commands": [
    {
      "commandId": "createOrderDraft",
      "input": [
        {
          "name": "orderType",
          "type": "string",
          "required": true
        },
        {
          "name": "tableId",
          "type": "string",
          "required": false
        },
        {
          "name": "shiftId",
          "type": "string",
          "required": true
        },
        {
          "name": "items",
          "type": "OrderDraftItem[]",
          "required": false
        },
        {
          "name": "attendantId",
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
          "name": "orderType",
          "type": "string"
        },
        {
          "name": "tableId",
          "type": "string"
        },
        {
          "name": "shiftId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "string"
        },
        {
          "name": "totalAmount",
          "type": "number"
        },
        {
          "name": "createdAt",
          "type": "date"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "O shiftId deve ser informado explicitamente como input ou inferido automaticamente pelo usecase a partir do turno aberto atual?",
    "A criação do pedido permite rascunho sem itens iniciais ou os itens são obrigatórios neste comando?",
    "Para pedidos do tipo 'table', a vinculação com tableId é obrigatória neste comando ou pode ser realizada em um passo posterior?"
  ]
} as const;

export default useCase;
