/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createProject.defs.ts" enhancement="_blank"/>

export const createProjectUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createProject",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createProject",
    "ports": [
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "createProject",
        "inputTypeName": "CreateProjectInput",
        "outputTypeName": "CreateProjectOutput",
        "input": [
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Project name or title shown on dashboards and reports"
          },
          {
            "name": "clientId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Reference to the client who owns this project; selected from existing clients"
          },
          {
            "name": "siteAddress",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Physical address of the construction or remodeling site"
          },
          {
            "name": "budget",
            "type": "number",
            "required": true,
            "ofEntity": "Project",
            "description": "Approved project budget in USD; must be a positive amount"
          },
          {
            "name": "startDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Planned project start date"
          },
          {
            "name": "endDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Planned project end date; must be on or after the start date"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Initial lifecycle status of the project; admin can set to draft or active"
          }
        ],
        "output": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "System-generated unique identifier for the created project"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Project name as stored"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Initial lifecycle status of the project"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Timestamp when the project record was created"
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
          "1. Validate budget is a positive amount greater than zero (rule projectBudgetPositive); reject with validation error if budget <= 0.",
          "2. Validate that startDate is on or before endDate (rule projectDateRangeValid); reject with validation error if startDate > endDate.",
          "3. Validate that status is one of the allowed enum values [draft, active, completed, cancelled]; for a create operation only draft or active are meaningful initial statuses.",
          "4. Resolve the client referenced by clientId via ctx.mdm.entity.get({ mdmId: clientId }) (rule projectRequiresClient); reject with validation error if the client does not exist.",
          "5. Generate projectId using ctx.idGenerator (systemDefault uuid).",
          "6. Set createdAt and updatedAt to ctx.clock.now() (systemDefault now).",
          "7. Construct the Project aggregate with all provided fields plus system-generated projectId, createdAt, and updatedAt.",
          "8. Persist the Project aggregate through the Project port inside a single transaction (ctx.data transaction wrapper).",
          "9. Emit a MaterialUsage audit event through the MaterialUsage port inside the same transaction, recording the project creation (entityId: projectId, action: 'projectCreated', timestamp: createdAt).",
          "10. Return projectId, name, status, and createdAt."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default createProjectUsecase;

export const pipeline = [
  {
    "id": "createProject__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createProject.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createProject.defs.ts",
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
