/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "pmMaterialUsageManagement",
  "pageName": "Material Usage Corrections",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmPmMaterialUsageManagementBase",
  "routePattern": "/buildFlowFsm/pmMaterialUsageManagement",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:voidMaterialUsage"
  ],
  "operationIds": [
    "voidMaterialUsage"
  ],
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
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/pmMaterialUsageManagement.defs.ts",
    "layoutId": "single_form_page11"
  },
  "states": [
    {
      "stateKey": "ui.pmMaterialUsageManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.action.voidMaterialUsage.status",
      "name": "voidMaterialUsageState",
      "kind": "actionStatus",
      "actionRef": "voidMaterialUsage",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId",
      "name": "voidMaterialUsageMaterialUsageId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "voidMaterialUsage",
        "direction": "input",
        "field": "materialUsageId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason",
      "name": "voidMaterialUsageVoidReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "voidMaterialUsage",
        "direction": "input",
        "field": "voidReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.output.voidMaterialUsage",
      "name": "OutputVoidMaterialUsage",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_material_name",
      "name": "LayoutFldMaterialName",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_quantity",
      "name": "LayoutFldQuantity",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_unit",
      "name": "LayoutFldUnit",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_unit_cost",
      "name": "LayoutFldUnitCost",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_total_cost",
      "name": "LayoutFldTotalCost",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_usage_date",
      "name": "LayoutFldUsageDate",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_status",
      "name": "LayoutFldStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_summary_status",
      "name": "LayoutFldSummaryStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmMaterialUsageManagement.layout.fld_summary_voided_at",
      "name": "LayoutFldSummaryVoidedAt",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "voidMaterialUsage",
      "kind": "command",
      "commandRef": "voidMaterialUsage",
      "routeKey": "buildFlowFsm.voidMaterialUsage.voidMaterialUsage",
      "purpose": "Void a material usage record",
      "methodName": "voidMaterialUsage",
      "handlerName": "handleVoidMaterialUsageClick",
      "inputStateKeys": [
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId",
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId"
      ],
      "outputStateKeys": [
        "ui.pmMaterialUsageManagement.output.voidMaterialUsage"
      ],
      "statusStateKey": "ui.pmMaterialUsageManagement.action.voidMaterialUsage.status"
    },
    {
      "actionId": "set.voidMaterialUsageMaterialUsageId",
      "kind": "stateSetter",
      "stateKey": "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId",
      "methodName": "setVoidMaterialUsageMaterialUsageId",
      "handlerName": "handleVoidMaterialUsageMaterialUsageIdChange"
    },
    {
      "actionId": "set.voidMaterialUsageVoidReason",
      "kind": "stateSetter",
      "stateKey": "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason",
      "methodName": "setVoidMaterialUsageVoidReason",
      "handlerName": "handleVoidMaterialUsageVoidReasonChange"
    }
  ],
  "initialLoads": [],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "en",
    "activeLocales": [
      "en"
    ]
  },
  "i18n": {
    "page.title": "Material Usage Corrections",
    "section.title": "Material Usage Corrections",
    "organism.title": "Void Material Usage",
    "intent.form.title": "Select Record and Enter Void Reason",
    "intent.summary.title": "Void Confirmation",
    "field.materialUsageId": "Material Usage Record",
    "field.voidReason": "Void Reason",
    "field.materialName": "Material Name",
    "field.quantity": "Quantity",
    "field.unit": "Unit",
    "field.unitCost": "Unit Cost",
    "field.totalCost": "Total Cost",
    "field.usageDate": "Usage Date",
    "field.status": "Status",
    "field.voidedAt": "Voided At",
    "action.voidMaterialUsage": "Void Material Usage",
    "empty.noSelection": "Select a posted material usage record to void",
    "empty.noResult": "No void result yet — submit the form to void the selected record",
    "sec.material.usage.corrections.title": "Sec material usage corrections",
    "org.void.material.usage.title": "Void a material usage record"
  },
  "automation": {
    "statePrefix": "ui.pmMaterialUsageManagement",
    "stateKeys": [
      "ui.pmMaterialUsageManagement.status",
      "ui.pmMaterialUsageManagement.action.voidMaterialUsage.status",
      "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId",
      "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason",
      "ui.pmMaterialUsageManagement.output.voidMaterialUsage",
      "ui.pmMaterialUsageManagement.layout.fld_material_name",
      "ui.pmMaterialUsageManagement.layout.fld_quantity",
      "ui.pmMaterialUsageManagement.layout.fld_unit",
      "ui.pmMaterialUsageManagement.layout.fld_unit_cost",
      "ui.pmMaterialUsageManagement.layout.fld_total_cost",
      "ui.pmMaterialUsageManagement.layout.fld_usage_date",
      "ui.pmMaterialUsageManagement.layout.fld_status",
      "ui.pmMaterialUsageManagement.layout.fld_summary_status",
      "ui.pmMaterialUsageManagement.layout.fld_summary_voided_at"
    ],
    "actionIds": [
      "voidMaterialUsage",
      "set.voidMaterialUsageMaterialUsageId",
      "set.voidMaterialUsageVoidReason"
    ]
  }
};

export const pipeline = [
  {
    "id": "pmMaterialUsageManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "pmMaterialUsageManagement__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
