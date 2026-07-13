/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/assignTask.defs.ts" enhancement="_blank"/>

export const assignTaskUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "assignTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "assignTask",
    "ports": [
      "WorkTask",
      "Project",
      "MaterialUsage",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "assignTask",
        "inputTypeName": "AssignTaskInput",
        "outputTypeName": "AssignTaskOutput",
        "input": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The work task to assign a worker and due date to."
          },
          {
            "name": "assignedWorkerId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Identifier of the field worker selected to perform this task."
          },
          {
            "name": "assignedWorkerName",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Display name of the selected field worker, denormalized onto the task."
          },
          {
            "name": "dueDate",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Deadline by which the task should be completed."
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
            "name": "assignedWorkerId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask"
          },
          {
            "name": "assignedWorkerName",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask"
          },
          {
            "name": "dueDate",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask"
          }
        ],
        "ports": [
          "WorkTask",
          "Project",
          "TimeLog"
        ],
        "rulesApplied": [
          "taskRequiresWorkerAssignment",
          "taskDueDateWithinProject"
        ],
        "transactional": true,
        "steps": [
          "1. Load the WorkTask by workTaskId via the WorkTask port (getById). If not found, throw a not-found error.",
          "2. Validate the WorkTask current status is not 'completed' or 'cancelled' — if it is, throw a validation error referencing the status guard.",
          "3. Apply rule taskRequiresWorkerAssignment: ensure assignedWorkerId and assignedWorkerName are both non-empty strings. If either is missing, throw a validation error with rule id 'taskRequiresWorkerAssignment'.",
          "4. Read projectId from the loaded WorkTask (contextResolution: selectedEntity origin). Load the parent Project via the Project port (getById). If not found, throw a not-found error.",
          "5. Apply rule taskDueDateWithinProject: validate that the input dueDate falls within [Project.startDate, Project.endDate] inclusive. If outside the range, throw a validation error with rule id 'taskDueDateWithinProject' and the project date bounds in details.",
          "6. Mutate the WorkTask in memory: set assignedWorkerId, assignedWorkerName, dueDate, status to 'assigned', and updatedAt to ctx.clock.now().",
          "7. Save the updated WorkTask via the WorkTask port inside the transaction.",
          "8. Build a TimeLog audit event record for the assignment (entityId: TimeLog, owner: WorkTask, purpose: audit) and append it through the TimeLog port inside the same transaction.",
          "9. Return the projected output fields: workTaskId, title, status, assignedWorkerId, assignedWorkerName, dueDate."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default assignTaskUsecase;

export const pipeline = [
  {
    "id": "assignTask__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/assignTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/assignTask.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts",
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
