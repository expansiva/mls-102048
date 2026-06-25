/// <mls fileReference="_102048_/l1/cafeFlow/layer_3_usecases/closeDailyShiftAndGenerateReport.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "closeDailyShiftAndGenerateReport",
  "title": "Fechar turno e gerar relatório",
  "purpose": "Fechar o turno, consolidar vendas do período e preparar dados para relatório e métricas do turno.",
  "actor": "managerOwner",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "DailyShift",
    "Order"
  ],
  "outputEntities": [
    "DailyShift"
  ],
  "readsTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "shift_summary_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "today_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "metricsDerivedFromClosedOrders"
  ],
  "entityRefs": [
    "aiInsightRun",
    "dailyShift",
    "inventoryTransaction",
    "order"
  ],
  "commands": [
    {
      "commandId": "closeDailyShiftAndGenerateReport",
      "input": [
        {
          "name": "shiftId",
          "type": "string",
          "required": true
        },
        {
          "name": "closedBy",
          "type": "string",
          "required": true
        },
        {
          "name": "closedAt",
          "type": "date",
          "required": false
        }
      ],
      "output": [
        {
          "name": "shiftId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "string"
        },
        {
          "name": "startedAt",
          "type": "date"
        },
        {
          "name": "closedAt",
          "type": "date"
        },
        {
          "name": "closedBy",
          "type": "string"
        },
        {
          "name": "totalOrders",
          "type": "number"
        },
        {
          "name": "totalRevenue",
          "type": "number"
        },
        {
          "name": "totalItemsSold",
          "type": "number"
        },
        {
          "name": "averageTicket",
          "type": "number"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "O campo closedAt deve ser obrigatório no input ou pode ser inferido pelo servidor quando omitido?",
    "O output deve incluir a lista de itens mais vendidos (topSellingItems) ou apenas os totais agregados?",
    "Existe algum campo adicional de justificativa/observação no fechamento do turno que deve ser capturado?"
  ]
} as const;

export default useCase;
