/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/queryTable.defs.ts" enhancement="_blank"/>

export const queryTableController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "queryTable",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "queryTable",
    "controllerName": "QueryTableController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "cafeFlowQueryTableByIdHandler",
        "command": "queryTableById",
        "usecaseRef": "queryTableById",
        "inputTypeName": "QueryTableByIdInput",
        "kind": "query"
      },
      {
        "handlerName": "cafeFlowQueryTablesHandler",
        "command": "queryTables",
        "usecaseRef": "queryTables",
        "inputTypeName": "QueryTablesInput",
        "kind": "query"
      },
      {
        "handlerName": "cafeFlowQueryTableHandler",
        "command": "queryTable",
        "usecaseRef": "queryTableById | queryTables",
        "kind": "dispatcher"
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.queryTable.queryTable",
        "handlerName": "cafeFlowQueryTableHandler"
      },
      {
        "key": "cafeFlow.queryTable.queryTableById",
        "handlerName": "cafeFlowQueryTableByIdHandler"
      },
      {
        "key": "cafeFlow.queryTable.queryTables",
        "handlerName": "cafeFlowQueryTablesHandler"
      }
    ]
  }
} as const;

export default queryTableController;

export const pipeline = [
  {
    "id": "queryTable__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/queryTable.ts",
    "defPath": "_102048_/l1/cafeFlow/layer_1_external/adapters/http/controllers/queryTable.defs.ts",
    "dependsFiles": [
      "_102048_/l1/cafeFlow/layer_2_application/usecases/queryTable.d.ts",
      "_102048_/l2/cafeFlow/web/contracts/queryTable.ts"
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
