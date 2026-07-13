/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createClient.defs.ts" enhancement="_blank"/>

export const createClientUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createClient",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createClient",
    "ports": [],
    "functions": [
      {
        "functionName": "createClient",
        "inputTypeName": "CreateClientInput",
        "outputTypeName": "CreateClientOutput",
        "input": [
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
            "description": "Indicates whether the client may log in to the portal using platform authentication to view project information."
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
            "description": "System-generated unique identifier for the created client record."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Client"
          },
          {
            "name": "companyName",
            "type": "string",
            "required": false,
            "ofEntity": "Client"
          },
          {
            "name": "email",
            "type": "string",
            "required": true,
            "ofEntity": "Client"
          },
          {
            "name": "phone",
            "type": "string",
            "required": false,
            "ofEntity": "Client"
          },
          {
            "name": "portalAccessEnabled",
            "type": "boolean",
            "required": true,
            "ofEntity": "Client"
          },
          {
            "name": "billingAddress",
            "type": "string",
            "required": false,
            "ofEntity": "Client"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "Client"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "clientAccessViaLinksOrAuth"
        ],
        "transactional": true,
        "steps": [
          "1. Validate required user inputs: name (non-empty string), email (non-empty, valid email format), portalAccessEnabled (boolean).",
          "2. Apply rule clientAccessViaLinksOrAuth: portalAccessEnabled must be an explicit boolean chosen by the actor — when true the client may use platform authentication; when false the client can only access project information via shareable links. Reject if portalAccessEnabled is missing or not a boolean.",
          "3. Generate clientId via ctx.idGenerator (systemDefault uuid).",
          "4. Resolve createdAt and updatedAt from ctx.clock.now() (systemDefault).",
          "5. Note: Client entity has no companyId/unitId scoping field — no business-context filter applied (modeling gap recorded).",
          "6. Build the MDM entity payload with all provided fields plus system-generated clientId, createdAt, updatedAt.",
          "7. Create the Client MDM record via ctx.mdm.entity.create({ mdmId, details: { clientId, name, companyName, email, phone, portalAccessEnabled, billingAddress, createdAt, updatedAt } }) inside a single ctx.data transaction wrapper.",
          "8. Return the created client projection: clientId, name, companyName, email, phone, portalAccessEnabled, billingAddress, createdAt."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default createClientUsecase;

export const pipeline = [
  {
    "id": "createClient__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createClient.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/createClient.defs.ts",
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
