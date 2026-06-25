/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/addOrUpdateOrderItems.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "addOrUpdateOrderItems",
  "title": "Adicionar/editar itens do pedido",
  "purpose": "Alterar itens e quantidades de um pedido em draft, mantendo snapshot de preço e consistência do total.",
  "actor": "attendantCashier",
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
    },
    {
      "tableName": "menu_item",
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
    "menuPriceIsSnapshottedOnOrderItem",
    "orderStatusTransitionsControlled"
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
      "commandId": "addOrderItem",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        },
        {
          "name": "menuItemId",
          "type": "string",
          "required": true
        },
        {
          "name": "quantity",
          "type": "number",
          "required": true
        },
        {
          "name": "notes",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "orderItemId",
          "type": "string"
        },
        {
          "name": "orderId",
          "type": "string"
        },
        {
          "name": "totalAmount",
          "type": "number"
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    },
    {
      "commandId": "updateOrderItem",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        },
        {
          "name": "orderItemId",
          "type": "string",
          "required": true
        },
        {
          "name": "quantity",
          "type": "number",
          "required": true
        },
        {
          "name": "notes",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "orderId",
          "type": "string"
        },
        {
          "name": "totalAmount",
          "type": "number"
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    },
    {
      "commandId": "removeOrderItem",
      "input": [
        {
          "name": "orderId",
          "type": "string",
          "required": true
        },
        {
          "name": "orderItemId",
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
          "name": "totalAmount",
          "type": "number"
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "A remoção de itens deve ser tratada neste mesmo usecase (addOrUpdateOrderItems) ou em um usecase separado?",
    "O preço snapshotado é calculado pelo usecase a partir do menu_item (MDM) ou pode ser enviado pelo BFF?",
    "O updateOrderItem deve permitir trocar o menuItem vinculado ou apenas quantidade e observações?"
  ]
} as const;

export default useCase;
