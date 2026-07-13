/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createMaterialUsage.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { MaterialUsage, MaterialUsageUnit } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';
import { computeMaterialUsageTotalCost } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

const ALLOWED_UNITS: readonly MaterialUsageUnit[] = [
  'kg',
  'liter',
  'meter',
  'portion',
  'unit',
  'bag',
  'box',
  'roll',
  'sheet',
];

export interface CreateMaterialUsageInput {
  projectId: string;
  materialName: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  usageDate: string;
}

export interface CreateMaterialUsageOutput {
  materialUsageId: string;
  materialName: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  status: string;
  usageDate: string;
}

export async function createMaterialUsage(
  ctx: RequestContext,
  input: CreateMaterialUsageInput,
): Promise<CreateMaterialUsageOutput> {
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const materialUsages = resolveRepository<IMaterialUsageRepository>(ctx, 'MaterialUsage');

  // Step 1: Validate project exists (rule: materialUsageRequiresProject)
  let projectExists = false;
  try {
    await projects.getById(input.projectId);
    projectExists = true;
  } catch {
    projectExists = false;
  }
  if (!projectExists) {
    throw new AppError(
      'VALIDATION_ERROR',
      'materialUsageRequiresProject: the material usage record cannot be saved without a valid project linkage.',
      400,
      { ruleId: 'materialUsageRequiresProject', projectId: input.projectId },
    );
  }

  // Step 2: Validate unit is one of the allowed enum values
  if (!ALLOWED_UNITS.includes(input.unit as MaterialUsageUnit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `Invalid unit "${input.unit}". Allowed values: ${ALLOWED_UNITS.join(', ')}.`,
      400,
      { field: 'unit', value: input.unit, allowed: ALLOWED_UNITS },
    );
  }

  // Step 3: Server-side validation of totalCost
  const expectedTotalCost = computeMaterialUsageTotalCost(input.quantity, input.unitCost);
  if (Math.abs(expectedTotalCost - input.totalCost) > 0.01) {
    throw new AppError(
      'VALIDATION_ERROR',
      `totalCost mismatch: expected ${expectedTotalCost} (quantity * unitCost) but received ${input.totalCost}.`,
      400,
      { expectedTotalCost, submittedTotalCost: input.totalCost, quantity: input.quantity, unitCost: input.unitCost },
    );
  }

  // Step 4-5: Build the MaterialUsage record
  const now = ctx.clock.nowIso();
  const materialUsageId = ctx.idGenerator.newId();
  const record: MaterialUsage = {
    materialUsageId,
    projectId: input.projectId,
    materialName: input.materialName,
    quantity: input.quantity,
    unit: input.unit as MaterialUsageUnit,
    unitCost: input.unitCost,
    totalCost: input.totalCost,
    status: 'posted',
    usageDate: input.usageDate,
    voidedAt: null,
    voidReason: null,
    createdAt: now,
  };

  // Step 6: Persist inside a single transaction
  await ctx.data.runInTransaction(async () => {
    await materialUsages.append(record);
  });

  // Step 7: Return the created record fields
  return {
    materialUsageId: record.materialUsageId,
    materialName: record.materialName,
    quantity: record.quantity,
    unit: record.unit,
    unitCost: record.unitCost,
    totalCost: record.totalCost,
    status: record.status,
    usageDate: record.usageDate,
  };
}
