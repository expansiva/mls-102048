/// <mls fileReference="_102048_/l4/operations/viewStatusReport.defs.ts" enhancement="_blank"/>

export const operationViewStatusReport = {
  "operationId": "viewStatusReport",
  "title": "View status report",
  "actor": "client",
  "entity": "StatusReport",
  "kind": "view",
  "reads": [
    "StatusReport",
    "Project"
  ],
  "writes": [],
  "rulesApplied": [
    "clientSeesPmStatusReport"
  ],
  "story": {
    "actor": "client",
    "goal": "Read the AI-generated status report shared by the project manager to understand what work was completed, what is in progress, and any delay risks in plain language.",
    "steps": [
      "The client opens the shared status report link or navigates to the report from the project view.",
      "The system loads the single StatusReport record identified by the route parameter.",
      "The client reads the report content covering tasks, time logs, and material usage for the reporting period."
    ],
    "outcome": "The client sees the exact same status report the PM generated and reviewed, with full content, reporting period, and generation details."
  },
  "accessPattern": {
    "kind": "getById",
    "entity": "StatusReport",
    "keyField": "StatusReport.statusReportId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "StatusReport.statusReportId",
      "StatusReport.projectId",
      "StatusReport.status",
      "StatusReport.content",
      "StatusReport.reportPeriodStart",
      "StatusReport.reportPeriodEnd",
      "StatusReport.generatedAt",
      "StatusReport.llmModelUsed",
      "StatusReport.sharedAt",
      "StatusReport.shareLink",
      "StatusReport.sharedWithEmail"
    ]
  },
  "inputs": [
    {
      "inputId": "statusReportId",
      "fieldRef": "StatusReport.statusReportId",
      "required": true,
      "source": "routeParam",
      "description": "The identifier of the status report the client wants to view, provided via the share link route."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "StatusReport.statusReportId",
      "source": "routeParam",
      "originRef": "routeParam.statusReportId",
      "description": "The statusReportId is extracted from the route parameter of the share link URL the client opened."
    },
    {
      "targetRef": "StatusReport.projectId",
      "source": "selectedEntity",
      "originRef": "Project.projectId",
      "description": "The project context is resolved from the StatusReport record's projectId field, linking the report to its parent project."
    }
  ],
  "acceptanceAssertions": [
    "The loaded status report has status 'shared', confirming it was reviewed by the PM before client access.",
    "The report content displayed to the client is the exact same content the PM generated and reviewed — no separate or modified version is produced.",
    "The report content covers tasks, time logs, and material usage in plain language for the reporting period defined by reportPeriodStart and reportPeriodEnd.",
    "The sharedAt timestamp and shareLink are present on the report, confirming it was shared with the client."
  ],
  "pageId": "viewStatusReport",
  "commandName": "viewStatusReport",
  "bffName": "buildFlowFsm.viewStatusReport.viewStatusReport",
  "capability": {
    "capabilityId": "viewStatusReport",
    "title": "View status report",
    "actor": "client",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewStatusReport;
