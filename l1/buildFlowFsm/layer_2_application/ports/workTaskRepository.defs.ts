/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.defs.ts" enhancement="_blank"/>

export const workTaskRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "WorkTaskRepository",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "WorkTask",
    "interfaceName": "IWorkTaskRepository",
    "methods": [
      {
        "name": "getById",
        "params": [
          "id: WorkTaskId"
        ],
        "returns": "WorkTask",
        "description": "Retrieve a single work task by its identity."
      },
      {
        "name": "list",
        "params": [
          "filter: WorkTaskFilter"
        ],
        "returns": "WorkTask[]",
        "description": "List work tasks matching the supplied domain filter."
      },
      {
        "name": "save",
        "params": [
          "aggregate: WorkTask"
        ],
        "returns": "void",
        "description": "Persist the work task aggregate root."
      },
      {
        "name": "findByProjectId",
        "params": [
          "projectId: ProjectId"
        ],
        "returns": "WorkTask[]",
        "description": "Domain finder: all work tasks within a project."
      },
      {
        "name": "findByAssignee",
        "params": [
          "assigneeId: UserId"
        ],
        "returns": "WorkTask[]",
        "description": "Domain finder: all work tasks assigned to a specific user."
      },
      {
        "name": "findByStatus",
        "params": [
          "status: WorkTaskStatus"
        ],
        "returns": "WorkTask[]",
        "description": "Domain finder: all work tasks in a given status."
      }
    ]
  }
} as const;

export default workTaskRepositoryPort;

export const pipeline = [
  {
    "id": "workTaskRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.d.ts"
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
