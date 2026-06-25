/// <mls fileReference="_102048_/l2/cafeFlow/languageSwitcher.defs.ts" enhancement="_blank"/>

export const languageSwitcherPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "languageSwitcher",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 99,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "languageSwitcher",
      "pageName": "Seletor de idioma",
      "actor": "managerOwner",
      "purpose": "Alternar idioma da interface (pt-BR/en) sem alterar dados, para operação e treinamento.",
      "capabilities": [
        "bilingualUi"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "dashboardToday",
          "trigger": "Após trocar idioma, voltar às telas principais"
        }
      ],
      "sections": [
        {
          "sectionName": "Preferência de idioma",
          "mode": "view",
          "organisms": [
            {
              "organismName": "languageChoiceSelector",
              "purpose": "Selecionar o idioma da interface entre pt-BR e en.",
              "userActions": [
                "Selecionar pt-BR",
                "Selecionar en"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "bilingualUiViaPlatformI18n"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": []
  }
} as const;

export default languageSwitcherPagePlan;
