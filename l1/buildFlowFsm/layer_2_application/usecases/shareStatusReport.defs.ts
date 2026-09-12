/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/shareStatusReport.defs.ts" enhancement="_blank"/>

export const shareStatusReportUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "shareStatusReport",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "shareStatusReport",
    "ports": [
      "StatusReport",
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "shareStatusReport",
        "inputTypeName": "ShareStatusReportInput",
        "outputTypeName": "ShareStatusReportOutput",
        "input": [
          {
            "name": "statusReportId",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport",
            "description": "The status report the PM selected to share with the client."
          },
          {
            "name": "sharedWithEmail",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport",
            "description": "The client email address the PM enters to send the status report notification."
          }
        ],
        "output": [
          {
            "name": "statusReportId",
            "type": "string",
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
            "name": "sharedAt",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "shareLink",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          },
          {
            "name": "sharedWithEmail",
            "type": "string",
            "required": true,
            "ofEntity": "StatusReport"
          }
        ],
        "ports": [
          "StatusReport",
          "Project"
        ],
        "rulesApplied": [
          "clientSeesPmStatusReport"
        ],
        "transactional": true,
        "steps": [
          "1. Load the StatusReport by statusReportId via the StatusReport port (getById).",
          "2. Validate the report status is 'generated' — if not, fail with a validation error referencing rule 'clientSeesPmStatusReport'.",
          "3. Load the parent Project via the Project port (getById) using StatusReport.projectId to obtain the clientId.",
          "4. Resolve the Client from MDM by clientId via ctx.mdm.entity.get to verify the client exists and retrieve the client email for cross-reference.",
          "5. Resolve actorId from ctx.sessionContext.actorId (actorSession context).",
          "6. Generate sharedAt from ctx.clock.now() (systemDefault).",
          "7. Generate shareLink using ctx.idGenerator.generate() (systemDefault) — build a unique shareable link token.",
          "8. Mutate the StatusReport: set status='shared', sharedAt, shareLink, sharedWithEmail (from user input), updatedAt=ctx.clock.now(), updatedBy=actorId.",
          "9. Save the StatusReport via the StatusReport port inside the same transaction.",
          "10. Return the updated statusReportId, status, sharedAt, shareLink, and sharedWithEmail."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default shareStatusReportUsecase;

export const pipeline = [
  {
    "id": "shareStatusReport__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/shareStatusReport.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/shareStatusReport.defs.ts",
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
