/// <mls fileReference="_102048_/l4/operations/updateProjectStatus.defs.ts" enhancement="_blank"/>

export const operationUpdateProjectStatus = {
  "operationId": "updateProjectStatus",
  "title": "Update project status",
  "actor": "companyAdmin",
  "entity": "Project",
  "kind": "update",
  "reads": [
    "Project",
    "Client"
  ],
  "writes": [
    "Project"
  ],
  "rulesApplied": [
    "projectRequiresClient",
    "projectDateRangeValid",
    "dashboardShowsActiveOnly"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "Change the lifecycle status of a project — activate, complete, or cancel — so the project reflects its current phase and appears or disappears from the dashboard accordingly.",
    "steps": [
      "Select a project from the project list or detail view",
      "Choose a new status: active, completed, or cancelled",
      "If cancelling, enter a cancellation reason",
      "Confirm the status change"
    ],
    "outcome": "The project status is updated, relevant timestamps (completedAt, cancelledAt, updatedAt) are set, and the project appears on or is excluded from the dashboard based on its new status."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "Project",
    "keyField": "Project.projectId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Project.projectId",
      "Project.name",
      "Project.status",
      "Project.completedAt",
      "Project.cancelledAt",
      "Project.cancellationReason",
      "Project.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "projectId",
      "fieldRef": "Project.projectId",
      "required": true,
      "source": "selectedEntity",
      "description": "The project whose status is being changed"
    },
    {
      "inputId": "status",
      "fieldRef": "Project.status",
      "required": true,
      "source": "userInput",
      "description": "The new lifecycle status for the project (active, completed, or cancelled)"
    },
    {
      "inputId": "cancellationReason",
      "fieldRef": "Project.cancellationReason",
      "required": false,
      "source": "userInput",
      "description": "Reason recorded when the project is cancelled; required only when status is set to cancelled"
    },
    {
      "inputId": "completedAt",
      "fieldRef": "Project.completedAt",
      "required": false,
      "source": "systemDefault",
      "description": "Timestamp set automatically when the project is marked completed"
    },
    {
      "inputId": "cancelledAt",
      "fieldRef": "Project.cancelledAt",
      "required": false,
      "source": "systemDefault",
      "description": "Timestamp set automatically when the project is cancelled"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "Project.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp of the last update, refreshed on every status change"
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Project.projectId",
      "source": "selectedEntity",
      "originRef": "Project.projectId",
      "description": "Resolved from the currently selected project in the workspace — the backend reads the projectId from the selected entity context"
    },
    {
      "targetRef": "Project.completedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Set to the current server timestamp when the project transitions to completed status"
    },
    {
      "targetRef": "Project.cancelledAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Set to the current server timestamp when the project transitions to cancelled status"
    },
    {
      "targetRef": "Project.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Set to the current server timestamp on every status update"
    }
  ],
  "acceptanceAssertions": [
    "After updating status to active, the project exists with status 'active' and appears on the dashboard",
    "If the project has no linked client (clientId is null), activation to 'active' is rejected with a validation error",
    "After updating status to 'completed', the project has status 'completed' with completedAt set to the current timestamp",
    "After updating status to 'cancelled', the project has status 'cancelled' with cancelledAt set to the current timestamp and cancellationReason recorded",
    "If status is set to 'cancelled' without a cancellationReason, the update is rejected with a validation error",
    "After any status change, the project's updatedAt is refreshed to the current timestamp",
    "After updating status to 'cancelled' or 'completed', the project no longer appears on the dashboard which shows active projects only"
  ],
  "pageId": "projectLifecycle",
  "commandName": "updateProjectStatus",
  "bffName": "buildFlowFsm.projectLifecycle.updateProjectStatus",
  "capability": {
    "capabilityId": "projectLifecycle",
    "title": "Project Lifecycle",
    "actor": "companyAdmin",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationUpdateProjectStatus;
