/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientStatusReportView.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "clientStatusReportView",
  "pageName": "Project Status Report",
  "baseClassName": "BuildFlowFsmClientStatusReportViewBase",
  "actor": "client",
  "purpose": "Executar Project Status Report.",
  "capabilities": [
    "viewStatusReport"
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
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_status_report",
      "type": "section",
      "sectionName": "Project Status Report",
      "titleKey": "section.report.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org_report_summary",
          "type": "organism",
          "organismName": "ReportSummary",
          "titleKey": "org.report.summary.title",
          "purpose": "Display report metadata and key information as a summary panel",
          "userActions": [
            "viewStatusReport"
          ],
          "requiredEntities": [
            "StatusReport",
            "Project"
          ],
          "readsFields": [
            "statusReportId",
            "status",
            "reportPeriodStart",
            "reportPeriodEnd",
            "generatedAt",
            "sharedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "clientSeesPmStatusReport"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_load_report",
              "intent": "queryList",
              "stateKey": "ui.clientStatusReportView.data.viewStatusReport",
              "order": 10
            }
          ]
        },
        {
          "id": "org_report_detail",
          "type": "organism",
          "organismName": "ReportDetail",
          "titleKey": "org.report.detail.title",
          "purpose": "Display the full AI-generated report content and sharing details",
          "userActions": [
            "viewStatusReport"
          ],
          "requiredEntities": [
            "StatusReport",
            "Project"
          ],
          "readsFields": [
            "content",
            "projectId",
            "llmModelUsed",
            "shareLink",
            "sharedWithEmail"
          ],
          "writesFields": [],
          "rulesApplied": [
            "clientSeesPmStatusReport"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent_report_content",
              "intent": "summary",
              "stateKey": "ui.clientStatusReportView.data.viewStatusReport",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "split_detail_page11",
    "type": "page",
    "sections": [
      {
        "id": "sec_status_report",
        "type": "section",
        "sectionName": "Project Status Report",
        "titleKey": "section.report.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org_report_summary",
            "type": "organism",
            "organismName": "ReportSummary",
            "titleKey": "org.report.summary.title",
            "purpose": "Display report metadata and key information as a summary panel",
            "userActions": [
              "viewStatusReport"
            ],
            "requiredEntities": [
              "StatusReport",
              "Project"
            ],
            "readsFields": [
              "statusReportId",
              "status",
              "reportPeriodStart",
              "reportPeriodEnd",
              "generatedAt",
              "sharedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "clientSeesPmStatusReport"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_load_report",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intention.reportInfo.title",
                "source": "viewStatusReport",
                "binding": "ui.clientStatusReportView.data.viewStatusReport",
                "emptyKey": "empty.report",
                "displayHint": "summaryPanel",
                "stateKey": "ui.clientStatusReportView.data.viewStatusReport",
                "fields": [
                  {
                    "id": "fld_statusReportId_input",
                    "field": "statusReportId",
                    "labelKey": "field.statusReportId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "routeParam",
                    "stateKey": "ui.clientStatusReportView.input.viewStatusReport.statusReportId"
                  }
                ],
                "columns": [
                  {
                    "id": "col_status",
                    "field": "status",
                    "labelKey": "field.status.label",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "col_reportPeriodStart",
                    "field": "reportPeriodStart",
                    "labelKey": "field.reportPeriodStart.label",
                    "order": 20,
                    "required": false,
                    "inputType": "date",
                    "format": "date",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "col_reportPeriodEnd",
                    "field": "reportPeriodEnd",
                    "labelKey": "field.reportPeriodEnd.label",
                    "order": 30,
                    "required": false,
                    "inputType": "date",
                    "format": "date",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "col_generatedAt",
                    "field": "generatedAt",
                    "labelKey": "field.generatedAt.label",
                    "order": 40,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "col_sharedAt",
                    "field": "sharedAt",
                    "labelKey": "field.sharedAt.label",
                    "order": 50,
                    "required": false,
                    "inputType": "datetime",
                    "format": "datetime",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org_report_detail",
            "type": "organism",
            "organismName": "ReportDetail",
            "titleKey": "org.report.detail.title",
            "purpose": "Display the full AI-generated report content and sharing details",
            "userActions": [
              "viewStatusReport"
            ],
            "requiredEntities": [
              "StatusReport",
              "Project"
            ],
            "readsFields": [
              "content",
              "projectId",
              "llmModelUsed",
              "shareLink",
              "sharedWithEmail"
            ],
            "writesFields": [],
            "rulesApplied": [
              "clientSeesPmStatusReport"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent_report_content",
                "intent": "summary",
                "order": 10,
                "titleKey": "intention.reportContent.title",
                "source": "viewStatusReport",
                "binding": "ui.clientStatusReportView.data.viewStatusReport",
                "emptyKey": "empty.report",
                "displayHint": "detailPanel",
                "stateKey": "ui.clientStatusReportView.data.viewStatusReport",
                "fields": [
                  {
                    "id": "fld_content",
                    "field": "content",
                    "labelKey": "field.content.label",
                    "order": 10,
                    "required": true,
                    "inputType": "textarea",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "fld_projectId",
                    "field": "projectId",
                    "labelKey": "field.projectId.label",
                    "order": 20,
                    "required": true,
                    "inputType": "text",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "fld_llmModelUsed",
                    "field": "llmModelUsed",
                    "labelKey": "field.llmModelUsed.label",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "fld_shareLink",
                    "field": "shareLink",
                    "labelKey": "field.shareLink.label",
                    "order": 40,
                    "required": false,
                    "inputType": "text",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
                  },
                  {
                    "id": "fld_sharedWithEmail",
                    "field": "sharedWithEmail",
                    "labelKey": "field.sharedWithEmail.label",
                    "order": 50,
                    "required": false,
                    "inputType": "email",
                    "source": "viewStatusReport",
                    "stateKey": "ui.clientStatusReportView.data.viewStatusReport"
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
      "id": "loadStatusReport",
      "source": "buildFlowFsm.viewStatusReport.viewStatusReport",
      "entity": "StatusReport",
      "command": "viewStatusReport",
      "description": "Loads the single StatusReport record identified by the route parameter for client viewing.",
      "stateKey": "ui.clientStatusReportView.data.viewStatusReport",
      "inputStateKeys": [
        "ui.clientStatusReportView.input.viewStatusReport.statusReportId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "clientStatusReportView__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientStatusReportView.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/clientStatusReportView.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "clientStatusReportView__l2_shared"
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
