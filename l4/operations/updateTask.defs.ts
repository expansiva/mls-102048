/// <mls fileReference="_102048_/l4/operations/updateTask.defs.ts" enhancement="_blank"/>

export const operationUpdateTask = {
  "operationId": "updateTask",
  "title": "Edit task details or reassign",
  "actor": "projectManager",
  "entity": "WorkTask",
  "kind": "update",
  "reads": [
    "WorkTask",
    "Project"
  ],
  "writes": [
    "WorkTask"
  ],
  "rulesApplied": [
    "taskRequiresWorkerAssignment",
    "taskDueDateWithinProject"
  ],
  "story": {
    "actor": "projectManager",
    "goal": "Edit a work task's details (title, description, due date, budget, sequence) or reassign it to a different field worker to keep the project on track.",
    "steps": [
      "The project manager selects a work task from the project detail view.",
      "The system loads the current task details and the parent project's date range for validation.",
      "The project manager modifies editable fields such as title, description, due date, assigned worker, budgeted cost, or sequence number.",
      "The system validates that the due date falls within the project start and end dates and that a worker is assigned if the task is in progress.",
      "The system persists the updated task and refreshes the updatedAt timestamp."
    ],
    "outcome": "The work task is updated with the new details or assignment, and the project timeline reflects the changes."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "WorkTask",
    "keyField": "WorkTask.workTaskId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "WorkTask.workTaskId",
      "WorkTask.title",
      "WorkTask.description",
      "WorkTask.status",
      "WorkTask.assignedWorkerId",
      "WorkTask.assignedWorkerName",
      "WorkTask.dueDate",
      "WorkTask.budgetedCost",
      "WorkTask.sequenceNumber",
      "WorkTask.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "workTaskId",
      "fieldRef": "WorkTask.workTaskId",
      "required": true,
      "source": "routeParam",
      "description": "Identifier of the work task to update, provided via the route parameter."
    },
    {
      "inputId": "projectId",
      "fieldRef": "WorkTask.projectId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identifier of the parent project, used to validate the due date range."
    },
    {
      "inputId": "title",
      "fieldRef": "WorkTask.title",
      "required": true,
      "source": "userInput",
      "description": "Updated short name of the task."
    },
    {
      "inputId": "description",
      "fieldRef": "WorkTask.description",
      "required": true,
      "source": "userInput",
      "description": "Updated detailed description of the work to be performed."
    },
    {
      "inputId": "assignedWorkerId",
      "fieldRef": "WorkTask.assignedWorkerId",
      "required": false,
      "source": "userInput",
      "description": "Identifier of the field worker to assign or reassign to this task."
    },
    {
      "inputId": "assignedWorkerName",
      "fieldRef": "WorkTask.assignedWorkerName",
      "required": false,
      "source": "userInput",
      "description": "Display name of the assigned field worker, denormalized from the platform user profile."
    },
    {
      "inputId": "dueDate",
      "fieldRef": "WorkTask.dueDate",
      "required": true,
      "source": "userInput",
      "description": "Updated deadline by which the task should be completed."
    },
    {
      "inputId": "budgetedCost",
      "fieldRef": "WorkTask.budgetedCost",
      "required": false,
      "source": "userInput",
      "description": "Updated planned cost budgeted for this task."
    },
    {
      "inputId": "sequenceNumber",
      "fieldRef": "WorkTask.sequenceNumber",
      "required": false,
      "source": "userInput",
      "description": "Updated position of the task in the simplified timeline sequence view."
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "WorkTask.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp of the update, set to the current server time."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "WorkTask.workTaskId",
      "source": "routeParam",
      "originRef": "routeParam.workTaskId",
      "description": "The work task id is extracted from the route parameter identifying which task the project manager opened for editing."
    },
    {
      "targetRef": "WorkTask.projectId",
      "source": "selectedEntity",
      "originRef": "WorkTask.projectId",
      "description": "The parent project id is read from the currently selected work task record to validate the due date against the project date range."
    },
    {
      "targetRef": "WorkTask.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The updatedAt timestamp is set to the current server time at the moment the update is persisted."
    }
  ],
  "acceptanceAssertions": [
    "After confirmation the WorkTask record exists with the updated title, description, dueDate, assignedWorkerId, budgetedCost, and sequenceNumber values.",
    "If the dueDate is modified, it must fall within the parent project's start and end dates, otherwise the update is rejected.",
    "If the task status is inProgress, the task must have a non-null assignedWorkerId, otherwise the update is rejected.",
    "The updatedAt field is refreshed to the current server timestamp after the update is persisted.",
    "The WorkTask workTaskId and projectId remain unchanged after the update."
  ],
  "pageId": "updateTask",
  "commandName": "updateTask",
  "bffName": "buildFlowFsm.updateTask.updateTask",
  "capability": {
    "capabilityId": "updateTask",
    "title": "Edit task details or reassign",
    "actor": "projectManager",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationUpdateTask;
