/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.defs.ts" enhancement="_blank"/>

export const statusReportRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "StatusReportRepository",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StatusReport",
    "interfaceName": "IStatusReportRepository",
    "methods": [
      {
        "name": "getById",
        "params": [
          "id: StatusReportId"
        ],
        "returns": "StatusReport",
        "description": "Retrieve a single status report by its identity."
      },
      {
        "name": "list",
        "params": [
          "filter: StatusReportFilter"
        ],
        "returns": "StatusReport[]",
        "description": "List status reports matching the supplied domain filter."
      },
      {
        "name": "save",
        "params": [
          "aggregate: StatusReport"
        ],
        "returns": "void",
        "description": "Persist the status report aggregate root."
      },
      {
        "name": "findByProjectId",
        "params": [
          "projectId: ProjectId"
        ],
        "returns": "StatusReport[]",
        "description": "Domain finder: all status reports for a given project."
      },
      {
        "name": "findByPeriod",
        "params": [
          "periodStart: LocalDate",
          "periodEnd: LocalDate"
        ],
        "returns": "StatusReport[]",
        "description": "Domain finder: status reports whose reporting period falls within the given range."
      }
    ]
  }
} as const;

export default statusReportRepositoryPort;

export const pipeline = [
  {
    "id": "statusReportRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.d.ts"
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
