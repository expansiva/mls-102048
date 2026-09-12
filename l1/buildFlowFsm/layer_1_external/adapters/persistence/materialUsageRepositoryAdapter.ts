/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/materialUsageRepositoryAdapter.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { MaterialUsage, MaterialUsageUnit, MaterialUsageStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

interface MaterialUsageRow {
  material_usage_id: string;
  project_id: string;
  unit: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface MaterialUsageDetails {
  material_name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  usage_date: string;
  voided_at: string | null;
  void_reason: string | null;
}

function toRow(record: MaterialUsage): MaterialUsageRow {
  const details: MaterialUsageDetails = {
    material_name: record.materialName,
    quantity: record.quantity,
    unit_cost: record.unitCost,
    total_cost: record.totalCost,
    usage_date: record.usageDate,
    voided_at: record.voidedAt,
    void_reason: record.voidReason,
  };
  return {
    material_usage_id: record.materialUsageId,
    project_id: record.projectId,
    unit: record.unit,
    status: record.status,
    created_at: record.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: MaterialUsageRow): MaterialUsageDetails {
  try {
    return JSON.parse(row.details ?? '{}') as MaterialUsageDetails;
  } catch {
    return {
      material_name: '',
      quantity: 0,
      unit_cost: 0,
      total_cost: 0,
      usage_date: row.created_at,
      voided_at: null,
      void_reason: null,
    };
  }
}

function toDomain(row: MaterialUsageRow): MaterialUsage {
  const d = parseDetails(row);
  return {
    materialUsageId: row.material_usage_id,
    projectId: row.project_id,
    materialName: d.material_name,
    quantity: d.quantity,
    unit: row.unit as MaterialUsageUnit,
    unitCost: d.unit_cost,
    totalCost: d.total_cost,
    status: row.status as MaterialUsageStatus,
    usageDate: d.usage_date,
    voidedAt: d.voided_at,
    voidReason: d.void_reason,
    createdAt: row.created_at,
  };
}

export function createMaterialUsageRepositoryAdapter(ctx: RequestContext): IMaterialUsageRepository {
  const getTable = () => ctx.data.moduleData.getTable<MaterialUsageRow>('material_usage');

  return {
    /** Append-only write: insert a new material usage event. No update or delete. */
    async append(record: MaterialUsage): Promise<void> {
      const repo = await getTable();
      await repo.insert({ record: toRow(record) });
    },

    /** Read finder: all material usage events for the owning project. */
    async listByOwnerId(ownerId: string): Promise<MaterialUsage[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { project_id: ownerId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    /** Read finder: material usage events for the owning project within a time period. */
    async listByOwnerIdAndPeriod(ownerId: string, start: string, end: string): Promise<MaterialUsage[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        where: { project_id: ownerId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .filter((row) => row.created_at >= start && row.created_at <= end)
        .map(toDomain);
    },

    /** Read finder: all usage events for a specific material across projects. */
    async listByMaterialId(materialId: string): Promise<MaterialUsage[]> {
      const repo = await getTable();
      const rows = await repo.findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .filter((row) => {
          const d = parseDetails(row);
          return d.material_name === materialId;
        })
        .map(toDomain);
    },
  };
}
