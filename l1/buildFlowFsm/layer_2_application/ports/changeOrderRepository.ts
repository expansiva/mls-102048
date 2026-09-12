/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.ts" enhancement="_blank"/>
import type { ChangeOrder, ChangeOrderStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';

export type ChangeOrderId = string;
export type ProjectId = string;

export interface ChangeOrderFilter {
  changeOrderId?: ChangeOrderId;
  projectId?: ProjectId;
  status?: ChangeOrderStatus;
}

export interface IChangeOrderRepository {
  /** Retrieve a single change order by its identity. Throws NOT_FOUND when absent. */
  getById(id: ChangeOrderId): Promise<ChangeOrder>;
  /** List change orders matching the supplied domain filter. */
  list(filter: ChangeOrderFilter): Promise<ChangeOrder[]>;
  /** Persist the aggregate root and any embedded value changes. */
  save(aggregate: ChangeOrder): Promise<void>;
  /** Domain finder: all change orders for a given project. */
  findByProjectId(projectId: ProjectId): Promise<ChangeOrder[]>;
  /** Domain finder: all change orders in a given status. */
  findByStatus(status: ChangeOrderStatus): Promise<ChangeOrder[]>;
}
