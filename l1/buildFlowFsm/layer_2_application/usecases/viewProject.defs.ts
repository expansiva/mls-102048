/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewProject.defs.ts" enhancement="_blank"/>

export const viewProjectUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewProject",
  "moduleName": "buildFlowFsm",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewProject",
    "ports": [
      "Project",
      "WorkTask",
      "ChangeOrder",
      "Invoice",
      "StatusReport",
      "MaterialUsage",
      "TimeLog"
    ],
    "functions": [
      {
        "functionName": "viewProject",
        "inputTypeName": "ViewProjectInput",
        "outputTypeName": "ViewProjectOutput",
        "input": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The unique identifier of the project to view, provided via the route parameter."
          }
        ],
        "output": [
          {
            "name": "projectId",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The project's unique identifier."
          },
          {
            "name": "clientId",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "The client associated with the project."
          },
          {
            "name": "clientName",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "The client's display name resolved from MDM."
          },
          {
            "name": "clientEmail",
            "type": "string",
            "required": true,
            "ofEntity": "Client",
            "description": "The client's email resolved from MDM."
          },
          {
            "name": "clientPhone",
            "type": "string",
            "required": false,
            "ofEntity": "Client",
            "description": "The client's phone resolved from MDM."
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The project name."
          },
          {
            "name": "siteAddress",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The project site address."
          },
          {
            "name": "budget",
            "type": "number",
            "required": true,
            "ofEntity": "Project",
            "description": "The project budget."
          },
          {
            "name": "startDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The project start date."
          },
          {
            "name": "endDate",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The project end date."
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "The current lifecycle status of the project."
          },
          {
            "name": "completedAt",
            "type": "string",
            "required": false,
            "ofEntity": "Project",
            "description": "Timestamp when the project was completed, if applicable."
          },
          {
            "name": "cancelledAt",
            "type": "string",
            "required": false,
            "ofEntity": "Project",
            "description": "Timestamp when the project was cancelled, if applicable."
          },
          {
            "name": "cancellationReason",
            "type": "string",
            "required": false,
            "ofEntity": "Project",
            "description": "Reason for cancellation, if applicable."
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Project creation timestamp."
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Project",
            "description": "Project last update timestamp."
          },
          {
            "name": "laborCost",
            "type": "number",
            "required": true,
            "description": "Sum of (hours × workerRate) for all posted TimeLog records across the project's tasks."
          },
          {
            "name": "materialCost",
            "type": "number",
            "required": true,
            "description": "Sum of totalCost for all posted MaterialUsage records on the project."
          },
          {
            "name": "changeOrderCost",
            "type": "number",
            "required": true,
            "description": "Sum of amount for all approved ChangeOrder records linked to the project."
          },
          {
            "name": "actualCost",
            "type": "number",
            "required": true,
            "description": "Total actual cost = laborCost + materialCost + changeOrderCost (per jobCostCalculation rule)."
          },
          {
            "name": "budgetVariance",
            "type": "number",
            "required": true,
            "description": "Difference between budget and actualCost (budget - actualCost). Positive means under budget."
          },
          {
            "name": "tasks",
            "type": "array",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "List of WorkTask records for the project, filtered to exclude cancelled tasks (dashboardShowsActiveOnly rule)."
          },
          {
            "name": "delayRiskTasks",
            "type": "array",
            "required": true,
            "ofEntity": "WorkTask",
            "description": "Subset of tasks that are behind schedule or approaching their due date without progress, with a delayRiskSuggestion field."
          },
          {
            "name": "timeLogs",
            "type": "array",
            "required": true,
            "ofEntity": "TimeLog",
            "description": "All posted TimeLog records for the project's tasks, used to explain budget variance."
          },
          {
            "name": "materialUsages",
            "type": "array",
            "required": true,
            "ofEntity": "MaterialUsage",
            "description": "All posted MaterialUsage records for the project, used to explain budget variance."
          },
          {
            "name": "changeOrders",
            "type": "array",
            "required": true,
            "ofEntity": "ChangeOrder",
            "description": "Approved ChangeOrder records linked to the project showing scope adjustments that affect cost."
          },
          {
            "name": "invoices",
            "type": "array",
            "required": true,
            "ofEntity": "Invoice",
            "description": "Invoice records linked to the project, filtered to exclude voided (dashboardShowsActiveOnly rule)."
          },
          {
            "name": "statusReports",
            "type": "array",
            "required": true,
            "ofEntity": "StatusReport",
            "description": "StatusReport records linked to the project."
          }
        ],
        "ports": [
          "Project",
          "WorkTask",
          "ChangeOrder",
          "Invoice",
          "StatusReport"
        ],
        "rulesApplied": [
          "jobCostCalculation",
          "dashboardShowsActiveOnly"
        ],
        "transactional": false,
        "steps": [
          "1. Load the Project aggregate by projectId via the Project port (getById). If not found, return empty result.",
          "2. MODELING GAP: The Project entity does not declare a companyId field, so the businessContext.activeCompanyId scope filter cannot be applied directly. Record this gap; skip company-scope filtering until the entity model is extended. The acceptance assertion requiring company-scoped access is noted but unenforceable with the current model.",
          "3. Resolve the Client from MDM by clientId using ctx.mdm.entity.get({ mdmId: project.clientId }). Extract name, email, and phone for the view.",
          "4. Load WorkTask records for the project via the WorkTask port (list by projectId). Each WorkTask aggregate may embed its child TimeLog records — collect them for cost calculation.",
          "5. Extract embedded MaterialUsage records from the Project aggregate (child collection keyed by projectId).",
          "6. Load ChangeOrder records for the project via the ChangeOrder port (list by projectId).",
          "7. Load Invoice records for the project via the Invoice port (list by projectId).",
          "8. Load StatusReport records for the project via the StatusReport port (list by projectId).",
          "9. Apply dashboardShowsActiveOnly rule: filter tasks to exclude status='cancelled'; filter invoices to exclude status='voided'; filter change orders to show only status='approved' for the cost summary (but include all non-cancelled for display).",
          "10. Apply jobCostCalculation rule: compute laborCost = sum(TimeLog.hours × TimeLog.workerRate) for all TimeLog records with status='posted'; compute materialCost = sum(MaterialUsage.totalCost) for all MaterialUsage records with status='posted'; compute changeOrderCost = sum(ChangeOrder.amount) for ChangeOrder records with status='approved'; actualCost = laborCost + materialCost + changeOrderCost; budgetVariance = project.budget - actualCost.",
          "11. Identify delay-risk tasks: for each active task (status in ['draft','assigned','inProgress']), check if dueDate is within 3 days of ctx.clock.today() or has passed while status is not 'completed'. Collect these into delayRiskTasks with a suggestion string.",
          "12. Assemble and return the consolidated ViewProjectOutput with all project fields, client info, cost summary, filtered collections, and delay-risk tasks."
        ]
      }
    ],
    "mdmRefs": [
      "Client"
    ]
  }
} as const;

export default viewProjectUsecase;

export const pipeline = [
  {
    "id": "viewProject__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewProject.ts",
    "defPath": "_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewProject.defs.ts",
    "dependsFiles": [
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.d.ts",
      "_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.d.ts",
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
