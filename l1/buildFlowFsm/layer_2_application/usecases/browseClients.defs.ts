/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseClients.defs.ts" enhancement="_blank"/>

export const browseClientsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseClients",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseClients",
    "ports": [],
    "functions": [
      {
        "functionName": "browseClients",
        "inputTypeName": "BrowseClientsInput",
        "outputTypeName": "BrowseClientsOutput",
        "input": [
          {
            "name": "searchName",
            "type": "string",
            "required": false,
            "description": "Optional text to filter clients by contact name (case-insensitive contains match)",
            "ofEntity": "Client"
          },
          {
            "name": "filterPortalAccess",
            "type": "boolean",
            "required": false,
            "description": "Optional filter to show only clients with portal access enabled or disabled",
            "ofEntity": "Client"
          }
        ],
        "output": [
          {
            "name": "clientId",
            "type": "string",
            "required": true,
            "description": "Unique identifier of the client",
            "ofEntity": "Client"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "description": "Contact name of the client",
            "ofEntity": "Client"
          },
          {
            "name": "companyName",
            "type": "string",
            "required": false,
            "description": "Company name of the client",
            "ofEntity": "Client"
          },
          {
            "name": "email",
            "type": "string",
            "required": true,
            "description": "Email address of the client",
            "ofEntity": "Client"
          },
          {
            "name": "phone",
            "type": "string",
            "required": false,
            "description": "Phone number of the client",
            "ofEntity": "Client"
          },
          {
            "name": "portalAccessEnabled",
            "type": "boolean",
            "required": true,
            "description": "Whether portal access is enabled for the client",
            "ofEntity": "Client"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "description": "Timestamp when the client record was created",
            "ofEntity": "Client"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "projectRequiresClient"
        ],
        "transactional": false,
        "steps": [
          "1. Retrieve all Client MDM records via ctx.mdm.collection.listByType({ type: 'Client' }) — Client is a master-data entity in the shared MDM store, so no runtime port is used.",
          "2. If searchName is provided (non-empty), filter the returned collection in memory to only those clients whose name field contains the search text (case-insensitive).",
          "3. If filterPortalAccess is provided (not null/undefined), filter the collection to only those clients whose portalAccessEnabled field equals the requested boolean value.",
          "4. Project each remaining Client MDM record to the output shape: clientId, name, companyName, email, phone, portalAccessEnabled, createdAt — reading these from the MDM record's details fields.",
          "5. Apply rule 'projectRequiresClient': the returned list represents the set of clients eligible to be linked to a new project. The rule is satisfied by ensuring the browse result is non-empty when a project creation workflow depends on client selection; if the filtered result is empty, return an empty list (the caller handles the 'no eligible client' case).",
          "6. Return the projected list sorted by createdAt descending so the most recently created clients appear first."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default browseClientsUsecase;

export const pipeline = [
  {
    "id": "browseClients__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseClients.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseClients.defs.ts",
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
