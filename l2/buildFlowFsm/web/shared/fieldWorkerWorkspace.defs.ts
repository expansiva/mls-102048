/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "fieldWorkerWorkspace",
  "pageName": "My Tasks & Daily Logs",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmFieldWorkerWorkspaceBase",
  "routePattern": "/buildFlowFsm/fieldWorkerWorkspace/:projectId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:workTaskLifecycle",
    "operation:browseTasks",
    "operation:updateTaskStatus",
    "operation:createTimeLog",
    "operation:createMaterialUsage"
  ],
  "operationIds": [
    "browseTasks",
    "updateTaskStatus",
    "createTimeLog",
    "createMaterialUsage"
  ],
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
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/fieldWorkerWorkspace.defs.ts",
    "layoutId": "fieldWorkerWorkspace.page11"
  },
  "states": [
    {
      "stateKey": "ui.fieldWorkerWorkspace.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.action.browseTasks.status",
      "name": "browseTasksState",
      "kind": "actionStatus",
      "actionRef": "browseTasks",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks",
      "name": "browseTasksData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "browseTasks",
        "direction": "output"
      },
      "outputShape": "paginated",
      "collection": false,
      "defaultValue": {
        "items": [],
        "total": 0
      }
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.action.updateTaskStatus.status",
      "name": "updateTaskStatusState",
      "kind": "actionStatus",
      "actionRef": "updateTaskStatus",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId",
      "name": "updateTaskStatusWorkTaskId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "updateTaskStatus",
        "direction": "input",
        "field": "workTaskId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.updateTaskStatus.status",
      "name": "updateTaskStatusStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTaskStatus",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.action.createTimeLog.status",
      "name": "createTimeLogState",
      "kind": "actionStatus",
      "actionRef": "createTimeLog",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId",
      "name": "createTimeLogWorkTaskId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "createTimeLog",
        "direction": "input",
        "field": "workTaskId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.logDate",
      "name": "createTimeLogLogDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTimeLog",
        "direction": "input",
        "field": "logDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.hours",
      "name": "createTimeLogHours",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTimeLog",
        "direction": "input",
        "field": "hours"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.action.createMaterialUsage.status",
      "name": "createMaterialUsageState",
      "kind": "actionStatus",
      "actionRef": "createMaterialUsage",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId",
      "name": "createMaterialUsageProjectId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "createMaterialUsage",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.materialName",
      "name": "createMaterialUsageMaterialName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMaterialUsage",
        "direction": "input",
        "field": "materialName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.quantity",
      "name": "createMaterialUsageQuantity",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMaterialUsage",
        "direction": "input",
        "field": "quantity"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.unit",
      "name": "createMaterialUsageUnit",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMaterialUsage",
        "direction": "input",
        "field": "unit"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.unitCost",
      "name": "createMaterialUsageUnitCost",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMaterialUsage",
        "direction": "input",
        "field": "unitCost"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.totalCost",
      "name": "createMaterialUsageTotalCost",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMaterialUsage",
        "direction": "input",
        "field": "totalCost"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.usageDate",
      "name": "createMaterialUsageUsageDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMaterialUsage",
        "direction": "input",
        "field": "usageDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.output.updateTaskStatus",
      "name": "OutputUpdateTaskStatus",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.output.createTimeLog",
      "name": "OutputCreateTimeLog",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.fieldWorkerWorkspace.output.createMaterialUsage",
      "name": "OutputCreateMaterialUsage",
      "kind": "commandOutput",
      "defaultValue": null
    }
  ],
  "actions": [
    {
      "actionId": "browseTasks",
      "kind": "query",
      "commandRef": "browseTasks",
      "routeKey": "buildFlowFsm.browseTasks.browseTasks",
      "purpose": "Browse assigned tasks",
      "methodName": "loadBrowseTasks",
      "handlerName": "handleBrowseTasksClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.fieldWorkerWorkspace.data.browseTasks"
      ],
      "statusStateKey": "ui.fieldWorkerWorkspace.action.browseTasks.status"
    },
    {
      "actionId": "updateTaskStatus",
      "kind": "command",
      "commandRef": "updateTaskStatus",
      "routeKey": "buildFlowFsm.workTaskLifecycle.updateTaskStatus",
      "purpose": "Update task status",
      "methodName": "updateTaskStatus",
      "handlerName": "handleUpdateTaskStatusClick",
      "inputStateKeys": [
        "ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId",
        "ui.fieldWorkerWorkspace.input.updateTaskStatus.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId"
      ],
      "outputStateKeys": [
        "ui.fieldWorkerWorkspace.output.updateTaskStatus"
      ],
      "statusStateKey": "ui.fieldWorkerWorkspace.action.updateTaskStatus.status",
      "refreshActionIds": [
        "browseTasks"
      ]
    },
    {
      "actionId": "createTimeLog",
      "kind": "command",
      "commandRef": "createTimeLog",
      "routeKey": "buildFlowFsm.createTimeLog.createTimeLog",
      "purpose": "Log hours worked on a task",
      "methodName": "createTimeLog",
      "handlerName": "handleCreateTimeLogClick",
      "inputStateKeys": [
        "ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId",
        "ui.fieldWorkerWorkspace.input.createTimeLog.logDate",
        "ui.fieldWorkerWorkspace.input.createTimeLog.hours"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId"
      ],
      "outputStateKeys": [
        "ui.fieldWorkerWorkspace.output.createTimeLog"
      ],
      "statusStateKey": "ui.fieldWorkerWorkspace.action.createTimeLog.status",
      "refreshActionIds": [
        "browseTasks"
      ]
    },
    {
      "actionId": "createMaterialUsage",
      "kind": "command",
      "commandRef": "createMaterialUsage",
      "routeKey": "buildFlowFsm.createMaterialUsage.createMaterialUsage",
      "purpose": "Record materials used on-site",
      "methodName": "createMaterialUsage",
      "handlerName": "handleCreateMaterialUsageClick",
      "inputStateKeys": [
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.materialName",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.quantity",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.unit",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.unitCost",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.totalCost",
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.usageDate"
      ],
      "routeParamInputStateKeys": [
        "ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.fieldWorkerWorkspace.output.createMaterialUsage"
      ],
      "statusStateKey": "ui.fieldWorkerWorkspace.action.createMaterialUsage.status",
      "refreshActionIds": [
        "browseTasks"
      ]
    },
    {
      "actionId": "set.updateTaskStatusWorkTaskId",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId",
      "methodName": "setUpdateTaskStatusWorkTaskId",
      "handlerName": "handleUpdateTaskStatusWorkTaskIdChange"
    },
    {
      "actionId": "set.updateTaskStatusStatus",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.updateTaskStatus.status",
      "methodName": "setUpdateTaskStatusStatus",
      "handlerName": "handleUpdateTaskStatusStatusChange"
    },
    {
      "actionId": "set.createTimeLogWorkTaskId",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId",
      "methodName": "setCreateTimeLogWorkTaskId",
      "handlerName": "handleCreateTimeLogWorkTaskIdChange"
    },
    {
      "actionId": "set.createTimeLogLogDate",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.logDate",
      "methodName": "setCreateTimeLogLogDate",
      "handlerName": "handleCreateTimeLogLogDateChange"
    },
    {
      "actionId": "set.createTimeLogHours",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createTimeLog.hours",
      "methodName": "setCreateTimeLogHours",
      "handlerName": "handleCreateTimeLogHoursChange"
    },
    {
      "actionId": "set.createMaterialUsageProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId",
      "methodName": "setCreateMaterialUsageProjectId",
      "handlerName": "handleCreateMaterialUsageProjectIdChange"
    },
    {
      "actionId": "set.createMaterialUsageMaterialName",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.materialName",
      "methodName": "setCreateMaterialUsageMaterialName",
      "handlerName": "handleCreateMaterialUsageMaterialNameChange"
    },
    {
      "actionId": "set.createMaterialUsageQuantity",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.quantity",
      "methodName": "setCreateMaterialUsageQuantity",
      "handlerName": "handleCreateMaterialUsageQuantityChange"
    },
    {
      "actionId": "set.createMaterialUsageUnit",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.unit",
      "methodName": "setCreateMaterialUsageUnit",
      "handlerName": "handleCreateMaterialUsageUnitChange"
    },
    {
      "actionId": "set.createMaterialUsageUnitCost",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.unitCost",
      "methodName": "setCreateMaterialUsageUnitCost",
      "handlerName": "handleCreateMaterialUsageUnitCostChange"
    },
    {
      "actionId": "set.createMaterialUsageTotalCost",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.totalCost",
      "methodName": "setCreateMaterialUsageTotalCost",
      "handlerName": "handleCreateMaterialUsageTotalCostChange"
    },
    {
      "actionId": "set.createMaterialUsageUsageDate",
      "kind": "stateSetter",
      "stateKey": "ui.fieldWorkerWorkspace.input.createMaterialUsage.usageDate",
      "methodName": "setCreateMaterialUsageUsageDate",
      "handlerName": "handleCreateMaterialUsageUsageDateChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "browseTasks",
      "stateKey": "ui.fieldWorkerWorkspace.data.browseTasks"
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
    "fieldWorkerWorkspace.section.main.title": "My Tasks & Daily Logs",
    "fieldWorkerWorkspace.organism.browseTasks.title": "Assigned Tasks",
    "fieldWorkerWorkspace.organism.updateTaskStatus.title": "Update Task Status",
    "fieldWorkerWorkspace.organism.createTimeLog.title": "Log Work Hours",
    "fieldWorkerWorkspace.organism.createMaterialUsage.title": "Log Material Usage",
    "fieldWorkerWorkspace.intent.tasksBoard.title": "Task Board by Status",
    "fieldWorkerWorkspace.intent.tasksSummary.title": "Task Summary",
    "fieldWorkerWorkspace.intent.updateStatus.title": "Change Task Status",
    "fieldWorkerWorkspace.intent.createTimeLog.title": "Create Time Log",
    "fieldWorkerWorkspace.intent.createMaterialUsage.title": "Create Material Usage",
    "fieldWorkerWorkspace.field.workTaskId.label": "Work Task",
    "fieldWorkerWorkspace.field.title.label": "Title",
    "fieldWorkerWorkspace.field.description.label": "Description",
    "fieldWorkerWorkspace.field.status.label": "Status",
    "fieldWorkerWorkspace.field.dueDate.label": "Due Date",
    "fieldWorkerWorkspace.field.assignedWorkerName.label": "Assigned Worker",
    "fieldWorkerWorkspace.field.sequenceNumber.label": "Sequence",
    "fieldWorkerWorkspace.field.startedAt.label": "Started At",
    "fieldWorkerWorkspace.field.completedAt.label": "Completed At",
    "fieldWorkerWorkspace.field.logDate.label": "Log Date",
    "fieldWorkerWorkspace.field.hours.label": "Hours",
    "fieldWorkerWorkspace.field.projectId.label": "Project",
    "fieldWorkerWorkspace.field.materialName.label": "Material Name",
    "fieldWorkerWorkspace.field.quantity.label": "Quantity",
    "fieldWorkerWorkspace.field.unit.label": "Unit",
    "fieldWorkerWorkspace.field.unitCost.label": "Unit Cost",
    "fieldWorkerWorkspace.field.totalCost.label": "Total Cost",
    "fieldWorkerWorkspace.field.usageDate.label": "Usage Date",
    "fieldWorkerWorkspace.action.refreshTasks.label": "Refresh Tasks",
    "fieldWorkerWorkspace.action.updateStatus.label": "Update Status",
    "fieldWorkerWorkspace.action.logTime.label": "Log Time",
    "fieldWorkerWorkspace.action.logMaterial.label": "Log Material",
    "fieldWorkerWorkspace.action.createTimeLog.label": "Submit Time Log",
    "fieldWorkerWorkspace.action.createMaterialUsage.label": "Submit Material Usage",
    "fieldWorkerWorkspace.summary.inProgress.label": "In Progress Tasks",
    "fieldWorkerWorkspace.summary.completed.label": "Completed Tasks"
  },
  "automation": {
    "statePrefix": "ui.fieldWorkerWorkspace",
    "stateKeys": [
      "ui.fieldWorkerWorkspace.status",
      "ui.fieldWorkerWorkspace.action.browseTasks.status",
      "ui.fieldWorkerWorkspace.data.browseTasks",
      "ui.fieldWorkerWorkspace.action.updateTaskStatus.status",
      "ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId",
      "ui.fieldWorkerWorkspace.input.updateTaskStatus.status",
      "ui.fieldWorkerWorkspace.action.createTimeLog.status",
      "ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId",
      "ui.fieldWorkerWorkspace.input.createTimeLog.logDate",
      "ui.fieldWorkerWorkspace.input.createTimeLog.hours",
      "ui.fieldWorkerWorkspace.action.createMaterialUsage.status",
      "ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId",
      "ui.fieldWorkerWorkspace.input.createMaterialUsage.materialName",
      "ui.fieldWorkerWorkspace.input.createMaterialUsage.quantity",
      "ui.fieldWorkerWorkspace.input.createMaterialUsage.unit",
      "ui.fieldWorkerWorkspace.input.createMaterialUsage.unitCost",
      "ui.fieldWorkerWorkspace.input.createMaterialUsage.totalCost",
      "ui.fieldWorkerWorkspace.input.createMaterialUsage.usageDate",
      "ui.fieldWorkerWorkspace.output.updateTaskStatus",
      "ui.fieldWorkerWorkspace.output.createTimeLog",
      "ui.fieldWorkerWorkspace.output.createMaterialUsage"
    ],
    "actionIds": [
      "browseTasks",
      "updateTaskStatus",
      "createTimeLog",
      "createMaterialUsage",
      "set.updateTaskStatusWorkTaskId",
      "set.updateTaskStatusStatus",
      "set.createTimeLogWorkTaskId",
      "set.createTimeLogLogDate",
      "set.createTimeLogHours",
      "set.createMaterialUsageProjectId",
      "set.createMaterialUsageMaterialName",
      "set.createMaterialUsageQuantity",
      "set.createMaterialUsageUnit",
      "set.createMaterialUsageUnitCost",
      "set.createMaterialUsageTotalCost",
      "set.createMaterialUsageUsageDate"
    ]
  }
};

export const pipeline = [
  {
    "id": "fieldWorkerWorkspace__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "fieldWorkerWorkspace__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
