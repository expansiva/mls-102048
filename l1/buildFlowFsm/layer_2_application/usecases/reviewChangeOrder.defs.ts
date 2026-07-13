/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/reviewChangeOrder.defs.ts" enhancement="_blank"/>

export const reviewChangeOrderUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "reviewChangeOrder",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "reviewChangeOrder",
    "ports": [
      "ChangeOrder"
    ],
    "functions": [
      {
        "functionName": "reviewChangeOrder",
        "inputTypeName": "ReviewChangeOrderInput",
        "outputTypeName": "ReviewChangeOrderOutput",
        "input": [
          {
            "name": "changeOrderId",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Identifier of the change order being reviewed, from the URL route."
          },
          {
            "name": "decision",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "The client's decision: 'approve' or 'reject'."
          },
          {
            "name": "rejectionReason",
            "type": "string",
            "required": false,
            "ofEntity": "ChangeOrder",
            "description": "Optional reason provided when rejecting the change order."
          }
        ],
        "output": [
          {
            "name": "changeOrderId",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "scopeDescription",
            "type": "string",
            "required": true,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "amount",
            "type": "number",
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
            "required": false,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "approvedAt",
            "type": "string",
            "required": false,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "rejectedAt",
            "type": "string",
            "required": false,
            "ofEntity": "ChangeOrder"
          },
          {
            "name": "rejectionReason",
            "type": "string",
            "required": false,
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
          "ChangeOrder"
        ],
        "rulesApplied": [
          "changeOrderInAppApproval",
          "approvedChangeOrdersOnly"
        ],
        "transactional": true,
        "steps": [
          "1. Load the ChangeOrder aggregate by changeOrderId via the ChangeOrder port (getById).",
          "2. Validate the current status is 'sent' — rule changeOrderInAppApproval: only a sent change order can be reviewed. If status is draft/approved/rejected/cancelled, reject with a validation error citing changeOrderInAppApproval.",
          "3. Validate decision is either 'approve' or 'reject'; otherwise reject with a validation error.",
          "4. If decision is 'reject' and rejectionReason is empty, allow it (rejectionReason is optional) but store it if provided.",
          "5. If decision is 'approve': set status to 'approved', set approvedAt to ctx.clock.now(), set updatedAt to ctx.clock.now().",
          "6. If decision is 'reject': set status to 'rejected', set rejectedAt to ctx.clock.now(), set rejectionReason to the provided value (or null), set updatedAt to ctx.clock.now().",
          "7. Save the ChangeOrder aggregate through its port inside the transaction.",
          "8. Return the updated change order projection: changeOrderId, title, scopeDescription, amount, status, sentAt, approvedAt, rejectedAt, rejectionReason, updatedAt."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default reviewChangeOrderUsecase;

export const pipeline = [
  {
    "id": "reviewChangeOrder__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/reviewChangeOrder.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/reviewChangeOrder.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.d.ts"
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
