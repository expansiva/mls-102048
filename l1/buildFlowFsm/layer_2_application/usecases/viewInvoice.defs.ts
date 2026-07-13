/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewInvoice.defs.ts" enhancement="_blank"/>

export const viewInvoiceUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewInvoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewInvoice",
    "ports": [
      "Invoice"
    ],
    "functions": [
      {
        "functionName": "viewInvoice",
        "inputTypeName": "ViewInvoiceInput",
        "outputTypeName": "ViewInvoiceResult",
        "input": [
          {
            "name": "invoiceId",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice",
            "description": "The invoice identifier extracted from the shareable link URL the client opened."
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
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Invoice lifecycle status: draft, issued, or voided."
          },
          {
            "name": "laborCost",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Total labor cost component in USD."
          },
          {
            "name": "materialCost",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Total material cost component in USD."
          },
          {
            "name": "changeOrderAmount",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Approved change order amount in USD."
          },
          {
            "name": "totalAmount",
            "type": "number",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Recalculated total: laborCost + materialCost + changeOrderAmount."
          },
          {
            "name": "currency",
            "type": "string",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Always 'usd' per allFiguresUsdNoTax rule."
          },
          {
            "name": "issuedAt",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice"
          },
          {
            "name": "shareLink",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice"
          },
          {
            "name": "clientEmail",
            "type": "string",
            "required": false,
            "ofEntity": "Invoice"
          },
          {
            "name": "invoiceLines",
            "type": "array",
            "required": false,
            "ofEntity": "InvoiceLine",
            "description": "Breakdown line items (labor, material, approved change orders) for display."
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
        "transactional": false,
        "steps": [
          "1. Load the Invoice aggregate (including embedded InvoiceLine items) by invoiceId via InvoicePort.getById(invoiceId).",
          "2. If no Invoice is found, return an empty/not-found result.",
          "3. Apply rule 'allFiguresUsdNoTax': assert invoice.currency === 'usd'; if not, throw a validation error with rule id 'allFiguresUsdNoTax'. No tax field is ever exposed in the output.",
          "4. Apply rule 'approvedChangeOrdersOnly': from the embedded InvoiceLine collection, filter lines where lineType === 'changeOrder' and retain only those whose sourceRecordId references an approved change order. Sum their lineAmount values to derive the effective changeOrderAmount. If the stored invoice.changeOrderAmount does not match this sum, use the recalculated sum and record the discrepancy.",
          "5. Apply rule 'invoiceCalculation': recalculate totalAmount = laborCost + materialCost + effectiveChangeOrderAmount. If the stored invoice.totalAmount differs from the recalculated value, use the recalculated value and record the discrepancy.",
          "6. Apply rule 'invoiceIsInformational': the returned projection contains no payment-processing, payment-gateway, or action fields — the view is strictly informational.",
          "7. Build the output projection with invoiceId, projectId, status, laborCost, materialCost, changeOrderAmount (effective), totalAmount (recalculated), currency, issuedAt, notes, shareLink, clientEmail, and the filtered invoiceLines array (labor, material, and approved change-order lines only).",
          "8. Return the projection."
        ]
      }
    ],
    "mdmRefs": []
  }
} as const;

export default viewInvoiceUsecase;

export const pipeline = [
  {
    "id": "viewInvoice__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewInvoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewInvoice.defs.ts",
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
