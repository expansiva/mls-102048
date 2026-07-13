/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/reviewChangeOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChangeOrderRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.js';
import type { ChangeOrder, ChangeOrderStatus } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';
import { canTransitionChangeOrder } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';

export interface ReviewChangeOrderInput {
  changeOrderId: string;
  decision: string;
  rejectionReason?: string;
}

export interface ReviewChangeOrderOutput {
  changeOrderId: string;
  title: string;
  scopeDescription: string;
  amount: number;
  status: string;
  sentAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  updatedAt: string;
}

export async function reviewChangeOrder(
  ctx: RequestContext,
  input: ReviewChangeOrderInput,
): Promise<ReviewChangeOrderOutput> {
  const changeOrders = resolveRepository<IChangeOrderRepository>(ctx, 'ChangeOrder');

  // Step 1: Load the ChangeOrder aggregate by changeOrderId
  const changeOrder = await changeOrders.getById(input.changeOrderId);

  // Step 2: Validate current status is 'sent' — rule changeOrderInAppApproval
  if (changeOrder.status !== 'sent') {
    throw new AppError(
      'VALIDATION_ERROR',
      'changeOrderInAppApproval: only a sent change order can be reviewed.',
      400,
      { ruleId: 'changeOrderInAppApproval', currentStatus: changeOrder.status },
    );
  }

  // Step 3: Validate decision is either 'approve' or 'reject'
  if (input.decision !== 'approve' && input.decision !== 'reject') {
    throw new AppError(
      'VALIDATION_ERROR',
      'decision must be either "approve" or "reject".',
      400,
      { decision: input.decision },
    );
  }

  const now = ctx.clock.nowIso();
  const targetStatus: ChangeOrderStatus =
    input.decision === 'approve' ? 'approved' : 'rejected';

  // Validate the domain transition is allowed
  if (!canTransitionChangeOrder(changeOrder.status, targetStatus)) {
    throw new AppError(
      'CONFLICT',
      `Cannot transition change order from "${changeOrder.status}" to "${targetStatus}".`,
      409,
      { from: changeOrder.status, to: targetStatus },
    );
  }

  // Steps 5 & 6: Apply the decision
  let updated: ChangeOrder;
  if (input.decision === 'approve') {
    // Rule approvedChangeOrdersOnly: only an approved change order affects job costing.
    // Setting status to 'approved' here is the single point that makes this change order
    // eligible for downstream job-costing effects.
    updated = {
      ...changeOrder,
      status: 'approved',
      approvedAt: now,
      updatedAt: now,
    };
  } else {
    // Step 4: rejectionReason is optional — store it if provided, otherwise null.
    updated = {
      ...changeOrder,
      status: 'rejected',
      rejectedAt: now,
      rejectionReason: input.rejectionReason ?? null,
      updatedAt: now,
    };
  }

  // Step 7: Save the ChangeOrder aggregate inside a transaction
  await ctx.data.runInTransaction(async () => {
    await changeOrders.save(updated);
  });

  // Step 8: Return the updated change order projection
  return {
    changeOrderId: updated.changeOrderId,
    title: updated.title,
    scopeDescription: updated.scopeDescription,
    amount: updated.amount,
    status: updated.status,
    sentAt: updated.sentAt,
    approvedAt: updated.approvedAt,
    rejectedAt: updated.rejectedAt,
    rejectionReason: updated.rejectionReason,
    updatedAt: updated.updatedAt,
  };
}
