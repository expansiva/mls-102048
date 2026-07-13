/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.defs.ts" enhancement="_blank"/>

export const statusReportDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "StatusReport",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StatusReport",
    "fields": [
      {
        "fieldId": "statusReportId",
        "type": "uuid",
        "required": true,
        "description": "Primary identifier for the status report record."
      },
      {
        "fieldId": "projectId",
        "type": "uuid",
        "required": true,
        "description": "Reference to the project this status report belongs to."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Lifecycle state of the report, either generated or shared with the client.",
        "enum": [
          "generated",
          "shared"
        ]
      },
      {
        "fieldId": "content",
        "type": "text",
        "required": true,
        "description": "The AI-generated plain-language status report content covering tasks, time logs, and material usage."
      },
      {
        "fieldId": "reportPeriodStart",
        "type": "date",
        "required": true,
        "description": "Start date of the reporting period covered by this status report."
      },
      {
        "fieldId": "reportPeriodEnd",
        "type": "date",
        "required": true,
        "description": "End date of the reporting period covered by this status report."
      },
      {
        "fieldId": "generatedAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the LLM proxy generated the report content."
      },
      {
        "fieldId": "llmModelUsed",
        "type": "string",
        "required": false,
        "description": "Identifier of the LLM model used via the platform proxy to generate the report."
      },
      {
        "fieldId": "sharedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the PM shared the report with the client."
      },
      {
        "fieldId": "shareLink",
        "type": "string",
        "required": false,
        "description": "Shareable link generated for client access to the status report."
      },
      {
        "fieldId": "sharedWithEmail",
        "type": "string",
        "required": false,
        "description": "Email address the report was shared with for client notification."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the status report record was created."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the status report record was last updated."
      }
    ],
    "statusEnum": [
      "generated",
      "shared"
    ],
    "invariants": [
      "reportPeriodEnd must be on or after reportPeriodStart",
      "status transitions: generated→shared",
      "sharedAt, shareLink, and sharedWithEmail must be set when status is shared",
      "content must not be empty"
    ],
    "valueObjects": []
  }
} as const;

export default statusReportDomainEntity;

export const pipeline = [
  {
    "id": "statusReport__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.defs.ts",
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
