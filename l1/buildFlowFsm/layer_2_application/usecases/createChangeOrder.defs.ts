/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createChangeOrder.defs.ts" enhancement="_blank"/>

export const createChangeOrderUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createChangeOrder",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createChangeOrder",
    "ports": [
      "ChangeOrder",
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "createChangeOrder",
        "inputTypeName": "CreateChangeOrderInput",
        "outputTypeName": "CreateChangeOrderOutput",
        "input": [
          {
            "name": "projectId",
            "type": "uuid",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "The project this change order belongs to, sourced from the current route."
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Short title summarizing the scope change."
          },
          {
            "name": "scopeDescription",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Detailed description of the scope change being requested."
          },
          {
            "name": "amount",
            "type": "number",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Cost impact of the change order in USD."
          }
        ],
        "output": [
          {
            "name": "changeOrderId",
            "type": "uuid",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Generated UUID for the new change order record."
          },
          {
            "name": "projectId",
            "type": "uuid",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "The project this change order belongs to."
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Short title summarizing the scope change."
          },
          {
            "name": "scopeDescription",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Detailed description of the scope change."
          },
          {
            "name": "amount",
            "type": "number",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Cost impact of the change order in USD."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Initial lifecycle state set to draft."
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Timestamp when the change order record is created."
          }
        ],
        "ports": [
          "ChangeOrder",
          "Project"
        ],
        "rulesApplied": [
          "changeOrderRequiresProject",
          "changeOrderInAppApproval"
        ],
        "transactional": true,
        "steps": [
          "1. Validate that projectId is provided and non-empty (rule: changeOrderRequiresProject).",
          "2. Load the Project aggregate via Project port using projectId to confirm the project exists and is valid.",
          "3. If the project does not exist, reject with a validation error referencing rule changeOrderRequiresProject.",
          "4. Validate that title is non-empty, scopeDescription is non-empty, and amount is a positive number.",
          "5. Generate changeOrderId via ctx.idGenerator.",
          "6. Set status to 'draft' per the changeOrderLifecycle workflow (rule: changeOrderInAppApproval — in-app approval, no e-signature required).",
          "7. Set createdAt and updatedAt to ctx.clock.now().",
          "8. Create the ChangeOrder record via the ChangeOrder port inside a single transaction.",
          "9. Return the created ChangeOrder with changeOrderId, projectId, title, scopeDescription, amount, status, and createdAt."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default createChangeOrderUsecase;

export const pipeline = [
  {
    "id": "createChangeOrder__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createChangeOrder.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createChangeOrder.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.d.ts",
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
