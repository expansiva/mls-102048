/// <mls fileReference="_102048_/l4/buildFlowFsm/ontology/WorkTask.defs.ts" enhancement="_blank"/>

export const buildFlowFsmEntityWorkTask = {
  "entityId": "WorkTask",
  "title": "Work Task",
  "description": "A unit of work within a project, assigned to a field worker with a description, due date, and status that drives timeline tracking and delay risk identification.",
  "kind": "core",
  "ownership": "moduleOwned",
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
  "lifecycleStates": [
    "draft",
    "assigned",
    "inProgress",
    "completed",
    "cancelled"
  ]
} as const;

export default buildFlowFsmEntityWorkTask;
