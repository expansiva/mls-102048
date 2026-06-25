/// <mls fileReference="_102048_/l2/cafeFlow/shiftCloseConfirm.defs.ts" enhancement="_blank"/>

export const shiftCloseConfirmPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "shiftCloseConfirm",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 100,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "shiftCloseConfirm",
      "pageName": "Confirmar fechamento de turno",
      "actor": "managerOwner",
      "purpose": "Confirmar o fechamento do turno após revisar valores e consistência operacional.",
      "capabilities": [
        "dailyShiftOpenClose",
        "viewShiftCloseReport"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "dailyShiftLifecycle"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "shiftId",
          "type": "uuid",
          "required": true,
          "sources": [
            "previousStepResult",
            "routeParam"
          ],
          "description": "Identificador do turno a ser fechado.",
          "entityRef": "DailyShift",
          "fieldRef": "dailyShiftId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "shiftClose",
          "trigger": "Após informar contagem e revisar"
        },
        {
          "direction": "outbound",
          "pageId": "shiftCloseReport",
          "trigger": "Após confirmar fechamento com sucesso"
        },
        {
          "direction": "outbound",
          "pageId": "shiftCloseBlocked",
          "trigger": "Se o sistema bloquear no momento da confirmação"
        }
      ],
      "sections": [
        {
          "sectionName": "Revisão do fechamento",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Resumo do turno",
              "purpose": "Exibir totais consolidados e indicadores do turno para revisão final.",
              "userActions": [
                "Revisar totais",
                "Analisar itens e pedidos consolidados"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.shiftDate",
                "DailyShift.status",
                "DailyShift.openedAt",
                "DailyShift.closedAt"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "Divergências e pendências",
              "purpose": "Evidenciar inconsistências ou pendências detectadas antes do fechamento.",
              "userActions": [
                "Revisar divergências",
                "Entender pendências abertas"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Confirmação",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "Confirmar fechamento",
              "purpose": "Confirmar o fechamento definitivo do turno e gerar relatório.",
              "userActions": [
                "Confirmar fechamento",
                "Registrar observações finais"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.status"
              ],
              "writesFields": [
                "DailyShift.status",
                "DailyShift.closedAt",
                "DailyShift.closedBy",
                "DailyShift.closingNotes"
              ],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getShiftCloseReport",
        "purpose": "Carregar o resumo consolidado do turno para revisão antes do fechamento.",
        "kind": "query",
        "input": [
          {
            "name": "shiftId",
            "type": "uuid",
            "required": true
          }
        ],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "shiftDate",
            "type": "date"
          },
          {
            "name": "openedAt",
            "type": "datetime"
          },
          {
            "name": "closedAt",
            "type": "datetime"
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
          },
          {
            "name": "pendingOrdersCount",
            "type": "number"
          },
          {
            "name": "divergenceNotes",
            "type": "string"
          }
        ],
        "readsEntities": [
          "DailyShift",
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "daily_shift",
          "order",
          "order_item",
          "shift_summary_metrics"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "getShiftCloseReport"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "closeDailyShiftAndGenerateReport",
        "purpose": "Confirmar o fechamento do turno e materializar o relatório consolidado.",
        "kind": "command",
        "input": [
          {
            "name": "shiftId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "closingNotes",
            "type": "string",
            "required": false
          },
          {
            "name": "confirmNoPendingOrders",
            "type": "boolean",
            "required": true
          }
        ],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "closedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "DailyShift",
          "Order"
        ],
        "writesEntities": [
          "DailyShift"
        ],
        "readsTables": [
          "daily_shift",
          "order"
        ],
        "writesTables": [
          "daily_shift",
          "shift_summary_metrics",
          "today_sales_metrics",
          "top_selling_items_metrics"
        ],
        "usecaseRefs": [
          "closeDailyShiftAndGenerateReport"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "metricsDerivedFromClosedOrders"
        ]
      }
    ]
  }
} as const;

export default shiftCloseConfirmPagePlan;
