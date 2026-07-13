/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/statusReportRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IStatusReportRepository, StatusReportFilter } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.js';
import type { StatusReport, StatusReportStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';

interface StatusReportRow {
  status_report_id: string;
  project_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface StatusReportDetails {
  content: string;
  report_period_start: string;
  report_period_end: string;
  generated_at: string;
  llm_model_used: string | null;
  shared_at: string | null;
  share_link: string | null;
  shared_with_email: string | null;
  updated_at: string;
}

function toRow(report: StatusReport): StatusReportRow {
  const details: StatusReportDetails = {
    content: report.content,
    report_period_start: report.reportPeriodStart,
    report_period_end: report.reportPeriodEnd,
    generated_at: report.generatedAt,
    llm_model_used: report.llmModelUsed,
    shared_at: report.sharedAt,
    share_link: report.shareLink,
    shared_with_email: report.sharedWithEmail,
    updated_at: report.updatedAt,
  };
  return {
    status_report_id: report.statusReportId,
    project_id: report.projectId,
    status: report.status,
    created_at: report.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: StatusReportRow): StatusReportDetails {
  try {
    return JSON.parse(row.details ?? '{}') as StatusReportDetails;
  } catch {
    return {
      content: '',
      report_period_start: '',
      report_period_end: '',
      generated_at: row.created_at,
      llm_model_used: null,
      shared_at: null,
      share_link: null,
      shared_with_email: null,
      updated_at: row.created_at,
    };
  }
}

function toDomain(row: StatusReportRow): StatusReport {
  const d = parseDetails(row);
  return {
    statusReportId: row.status_report_id,
    projectId: row.project_id,
    status: row.status as StatusReportStatus,
    content: d.content,
    reportPeriodStart: d.report_period_start,
    reportPeriodEnd: d.report_period_end,
    generatedAt: d.generated_at,
    llmModelUsed: d.llm_model_used,
    sharedAt: d.shared_at,
    shareLink: d.share_link,
    sharedWithEmail: d.shared_with_email,
    createdAt: row.created_at,
    updatedAt: d.updated_at,
  };
}

export function createStatusReportRepositoryAdapter(ctx: RequestContext): IStatusReportRepository {
  const getTable = () => ctx.data.moduleData.getTable<StatusReportRow>('status_report');

  return {
    async getById(id: string): Promise<StatusReport> {
      const repo = await getTable();
      const row = await repo.findOne({ where: { status_report_id: id } });
      if (!row) {
        throw new AppError('NOT_FOUND', `StatusReport ${id} not found`, 404, { statusReportId: id });
      }
      return toDomain(row);
    },

    async list(filter?: StatusReportFilter): Promise<StatusReport[]> {
      const repo = await getTable();
      const where: Partial<StatusReportRow> = {};
      if (filter?.projectId) where.project_id = filter.projectId;
      if (filter?.status) where.status = filter.status;
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      let result = rows.map(toDomain);
      if (filter?.reportPeriodStart) {
        result = result.filter((r) => r.reportPeriodStart >= filter.reportPeriodStart!);
      }
      if (filter?.reportPeriodEnd) {
        result = result.filter((r) => r.reportPeriodEnd <= filter.reportPeriodEnd!);
      }
      return result;
    },

    async save(aggregate: StatusReport): Promise<void> {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { status_report_id: aggregate.statusReportId } });
      if (existing) {
        await repo.update({ where: { status_report_id: aggregate.statusReportId }, patch: toRow(aggregate) });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByProjectId(projectId: string): Promise<StatusReport[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { project_id: projectId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async findByPeriod(periodStart: string, periodEnd: string): Promise<StatusReport[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .map(toDomain)
        .filter((r) => r.reportPeriodStart >= periodStart && r.reportPeriodEnd <= periodEnd);
    },
  };
}
