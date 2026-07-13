/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/issueInvoice.defs.ts" enhancement="_blank"/>

export const issueInvoiceController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "issueInvoice",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "invoiceLifecycle",
    "controllerName": "IssueInvoiceController",
    "ownerKind": "operation",
    "outputSource": "contract",
    "handlers": [
      {
        "handlerName": "buildFlowFsmIssueInvoiceHandler",
        "command": "issueInvoice",
        "usecaseRef": "issueInvoice",
        "inputTypeName": "IssueInvoiceInput",
        "kind": "update",
        "inputContract": [
          {
            "inputId": "invoiceId",
            "fieldRef": "Invoice.invoiceId",
            "required": true,
            "source": "selectedEntity",
            "description": "The draft invoice to be issued and sent to the client."
          },
          {
            "inputId": "clientEmail",
            "fieldRef": "Invoice.clientEmail",
            "required": false,
            "source": "userInput",
            "description": "Optional email address to deliver the invoice to the client; if omitted, only the shareable link is generated."
          },
          {
            "inputId": "actorId",
            "fieldRef": "Invoice.invoiceId",
            "required": true,
            "source": "actorSession",
            "description": "The company admin issuing the invoice, used for audit and authorization."
          },
          {
            "inputId": "issuedAt",
            "fieldRef": "Invoice.issuedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp recorded when the invoice is issued."
          },
          {
            "inputId": "shareLink",
            "fieldRef": "Invoice.shareLink",
            "required": true,
            "source": "systemDefault",
            "description": "System-generated shareable link for delivering the invoice to the client."
          }
        ],
        "contextResolution": [
          {
            "targetRef": "Invoice.invoiceId",
            "source": "selectedEntity",
            "originRef": "Invoice.invoiceId",
            "description": "The invoice selected by the admin from the billing summary screen; resolved from the currently selected entity in the workspace."
          },
          {
            "targetRef": "Invoice.invoiceId",
            "source": "actorSession",
            "originRef": "actorSession.actorId",
            "description": "The authenticated company admin issuing the invoice, resolved from the active session for authorization and audit."
          },
          {
            "targetRef": "Invoice.issuedAt",
            "source": "systemDefault",
            "originRef": "systemDefault.now",
            "description": "The current server timestamp captured at the moment the invoice is issued."
          },
          {
            "targetRef": "Invoice.shareLink",
            "source": "systemDefault",
            "originRef": "systemDefault.uuid",
            "description": "A system-generated unique token used to build the shareable link for the client to access the invoice."
          }
        ],
        "accessPattern": {
          "kind": "commandInput",
          "description": "",
          "entity": "Invoice",
          "keyField": "Invoice.invoiceId",
          "pagination": "none",
          "selection": "single",
          "output": [
            "Invoice.invoiceId",
            "Invoice.status",
            "Invoice.totalAmount",
            "Invoice.shareLink",
            "Invoice.clientEmail",
            "Invoice.issuedAt"
          ]
        }
      }
    ],
    "routes": [
      {
        "key": "buildFlowFsm.invoiceLifecycle.issueInvoice",
        "handlerName": "buildFlowFsmIssueInvoiceHandler"
      }
    ]
  }
} as const;

export default issueInvoiceController;

export const pipeline = [
  {
    "id": "issueInvoice__httpController",
    "type": "httpController",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/issueInvoice.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers/issueInvoice.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/usecases/issueInvoice.d.ts",
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
