/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateStatusReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IStatusReportRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { ITimeLogRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/timeLogRepository.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { StatusReport } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';
import { statusReportPeriodIsValid } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';
import type { Project } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import type { WorkTask } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';
import type { TimeLog } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';
import { computeTimeLogCost } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/timeLog.js';
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

export interface GenerateStatusReportInput {
  projectId: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
}

export interface GenerateStatusReportOutput {
  statusReportId: string;
  projectId: string;
  status: string;
  content: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  generatedAt: string;
  llmModelUsed?: string;
  createdAt: string;
}

interface ReportSummaryData {
  projectName: string;
  projectId: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: WorkTask[];
  totalLaborCost: number;
  totalMaterialCost: number;
  totalCost: number;
  budget: number;
  tasks: WorkTask[];
  timeLogs: TimeLog[];
  materials: MaterialUsage[];
}

function compileReportContent(data: ReportSummaryData): string {
  const lines: string[] = [];
  lines.push(`Status Report: ${data.projectName}`);
  lines.push(`Project ID: ${data.projectId}`);
  lines.push(`Reporting Period: ${data.reportPeriodStart} to ${data.reportPeriodEnd}`);
  lines.push('');
  lines.push('=== Project Progress ===');
  lines.push(`Total Tasks: ${data.totalTasks}`);
  lines.push(`Completed Tasks: ${data.completedTasks}`);
  lines.push(`In Progress Tasks: ${data.inProgressTasks}`);
  const completionRate = data.totalTasks > 0
    ? Math.round((data.completedTasks / data.totalTasks) * 100)
    : 0;
  lines.push(`Completion Rate: ${completionRate}%`);
  lines.push('');
  lines.push('=== Cost Summary ===');
  lines.push(`Total Labor Cost: ${data.totalLaborCost.toFixed(2)}`);
  lines.push(`Total Material Cost: ${data.totalMaterialCost.toFixed(2)}`);
  lines.push(`Total Cost: ${data.totalCost.toFixed(2)}`);
  lines.push(`Project Budget: ${data.budget.toFixed(2)}`);
  const budgetUtilization = data.budget > 0
    ? Math.round((data.totalCost / data.budget) * 100)
    : 0;
  lines.push(`Budget Utilization: ${budgetUtilization}%`);
  lines.push('');
  lines.push('=== Delay Risks ===');
  if (data.overdueTasks.length > 0) {
    lines.push(`Overdue Tasks: ${data.overdueTasks.length}`);
    for (const t of data.overdueTasks) {
      lines.push(`  - [${t.workTaskId}] ${t.title} (due: ${t.dueDate})`);
    }
  } else {
    lines.push('No overdue tasks detected.');
  }
  lines.push('');
  lines.push('=== Task Details ===');
  for (const task of data.tasks) {
    lines.push(`  - [${task.workTaskId}] ${task.title} — Status: ${task.status}, Due: ${task.dueDate}`);
  }
  lines.push('');
  lines.push('=== Time Logs ===');
  if (data.timeLogs.length > 0) {
    for (const tl of data.timeLogs) {
      lines.push(`  - Task ${tl.workTaskId}: ${tl.hours}h @ ${tl.workerRate} = ${computeTimeLogCost(tl).toFixed(2)} (${tl.logDate})`);
    }
  } else {
    lines.push('No time logs recorded in this period.');
  }
  lines.push('');
  lines.push('=== Material Usage ===');
  if (data.materials.length > 0) {
    for (const m of data.materials) {
      lines.push(`  - ${m.materialName}: ${m.quantity} ${m.unit} @ ${m.unitCost} = ${m.totalCost.toFixed(2)} (${m.usageDate})`);
    }
  } else {
    lines.push('No material usage recorded in this period.');
  }
  return lines.join('\n');
}

export async function generateStatusReport(
  ctx: RequestContext,
  input: GenerateStatusReportInput,
): Promise<GenerateStatusReportOutput> {
  // Step 1: Validate that reportPeriodStart <= reportPeriodEnd (rule statusReportAutoGenerated)
  if (!statusReportPeriodIsValid({
    reportPeriodStart: input.reportPeriodStart,
    reportPeriodEnd: input.reportPeriodEnd,
  })) {
    throw new AppError(
      'VALIDATION_ERROR',
      'reportPeriodEnd must be on or after reportPeriodStart.',
      400,
      { ruleId: 'statusReportAutoGenerated' },
    );
  }

  // Step 2: Load the Project and verify it exists and is active
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  let project: Project;
  try {
    project = await projects.getById(input.projectId);
  } catch {
    throw new AppError('NOT_FOUND', `Project not found: ${input.projectId}`, 404, {
      projectId: input.projectId,
    });
  }
  if (String(project.status) !== 'active') {
    throw new AppError(
      'VALIDATION_ERROR',
      `Project is not active (current status: ${project.status}).`,
      400,
      { projectId: input.projectId, currentStatus: project.status },
    );
  }

  // Step 3: Query WorkTask by projectId
  const workTaskRepo = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const tasks = await workTaskRepo.findByProjectId(input.projectId);

  // Step 4: Collect workTaskIds and query TimeLog, filtering to posted logs within the period
  const timeLogRepo = resolveRepository<ITimeLogRepository>(ctx, 'TimeLog');
  const workTaskIds = tasks.map((t) => t.workTaskId);
  let periodTimeLogs: TimeLog[] = [];
  if (workTaskIds.length > 0) {
    const timeLogBatches = await Promise.all(
      workTaskIds.map((wtId) =>
        timeLogRepo.listByOwnerIdAndPeriod(wtId, input.reportPeriodStart, input.reportPeriodEnd),
      ),
    );
    periodTimeLogs = timeLogBatches
      .flat()
      .filter((tl) => String(tl.status) === 'posted');
  }

  // Step 5: Query MaterialUsage by projectId, filtering to posted records within the period
  const materialUsageRepo = resolveRepository<IMaterialUsageRepository>(ctx, 'MaterialUsage');
  const materialRecords = await materialUsageRepo.listByOwnerIdAndPeriod(
    input.projectId,
    input.reportPeriodStart,
    input.reportPeriodEnd,
  );
  const postedMaterials = materialRecords.filter((m) => String(m.status) === 'posted');

  // Step 6: Compile structured summary (rule statusReportAutoGenerated: content auto-compiled from data)
  const totalLaborCost = periodTimeLogs.reduce((sum, tl) => sum + computeTimeLogCost(tl), 0);
  const totalMaterialCost = postedMaterials.reduce((sum, m) => sum + m.totalCost, 0);
  const totalCost = totalLaborCost + totalMaterialCost;
  const completedTasks = tasks.filter((t) => String(t.status) === 'completed').length;
  const inProgressTasks = tasks.filter((t) => String(t.status) === 'inProgress').length;
  const overdueTasks = tasks.filter(
    (t) =>
      t.dueDate < input.reportPeriodEnd &&
      String(t.status) !== 'completed' &&
      String(t.status) !== 'cancelled',
  );

  const content = compileReportContent({
    projectName: project.name,
    projectId: project.projectId,
    reportPeriodStart: input.reportPeriodStart,
    reportPeriodEnd: input.reportPeriodEnd,
    totalTasks: tasks.length,
    completedTasks,
    inProgressTasks,
    overdueTasks,
    totalLaborCost,
    totalMaterialCost,
    totalCost,
    budget: project.budget,
    tasks,
    timeLogs: periodTimeLogs,
    materials: postedMaterials,
  });

  // Step 7: LLM proxy (rule llmProxyUsage: content generation via platform proxy).
  // The current platform RequestContext does not expose an LLM proxy field.
  // The content is auto-compiled from operational data per rule statusReportAutoGenerated.
  // llmModelUsed is set to null when no platform LLM proxy is available.
  const llmModelUsed: string | null = null;

  // Step 8: Generate ids and timestamps
  const now = ctx.clock.nowIso();
  const statusReportId = ctx.idGenerator.newId();

  // Step 9: Create the StatusReport record inside a single transaction
  const statusReportRepo = resolveRepository<IStatusReportRepository>(ctx, 'StatusReport');

  const report: StatusReport = {
    statusReportId,
    projectId: input.projectId,
    status: 'generated',
    content,
    reportPeriodStart: input.reportPeriodStart,
    reportPeriodEnd: input.reportPeriodEnd,
    generatedAt: now,
    llmModelUsed,
    sharedAt: null,
    shareLink: null,
    sharedWithEmail: null,
    createdAt: now,
    updatedAt: now,
  };

  await ctx.data.runInTransaction(async () => {
    await statusReportRepo.save(report);
  });

  // Step 10: Return the created StatusReport fields
  const output: GenerateStatusReportOutput = {
    statusReportId,
    projectId: input.projectId,
    status: 'generated',
    content,
    reportPeriodStart: input.reportPeriodStart,
    reportPeriodEnd: input.reportPeriodEnd,
    generatedAt: now,
    createdAt: now,
  };
  if (llmModelUsed !== null) {
    output.llmModelUsed = llmModelUsed;
  }
  return output;
}
