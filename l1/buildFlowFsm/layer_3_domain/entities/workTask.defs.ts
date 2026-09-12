/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.defs.ts" enhancement="_blank"/>

export const workTaskDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "WorkTask",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "WorkTask",
    "fields": [
      {
        "fieldId": "workTaskId",
        "type": "uuid",
        "required": true,
        "description": "Primary identifier for the work task."
      },
      {
        "fieldId": "projectId",
        "type": "uuid",
        "required": true,
        "description": "Reference to the parent project this task belongs to."
      },
      {
        "fieldId": "title",
        "type": "string",
        "required": true,
        "description": "Short name of the task."
      },
      {
        "fieldId": "description",
        "type": "text",
        "required": true,
        "description": "Detailed description of the work to be performed."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Current lifecycle state of the task.",
        "enum": [
          "draft",
          "assigned",
          "inProgress",
          "completed",
          "cancelled"
        ]
      },
      {
        "fieldId": "assignedWorkerId",
        "type": "uuid",
        "required": false,
        "description": "Identifier of the field worker assigned to this task, sourced from the platform user profile."
      },
      {
        "fieldId": "assignedWorkerName",
        "type": "string",
        "required": false,
        "description": "Display name of the assigned field worker, denormalized from the platform user profile."
      },
      {
        "fieldId": "dueDate",
        "type": "date",
        "required": true,
        "description": "Deadline by which the task should be completed; must fall within the project start and end dates."
      },
      {
        "fieldId": "budgetedCost",
        "type": "money",
        "required": false,
        "description": "Planned cost budgeted for this task used in budget vs actual comparison."
      },
      {
        "fieldId": "sequenceNumber",
        "type": "number",
        "required": false,
        "description": "Position of the task in the simplified timeline sequence view."
      },
      {
        "fieldId": "startedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the task was moved to inProgress."
      },
      {
        "fieldId": "completedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the task was marked completed."
      },
      {
        "fieldId": "cancelledAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the task was cancelled."
      },
      {
        "fieldId": "cancellationReason",
        "type": "text",
        "required": false,
        "description": "Reason recorded when a task is cancelled."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Record creation timestamp."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Last update timestamp."
      }
    ],
    "statusEnum": [
      "draft",
      "assigned",
      "inProgress",
      "completed",
      "cancelled"
    ],
    "invariants": [
      "dueDate must fall within the parent project startDate and endDate",
      "status transitions: draft→assigned, assigned→inProgress, inProgress→completed, draft→cancelled, assigned→cancelled, inProgress→cancelled",
      "assignedWorkerId and assignedWorkerName must be set when status is assigned, inProgress, or completed",
      "startedAt must be set when status is inProgress or completed",
      "completedAt must be set when status is completed",
      "cancelledAt and cancellationReason must be set when status is cancelled",
      "budgetedCost must be a non-negative monetary value if provided"
    ],
    "valueObjects": []
  }
} as const;

export default workTaskDomainEntity;

export const pipeline = [
  {
    "id": "workTask__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.defs.ts",
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
