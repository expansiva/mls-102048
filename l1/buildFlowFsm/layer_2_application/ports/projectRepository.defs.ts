/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.defs.ts" enhancement="_blank"/>

export const projectRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "ProjectRepository",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Project",
    "interfaceName": "IProjectRepository",
    "methods": [
      {
        "name": "getById",
        "params": [
          "id: ProjectId"
        ],
        "returns": "Project",
        "description": "Retrieve a single project by its identity."
      },
      {
        "name": "list",
        "params": [
          "filter: ProjectFilter"
        ],
        "returns": "Project[]",
        "description": "List projects matching the supplied domain filter."
      },
      {
        "name": "save",
        "params": [
          "aggregate: Project"
        ],
        "returns": "void",
        "description": "Persist the project aggregate root."
      },
      {
        "name": "findByCustomerId",
        "params": [
          "customerId: CustomerId"
        ],
        "returns": "Project[]",
        "description": "Domain finder: all projects belonging to a customer."
      },
      {
        "name": "findByStatus",
        "params": [
          "status: ProjectStatus"
        ],
        "returns": "Project[]",
        "description": "Domain finder: all projects in a given status."
      }
    ]
  }
} as const;

export default projectRepositoryPort;

export const pipeline = [
  {
    "id": "projectRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts"
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
