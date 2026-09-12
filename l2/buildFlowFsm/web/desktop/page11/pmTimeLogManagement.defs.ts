/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/pmTimeLogManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "pmTimeLogManagement",
  "pageName": "Time Log Corrections",
  "baseClassName": "BuildFlowFsmPmTimeLogManagementBase",
  "actor": "projectManager",
  "purpose": "Executar Time Log Corrections.",
  "capabilities": [
    "voidTimeLog"
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
    "workspaceId": "pmTimeLogManagement",
    "workspaceKind": "operation",
    "actor": "projectManager",
    "entity": "TimeLog",
    "owners": [
      {
        "kind": "operation",
        "id": "voidTimeLog",
        "defPath": "_102048_/l4/operations/voidTimeLog.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "voidTimeLog",
          "commandName": "voidTimeLog",
          "steps": [
            "The project manager selects a posted time log entry from the task's time log list.",
            "The system loads the time log and confirms its current status is 'posted'.",
            "The project manager enters a void reason and confirms the void action.",
            "The system sets the time log status to 'voided', records the voidedAt timestamp and the void reason, leaving all original fields (task, worker, hours, rate) intact for audit."
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_time_log_corrections",
      "type": "section",
      "sectionName": "sec_time_log_corrections",
      "titleKey": "sec.time.log.corrections.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org_void_time_log",
          "type": "organism",
          "organismName": "VoidTimeLog",
          "titleKey": "org.void.time.log.title",
          "purpose": "Void a posted time log entry after reviewing its details and providing a void reason",
          "userActions": [
            "voidTimeLog"
          ],
          "requiredEntities": [
            "TimeLog"
          ],
          "readsFields": [
            "timeLogId",
            "workTaskId",
            "workerId",
            "logDate",
            "hours",
            "workerRate",
            "status",
            "voidedAt",
            "voidReason",
            "createdAt"
          ],
          "writesFields": [
            "status",
            "voidedAt",
            "voidReason"
          ],
          "rulesApplied": [
            "timeLogRequiresTaskAndWorker"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_selected_log_context",
              "intent": "queryList",
              "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId",
              "order": 10
            },
            {
              "id": "intent_void_form",
              "intent": "commandForm",
              "stateKey": "ui.pmTimeLogManagement.action.voidTimeLog.status",
              "submitAction": "voidTimeLog",
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
        "id": "sec_time_log_corrections",
        "type": "section",
        "sectionName": "sec_time_log_corrections",
        "titleKey": "sec.time.log.corrections.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org_void_time_log",
            "type": "organism",
            "organismName": "VoidTimeLog",
            "titleKey": "org.void.time.log.title",
            "purpose": "Void a posted time log entry after reviewing its details and providing a void reason",
            "userActions": [
              "voidTimeLog"
            ],
            "requiredEntities": [
              "TimeLog"
            ],
            "readsFields": [
              "timeLogId",
              "workTaskId",
              "workerId",
              "logDate",
              "hours",
              "workerRate",
              "status",
              "voidedAt",
              "voidReason",
              "createdAt"
            ],
            "writesFields": [
              "status",
              "voidedAt",
              "voidReason"
            ],
            "rulesApplied": [
              "timeLogRequiresTaskAndWorker"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent_selected_log_context",
                "intent": "queryList",
                "order": 10,
                "titleKey": "title.selectedLogContext",
                "emptyKey": "empty.noLogSelected",
                "displayHint": "read-only-context",
                "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId",
                "fields": [
                  {
                    "id": "fld_ctx_timeLogId",
                    "field": "timeLogId",
                    "labelKey": "label.timeLogId",
                    "order": 10,
                    "required": false,
                    "inputType": "readonly",
                    "source": "selectedEntity",
                    "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId"
                  },
                  {
                    "id": "fld_ctx_workTaskId",
                    "field": "workTaskId",
                    "labelKey": "label.workTaskId",
                    "order": 20,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_workTaskId"
                  },
                  {
                    "id": "fld_ctx_workerId",
                    "field": "workerId",
                    "labelKey": "label.workerId",
                    "order": 30,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_workerId"
                  },
                  {
                    "id": "fld_ctx_logDate",
                    "field": "logDate",
                    "labelKey": "label.logDate",
                    "order": 40,
                    "required": false,
                    "inputType": "readonly",
                    "format": "date",
                    "source": "entity",
                    "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_logDate"
                  },
                  {
                    "id": "fld_ctx_hours",
                    "field": "hours",
                    "labelKey": "label.hours",
                    "order": 50,
                    "required": false,
                    "inputType": "readonly",
                    "format": "number",
                    "source": "entity",
                    "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_hours"
                  },
                  {
                    "id": "fld_ctx_workerRate",
                    "field": "workerRate",
                    "labelKey": "label.workerRate",
                    "order": 60,
                    "required": false,
                    "inputType": "readonly",
                    "format": "money",
                    "source": "entity",
                    "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_workerRate"
                  },
                  {
                    "id": "fld_ctx_status",
                    "field": "status",
                    "labelKey": "label.status",
                    "order": 70,
                    "required": false,
                    "inputType": "readonly",
                    "source": "entity",
                    "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "intent_void_form",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "title.voidForm",
                "submitAction": "voidTimeLog",
                "emptyKey": "empty.noLogSelected",
                "displayHint": "form",
                "stateKey": "ui.pmTimeLogManagement.action.voidTimeLog.status",
                "fields": [
                  {
                    "id": "fld_form_timeLogId",
                    "field": "timeLogId",
                    "labelKey": "label.timeLogId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId"
                  },
                  {
                    "id": "fld_form_voidReason",
                    "field": "voidReason",
                    "labelKey": "label.voidReason",
                    "order": 20,
                    "required": true,
                    "inputType": "textarea",
                    "source": "userInput",
                    "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.voidReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_submit_void",
                    "action": "voidTimeLog",
                    "labelKey": "action.voidTimeLog",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "voidTimeLog"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind_voidTimeLog",
      "source": "buildFlowFsm.voidTimeLog.voidTimeLog",
      "entity": "TimeLog",
      "command": "voidTimeLog",
      "description": "Void a posted time log entry by setting its status to voided and recording the void reason and timestamp.",
      "stateKey": "ui.pmTimeLogManagement.output.voidTimeLog",
      "inputStateKeys": [
        "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId",
        "ui.pmTimeLogManagement.input.voidTimeLog.voidReason"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "pmTimeLogManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/pmTimeLogManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/pmTimeLogManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "pmTimeLogManagement__l2_shared"
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
