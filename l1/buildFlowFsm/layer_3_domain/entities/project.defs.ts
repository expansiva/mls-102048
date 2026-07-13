/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.defs.ts" enhancement="_blank"/>

export const projectDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "Project",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Project",
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
    "invariants": [
      "budget must be a positive monetary value",
      "endDate must be on or after startDate",
      "clientId must be set before status can transition to active",
      "status transitions: draft→active, active→completed, draft→cancelled, active→cancelled",
      "completedAt must be set when status is completed",
      "cancelledAt and cancellationReason must be set when status is cancelled",
      "only active projects appear on the dashboard"
    ],
    "valueObjects": []
  }
} as const;

export default projectDomainEntity;

export const pipeline = [
  {
    "id": "project__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
