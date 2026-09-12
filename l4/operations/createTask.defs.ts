/// <mls fileReference="_102048_/l4/operations/createTask.defs.ts" enhancement="_blank"/>

export const operationCreateTask = {
  "operationId": "createTask",
  "title": "Create a work task",
  "actor": "projectManager",
  "entity": "WorkTask",
  "kind": "create",
  "reads": [
    "Project"
  ],
  "writes": [
    "WorkTask"
  ],
  "rulesApplied": [
    "taskDueDateWithinProject",
    "taskRequiresWorkerAssignment"
  ],
  "story": {
    "actor": "projectManager",
    "goal": "Create a new work task within a project with a clear description, optional worker assignment, and a due date so field workers understand the scope and the timeline can be tracked.",
    "steps": [
      "The project manager opens the project detail view and initiates task creation.",
      "They provide a title, description, due date, and optionally assign a worker and set a budgeted cost and sequence number.",
      "The system validates that the due date falls within the project's start and end dates.",
      "The system creates the task with status draft, a generated UUID, and creation timestamps."
    ],
    "outcome": "A new WorkTask record is persisted in draft status, linked to the project, ready for assignment or further planning."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "WorkTask",
    "keyField": "WorkTask.workTaskId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "WorkTask.workTaskId",
      "WorkTask.title",
      "WorkTask.status",
      "WorkTask.dueDate",
      "WorkTask.assignedWorkerName"
    ]
  },
  "inputs": [
    {
      "inputId": "title",
      "fieldRef": "WorkTask.title",
      "required": true,
      "source": "userInput",
      "description": "Short name of the task entered by the project manager."
    },
    {
      "inputId": "description",
      "fieldRef": "WorkTask.description",
      "required": true,
      "source": "userInput",
      "description": "Detailed description of the work to be performed."
    },
    {
      "inputId": "dueDate",
      "fieldRef": "WorkTask.dueDate",
      "required": true,
      "source": "userInput",
      "description": "Deadline by which the task should be completed."
    },
    {
      "inputId": "assignedWorkerId",
      "fieldRef": "WorkTask.assignedWorkerId",
      "required": false,
      "source": "userInput",
      "description": "Identifier of the field worker to assign to this task, if known at creation time."
    },
    {
      "inputId": "assignedWorkerName",
      "fieldRef": "WorkTask.assignedWorkerName",
      "required": false,
      "source": "userInput",
      "description": "Display name of the assigned field worker, denormalized from the platform user profile."
    },
    {
      "inputId": "budgetedCost",
      "fieldRef": "WorkTask.budgetedCost",
      "required": false,
      "source": "userInput",
      "description": "Planned cost budgeted for this task."
    },
    {
      "inputId": "sequenceNumber",
      "fieldRef": "WorkTask.sequenceNumber",
      "required": false,
      "source": "userInput",
      "description": "Position of the task in the simplified timeline sequence view."
    },
    {
      "inputId": "projectId",
      "fieldRef": "WorkTask.projectId",
      "required": true,
      "source": "routeParam",
      "description": "Identifier of the parent project this task belongs to, taken from the current route."
    },
    {
      "inputId": "workTaskId",
      "fieldRef": "WorkTask.workTaskId",
      "required": true,
      "source": "systemDefault",
      "description": "System-generated UUID for the new task."
    },
    {
      "inputId": "status",
      "fieldRef": "WorkTask.status",
      "required": true,
      "source": "systemDefault",
      "description": "Initial lifecycle status, set to draft on creation."
    },
    {
      "inputId": "createdAt",
      "fieldRef": "WorkTask.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Record creation timestamp."
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "WorkTask.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Last update timestamp, set to the creation time."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "WorkTask.projectId",
      "source": "routeParam",
      "originRef": "routeParam.projectId",
      "description": "The projectId is extracted from the current route parameter identifying the open project."
    },
    {
      "targetRef": "WorkTask.workTaskId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "The backend generates a new UUID for the work task primary identifier."
    },
    {
      "targetRef": "WorkTask.status",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The backend sets the initial status to 'draft' as the default lifecycle entry state for new tasks."
    },
    {
      "targetRef": "WorkTask.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The backend sets createdAt to the current server timestamp at creation time."
    },
    {
      "targetRef": "WorkTask.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The backend sets updatedAt to the current server timestamp at creation time."
    }
  ],
  "acceptanceAssertions": [
    "After creation the WorkTask record exists with status 'draft'.",
    "The created WorkTask is linked to the project identified by the route projectId.",
    "The created WorkTask has the title and description exactly as provided by the project manager.",
    "The created WorkTask has a dueDate that falls within the parent project's start and end dates.",
    "If a worker is provided, the created WorkTask includes both assignedWorkerId and assignedWorkerName.",
    "The created WorkTask has a system-generated workTaskId and non-null createdAt and updatedAt timestamps."
  ],
  "pageId": "workTaskLifecycle",
  "commandName": "createTask",
  "bffName": "buildFlowFsm.workTaskLifecycle.createTask",
  "capability": {
    "capabilityId": "workTaskLifecycle",
    "title": "Work Task Lifecycle",
    "actor": "projectManager",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateTask;
