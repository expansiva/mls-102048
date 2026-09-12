/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProject.defs.ts" enhancement="_blank"/>

export const updateProjectUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateProject",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateProject",
    "ports": [
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "updateProject",
        "inputTypeName": "UpdateProjectInput",
        "outputTypeName": "UpdateProjectOutput",
        "input": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Identifier of the project being edited, from the route parameter."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated project name or title."
          },
          {
            "name": "clientId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated reference to the client who owns this project."
          },
          {
            "name": "siteAddress",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated physical address of the construction or remodeling site."
          },
          {
            "name": "budget",
            "type": "number",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated approved project budget in USD; must be a positive amount."
          },
          {
            "name": "startDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated planned project start date."
          },
          {
            "name": "endDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated planned project end date; must be on or after the start date."
          }
        ],
        "output": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Identifier of the updated project."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated project name."
          },
          {
            "name": "clientId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Client reference of the updated project."
          },
          {
            "name": "siteAddress",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated site address."
          },
          {
            "name": "budget",
            "type": "number",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated budget amount."
          },
          {
            "name": "startDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated start date."
          },
          {
            "name": "endDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Updated end date."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Current project status (unchanged by this edit)."
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Server-generated timestamp reflecting the time of the edit."
          }
        ],
        "ports": [
          "Project",
          "MaterialUsage"
        ],
        "rulesApplied": [
          "projectBudgetPositive",
          "projectDateRangeValid",
          "projectRequiresClient"
        ],
        "transactional": true,
        "steps": [
          "Load the existing Project aggregate by projectId via the Project port (getById). If not found, reject with a not-found error.",
          "Validate projectBudgetPositive: if budget <= 0, reject with validation error including rule id 'projectBudgetPositive'.",
          "Validate projectDateRangeValid: if startDate > endDate, reject with validation error including rule id 'projectDateRangeValid'.",
          "Validate projectRequiresClient: resolve the clientId in MDM via ctx.mdm.entity.get({ mdmId: clientId }). If the Client does not exist (or is inactive), reject with validation error including rule id 'projectRequiresClient'. If the existing project status is 'active', this check is mandatory; otherwise it still validates the referenced client exists.",
          "Apply the field updates to the loaded Project: name, clientId, siteAddress, budget, startDate, endDate. Set updatedAt to ctx.clock.now(). Preserve status, createdAt, completedAt, cancelledAt, cancellationReason as-is.",
          "Save the updated Project aggregate via the Project port inside the transaction.",
          "Append a MaterialUsage audit event record through the MaterialUsage port inside the same transaction, capturing the projectId, the changed fields, and the updatedAt timestamp.",
          "Return the updated project fields: projectId, name, clientId, siteAddress, budget, startDate, endDate, status, updatedAt."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default updateProjectUsecase;

export const pipeline = [
  {
    "id": "updateProject__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProject.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateProject.defs.ts",
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
