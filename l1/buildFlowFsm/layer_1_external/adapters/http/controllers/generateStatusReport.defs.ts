/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateStatusReport.defs.ts" enhancement="_blank"/>

export const generateStatusReportController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "generateStatusReport",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "statusReportLifecycle",
    "controllerName": "GenerateStatusReportController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmGenerateStatusReportHandler",
        "command": "generateStatusReport",
        "usecaseRef": "generateStatusReport",
        "inputTypeName": "GenerateStatusReportInput",
        "kind": "create",
        "inputContract": [
          {
            "inputId": "projectId",
            "fieldRef": "StatusReport.projectId",
            "required": true,
            "source": "routeParam",
            "description": "Project identifier from the project detail page route parameter."
          },
          {
            "inputId": "reportPeriodStart",
            "fieldRef": "StatusReport.reportPeriodStart",
            "required": true,
            "source": "userInput",
            "description": "Start date of the reporting period the PM wants the report to cover."
          },
          {
            "inputId": "reportPeriodEnd",
            "fieldRef": "StatusReport.reportPeriodEnd",
            "required": true,
            "source": "userInput",
            "description": "End date of the reporting period the PM wants the report to cover."
          },
          {
            "inputId": "statusReportId",
            "fieldRef": "StatusReport.statusReportId",
            "required": true,
            "source": "systemDefault",
            "description": "System-generated UUID for the new status report record."
          },
          {
            "inputId": "content",
            "fieldRef": "StatusReport.content",
            "required": true,
            "source": "previousStepOutput",
            "description": "AI-generated plain-language report content produced by the LLM proxy from compiled task, time log, and material data."
          },
          {
            "inputId": "generatedAt",
            "fieldRef": "StatusReport.generatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp when the LLM proxy generates the report content."
          },
          {
            "inputId": "llmModelUsed",
            "fieldRef": "StatusReport.llmModelUsed",
            "required": false,
            "source": "previousStepOutput",
            "description": "Identifier of the LLM model returned by the platform proxy after generation."
          },
          {
            "inputId": "createdAt",
            "fieldRef": "StatusReport.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Record creation timestamp set by the backend."
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "StatusReport.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Record last-update timestamp set by the backend."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "StatusReport.projectId",
            "source": "routeParam",
            "originRef": "routeParam.projectId",
            "description": "Resolved from the project detail page route parameter identifying the active project."
          },
          {
            "targetRef": "StatusReport.statusReportId",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "The backend generates a new UUID for the status report record at creation time."
          },
          {
            "targetRef": "StatusReport.content",
            "source": "previousStepOutput",
            "originRef": "StatusReport.content",
            "description": "The backend reads WorkTask, TimeLog, and MaterialUsage records for the project within the reporting period, sends the compiled data to the platform LLM proxy, and stores the returned plain-language report text as content."
          },
          {
            "targetRef": "StatusReport.generatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend records the current timestamp at the moment the LLM proxy returns the generated content."
          },
          {
            "targetRef": "StatusReport.llmModelUsed",
            "source": "previousStepOutput",
            "originRef": "StatusReport.llmModelUsed",
            "description": "The platform LLM proxy response includes the model identifier used, which the backend stores on the record."
          },
          {
            "targetRef": "StatusReport.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets the creation timestamp to the current time when persisting the new record."
          },
          {
            "targetRef": "StatusReport.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The backend sets the last-update timestamp to the current time when persisting the new record."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "StatusReport",
          "keyField": "StatusReport.statusReportId",
          "pagination": "none",
          "selection": "none",
          "output": [
            "StatusReport.statusReportId",
            "StatusReport.projectId",
            "StatusReport.status",
            "StatusReport.content",
            "StatusReport.reportPeriodStart",
            "StatusReport.reportPeriodEnd",
            "StatusReport.generatedAt",
            "StatusReport.llmModelUsed",
            "StatusReport.createdAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.statusReportLifecycle.generateStatusReport",
        "handlerName": "buildFlowFsmGenerateStatusReportHandler"
      }
    ]
  }
} as const;

export default generateStatusReportController;

export const pipeline = [
  {
    "id": "generateStatusReport__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateStatusReport.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateStatusReport.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateStatusReport.d.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.ts"
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
