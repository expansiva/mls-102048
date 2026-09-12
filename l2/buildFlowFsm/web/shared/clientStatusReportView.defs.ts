/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientStatusReportView",
  "pageName": "Project Status Report",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmClientStatusReportViewBase",
  "routePattern": "/buildFlowFsm/clientStatusReportView/:statusReportId?",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:viewStatusReport"
  ],
  "operationIds": [
    "viewStatusReport"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "clientStatusReportView",
    "workspaceKind": "operation",
    "actor": "client",
    "entity": "StatusReport",
    "owners": [
      {
        "kind": "operation",
        "id": "viewStatusReport",
        "defPath": "_102048_/l4/operations/viewStatusReport.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "viewStatusReport",
          "commandName": "viewStatusReport",
          "steps": [
            "The client opens the shared status report link or navigates to the report from the project view.",
            "The system loads the single StatusReport record identified by the route parameter.",
            "The client reads the report content covering tasks, time logs, and material usage for the reporting period."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientStatusReportView.defs.ts",
    "layoutId": "split_detail_page11"
  },
  "states": [
    {
      "stateKey": "ui.clientStatusReportView.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientStatusReportView.action.viewStatusReport.status",
      "name": "viewStatusReportState",
      "kind": "actionStatus",
      "actionRef": "viewStatusReport",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.clientStatusReportView.input.viewStatusReport.statusReportId",
      "name": "viewStatusReportStatusReportId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "viewStatusReport",
        "direction": "input",
        "field": "statusReportId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.clientStatusReportView.data.viewStatusReport",
      "name": "viewStatusReportData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewStatusReport",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    }
  ],
  "actions": [
    {
      "actionId": "viewStatusReport",
      "kind": "query",
      "commandRef": "viewStatusReport",
      "routeKey": "buildFlowFsm.viewStatusReport.viewStatusReport",
      "purpose": "View status report",
      "methodName": "loadViewStatusReport",
      "handlerName": "handleViewStatusReportClick",
      "inputStateKeys": [
        "ui.clientStatusReportView.input.viewStatusReport.statusReportId"
      ],
      "routeParamInputStateKeys": [
        "ui.clientStatusReportView.input.viewStatusReport.statusReportId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.clientStatusReportView.data.viewStatusReport"
      ],
      "statusStateKey": "ui.clientStatusReportView.action.viewStatusReport.status"
    },
    {
      "actionId": "set.viewStatusReportStatusReportId",
      "kind": "stateSetter",
      "stateKey": "ui.clientStatusReportView.input.viewStatusReport.statusReportId",
      "methodName": "setViewStatusReportStatusReportId",
      "handlerName": "handleViewStatusReportStatusReportIdChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewStatusReport",
      "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "en",
    "activeLocales": [
      "en"
    ]
  },
  "i18n": {
    "section.report.title": "Project Status Report",
    "intention.reportInfo.title": "Report Information",
    "intention.reportContent.title": "Report Content",
    "field.statusReportId.label": "Report ID",
    "field.projectId.label": "Project",
    "field.status.label": "Status",
    "field.content.label": "Report Content",
    "field.reportPeriodStart.label": "Period Start",
    "field.reportPeriodEnd.label": "Period End",
    "field.generatedAt.label": "Generated At",
    "field.llmModelUsed.label": "AI Model",
    "field.sharedAt.label": "Shared At",
    "field.shareLink.label": "Share Link",
    "field.sharedWithEmail.label": "Shared With",
    "empty.report": "No status report found for the provided link.",
    "status.generated": "Generated",
    "status.shared": "Shared",
    "org.report.summary.title": "Display report metadata and key information as a summary panel",
    "org.report.detail.title": "Display the full AI generated report content and sharing details"
  },
  "automation": {
    "statePrefix": "ui.clientStatusReportView",
    "stateKeys": [
      "ui.clientStatusReportView.status",
      "ui.clientStatusReportView.action.viewStatusReport.status",
      "ui.clientStatusReportView.input.viewStatusReport.statusReportId",
      "ui.clientStatusReportView.data.viewStatusReport"
    ],
    "actionIds": [
      "viewStatusReport",
      "set.viewStatusReportStatusReportId"
    ]
  }
};

export const pipeline = [
  {
    "id": "clientStatusReportView__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "clientStatusReportView__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
