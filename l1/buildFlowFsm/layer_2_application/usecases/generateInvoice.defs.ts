/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateInvoice.defs.ts" enhancement="_blank"/>

export const generateInvoiceUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "generateInvoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "generateInvoice",
    "ports": [
      "Invoice",
      "Project",
      "ChangeOrder",
      "MaterialUsage"
    ],
    "functions": [
      {
        "functionName": "generateInvoice",
        "inputTypeName": "GenerateInvoiceInput",
        "outputTypeName": "GenerateInvoiceOutput",
        "input": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The project to generate an invoice for, selected by the admin from the project list"
          },
          {
            "name": "clientEmail",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice",
            "description": "Optional email address to deliver the invoice to the client"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice",
            "description": "Optional internal notes about the invoice"
          }
        ],
        "output": [
          {
            "name": "invoiceId",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice",
            "description": "System-generated unique identifier for the invoice record"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Invoice status, always 'draft' upon generation"
          },
          {
            "name": "laborCost",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Total labor cost computed from approved time logs on the project"
          },
          {
            "name": "materialCost",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Total material cost computed from material usage records on the project"
          },
          {
            "name": "changeOrderAmount",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Total amount from approved change orders on the project"
          },
          {
            "name": "totalAmount",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Calculated total of laborCost plus materialCost plus changeOrderAmount"
          },
          {
            "name": "currency",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Currency code, always 'usd'"
          },
          {
            "name": "shareLink",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice",
            "description": "System-generated shareable link for delivering the invoice to the client"
          },
          {
            "name": "clientEmail",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice",
            "description": "Email address the invoice is addressed to"
          }
        ],
        "ports": [
          "Invoice",
          "Project",
          "ChangeOrder"
        ],
        "rulesApplied": [
          "invoiceCalculation",
          "allFiguresUsdNoTax",
          "approvedChangeOrdersOnly",
          "invoiceIsInformational"
        ],
        "transactional": true,
        "steps": [
          "1. Load Project by projectId via Project port (getById); validate it exists — throw validation error if not found",
          "2. Extract clientId from the loaded Project",
          "3. Load Client master-data via ctx.mdm.entity.get({ mdmId: clientId }) to obtain client email and name",
          "4. If clientEmail input is not provided, fall back to Client.email from MDM record",
          "5. Query ChangeOrders for the project via ChangeOrder port (list by projectId); filter to status === 'approved' only (rule: approvedChangeOrdersOnly)",
          "6. Sum the 'amount' field of all approved change orders → changeOrderAmount",
          "7. Resolve laborCost and materialCost from previousStepOutput flow context — these were computed in the billing summary review step by summing approved TimeLog costs and MaterialUsage costs respectively. NOTE: TimeLog and MaterialUsage are declared in reads but not in ports; this is a modeling gap — the usecase relies on the prior step's computed values rather than re-querying those aggregates",
          "8. Compute totalAmount = laborCost + materialCost + changeOrderAmount (rule: invoiceCalculation); validate the sum matches — throw if inconsistent",
          "9. Set currency = 'usd' for all monetary figures (rule: allFiguresUsdNoTax); no tax computation is performed",
          "10. Generate invoiceId via ctx.idGenerator",
          "11. Generate a unique share token via ctx.idGenerator and construct shareLink (e.g. '/invoices/share/{token}')",
          "12. Set createdAt = updatedAt = ctx.clock.now() (ISO datetime string)",
          "13. Set status = 'draft' — the invoice is an informational billing summary only, no payment is initiated or processed (rule: invoiceIsInformational)",
          "14. Build the Invoice aggregate with all resolved fields (invoiceId, projectId, status='draft', laborCost, materialCost, changeOrderAmount, totalAmount, currency='usd', shareLink, clientEmail, notes, createdAt, updatedAt)",
          "15. Persist the Invoice via Invoice port (create) inside a single transaction (ctx.data transaction wrapper)",
          "16. Return the projected output fields: invoiceId, status, laborCost, materialCost, changeOrderAmount, totalAmount, currency, shareLink, clientEmail"
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default generateInvoiceUsecase;

export const pipeline = [
  {
    "id": "generateInvoice__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateInvoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateInvoice.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.d.ts",
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
