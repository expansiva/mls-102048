/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "pmTimeLogManagement",
  "pageName": "Time Log Corrections",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmPmTimeLogManagementBase",
  "routePattern": "/buildFlowFsm/pmTimeLogManagement",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:voidTimeLog"
  ],
  "operationIds": [
    "voidTimeLog"
  ],
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
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/pmTimeLogManagement.defs.ts",
    "layoutId": "single_form_page11"
  },
  "states": [
    {
      "stateKey": "ui.pmTimeLogManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.action.voidTimeLog.status",
      "name": "voidTimeLogState",
      "kind": "actionStatus",
      "actionRef": "voidTimeLog",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId",
      "name": "voidTimeLogTimeLogId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "voidTimeLog",
        "direction": "input",
        "field": "timeLogId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.voidReason",
      "name": "voidTimeLogVoidReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "voidTimeLog",
        "direction": "input",
        "field": "voidReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.output.voidTimeLog",
      "name": "OutputVoidTimeLog",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_workTaskId",
      "name": "LayoutFldCtxWorkTaskId",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_workerId",
      "name": "LayoutFldCtxWorkerId",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_logDate",
      "name": "LayoutFldCtxLogDate",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_hours",
      "name": "LayoutFldCtxHours",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_workerRate",
      "name": "LayoutFldCtxWorkerRate",
      "kind": "layoutState",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.pmTimeLogManagement.layout.fld_ctx_status",
      "name": "LayoutFldCtxStatus",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "voidTimeLog",
      "kind": "command",
      "commandRef": "voidTimeLog",
      "routeKey": "buildFlowFsm.voidTimeLog.voidTimeLog",
      "purpose": "Void a time log",
      "methodName": "voidTimeLog",
      "handlerName": "handleVoidTimeLogClick",
      "inputStateKeys": [
        "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId",
        "ui.pmTimeLogManagement.input.voidTimeLog.voidReason"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId"
      ],
      "outputStateKeys": [
        "ui.pmTimeLogManagement.output.voidTimeLog"
      ],
      "statusStateKey": "ui.pmTimeLogManagement.action.voidTimeLog.status"
    },
    {
      "actionId": "set.voidTimeLogTimeLogId",
      "kind": "stateSetter",
      "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId",
      "methodName": "setVoidTimeLogTimeLogId",
      "handlerName": "handleVoidTimeLogTimeLogIdChange"
    },
    {
      "actionId": "set.voidTimeLogVoidReason",
      "kind": "stateSetter",
      "stateKey": "ui.pmTimeLogManagement.input.voidTimeLog.voidReason",
      "methodName": "setVoidTimeLogVoidReason",
      "handlerName": "handleVoidTimeLogVoidReasonChange"
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
    "title.selectedLogContext": "Selected Time Log",
    "title.voidForm": "Void Time Log",
    "empty.noLogSelected": "No time log selected. Please select a posted time log entry to void.",
    "label.timeLogId": "Time Log ID",
    "label.workTaskId": "Task",
    "label.workerId": "Worker",
    "label.logDate": "Date",
    "label.hours": "Hours",
    "label.workerRate": "Rate",
    "label.status": "Status",
    "label.voidReason": "Void Reason",
    "action.voidTimeLog": "Void Time Log",
    "sec.time.log.corrections.title": "Sec time log corrections",
    "org.void.time.log.title": "Void a posted time log entry after reviewing its details and providing a void reason"
  },
  "automation": {
    "statePrefix": "ui.pmTimeLogManagement",
    "stateKeys": [
      "ui.pmTimeLogManagement.status",
      "ui.pmTimeLogManagement.action.voidTimeLog.status",
      "ui.pmTimeLogManagement.input.voidTimeLog.timeLogId",
      "ui.pmTimeLogManagement.input.voidTimeLog.voidReason",
      "ui.pmTimeLogManagement.output.voidTimeLog",
      "ui.pmTimeLogManagement.layout.fld_ctx_workTaskId",
      "ui.pmTimeLogManagement.layout.fld_ctx_workerId",
      "ui.pmTimeLogManagement.layout.fld_ctx_logDate",
      "ui.pmTimeLogManagement.layout.fld_ctx_hours",
      "ui.pmTimeLogManagement.layout.fld_ctx_workerRate",
      "ui.pmTimeLogManagement.layout.fld_ctx_status"
    ],
    "actionIds": [
      "voidTimeLog",
      "set.voidTimeLogTimeLogId",
      "set.voidTimeLogVoidReason"
    ]
  }
};

export const pipeline = [
  {
    "id": "pmTimeLogManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "pmTimeLogManagement__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
