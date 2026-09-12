/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateInvoice.defs.ts" enhancement="_blank"/>

export const generateInvoiceController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "generateInvoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "invoiceLifecycle",
    "controllerName": "GenerateInvoiceController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmGenerateInvoiceHandler",
        "command": "generateInvoice",
        "usecaseRef": "generateInvoice",
        "inputTypeName": "GenerateInvoiceInput",
        "kind": "create",
        "inputContract": [
          {
            "inputId": "projectId",
            "fieldRef": "Invoice.projectId",
            "required": true,
            "source": "selectedEntity",
            "description": "The project to generate an invoice for, selected by the admin from the project list"
          },
          {
            "inputId": "clientEmail",
            "fieldRef": "Invoice.clientEmail",
            "required": false,
            "source": "userInput",
            "description": "Optional email address to deliver the invoice to the client"
          },
          {
            "inputId": "notes",
            "fieldRef": "Invoice.notes",
            "required": false,
            "source": "userInput",
            "description": "Optional internal notes about the invoice"
          },
          {
            "inputId": "laborCost",
            "fieldRef": "Invoice.laborCost",
            "required": true,
            "source": "previousStepOutput",
            "description": "Total labor cost computed from approved time logs on the project"
          },
          {
            "inputId": "materialCost",
            "fieldRef": "Invoice.materialCost",
            "required": true,
            "source": "previousStepOutput",
            "description": "Total material cost computed from material usage records on the project"
          },
          {
            "inputId": "changeOrderAmount",
            "fieldRef": "Invoice.changeOrderAmount",
            "required": true,
            "source": "previousStepOutput",
            "description": "Total amount from approved change orders on the project"
          },
          {
            "inputId": "totalAmount",
            "fieldRef": "Invoice.totalAmount",
            "required": true,
            "source": "previousStepOutput",
            "description": "Calculated total of labor cost plus material cost plus approved change order amounts"
          },
          {
            "inputId": "currency",
            "fieldRef": "Invoice.currency",
            "required": true,
            "source": "systemDefault",
            "description": "Currency code for all monetary figures, always USD"
          },
          {
            "inputId": "shareLink",
            "fieldRef": "Invoice.shareLink",
            "required": false,
            "source": "systemDefault",
            "description": "System-generated shareable link for delivering the invoice to the client"
          },
          {
            "inputId": "invoiceId",
            "fieldRef": "Invoice.invoiceId",
            "required": true,
            "source": "systemDefault",
            "description": "System-generated unique identifier for the invoice record"
          },
          {
            "inputId": "createdAt",
            "fieldRef": "Invoice.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp when the invoice record is created"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Invoice.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp when the invoice record is last updated, set to creation time"
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Invoice.projectId",
            "source": "selectedEntity",
            "originRef": "Project.projectId",
            "description": "The project selected by the admin in the project picker, resolved from the current selection context"
          },
          {
            "targetRef": "Invoice.laborCost",
            "source": "previousStepOutput",
            "originRef": "Invoice.laborCost",
            "description": "Computed by summing approved TimeLog costs for the selected project during the billing summary review step"
          },
          {
            "targetRef": "Invoice.materialCost",
            "source": "previousStepOutput",
            "originRef": "Invoice.materialCost",
            "description": "Computed by summing MaterialUsage costs for the selected project during the billing summary review step"
          },
          {
            "targetRef": "Invoice.changeOrderAmount",
            "source": "previousStepOutput",
            "originRef": "Invoice.changeOrderAmount",
            "description": "Computed by summing only approved ChangeOrder amounts for the selected project during the billing summary review step"
          },
          {
            "targetRef": "Invoice.totalAmount",
            "source": "previousStepOutput",
            "originRef": "Invoice.totalAmount",
            "description": "Calculated as laborCost plus materialCost plus changeOrderAmount during the billing summary review step"
          },
          {
            "targetRef": "Invoice.currency",
            "source": "systemDefault",
            "originRef": "systemDefault.locale",
            "description": "Resolved to USD based on system configuration; all monetary figures must be in USD per domain rule"
          },
          {
            "targetRef": "Invoice.shareLink",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "System generates a unique token used to construct a shareable link for the invoice"
          },
          {
            "targetRef": "Invoice.invoiceId",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "System generates a new UUID as the primary identifier for the invoice record"
          },
          {
            "targetRef": "Invoice.createdAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Current timestamp captured at the moment of invoice creation"
          },
          {
            "targetRef": "Invoice.updatedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "Current timestamp captured at the moment of invoice creation, matching createdAt"
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "Invoice",
          "keyField": "Invoice.invoiceId",
          "pagination": "none",
          "selection": "none",
          "output": [
            "Invoice.invoiceId",
            "Invoice.status",
            "Invoice.laborCost",
            "Invoice.materialCost",
            "Invoice.changeOrderAmount",
            "Invoice.totalAmount",
            "Invoice.currency",
            "Invoice.shareLink",
            "Invoice.clientEmail"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.invoiceLifecycle.generateInvoice",
        "handlerName": "buildFlowFsmGenerateInvoiceHandler"
      }
    ]
  }
} as const;

export default generateInvoiceController;

export const pipeline = [
  {
    "id": "generateInvoice__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateInvoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/generateInvoice.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateInvoice.d.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.ts"
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
