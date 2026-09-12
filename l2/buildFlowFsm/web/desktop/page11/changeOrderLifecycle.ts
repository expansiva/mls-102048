/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/changeOrderLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmChangeOrderLifecycleBase } from '/_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.js';

@customElement('build-flow-fsm--web--desktop--page11--change-order-lifecycle-102048')
export class BuildFlowFsmDesktopPage11ChangeOrderLifecyclePage extends BuildFlowFsmChangeOrderLifecycleBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['section.changeOrderManagement']}
          </h1>

          <!-- Section 1: Create Change Order -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.changeOrderManagement.title']}
            </h2>
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['intention.createForm.title']}
              </h3>

              <!-- projectId: hidden, sourced from route -->
              <input type="hidden" .value="${this.createChangeOrderProjectId}" />

              <!-- title -->
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.title.label']}
                </label>
                <input
                  type="text"
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value="${this.createChangeOrderTitle}"
                  @input="${(e: Event) => this.handleCreateChangeOrderTitleChange(e)}"
                />
              </div>

              <!-- scopeDescription -->
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.scopeDescription.label']}
                </label>
                <textarea
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                  rows="4"
                  .value="${this.createChangeOrderScopeDescription}"
                  @input="${(e: Event) => this.handleCreateChangeOrderScopeDescriptionChange(e)}"
                ></textarea>
              </div>

              <!-- amount -->
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.amount.label']}
                </label>
                <input
                  type="number"
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value="${this.createChangeOrderAmount}"
                  @input="${(e: Event) => this.handleCreateChangeOrderAmountChange(e)}"
                />
              </div>

              <!-- submit -->
              <div>
                <button
                  class="rounded px-4 py-2 font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  ?disabled="${this.createChangeOrderState === 'loading'}"
                  @click="${() => this.handleCreateChangeOrderClick()}"
                >
                  ${this.createChangeOrderState === 'loading'
                    ? '…'
                    : this.msg['action.createChangeOrder.label']}
                </button>
                ${this.createChangeOrderState === 'success'
                  ? html`<span class="ml-3 text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                  : null}
                ${this.createChangeOrderState === 'error'
                  ? html`<span class="ml-3 text-sm text-[var(--error-color,#FF4D4F)]">!</span>`
                  : null}
              </div>
            </div>
          </section>

          <!-- Section 2: Send Change Order -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['org.sendChangeOrder.title']}
            </h2>
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['intention.draftList.title']}
              </h3>

              <!-- Draft list table -->
              ${this.OutputCreateChangeOrder &&
              this.OutputCreateChangeOrder.status === 'draft'
                ? html`
                    <table class="w-full text-sm">
                      <thead>
                        <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                          <th
                            class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.title.label']}
                          </th>
                          <th
                            class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.amount.label']}
                          </th>
                          <th
                            class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.status.label']}
                          </th>
                          <th
                            class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.createdAt.label']}
                          </th>
                          <th class="py-2 px-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b border-[var(--grey-color,#e2e8f0)]">
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.title}
                          </td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.amount}
                          </td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.status}
                          </td>
                          <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.createdAt}
                          </td>
                          <td class="py-2 px-3">
                            <button
                              class="rounded px-3 py-1 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                              ?disabled="${this.sendChangeOrderState === 'loading'}"
                              @click="${() => {
                                this.setSendChangeOrderChangeOrderId(
                                  this.OutputCreateChangeOrder!.changeOrderId,
                                );
                                this.handleSendChangeOrderClick();
                              }}"
                            >
                              ${this.msg['action.sendChangeOrder.label']}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  `
                : html`
                    <p
                      class="text-sm text-[var(--text-primary-color,#0f172a)] opacity-60"
                    >
                      ${this.msg['intention.draftList.empty']}
                    </p>
                  `}

              <!-- Send form -->
              <div class="space-y-3 pt-4 border-t border-[var(--grey-color,#e2e8f0)]">
                <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['intention.sendForm.title']}
                </h3>
                <div>
                  <label
                    class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                  >
                    ${this.msg['field.changeOrderId.label']}
                  </label>
                  <select
                    class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value="${this.sendChangeOrderChangeOrderId}"
                    @change="${(e: Event) => this.handleSendChangeOrderChangeOrderIdChange(e)}"
                  >
                    <option value=""></option>
                    ${this.OutputCreateChangeOrder &&
                    this.OutputCreateChangeOrder.status === 'draft'
                      ? html`
                          <option
                            value="${this.OutputCreateChangeOrder.changeOrderId}"
                            ?selected="${this.sendChangeOrderChangeOrderId ===
                            this.OutputCreateChangeOrder.changeOrderId}"
                          >
                            ${this.OutputCreateChangeOrder.title}
                          </option>
                        `
                      : null}
                  </select>
                </div>
                <div>
                  <button
                    class="rounded px-4 py-2 font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                    ?disabled="${this.sendChangeOrderState === 'loading' ||
                    !this.sendChangeOrderChangeOrderId}"
                    @click="${() => this.handleSendChangeOrderClick()}"
                  >
                    ${this.sendChangeOrderState === 'loading'
                      ? '…'
                      : this.msg['action.sendChangeOrder.label']}
                  </button>
                  ${this.sendChangeOrderState === 'success'
                    ? html`<span class="ml-3 text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                    : null}
                  ${this.sendChangeOrderState === 'error'
                    ? html`<span class="ml-3 text-sm text-[var(--error-color,#FF4D4F)]">!</span>`
                    : null}
                </div>
              </div>
            </div>
          </section>

          <!-- Section 3: Review Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['org.reviewSummary.title']}
            </h2>
            <div class="space-y-4">
              <!-- Summary -->
              <div>
                <h3
                  class="text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-2"
                >
                  ${this.msg['intention.summary.title']}
                </h3>
                ${this.OutputCreateChangeOrder
                  ? html`
                      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt
                            class="font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.title.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.title}
                          </dd>
                        </div>
                        <div>
                          <dt
                            class="font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.scopeDescription.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.scopeDescription}
                          </dd>
                        </div>
                        <div>
                          <dt
                            class="font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.amount.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.amount}
                          </dd>
                        </div>
                        <div>
                          <dt
                            class="font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.status.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputSendChangeOrder?.status ??
                            this.OutputCreateChangeOrder.status}
                          </dd>
                        </div>
                        <div>
                          <dt
                            class="font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.createdAt.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputCreateChangeOrder.createdAt}
                          </dd>
                        </div>
                        <div>
                          <dt
                            class="font-medium text-[var(--text-primary-color,#0f172a)]"
                          >
                            ${this.msg['field.sentAt.label']}
                          </dt>
                          <dd class="text-[var(--text-primary-color,#0f172a)]">
                            ${this.OutputSendChangeOrder?.sentAt ?? '—'}
                          </dd>
                        </div>
                      </dl>
                    `
                  : html`
                      <p
                        class="text-sm text-[var(--text-primary-color,#0f172a)] opacity-60"
                      >
                        ${this.msg['intention.summary.empty']}
                      </p>
                    `}
              </div>

              <!-- Workflow Status -->
              <div class="pt-4 border-t border-[var(--grey-color,#e2e8f0)]">
                <h3
                  class="text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-2"
                >
                  ${this.msg['intention.workflowStatus.title']}
                </h3>
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['field.status.label']}
                    </dt>
                    <dd class="text-[var(--text-primary-color,#0f172a)]">
                      ${this.OutputSendChangeOrder?.status ??
                      this.OutputCreateChangeOrder?.status ??
                      '—'}
                    </dd>
                  </div>
                  <div>
                    <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['field.sentAt.label']}
                    </dt>
                    <dd class="text-[var(--text-primary-color,#0f172a)]">
                      ${this.OutputSendChangeOrder?.sentAt ?? '—'}
                    </dd>
                  </div>
                  <div>
                    <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['field.approvedAt.label']}
                    </dt>
                    <dd class="text-[var(--text-primary-color,#0f172a)]">—</dd>
                  </div>
                  <div>
                    <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['field.rejectedAt.label']}
                    </dt>
                    <dd class="text-[var(--text-primary-color,#0f172a)]">—</dd>
                  </div>
                  <div>
                    <dt class="font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['field.updatedAt.label']}
                    </dt>
                    <dd class="text-[var(--text-primary-color,#0f172a)]">
                      ${this.OutputSendChangeOrder?.updatedAt ?? '—'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
