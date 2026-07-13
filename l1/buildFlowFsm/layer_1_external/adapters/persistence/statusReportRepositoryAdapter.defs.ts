/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReportRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const statusReportRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "StatusReportRepositoryAdapter",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "className": "StatusReportRepository",
    "entityId": "StatusReport",
    "portRef": "IStatusReportRepository",
    "tableRef": "status_reports",
    "mdmReads": [],
    "notes": [
      "Real columns (snake_case): status_report_id, project_id, status, created_at",
      "details JSONB: content, report_period_start, report_period_end, generated_at, llm_model_used, shared_at, share_link, shared_with_email, updated_at",
      "Uses ctx.data.moduleData for local table access"
    ]
  }
} as const;

export default statusReportRepositoryAdapter;

export const pipeline = [
  {
    "id": "statusReportRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReportRepositoryAdapter.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReportRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReport.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
