/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.ts" enhancement="_blank"/>
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

/**
 * Append-only repository port for {@link MaterialUsage} events.
 * Events are immutable once recorded — no update or delete methods.
 */
export interface IMaterialUsageRepository {
  /** Append-only write: insert a new material usage event. No update or delete. */
  append(record: MaterialUsage): Promise<void>;

  /** Read finder: all material usage events for the owning project. */
  listByOwnerId(ownerId: string): Promise<MaterialUsage[]>;

  /** Read finder: material usage events for the owning project within a time period. */
  listByOwnerIdAndPeriod(ownerId: string, start: string, end: string): Promise<MaterialUsage[]>;

  /** Read finder: all usage events for a specific material across projects. */
  listByMaterialId(materialId: string): Promise<MaterialUsage[]>;
}
