/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/openDailyShift.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "openDailyShift",
  "title": "Abrir turno diário",
  "purpose": "Abrir um turno (open) para permitir criação de pedidos; registrar dados iniciais (ex.: caixa inicial) se aplicável.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "DailyShift"
  ],
  "outputEntities": [
    "DailyShift"
  ],
  "readsTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "shiftMustBeOpenToCreateOrders"
  ],
  "entityRefs": [
    "dailyShift",
    "order"
  ],
  "commands": [
    {
      "commandId": "openDailyShift",
      "input": [
        {
          "name": "shiftDate",
          "type": "date",
          "required": true
        },
        {
          "name": "initialCash",
          "type": "number",
          "required": false
        },
        {
          "name": "openedByUserId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "shiftId",
          "type": "string"
        },
        {
          "name": "shiftDate",
          "type": "date"
        },
        {
          "name": "status",
          "type": "string"
        },
        {
          "name": "initialCash",
          "type": "number"
        },
        {
          "name": "openedAt",
          "type": "date"
        },
        {
          "name": "openedByUserId",
          "type": "string"
        }
      ]
    }
  ]
} as const;

export default useCase;
