/// <mls fileReference="_102048_/l2/cafeFlow/shiftOpen.defs.ts" enhancement="_blank"/>

export const shiftOpenPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "shiftOpen",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 98,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "shiftOpen",
      "pageName": "Abrir turno",
      "actor": "managerOwner",
      "purpose": "Abrir o turno diário com valor inicial de caixa e liberar o POS para operar.",
      "capabilities": [
        "dailyShiftOpenClose"
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "dashboardToday",
          "trigger": "A partir do dashboard quando turno está fechado"
        },
        {
          "direction": "outbound",
          "pageId": "dashboardToday",
          "trigger": "Após abrir turno com sucesso"
        }
      ],
      "sections": [
        {
          "sectionName": "Dados da abertura",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "FormularioAberturaTurno",
              "purpose": "Coletar valor inicial de caixa e observações para abertura do turno.",
              "userActions": [
                "Informar valor inicial de caixa",
                "Adicionar observações (opcional)"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "RULE_shiftMustBeOpenToCreateOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmar abertura",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "ConfirmacaoAberturaTurno",
              "purpose": "Confirmar a abertura do turno diário.",
              "userActions": [
                "Confirmar abertura do turno"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "RULE_shiftMustBeOpenToCreateOrders"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "openDailyShift",
        "purpose": "Abrir o DailyShift do dia e registrar valor inicial.",
        "kind": "command",
        "input": [
          {
            "name": "valorInicialCaixa",
            "type": "number",
            "required": true
          },
          {
            "name": "observacoes",
            "type": "string",
            "required": false
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
          }
        ],
        "readsEntities": [
          "DailyShift"
        ],
        "writesEntities": [
          "DailyShift"
        ],
        "readsTables": [
          "daily_shift"
        ],
        "writesTables": [
          "daily_shift"
        ],
        "usecaseRefs": [
          "openDailyShift"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "RULE_shiftMustBeOpenToCreateOrders"
        ]
      }
    ]
  }
} as const;

export default shiftOpenPagePlan;
