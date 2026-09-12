/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmReviewChangeOrderInput,
  BuildFlowFsmReviewChangeOrderOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.js';

/// **collab_i18n_start**
const message_en = {
  "page.title": "Change Order Review",
  "section.review.title": "Change Order Review",
  "intent.summary.title": "Change Order Details",
  "intent.commandForm.title": "Your Decision",
  "intent.workflowStatus.title": "Decision Result",
  "field.title.label": "Title",
  "field.scopeDescription.label": "Scope Description",
  "field.amount.label": "Cost Impact",
  "field.status.label": "Status",
  "field.sentAt.label": "Sent At",
  "field.changeOrderId.label": "Change Order ID",
  "field.decision.label": "Decision",
  "field.rejectionReason.label": "Rejection Reason",
  "field.approvedAt.label": "Approved At",
  "field.rejectedAt.label": "Rejected At",
  "field.updatedAt.label": "Last Updated",
  "action.reviewChangeOrder.label": "Submit Decision",
  "empty.summary": "No change order details available",
  "empty.commandForm": "Please review the change order details above before making your decision.",
  "empty.workflowStatus": "No decision has been submitted yet.",
  "sec.change.order.review.title": "Sec change order review",
  "org.review.change.order.title": "Approve or reject change order"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmClientChangeOrderReviewBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String })
  reviewChangeOrderState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) reviewChangeOrderChangeOrderId: string = '';
  @property({ type: String }) reviewChangeOrderDecision: string = '';
  @property({ type: String }) reviewChangeOrderRejectionReason: string = '';

  @property({ type: Object })
  OutputReviewChangeOrder: BuildFlowFsmReviewChangeOrderOutput | null = null;

  @property({ type: String }) LayoutFldSummaryTitle: string = '';
  @property({ type: String }) LayoutFldSummaryScope: string = '';
  @property({ type: String }) LayoutFldSummaryAmount: string = '';
  @property({ type: String }) LayoutFldSummaryStatus: string = '';
  @property({ type: String }) LayoutFldSummarySentAt: string = '';
  @property({ type: String }) LayoutFldResultStatus: string = '';
  @property({ type: String }) LayoutFldResultApprovedAt: string = '';
  @property({ type: String }) LayoutFldResultRejectedAt: string = '';
  @property({ type: String }) LayoutFldResultUpdatedAt: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.status = (getState('ui.clientChangeOrderReview.status') as string) ?? '';
    this.reviewChangeOrderState =
      (getState('ui.clientChangeOrderReview.action.reviewChangeOrder.status') as
        | "idle" | "loading" | "success" | "error") ?? "idle";
    this.reviewChangeOrderChangeOrderId =
      (getState('ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId') as string) ?? '';
    this.reviewChangeOrderDecision =
      (getState('ui.clientChangeOrderReview.input.reviewChangeOrder.decision') as string) ?? '';
    this.reviewChangeOrderRejectionReason =
      (getState('ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason') as string) ?? '';
    this.OutputReviewChangeOrder =
      (getState('ui.clientChangeOrderReview.output.reviewChangeOrder') as BuildFlowFsmReviewChangeOrderOutput | null) ?? null;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private parseRouteParams(): void {
    const pattern = '/buildFlowFsm/clientChangeOrderReview/:changeOrderId?';
    const patternParts = pattern.split('/').filter((p) => p.length > 0);
    const pathParts = window.location.pathname.split('/').filter((p) => p.length > 0);

    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':')) {
        const isOptional = part.endsWith('?');
        const paramName = isOptional ? part.slice(1, -1) : part.slice(1);
        const value = pathParts[i] ? decodeURIComponent(pathParts[i]) : '';
        if (value) {
          if (paramName === 'changeOrderId') {
            this.reviewChangeOrderChangeOrderId = value;
            setState('ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId', value);
          }
        }
      }
    }
  }

  setReviewChangeOrderChangeOrderId(value: string): void {
    this.reviewChangeOrderChangeOrderId = value;
    setState('ui.clientChangeOrderReview.input.reviewChangeOrder.changeOrderId', value);
    this.requestUpdate();
  }

  handleReviewChangeOrderChangeOrderIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setReviewChangeOrderChangeOrderId(target.value);
  }

  setReviewChangeOrderDecision(value: string): void {
    this.reviewChangeOrderDecision = value;
    setState('ui.clientChangeOrderReview.input.reviewChangeOrder.decision', value);
    this.requestUpdate();
  }

  handleReviewChangeOrderDecisionChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setReviewChangeOrderDecision(target.value);
  }

  setReviewChangeOrderRejectionReason(value: string): void {
    this.reviewChangeOrderRejectionReason = value;
    setState('ui.clientChangeOrderReview.input.reviewChangeOrder.rejectionReason', value);
    this.requestUpdate();
  }

  handleReviewChangeOrderRejectionReasonChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this.setReviewChangeOrderRejectionReason(target.value);
  }

  async reviewChangeOrder(): Promise<void> {
    this.parseRouteParams();

    if (!this.reviewChangeOrderChangeOrderId) {
      this.reviewChangeOrderState = "idle";
      setState('ui.clientChangeOrderReview.action.reviewChangeOrder.status', "idle");
      return;
    }

    this.reviewChangeOrderState = "loading";
    setState('ui.clientChangeOrderReview.action.reviewChangeOrder.status', "loading");

    const params: BuildFlowFsmReviewChangeOrderInput = {
      changeOrderId: this.reviewChangeOrderChangeOrderId,
      decision: this.reviewChangeOrderDecision as BuildFlowFsmReviewChangeOrderInput["decision"],
    };

    if (this.reviewChangeOrderRejectionReason) {
      params.rejectionReason = this.reviewChangeOrderRejectionReason;
    }

    const options: BffClientOptions = { mode: 'blocking' };

    const response = await execBff<BuildFlowFsmReviewChangeOrderOutput>(
      'buildFlowFsm.changeOrderLifecycle.reviewChangeOrder',
      params,
      options,
    );

    if (response.ok && response.data) {
      this.OutputReviewChangeOrder = response.data;
      setState('ui.clientChangeOrderReview.output.reviewChangeOrder', response.data);
      this.reviewChangeOrderState = "success";
      setState('ui.clientChangeOrderReview.action.reviewChangeOrder.status', "success");
    } else if (response.ok && response.data === null) {
      this.OutputReviewChangeOrder = null;
      setState('ui.clientChangeOrderReview.output.reviewChangeOrder', null);
      this.reviewChangeOrderState = "success";
      setState('ui.clientChangeOrderReview.action.reviewChangeOrder.status', "success");
    } else {
      if (response.error) {
        console.error('[reviewChangeOrder] Error:', response.error.message);
      }
      this.reviewChangeOrderState = "error";
      setState('ui.clientChangeOrderReview.action.reviewChangeOrder.status', "error");
    }
  }

  handleReviewChangeOrderClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.reviewChangeOrder();
    }, { mode: 'blocking', busyLabel: this.msg['action.reviewChangeOrder.label'] });
  }
}
