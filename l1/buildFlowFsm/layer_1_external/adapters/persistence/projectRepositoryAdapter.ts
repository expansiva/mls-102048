/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/projectRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IProjectRepository, ProjectFilter } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { Project, ProjectStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';

interface ProjectRow {
  project_id: string;
  client_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface ProjectDetails {
  name: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  completedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  updatedAt: string;
}

function toRow(project: Project): ProjectRow {
  const details: ProjectDetails = {
    name: project.name,
    siteAddress: project.siteAddress,
    budget: project.budget,
    startDate: project.startDate,
    endDate: project.endDate,
    completedAt: project.completedAt,
    cancelledAt: project.cancelledAt,
    cancellationReason: project.cancellationReason,
    updatedAt: project.updatedAt,
  };
  return {
    project_id: project.projectId,
    client_id: project.clientId,
    status: project.status,
    created_at: project.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: ProjectRow): ProjectDetails {
  try {
    return JSON.parse(row.details ?? '{}') as ProjectDetails;
  } catch {
    return {
      name: '',
      siteAddress: '',
      budget: 0,
      startDate: '',
      endDate: '',
      completedAt: null,
      cancelledAt: null,
      cancellationReason: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: ProjectRow): Project {
  const d = parseDetails(row);
  return {
    projectId: row.project_id,
    clientId: row.client_id,
    name: d.name,
    siteAddress: d.siteAddress,
    budget: d.budget,
    startDate: d.startDate,
    endDate: d.endDate,
    status: row.status as ProjectStatus,
    completedAt: d.completedAt,
    cancelledAt: d.cancelledAt,
    cancellationReason: d.cancellationReason,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createProjectRepositoryAdapter(ctx: RequestContext): IProjectRepository {
  const getTable = () => ctx.data.moduleData.getTable<ProjectRow>('project');

  return {
    async getById(id: string): Promise<Project> {
      const repo = await getTable();
      const row = await repo.findOne({ where: { project_id: id } });
      if (!row) {
        throw new AppError('NOT_FOUND', `Project ${id} not found`, 404, { projectId: id });
      }
      return toDomain(row);
    },

    async list(filter?: ProjectFilter): Promise<Project[]> {
      const repo = await getTable();
      const where: Partial<ProjectRow> = {};
      if (filter?.projectId) where.project_id = filter.projectId;
      if (filter?.clientId) where.client_id = filter.clientId;
      if (filter?.status) where.status = filter.status;
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async save(aggregate: Project): Promise<void> {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { project_id: aggregate.projectId } });
      if (existing) {
        await repo.update({ where: { project_id: aggregate.projectId }, patch: toRow(aggregate) });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByCustomerId(customerId: string): Promise<Project[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { client_id: customerId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async findByStatus(status: ProjectStatus): Promise<Project[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { status },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },
  };
}
