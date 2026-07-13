/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseTasks.defs.ts" enhancement="_blank"/>

export const browseTasksUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseTasks",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseTasks",
    "ports": [
      "WorkTask",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "browseTasks",
        "inputTypeName": "BrowseTasksInput",
        "outputTypeName": "BrowseTasksOutput",
        "input": [],
        "output": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Unique identifier of the work task."
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Title of the work task."
          },
          {
            "name": "description",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Description of the work task."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Current status of the work task (draft, assigned, inProgress, completed, cancelled)."
          },
          {
            "name": "dueDate",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Due date of the work task."
          },
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Project identifier the task belongs to."
          },
          {
            "name": "sequenceNumber",
            "type": "number",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Sequence number for simplified timeline ordering."
          },
          {
            "name": "assignedWorkerName",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Name of the worker assigned to the task."
          },
          {
            "name": "startedAt",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Timestamp when the task was started."
          },
          {
            "name": "completedAt",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Timestamp when the task was completed."
          },
          {
            "name": "delayRisk",
            "type": "string",
            "required": false,
            "description": "Derived delay risk level (low, medium, high) computed from task status and proximity to dueDate per delayRiskCalculation rule."
          }
        ],
        "ports": [
          "WorkTask"
        ],
        "rulesApplied": [
          "timelineIsSimplified",
          "delayRiskCalculation"
        ],
        "transactional": false,
        "steps": [
          "1. Resolve the field worker's actorId from ctx.sessionContext.actorId (actorSession context resolution).",
          "2. Load WorkTask records from the WorkTask port filtered by assignedWorkerId equal to the resolved actorId.",
          "3. Apply timelineIsSimplified rule: sort results by sequenceNumber ascending to present a simplified timeline view (not CPM critical-path).",
          "4. Apply delayRiskCalculation rule: for each task compute a delayRisk value (low/medium/high) based on current status and proximity of dueDate to the current date (ctx.clock.today).",
          "5. Sort the final list by dueDate ascending so the most urgent tasks appear first.",
          "6. Project the output fields (workTaskId, title, description, status, dueDate, projectId, sequenceNumber, assignedWorkerName, startedAt, completedAt, delayRisk) and return the collection. No events are emitted (read-only query)."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default browseTasksUsecase;

export const pipeline = [
  {
    "id": "browseTasks__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseTasks.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseTasks.defs.ts",
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
