/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewDashboard.defs.ts" enhancement="_blank"/>

export const viewDashboardUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewDashboard",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewDashboard",
    "ports": [
      "Project",
      "WorkTask",
      "ChangeOrder",
      "MaterialUsage",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "viewDashboard",
        "inputTypeName": "ViewDashboardInput",
        "outputTypeName": "DashboardProjectList",
        "input": [],
        "output": [
          {
            "name": "projects",
            "type": "DashboardProjectSummary[]",
            "required": true,
            "description": "List of active project dashboard summaries, each containing project details, client name, calculated actual cost, task summaries (overdue/upcoming), and approved change order totals."
          }
        ],
        "ports": [
          "Project",
          "WorkTask",
          "ChangeOrder"
        ],
        "rulesApplied": [
          "dashboardShowsActiveOnly",
          "jobCostCalculation"
        ],
        "transactional": false,
        "steps": [
          "1. Resolve activeCompanyId from ctx.sessionContext.businessContext.activeCompanyId (context — not a public input).",
          "2. List all projects via Project port with status = 'active' (rule: dashboardShowsActiveOnly — draft, completed, cancelled excluded).",
          "   - Modeling gap: Project entity has no companyId field; activeCompanyId cannot be applied as a company-scope filter on Project. Filter skipped; all active projects are returned.",
          "3. If no active projects found, return empty projects list.",
          "4. Collect all clientIds from the active projects.",
          "5. Bulk fetch Client MDM records via ctx.mdm.collection.getMany({ mdmIds: clientIds }) to resolve client names (plural-first — no per-project MDM calls).",
          "6. Collect all projectIds from active projects.",
          "7. List WorkTasks via WorkTask port for all projectIds (bulk query by projectId). Each WorkTask aggregate embeds its TimeLog collection.",
          "8. List ChangeOrders via ChangeOrder port for all projectIds (bulk query by projectId).",
          "9. For each WorkTask, iterate its embedded TimeLogs; calculate laborCost = sum(timeLog.hours × timeLog.workerRate) where timeLog.status = 'posted'. Accumulate per project.",
          "10. For each Project, iterate its embedded MaterialUsages; calculate materialCost = sum(materialUsage.totalCost) where materialUsage.status = 'posted'.",
          "11. For each project, calculate actualCost = laborCost + materialCost + sum(changeOrder.amount where changeOrder.status = 'approved') (rule: jobCostCalculation).",
          "12. For each project, classify tasks: overdue = dueDate < ctx.clock.today() AND status NOT IN ['completed','cancelled']; upcoming = dueDate within next 7 days of ctx.clock.today() AND status NOT IN ['completed','cancelled'].",
          "13. Assemble DashboardProjectSummary for each project: projectId, name, budget, startDate, endDate, status, clientId, clientName (from MDM), actualCost, totalLoggedHours (sum of posted TimeLog hours), materialTotalCost, approvedChangeOrderTotal, overdueTaskCount, upcomingTaskCount, tasks[] (title, dueDate, status, isOverdue), changeOrders[] (amount, status).",
          "14. Return the list of DashboardProjectSummary items.",
          "Note: This is a read-only query — no aggregate mutations, no event writes emitted."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default viewDashboardUsecase;

export const pipeline = [
  {
    "id": "viewDashboard__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewDashboard.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewDashboard.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
