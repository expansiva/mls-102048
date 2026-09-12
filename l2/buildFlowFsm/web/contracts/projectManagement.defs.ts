/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/projectManagement.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "createProject",
    "bffName": "buildFlowFsm.projectLifecycle.createProject",
    "routeKey": "buildFlowFsm.projectLifecycle.createProject",
    "purpose": "Create a new project",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Project name or title shown on dashboards and reports",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "clientId",
        "type": "string",
        "required": true,
        "description": "Reference to the client who owns this project; selected from existing clients",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "siteAddress",
        "type": "string",
        "required": true,
        "description": "Physical address of the construction or remodeling site",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "budget",
        "type": "number",
        "required": true,
        "description": "Approved project budget in USD; must be a positive amount",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "startDate",
        "type": "date",
        "required": true,
        "description": "Planned project start date",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "endDate",
        "type": "date",
        "required": true,
        "description": "Planned project end date; must be on or after the start date",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "enum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "description": "Initial lifecycle status of the project; admin can set to draft or active",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "projectId",
        "type": "string",
        "description": "Unique identifier for the project"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Project name or title shown on dashboards and reports"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the project; only active projects appear on the dashboard"
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Timestamp when the project record was created"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:createProject",
      "operationId": "createProject",
      "defPath": "_102048_/l4/operations/createProject.defs.ts",
      "bffName": "buildFlowFsm.projectLifecycle.createProject"
    }
  },
  {
    "commandName": "updateProjectStatus",
    "bffName": "buildFlowFsm.projectLifecycle.updateProjectStatus",
    "routeKey": "buildFlowFsm.projectLifecycle.updateProjectStatus",
    "purpose": "Update project status",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "The project whose status is being changed",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "enum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "description": "The new lifecycle status for the project (active, completed, or cancelled)",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "cancellationReason",
        "type": "string",
        "required": false,
        "description": "Reason recorded when the project is cancelled; required only when status is set to cancelled",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "projectId",
        "type": "string",
        "description": "Unique identifier for the project"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Project name or title shown on dashboards and reports"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the project; only active projects appear on the dashboard"
      },
      {
        "name": "completedAt",
        "type": "date",
        "description": "Timestamp when the project was marked completed"
      },
      {
        "name": "cancelledAt",
        "type": "date",
        "description": "Timestamp when the project was cancelled"
      },
      {
        "name": "cancellationReason",
        "type": "string",
        "description": "Reason recorded when the project is cancelled"
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Timestamp when the project record was last updated"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:updateProjectStatus",
      "operationId": "updateProjectStatus",
      "defPath": "_102048_/l4/operations/updateProjectStatus.defs.ts",
      "bffName": "buildFlowFsm.projectLifecycle.updateProjectStatus"
    }
  },
  {
    "commandName": "updateProject",
    "bffName": "buildFlowFsm.updateProject.updateProject",
    "routeKey": "buildFlowFsm.updateProject.updateProject",
    "purpose": "Edit project details",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "Identifier of the project being edited, taken from the route parameter.",
        "source": "routeParam",
        "presentation": "route"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Updated project name or title.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "clientId",
        "type": "string",
        "required": true,
        "description": "Updated reference to the client who owns this project.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "siteAddress",
        "type": "string",
        "required": true,
        "description": "Updated physical address of the construction or remodeling site.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "budget",
        "type": "number",
        "required": true,
        "description": "Updated approved project budget in USD; must be a positive amount.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "startDate",
        "type": "date",
        "required": true,
        "description": "Updated planned project start date.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "endDate",
        "type": "date",
        "required": true,
        "description": "Updated planned project end date; must be on or after the start date.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "projectId",
        "type": "string",
        "description": "Unique identifier for the project"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Project name or title shown on dashboards and reports"
      },
      {
        "name": "clientId",
        "type": "string",
        "description": "Reference to the client who owns this project; must be set before the project can be activated"
      },
      {
        "name": "siteAddress",
        "type": "string",
        "description": "Physical address of the construction or remodeling site"
      },
      {
        "name": "budget",
        "type": "number",
        "description": "Approved project budget in USD; must be a positive amount"
      },
      {
        "name": "startDate",
        "type": "date",
        "description": "Planned project start date; task due dates must fall on or after this date"
      },
      {
        "name": "endDate",
        "type": "date",
        "description": "Planned project end date; must be on or after the start date and task due dates must fall on or before this date"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the project; only active projects appear on the dashboard"
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Timestamp when the project record was last updated"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:updateProject",
      "operationId": "updateProject",
      "defPath": "_102048_/l4/operations/updateProject.defs.ts",
      "bffName": "buildFlowFsm.updateProject.updateProject"
    }
  },
  {
    "commandName": "viewProject",
    "bffName": "buildFlowFsm.viewProject.viewProject",
    "routeKey": "buildFlowFsm.viewProject.viewProject",
    "purpose": "View project detail",
    "kind": "query",
    "outputShape": "object",
    "input": [
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "The unique identifier of the project to view, provided via the route parameter.",
        "source": "routeParam",
        "presentation": "route"
      }
    ],
    "output": [
      {
        "name": "projectId",
        "type": "string",
        "description": "Unique identifier for the project"
      },
      {
        "name": "clientId",
        "type": "string",
        "description": "Reference to the client who owns this project; must be set before the project can be activated"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Project name or title shown on dashboards and reports"
      },
      {
        "name": "siteAddress",
        "type": "string",
        "description": "Physical address of the construction or remodeling site"
      },
      {
        "name": "budget",
        "type": "number",
        "description": "Approved project budget in USD; must be a positive amount"
      },
      {
        "name": "startDate",
        "type": "date",
        "description": "Planned project start date; task due dates must fall on or after this date"
      },
      {
        "name": "endDate",
        "type": "date",
        "description": "Planned project end date; must be on or after the start date and task due dates must fall on or before this date"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the project; only active projects appear on the dashboard"
      },
      {
        "name": "completedAt",
        "type": "date",
        "description": "Timestamp when the project was marked completed"
      },
      {
        "name": "cancelledAt",
        "type": "date",
        "description": "Timestamp when the project was cancelled"
      },
      {
        "name": "cancellationReason",
        "type": "string",
        "description": "Reason recorded when the project is cancelled"
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Timestamp when the project record was created"
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Timestamp when the project record was last updated"
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewProject",
      "operationId": "viewProject",
      "defPath": "_102048_/l4/operations/viewProject.defs.ts",
      "bffName": "buildFlowFsm.viewProject.viewProject"
    }
  },
  {
    "commandName": "viewDashboard",
    "bffName": "buildFlowFsm.viewDashboard.viewDashboard",
    "routeKey": "buildFlowFsm.viewDashboard.viewDashboard",
    "purpose": "Review project dashboard",
    "kind": "query",
    "outputShape": "paginated",
    "input": [],
    "output": [
      {
        "name": "projectId",
        "type": "string",
        "description": "Unique identifier for the project"
      },
      {
        "name": "name",
        "type": "string",
        "description": "Project name or title shown on dashboards and reports"
      },
      {
        "name": "budget",
        "type": "number",
        "description": "Approved project budget in USD; must be a positive amount"
      },
      {
        "name": "startDate",
        "type": "date",
        "description": "Planned project start date; task due dates must fall on or after this date"
      },
      {
        "name": "endDate",
        "type": "date",
        "description": "Planned project end date; must be on or after the start date and task due dates must fall on or before this date"
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the project; only active projects appear on the dashboard"
      },
      {
        "name": "clientId",
        "type": "string",
        "description": "Reference to the client who owns this project; must be set before the project can be activated"
      },
      {
        "name": "title",
        "type": "string",
        "description": "Short name of the task."
      },
      {
        "name": "dueDate",
        "type": "date",
        "description": "Deadline by which the task should be completed; must fall within the project start and end dates."
      },
      {
        "name": "hours",
        "type": "number",
        "description": "Number of hours worked on the task for this log entry."
      },
      {
        "name": "cost",
        "type": "string",
        "required": false
      },
      {
        "name": "amount",
        "type": "number",
        "description": "Cost impact of the change order in USD; only included in invoicing and job costing when approved."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewDashboard",
      "operationId": "viewDashboard",
      "defPath": "_102048_/l4/operations/viewDashboard.defs.ts",
      "bffName": "buildFlowFsm.viewDashboard.viewDashboard"
    }
  }
];

export const pipeline = [
  {
    "id": "projectManagement__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/projectManagement.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/projectManagement.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
