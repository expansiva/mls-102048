/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftReport.defs.ts" enhancement="_blank"/>

export const viewShiftReportController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewShiftReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "shiftLifecycle",
    "controllerName": "ViewShiftReportController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "cafeFlowViewShiftReportByIdHandler",
        "command": "viewShiftReportById",
        "usecaseRef": "viewShiftReportById",
        "inputTypeName": "ViewShiftReportByIdInput",
        "kind": "view"
      },
      {
        "handlerName": "cafeFlowViewShiftReportByDailyShiftIdHandler",
        "command": "viewShiftReportByDailyShiftId",
        "usecaseRef": "viewShiftReportByDailyShiftId",
        "inputTypeName": "ViewShiftReportByDailyShiftIdInput",
        "kind": "view"
      },
      {
        "handlerName": "cafeFlowViewShiftReportHandler",
        "command": "viewShiftReport",
        "usecaseRef": "viewShiftReportById | viewShiftReportByDailyShiftId",
        "kind": "dispatcher"
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.shiftLifecycle.viewShiftReport",
        "handlerName": "cafeFlowViewShiftReportHandler"
      },
      {
        "key": "cafeFlow.shiftLifecycle.viewShiftReportById",
        "handlerName": "cafeFlowViewShiftReportByIdHandler"
      },
      {
        "key": "cafeFlow.shiftLifecycle.viewShiftReportByDailyShiftId",
        "handlerName": "cafeFlowViewShiftReportByDailyShiftIdHandler"
      }
    ]
  }
} as const;

export default viewShiftReportController;

export const pipeline = [
  {
    "id": "viewShiftReport__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftReport.ts",
    "defPath": "_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/viewShiftReport.defs.ts",
    "dependsFiles": [
      "_102048_/l1/cafeFlow/layer_2_application/usecases/viewShiftReport.d.ts",
      "_102048_/l2/cafeFlow/web/contracts/shiftLifecycle.ts"
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
