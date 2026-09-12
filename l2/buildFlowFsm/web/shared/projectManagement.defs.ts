/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/projectManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "projectManagement",
  "pageName": "Project Management & Dashboard",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmProjectManagementBase",
  "routePattern": "/buildFlowFsm/projectManagement/:projectId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:projectLifecycle",
    "operation:createProject",
    "operation:updateProjectStatus",
    "operation:updateProject",
    "operation:viewProject",
    "operation:viewDashboard"
  ],
  "operationIds": [
    "createProject",
    "updateProjectStatus",
    "updateProject",
    "viewProject",
    "viewDashboard"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "projectManagement",
    "workspaceKind": "workflow",
    "workflowId": "projectLifecycle",
    "actor": "companyAdmin",
    "entity": "Project",
    "owners": [
      {
        "kind": "workflow",
        "id": "projectLifecycle",
        "defPath": "_102048_/l4/workflows/projectLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createProject",
        "defPath": "_102048_/l4/operations/createProject.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateProjectStatus",
        "defPath": "_102048_/l4/operations/updateProjectStatus.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateProject",
        "defPath": "_102048_/l4/operations/updateProject.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewProject",
        "defPath": "_102048_/l4/operations/viewProject.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewDashboard",
        "defPath": "_102048_/l4/operations/viewDashboard.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "Enter the project name, select or create the client, and fill in the site address so the project is properly identified and linked to the right customer.",
        "Set the project budget in USD and the planned start and end dates so that job costing and timeline tracking have a baseline to compare against.",
        "Activate the project so it appears on the dashboard and the project manager can begin adding tasks."
      ],
      "operations": [
        {
          "operationId": "createProject",
          "commandName": "createProject",
          "steps": [
            "The admin enters the project name, selects an existing client, and fills in the site address.",
            "The admin sets the project budget in USD and the planned start and end dates.",
            "The admin sets the project status (draft or active) and confirms creation.",
            "The system validates the budget is positive, the date range is valid, and the client exists, then persists the project record with a generated id and timestamps."
          ]
        },
        {
          "operationId": "updateProjectStatus",
          "commandName": "updateProjectStatus",
          "steps": [
            "Select a project from the project list or detail view",
            "Choose a new status: active, completed, or cancelled",
            "If cancelling, enter a cancellation reason",
            "Confirm the status change"
          ]
        },
        {
          "operationId": "updateProject",
          "commandName": "updateProject",
          "steps": [
            "The admin opens an existing project from the project list or detail view.",
            "The admin modifies one or more editable fields: name, client, site address, budget, start date, or end date.",
            "The system validates that the budget is a positive USD amount and that the start date is on or before the end date.",
            "If the admin sets the status to active, the system verifies a client is linked before saving.",
            "The system persists the updated project fields and refreshes the updatedAt timestamp."
          ]
        },
        {
          "operationId": "viewProject",
          "commandName": "viewProject",
          "steps": [
            "The admin selects a project from the dashboard (which shows active projects only).",
            "The system loads the project detail by projectId, including all core fields (name, site address, budget, dates, status).",
            "The system fetches related WorkTasks, TimeLogs, MaterialUsage records, approved ChangeOrders, Invoices, and StatusReports for the project.",
            "The system computes the consolidated cost summary using the job cost formula: (time log hours × worker rate) + material costs + approved change order amounts.",
            "The system evaluates delay risk for tasks that are behind schedule or approaching their due date without progress.",
            "The admin reviews the complete project detail to assess overall progress and identify areas needing intervention."
          ]
        },
        {
          "operationId": "viewDashboard",
          "commandName": "viewDashboard",
          "steps": [
            "The admin opens the project dashboard.",
            "The system loads all projects with status 'active' for the current company.",
            "For each active project, the system calculates actual cost as (time log hours × worker rate) + material costs + approved change order amounts.",
            "The system retrieves upcoming and overdue tasks for each active project.",
            "The dashboard presents each project's name, budget, actual cost, timeline, and task delay risk indicators."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/projectManagement.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/projectManagement.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/projectManagement.defs.ts",
    "layoutId": "projectManagement.page11"
  },
  "states": [
    {
      "stateKey": "ui.projectManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.action.createProject.status",
      "name": "createProjectState",
      "kind": "actionStatus",
      "actionRef": "createProject",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.projectManagement.input.createProject.name",
      "name": "createProjectName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createProject",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.createProject.clientId",
      "name": "createProjectClientId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createProject",
        "direction": "input",
        "field": "clientId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.createProject.siteAddress",
      "name": "createProjectSiteAddress",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createProject",
        "direction": "input",
        "field": "siteAddress"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.createProject.budget",
      "name": "createProjectBudget",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createProject",
        "direction": "input",
        "field": "budget"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.createProject.startDate",
      "name": "createProjectStartDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createProject",
        "direction": "input",
        "field": "startDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.createProject.endDate",
      "name": "createProjectEndDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createProject",
        "direction": "input",
        "field": "endDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.createProject.status",
      "name": "createProjectStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createProject",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.action.updateProjectStatus.status",
      "name": "updateProjectStatusState",
      "kind": "actionStatus",
      "actionRef": "updateProjectStatus",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.projectManagement.input.updateProjectStatus.projectId",
      "name": "updateProjectStatusProjectId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "updateProjectStatus",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProjectStatus.status",
      "name": "updateProjectStatusStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProjectStatus",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProjectStatus.cancellationReason",
      "name": "updateProjectStatusCancellationReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProjectStatus",
        "direction": "input",
        "field": "cancellationReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.action.updateProject.status",
      "name": "updateProjectState",
      "kind": "actionStatus",
      "actionRef": "updateProject",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.projectManagement.input.updateProject.projectId",
      "name": "updateProjectProjectId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "updateProject",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProject.name",
      "name": "updateProjectName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProject",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProject.clientId",
      "name": "updateProjectClientId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProject",
        "direction": "input",
        "field": "clientId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProject.siteAddress",
      "name": "updateProjectSiteAddress",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProject",
        "direction": "input",
        "field": "siteAddress"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProject.budget",
      "name": "updateProjectBudget",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProject",
        "direction": "input",
        "field": "budget"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProject.startDate",
      "name": "updateProjectStartDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProject",
        "direction": "input",
        "field": "startDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.input.updateProject.endDate",
      "name": "updateProjectEndDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateProject",
        "direction": "input",
        "field": "endDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.action.viewProject.status",
      "name": "viewProjectState",
      "kind": "actionStatus",
      "actionRef": "viewProject",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.projectManagement.input.viewProject.projectId",
      "name": "viewProjectProjectId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "viewProject",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.data.viewProject",
      "name": "viewProjectData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewProject",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.projectManagement.action.viewDashboard.status",
      "name": "viewDashboardState",
      "kind": "actionStatus",
      "actionRef": "viewDashboard",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.projectManagement.data.viewDashboard",
      "name": "viewDashboardData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "viewDashboard",
        "direction": "output"
      },
      "outputShape": "paginated",
      "collection": false,
      "defaultValue": {
        "items": [],
        "total": 0
      }
    },
    {
      "stateKey": "ui.projectManagement.businessContext.activeCompanyId",
      "name": "activeCompanyId",
      "kind": "businessContext",
      "source": "businessContext.activeCompanyId",
      "targetRef": "businessContext.activeCompanyId",
      "required": true,
      "selector": "company",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.projectManagement.output.createProject",
      "name": "OutputCreateProject",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.projectManagement.output.updateProjectStatus",
      "name": "OutputUpdateProjectStatus",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.projectManagement.output.updateProject",
      "name": "OutputUpdateProject",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.projectManagement.layout.fld_activeCompanyId",
      "name": "LayoutFldActiveCompanyId",
      "kind": "layoutState",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "createProject",
      "kind": "command",
      "commandRef": "createProject",
      "routeKey": "buildFlowFsm.projectLifecycle.createProject",
      "purpose": "Create a new project",
      "methodName": "createProject",
      "handlerName": "handleCreateProjectClick",
      "inputStateKeys": [
        "ui.projectManagement.input.createProject.name",
        "ui.projectManagement.input.createProject.clientId",
        "ui.projectManagement.input.createProject.siteAddress",
        "ui.projectManagement.input.createProject.budget",
        "ui.projectManagement.input.createProject.startDate",
        "ui.projectManagement.input.createProject.endDate",
        "ui.projectManagement.input.createProject.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.projectManagement.output.createProject"
      ],
      "statusStateKey": "ui.projectManagement.action.createProject.status",
      "refreshActionIds": [
        "viewProject",
        "viewDashboard"
      ]
    },
    {
      "actionId": "updateProjectStatus",
      "kind": "command",
      "commandRef": "updateProjectStatus",
      "routeKey": "buildFlowFsm.projectLifecycle.updateProjectStatus",
      "purpose": "Update project status",
      "methodName": "updateProjectStatus",
      "handlerName": "handleUpdateProjectStatusClick",
      "inputStateKeys": [
        "ui.projectManagement.input.updateProjectStatus.projectId",
        "ui.projectManagement.input.updateProjectStatus.status",
        "ui.projectManagement.input.updateProjectStatus.cancellationReason"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.projectManagement.input.updateProjectStatus.projectId"
      ],
      "outputStateKeys": [
        "ui.projectManagement.output.updateProjectStatus"
      ],
      "statusStateKey": "ui.projectManagement.action.updateProjectStatus.status",
      "refreshActionIds": [
        "viewProject",
        "viewDashboard"
      ]
    },
    {
      "actionId": "updateProject",
      "kind": "command",
      "commandRef": "updateProject",
      "routeKey": "buildFlowFsm.updateProject.updateProject",
      "purpose": "Edit project details",
      "methodName": "updateProject",
      "handlerName": "handleUpdateProjectClick",
      "inputStateKeys": [
        "ui.projectManagement.input.updateProject.projectId",
        "ui.projectManagement.input.updateProject.name",
        "ui.projectManagement.input.updateProject.clientId",
        "ui.projectManagement.input.updateProject.siteAddress",
        "ui.projectManagement.input.updateProject.budget",
        "ui.projectManagement.input.updateProject.startDate",
        "ui.projectManagement.input.updateProject.endDate"
      ],
      "routeParamInputStateKeys": [
        "ui.projectManagement.input.updateProject.projectId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.projectManagement.output.updateProject"
      ],
      "statusStateKey": "ui.projectManagement.action.updateProject.status",
      "refreshActionIds": [
        "viewProject",
        "viewDashboard"
      ]
    },
    {
      "actionId": "viewProject",
      "kind": "query",
      "commandRef": "viewProject",
      "routeKey": "buildFlowFsm.viewProject.viewProject",
      "purpose": "View project detail",
      "methodName": "loadViewProject",
      "handlerName": "handleViewProjectClick",
      "inputStateKeys": [
        "ui.projectManagement.input.viewProject.projectId"
      ],
      "routeParamInputStateKeys": [
        "ui.projectManagement.input.viewProject.projectId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.projectManagement.data.viewProject"
      ],
      "statusStateKey": "ui.projectManagement.action.viewProject.status"
    },
    {
      "actionId": "viewDashboard",
      "kind": "query",
      "commandRef": "viewDashboard",
      "routeKey": "buildFlowFsm.viewDashboard.viewDashboard",
      "purpose": "Review project dashboard",
      "methodName": "loadViewDashboard",
      "handlerName": "handleViewDashboardClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.projectManagement.data.viewDashboard"
      ],
      "statusStateKey": "ui.projectManagement.action.viewDashboard.status"
    },
    {
      "actionId": "set.createProjectName",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.createProject.name",
      "methodName": "setCreateProjectName",
      "handlerName": "handleCreateProjectNameChange"
    },
    {
      "actionId": "set.createProjectClientId",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.createProject.clientId",
      "methodName": "setCreateProjectClientId",
      "handlerName": "handleCreateProjectClientIdChange"
    },
    {
      "actionId": "set.createProjectSiteAddress",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.createProject.siteAddress",
      "methodName": "setCreateProjectSiteAddress",
      "handlerName": "handleCreateProjectSiteAddressChange"
    },
    {
      "actionId": "set.createProjectBudget",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.createProject.budget",
      "methodName": "setCreateProjectBudget",
      "handlerName": "handleCreateProjectBudgetChange"
    },
    {
      "actionId": "set.createProjectStartDate",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.createProject.startDate",
      "methodName": "setCreateProjectStartDate",
      "handlerName": "handleCreateProjectStartDateChange"
    },
    {
      "actionId": "set.createProjectEndDate",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.createProject.endDate",
      "methodName": "setCreateProjectEndDate",
      "handlerName": "handleCreateProjectEndDateChange"
    },
    {
      "actionId": "set.createProjectStatus",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.createProject.status",
      "methodName": "setCreateProjectStatus",
      "handlerName": "handleCreateProjectStatusChange"
    },
    {
      "actionId": "set.updateProjectStatusProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProjectStatus.projectId",
      "methodName": "setUpdateProjectStatusProjectId",
      "handlerName": "handleUpdateProjectStatusProjectIdChange"
    },
    {
      "actionId": "set.updateProjectStatusStatus",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProjectStatus.status",
      "methodName": "setUpdateProjectStatusStatus",
      "handlerName": "handleUpdateProjectStatusStatusChange"
    },
    {
      "actionId": "set.updateProjectStatusCancellationReason",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProjectStatus.cancellationReason",
      "methodName": "setUpdateProjectStatusCancellationReason",
      "handlerName": "handleUpdateProjectStatusCancellationReasonChange"
    },
    {
      "actionId": "set.updateProjectProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProject.projectId",
      "methodName": "setUpdateProjectProjectId",
      "handlerName": "handleUpdateProjectProjectIdChange"
    },
    {
      "actionId": "set.updateProjectName",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProject.name",
      "methodName": "setUpdateProjectName",
      "handlerName": "handleUpdateProjectNameChange"
    },
    {
      "actionId": "set.updateProjectClientId",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProject.clientId",
      "methodName": "setUpdateProjectClientId",
      "handlerName": "handleUpdateProjectClientIdChange"
    },
    {
      "actionId": "set.updateProjectSiteAddress",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProject.siteAddress",
      "methodName": "setUpdateProjectSiteAddress",
      "handlerName": "handleUpdateProjectSiteAddressChange"
    },
    {
      "actionId": "set.updateProjectBudget",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProject.budget",
      "methodName": "setUpdateProjectBudget",
      "handlerName": "handleUpdateProjectBudgetChange"
    },
    {
      "actionId": "set.updateProjectStartDate",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProject.startDate",
      "methodName": "setUpdateProjectStartDate",
      "handlerName": "handleUpdateProjectStartDateChange"
    },
    {
      "actionId": "set.updateProjectEndDate",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.updateProject.endDate",
      "methodName": "setUpdateProjectEndDate",
      "handlerName": "handleUpdateProjectEndDateChange"
    },
    {
      "actionId": "set.viewProjectProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.projectManagement.input.viewProject.projectId",
      "methodName": "setViewProjectProjectId",
      "handlerName": "handleViewProjectProjectIdChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "viewProject",
      "stateKey": "ui.projectManagement.data.viewProject"
    },
    {
      "actionId": "viewDashboard",
      "stateKey": "ui.projectManagement.data.viewDashboard"
    }
  ],
  "businessContextRefs": [
    {
      "operationId": "viewProject",
      "contextKey": "activeCompanyId",
      "originRef": "businessContext.activeCompanyId",
      "targetRef": "businessContext.activeCompanyId",
      "required": true,
      "description": "The active company is resolved from the business context to scope the project lookup to the admin's company."
    }
  ],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "en",
    "activeLocales": [
      "en"
    ]
  },
  "i18n": {
    "section.dashboard.title": "Project Management & Dashboard",
    "section.createProject.title": "Create Project",
    "section.updateStatus.title": "Update Project Status",
    "section.updateProject.title": "Update Project Details",
    "organism.dashboardList.title": "Active Projects",
    "organism.projectDetail.title": "Project Detail",
    "organism.createProject.title": "New Project Setup",
    "organism.updateStatus.title": "Change Status",
    "organism.updateProject.title": "Edit Project",
    "intent.dashboardContext.title": "Company Context",
    "intent.dashboardCards.title": "Active Project Cards",
    "intent.dashboardCards.empty": "No active projects found.",
    "intent.projectDetail.title": "Project Summary",
    "intent.projectDetail.empty": "Select a project to see details.",
    "intent.createProject.step1.title": "Project Identity",
    "intent.createProject.step2.title": "Budget & Schedule",
    "intent.createProject.step3.title": "Activation",
    "intent.updateStatus.title": "Status Change",
    "intent.updateProject.title": "Project Details",
    "field.activeCompanyId.label": "Active Company",
    "field.project.projectId": "Project ID",
    "field.project.clientId": "Client",
    "field.project.name": "Project Name",
    "field.project.siteAddress": "Site Address",
    "field.project.budget": "Budget (USD)",
    "field.project.startDate": "Start Date",
    "field.project.endDate": "End Date",
    "field.project.status": "Status",
    "field.project.completedAt": "Completed At",
    "field.project.cancelledAt": "Cancelled At",
    "field.project.cancellationReason": "Cancellation Reason",
    "field.project.createdAt": "Created At",
    "field.project.updatedAt": "Updated At",
    "field.project.actualCost": "Actual Cost",
    "field.project.delayRisk": "Next Due Date",
    "action.viewDashboard": "Refresh Dashboard",
    "action.viewProject": "View Project",
    "action.createProject": "Create Project",
    "action.updateProjectStatus": "Update Status",
    "action.updateProject": "Save Changes"
  },
  "automation": {
    "statePrefix": "ui.projectManagement",
    "stateKeys": [
      "ui.projectManagement.status",
      "ui.projectManagement.action.createProject.status",
      "ui.projectManagement.input.createProject.name",
      "ui.projectManagement.input.createProject.clientId",
      "ui.projectManagement.input.createProject.siteAddress",
      "ui.projectManagement.input.createProject.budget",
      "ui.projectManagement.input.createProject.startDate",
      "ui.projectManagement.input.createProject.endDate",
      "ui.projectManagement.input.createProject.status",
      "ui.projectManagement.action.updateProjectStatus.status",
      "ui.projectManagement.input.updateProjectStatus.projectId",
      "ui.projectManagement.input.updateProjectStatus.status",
      "ui.projectManagement.input.updateProjectStatus.cancellationReason",
      "ui.projectManagement.action.updateProject.status",
      "ui.projectManagement.input.updateProject.projectId",
      "ui.projectManagement.input.updateProject.name",
      "ui.projectManagement.input.updateProject.clientId",
      "ui.projectManagement.input.updateProject.siteAddress",
      "ui.projectManagement.input.updateProject.budget",
      "ui.projectManagement.input.updateProject.startDate",
      "ui.projectManagement.input.updateProject.endDate",
      "ui.projectManagement.action.viewProject.status",
      "ui.projectManagement.input.viewProject.projectId",
      "ui.projectManagement.data.viewProject",
      "ui.projectManagement.action.viewDashboard.status",
      "ui.projectManagement.data.viewDashboard",
      "ui.projectManagement.businessContext.activeCompanyId",
      "ui.projectManagement.output.createProject",
      "ui.projectManagement.output.updateProjectStatus",
      "ui.projectManagement.output.updateProject",
      "ui.projectManagement.layout.fld_activeCompanyId"
    ],
    "actionIds": [
      "createProject",
      "updateProjectStatus",
      "updateProject",
      "viewProject",
      "viewDashboard",
      "set.createProjectName",
      "set.createProjectClientId",
      "set.createProjectSiteAddress",
      "set.createProjectBudget",
      "set.createProjectStartDate",
      "set.createProjectEndDate",
      "set.createProjectStatus",
      "set.updateProjectStatusProjectId",
      "set.updateProjectStatusStatus",
      "set.updateProjectStatusCancellationReason",
      "set.updateProjectProjectId",
      "set.updateProjectName",
      "set.updateProjectClientId",
      "set.updateProjectSiteAddress",
      "set.updateProjectBudget",
      "set.updateProjectStartDate",
      "set.updateProjectEndDate",
      "set.viewProjectProjectId"
    ]
  }
};

export const pipeline = [
  {
    "id": "projectManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/projectManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/projectManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/projectManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "projectManagement__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
