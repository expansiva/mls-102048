/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/changeOrderRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IChangeOrderRepository, ChangeOrderFilter } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.js';
import type { ChangeOrder, ChangeOrderStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';

interface ChangeOrderRow {
  change_order_id: string;
  project_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface ChangeOrderDetails {
  title: string;
  scopeDescription: string;
  amount: number;
  sentAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  cancelledAt: string | null;
  rejectionReason: string | null;
  cancellationReason: string | null;
  updatedAt: string;
}

function toRow(order: ChangeOrder): ChangeOrderRow {
  const details: ChangeOrderDetails = {
    title: order.title,
    scopeDescription: order.scopeDescription,
    amount: order.amount,
    sentAt: order.sentAt,
    approvedAt: order.approvedAt,
    rejectedAt: order.rejectedAt,
    cancelledAt: order.cancelledAt,
    rejectionReason: order.rejectionReason,
    cancellationReason: order.cancellationReason,
    updatedAt: order.updatedAt,
  };
  return {
    change_order_id: order.changeOrderId,
    project_id: order.projectId,
    status: order.status,
    created_at: order.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: ChangeOrderRow): ChangeOrderDetails {
  try {
    return JSON.parse(row.details ?? '{}') as ChangeOrderDetails;
  } catch {
    return {
      title: '',
      scopeDescription: '',
      amount: 0,
      sentAt: null,
      approvedAt: null,
      rejectedAt: null,
      cancelledAt: null,
      rejectionReason: null,
      cancellationReason: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: ChangeOrderRow): ChangeOrder {
  const d = parseDetails(row);
  return {
    changeOrderId: row.change_order_id,
    projectId: row.project_id,
    title: d.title,
    scopeDescription: d.scopeDescription,
    amount: d.amount,
    status: row.status as ChangeOrderStatus,
    sentAt: d.sentAt,
    approvedAt: d.approvedAt,
    rejectedAt: d.rejectedAt,
    cancelledAt: d.cancelledAt,
    rejectionReason: d.rejectionReason,
    cancellationReason: d.cancellationReason,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createChangeOrderRepositoryAdapter(ctx: RequestContext): IChangeOrderRepository {
  const getTable = () => ctx.data.moduleData.getTable<ChangeOrderRow>('change_order');

  return {
    async getById(id) {
      const repo = await getTable();
      const row = await repo.findOne({ where: { change_order_id: id } });
      if (!row) throw new AppError('NOT_FOUND', `ChangeOrder ${id} not found`, 404, { changeOrderId: id });
      return toDomain(row);
    },

    async list(filter: ChangeOrderFilter) {
      const where: Partial<ChangeOrderRow> = {};
      if (filter.changeOrderId) where.change_order_id = filter.changeOrderId;
      if (filter.projectId) where.project_id = filter.projectId;
      if (filter.status) where.status = filter.status;
      const repo = await getTable();
      const rows = await repo.findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { change_order_id: aggregate.changeOrderId } });
      if (existing) {
        await repo.update({ where: { change_order_id: aggregate.changeOrderId }, patch: toRow(aggregate) });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByProjectId(projectId) {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { project_id: projectId },
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
