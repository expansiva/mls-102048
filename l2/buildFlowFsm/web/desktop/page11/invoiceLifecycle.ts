/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/invoiceLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmInvoiceLifecycleBase } from '/_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.js';

@customElement('build-flow-fsm--web--desktop--page11--invoice-lifecycle-102048')
export class BuildFlowFsmDesktopPage11InvoiceLifecyclePage extends BuildFlowFsmInvoiceLifecycleBase {
  render() {
    const genOutput = this.OutputGenerateInvoice;
    const issueOutput = this.OutputIssueInvoice;
    const genLoading = this.generateInvoiceState === 'loading';
    const issueLoading = this.issueInvoiceState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">

          <!-- Section 1: Project Selection -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.projectSelection.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color,#535353)]">
              ${this.msg['org.project.selector.title']}
            </p>
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['intent.projectList.title']}
              </h3>
              <!-- Filter (no handler available — disabled) -->
              <div>
                <label class="block text-xs text-[var(--text-primary-color,#535353)] mb-1">
                  ${this.msg['filter.projectStatus']}
                </label>
                <select
                  disabled
                  class="w-full max-w-xs px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--text-primary-color,#403f3f)] text-sm"
                >
                  <option value="">${this.msg['filter.projectStatus']}</option>
                </select>
              </div>
              <!-- Project table (no queryResult state — empty) -->
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['col.projectName']}
                      </th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['col.projectStatus']}
                      </th>
                      <th class="text-right py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['col.projectBudget']}
                      </th>
                      <th class="text-left py-2 px-3 font-medium text-[var(--text-primary-color,#403f3f)]">
                        ${this.msg['col.projectClient']}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colspan="4"
                        class="py-6 text-center text-[var(--text-primary-color,#535353)]"
                      >
                        ${this.msg['intent.projectList.empty']}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Section 2: Billing Summary -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.billingSummary.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color,#535353)]">
              ${this.msg['org.billing.summary.title']}
            </p>
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['intent.costBreakdown.title']}
              </h3>
              ${genOutput
                ? html`
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.laborCost']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          $${genOutput.laborCost.toFixed(2)}
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.materialCost']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          $${genOutput.materialCost.toFixed(2)}
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.changeOrderAmount']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          $${genOutput.changeOrderAmount.toFixed(2)}
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.totalAmount']}
                        </dt>
                        <dd class="text-sm font-bold text-[var(--text-primary-color,#403f3f)]">
                          $${genOutput.totalAmount.toFixed(2)}
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.currency']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${genOutput.currency.toUpperCase()}
                        </dd>
                      </div>
                    </dl>
                  `
                : html`
                    <p
                      class="text-sm text-[var(--text-primary-color,#535353)] py-4 text-center"
                    >
                      ${this.msg['intent.costBreakdown.empty']}
                    </p>
                  `}
            </div>
          </section>

          <!-- Section 3: Generate Invoice -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.generateInvoice.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color,#535353)]">
              ${this.msg['org.generate.invoice.title']}
            </p>
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['intent.generateForm.title']}
              </h3>
              <form class="space-y-4" @submit="${(e: Event) => e.preventDefault()}">
                <!-- Hidden projectId (source: selectedEntity) -->
                <input type="hidden" .value="${this.generateInvoiceProjectId}" />
                <div>
                  <label
                    class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['field.projectId']}
                  </label>
                  <input
                    type="text"
                    .value="${this.generateInvoiceProjectId}"
                    @input="${(e: Event) => this.handleGenerateInvoiceProjectIdChange(e)}"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['field.clientEmail']}
                  </label>
                  <input
                    type="email"
                    .value="${this.generateInvoiceClientEmail}"
                    @input="${(e: Event) => this.handleGenerateInvoiceClientEmailChange(e)}"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['field.notes']}
                  </label>
                  <textarea
                    .value="${this.generateInvoiceNotes}"
                    @input="${(e: Event) => this.handleGenerateInvoiceNotesChange(e)}"
                    rows="3"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                  ></textarea>
                </div>
                <button
                  type="button"
                  ?disabled="${genLoading}"
                  @click="${(e: Event) => this.handleGenerateInvoiceClick(e)}"
                  class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] disabled:opacity-50"
                >
                  ${genLoading ? '…' : this.msg['action.generateInvoice']}
                </button>
              </form>
            </div>
          </section>

          <!-- Section 4: Issue Invoice -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.issueInvoice.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color,#535353)]">
              ${this.msg['org.issue.invoice.title']}
            </p>

            <!-- Workflow Status -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['intent.workflowStatus.title']}
              </h3>
              <dl class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  class="border-b border-[var(--grey-color,#E6E6E6)] py-2"
                >
                  <dt class="text-xs text-[var(--text-primary-color,#535353)] mb-1">
                    ${this.msg['field.invoiceStatus']}
                  </dt>
                  <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.LayoutFldWfStatus || '—'}
                  </dd>
                </div>
                <div
                  class="border-b border-[var(--grey-color,#E6E6E6)] py-2"
                >
                  <dt class="text-xs text-[var(--text-primary-color,#535353)] mb-1">
                    ${this.msg['field.invoiceId']}
                  </dt>
                  <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.issueInvoiceInvoiceId || '—'}
                  </dd>
                </div>
                <div
                  class="border-b border-[var(--grey-color,#E6E6E6)] py-2"
                >
                  <dt class="text-xs text-[var(--text-primary-color,#535353)] mb-1">
                    ${this.msg['field.totalAmount']}
                  </dt>
                  <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                    ${this.LayoutFldWfTotal || '—'}
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Issue Form -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['intent.issueForm.title']}
              </h3>
              <form class="space-y-4" @submit="${(e: Event) => e.preventDefault()}">
                <!-- Hidden invoiceId (source: selectedEntity) -->
                <input type="hidden" .value="${this.issueInvoiceInvoiceId}" />
                <div>
                  <label
                    class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['field.invoiceId']}
                  </label>
                  <input
                    type="text"
                    .value="${this.issueInvoiceInvoiceId}"
                    @input="${(e: Event) => this.handleIssueInvoiceInvoiceIdChange(e)}"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['field.clientEmail']}
                  </label>
                  <input
                    type="email"
                    .value="${this.issueInvoiceClientEmail}"
                    @input="${(e: Event) => this.handleIssueInvoiceClientEmailChange(e)}"
                    class="w-full px-3 py-2 rounded border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] text-[var(--text-primary-color,#403f3f)] text-sm"
                  />
                </div>
                <button
                  type="button"
                  ?disabled="${issueLoading}"
                  @click="${(e: Event) => this.handleIssueInvoiceClick(e)}"
                  class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890FF)] disabled:opacity-50"
                >
                  ${issueLoading ? '…' : this.msg['action.issueInvoice']}
                </button>
              </form>
            </div>
          </section>

          <!-- Section 5: Invoice Result -->
          <section
            class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['section.invoiceResult.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color,#535353)]">
              ${this.msg['org.invoice.result.title']}
            </p>
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['intent.invoiceSummary.title']}
              </h3>
              ${issueOutput
                ? html`
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.invoiceId']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${issueOutput.invoiceId}
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.invoiceStatus']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${issueOutput.status}
                        </dd>
                      </div>
                      ${genOutput
                        ? html`
                            <div
                              class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                            >
                              <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                                ${this.msg['field.laborCost']}
                              </dt>
                              <dd
                                class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                $${genOutput.laborCost.toFixed(2)}
                              </dd>
                            </div>
                            <div
                              class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                            >
                              <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                                ${this.msg['field.materialCost']}
                              </dt>
                              <dd
                                class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                $${genOutput.materialCost.toFixed(2)}
                              </dd>
                            </div>
                            <div
                              class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                            >
                              <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                                ${this.msg['field.changeOrderAmount']}
                              </dt>
                              <dd
                                class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                $${genOutput.changeOrderAmount.toFixed(2)}
                              </dd>
                            </div>
                            <div
                              class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                            >
                              <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                                ${this.msg['field.currency']}
                              </dt>
                              <dd
                                class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                              >
                                ${genOutput.currency.toUpperCase()}
                              </dd>
                            </div>
                          `
                        : null}
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.totalAmount']}
                        </dt>
                        <dd class="text-sm font-bold text-[var(--text-primary-color,#403f3f)]">
                          $${issueOutput.totalAmount.toFixed(2)}
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.shareLink']}
                        </dt>
                        <dd class="text-sm text-[var(--active-color,#1890FF)] truncate max-w-xs">
                          <a
                            href="${issueOutput.shareLink}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="underline"
                          >
                            ${issueOutput.shareLink}
                          </a>
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.clientEmail']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${issueOutput.clientEmail || '—'}
                        </dd>
                      </div>
                      <div
                        class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                      >
                        <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                          ${this.msg['field.issuedAt']}
                        </dt>
                        <dd class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                          ${issueOutput.issuedAt}
                        </dd>
                      </div>
                    </dl>
                  `
                : genOutput
                  ? html`
                      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.invoiceId']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            ${genOutput.invoiceId}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.invoiceStatus']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            ${genOutput.status}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.laborCost']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            $${genOutput.laborCost.toFixed(2)}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.materialCost']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            $${genOutput.materialCost.toFixed(2)}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.changeOrderAmount']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            $${genOutput.changeOrderAmount.toFixed(2)}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.totalAmount']}
                          </dt>
                          <dd
                            class="text-sm font-bold text-[var(--text-primary-color,#403f3f)]"
                          >
                            $${genOutput.totalAmount.toFixed(2)}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.currency']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            ${genOutput.currency.toUpperCase()}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.shareLink']}
                          </dt>
                          <dd
                            class="text-sm text-[var(--active-color,#1890FF)] truncate max-w-xs"
                          >
                            <a
                              href="${genOutput.shareLink}"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="underline"
                            >
                              ${genOutput.shareLink}
                            </a>
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.clientEmail']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            ${genOutput.clientEmail || '—'}
                          </dd>
                        </div>
                        <div
                          class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] py-2"
                        >
                          <dt class="text-sm text-[var(--text-primary-color,#535353)]">
                            ${this.msg['field.issuedAt']}
                          </dt>
                          <dd
                            class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]"
                          >
                            —
                          </dd>
                        </div>
                      </dl>
                    `
                  : html`
                      <p
                        class="text-sm text-[var(--text-primary-color,#535353)] py-4 text-center"
                      >
                        ${this.msg['intent.invoiceSummary.empty']}
                      </p>
                    `}
            </div>
          </section>

        </div>
      </div>
    `;
  }
}
