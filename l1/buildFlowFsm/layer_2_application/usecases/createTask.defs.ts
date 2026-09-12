/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTask.defs.ts" enhancement="_blank"/>

export const createTaskUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createTask",
    "ports": [
      "WorkTask",
      "Project",
      "MaterialUsage",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "createTask",
        "inputTypeName": "CreateTaskInput",
        "outputTypeName": "CreateTaskOutput",
        "input": [
          {
            "name": "projectId",
            "type": "uuid",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Identifier of the parent project this task belongs to, taken from the current route."
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Short name of the task entered by the project manager."
          },
          {
            "name": "description",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Detailed description of the work to be performed."
          },
          {
            "name": "dueDate",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Deadline by which the task should be completed."
          },
          {
            "name": "assignedWorkerId",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Identifier of the field worker to assign to this task, if known at creation time."
          },
          {
            "name": "assignedWorkerName",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Display name of the assigned field worker, denormalized from the platform user profile."
          },
          {
            "name": "budgetedCost",
            "type": "number",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Planned cost budgeted for this task."
          },
          {
            "name": "sequenceNumber",
            "type": "number",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Position of the task in the simplified timeline sequence view."
          }
        ],
        "output": [
          {
            "name": "workTaskId",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "System-generated UUID for the new task."
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Title of the created task."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Initial lifecycle status, set to draft on creation."
          },
          {
            "name": "dueDate",
            "type": "string",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Deadline of the created task."
          },
          {
            "name": "assignedWorkerName",
            "type": "string",
            "required": false,
            "ofEntity": "WorkTask",
            "description": "Display name of the assigned field worker, if any."
          }
        ],
        "ports": [
          "WorkTask",
          "Project",
          "TimeLog"
        ],
        "rulesApplied": [
          "taskDueDateWithinProject",
          "taskRequiresWorkerAssignment"
        ],
        "transactional": true,
        "steps": [
          "1. Load the parent Project via Project port using projectId from routeParam to obtain startDate and endDate.",
          "2. Apply rule taskDueDateWithinProject: validate that the provided dueDate falls within [project.startDate, project.endDate]; if not, reject with validation error including the rule id.",
          "3. Apply rule taskRequiresWorkerAssignment: if assignedWorkerId is provided, assignedWorkerName must also be provided (and vice versa); if only one is present, reject with validation error including the rule id.",
          "4. Generate workTaskId via ctx.idGenerator, set status to 'draft', set createdAt and updatedAt to ctx.clock.now().",
          "5. Build the WorkTask aggregate with all provided fields plus system defaults and persist it through the WorkTask port inside a single transaction.",
          "6. Append a TimeLog audit event through the TimeLog port inside the same transaction, recording the creation of the work task.",
          "7. Return the created workTaskId, title, status, dueDate, and assignedWorkerName."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default createTaskUsecase;

export const pipeline = [
  {
    "id": "createTask__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createTask.defs.ts",
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
