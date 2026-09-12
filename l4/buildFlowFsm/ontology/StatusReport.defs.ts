/// <mls fileReference="_102048_/l4/buildFlowFsm/ontology/StatusReport.defs.ts" enhancement="_blank"/>

export const buildFlowFsmEntityStatusReport = {
  "entityId": "StatusReport",
  "title": "Status Report",
  "description": "An AI-generated plain-language project status report compiled from tasks, time logs, and material data using the platform LLM proxy, reviewed by the PM and shared with the client.",
  "kind": "core",
  "ownership": "moduleOwned",
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
  "lifecycleStates": [
    "generated",
    "shared"
  ]
} as const;

export default buildFlowFsmEntityStatusReport;
