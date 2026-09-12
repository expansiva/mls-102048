/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "voidTimeLog",
    "bffName": "buildFlowFsm.voidTimeLog.voidTimeLog",
    "routeKey": "buildFlowFsm.voidTimeLog.voidTimeLog",
    "purpose": "Void a time log",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "timeLogId",
        "type": "string",
        "required": true,
        "description": "The identifier of the posted time log entry to be voided.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "voidReason",
        "type": "string",
        "required": true,
        "description": "Text reason explaining why the time log is being voided.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "timeLogId",
        "type": "string",
        "description": "Unique identifier for this time log entry."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "posted",
          "voided"
        ],
        "description": "Lifecycle state of the time log entry."
      },
      {
        "name": "voidedAt",
        "type": "date",
        "description": "Timestamp when the time log was voided, if applicable."
      },
      {
        "name": "voidReason",
        "type": "string",
        "description": "Reason provided when voiding a time log entry."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:voidTimeLog",
      "operationId": "voidTimeLog",
      "defPath": "_102048_/l4/operations/voidTimeLog.defs.ts",
      "bffName": "buildFlowFsm.voidTimeLog.voidTimeLog"
    }
  }
];

export const pipeline = [
  {
    "id": "pmTimeLogManagement__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
