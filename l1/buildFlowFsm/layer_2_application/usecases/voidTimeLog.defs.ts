/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidTimeLog.defs.ts" enhancement="_blank"/>

export const voidTimeLogUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "voidTimeLog",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "voidTimeLog",
    "ports": [],
    "functions": [
      {
        "functionName": "voidTimeLog",
        "inputTypeName": "VoidTimeLogInput",
        "outputTypeName": "VoidTimeLogOutput",
        "input": [
          {
            "name": "timeLogId",
            "type": "uuid",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "The identifier of the posted time log entry to be voided."
          },
          {
            "name": "voidReason",
            "type": "text",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "Text reason explaining why the time log is being voided."
          }
        ],
        "output": [
          {
            "name": "timeLogId",
            "type": "uuid",
            "required": true,
            "ofEntity": "TimeLog"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "TimeLog"
          },
          {
            "name": "voidedAt",
            "type": "datetime",
            "required": true,
            "ofEntity": "TimeLog"
          },
          {
            "name": "voidReason",
            "type": "text",
            "required": true,
            "ofEntity": "TimeLog"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "timeLogRequiresTaskAndWorker"
        ],
        "transactional": true,
        "steps": [
          "Load the TimeLog by timeLogId via TimeLog port (getById).",
          "Validate the loaded TimeLog has status 'posted'; if not, reject with a validation error referencing rule timeLogRequiresTaskAndWorker.",
          "Validate that the loaded TimeLog has non-null workTaskId and workerId (rule timeLogRequiresTaskAndWorker); if either is missing, reject.",
          "Resolve voidedAt from ctx.clock.now() (systemDefault) and actorId from ctx.sessionContext.actorId (actorSession).",
          "Mutate the TimeLog: set status to 'voided', set voidedAt to the resolved timestamp, set voidReason to the user-provided value. Preserve workTaskId, workerId, logDate, hours, workerRate, and createdAt.",
          "Save the mutated TimeLog through the TimeLog port inside the transaction (ctx.data transaction wrapper).",
          "Return the timeLogId, status, voidedAt, and voidReason of the voided TimeLog."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default voidTimeLogUsecase;

export const pipeline = [
  {
    "id": "voidTimeLog__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidTimeLog.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidTimeLog.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
