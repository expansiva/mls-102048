/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/statusReportLifecycle.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "statusReportLifecycle",
  "pageName": "AI Status Report",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmStatusReportLifecycleBase",
  "routePattern": "/buildFlowFsm/statusReportLifecycle/:projectId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:statusReportLifecycle",
    "operation:generateStatusReport",
    "operation:shareStatusReport"
  ],
  "operationIds": [
    "generateStatusReport",
    "shareStatusReport"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "statusReportLifecycle",
    "workspaceKind": "workflow",
    "workflowId": "statusReportLifecycle",
    "actor": "projectManager",
    "entity": "StatusReport",
    "owners": [
      {
        "kind": "workflow",
        "id": "statusReportLifecycle",
        "defPath": "_102048_/l4/workflows/statusReportLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "generateStatusReport",
        "defPath": "_102048_/l4/operations/generateStatusReport.defs.ts"
      },
      {
        "kind": "operation",
        "id": "shareStatusReport",
        "defPath": "_102048_/l4/operations/shareStatusReport.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "The project manager clicks 'Generate Status Report' on the project detail page so the system compiles tasks, time logs, and material usage into a professional summary using the LLM proxy.",
        "The project manager reviews the generated report to make sure it accurately reflects project progress, costs, and any delay risks before sharing it with the client.",
        "The project manager shares the status report with the client via a shareable link or email so the client has a clear, professional view of where the project stands."
      ],
      "operations": [
        {
          "operationId": "generateStatusReport",
          "commandName": "generateStatusReport",
          "steps": [
            "The PM opens the project detail page and clicks 'Generate Status Report', specifying the reporting period start and end dates.",
            "The backend reads WorkTask, TimeLog, and MaterialUsage records for the project within the specified period.",
            "The platform LLM proxy compiles the data into a plain-language status report covering progress, costs, and delay risks.",
            "A new StatusReport record is created with status 'generated', the AI-produced content, and the reporting period dates."
          ]
        },
        {
          "operationId": "shareStatusReport",
          "commandName": "shareStatusReport",
          "steps": [
            "The PM selects a status report with status 'generated' from the project detail page.",
            "The PM enters the client email address to receive the report.",
            "The system generates a shareable link and records the share timestamp.",
            "The system transitions the report status from 'generated' to 'shared' and notifies the client via the provided email."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/statusReportLifecycle.defs.ts",
    "layoutId": "wizard_flow_page11"
  },
  "states": [
    {
      "stateKey": "ui.statusReportLifecycle.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.action.generateStatusReport.status",
      "name": "generateStatusReportState",
      "kind": "actionStatus",
      "actionRef": "generateStatusReport",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.statusReportLifecycle.input.generateStatusReport.projectId",
      "name": "generateStatusReportProjectId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "generateStatusReport",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodStart",
      "name": "generateStatusReportReportPeriodStart",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "generateStatusReport",
        "direction": "input",
        "field": "reportPeriodStart"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodEnd",
      "name": "generateStatusReportReportPeriodEnd",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "generateStatusReport",
        "direction": "input",
        "field": "reportPeriodEnd"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.action.shareStatusReport.status",
      "name": "shareStatusReportState",
      "kind": "actionStatus",
      "actionRef": "shareStatusReport",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.statusReportLifecycle.input.shareStatusReport.statusReportId",
      "name": "shareStatusReportStatusReportId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "shareStatusReport",
        "direction": "input",
        "field": "statusReportId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.input.shareStatusReport.sharedWithEmail",
      "name": "shareStatusReportSharedWithEmail",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "shareStatusReport",
        "direction": "input",
        "field": "sharedWithEmail"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.output.generateStatusReport",
      "name": "OutputGenerateStatusReport",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.statusReportLifecycle.output.shareStatusReport",
      "name": "OutputShareStatusReport",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.statusReportLifecycle.layout.fld_wf_status",
      "name": "LayoutFldWfStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.layout.fld_result_status",
      "name": "LayoutFldResultStatus",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.layout.fld_result_sharedAt",
      "name": "LayoutFldResultSharedAt",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.statusReportLifecycle.layout.fld_result_shareLink",
      "name": "LayoutFldResultShareLink",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "generateStatusReport",
      "kind": "command",
      "commandRef": "generateStatusReport",
      "routeKey": "buildFlowFsm.statusReportLifecycle.generateStatusReport",
      "purpose": "Generate AI status report",
      "methodName": "generateStatusReport",
      "handlerName": "handleGenerateStatusReportClick",
      "inputStateKeys": [
        "ui.statusReportLifecycle.input.generateStatusReport.projectId",
        "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodStart",
        "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodEnd"
      ],
      "routeParamInputStateKeys": [
        "ui.statusReportLifecycle.input.generateStatusReport.projectId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.statusReportLifecycle.output.generateStatusReport"
      ],
      "statusStateKey": "ui.statusReportLifecycle.action.generateStatusReport.status"
    },
    {
      "actionId": "shareStatusReport",
      "kind": "command",
      "commandRef": "shareStatusReport",
      "routeKey": "buildFlowFsm.statusReportLifecycle.shareStatusReport",
      "purpose": "Share status report with client",
      "methodName": "shareStatusReport",
      "handlerName": "handleShareStatusReportClick",
      "inputStateKeys": [
        "ui.statusReportLifecycle.input.shareStatusReport.statusReportId",
        "ui.statusReportLifecycle.input.shareStatusReport.sharedWithEmail"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.statusReportLifecycle.input.shareStatusReport.statusReportId"
      ],
      "outputStateKeys": [
        "ui.statusReportLifecycle.output.shareStatusReport"
      ],
      "statusStateKey": "ui.statusReportLifecycle.action.shareStatusReport.status"
    },
    {
      "actionId": "set.generateStatusReportProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.statusReportLifecycle.input.generateStatusReport.projectId",
      "methodName": "setGenerateStatusReportProjectId",
      "handlerName": "handleGenerateStatusReportProjectIdChange"
    },
    {
      "actionId": "set.generateStatusReportReportPeriodStart",
      "kind": "stateSetter",
      "stateKey": "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodStart",
      "methodName": "setGenerateStatusReportReportPeriodStart",
      "handlerName": "handleGenerateStatusReportReportPeriodStartChange"
    },
    {
      "actionId": "set.generateStatusReportReportPeriodEnd",
      "kind": "stateSetter",
      "stateKey": "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodEnd",
      "methodName": "setGenerateStatusReportReportPeriodEnd",
      "handlerName": "handleGenerateStatusReportReportPeriodEndChange"
    },
    {
      "actionId": "set.shareStatusReportStatusReportId",
      "kind": "stateSetter",
      "stateKey": "ui.statusReportLifecycle.input.shareStatusReport.statusReportId",
      "methodName": "setShareStatusReportStatusReportId",
      "handlerName": "handleShareStatusReportStatusReportIdChange"
    },
    {
      "actionId": "set.shareStatusReportSharedWithEmail",
      "kind": "stateSetter",
      "stateKey": "ui.statusReportLifecycle.input.shareStatusReport.sharedWithEmail",
      "methodName": "setShareStatusReportSharedWithEmail",
      "handlerName": "handleShareStatusReportSharedWithEmailChange"
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
    "page.title": "AI Status Report",
    "section.generate.title": "Generate Status Report",
    "section.review.title": "Review Generated Report",
    "section.share.title": "Share Status Report",
    "intention.generate.title": "Generate Report",
    "intention.workflowStatus.title": "Report Status",
    "intention.review.title": "Report Preview",
    "intention.share.title": "Share with Client",
    "intention.shareResult.title": "Share Confirmation",
    "field.projectId.label": "Project",
    "field.reportPeriodStart.label": "Reporting Period Start",
    "field.reportPeriodEnd.label": "Reporting Period End",
    "field.statusReportId.label": "Status Report",
    "field.sharedWithEmail.label": "Client Email",
    "field.status.label": "Status",
    "field.content.label": "Report Content",
    "field.generatedAt.label": "Generated At",
    "field.llmModelUsed.label": "AI Model",
    "field.createdAt.label": "Created At",
    "field.sharedAt.label": "Shared At",
    "field.shareLink.label": "Share Link",
    "action.generateStatusReport.label": "Generate Status Report",
    "action.shareStatusReport.label": "Share with Client",
    "empty.review": "No report generated yet. Complete the generate step above to see the AI-generated report here.",
    "empty.shareResult": "The report has not been shared yet. Enter the client email and click Share with Client.",
    "org.generate.title": "Generate AI status report",
    "org.review.title": "Review the AI generated status report before sharing with the client",
    "org.share.title": "Share status report with client via email"
  },
  "automation": {
    "statePrefix": "ui.statusReportLifecycle",
    "stateKeys": [
      "ui.statusReportLifecycle.status",
      "ui.statusReportLifecycle.action.generateStatusReport.status",
      "ui.statusReportLifecycle.input.generateStatusReport.projectId",
      "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodStart",
      "ui.statusReportLifecycle.input.generateStatusReport.reportPeriodEnd",
      "ui.statusReportLifecycle.action.shareStatusReport.status",
      "ui.statusReportLifecycle.input.shareStatusReport.statusReportId",
      "ui.statusReportLifecycle.input.shareStatusReport.sharedWithEmail",
      "ui.statusReportLifecycle.output.generateStatusReport",
      "ui.statusReportLifecycle.output.shareStatusReport",
      "ui.statusReportLifecycle.layout.fld_wf_status",
      "ui.statusReportLifecycle.layout.fld_result_status",
      "ui.statusReportLifecycle.layout.fld_result_sharedAt",
      "ui.statusReportLifecycle.layout.fld_result_shareLink"
    ],
    "actionIds": [
      "generateStatusReport",
      "shareStatusReport",
      "set.generateStatusReportProjectId",
      "set.generateStatusReportReportPeriodStart",
      "set.generateStatusReportReportPeriodEnd",
      "set.shareStatusReportStatusReportId",
      "set.shareStatusReportSharedWithEmail"
    ]
  }
};

export const pipeline = [
  {
    "id": "statusReportLifecycle__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/statusReportLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/statusReportLifecycle.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "statusReportLifecycle__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
