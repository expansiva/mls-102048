/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientChangeOrderReview.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmClientChangeOrderReviewBase } from '/_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.js';

@customElement('build-flow-fsm--web--desktop--page11--client-change-order-review-102048')
export class BuildFlowFsmDesktopPage11ClientChangeOrderReviewPage extends BuildFlowFsmClientChangeOrderReviewBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          ${this.renderSection()}
        </div>
      </div>
    `;
  }

  private renderSection() {
    return html`
      <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e2e8f0)] shadow-sm">
        <div class="px-6 py-4 border-b border-[var(--grey-color,#e2e8f0)]">
          <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['sec.change.order.review.title']}
          </h2>
        </div>

        <div class="px-6 py-4 space-y-6">
          ${this.renderOrganism()}
        </div>
      </section>
    `;
  }

  private renderOrganism() {
    return html`
      <div class="space-y-6">
        <h3 class="text-base font-medium text-[var(--text-primary-color,#0f172a)]">
          ${this.msg['org.review.change.order.title']}
        </h3>

        ${this.renderSummaryIntention()}
        ${this.renderCommandFormIntention()}
        ${this.renderWorkflowStatusIntention()}
      </div>
    `;
  }

  private renderSummaryIntention() {
    const hasData =
      this.LayoutFldSummaryTitle ||
      this.LayoutFldSummaryScope ||
      this.LayoutFldSummaryAmount ||
      this.LayoutFldSummaryStatus ||
      this.LayoutFldSummarySentAt;

    return html`
      <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] p-4 space-y-3">
        <h4 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
          ${this.msg['intent.summary.title']}
        </h4>
        ${hasData
          ? html`
              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.title.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldSummaryTitle || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.status.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldSummaryStatus || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.amount.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldSummaryAmount || '—'}</dd>
                </div>
                <div>
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.sentAt.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldSummarySentAt || '—'}</dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.scopeDescription.label']}</dt>
                  <dd class="text-sm text-[var(--text-primary-color,#0f172a)] whitespace-pre-wrap">${this.LayoutFldSummaryScope || '—'}</dd>
                </div>
              </dl>
            `
          : html`<p class="text-sm text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['empty.summary']}</p>`}
      </div>
    `;
  }

  private renderCommandFormIntention() {
    return html`
      <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] p-4 space-y-4">
        <h4 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
          ${this.msg['intent.commandForm.title']}
        </h4>
        <p class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['empty.commandForm']}</p>

        <form class="space-y-4" @submit=${(e: Event) => this.handleReviewChangeOrderClick(e)}>
          <input type="hidden" .value=${this.reviewChangeOrderChangeOrderId} />

          <div>
            <label class="block text-xs font-medium text-[var(--text-primary-color,#0f172a)] mb-1" for="fld-decision">
              ${this.msg['field.decision.label']}
            </label>
            <select
              id="fld-decision"
              class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
              .value=${this.reviewChangeOrderDecision}
              @change=${(e: Event) => this.handleReviewChangeOrderDecisionChange(e)}
            >
              <option value="">—</option>
              <option value="approved" ?selected=${this.reviewChangeOrderDecision === 'approved'}>Approve</option>
              <option value="rejected" ?selected=${this.reviewChangeOrderDecision === 'rejected'}>Reject</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-[var(--text-primary-color,#0f172a)] mb-1" for="fld-rejectionReason">
              ${this.msg['field.rejectionReason.label']}
            </label>
            <textarea
              id="fld-rejectionReason"
              rows="3"
              class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890ff)]"
              .value=${this.reviewChangeOrderRejectionReason}
              @input=${(e: Event) => this.handleReviewChangeOrderRejectionReasonChange(e)}
            ></textarea>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="rounded-md bg-[var(--active-color,#1890ff)] px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50 disabled:cursor-not-allowed"
              ?disabled=${this.reviewChangeOrderState === 'loading' || !this.reviewChangeOrderDecision}
            >
              ${this.reviewChangeOrderState === 'loading' ? '…' : this.msg['action.reviewChangeOrder.label']}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  private renderWorkflowStatusIntention() {
    const hasResult =
      this.reviewChangeOrderState === 'success' || this.reviewChangeOrderState === 'error';

    return html`
      <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] p-4 space-y-3">
        <h4 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
          ${this.msg['intent.workflowStatus.title']}
        </h4>
        ${hasResult
          ? html`
              ${this.reviewChangeOrderState === 'error'
                ? html`<p class="text-sm text-[var(--error-color,#ff4d4f)]">An error occurred while submitting your decision.</p>`
                : html`
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.status.label']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldResultStatus || '—'}</dd>
                      </div>
                      <div>
                        <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.approvedAt.label']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldResultApprovedAt || '—'}</dd>
                      </div>
                      <div>
                        <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.rejectedAt.label']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldResultRejectedAt || '—'}</dd>
                      </div>
                      <div>
                        <dt class="text-xs text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['field.updatedAt.label']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldResultUpdatedAt || '—'}</dd>
                      </div>
                    </dl>
                  `}
            `
          : html`<p class="text-sm text-[var(--text-primary-color-lighter,#64748b)]">${this.msg['empty.workflowStatus']}</p>`}
      </div>
    `;
  }
}
