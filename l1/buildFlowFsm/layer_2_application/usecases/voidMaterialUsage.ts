/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/voidMaterialUsage.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IMaterialUsageRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/materialUsageRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { MaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';
import type { Project } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import { canTransitionMaterialUsage } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/materialUsage.js';

/**
 * Modeling gap: IMaterialUsageRepository is declared as append-only without a getById
 * method. This usecase requires loading a specific MaterialUsage by id to validate and
 * void it. The concrete adapter is expected to implement getById; the port interface
 * should be extended to include it.
 */
interface IMaterialUsageRepositoryWithGetById extends IMaterialUsageRepository {
  getById(id: string): Promise<MaterialUsage | null>;
}

export interface VoidMaterialUsageInput {
  materialUsageId: string;
  voidReason: string;
}

export interface VoidMaterialUsageOutput {
  materialUsageId: string;
  status: string;
  voidedAt: string;
  voidReason: string;
}

export async function voidMaterialUsage(
  ctx: RequestContext,
  input: VoidMaterialUsageInput,
): Promise<VoidMaterialUsageOutput> {
  const materialUsages = resolveRepository<IMaterialUsageRepositoryWithGetById>(ctx, 'MaterialUsage');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const now = ctx.clock.nowIso();

  return ctx.data.runInTransaction(async () => {
    // Step 1: Load the MaterialUsage aggregate by materialUsageId.
    const usage = await materialUsages.getById(input.materialUsageId);
    if (!usage) {
      throw new AppError(
        'NOT_FOUND',
        `MaterialUsage not found: ${input.materialUsageId}`,
        404,
        { materialUsageId: input.materialUsageId },
      );
    }

    // Step 2: Validate current status is 'posted'; reject if already 'voided'.
    if (String(usage.status) === 'voided') {
      throw new AppError(
        'CONFLICT',
        'MaterialUsage is already voided — append-only policy prevents double void.',
        409,
        { ruleId: 'noDoubleVoid', materialUsageId: input.materialUsageId },
      );
    }
    if (String(usage.status) !== 'posted') {
      throw new AppError(
        'VALIDATION_ERROR',
        `MaterialUsage status must be 'posted' to void, got '${String(usage.status)}'.`,
        400,
        { materialUsageId: input.materialUsageId, currentStatus: usage.status },
      );
    }

    // Step 3: Apply rule materialUsageRequiresProject — verify projectId is set and Project exists.
    if (!usage.projectId || usage.projectId === '') {
      throw new AppError(
        'VALIDATION_ERROR',
        'materialUsageRequiresProject: MaterialUsage must have a non-null projectId.',
        400,
        { ruleId: 'materialUsageRequiresProject', materialUsageId: input.materialUsageId },
      );
    }
    let project: Project | null = null;
    try {
      project = await projects.getById(usage.projectId);
    } catch {
      project = null;
    }
    if (!project) {
      throw new AppError(
        'VALIDATION_ERROR',
        `materialUsageRequiresProject: Project not found for projectId '${usage.projectId}'.`,
        400,
        { ruleId: 'materialUsageRequiresProject', projectId: usage.projectId },
      );
    }

    // Step 4: Validate domain transition (posted -> voided).
    if (!canTransitionMaterialUsage(usage.status, 'voided')) {
      throw new AppError(
        'CONFLICT',
        `Cannot transition MaterialUsage from '${String(usage.status)}' to 'voided'.`,
        409,
        { materialUsageId: input.materialUsageId, from: usage.status, to: 'voided' },
      );
    }

    // Step 5: Mutate in-memory — append-only audit policy, no deletion.
    const voidedUsage: MaterialUsage = {
      ...usage,
      status: 'voided',
      voidedAt: now,
      voidReason: input.voidReason,
    };

    // Step 6: Save (append) the voided MaterialUsage inside the same transaction.
    await materialUsages.append(voidedUsage);

    // Step 7: Return output.
    return {
      materialUsageId: voidedUsage.materialUsageId,
      status: voidedUsage.status,
      voidedAt: voidedUsage.voidedAt as string,
      voidReason: voidedUsage.voidReason as string,
    };
  });
}
