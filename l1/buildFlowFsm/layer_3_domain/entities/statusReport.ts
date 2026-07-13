/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/statusReport.ts" enhancement="_blank"/>

export type StatusReportStatus = 'generated' | 'shared';

export interface StatusReport {
  statusReportId: string;
  projectId: string;
  status: StatusReportStatus;
  content: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  generatedAt: string;
  llmModelUsed: string | null;
  sharedAt: string | null;
  shareLink: string | null;
  sharedWithEmail: string | null;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_REPORT_STATUS_TRANSITIONS: Record<StatusReportStatus, StatusReportStatus[]> = {
  generated: ['shared'],
  shared: [],
};

export function canTransitionStatusReport(
  from: StatusReportStatus,
  to: StatusReportStatus,
): boolean {
  return STATUS_REPORT_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function statusReportPeriodIsValid(
  report: Pick<StatusReport, 'reportPeriodStart' | 'reportPeriodEnd'>,
): boolean {
  return report.reportPeriodEnd >= report.reportPeriodStart;
}

export function statusReportContentIsValid(
  report: Pick<StatusReport, 'content'>,
): boolean {
  return report.content.trim().length > 0;
}

export function statusReportShareFieldsAreSet(
  report: Pick<StatusReport, 'status' | 'sharedAt' | 'shareLink' | 'sharedWithEmail'>,
): boolean {
  if (report.status !== 'shared') {
    return true;
  }
  return (
    report.sharedAt !== null &&
    report.shareLink !== null &&
    report.sharedWithEmail !== null
  );
}

export function validateStatusReportInvariants(report: StatusReport): string[] {
  const violations: string[] = [];

  if (!statusReportPeriodIsValid(report)) {
    violations.push('reportPeriodEnd must be on or after reportPeriodStart');
  }

  if (!statusReportContentIsValid(report)) {
    violations.push('content must not be empty');
  }

  if (!statusReportShareFieldsAreSet(report)) {
    violations.push('sharedAt, shareLink, and sharedWithEmail must be set when status is shared');
  }

  return violations;
}
