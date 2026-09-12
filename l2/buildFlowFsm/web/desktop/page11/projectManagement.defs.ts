/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/projectManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "projectManagement",
  "pageName": "Project Management & Dashboard",
  "baseClassName": "BuildFlowFsmProjectManagementBase",
  "actor": "companyAdmin",
  "purpose": "Executar Project Management & Dashboard.",
  "capabilities": [
    "projectLifecycle",
    "updateProject",
    "viewProject",
    "viewDashboard"
  ],
  "flowRefs": {
    "experienceFlows": [
      "projectLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "projectLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
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
  "pageInputs": [
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
  "sections": [
    {
      "id": "sec_dashboard",
      "type": "section",
      "sectionName": "Project Management & Dashboard",
      "titleKey": "section.dashboard.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org_dashboard_list",
          "type": "data",
          "organismName": "ViewDashboard",
          "titleKey": "organism.dashboardList.title",
          "purpose": "Review active projects dashboard cards",
          "userActions": [
            "viewDashboard",
            "viewProject"
          ],
          "requiredEntities": [
            "Project",
            "Client",
            "WorkTask",
            "TimeLog",
            "MaterialUsage",
            "ChangeOrder"
          ],
          "readsFields": [
            "projectId",
            "name",
            "budget",
            "startDate",
            "endDate",
            "status",
            "clientId",
            "title",
            "dueDate",
            "hours",
            "cost",
            "amount"
          ],
          "writesFields": [],
          "rulesApplied": [
            "dashboardShowsActiveOnly",
            "jobCostCalculation"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int_dashboard_context",
              "intent": "summary",
              "stateKey": "ui.projectManagement.data.viewDashboard",
              "order": 10
            },
            {
              "id": "int_dashboard_cards",
              "intent": "queryList",
              "stateKey": "ui.projectManagement.data.viewDashboard",
              "order": 20
            }
          ]
        },
        {
          "id": "org_project_detail",
          "type": "data",
          "organismName": "ViewProject",
          "titleKey": "organism.projectDetail.title",
          "purpose": "View selected project details and cost summary",
          "userActions": [
            "viewProject"
          ],
          "requiredEntities": [
            "Project",
            "Client",
            "WorkTask",
            "TimeLog",
            "MaterialUsage",
            "ChangeOrder",
            "Invoice",
            "StatusReport"
          ],
          "readsFields": [
            "projectId",
            "name",
            "clientId",
            "siteAddress",
            "budget",
            "startDate",
            "endDate",
            "status",
            "completedAt",
            "cancelledAt",
            "cancellationReason",
            "createdAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "jobCostCalculation",
            "dashboardShowsActiveOnly"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "int_project_detail",
              "intent": "summary",
              "stateKey": "ui.projectManagement.data.viewProject",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec_create",
      "type": "section",
      "sectionName": "Create Project",
      "titleKey": "section.createProject.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org_create_project",
          "type": "form",
          "organismName": "CreateProject",
          "titleKey": "organism.createProject.title",
          "purpose": "Create a new project in guided steps",
          "userActions": [
            "createProject"
          ],
          "requiredEntities": [
            "Project",
            "Client"
          ],
          "readsFields": [],
          "writesFields": [
            "name",
            "clientId",
            "siteAddress",
            "budget",
            "startDate",
            "endDate",
            "status"
          ],
          "rulesApplied": [
            "projectBudgetPositive",
            "projectDateRangeValid",
            "projectRequiresClient"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int_create_step1",
              "intent": "commandForm",
              "order": 10
            },
            {
              "id": "int_create_step2",
              "intent": "commandForm",
              "order": 20
            },
            {
              "id": "int_create_step3",
              "intent": "commandForm",
              "order": 30
            }
          ]
        }
      ]
    },
    {
      "id": "sec_update_status",
      "type": "section",
      "sectionName": "Update Project Status",
      "titleKey": "section.updateStatus.title",
      "mode": "edit",
      "order": 30,
      "organisms": [
        {
          "id": "org_update_status",
          "type": "form",
          "organismName": "UpdateProjectStatus",
          "titleKey": "organism.updateStatus.title",
          "purpose": "Change project lifecycle status",
          "userActions": [
            "updateProjectStatus"
          ],
          "requiredEntities": [
            "Project",
            "Client"
          ],
          "readsFields": [
            "projectId",
            "status",
            "cancellationReason"
          ],
          "writesFields": [
            "status",
            "cancellationReason"
          ],
          "rulesApplied": [
            "projectRequiresClient",
            "projectDateRangeValid",
            "dashboardShowsActiveOnly"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int_update_status_form",
              "intent": "commandForm",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "sec_update_project",
      "type": "section",
      "sectionName": "Update Project Details",
      "titleKey": "section.updateProject.title",
      "mode": "edit",
      "order": 40,
      "organisms": [
        {
          "id": "org_update_project",
          "type": "form",
          "organismName": "UpdateProject",
          "titleKey": "organism.updateProject.title",
          "purpose": "Edit project details",
          "userActions": [
            "updateProject"
          ],
          "requiredEntities": [
            "Project",
            "Client"
          ],
          "readsFields": [
            "projectId",
            "name",
            "clientId",
            "siteAddress",
            "budget",
            "startDate",
            "endDate"
          ],
          "writesFields": [
            "name",
            "clientId",
            "siteAddress",
            "budget",
            "startDate",
            "endDate"
          ],
          "rulesApplied": [
            "projectBudgetPositive",
            "projectDateRangeValid",
            "projectRequiresClient"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "int_update_project_form",
              "intent": "commandForm",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "projectManagement.page11",
    "type": "page",
    "sections": [
      {
        "id": "sec_dashboard",
        "type": "section",
        "sectionName": "Project Management & Dashboard",
        "titleKey": "section.dashboard.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org_dashboard_list",
            "type": "data",
            "organismName": "ViewDashboard",
            "titleKey": "organism.dashboardList.title",
            "purpose": "Review active projects dashboard cards",
            "userActions": [
              "viewDashboard",
              "viewProject"
            ],
            "requiredEntities": [
              "Project",
              "Client",
              "WorkTask",
              "TimeLog",
              "MaterialUsage",
              "ChangeOrder"
            ],
            "readsFields": [
              "projectId",
              "name",
              "budget",
              "startDate",
              "endDate",
              "status",
              "clientId",
              "title",
              "dueDate",
              "hours",
              "cost",
              "amount"
            ],
            "writesFields": [],
            "rulesApplied": [
              "dashboardShowsActiveOnly",
              "jobCostCalculation"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int_dashboard_context",
                "intent": "summary",
                "order": 10,
                "titleKey": "intent.dashboardContext.title",
                "displayHint": "contextBadge",
                "fields": [
                  {
                    "id": "fld_activeCompanyId",
                    "field": "activeCompanyId",
                    "labelKey": "field.activeCompanyId.label",
                    "order": 10,
                    "required": true,
                    "inputType": "context",
                    "stateKey": "ui.projectManagement.layout.fld_activeCompanyId"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.projectManagement.data.viewDashboard"
              },
              {
                "id": "int_dashboard_cards",
                "intent": "queryList",
                "order": 20,
                "titleKey": "intent.dashboardCards.title",
                "emptyKey": "intent.dashboardCards.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "col_name",
                    "field": "name",
                    "labelKey": "field.project.name",
                    "order": 10,
                    "required": false,
                    "stateKey": "ui.projectManagement.data.viewDashboard"
                  },
                  {
                    "id": "col_status",
                    "field": "status",
                    "labelKey": "field.project.status",
                    "order": 20,
                    "required": false,
                    "stateKey": "ui.projectManagement.data.viewDashboard"
                  },
                  {
                    "id": "col_budget",
                    "field": "budget",
                    "labelKey": "field.project.budget",
                    "order": 30,
                    "required": false,
                    "format": "currency",
                    "stateKey": "ui.projectManagement.data.viewDashboard"
                  },
                  {
                    "id": "col_actualCost",
                    "field": "cost",
                    "labelKey": "field.project.actualCost",
                    "order": 40,
                    "required": false,
                    "format": "currency",
                    "stateKey": "ui.projectManagement.data.viewDashboard"
                  },
                  {
                    "id": "col_timeline",
                    "field": "endDate",
                    "labelKey": "field.project.endDate",
                    "order": 50,
                    "required": false,
                    "format": "date",
                    "stateKey": "ui.projectManagement.data.viewDashboard"
                  },
                  {
                    "id": "col_risk",
                    "field": "dueDate",
                    "labelKey": "field.project.delayRisk",
                    "order": 60,
                    "required": false,
                    "format": "date",
                    "stateKey": "ui.projectManagement.data.viewDashboard"
                  }
                ],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_viewDashboard",
                    "action": "viewDashboard",
                    "labelKey": "action.viewDashboard",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewDashboard"
                  }
                ],
                "rowActions": [
                  {
                    "id": "ra_viewProject",
                    "action": "viewProject",
                    "labelKey": "action.viewProject",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewProject"
                  }
                ],
                "actions": [],
                "stateKey": "ui.projectManagement.data.viewDashboard"
              }
            ]
          },
          {
            "id": "org_project_detail",
            "type": "data",
            "organismName": "ViewProject",
            "titleKey": "organism.projectDetail.title",
            "purpose": "View selected project details and cost summary",
            "userActions": [
              "viewProject"
            ],
            "requiredEntities": [
              "Project",
              "Client",
              "WorkTask",
              "TimeLog",
              "MaterialUsage",
              "ChangeOrder",
              "Invoice",
              "StatusReport"
            ],
            "readsFields": [
              "projectId",
              "name",
              "clientId",
              "siteAddress",
              "budget",
              "startDate",
              "endDate",
              "status",
              "completedAt",
              "cancelledAt",
              "cancellationReason",
              "createdAt",
              "updatedAt"
            ],
            "writesFields": [],
            "rulesApplied": [
              "jobCostCalculation",
              "dashboardShowsActiveOnly"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "int_project_detail",
                "intent": "summary",
                "order": 10,
                "titleKey": "intent.projectDetail.title",
                "emptyKey": "intent.projectDetail.empty",
                "fields": [
                  {
                    "id": "fld_projectId_view",
                    "field": "projectId",
                    "labelKey": "field.project.projectId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "stateKey": "ui.projectManagement.input.viewProject.projectId"
                  },
                  {
                    "id": "fld_name_view",
                    "field": "name",
                    "labelKey": "field.project.name",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_client_view",
                    "field": "clientId",
                    "labelKey": "field.project.clientId",
                    "order": 30,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_siteAddress_view",
                    "field": "siteAddress",
                    "labelKey": "field.project.siteAddress",
                    "order": 40,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_budget_view",
                    "field": "budget",
                    "labelKey": "field.project.budget",
                    "order": 50,
                    "required": false,
                    "inputType": "number",
                    "format": "currency",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_startDate_view",
                    "field": "startDate",
                    "labelKey": "field.project.startDate",
                    "order": 60,
                    "required": false,
                    "inputType": "date",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_endDate_view",
                    "field": "endDate",
                    "labelKey": "field.project.endDate",
                    "order": 70,
                    "required": false,
                    "inputType": "date",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_status_view",
                    "field": "status",
                    "labelKey": "field.project.status",
                    "order": 80,
                    "required": false,
                    "inputType": "select",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_completedAt_view",
                    "field": "completedAt",
                    "labelKey": "field.project.completedAt",
                    "order": 90,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_cancelledAt_view",
                    "field": "cancelledAt",
                    "labelKey": "field.project.cancelledAt",
                    "order": 100,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_cancellationReason_view",
                    "field": "cancellationReason",
                    "labelKey": "field.project.cancellationReason",
                    "order": 110,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_createdAt_view",
                    "field": "createdAt",
                    "labelKey": "field.project.createdAt",
                    "order": 120,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  },
                  {
                    "id": "fld_updatedAt_view",
                    "field": "updatedAt",
                    "labelKey": "field.project.updatedAt",
                    "order": 130,
                    "required": false,
                    "inputType": "datetime",
                    "stateKey": "ui.projectManagement.data.viewProject"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [
                  {
                    "id": "tb_viewProject",
                    "action": "viewProject",
                    "labelKey": "action.viewProject",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "viewProject"
                  }
                ],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.projectManagement.data.viewProject"
              }
            ]
          }
        ]
      },
      {
        "id": "sec_create",
        "type": "section",
        "sectionName": "Create Project",
        "titleKey": "section.createProject.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org_create_project",
            "type": "form",
            "organismName": "CreateProject",
            "titleKey": "organism.createProject.title",
            "purpose": "Create a new project in guided steps",
            "userActions": [
              "createProject"
            ],
            "requiredEntities": [
              "Project",
              "Client"
            ],
            "readsFields": [],
            "writesFields": [
              "name",
              "clientId",
              "siteAddress",
              "budget",
              "startDate",
              "endDate",
              "status"
            ],
            "rulesApplied": [
              "projectBudgetPositive",
              "projectDateRangeValid",
              "projectRequiresClient"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int_create_step1",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.createProject.step1.title",
                "fields": [
                  {
                    "id": "fld_create_name",
                    "field": "name",
                    "labelKey": "field.project.name",
                    "order": 10,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.projectManagement.input.createProject.name"
                  },
                  {
                    "id": "fld_create_clientId",
                    "field": "clientId",
                    "labelKey": "field.project.clientId",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.projectManagement.input.createProject.clientId"
                  },
                  {
                    "id": "fld_create_siteAddress",
                    "field": "siteAddress",
                    "labelKey": "field.project.siteAddress",
                    "order": 30,
                    "required": true,
                    "inputType": "textarea",
                    "stateKey": "ui.projectManagement.input.createProject.siteAddress"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int_create_step2",
                "intent": "commandForm",
                "order": 20,
                "titleKey": "intent.createProject.step2.title",
                "fields": [
                  {
                    "id": "fld_create_budget",
                    "field": "budget",
                    "labelKey": "field.project.budget",
                    "order": 10,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "stateKey": "ui.projectManagement.input.createProject.budget"
                  },
                  {
                    "id": "fld_create_startDate",
                    "field": "startDate",
                    "labelKey": "field.project.startDate",
                    "order": 20,
                    "required": true,
                    "inputType": "date",
                    "stateKey": "ui.projectManagement.input.createProject.startDate"
                  },
                  {
                    "id": "fld_create_endDate",
                    "field": "endDate",
                    "labelKey": "field.project.endDate",
                    "order": 30,
                    "required": true,
                    "inputType": "date",
                    "stateKey": "ui.projectManagement.input.createProject.endDate"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "int_create_step3",
                "intent": "commandForm",
                "order": 30,
                "titleKey": "intent.createProject.step3.title",
                "fields": [
                  {
                    "id": "fld_create_status",
                    "field": "status",
                    "labelKey": "field.project.status",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.projectManagement.input.createProject.status"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_createProject",
                    "action": "createProject",
                    "labelKey": "action.createProject",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "createProject"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec_update_status",
        "type": "section",
        "sectionName": "Update Project Status",
        "titleKey": "section.updateStatus.title",
        "mode": "edit",
        "order": 30,
        "organisms": [
          {
            "id": "org_update_status",
            "type": "form",
            "organismName": "UpdateProjectStatus",
            "titleKey": "organism.updateStatus.title",
            "purpose": "Change project lifecycle status",
            "userActions": [
              "updateProjectStatus"
            ],
            "requiredEntities": [
              "Project",
              "Client"
            ],
            "readsFields": [
              "projectId",
              "status",
              "cancellationReason"
            ],
            "writesFields": [
              "status",
              "cancellationReason"
            ],
            "rulesApplied": [
              "projectRequiresClient",
              "projectDateRangeValid",
              "dashboardShowsActiveOnly"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int_update_status_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.updateStatus.title",
                "fields": [
                  {
                    "id": "fld_update_status_projectId",
                    "field": "projectId",
                    "labelKey": "field.project.projectId",
                    "order": 10,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.projectManagement.input.updateProjectStatus.projectId"
                  },
                  {
                    "id": "fld_update_status_status",
                    "field": "status",
                    "labelKey": "field.project.status",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.projectManagement.input.updateProjectStatus.status"
                  },
                  {
                    "id": "fld_update_status_reason",
                    "field": "cancellationReason",
                    "labelKey": "field.project.cancellationReason",
                    "order": 30,
                    "required": false,
                    "inputType": "textarea",
                    "stateKey": "ui.projectManagement.input.updateProjectStatus.cancellationReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_updateProjectStatus",
                    "action": "updateProjectStatus",
                    "labelKey": "action.updateProjectStatus",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "updateProjectStatus"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "sec_update_project",
        "type": "section",
        "sectionName": "Update Project Details",
        "titleKey": "section.updateProject.title",
        "mode": "edit",
        "order": 40,
        "organisms": [
          {
            "id": "org_update_project",
            "type": "form",
            "organismName": "UpdateProject",
            "titleKey": "organism.updateProject.title",
            "purpose": "Edit project details",
            "userActions": [
              "updateProject"
            ],
            "requiredEntities": [
              "Project",
              "Client"
            ],
            "readsFields": [
              "projectId",
              "name",
              "clientId",
              "siteAddress",
              "budget",
              "startDate",
              "endDate"
            ],
            "writesFields": [
              "name",
              "clientId",
              "siteAddress",
              "budget",
              "startDate",
              "endDate"
            ],
            "rulesApplied": [
              "projectBudgetPositive",
              "projectDateRangeValid",
              "projectRequiresClient"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "int_update_project_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.updateProject.title",
                "fields": [
                  {
                    "id": "fld_update_project_projectId",
                    "field": "projectId",
                    "labelKey": "field.project.projectId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "stateKey": "ui.projectManagement.input.updateProject.projectId"
                  },
                  {
                    "id": "fld_update_project_name",
                    "field": "name",
                    "labelKey": "field.project.name",
                    "order": 20,
                    "required": true,
                    "inputType": "text",
                    "stateKey": "ui.projectManagement.input.updateProject.name"
                  },
                  {
                    "id": "fld_update_project_clientId",
                    "field": "clientId",
                    "labelKey": "field.project.clientId",
                    "order": 30,
                    "required": true,
                    "inputType": "select",
                    "stateKey": "ui.projectManagement.input.updateProject.clientId"
                  },
                  {
                    "id": "fld_update_project_siteAddress",
                    "field": "siteAddress",
                    "labelKey": "field.project.siteAddress",
                    "order": 40,
                    "required": true,
                    "inputType": "textarea",
                    "stateKey": "ui.projectManagement.input.updateProject.siteAddress"
                  },
                  {
                    "id": "fld_update_project_budget",
                    "field": "budget",
                    "labelKey": "field.project.budget",
                    "order": 50,
                    "required": true,
                    "inputType": "number",
                    "format": "currency",
                    "stateKey": "ui.projectManagement.input.updateProject.budget"
                  },
                  {
                    "id": "fld_update_project_startDate",
                    "field": "startDate",
                    "labelKey": "field.project.startDate",
                    "order": 60,
                    "required": true,
                    "inputType": "date",
                    "stateKey": "ui.projectManagement.input.updateProject.startDate"
                  },
                  {
                    "id": "fld_update_project_endDate",
                    "field": "endDate",
                    "labelKey": "field.project.endDate",
                    "order": 70,
                    "required": true,
                    "inputType": "date",
                    "stateKey": "ui.projectManagement.input.updateProject.endDate"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_updateProject",
                    "action": "updateProject",
                    "labelKey": "action.updateProject",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "updateProject"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "db_viewDashboard",
      "source": "bff",
      "command": "viewDashboard",
      "description": "Load active projects for dashboard cards",
      "stateKey": "ui.projectManagement.data.viewDashboard",
      "inputStateKeys": []
    },
    {
      "id": "db_viewProject",
      "source": "bff",
      "command": "viewProject",
      "description": "Load selected project details",
      "stateKey": "ui.projectManagement.data.viewProject",
      "inputStateKeys": [
        "ui.projectManagement.input.viewProject.projectId"
      ]
    },
    {
      "id": "db_createProject",
      "source": "bff",
      "command": "createProject",
      "description": "Create a new project",
      "stateKey": "ui.projectManagement.output.createProject",
      "inputStateKeys": [
        "ui.projectManagement.input.createProject.name",
        "ui.projectManagement.input.createProject.clientId",
        "ui.projectManagement.input.createProject.siteAddress",
        "ui.projectManagement.input.createProject.budget",
        "ui.projectManagement.input.createProject.startDate",
        "ui.projectManagement.input.createProject.endDate",
        "ui.projectManagement.input.createProject.status"
      ]
    },
    {
      "id": "db_updateProjectStatus",
      "source": "bff",
      "command": "updateProjectStatus",
      "description": "Update project lifecycle status",
      "stateKey": "ui.projectManagement.output.updateProjectStatus",
      "inputStateKeys": [
        "ui.projectManagement.input.updateProjectStatus.projectId",
        "ui.projectManagement.input.updateProjectStatus.status",
        "ui.projectManagement.input.updateProjectStatus.cancellationReason"
      ]
    },
    {
      "id": "db_updateProject",
      "source": "bff",
      "command": "updateProject",
      "description": "Update project details",
      "stateKey": "ui.projectManagement.output.updateProject",
      "inputStateKeys": [
        "ui.projectManagement.input.updateProject.projectId",
        "ui.projectManagement.input.updateProject.name",
        "ui.projectManagement.input.updateProject.clientId",
        "ui.projectManagement.input.updateProject.siteAddress",
        "ui.projectManagement.input.updateProject.budget",
        "ui.projectManagement.input.updateProject.startDate",
        "ui.projectManagement.input.updateProject.endDate"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "projectManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/projectManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/projectManagement.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/projectManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/projectManagement.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/projectManagement.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/projectManagement.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "projectManagement__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "Dashboard-first, data-dense, status-driven UI with timeline views, cost tracking panels, and mobile-friendly field logging"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
