/// <mls fileReference="_102048_/l4/operations/browseTasks.defs.ts" enhancement="_blank"/>

export const operationBrowseTasks = {
  "operationId": "browseTasks",
  "title": "Browse assigned tasks",
  "actor": "fieldWorker",
  "entity": "WorkTask",
  "kind": "query",
  "reads": [
    "WorkTask"
  ],
  "writes": [],
  "rulesApplied": [
    "timelineIsSimplified",
    "delayRiskCalculation"
  ],
  "story": {
    "actor": "fieldWorker",
    "goal": "See which tasks are assigned to me and what is due today so I know what to work on.",
    "steps": [
      "The field worker opens the app and the system loads all WorkTask records where assignedWorkerId matches their session actor ID.",
      "The tasks are sorted by dueDate so the most urgent work appears first.",
      "Each task card shows the title, description, status, and due date, with delay risk indicated by status and proximity to the due date."
    ],
    "outcome": "The field worker sees a prioritized list of their assigned tasks and can pick one to start working on."
  },
  "accessPattern": {
    "kind": "list",
    "entity": "WorkTask",
    "keyField": "WorkTask.workTaskId",
    "pagination": "optional",
    "selection": "none",
    "output": [
      "WorkTask.workTaskId",
      "WorkTask.title",
      "WorkTask.description",
      "WorkTask.status",
      "WorkTask.dueDate",
      "WorkTask.projectId",
      "WorkTask.sequenceNumber",
      "WorkTask.assignedWorkerName",
      "WorkTask.startedAt",
      "WorkTask.completedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "assignedWorkerId",
      "fieldRef": "WorkTask.assignedWorkerId",
      "required": true,
      "source": "actorSession",
      "description": "The field worker's identifier from the session, used to filter only tasks assigned to them."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "WorkTask.assignedWorkerId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "The backend resolves the field worker's actor ID from the authenticated session and filters WorkTask records where assignedWorkerId equals that actor ID."
    }
  ],
  "acceptanceAssertions": [
    "The returned list contains only WorkTask records where assignedWorkerId matches the current field worker's actor session ID.",
    "Each task in the list includes workTaskId, title, description, status, and dueDate.",
    "Tasks are sorted by dueDate ascending so the field worker sees the most urgent tasks first.",
    "The list reflects delay risk derived from task status and proximity to dueDate per the delayRiskCalculation rule.",
    "The timeline view is a simplified sequence (by sequenceNumber) and does not imply CPM critical-path scheduling."
  ],
  "pageId": "browseTasks",
  "commandName": "browseTasks",
  "bffName": "buildFlowFsm.browseTasks.browseTasks",
  "capability": {
    "capabilityId": "browseTasks",
    "title": "Browse assigned tasks",
    "actor": "fieldWorker",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationBrowseTasks;
