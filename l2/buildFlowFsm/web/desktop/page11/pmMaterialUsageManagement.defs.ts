/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/pmMaterialUsageManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "pmMaterialUsageManagement",
  "pageName": "Material Usage Corrections",
  "baseClassName": "BuildFlowFsmPmMaterialUsageManagementBase",
  "actor": "projectManager",
  "purpose": "Executar Material Usage Corrections.",
  "capabilities": [
    "voidMaterialUsage"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "pmMaterialUsageManagement",
    "workspaceKind": "operation",
    "actor": "projectManager",
    "entity": "MaterialUsage",
    "owners": [
      {
        "kind": "operation",
        "id": "voidMaterialUsage",
        "defPath": "_102048_/l4/operations/voidMaterialUsage.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "voidMaterialUsage",
          "commandName": "voidMaterialUsage",
          "steps": [
            "The project manager selects a posted material usage record from the project's material tracking list.",
            "The system loads the record and confirms its current status is 'posted'.",
            "The project manager enters a void reason and confirms the void action.",
            "The system sets the record status to 'voided', records the voidedAt timestamp and the void reason, preserving the original project linkage for audit purposes."
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_material_usage_corrections",
      "type": "section",
      "sectionName": "sec_material_usage_corrections",
      "titleKey": "sec.material.usage.corrections.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org_void_material_usage",
          "type": "organism",
          "organismName": "VoidMaterialUsage",
          "titleKey": "org.void.material.usage.title",
          "purpose": "Void a material usage record",
          "userActions": [
            "voidMaterialUsage"
          ],
          "requiredEntities": [
            "MaterialUsage",
            "Project"
          ],
          "readsFields": [
            "materialUsageId",
            "materialName",
            "quantity",
            "unit",
            "unitCost",
            "totalCost",
            "usageDate",
            "status",
            "projectId"
          ],
          "writesFields": [
            "status",
            "voidedAt",
            "voidReason"
          ],
          "rulesApplied": [
            "materialUsageRequiresProject"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_command_form",
              "intent": "commandForm",
              "stateKey": "ui.pmMaterialUsageManagement.action.voidMaterialUsage.status",
              "submitAction": "voidMaterialUsage",
              "order": 10
            },
            {
              "id": "intent_summary",
              "intent": "summary",
              "stateKey": "ui.pmMaterialUsageManagement.status",
              "order": 20
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "single_form_page11",
    "type": "page",
    "sections": [
      {
        "id": "sec_material_usage_corrections",
        "type": "section",
        "sectionName": "sec_material_usage_corrections",
        "titleKey": "sec.material.usage.corrections.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org_void_material_usage",
            "type": "organism",
            "organismName": "VoidMaterialUsage",
            "titleKey": "org.void.material.usage.title",
            "purpose": "Void a material usage record",
            "userActions": [
              "voidMaterialUsage"
            ],
            "requiredEntities": [
              "MaterialUsage",
              "Project"
            ],
            "readsFields": [
              "materialUsageId",
              "materialName",
              "quantity",
              "unit",
              "unitCost",
              "totalCost",
              "usageDate",
              "status",
              "projectId"
            ],
            "writesFields": [
              "status",
              "voidedAt",
              "voidReason"
            ],
            "rulesApplied": [
              "materialUsageRequiresProject"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_command_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.form.title",
                "submitAction": "voidMaterialUsage",
                "emptyKey": "empty.noSelection",
                "stateKey": "ui.pmMaterialUsageManagement.action.voidMaterialUsage.status",
                "fields": [
                  {
                    "id": "fld_material_usage_id",
                    "field": "materialUsageId",
                    "labelKey": "field.materialUsageId",
                    "order": 10,
                    "required": true,
                    "inputType": "selection",
                    "source": "selectedEntity",
                    "stateKey": "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId"
                  },
                  {
                    "id": "fld_material_name",
                    "field": "materialName",
                    "labelKey": "field.materialName",
                    "order": 20,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_material_name"
                  },
                  {
                    "id": "fld_quantity",
                    "field": "quantity",
                    "labelKey": "field.quantity",
                    "order": 30,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_quantity"
                  },
                  {
                    "id": "fld_unit",
                    "field": "unit",
                    "labelKey": "field.unit",
                    "order": 40,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_unit"
                  },
                  {
                    "id": "fld_unit_cost",
                    "field": "unitCost",
                    "labelKey": "field.unitCost",
                    "order": 50,
                    "required": false,
                    "inputType": "readonly",
                    "format": "money",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_unit_cost"
                  },
                  {
                    "id": "fld_total_cost",
                    "field": "totalCost",
                    "labelKey": "field.totalCost",
                    "order": 60,
                    "required": false,
                    "inputType": "readonly",
                    "format": "money",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_total_cost"
                  },
                  {
                    "id": "fld_usage_date",
                    "field": "usageDate",
                    "labelKey": "field.usageDate",
                    "order": 70,
                    "required": false,
                    "inputType": "readonly",
                    "format": "date",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_usage_date"
                  },
                  {
                    "id": "fld_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 80,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_status"
                  },
                  {
                    "id": "fld_void_reason",
                    "field": "voidReason",
                    "labelKey": "field.voidReason",
                    "order": 90,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_void_material_usage",
                    "action": "voidMaterialUsage",
                    "labelKey": "action.voidMaterialUsage",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "voidMaterialUsage"
                  }
                ]
              },
              {
                "id": "intent_summary",
                "intent": "summary",
                "order": 20,
                "titleKey": "intent.summary.title",
                "emptyKey": "empty.noResult",
                "stateKey": "ui.pmMaterialUsageManagement.status",
                "fields": [
                  {
                    "id": "fld_summary_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 10,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_summary_status"
                  },
                  {
                    "id": "fld_summary_voided_at",
                    "field": "voidedAt",
                    "labelKey": "field.voidedAt",
                    "order": 20,
                    "required": false,
                    "inputType": "readonly",
                    "format": "datetime",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.layout.fld_summary_voided_at"
                  },
                  {
                    "id": "fld_summary_void_reason",
                    "field": "voidReason",
                    "labelKey": "field.voidReason",
                    "order": 30,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind_void_material_usage",
      "source": "buildFlowFsm.voidMaterialUsage.voidMaterialUsage",
      "entity": "MaterialUsage",
      "command": "voidMaterialUsage",
      "description": "Voids a posted material usage record by setting status to voided, recording voidedAt timestamp and void reason.",
      "stateKey": "ui.pmMaterialUsageManagement.output.voidMaterialUsage",
      "inputStateKeys": [
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId",
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "pmMaterialUsageManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/pmMaterialUsageManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/pmMaterialUsageManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "pmMaterialUsageManagement__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "Dashboard-first, data-dense, status-driven UI with timeline views, cost tracking panels, and mobile-friendly field logging"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
