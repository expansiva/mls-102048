/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTaskStatus.defs.ts" enhancement="_blank"/>

export const updateTaskStatusUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateTaskStatus",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateTaskStatus",
    "ports": [
      "WorkTask",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "updateTaskStatus",
        "inputTypeName": "UpdateTaskStatusInput",
        "outputTypeName": "UpdateTaskStatusOutput",
        "input": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The work task selected by the field worker whose status will be updated."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The new lifecycle status chosen by the field worker — inProgress or completed."
          }
        ],
        "output": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask"
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask"
          },
          {
            "name": "startedAt",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask"
          },
          {
            "name": "completedAt",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask"
          }
        ],
        "ports": [
          "WorkTask",
          "TimeLog"
        ],
        "rulesApplied": [
          "taskRequiresWorkerAssignment"
        ],
        "transactional": true,
        "steps": [
          "1. Load the WorkTask aggregate by workTaskId via WorkTaskPort.getById(workTaskId). If not found, throw a validation error with code 'WORK_TASK_NOT_FOUND'.",
          "2. Resolve the actor id from ctx.sessionContext.actorId. Compare it against task.assignedWorkerId. If they do not match, throw an authorization error with code 'NOT_ASSIGNED_WORKER' — the field worker can only update tasks assigned to them.",
          "3. Apply rule taskRequiresWorkerAssignment: if the requested status is 'inProgress' and task.assignedWorkerId is null or empty, reject the transition with validation error code 'TASK_REQUIRES_WORKER_ASSIGNMENT' and detail referencing rule taskRequiresWorkerAssignment.",
          "4. Validate that the requested status is one of the allowed transition targets ('inProgress' or 'completed'). If not, throw validation error 'INVALID_STATUS_TRANSITION'.",
          "5. Set task.status to the new status value.",
          "6. If the new status is 'inProgress', set task.startedAt = ctx.clock.now() (only if not already set).",
          "7. If the new status is 'completed', set task.completedAt = ctx.clock.now().",
          "8. Set task.updatedAt = ctx.clock.now().",
          "9. Save the WorkTask aggregate via WorkTaskPort.save(task) inside the transaction.",
          "10. Build a TimeLog audit event record capturing: workTaskId, previousStatus, newStatus, actorId (from session), timestamp (ctx.clock.now()). Append it via TimeLogPort.append(event) inside the same transaction.",
          "11. Return the projected output: workTaskId, title, status, startedAt, completedAt, updatedAt."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default updateTaskStatusUsecase;

export const pipeline = [
  {
    "id": "updateTaskStatus__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTaskStatus.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTaskStatus.defs.ts",
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
