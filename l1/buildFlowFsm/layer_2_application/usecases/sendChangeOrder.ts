/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/sendChangeOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChangeOrderRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { ChangeOrder } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';
import { canTransitionChangeOrder } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';

export interface SendChangeOrderInput {
  changeOrderId: string;
}

export interface SendChangeOrderOutput {
  changeOrderId: string;
  status: string;
  sentAt: string;
  updatedAt: string;
}

export async function sendChangeOrder(
  ctx: RequestContext,
  input: SendChangeOrderInput,
): Promise<SendChangeOrderOutput> {
  const changeOrders = resolveRepository<IChangeOrderRepository>(ctx, 'ChangeOrder');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');

  // Step 1: Load the ChangeOrder by changeOrderId.
  const changeOrder = await changeOrders.getById(input.changeOrderId);

  // Step 2: Validate rule 'changeOrderRequiresProject' — projectId must be set.
  if (!changeOrder.projectId || changeOrder.projectId.trim() === '') {
    throw new AppError(
      'VALIDATION_ERROR',
      'changeOrderRequiresProject: the change order must have a linked project.',
      400,
      { ruleId: 'changeOrderRequiresProject' },
    );
  }

  // Step 3: Validate rule 'changeOrderInAppApproval' — only draft change orders can be sent.
  if (changeOrder.status !== 'draft') {
    throw new AppError(
      'VALIDATION_ERROR',
      'changeOrderInAppApproval: only draft change orders can be sent.',
      400,
      { ruleId: 'changeOrderInAppApproval', currentStatus: changeOrder.status },
    );
  }

  // Step 4: Load the linked Project to confirm it exists (getById throws NOT_FOUND if absent).
  await projects.getById(changeOrder.projectId);

  // Validate rule 'approvedChangeOrdersOnly' — the domain transition draft → sent must be allowed.
  if (!canTransitionChangeOrder(changeOrder.status, 'sent')) {
    throw new AppError(
      'CONFLICT',
      'approvedChangeOrdersOnly: the change order cannot transition to sent from its current status.',
      409,
      { ruleId: 'approvedChangeOrdersOnly', from: changeOrder.status, to: 'sent' },
    );
  }

  const now = ctx.clock.nowIso();

  // Steps 5-7: Set status to 'sent', sentAt and updatedAt to now.
  const updated: ChangeOrder = {
    ...changeOrder,
    status: 'sent',
    sentAt: now,
    updatedAt: now,
  };

  // Step 8: Save the ChangeOrder inside a transaction.
  await ctx.data.runInTransaction(async () => {
    await changeOrders.save(updated);
  });

  // Step 9: Return changeOrderId, status, sentAt, updatedAt.
  return {
    changeOrderId: updated.changeOrderId,
    status: updated.status,
    sentAt: now,
    updatedAt: now,
  };
}
