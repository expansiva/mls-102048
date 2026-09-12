/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.ts" enhancement="_blank"/>
export type ChangeOrderStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'cancelled';

export interface ChangeOrder {
  changeOrderId: string;
  projectId: string;
  title: string;
  scopeDescription: string;
  amount: number;
  status: ChangeOrderStatus;
  sentAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  cancelledAt: string | null;
  rejectionReason: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export const CHANGE_ORDER_STATUS_TRANSITIONS: Record<ChangeOrderStatus, ChangeOrderStatus[]> = {
  draft: ['sent', 'cancelled'],
  sent: ['approved', 'rejected', 'cancelled'],
  approved: [],
  rejected: [],
  cancelled: [],
};

export function canTransitionChangeOrder(from: ChangeOrderStatus, to: ChangeOrderStatus): boolean {
  return CHANGE_ORDER_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function changeOrderAmountMustBePositive(amount: number): boolean {
  return typeof amount === 'number' && amount > 0;
}

export function changeOrderRequiresSentAt(changeOrder: Pick<ChangeOrder, 'status' | 'sentAt'>): boolean {
  if (changeOrder.status === 'sent' || changeOrder.status === 'approved' || changeOrder.status === 'rejected') {
    return changeOrder.sentAt !== null;
  }
  return true;
}

export function changeOrderRequiresApprovedAt(changeOrder: Pick<ChangeOrder, 'status' | 'approvedAt'>): boolean {
  if (changeOrder.status === 'approved') {
    return changeOrder.approvedAt !== null;
  }
  return true;
}

export function changeOrderRequiresRejectedFields(changeOrder: Pick<ChangeOrder, 'status' | 'rejectedAt' | 'rejectionReason'>): boolean {
  if (changeOrder.status === 'rejected') {
    return changeOrder.rejectedAt !== null && changeOrder.rejectionReason !== null && changeOrder.rejectionReason.trim().length > 0;
  }
  return true;
}

export function changeOrderRequiresCancelledFields(changeOrder: Pick<ChangeOrder, 'status' | 'cancelledAt' | 'cancellationReason'>): boolean {
  if (changeOrder.status === 'cancelled') {
    return changeOrder.cancelledAt !== null && changeOrder.cancellationReason !== null && changeOrder.cancellationReason.trim().length > 0;
  }
  return true;
}

export function changeOrderAffectsJobCosting(changeOrder: Pick<ChangeOrder, 'status'>): boolean {
  return changeOrder.status === 'approved';
}

export function validateChangeOrderInvariants(changeOrder: ChangeOrder): string[] {
  const errors: string[] = [];

  if (!changeOrderAmountMustBePositive(changeOrder.amount)) {
    errors.push('amount must be a positive monetary value');
  }

  if (!changeOrderRequiresSentAt(changeOrder)) {
    errors.push('sentAt must be set when status is sent, approved, or rejected');
  }

  if (!changeOrderRequiresApprovedAt(changeOrder)) {
    errors.push('approvedAt must be set when status is approved');
  }

  if (!changeOrderRequiresRejectedFields(changeOrder)) {
    errors.push('rejectedAt and rejectionReason must be set when status is rejected');
  }

  if (!changeOrderRequiresCancelledFields(changeOrder)) {
    errors.push('cancelledAt and cancellationReason must be set when status is cancelled');
  }

  return errors;
}
