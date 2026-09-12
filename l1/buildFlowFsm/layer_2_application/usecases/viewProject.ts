/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/viewProject.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { IChangeOrderRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.js';
import type { IInvoiceRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.js';
import type { IStatusReportRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { Project } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import type { WorkTask } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import type { ChangeOrder } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';
import type { Invoice } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';
import type { StatusReport } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';
import { computeTimeLogCost } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';

export interface ViewProjectInput {
  projectId: string;
}

export interface DelayRiskTask extends WorkTask {
  delayRiskSuggestion: string;
}

export interface ViewProjectOutput {
  projectId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  name: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  laborCost: number;
  materialCost: number;
  changeOrderCost: number;
  actualCost: number;
  budgetVariance: number;
  tasks: WorkTask[];
  delayRiskTasks: DelayRiskTask[];
  timeLogs: TimeLog[];
  materialUsages: MaterialUsage[];
  changeOrders: ChangeOrder[];
  invoices: Invoice[];
  statusReports: StatusReport[];
}

/** Days before a task due date that triggers a delay-risk warning. */
const DELAY_RISK_WINDOW_DAYS = 3;

/**
 * Determine whether an active task is at delay risk and produce a human-readable suggestion.
 * A task is at risk when its due date has passed or is within {@link DELAY_RISK_WINDOW_DAYS} days
 * from today while the task is not yet completed.
 */
function assessDelayRisk(task: WorkTask, today: string): string | null {
  if (task.status === 'completed' || task.status === 'cancelled') {
    return null;
  }
  const dueMs = new Date(task.dueDate + 'T00:00:00Z').getTime();
  const todayMs = new Date(today + 'T00:00:00Z').getTime();
  const diffDays = Math.ceil((dueMs - todayMs) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return `Task "${task.title}" is overdue by ${Math.abs(diffDays)} day(s). Consider reassigning or escalating.`;
  }
  if (diffDays <= DELAY_RISK_WINDOW_DAYS) {
    return `Task "${task.title}" is due in ${diffDays} day(s). Monitor progress closely.`;
  }
  return null;
}

export async function viewProject(ctx: RequestContext, input: ViewProjectInput): Promise<ViewProjectOutput> {
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const workTasks = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const changeOrders = resolveRepository<IChangeOrderRepository>(ctx, 'ChangeOrder');
  const invoices = resolveRepository<IInvoiceRepository>(ctx, 'Invoice');
  const statusReports = resolveRepository<IStatusReportRepository>(ctx, 'StatusReport');
  const materialUsagesRepo = resolveRepository<IMaterialUsageRepository>(ctx, 'MaterialUsage');
  const timeLogsRepo = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');

  // Step 1 — Load the Project aggregate. If not found, throw NOT_FOUND.
  let project: Project;
  try {
    project = await projects.getById(input.projectId);
  } catch {
    throw new AppError('NOT_FOUND', `Project not found: ${input.projectId}`, 404, { projectId: input.projectId });
  }

  // Step 2 — MODELING GAP: Project entity has no companyId field; skip businessContext scope filter.

  // Step 3 — Resolve the Client from MDM by clientId.
  const clientEntity = await ctx.mdm.entity.get({ mdmId: project.clientId });
  const clientDetails = clientEntity.details as unknown as Record<string, unknown>;
  const clientName: string = String(clientDetails.name ?? '');
  const clientEmail: string = String(clientDetails.email ?? '');
  const clientPhone: string | undefined =
    clientDetails.phone != null ? String(clientDetails.phone) : undefined;

  // Step 4 — Load WorkTask records for the project.
  const allTasks = await workTasks.findByProjectId(project.projectId);

  // Step 5 — Load MaterialUsage records for the project (ownerId = projectId).
  const allMaterialUsages = await materialUsagesRepo.listByOwnerId(project.projectId);

  // Step 6 — Load ChangeOrder records for the project.
  const allChangeOrders = await changeOrders.findByProjectId(project.projectId);

  // Step 7 — Load Invoice records for the project.
  const allInvoices = await invoices.findByProjectId(project.projectId);

  // Step 8 — Load StatusReport records for the project.
  const allStatusReports = await statusReports.findByProjectId(project.projectId);

  // Step 4b — Collect TimeLog records for each task (TimeLog is owned by WorkTask).
  const allTimeLogs: TimeLog[] = [];
  for (const task of allTasks) {
    const taskTimeLogs = await timeLogsRepo.listByOwnerId(task.workTaskId);
    allTimeLogs.push(...taskTimeLogs);
  }

  // Step 9 — Apply dashboardShowsActiveOnly rule.
  // Tasks: exclude cancelled.
  const activeTasks: WorkTask[] = allTasks.filter(
    (task) => String(task.status) !== 'cancelled',
  );
  // Invoices: exclude voided.
  const activeInvoices: Invoice[] = allInvoices.filter(
    (inv) => String(inv.status) !== 'voided',
  );
  // Change orders: exclude cancelled for display.
  const displayChangeOrders: ChangeOrder[] = allChangeOrders.filter(
    (co) => String(co.status) !== 'cancelled',
  );

  // Step 10 — Apply jobCostCalculation rule.
  const laborCost = allTimeLogs
    .filter((tl) => String(tl.status) === 'posted')
    .reduce((sum, tl) => sum + computeTimeLogCost(tl), 0);

  const materialCost = allMaterialUsages
    .filter((mu) => String(mu.status) === 'posted')
    .reduce((sum, mu) => sum + mu.totalCost, 0);

  const changeOrderCost = allChangeOrders
    .filter((co) => String(co.status) === 'approved')
    .reduce((sum, co) => sum + co.amount, 0);

  const actualCost = laborCost + materialCost + changeOrderCost;
  const budgetVariance = project.budget - actualCost;

  // Step 11 — Identify delay-risk tasks among active (non-completed, non-cancelled) tasks.
  const today = ctx.clock.nowIso().slice(0, 10);
  const delayRiskTasks: DelayRiskTask[] = [];
  for (const task of activeTasks) {
    const suggestion = assessDelayRisk(task, today);
    if (suggestion) {
      delayRiskTasks.push({ ...task, delayRiskSuggestion: suggestion });
    }
  }

  // Step 12 — Assemble and return the consolidated output.
  return {
    projectId: project.projectId,
    clientId: project.clientId,
    clientName,
    clientEmail,
    ...(clientPhone != null ? { clientPhone } : {}),
    name: project.name,
    siteAddress: project.siteAddress,
    budget: project.budget,
    startDate: project.startDate,
    endDate: project.endDate,
    status: project.status,
    ...(project.completedAt != null ? { completedAt: project.completedAt } : {}),
    ...(project.cancelledAt != null ? { cancelledAt: project.cancelledAt } : {}),
    ...(project.cancellationReason != null ? { cancellationReason: project.cancellationReason } : {}),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    laborCost,
    materialCost,
    changeOrderCost,
    actualCost,
    budgetVariance,
    tasks: activeTasks,
    delayRiskTasks,
    timeLogs: allTimeLogs,
    materialUsages: allMaterialUsages,
    changeOrders: displayChangeOrders,
    invoices: activeInvoices,
    statusReports: allStatusReports,
  };
}
