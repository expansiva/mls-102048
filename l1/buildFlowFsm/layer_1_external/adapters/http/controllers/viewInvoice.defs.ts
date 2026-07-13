/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewInvoice.defs.ts" enhancement="_blank"/>

export const viewInvoiceController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "viewInvoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "viewInvoice",
    "controllerName": "ViewInvoiceController",
    "ownerKind": "operation",
    "outputSource": "usecase",
    "handlers": [
      {
        "handlerName": "buildFlowFsmViewInvoiceHandler",
        "command": "viewInvoice",
        "usecaseRef": "viewInvoice",
        "inputTypeName": "ViewInvoiceInput",
        "kind": "view",
        "inputContract": [
          {
            "inputId": "invoiceId",
            "fieldRef": "Invoice.invoiceId",
            "required": true,
            "source": "routeParam",
            "description": "The invoice identifier extracted from the shareable link URL the client opened."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Invoice.invoiceId",
            "source": "routeParam",
            "originRef": "routeParam.invoiceId",
            "description": "The backend reads the invoiceId path parameter from the shareable link route and loads the single Invoice record matching that id."
          }
        ],
        "accessPattern": {
          "kind": "getById",
          "description": "",
          "entity": "Invoice",
          "keyField": "Invoice.invoiceId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "Invoice.invoiceId",
            "Invoice.projectId",
            "Invoice.status",
            "Invoice.laborCost",
            "Invoice.materialCost",
            "Invoice.changeOrderAmount",
            "Invoice.totalAmount",
            "Invoice.currency",
            "Invoice.issuedAt",
            "Invoice.notes",
            "Invoice.shareLink",
            "Invoice.clientEmail"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.viewInvoice.viewInvoice",
        "handlerName": "buildFlowFsmViewInvoiceHandler"
      }
    ]
  }
} as const;

export default viewInvoiceController;

export const pipeline = [
  {
    "id": "viewInvoice__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewInvoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/viewInvoice.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewInvoice.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
