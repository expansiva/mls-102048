/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.defs.ts" enhancement="_blank"/>

export const invoiceRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "InvoiceRepository",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Invoice",
    "interfaceName": "IInvoiceRepository",
    "methods": [
      {
        "name": "getById",
        "params": [
          "id: InvoiceId"
        ],
        "returns": "Invoice",
        "description": "Retrieve a single invoice by its identity."
      },
      {
        "name": "list",
        "params": [
          "filter: InvoiceFilter"
        ],
        "returns": "Invoice[]",
        "description": "List invoices matching the supplied domain filter."
      },
      {
        "name": "save",
        "params": [
          "aggregate: Invoice"
        ],
        "returns": "void",
        "description": "Persist the invoice aggregate root and its invoice lines."
      },
      {
        "name": "findByProjectId",
        "params": [
          "projectId: ProjectId"
        ],
        "returns": "Invoice[]",
        "description": "Domain finder: all invoices issued for a project."
      },
      {
        "name": "findByStatus",
        "params": [
          "status: InvoiceStatus"
        ],
        "returns": "Invoice[]",
        "description": "Domain finder: all invoices in a given lifecycle status."
      },
      {
        "name": "findOverdue",
        "params": [
          "asOfDate: LocalDate"
        ],
        "returns": "Invoice[]",
        "description": "Domain finder: invoices whose due date is before the given date and remain unpaid."
      }
    ]
  }
} as const;

export default invoiceRepositoryPort;

export const pipeline = [
  {
    "id": "invoiceRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.d.ts"
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
