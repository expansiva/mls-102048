/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "viewStatusReport",
    "bffName": "buildFlowFsm.viewStatusReport.viewStatusReport",
    "routeKey": "buildFlowFsm.viewStatusReport.viewStatusReport",
    "purpose": "View status report",
    "kind": "query",
    "outputShape": "object",
    "input": [
      {
        "name": "statusReportId",
        "type": "string",
        "required": true,
        "description": "The identifier of the status report the client wants to view, provided via the share link route.",
        "source": "routeParam",
        "presentation": "route"
      }
    ],
    "output": [
      {
        "name": "statusReportId",
        "type": "string",
        "description": "Primary identifier for the status report record."
      },
      {
        "name": "projectId",
        "type": "string",
        "description": "Reference to the project this status report belongs to."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "generated",
          "shared"
        ],
        "description": "Lifecycle state of the report, either generated or shared with the client."
      },
      {
        "name": "content",
        "type": "string",
        "description": "The AI-generated plain-language status report content covering tasks, time logs, and material usage."
      },
      {
        "name": "reportPeriodStart",
        "type": "date",
        "description": "Start date of the reporting period covered by this status report."
      },
      {
        "name": "reportPeriodEnd",
        "type": "date",
        "description": "End date of the reporting period covered by this status report."
      },
      {
        "name": "generatedAt",
        "type": "date",
        "description": "Timestamp when the LLM proxy generated the report content."
      },
      {
        "name": "llmModelUsed",
        "type": "string",
        "description": "Identifier of the LLM model used via the platform proxy to generate the report."
      },
      {
        "name": "sharedAt",
        "type": "date",
        "description": "Timestamp when the PM shared the report with the client."
      },
      {
        "name": "shareLink",
        "type": "string",
        "description": "Shareable link generated for client access to the status report."
      },
      {
        "name": "sharedWithEmail",
        "type": "string",
        "description": "Email address the report was shared with for client notification."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:viewStatusReport",
      "operationId": "viewStatusReport",
      "defPath": "_102048_/l4/operations/viewStatusReport.defs.ts",
      "bffName": "buildFlowFsm.viewStatusReport.viewStatusReport"
    }
  }
];

export const pipeline = [
  {
    "id": "clientStatusReportView__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
