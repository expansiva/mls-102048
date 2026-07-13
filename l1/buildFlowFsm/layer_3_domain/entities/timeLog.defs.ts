/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.defs.ts" enhancement="_blank"/>

export const timeLogDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "TimeLog",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "TimeLog",
    "fields": [
      {
        "fieldId": "timeLogId",
        "type": "uuid",
        "required": true,
        "description": "Unique identifier for this time log entry."
      },
      {
        "fieldId": "workTaskId",
        "type": "uuid",
        "required": true,
        "description": "Reference to the work task this time log is linked to."
      },
      {
        "fieldId": "workerId",
        "type": "uuid",
        "required": true,
        "description": "Identifier of the field worker who recorded the hours worked."
      },
      {
        "fieldId": "logDate",
        "type": "date",
        "required": true,
        "description": "The calendar date on which the work was performed."
      },
      {
        "fieldId": "hours",
        "type": "number",
        "required": true,
        "description": "Number of hours worked on the task for this log entry."
      },
      {
        "fieldId": "workerRate",
        "type": "money",
        "required": true,
        "description": "Hourly cost rate of the worker captured at the time of logging, used for actual labor cost calculation."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Lifecycle state of the time log entry.",
        "enum": [
          "posted",
          "voided"
        ]
      },
      {
        "fieldId": "voidedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the time log was voided, if applicable."
      },
      {
        "fieldId": "voidReason",
        "type": "text",
        "required": false,
        "description": "Reason provided when voiding a time log entry."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the time log entry was created."
      }
    ],
    "statusEnum": [
      "posted",
      "voided"
    ],
    "invariants": [],
    "valueObjects": []
  }
} as const;

export default timeLogDomainEntity;

export const pipeline = [
  {
    "id": "timeLog__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
