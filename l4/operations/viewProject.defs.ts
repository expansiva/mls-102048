/// <mls fileReference="_102048_/l4/operations/viewProject.defs.ts" enhancement="_blank"/>

export const operationViewProject = {
  "operationId": "viewProject",
  "title": "View project detail",
  "actor": "companyAdmin",
  "entity": "Project",
  "kind": "view",
  "reads": [
    "Project",
    "Client",
    "WorkTask",
    "TimeLog",
    "MaterialUsage",
    "ChangeOrder",
    "Invoice",
    "StatusReport"
  ],
  "writes": [],
  "rulesApplied": [
    "jobCostCalculation",
    "dashboardShowsActiveOnly"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "Drill into a specific project from the dashboard to see its full detail — task list, time logs, material costs, budget vs actual, and delay risk — so they can understand where the project stands and whether intervention is needed.",
    "steps": [
      "The admin selects a project from the dashboard (which shows active projects only).",
      "The system loads the project detail by projectId, including all core fields (name, site address, budget, dates, status).",
      "The system fetches related WorkTasks, TimeLogs, MaterialUsage records, approved ChangeOrders, Invoices, and StatusReports for the project.",
      "The system computes the consolidated cost summary using the job cost formula: (time log hours × worker rate) + material costs + approved change order amounts.",
      "The system evaluates delay risk for tasks that are behind schedule or approaching their due date without progress.",
      "The admin reviews the complete project detail to assess overall progress and identify areas needing intervention."
    ],
    "outcome": "The admin sees a comprehensive project detail view with tasks, costs, timeline, and delay risk indicators, enabling informed decisions about project intervention."
  },
  "accessPattern": {
    "kind": "getById",
    "entity": "Project",
    "keyField": "Project.projectId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Project.projectId",
      "Project.clientId",
      "Project.name",
      "Project.siteAddress",
      "Project.budget",
      "Project.startDate",
      "Project.endDate",
      "Project.status",
      "Project.completedAt",
      "Project.cancelledAt",
      "Project.cancellationReason",
      "Project.createdAt",
      "Project.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "projectId",
      "fieldRef": "Project.projectId",
      "required": true,
      "source": "routeParam",
      "description": "The unique identifier of the project to view, provided via the route parameter."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Project.projectId",
      "source": "routeParam",
      "originRef": "routeParam.projectId",
      "description": "The projectId is extracted from the URL route parameter to load the single project record."
    },
    {
      "targetRef": "actorSession.actorId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "The authenticated companyAdmin's actorId is resolved from the session to authorize access to the project detail."
    },
    {
      "targetRef": "businessContext.activeCompanyId",
      "source": "businessContext",
      "originRef": "businessContext.activeCompanyId",
      "description": "The active company is resolved from the business context to scope the project lookup to the admin's company."
    }
  ],
  "acceptanceAssertions": [
    "The project detail view displays the project name, site address, budget, start date, end date, and current lifecycle status for the requested projectId.",
    "The view shows the task list (WorkTask records) associated with the project so the admin can see what work is planned or in progress.",
    "The view presents a consolidated cost summary where actual cost equals (time log hours × worker rate) + material costs + approved change order amounts, compared against the project budget.",
    "The view includes time logs and material usage records that explain the budget variance for the project.",
    "The view surfaces delay risk suggestions for tasks that are behind schedule or approaching their due date without progress.",
    "The view shows approved change orders linked to the project so the admin can see scope adjustments that affect cost.",
    "Only projects belonging to the admin's active company are accessible; a projectId outside the company scope returns no result."
  ],
  "pageId": "viewProject",
  "commandName": "viewProject",
  "bffName": "buildFlowFsm.viewProject.viewProject",
  "capability": {
    "capabilityId": "viewProject",
    "title": "View project detail",
    "actor": "companyAdmin",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewProject;
