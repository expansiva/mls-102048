/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/sendChangeOrder.defs.ts" enhancement="_blank"/>

export const sendChangeOrderUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "sendChangeOrder",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "sendChangeOrder",
    "ports": [
      "ChangeOrder",
      "Project",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "sendChangeOrder",
        "inputTypeName": "SendChangeOrderInput",
        "outputTypeName": "SendChangeOrderOutput",
        "input": [
          {
            "name": "changeOrderId",
            "type": "uuid",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "The change order selected by the project manager to send to the client."
          }
        ],
        "output": [
          {
            "name": "changeOrderId",
            "type": "uuid",
            "required": true,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "sentAt",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder"
          }
        ],
        "ports": [
          "ChangeOrder",
          "Project"
        ],
        "rulesApplied": [
          "changeOrderInAppApproval",
          "changeOrderRequiresProject",
          "approvedChangeOrdersOnly"
        ],
        "transactional": true,
        "steps": [
          "1. Load the ChangeOrder by changeOrderId via ChangeOrder port (getById).",
          "2. Validate rule 'changeOrderRequiresProject': the loaded ChangeOrder must have a non-null projectId; if null, reject with validation error referencing the rule id.",
          "3. Validate rule 'changeOrderInAppApproval': the ChangeOrder status must be 'draft'; if status is any other value, reject with validation error referencing the rule id — only draft change orders can be sent.",
          "4. Load the linked Project via Project port (getById) using ChangeOrder.projectId to confirm the project exists; if not found, reject with validation error.",
          "5. Set ChangeOrder.status to 'sent'.",
          "6. Set ChangeOrder.sentAt to ctx.clock.now() (systemDefault).",
          "7. Set ChangeOrder.updatedAt to ctx.clock.now() (systemDefault).",
          "8. Save the ChangeOrder via ChangeOrder port inside the transaction.",
          "9. Return changeOrderId, status, sentAt, updatedAt."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default sendChangeOrderUsecase;

export const pipeline = [
  {
    "id": "sendChangeOrder__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/sendChangeOrder.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/sendChangeOrder.defs.ts",
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
