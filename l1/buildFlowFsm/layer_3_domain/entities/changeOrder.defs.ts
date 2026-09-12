/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.defs.ts" enhancement="_blank"/>

export const changeOrderDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "ChangeOrder",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "ChangeOrder",
    "fields": [
      {
        "fieldId": "changeOrderId",
        "type": "uuid",
        "required": true,
        "description": "Primary identifier for the change order record."
      },
      {
        "fieldId": "projectId",
        "type": "uuid",
        "required": true,
        "description": "Reference to the project this change order belongs to."
      },
      {
        "fieldId": "title",
        "type": "string",
        "required": true,
        "description": "Short title summarizing the scope change."
      },
      {
        "fieldId": "scopeDescription",
        "type": "text",
        "required": true,
        "description": "Detailed description of the scope change being requested."
      },
      {
        "fieldId": "amount",
        "type": "money",
        "required": true,
        "description": "Cost impact of the change order in USD; only included in invoicing and job costing when approved."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "In-app approval status of the change order; determines whether it affects job costing and invoicing.",
        "enum": [
          "draft",
          "sent",
          "approved",
          "rejected",
          "cancelled"
        ]
      },
      {
        "fieldId": "sentAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the change order was sent to the client for approval."
      },
      {
        "fieldId": "approvedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the client approved the change order in-app."
      },
      {
        "fieldId": "rejectedAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the client rejected the change order in-app."
      },
      {
        "fieldId": "cancelledAt",
        "type": "datetime",
        "required": false,
        "description": "Timestamp when the change order was cancelled."
      },
      {
        "fieldId": "rejectionReason",
        "type": "text",
        "required": false,
        "description": "Reason provided by the client when rejecting the change order."
      },
      {
        "fieldId": "cancellationReason",
        "type": "text",
        "required": false,
        "description": "Reason recorded when the change order is cancelled internally."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp when the change order record was created."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Timestamp of the last modification to the change order record."
      }
    ],
    "statusEnum": [
      "draft",
      "sent",
      "approved",
      "rejected",
      "cancelled"
    ],
    "invariants": [
      "amount must be a positive monetary value",
      "status transitions: draft→sent→approved|rejected, draft→cancelled, sent→cancelled",
      "sentAt must be set when status is sent, approved, or rejected",
      "approvedAt must be set when status is approved",
      "rejectedAt and rejectionReason must be set when status is rejected",
      "cancelledAt and cancellationReason must be set when status is cancelled",
      "only approved change orders affect job costing and invoicing",
      "rejectionReason is required only when status is rejected",
      "cancellationReason is required only when status is cancelled"
    ],
    "valueObjects": []
  }
} as const;

export default changeOrderDomainEntity;

export const pipeline = [
  {
    "id": "changeOrder__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
