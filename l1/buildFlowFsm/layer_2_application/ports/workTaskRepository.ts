/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/workTaskRepository.ts" enhancement="_blank"/>
import type { WorkTask, WorkTaskStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/workTask.js';

export type WorkTaskId = string;
export type ProjectId = string;
export type UserId = string;

export interface WorkTaskFilter {
  projectId?: ProjectId;
  status?: WorkTaskStatus;
  assignedWorkerId?: UserId;
}

export interface IWorkTaskRepository {
  getById(id: WorkTaskId): Promise<WorkTask>;
  list(filter: WorkTaskFilter): Promise<WorkTask[]>;
  save(aggregate: WorkTask): Promise<void>;
  findByProjectId(projectId: ProjectId): Promise<WorkTask[]>;
  findByAssignee(assigneeId: UserId): Promise<WorkTask[]>;
  findByStatus(status: WorkTaskStatus): Promise<WorkTask[]>;
}
