/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.ts" enhancement="_blank"/>
import type { Project, ProjectStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';

export interface ProjectFilter {
  projectId?: string;
  clientId?: string;
  status?: ProjectStatus;
}

export interface IProjectRepository {
  getById(id: string): Promise<Project>;
  list(filter?: ProjectFilter): Promise<Project[]>;
  save(aggregate: Project): Promise<void>;
  findByCustomerId(customerId: string): Promise<Project[]>;
  findByStatus(status: ProjectStatus): Promise<Project[]>;
}
