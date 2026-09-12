/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "generateStatusReport",
    "bffName": "buildFlowFsm.statusReportLifecycle.generateStatusReport",
    "routeKey": "buildFlowFsm.statusReportLifecycle.generateStatusReport",
    "purpose": "Generate AI status report",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "Project identifier from the project detail page route parameter.",
        "source": "routeParam",
        "presentation": "route"
      },
      {
        "name": "reportPeriodStart",
        "type": "date",
        "required": true,
        "description": "Start date of the reporting period the PM wants the report to cover.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "reportPeriodEnd",
        "type": "date",
        "required": true,
        "description": "End date of the reporting period the PM wants the report to cover.",
        "source": "userInput",
        "presentation": "form"
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
        "name": "createdAt",
        "type": "date",
        "description": "Timestamp when the status report record was created."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:generateStatusReport",
      "operationId": "generateStatusReport",
      "defPath": "_102048_/l4/operations/generateStatusReport.defs.ts",
      "bffName": "buildFlowFsm.statusReportLifecycle.generateStatusReport"
    }
  },
  {
    "commandName": "shareStatusReport",
    "bffName": "buildFlowFsm.statusReportLifecycle.shareStatusReport",
    "routeKey": "buildFlowFsm.statusReportLifecycle.shareStatusReport",
    "purpose": "Share status report with client",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "statusReportId",
        "type": "string",
        "required": true,
        "description": "The status report the PM selected to share with the client.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "sharedWithEmail",
        "type": "string",
        "required": true,
        "description": "The client email address the PM enters to send the status report notification.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
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
      "ownerId": "operation:shareStatusReport",
      "operationId": "shareStatusReport",
      "defPath": "_102048_/l4/operations/shareStatusReport.defs.ts",
      "bffName": "buildFlowFsm.statusReportLifecycle.shareStatusReport"
    }
  }
];

export const pipeline = [
  {
    "id": "statusReportLifecycle__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
