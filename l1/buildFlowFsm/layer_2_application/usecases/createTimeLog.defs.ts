/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTimeLog.defs.ts" enhancement="_blank"/>

export const createTimeLogUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createTimeLog",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createTimeLog",
    "ports": [
      "WorkTask",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "createTimeLog",
        "inputTypeName": "CreateTimeLogInput",
        "outputTypeName": "CreateTimeLogOutput",
        "input": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "The work task the field worker is logging hours against, resolved from the selected entity context."
          },
          {
            "name": "logDate",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "The calendar date on which the work was performed."
          },
          {
            "name": "hours",
            "type": "number",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "Number of hours worked on the task for this log entry."
          }
        ],
        "output": [
          {
            "name": "timeLogId",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "System-generated unique identifier for the new time log entry."
          },
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "The work task the time log is linked to."
          },
          {
            "name": "workerId",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "The field worker who recorded the hours."
          },
          {
            "name": "logDate",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "The calendar date on which the work was performed."
          },
          {
            "name": "hours",
            "type": "number",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "Number of hours worked."
          },
          {
            "name": "workerRate",
            "type": "number",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "Hourly cost rate sourced from the platform user profile."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "Initial lifecycle state, set to posted on creation."
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "Timestamp when the time log entry was created."
          }
        ],
        "ports": [
          "WorkTask",
          "TimeLog"
        ],
        "rulesApplied": [
          "timeLogRequiresTaskAndWorker",
          "workerRateFromProfile"
        ],
        "transactional": true,
        "steps": [
          "1. Resolve workerId from ctx.sessionContext.actorId (actorSession context).",
          "2. Resolve workerRate from the platform user profile: read the user profile via ctx.mdm.entity.get using the actor's MDM identity from session context; extract the hourly cost rate from details. If the profile or rate field is unavailable, raise a validation error citing rule workerRateFromProfile.",
          "3. Validate that workTaskId is provided (rule timeLogRequiresTaskAndWorker) — if missing or empty, throw a validation error with rule id timeLogRequiresTaskAndWorker.",
          "4. Validate that workerId is resolved from session (rule timeLogRequiresTaskAndWorker) — if missing, throw a validation error with rule id timeLogRequiresTaskAndWorker.",
          "5. Load the WorkTask aggregate via the WorkTask port (getById) using workTaskId to confirm the task exists and is valid. If not found, throw a validation error indicating the referenced work task does not exist.",
          "6. Generate timeLogId via ctx.idGenerator.generate().",
          "7. Set status to 'posted' (systemDefault) and createdAt to ctx.clock.now() (systemDefault).",
          "8. Construct the TimeLog entity with all resolved fields: timeLogId, workTaskId, workerId, logDate, hours, workerRate, status='posted', createdAt.",
          "9. Persist the TimeLog through the TimeLog port (create) inside a single transaction via ctx.data transaction wrapper.",
          "10. Return the created TimeLog projection: timeLogId, workTaskId, workerId, logDate, hours, workerRate, status, createdAt."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default createTimeLogUsecase;

export const pipeline = [
  {
    "id": "createTimeLog__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTimeLog.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTimeLog.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
