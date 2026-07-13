/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewDashboard.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { IChangeOrderRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { WorkTask } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import type { ChangeOrder } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';
import { changeOrderAffectsJobCosting } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';
import { computeTimeLogCost } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

// ---------------------------------------------------------------------------
// Input / Output types
// ---------------------------------------------------------------------------

export interface ViewDashboardInput {}

export interface DashboardTaskSummary {
  title: string;
  dueDate: string;
  status: string;
  isOverdue: boolean;
}

export interface DashboardChangeOrderSummary {
  amount: number;
  status: string;
}

export interface DashboardProjectSummary {
  projectId: string;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
  clientId: string;
  clientName: string;
  actualCost: number;
  totalLoggedHours: number;
  materialTotalCost: number;
  approvedChangeOrderTotal: number;
  overdueTaskCount: number;
  upcomingTaskCount: number;
  tasks: DashboardTaskSummary[];
  changeOrders: DashboardChangeOrderSummary[];
}

export interface DashboardProjectList {
  projects: DashboardProjectSummary[];
}

// ---------------------------------------------------------------------------
// Usecase
// ---------------------------------------------------------------------------

/**
 * Read-only dashboard query: assembles a summary of every active project with
 * calculated actual cost (labor + material + approved change orders), task
 * overdue/upcoming counts, and approved change-order totals.
 *
 * Rules applied:
 *  - dashboardShowsActiveOnly: only projects with status 'active' are returned.
 *  - jobCostCalculation: actualCost = laborCost + materialCost + approvedChangeOrderTotal.
 *
 * Modeling gap: Project entity has no companyId field; activeCompanyId from the
 * session context cannot be applied as a company-scope filter. All active projects
 * are returned regardless of company scope.
 */
export async function viewDashboard(
  ctx: RequestContext,
  _input: ViewDashboardInput,
): Promise<DashboardProjectList> {
  // Step 1 — activeCompanyId is resolved from session context (not a public input).
  // Modeling gap: Project has no companyId field, so the company-scope filter is skipped.

  // Step 2 — list all active projects (rule: dashboardShowsActiveOnly)
  const projectRepo = resolveRepository<IProjectRepository>(ctx, 'Project');
  const activeProjects = await projectRepo.findByStatus('active');

  // Step 3 — early return when there are no active projects
  if (activeProjects.length === 0) {
    return { projects: [] };
  }

  // Step 4 — collect unique clientIds from active projects
  const clientIds = [
    ...new Set(
      activeProjects
        .map((p) => p.clientId)
        .filter((id) => typeof id === 'string' && id.length > 0),
    ),
  ];

  // Step 5 — bulk fetch Client MDM records (plural-first, no per-project MDM calls)
  const clientNameMap = new Map<string, string>();
  if (clientIds.length > 0) {
    const clientEntities = await ctx.mdm.collection.getMany({ mdmIds: clientIds });
    for (const entity of clientEntities) {
      const name = entity.details.name;
      clientNameMap.set(entity.mdmId, typeof name === 'string' && name.length > 0 ? name : 'Unknown');
    }
  }

  // Step 6 — collect all projectIds
  const projectIds = activeProjects.map((p) => p.projectId);

  // Step 7 — list WorkTasks for all projectIds (parallel bulk query)
  const workTaskRepo = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const workTasksByProject = await Promise.all(
    projectIds.map((pid) => workTaskRepo.findByProjectId(pid)),
  );
  const allWorkTasks: WorkTask[] = workTasksByProject.flat();
  const workTasksMap = new Map<string, WorkTask[]>();
  for (const wt of allWorkTasks) {
    const list = workTasksMap.get(wt.projectId) ?? [];
    list.push(wt);
    workTasksMap.set(wt.projectId, list);
  }

  // Step 8 — list ChangeOrders for all projectIds (parallel bulk query)
  const changeOrderRepo = resolveRepository<IChangeOrderRepository>(ctx, 'ChangeOrder');
  const changeOrdersByProject = await Promise.all(
    projectIds.map((pid) => changeOrderRepo.findByProjectId(pid)),
  );
  const changeOrdersMap = new Map<string, ChangeOrder[]>();
  for (const co of changeOrdersByProject.flat()) {
    const list = changeOrdersMap.get(co.projectId) ?? [];
    list.push(co);
    changeOrdersMap.set(co.projectId, list);
  }

  // Step 9 — fetch TimeLogs per WorkTask (parallel) and build lookup map
  const timeLogRepo = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');
  const allWorkTaskIds = allWorkTasks.map((wt) => wt.workTaskId);
  const timeLogsByWorkTask = await Promise.all(
    allWorkTaskIds.map((wtId) => timeLogRepo.listByOwnerId(wtId)),
  );
  const timeLogsMap = new Map<string, TimeLog[]>();
  for (let i = 0; i < allWorkTaskIds.length; i++) {
    timeLogsMap.set(allWorkTaskIds[i], timeLogsByWorkTask[i]);
  }

  // Step 10 — fetch MaterialUsages per Project (parallel) and build lookup map
  const materialUsageRepo = resolveRepository<IMaterialUsageRepository>(ctx, 'MaterialUsage');
  const materialUsagesByProject = await Promise.all(
    projectIds.map((pid) => materialUsageRepo.listByOwnerId(pid)),
  );
  const materialUsagesMap = new Map<string, MaterialUsage[]>();
  for (let i = 0; i < projectIds.length; i++) {
    materialUsagesMap.set(projectIds[i], materialUsagesByProject[i]);
  }

  // Step 12 — compute "today" and "today + 7 days" for overdue/upcoming classification
  const today = ctx.clock.nowIso().slice(0, 10);
  const todayDate = new Date(today + 'T00:00:00Z');
  todayDate.setUTCDate(todayDate.getUTCDate() + 7);
  const todayPlus7 = todayDate.toISOString().slice(0, 10);

  // Step 13 — assemble DashboardProjectSummary for each project
  const summaries: DashboardProjectSummary[] = [];

  for (const project of activeProjects) {
    const projectWorkTasks = workTasksMap.get(project.projectId) ?? [];
    const projectChangeOrders = changeOrdersMap.get(project.projectId) ?? [];
    const projectMaterialUsages = materialUsagesMap.get(project.projectId) ?? [];

    // --- laborCost: sum of posted TimeLog costs across all work tasks ---
    let laborCost = 0;
    let totalLoggedHours = 0;
    for (const wt of projectWorkTasks) {
      const timeLogs = timeLogsMap.get(wt.workTaskId) ?? [];
      for (const tl of timeLogs) {
        if (tl.status === 'posted') {
          laborCost += computeTimeLogCost(tl);
          totalLoggedHours += tl.hours;
        }
      }
    }

    // --- materialCost: sum of posted MaterialUsage totalCost ---
    let materialCost = 0;
    for (const mu of projectMaterialUsages) {
      if (mu.status === 'posted') {
        materialCost += mu.totalCost;
      }
    }

    // --- approvedChangeOrderTotal (rule: jobCostCalculation) ---
    let approvedChangeOrderTotal = 0;
    for (const co of projectChangeOrders) {
      if (changeOrderAffectsJobCosting(co)) {
        approvedChangeOrderTotal += co.amount;
      }
    }

    // --- actualCost = laborCost + materialCost + approvedChangeOrderTotal ---
    const actualCost = laborCost + materialCost + approvedChangeOrderTotal;

    // --- task classification: overdue / upcoming ---
    let overdueTaskCount = 0;
    let upcomingTaskCount = 0;
    const taskSummaries: DashboardTaskSummary[] = [];

    for (const wt of projectWorkTasks) {
      const isCompletedOrCancelled =
        wt.status === 'completed' || wt.status === 'cancelled';
      const isOverdue = !isCompletedOrCancelled && wt.dueDate < today;
      const isUpcoming =
        !isCompletedOrCancelled &&
        wt.dueDate >= today &&
        wt.dueDate <= todayPlus7;

      if (isOverdue) overdueTaskCount++;
      if (isUpcoming) upcomingTaskCount++;

      taskSummaries.push({
        title: wt.title,
        dueDate: wt.dueDate,
        status: wt.status,
        isOverdue,
      });
    }

    // --- change order summaries ---
    const changeOrderSummaries: DashboardChangeOrderSummary[] =
      projectChangeOrders.map((co) => ({
        amount: co.amount,
        status: co.status,
      }));

    summaries.push({
      projectId: project.projectId,
      name: project.name,
      budget: project.budget,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      clientId: project.clientId,
      clientName: clientNameMap.get(project.clientId) ?? 'Unknown',
      actualCost,
      totalLoggedHours,
      materialTotalCost: materialCost,
      approvedChangeOrderTotal,
      overdueTaskCount,
      upcomingTaskCount,
      tasks: taskSummaries,
      changeOrders: changeOrderSummaries,
    });
  }

  // Step 14 — return the list
  return { projects: summaries };
}
