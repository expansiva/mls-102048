/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewStatusReport.defs.ts" enhancement="_blank"/>

export const viewStatusReportController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewStatusReport",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "viewStatusReport",
    "controllerName": "ViewStatusReportController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmViewStatusReportHandler",
        "command": "viewStatusReport",
        "usecaseRef": "viewStatusReport",
        "inputTypeName": "ViewStatusReportInput",
        "kind": "view",
        "inputContract": [
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
        "accessPattern": {
          "kind": "getById",
          "description": "",
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
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.viewStatusReport.viewStatusReport",
        "handlerName": "buildFlowFsmViewStatusReportHandler"
      }
    ]
  }
} as const;

export default viewStatusReportController;

export const pipeline = [
  {
    "id": "viewStatusReport__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewStatusReport.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewStatusReport.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewStatusReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
