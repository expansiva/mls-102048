/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceLineRepository.defs.ts" enhancement="_blank"/>

export const invoiceLineRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "InvoiceLineRepository",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "InvoiceLine",
    "interfaceName": "IInvoiceLineRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "InvoiceLine | null",
        "params": [
          "id: InvoiceLineId"
        ]
      },
      {
        "name": "list",
        "returns": "InvoiceLine[]",
        "params": [
          "filter: InvoiceLineFilter"
        ]
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "aggregate: InvoiceLine"
        ]
      },
      {
        "name": "listByInvoiceId",
        "returns": "InvoiceLine[]",
        "params": [
          "invoiceId: InvoiceId"
        ]
      }
    ]
  }
} as const;

export default invoiceLineRepositoryPort;

export const pipeline = [
  {
    "id": "invoiceLineRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceLineRepository.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceLineRepository.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoiceLine.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
