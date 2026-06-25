/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/listDiningTables.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listDiningTables",
  "title": "Listar mesas",
  "purpose": "Listar mesas ativas para seleção no POS.",
  "actor": "attendantCashier",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "DiningTable"
  ],
  "outputEntities": [
    "DiningTable"
  ],
  "readsTables": [
    {
      "tableName": "dining_table",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "order"
  ],
  "commands": [
    {
      "commandId": "listDiningTables",
      "input": [
        {
          "name": "areaId",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "diningTables",
          "type": "DiningTable[]"
        }
      ]
    }
  ]
} as const;

export default useCase;
