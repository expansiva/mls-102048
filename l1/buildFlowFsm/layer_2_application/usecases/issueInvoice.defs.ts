/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/issueInvoice.defs.ts" enhancement="_blank"/>

export const issueInvoiceUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "issueInvoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "issueInvoice",
    "ports": [
      "Invoice"
    ],
    "functions": [
      {
        "functionName": "issueInvoice",
        "inputTypeName": "IssueInvoiceInput",
        "outputTypeName": "IssueInvoiceOutput",
        "input": [
          {
            "name": "invoiceId",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice",
            "description": "The draft invoice to be issued and sent to the client."
          },
          {
            "name": "clientEmail",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice",
            "description": "Optional email address to deliver the invoice to the client; if omitted, only the shareable link is generated."
          }
        ],
        "output": [
          {
            "name": "invoiceId",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice"
          },
          {
            "name": "totalAmount",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice"
          },
          {
            "name": "shareLink",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice"
          },
          {
            "name": "clientEmail",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice"
          },
          {
            "name": "issuedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice"
          }
        ],
        "ports": [
          "Invoice"
        ],
        "rulesApplied": [
          "invoiceCalculation",
          "allFiguresUsdNoTax",
          "approvedChangeOrdersOnly",
          "invoiceIsInformational"
        ],
        "transactional": true,
        "steps": [
          "1. Load the Invoice aggregate by invoiceId via the Invoice port (getById). If not found, throw a validation error.",
          "2. Validate that invoice.status === 'draft'. If the status is not 'draft', throw a validation error with rule detail 'invoiceIsInformational: only draft invoices can be issued'.",
          "3. Apply rule 'allFiguresUsdNoTax': validate that invoice.currency === 'usd'. If not, throw a validation error. No tax field is computed or stored.",
          "4. Apply rule 'invoiceCalculation': compute totalAmount = invoice.laborCost + invoice.materialCost + invoice.changeOrderAmount. If the stored totalAmount does not match the computed value, update it to the correct computed value.",
          "5. Apply rule 'approvedChangeOrdersOnly': validate that invoice.changeOrderAmount reflects only approved change orders. Since the draft was created with a pre-calculated changeOrderAmount, verify it is non-negative and consistent; pending or rejected change orders must have been excluded at draft creation. If changeOrderAmount is negative, throw a validation error.",
          "6. Apply rule 'invoiceIsInformational': confirm no payment processing or payment gateway interaction is initiated. The invoice status transition to 'issued' is informational only — no external payment calls are made.",
          "7. Resolve context values: issuedAt = ctx.clock.now() (systemDefault), shareLink = ctx.idGenerator.generate() (systemDefault), actorId = ctx.sessionContext.actorId (actorSession, used for audit only).",
          "8. If clientEmail is provided in the input, set invoice.clientEmail to the provided value. If omitted, leave the existing clientEmail unchanged (may be null).",
          "9. Set invoice.status = 'issued', invoice.issuedAt = resolved timestamp, invoice.shareLink = generated link, invoice.updatedAt = resolved timestamp.",
          "10. Save the Invoice aggregate via the Invoice port inside the transaction (ctx.data transaction wrapper).",
          "11. Return { invoiceId, status, totalAmount, shareLink, clientEmail, issuedAt }."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default issueInvoiceUsecase;

export const pipeline = [
  {
    "id": "issueInvoice__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/issueInvoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/issueInvoice.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.d.ts"
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
