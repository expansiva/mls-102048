/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/workTaskRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IWorkTaskRepository, WorkTaskFilter } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.js';
import type { WorkTask, WorkTaskStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';

interface WorkTaskRow {
  work_task_id: string;
  project_id: string;
  status: string;
  assigned_worker_id: string | null;
  created_at: string;
  details: string | null;
}

interface WorkTaskDetails {
  title: string;
  description: string;
  assignedWorkerName: string | null;
  dueDate: string;
  budgetedCost: number | null;
  sequenceNumber: number | null;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  updatedAt: string;
}

function toRow(task: WorkTask): WorkTaskRow {
  const details: WorkTaskDetails = {
    title: task.title,
    description: task.description,
    assignedWorkerName: task.assignedWorkerName,
    dueDate: task.dueDate,
    budgetedCost: task.budgetedCost,
    sequenceNumber: task.sequenceNumber,
    startedAt: task.startedAt,
    completedAt: task.completedAt,
    cancelledAt: task.cancelledAt,
    cancellationReason: task.cancellationReason,
    updatedAt: task.updatedAt,
  };
  return {
    work_task_id: task.workTaskId,
    project_id: task.projectId,
    status: task.status,
    assigned_worker_id: task.assignedWorkerId,
    created_at: task.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: WorkTaskRow): WorkTaskDetails {
  try {
    return JSON.parse(row.details ?? '{}') as WorkTaskDetails;
  } catch {
    return {
      title: '',
      description: '',
      assignedWorkerName: null,
      dueDate: '',
      budgetedCost: null,
      sequenceNumber: null,
      startedAt: null,
      completedAt: null,
      cancelledAt: null,
      cancellationReason: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: WorkTaskRow): WorkTask {
  const d = parseDetails(row);
  return {
    workTaskId: row.work_task_id,
    projectId: row.project_id,
    title: d.title,
    description: d.description,
    status: row.status as WorkTaskStatus,
    assignedWorkerId: row.assigned_worker_id,
    assignedWorkerName: d.assignedWorkerName,
    dueDate: d.dueDate,
    budgetedCost: d.budgetedCost,
    sequenceNumber: d.sequenceNumber,
    startedAt: d.startedAt,
    completedAt: d.completedAt,
    cancelledAt: d.cancelledAt,
    cancellationReason: d.cancellationReason,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createWorkTaskRepositoryAdapter(ctx: RequestContext): IWorkTaskRepository {
  const getTable = () => ctx.data.moduleData.getTable<WorkTaskRow>('work_task');

  return {
    async getById(id) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { work_task_id: id } });
      if (!row) throw new AppError('NOT_FOUND', `WorkTask ${id} not found`, 404, { workTaskId: id });
      return toDomain(row);
    },

    async list(filter?: WorkTaskFilter) {
      const where: Partial<WorkTaskRow> = {};
      if (filter?.projectId) where.project_id = filter.projectId;
      if (filter?.status) where.status = filter.status;
      if (filter?.assignedWorkerId) where.assigned_worker_id = filter.assignedWorkerId;
      const repo = await getTable();
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { work_task_id: aggregate.workTaskId } });
      if (existing) {
        await repo.update({ where: { work_task_id: aggregate.workTaskId }, patch: toRow(aggregate) });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByProjectId(projectId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { project_id: projectId },
        orderBy: { field: 'created_at', direction: 'asc' },
      });
      return rows.map(toDomain);
    },

    async findByAssignee(assigneeId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { assigned_worker_id: assigneeId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async findByStatus(status) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { status },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },
  };
}
