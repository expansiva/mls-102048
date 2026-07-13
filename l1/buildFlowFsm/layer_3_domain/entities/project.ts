/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.ts" enhancement="_blank"/>
export type ProjectStatus = 'draft' | 'active' | 'completed' | 'cancelled';

export interface Project {
  projectId: string;
  clientId: string;
  name: string;
  siteAddress: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  completedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export const PROJECT_STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  draft: ['active', 'cancelled'],
  active: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

export function canTransitionProject(from: ProjectStatus, to: ProjectStatus): boolean {
  return PROJECT_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function projectBudgetMustBePositive(project: Pick<Project, 'budget'>): boolean {
  return project.budget > 0;
}

export function projectEndDateMustBeOnOrAfterStartDate(
  project: Pick<Project, 'startDate' | 'endDate'>,
): boolean {
  return project.endDate >= project.startDate;
}

export function projectClientIdMustBeSetToActivate(
  project: Pick<Project, 'clientId' | 'status'>,
  targetStatus: ProjectStatus,
): boolean {
  if (targetStatus !== 'active') {
    return true;
  }
  return project.clientId !== null && project.clientId !== '';
}

export function projectCompletedAtMustBeSetWhenCompleted(
  project: Pick<Project, 'status' | 'completedAt'>,
): boolean {
  if (project.status !== 'completed') {
    return true;
  }
  return project.completedAt !== null;
}

export function projectCancelledFieldsMustBeSetWhenCancelled(
  project: Pick<Project, 'status' | 'cancelledAt' | 'cancellationReason'>,
): boolean {
  if (project.status !== 'cancelled') {
    return true;
  }
  return (
    project.cancelledAt !== null &&
    project.cancellationReason !== null &&
    project.cancellationReason !== ''
  );
}

export function projectIsDashboardVisible(project: Pick<Project, 'status'>): boolean {
  return project.status === 'active';
}
