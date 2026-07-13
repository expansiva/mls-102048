/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.ts" enhancement="_blank"/>

export type MaterialUsageUnit =
  | 'kg'
  | 'liter'
  | 'meter'
  | 'portion'
  | 'unit'
  | 'bag'
  | 'box'
  | 'roll'
  | 'sheet';

export type MaterialUsageStatus = 'posted' | 'voided';

export interface MaterialUsage {
  materialUsageId: string;
  projectId: string;
  materialName: string;
  quantity: number;
  unit: MaterialUsageUnit;
  unitCost: number;
  totalCost: number;
  status: MaterialUsageStatus;
  usageDate: string;
  voidedAt: string | null;
  voidReason: string | null;
  createdAt: string;
}

export const MATERIAL_USAGE_STATUS_TRANSITIONS: Record<MaterialUsageStatus, MaterialUsageStatus[]> = {
  posted: ['voided'],
  voided: [],
};

export function canTransitionMaterialUsage(
  from: MaterialUsageStatus,
  to: MaterialUsageStatus,
): boolean {
  return MATERIAL_USAGE_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function computeMaterialUsageTotalCost(
  quantity: number,
  unitCost: number,
): number {
  return quantity * unitCost;
}
