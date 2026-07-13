/// <mls fileReference="_102048_/l4/operations/viewDashboard.defs.ts" enhancement="_blank"/>

export const operationViewDashboard = {
  "operationId": "viewDashboard",
  "title": "Review project dashboard",
  "actor": "companyAdmin",
  "entity": "Project",
  "kind": "query",
  "reads": [
    "Project",
    "Client",
    "WorkTask",
    "TimeLog",
    "MaterialUsage",
    "ChangeOrder"
  ],
  "writes": [],
  "rulesApplied": [
    "dashboardShowsActiveOnly",
    "jobCostCalculation"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "See all active projects at a glance with budget vs actual cost summaries and identify overdue or upcoming tasks that may need intervention.",
    "steps": [
      "The admin opens the project dashboard.",
      "The system loads all projects with status 'active' for the current company.",
      "For each active project, the system calculates actual cost as (time log hours × worker rate) + material costs + approved change order amounts.",
      "The system retrieves upcoming and overdue tasks for each active project.",
      "The dashboard presents each project's name, budget, actual cost, timeline, and task delay risk indicators."
    ],
    "outcome": "The admin sees a consolidated view of active projects with budget health and task delay risk, enabling timely intervention on projects trending over budget or falling behind schedule."
  },
  "accessPattern": {
    "kind": "list",
    "entity": "Project",
    "keyField": "Project.projectId",
    "pagination": "optional",
    "selection": "none",
    "output": [
      "Project.projectId",
      "Project.name",
      "Project.budget",
      "Project.startDate",
      "Project.endDate",
      "Project.status",
      "Project.clientId",
      "Client.name",
      "WorkTask.title",
      "WorkTask.dueDate",
      "WorkTask.status",
      "TimeLog.hours",
      "MaterialUsage.cost",
      "ChangeOrder.amount",
      "ChangeOrder.status"
    ]
  },
  "inputs": [
    {
      "inputId": "actorId",
      "fieldRef": "Project.projectId",
      "required": true,
      "source": "actorSession",
      "description": "The admin viewing the dashboard; used to scope projects to the admin's company."
    },
    {
      "inputId": "activeCompanyId",
      "fieldRef": "Project.clientId",
      "required": true,
      "source": "businessContext",
      "description": "The company context that scopes which projects are visible on the dashboard."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "actorSession.actorId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "Resolved from the authenticated admin session to identify the viewer and scope data to their company."
    },
    {
      "targetRef": "businessContext.activeCompanyId",
      "source": "businessContext",
      "originRef": "businessContext.activeCompanyId",
      "description": "Resolved from the current business context to filter projects belonging to the admin's company."
    }
  ],
  "acceptanceAssertions": [
    "Only projects with status 'active' appear on the dashboard; draft, completed, and cancelled projects are excluded.",
    "Each active project on the dashboard displays its name, budget, start date, and end date.",
    "For each active project, the actual cost is calculated as (time log hours × worker rate) + material costs + approved change order amounts and shown alongside the budget.",
    "Overdue tasks (past due date with incomplete status) and upcoming tasks (approaching due date) are listed per active project so the admin can identify delay risks.",
    "The dashboard is scoped to projects belonging to the admin's company as resolved from the business context."
  ],
  "pageId": "viewDashboard",
  "commandName": "viewDashboard",
  "bffName": "buildFlowFsm.viewDashboard.viewDashboard",
  "capability": {
    "capabilityId": "viewDashboard",
    "title": "Review project dashboard",
    "actor": "companyAdmin",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewDashboard;
