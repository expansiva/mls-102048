/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProjectStatus.defs.ts" enhancement="_blank"/>

export const updateProjectStatusUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateProjectStatus",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateProjectStatus",
    "ports": [
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "updateProjectStatus",
        "inputTypeName": "UpdateProjectStatusInput",
        "outputTypeName": "UpdateProjectStatusOutput",
        "input": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The project whose status is being changed"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The new lifecycle status for the project (active, completed, or cancelled)"
          },
          {
            "name": "cancellationReason",
            "type": "string",
            "required": false,
            "ofEntity": "Project",
            "description": "Reason recorded when the project is cancelled; required only when status is set to cancelled"
          }
        ],
        "output": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Project"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Project"
          },
          {
            "name": "completedAt",
            "type": "string",
            "required": false,
            "ofEntity": "Project"
          },
          {
            "name": "cancelledAt",
            "type": "string",
            "required": false,
            "ofEntity": "Project"
          },
          {
            "name": "cancellationReason",
            "type": "string",
            "required": false,
            "ofEntity": "Project"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Project"
          }
        ],
        "ports": [
          "Project",
          "MaterialUsage"
        ],
        "rulesApplied": [
          "projectRequiresClient",
          "projectDateRangeValid",
          "dashboardShowsActiveOnly"
        ],
        "transactional": true,
        "steps": [
          "1. Load the Project aggregate by projectId via the Project port (getById). If not found, return a not-found error.",
          "2. Validate the requested status is one of the allowed enum values: active, completed, cancelled.",
          "3. Apply rule projectDateRangeValid: verify project.startDate <= project.endDate; if invalid, reject with a validation error including the rule id.",
          "4. Apply rule projectRequiresClient: if the new status is 'active', verify project.clientId is not null and that the referenced Client exists in MDM via ctx.mdm.entity.get({ mdmId: project.clientId }). If clientId is null or the client does not exist, reject with a validation error including the rule id.",
          "5. If the new status is 'cancelled', validate that cancellationReason is provided and non-empty; if missing, reject with a validation error.",
          "6. Resolve system-default timestamps from ctx.clock: set updatedAt to now; if status is 'completed' set completedAt to now; if status is 'cancelled' set cancelledAt to now and record cancellationReason.",
          "7. Mutate the Project aggregate with the new status, timestamps, and cancellationReason (when applicable). Save the Project via its port inside the transaction.",
          "8. Append a MaterialUsage audit event through the MaterialUsage port inside the same transaction, recording the projectId, previous status, new status, and timestamp.",
          "9. Apply rule dashboardShowsActiveOnly: since the project status is now 'completed' or 'cancelled' (or 'active'), the dashboard read-side will naturally filter by status='active' only — no extra write needed; the rule is satisfied by the status field value stored.",
          "10. Return the updated project fields: projectId, name, status, completedAt, cancelledAt, cancellationReason, updatedAt."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default updateProjectStatusUsecase;

export const pipeline = [
  {
    "id": "updateProjectStatus__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProjectStatus.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProjectStatus.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
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
