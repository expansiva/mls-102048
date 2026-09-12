/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/fieldWorkerWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "fieldWorkerWorkspace",
  "pageName": "My Tasks & Daily Logs",
  "baseClassName": "BuildFlowFsmFieldWorkerWorkspaceBase",
  "actor": "fieldWorker",
  "purpose": "Executar My Tasks & Daily Logs.",
  "capabilities": [
    "workTaskLifecycle",
    "browseTasks",
    "createTimeLog",
    "createMaterialUsage"
  ],
  "flowRefs": {
    "experienceFlows": [
      "workTaskLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "workTaskLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "fieldWorkerWorkspace",
    "workspaceKind": "workflow",
    "workflowId": "workTaskLifecycle",
    "actor": "fieldWorker",
    "entity": "WorkTask",
    "owners": [
      {
        "kind": "workflow",
        "id": "workTaskLifecycle",
        "defPath": "_102048_/l4/workflows/workTaskLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "browseTasks",
        "defPath": "_102048_/l4/operations/browseTasks.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateTaskStatus",
        "defPath": "_102048_/l4/operations/updateTaskStatus.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createTimeLog",
        "defPath": "_102048_/l4/operations/createTimeLog.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createMaterialUsage",
        "defPath": "_102048_/l4/operations/createMaterialUsage.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "The project manager opens the project detail view and creates individual work tasks with clear descriptions of what needs to be done.",
        "The project manager assigns each task to a specific field worker and sets a due date that falls within the project start and end dates.",
        "The field worker starts working on the assigned task and updates its status to in progress so the PM and dashboard reflect current progress.",
        "The field worker completes the work and marks the task as completed, recording hours and materials along the way.",
        "The project manager reviews the simplified task timeline and delay risk suggestions to ensure the project stays on track."
      ],
      "operations": [
        {
          "operationId": "browseTasks",
          "commandName": "browseTasks",
          "steps": [
            "The field worker opens the app and the system loads all WorkTask records where assignedWorkerId matches their session actor ID.",
            "The tasks are sorted by dueDate so the most urgent work appears first.",
            "Each task card shows the title, description, status, and due date, with delay risk indicated by status and proximity to the due date."
          ]
        },
        {
          "operationId": "updateTaskStatus",
          "commandName": "updateTaskStatus",
          "steps": [
            "The field worker selects a task from their assigned task list.",
            "The field worker chooses the new status (inProgress or completed).",
            "The system verifies the task is assigned to the field worker before allowing the transition.",
            "The system updates the task status and records the appropriate timestamp (startedAt or completedAt)."
          ]
        },
        {
          "operationId": "createTimeLog",
          "commandName": "createTimeLog",
          "steps": [
            "The field worker selects the work task they worked on",
            "The system resolves the worker identity and hourly cost rate from the platform user profile",
            "The field worker enters the date worked and the number of hours",
            "The system creates a time log entry with status posted, linked to the task and worker",
            "The time log is persisted and becomes available for job costing and budget vs actual comparison"
          ]
        },
        {
          "operationId": "createMaterialUsage",
          "commandName": "createMaterialUsage",
          "steps": [
            "Open the material usage form for the current project",
            "Enter the material name, quantity, unit of measure, and unit cost",
            "Review the total cost calculated as quantity multiplied by unit cost",
            "Set the usage date and submit the material usage record"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec-workspace",
      "type": "section",
      "sectionName": "My Tasks & Daily Logs",
      "titleKey": "fieldWorkerWorkspace.section.main.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-browse-tasks",
          "type": "organism",
          "organismName": "BrowseTasks",
          "titleKey": "fieldWorkerWorkspace.organism.browseTasks.title",
          "purpose": "Browse assigned tasks by status and due date",
          "userActions": [
            "browseTasks"
          ],
          "requiredEntities": [
            "WorkTask"
          ],
          "readsFields": [
            "workTaskId",
            "title",
            "description",
            "status",
            "dueDate",
            "sequenceNumber",
            "assignedWorkerName",
            "projectId",
            "startedAt",
            "completedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "timelineIsSimplified",
            "delayRiskCalculation"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent-tasks-board",
              "intent": "queryList",
              "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks",
              "order": 10
            },
            {
              "id": "intent-tasks-summary",
              "intent": "summary",
              "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks",
              "order": 20
            }
          ]
        },
        {
          "id": "org-update-task-status",
          "type": "organism",
          "organismName": "UpdateTaskStatus",
          "titleKey": "fieldWorkerWorkspace.organism.updateTaskStatus.title",
          "purpose": "Update task status",
          "userActions": [
            "updateTaskStatus"
          ],
          "requiredEntities": [
            "WorkTask"
          ],
          "readsFields": [
            "workTaskId",
            "status"
          ],
          "writesFields": [
            "status"
          ],
          "rulesApplied": [
            "taskRequiresWorkerAssignment"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent-update-status-form",
              "intent": "commandForm",
              "submitAction": "updateTaskStatus",
              "order": 10
            }
          ]
        },
        {
          "id": "org-create-time-log",
          "type": "organism",
          "organismName": "CreateTimeLog",
          "titleKey": "fieldWorkerWorkspace.organism.createTimeLog.title",
          "purpose": "Log hours worked on a task",
          "userActions": [
            "createTimeLog"
          ],
          "requiredEntities": [
            "TimeLog",
            "WorkTask"
          ],
          "readsFields": [
            "workTaskId",
            "logDate",
            "hours"
          ],
          "writesFields": [
            "workTaskId",
            "logDate",
            "hours"
          ],
          "rulesApplied": [
            "timeLogRequiresTaskAndWorker",
            "workerRateFromProfile"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent-time-log-form",
              "intent": "commandForm",
              "submitAction": "createTimeLog",
              "order": 10
            }
          ]
        },
        {
          "id": "org-create-material-usage",
          "type": "organism",
          "organismName": "CreateMaterialUsage",
          "titleKey": "fieldWorkerWorkspace.organism.createMaterialUsage.title",
          "purpose": "Record materials used on-site",
          "userActions": [
            "createMaterialUsage"
          ],
          "requiredEntities": [
            "MaterialUsage",
            "Project"
          ],
          "readsFields": [
            "projectId",
            "materialName",
            "quantity",
            "unit",
            "unitCost",
            "totalCost",
            "usageDate"
          ],
          "writesFields": [
            "projectId",
            "materialName",
            "quantity",
            "unit",
            "unitCost",
            "totalCost",
            "usageDate"
          ],
          "rulesApplied": [
            "materialUsageRequiresProject"
          ],
          "order": 40,
          "intentionRefs": [
            {
              "id": "intent-material-usage-form",
              "intent": "commandForm",
              "submitAction": "createMaterialUsage",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "fieldWorkerWorkspace.page11",
    "type": "page",
    "sections": [
      {
        "id": "sec-workspace",
        "type": "section",
        "sectionName": "My Tasks & Daily Logs",
        "titleKey": "fieldWorkerWorkspace.section.main.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-browse-tasks",
            "type": "organism",
            "organismName": "BrowseTasks",
            "titleKey": "fieldWorkerWorkspace.organism.browseTasks.title",
            "purpose": "Browse assigned tasks by status and due date",
            "userActions": [
              "browseTasks"
            ],
            "requiredEntities": [
              "WorkTask"
            ],
            "readsFields": [
              "workTaskId",
              "title",
              "description",
              "status",
              "dueDate",
              "sequenceNumber",
              "assignedWorkerName",
              "projectId",
              "startedAt",
              "completedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "timelineIsSimplified",
              "delayRiskCalculation"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent-tasks-board",
                "intent": "queryList",
                "order": 10,
                "titleKey": "fieldWorkerWorkspace.intent.tasksBoard.title",
                "source": "browseTasks",
                "binding": "ui.fieldWorkerWorkspace.data.browseTasks",
                "displayHint": "boardByStatus",
                "fields": [],
                "columns": [
                  {
                    "id": "col-title",
                    "field": "title",
                    "labelKey": "fieldWorkerWorkspace.field.title.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "col-description",
                    "field": "description",
                    "labelKey": "fieldWorkerWorkspace.field.description.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "col-status",
                    "field": "status",
                    "labelKey": "fieldWorkerWorkspace.field.status.label",
                    "order": 30,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "col-dueDate",
                    "field": "dueDate",
                    "labelKey": "fieldWorkerWorkspace.field.dueDate.label",
                    "order": 40,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "col-assignedWorkerName",
                    "field": "assignedWorkerName",
                    "labelKey": "fieldWorkerWorkspace.field.assignedWorkerName.label",
                    "order": 50,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "col-sequenceNumber",
                    "field": "sequenceNumber",
                    "labelKey": "fieldWorkerWorkspace.field.sequenceNumber.label",
                    "order": 60,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "col-startedAt",
                    "field": "startedAt",
                    "labelKey": "fieldWorkerWorkspace.field.startedAt.label",
                    "order": 70,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "col-completedAt",
                    "field": "completedAt",
                    "labelKey": "fieldWorkerWorkspace.field.completedAt.label",
                    "order": 80,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb-refresh",
                    "action": "browseTasks",
                    "labelKey": "fieldWorkerWorkspace.action.refreshTasks.label",
                    "order": 10,
                    "actionKey": "browseTasks"
                  }
                ],
                "rowActions": [
                  {
                    "id": "row-update-status",
                    "action": "updateTaskStatus",
                    "labelKey": "fieldWorkerWorkspace.action.updateStatus.label",
                    "order": 10,
                    "actionKey": "updateTaskStatus"
                  },
                  {
                    "id": "row-log-time",
                    "action": "createTimeLog",
                    "labelKey": "fieldWorkerWorkspace.action.logTime.label",
                    "order": 20,
                    "actionKey": "createTimeLog"
                  },
                  {
                    "id": "row-log-material",
                    "action": "createMaterialUsage",
                    "labelKey": "fieldWorkerWorkspace.action.logMaterial.label",
                    "order": 30,
                    "actionKey": "createMaterialUsage"
                  }
                ],
                "actions": [],
                "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
              },
              {
                "id": "intent-tasks-summary",
                "intent": "summary",
                "order": 20,
                "titleKey": "fieldWorkerWorkspace.intent.tasksSummary.title",
                "fields": [
                  {
                    "id": "fld-summary-inProgress",
                    "field": "status",
                    "labelKey": "fieldWorkerWorkspace.summary.inProgress.label",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  },
                  {
                    "id": "fld-summary-completed",
                    "field": "status",
                    "labelKey": "fieldWorkerWorkspace.summary.completed.label",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
              }
            ]
          },
          {
            "id": "org-update-task-status",
            "type": "organism",
            "organismName": "UpdateTaskStatus",
            "titleKey": "fieldWorkerWorkspace.organism.updateTaskStatus.title",
            "purpose": "Update task status",
            "userActions": [
              "updateTaskStatus"
            ],
            "requiredEntities": [
              "WorkTask"
            ],
            "readsFields": [
              "workTaskId",
              "status"
            ],
            "writesFields": [
              "status"
            ],
            "rulesApplied": [
              "taskRequiresWorkerAssignment"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent-update-status-form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "fieldWorkerWorkspace.intent.updateStatus.title",
                "submitAction": "updateTaskStatus",
                "fields": [
                  {
                    "id": "fld-update-workTaskId",
                    "field": "workTaskId",
                    "labelKey": "fieldWorkerWorkspace.field.workTaskId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "selection",
                    "stateKey": "ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId"
                  },
                  {
                    "id": "fld-update-status",
                    "field": "status",
                    "labelKey": "fieldWorkerWorkspace.field.status.label",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.fieldWorkerWorkspace.input.updateTaskStatus.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-update-status",
                    "action": "updateTaskStatus",
                    "labelKey": "fieldWorkerWorkspace.action.updateStatus.label",
                    "order": 10,
                    "actionKey": "updateTaskStatus"
                  }
                ]
              }
            ]
          },
          {
            "id": "org-create-time-log",
            "type": "organism",
            "organismName": "CreateTimeLog",
            "titleKey": "fieldWorkerWorkspace.organism.createTimeLog.title",
            "purpose": "Log hours worked on a task",
            "userActions": [
              "createTimeLog"
            ],
            "requiredEntities": [
              "TimeLog",
              "WorkTask"
            ],
            "readsFields": [
              "workTaskId",
              "logDate",
              "hours"
            ],
            "writesFields": [
              "workTaskId",
              "logDate",
              "hours"
            ],
            "rulesApplied": [
              "timeLogRequiresTaskAndWorker",
              "workerRateFromProfile"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent-time-log-form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "fieldWorkerWorkspace.intent.createTimeLog.title",
                "submitAction": "createTimeLog",
                "fields": [
                  {
                    "id": "fld-time-workTaskId",
                    "field": "workTaskId",
                    "labelKey": "fieldWorkerWorkspace.field.workTaskId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "selection",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId"
                  },
                  {
                    "id": "fld-time-logDate",
                    "field": "logDate",
                    "labelKey": "fieldWorkerWorkspace.field.logDate.label",
                    "order": 20,
                    "required": true,
                    "inputType": "date",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.logDate"
                  },
                  {
                    "id": "fld-time-hours",
                    "field": "hours",
                    "labelKey": "fieldWorkerWorkspace.field.hours.label",
                    "order": 30,
                    "required": true,
                    "inputType": "number",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.hours"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-create-time-log",
                    "action": "createTimeLog",
                    "labelKey": "fieldWorkerWorkspace.action.createTimeLog.label",
                    "order": 10,
                    "actionKey": "createTimeLog"
                  }
                ]
              }
            ]
          },
          {
            "id": "org-create-material-usage",
            "type": "organism",
            "organismName": "CreateMaterialUsage",
            "titleKey": "fieldWorkerWorkspace.organism.createMaterialUsage.title",
            "purpose": "Record materials used on-site",
            "userActions": [
              "createMaterialUsage"
            ],
            "requiredEntities": [
              "MaterialUsage",
              "Project"
            ],
            "readsFields": [
              "projectId",
              "materialName",
              "quantity",
              "unit",
              "unitCost",
              "totalCost",
              "usageDate"
            ],
            "writesFields": [
              "projectId",
              "materialName",
              "quantity",
              "unit",
              "unitCost",
              "totalCost",
              "usageDate"
            ],
            "rulesApplied": [
              "materialUsageRequiresProject"
            ],
            "order": 40,
            "intentions": [
              {
                "id": "intent-material-usage-form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "fieldWorkerWorkspace.intent.createMaterialUsage.title",
                "submitAction": "createMaterialUsage",
                "fields": [
                  {
                    "id": "fld-mat-projectId",
                    "field": "projectId",
                    "labelKey": "fieldWorkerWorkspace.field.projectId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "context",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId"
                  },
                  {
                    "id": "fld-mat-materialName",
                    "field": "materialName",
                    "labelKey": "fieldWorkerWorkspace.field.materialName.label",
                    "order": 20,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.materialName"
                  },
                  {
                    "id": "fld-mat-quantity",
                    "field": "quantity",
                    "labelKey": "fieldWorkerWorkspace.field.quantity.label",
                    "order": 30,
                    "required": true,
                    "inputType": "number",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.quantity"
                  },
                  {
                    "id": "fld-mat-unit",
                    "field": "unit",
                    "labelKey": "fieldWorkerWorkspace.field.unit.label",
                    "order": 40,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.unit"
                  },
                  {
                    "id": "fld-mat-unitCost",
                    "field": "unitCost",
                    "labelKey": "fieldWorkerWorkspace.field.unitCost.label",
                    "order": 50,
                    "required": true,
                    "inputType": "number",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.unitCost"
                  },
                  {
                    "id": "fld-mat-totalCost",
                    "field": "totalCost",
                    "labelKey": "fieldWorkerWorkspace.field.totalCost.label",
                    "order": 60,
                    "required": true,
                    "inputType": "number",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.totalCost"
                  },
                  {
                    "id": "fld-mat-usageDate",
                    "field": "usageDate",
                    "labelKey": "fieldWorkerWorkspace.field.usageDate.label",
                    "order": 70,
                    "required": true,
                    "inputType": "date",
                    "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.usageDate"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act-create-material-usage",
                    "action": "createMaterialUsage",
                    "labelKey": "fieldWorkerWorkspace.action.createMaterialUsage.label",
                    "order": 10,
                    "actionKey": "createMaterialUsage"
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
      "id": "bind-browseTasks",
      "source": "buildFlowFsm.browseTasks.browseTasks",
      "entity": "WorkTask",
      "command": "browseTasks",
      "description": "Load assigned tasks for the field worker",
      "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks",
      "inputStateKeys": []
    },
    {
      "id": "bind-updateTaskStatus",
      "source": "buildFlowFsm.workTaskLifecycle.updateTaskStatus",
      "entity": "WorkTask",
      "command": "updateTaskStatus",
      "description": "Update task lifecycle status",
      "stateKey": "ui.fieldWorkerWorkspace.output.updateTaskStatus",
      "inputStateKeys": [
        "ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId",
        "ui.fieldWorkerWorkspace.input.updateTaskStatus.status"
      ]
    },
    {
      "id": "bind-createTimeLog",
      "source": "buildFlowFsm.createTimeLog.createTimeLog",
      "entity": "TimeLog",
      "command": "createTimeLog",
      "description": "Create a time log entry",
      "stateKey": "ui.fieldWorkerWorkspace.output.createTimeLog",
      "inputStateKeys": [
        "ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId",
        "ui.fieldWorkerWorkspace.input.createTimeLog.logDate",
        "ui.fieldWorkerWorkspace.input.createTimeLog.hours"
      ]
    },
    {
      "id": "bind-createMaterialUsage",
      "source": "buildFlowFsm.createMaterialUsage.createMaterialUsage",
      "entity": "MaterialUsage",
      "command": "createMaterialUsage",
      "description": "Create a material usage entry",
      "stateKey": "ui.fieldWorkerWorkspace.output.createMaterialUsage",
      "inputStateKeys": [
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.materialName",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.quantity",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.unit",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.unitCost",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.totalCost",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.usageDate"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "fieldWorkerWorkspace__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/fieldWorkerWorkspace.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/fieldWorkerWorkspace.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "fieldWorkerWorkspace__l2_shared"
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
