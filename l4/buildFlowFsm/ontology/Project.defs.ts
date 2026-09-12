/// <mls fileReference="_102048_/l4/buildFlowFsm/ontology/Project.defs.ts" enhancement="_blank"/>

export const buildFlowFsmEntityProject = {
  "entityId": "Project",
  "title": "Project",
  "description": "A construction or remodeling project with a client, site address, budget, timeline, and lifecycle status that serves as the foundation for task planning, cost tracking, and client billing.",
  "kind": "core",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "projectId",
      "type": "uuid",
      "required": true,
      "description": "Unique identifier for the project"
    },
    {
      "fieldId": "clientId",
      "type": "uuid",
      "required": true,
      "description": "Reference to the client who owns this project; must be set before the project can be activated"
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Project name or title shown on dashboards and reports"
    },
    {
      "fieldId": "siteAddress",
      "type": "text",
      "required": true,
      "description": "Physical address of the construction or remodeling site"
    },
    {
      "fieldId": "budget",
      "type": "money",
      "required": true,
      "description": "Approved project budget in USD; must be a positive amount"
    },
    {
      "fieldId": "startDate",
      "type": "date",
      "required": true,
      "description": "Planned project start date; task due dates must fall on or after this date"
    },
    {
      "fieldId": "endDate",
      "type": "date",
      "required": true,
      "description": "Planned project end date; must be on or after the start date and task due dates must fall on or before this date"
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Current lifecycle state of the project; only active projects appear on the dashboard",
      "enum": [
        "draft",
        "active",
        "completed",
        "cancelled"
      ]
    },
    {
      "fieldId": "completedAt",
      "type": "datetime",
      "required": false,
      "description": "Timestamp when the project was marked completed"
    },
    {
      "fieldId": "cancelledAt",
      "type": "datetime",
      "required": false,
      "description": "Timestamp when the project was cancelled"
    },
    {
      "fieldId": "cancellationReason",
      "type": "text",
      "required": false,
      "description": "Reason recorded when the project is cancelled"
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Timestamp when the project record was created"
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Timestamp when the project record was last updated"
    }
  ],
  "statusEnum": [
    "draft",
    "active",
    "completed",
    "cancelled"
  ],
  "lifecycleStates": [
    "draft",
    "active",
    "completed",
    "cancelled"
  ]
} as const;

export default buildFlowFsmEntityProject;
