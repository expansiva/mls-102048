/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/browseTasks.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IWorkTaskRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { WorkTask, WorkTaskStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';

export interface BrowseTasksInput {}

export interface BrowseTaskItem {
  workTaskId: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  projectId: string;
  sequenceNumber?: number | null;
  assignedWorkerName?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  delayRisk?: string;
}

export interface BrowseTasksOutput {
  tasks: BrowseTaskItem[];
}

/**
 * Rule: delayRiskCalculation
 *
 * Compute delay risk (low/medium/high) based on task status and proximity
 * of dueDate to the current date.
 *
 * - completed / cancelled / draft → 'low' (no active deadline pressure)
 * - assigned / inProgress:
 *   - dueDate already passed or within 3 days (inclusive) → 'high'
 *   - dueDate within 7 days (inclusive) → 'medium'
 *   - otherwise → 'low'
 */
function computeDelayRisk(status: WorkTaskStatus, dueDate: string, todayIso: string): string {
  if (status === 'completed' || status === 'cancelled' || status === 'draft') {
    return 'low';
  }
  const today = new Date(todayIso.slice(0, 10) + 'T00:00:00.000Z');
  const due = new Date(dueDate.slice(0, 10) + 'T00:00:00.000Z');
  const diffMs = due.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 3) {
    return 'high';
  }
  if (diffDays <= 7) {
    return 'medium';
  }
  return 'low';
}

export async function browseTasks(ctx: RequestContext, _input: BrowseTasksInput): Promise<BrowseTasksOutput> {
  const actorId = ctx.sessionContext.actorId;
  if (!actorId) {
    return { tasks: [] };
  }

  const workTasks = resolveRepository<IWorkTaskRepository>(ctx, 'WorkTask');
  const tasks = await workTasks.findByAssignee(actorId);

  // Rule timelineIsSimplified: sort by sequenceNumber ascending for a simplified timeline view.
  const sorted = [...tasks].sort((a, b) => {
    const sa = a.sequenceNumber ?? 0;
    const sb = b.sequenceNumber ?? 0;
    return sa - sb;
  });

  const todayIso = ctx.clock.nowIso();

  // Rule delayRiskCalculation: compute delayRisk for each task based on status and dueDate proximity.
  const items: BrowseTaskItem[] = sorted.map((task: WorkTask) => ({
    workTaskId: task.workTaskId,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    projectId: task.projectId,
    sequenceNumber: task.sequenceNumber,
    assignedWorkerName: task.assignedWorkerName,
    startedAt: task.startedAt,
    completedAt: task.completedAt,
    delayRisk: computeDelayRisk(task.status, task.dueDate, todayIso),
  }));

  // Final sort: dueDate ascending so the most urgent tasks appear first.
  items.sort((a, b) => {
    return a.dueDate.localeCompare(b.dueDate);
  });

  return { tasks: items };
}
