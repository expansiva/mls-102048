/// <mls fileReference="_102048_/l4/operations/updateProject.defs.ts" enhancement="_blank"/>

export const operationUpdateProject = {
  "operationId": "updateProject",
  "title": "Edit project details",
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
    "projectBudgetPositive",
    "projectDateRangeValid",
    "projectRequiresClient"
  ],
  "story": {
    "actor": "companyAdmin",
    "goal": "Edit the name, client, site address, budget, and schedule of an existing project so that project records stay accurate as plans evolve.",
    "steps": [
      "The admin opens an existing project from the project list or detail view.",
      "The admin modifies one or more editable fields: name, client, site address, budget, start date, or end date.",
      "The system validates that the budget is a positive USD amount and that the start date is on or before the end date.",
      "If the admin sets the status to active, the system verifies a client is linked before saving.",
      "The system persists the updated project fields and refreshes the updatedAt timestamp."
    ],
    "outcome": "The project record reflects the edited details and passes all domain validations; the updated project is ready for continued planning and cost tracking."
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
      "Project.clientId",
      "Project.siteAddress",
      "Project.budget",
      "Project.startDate",
      "Project.endDate",
      "Project.status",
      "Project.updatedAt"
    ]
  },
  "inputs": [
    {
      "inputId": "projectId",
      "fieldRef": "Project.projectId",
      "required": true,
      "source": "routeParam",
      "description": "Identifier of the project being edited, taken from the route parameter."
    },
    {
      "inputId": "name",
      "fieldRef": "Project.name",
      "required": true,
      "source": "userInput",
      "description": "Updated project name or title."
    },
    {
      "inputId": "clientId",
      "fieldRef": "Project.clientId",
      "required": true,
      "source": "userInput",
      "description": "Updated reference to the client who owns this project."
    },
    {
      "inputId": "siteAddress",
      "fieldRef": "Project.siteAddress",
      "required": true,
      "source": "userInput",
      "description": "Updated physical address of the construction or remodeling site."
    },
    {
      "inputId": "budget",
      "fieldRef": "Project.budget",
      "required": true,
      "source": "userInput",
      "description": "Updated approved project budget in USD; must be a positive amount."
    },
    {
      "inputId": "startDate",
      "fieldRef": "Project.startDate",
      "required": true,
      "source": "userInput",
      "description": "Updated planned project start date."
    },
    {
      "inputId": "endDate",
      "fieldRef": "Project.endDate",
      "required": true,
      "source": "userInput",
      "description": "Updated planned project end date; must be on or after the start date."
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "Project.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp of the update, set automatically by the server."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "Project.projectId",
      "source": "routeParam",
      "originRef": "routeParam.projectId",
      "description": "The project id is extracted from the route parameter identifying which project the admin opened for editing."
    },
    {
      "targetRef": "Project.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The server sets updatedAt to the current timestamp at the moment the update is persisted."
    }
  ],
  "acceptanceAssertions": [
    "After confirmation the project exists with the edited name, site address, budget, start date, and end date values.",
    "The project budget is a positive amount in USD; zero or negative budgets are rejected.",
    "The project start date is on or before the project end date; an invalid date range is rejected.",
    "If the project status is set to active during the edit, the project must already be linked to a client or the update is rejected.",
    "The project updatedAt timestamp is refreshed to reflect the time of the edit."
  ],
  "pageId": "updateProject",
  "commandName": "updateProject",
  "bffName": "buildFlowFsm.updateProject.updateProject",
  "capability": {
    "capabilityId": "updateProject",
    "title": "Edit project details",
    "actor": "companyAdmin",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationUpdateProject;
