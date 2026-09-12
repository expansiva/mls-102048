/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/createChangeOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChangeOrderRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { ChangeOrder } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';
import { changeOrderAmountMustBePositive } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';
export interface CreateChangeOrderInput {
  projectId: string;
  title: string;
  scopeDescription: string;
  amount: number;
}
export interface CreateChangeOrderOutput {
  changeOrderId: string;
  projectId: string;
  title: string;
  scopeDescription: string;
  amount: number;
  status: string;
  createdAt: string;
}
export async function createChangeOrder(
  ctx: RequestContext,
  input: CreateChangeOrderInput,
): Promise<CreateChangeOrderOutput> {
  // 1. Validate projectId (rule: changeOrderRequiresProject)
  if (!input.projectId || input.projectId.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'changeOrderRequiresProject: projectId is required.',
      400,
      { ruleId: 'changeOrderRequiresProject' },
    );
  }

  // 4. Validate title, scopeDescription, and amount
  if (!input.title || input.title.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'title is required and must be non-empty.',
      400,
      { field: 'title' },
    );
  }
  if (!input.scopeDescription || input.scopeDescription.trim().length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'scopeDescription is required and must be non-empty.',
      400,
      { field: 'scopeDescription' },
    );
  }
  if (!changeOrderAmountMustBePositive(input.amount)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'amount must be a positive monetary value.',
      400,
      { field: 'amount', ruleId: 'changeOrderAmountMustBePositive' },
    );
  }

  const changeOrders = resolveRepository<IChangeOrderRepository>(ctx, 'ChangeOrder');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');

  // 2-3. Load the Project aggregate to confirm it exists (rule: changeOrderRequiresProject)
  let projectExists = false;
  try {
    await projects.getById(input.projectId);
    projectExists = true;
  } catch {
    projectExists = false;
  }
  if (!projectExists) {
    throw new AppError(
      'NOT_FOUND',
      'changeOrderRequiresProject: the referenced project does not exist.',
      404,
      { ruleId: 'changeOrderRequiresProject', projectId: input.projectId },
    );
  }

  // 5-7. Build the ChangeOrder aggregate
  const now = ctx.clock.nowIso();
  const changeOrderId = ctx.idGenerator.newId();

  // 6. Set status to 'draft' per the changeOrderLifecycle workflow
  // (rule: changeOrderInAppApproval — in-app approval, no e-signature required)
  const changeOrder: ChangeOrder = {
    changeOrderId,
    projectId: input.projectId,
    title: input.title,
    scopeDescription: input.scopeDescription,
    amount: input.amount,
    status: 'draft', // changeOrderInAppApproval: initial state is draft, approval handled in-app
    sentAt: null,
    approvedAt: null,
    rejectedAt: null,
    cancelledAt: null,
    rejectionReason: null,
    cancellationReason: null,
    createdAt: now,
    updatedAt: now,
  };

  // 8. Persist inside a single transaction
  await ctx.data.runInTransaction(async () => {
    await changeOrders.save(changeOrder);
  });

  // 9. Return the created change order
  return {
    changeOrderId: changeOrder.changeOrderId,
    projectId: changeOrder.projectId,
    title: changeOrder.title,
    scopeDescription: changeOrder.scopeDescription,
    amount: changeOrder.amount,
    status: changeOrder.status,
    createdAt: changeOrder.createdAt,
  };
}
