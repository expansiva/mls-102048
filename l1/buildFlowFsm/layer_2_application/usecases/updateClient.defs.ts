/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateClient.defs.ts" enhancement="_blank"/>

export const updateClientUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateClient",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateClient",
    "ports": [],
    "functions": [
      {
        "functionName": "updateClient",
        "inputTypeName": "UpdateClientInput",
        "outputTypeName": "UpdateClientOutput",
        "input": [
          {
            "name": "clientId",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "The identifier of the client record being edited, resolved from the selected entity context."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "Full name of the client contact person."
          },
          {
            "name": "companyName",
            "type": "string",
            "required": false,
            "ofEntity": "Client",
            "description": "Legal name of the client's organization, if applicable."
          },
          {
            "name": "email",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "Primary email address used to send shareable project links and invoices."
          },
          {
            "name": "phone",
            "type": "string",
            "required": false,
            "ofEntity": "Client",
            "description": "Contact phone number for the client."
          },
          {
            "name": "portalAccessEnabled",
            "type": "boolean",
            "required": true,
            "ofEntity": "Client",
            "description": "Toggle indicating whether the client may log in to the portal using platform authentication."
          },
          {
            "name": "billingAddress",
            "type": "string",
            "required": false,
            "ofEntity": "Client",
            "description": "Postal address used on informational invoices sent to the client."
          }
        ],
        "output": [
          {
            "name": "clientId",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "The identifier of the updated client record."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "Full name of the client contact person."
          },
          {
            "name": "companyName",
            "type": "string",
            "required": false,
            "ofEntity": "Client",
            "description": "Legal name of the client's organization."
          },
          {
            "name": "email",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "Primary email address."
          },
          {
            "name": "phone",
            "type": "string",
            "required": false,
            "ofEntity": "Client",
            "description": "Contact phone number."
          },
          {
            "name": "portalAccessEnabled",
            "type": "boolean",
            "required": true,
            "ofEntity": "Client",
            "description": "Whether the client may access the portal via platform authentication."
          },
          {
            "name": "billingAddress",
            "type": "string",
            "required": false,
            "ofEntity": "Client",
            "description": "Postal address for invoices."
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "Server-side timestamp set at the moment the update is persisted."
          }
        ],
        "ports": [],
        "rulesApplied": [
          "clientAccessViaLinksOrAuth"
        ],
        "transactional": false,
        "steps": [
          "Load the existing Client MDM record by clientId via ctx.mdm.entity.get({ mdmId: clientId }); if not found, throw a validation error with rule clientAccessViaLinksOrAuth context.",
          "Validate required fields: name must be a non-empty string and email must be a non-empty string; if either is missing, throw a validation error.",
          "Apply rule clientAccessViaLinksOrAuth inline: when portalAccessEnabled is true the client is granted platform-authentication access to project information; when false the client may only access project information via shareable links. The portalAccessEnabled flag is the enforcement point — no additional state mutation is required beyond persisting the flag value.",
          "Resolve updatedAt from ctx.clock.now() (systemDefault) — do not accept it from the client.",
          "Update the Client MDM record via ctx.mdm.entity.update({ mdmId: clientId, details: { name, companyName, email, phone, portalAccessEnabled, billingAddress, updatedAt } }).",
          "Return the updated client fields: clientId, name, companyName, email, phone, portalAccessEnabled, billingAddress, updatedAt."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default updateClientUsecase;

export const pipeline = [
  {
    "id": "updateClient__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateClient.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/updateClient.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
