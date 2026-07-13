/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.defs.ts" enhancement="_blank"/>

export const timeLogRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "TimeLogRepository",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "TimeLog",
    "interfaceName": "ITimeLogRepository",
    "methods": [
      {
        "name": "append",
        "params": [
          "record: TimeLog"
        ],
        "returns": "void",
        "description": "Append-only write: insert a new time log event. No update or delete."
      },
      {
        "name": "listByOwnerId",
        "params": [
          "ownerId: WorkTaskId"
        ],
        "returns": "TimeLog[]",
        "description": "Read finder: all time log events for the owning work task."
      },
      {
        "name": "listByOwnerIdAndPeriod",
        "params": [
          "ownerId: WorkTaskId",
          "start: Instant",
          "end: Instant"
        ],
        "returns": "TimeLog[]",
        "description": "Read finder: time log events for the owning work task within a time period."
      },
      {
        "name": "listByWorkerId",
        "params": [
          "workerId: UserId"
        ],
        "returns": "TimeLog[]",
        "description": "Read finder: all time log events recorded by a specific worker."
      }
    ]
  }
} as const;

export default timeLogRepositoryPort;

export const pipeline = [
  {
    "id": "timeLogRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
