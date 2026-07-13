/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/statusReportRepository.ts" enhancement="_blank"/>
import type { StatusReport, StatusReportStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.js';

export interface StatusReportFilter {
  projectId?: string;
  status?: StatusReportStatus;
  reportPeriodStart?: string;
  reportPeriodEnd?: string;
}

export interface IStatusReportRepository {
  getById(id: string): Promise<StatusReport>;
  list(filter: StatusReportFilter): Promise<StatusReport[]>;
  save(aggregate: StatusReport): Promise<void>;
  findByProjectId(projectId: string): Promise<StatusReport[]>;
  findByPeriod(periodStart: string, periodEnd: string): Promise<StatusReport[]>;
}
