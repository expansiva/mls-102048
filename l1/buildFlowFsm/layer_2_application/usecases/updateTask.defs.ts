/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTask.defs.ts" enhancement="_blank"/>

export const updateTaskUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateTask",
    "ports": [
      "WorkTask",
      "Project",
      "MaterialUsage",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "updateTask",
        "inputTypeName": "UpdateTaskInput",
        "outputTypeName": "UpdateTaskOutput",
        "input": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Identifier of the work task to update, provided via the route parameter."
          },
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Identifier of the parent project, used to validate the due date range."
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Updated short name of the task."
          },
          {
            "name": "description",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Updated detailed description of the work to be performed."
          },
          {
            "name": "assignedWorkerId",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Identifier of the field worker to assign or reassign to this task."
          },
          {
            "name": "assignedWorkerName",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Display name of the assigned field worker, denormalized from the platform user profile."
          },
          {
            "name": "dueDate",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Updated deadline by which the task should be completed."
          },
          {
            "name": "budgetedCost",
            "type": "number",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Updated planned cost budgeted for this task."
          },
          {
            "name": "sequenceNumber",
            "type": "number",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Updated position of the task in the simplified timeline sequence view."
          }
        ],
        "output": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The unchanged identifier of the updated work task."
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The updated title of the task."
          },
          {
            "name": "description",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The updated description of the task."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The current status of the task after the update."
          },
          {
            "name": "assignedWorkerId",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "The identifier of the assigned field worker after the update."
          },
          {
            "name": "assignedWorkerName",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "The display name of the assigned field worker after the update."
          },
          {
            "name": "dueDate",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The updated deadline of the task."
          },
          {
            "name": "budgetedCost",
            "type": "number",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "The updated budgeted cost of the task."
          },
          {
            "name": "sequenceNumber",
            "type": "number",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "The updated sequence number of the task."
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "The server timestamp at which the update was persisted."
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
          "1. Load the existing WorkTask by workTaskId via the WorkTask port (getById). If not found, reject with a not-found error.",
          "2. Load the parent Project by projectId via the Project port (getById). If not found, reject with a not-found error.",
          "3. Apply rule taskDueDateWithinProject: validate that the input dueDate falls within [project.startDate, project.endDate]. If outside the range, reject with a validation error including the rule id 'taskDueDateWithinProject'.",
          "4. Apply rule taskRequiresWorkerAssignment: if the existing WorkTask status is 'inProgress' and the input assignedWorkerId is null or empty, reject with a validation error including the rule id 'taskRequiresWorkerAssignment'.",
          "5. Mutate the WorkTask in memory: set title, description, assignedWorkerId, assignedWorkerName, dueDate, budgetedCost, and sequenceNumber from the input. Preserve workTaskId, projectId, status, startedAt, completedAt, cancelledAt, cancellationReason, and createdAt unchanged.",
          "6. Set updatedAt to ctx.clock.now() (systemDefault — not received from the client).",
          "7. Save the updated WorkTask via the WorkTask port (update) inside the transaction.",
          "8. Build a TimeLog audit event record for the WorkTask update and append it via the TimeLog port inside the same transaction.",
          "9. Return the updated WorkTask projection: workTaskId, title, description, status, assignedWorkerId, assignedWorkerName, dueDate, budgetedCost, sequenceNumber, updatedAt."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default updateTaskUsecase;

export const pipeline = [
  {
    "id": "updateTask__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateTask.defs.ts",
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
