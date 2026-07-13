/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewStatusReport.defs.ts" enhancement="_blank"/>

export const viewStatusReportUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewStatusReport",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewStatusReport",
    "ports": [
      "StatusReport",
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "viewStatusReport",
        "inputTypeName": "ViewStatusReportInput",
        "outputTypeName": "ViewStatusReportOutput",
        "input": [
          {
            "name": "statusReportId",
            "type": "uuid",
            "required": true,
            "ofEntity": "StatusReport",
            "description": "The identifier of the status report the client wants to view, provided via the share link route."
          }
        ],
        "output": [
          {
            "name": "statusReportId",
            "type": "uuid",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "projectId",
            "type": "uuid",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "content",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "reportPeriodStart",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "reportPeriodEnd",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "generatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "llmModelUsed",
            "type": "string",
            "required": false,
            "ofEntity": "StatusReport"
          },
          {
            "name": "sharedAt",
            "type": "string",
            "required": false,
            "ofEntity": "StatusReport"
          },
          {
            "name": "shareLink",
            "type": "string",
            "required": false,
            "ofEntity": "StatusReport"
          },
          {
            "name": "sharedWithEmail",
            "type": "string",
            "required": false,
            "ofEntity": "StatusReport"
          },
          {
            "name": "projectName",
            "type": "string",
            "required": true,
            "ofEntity": "Project"
          },
          {
            "name": "projectSiteAddress",
            "type": "string",
            "required": true,
            "ofEntity": "Project"
          }
        ],
        "ports": [
          "StatusReport",
          "Project"
        ],
        "rulesApplied": [
          "clientSeesPmStatusReport"
        ],
        "transactional": false,
        "steps": [
          "Load the StatusReport by statusReportId via the StatusReport port (getById).",
          "Apply rule clientSeesPmStatusReport: verify the loaded report has status 'shared'; if status is 'generated', reject with a validation error indicating the report has not yet been shared by the PM.",
          "Verify sharedAt and shareLink are present on the report; if either is missing, reject with a validation error indicating the report was not properly shared.",
          "Load the parent Project by the report's projectId via the Project port (getById) to enrich the response with project name and site address.",
          "Return the full report content (the exact content the PM generated and reviewed) along with project context fields."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default viewStatusReportUsecase;

export const pipeline = [
  {
    "id": "viewStatusReport__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewStatusReport.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewStatusReport.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
