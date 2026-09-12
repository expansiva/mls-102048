/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/pmMaterialUsageManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmPmMaterialUsageManagementBase } from '/_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.js';

@customElement('build-flow-fsm--web--desktop--page11--pm-material-usage-management-102048')
export class BuildFlowFsmDesktopPage11PmMaterialUsageManagementPage extends BuildFlowFsmPmMaterialUsageManagementBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Material Usage Corrections -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['sec.material.usage.corrections.title']}
            </h2>

            <!-- Organism: Void Material Usage -->
            <div
              class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color,#f8fafc)] p-4 space-y-4"
            >
              <h3 class="text-base font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['org.void.material.usage.title']}
              </h3>

              <!-- Command Form Intention -->
              <div class="space-y-4">
                <h4 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['intent.form.title']}
                </h4>

                ${!this.voidMaterialUsageMaterialUsageId
                  ? html`<p
                      class="text-sm italic text-[var(--text-primary-color-disabled,#64748b)]"
                    >
                      ${this.msg['empty.noSelection']}
                    </p>`
                  : html``}

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <!-- materialUsageId (selection / text input) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.materialUsageId']}
                      <span class="text-[var(--error-color,#ef4444)]">*</span>
                    </span>
                    <input
                      type="text"
                      .value="${this.voidMaterialUsageMaterialUsageId}"
                      @change="${(e: Event) => this.handleVoidMaterialUsageMaterialUsageIdChange(e)}"
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    />
                  </label>

                  <!-- materialName (readonly) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.materialName']}
                    </span>
                    <div
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)]"
                    >
                      ${this.LayoutFldMaterialName || '—'}
                    </div>
                  </label>

                  <!-- quantity (readonly) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.quantity']}
                    </span>
                    <div
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)]"
                    >
                      ${this.LayoutFldQuantity || '—'}
                    </div>
                  </label>

                  <!-- unit (readonly) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.unit']}
                    </span>
                    <div
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)]"
                    >
                      ${this.LayoutFldUnit || '—'}
                    </div>
                  </label>

                  <!-- unitCost (readonly, money) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.unitCost']}
                    </span>
                    <div
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)]"
                    >
                      ${this.LayoutFldUnitCost || '—'}
                    </div>
                  </label>

                  <!-- totalCost (readonly, money) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.totalCost']}
                    </span>
                    <div
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)]"
                    >
                      ${this.LayoutFldTotalCost || '—'}
                    </div>
                  </label>

                  <!-- usageDate (readonly, date) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.usageDate']}
                    </span>
                    <div
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)]"
                    >
                      ${this.LayoutFldUsageDate || '—'}
                    </div>
                  </label>

                  <!-- status (readonly) -->
                  <label class="block">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.status']}
                    </span>
                    <div
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-secondary-color,#f8fafc)]"
                    >
                      ${this.LayoutFldStatus || '—'}
                    </div>
                  </label>

                  <!-- voidReason (text, required) -->
                  <label class="block sm:col-span-2">
                    <span
                      class="block mb-1 text-sm font-medium text-[var(--text-primary-color,#0f172a)]"
                    >
                      ${this.msg['field.voidReason']}
                      <span class="text-[var(--error-color,#ef4444)]">*</span>
                    </span>
                    <textarea
                      .value="${this.voidMaterialUsageVoidReason}"
                      @change="${(e: Event) => this.handleVoidMaterialUsageVoidReasonChange(e)}"
                      rows="3"
                      class="w-full rounded border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    ></textarea>
                  </label>
                </div>

                <!-- Action button row -->
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    ?disabled="${this.voidMaterialUsageState === 'loading'}"
                    @click="${(e: Event) => this.handleVoidMaterialUsageClick(e)}"
                    class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ${this.voidMaterialUsageState === 'loading'
                      ? '…'
                      : this.msg['action.voidMaterialUsage']}
                  </button>
                  ${this.voidMaterialUsageState === 'error'
                    ? html`<span class="text-sm text-[var(--error-color,#ef4444)]">Error</span>`
                    : html``}
                  ${this.voidMaterialUsageState === 'success'
                    ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>`
                    : html``}
                </div>
              </div>

              <!-- Summary Intention -->
              <div
                class="space-y-3 border-t border-[var(--grey-color,#e2e8f0)] pt-4"
              >
                <h4 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['intent.summary.title']}
                </h4>

                ${!this.OutputVoidMaterialUsage
                  ? html`<p
                      class="text-sm italic text-[var(--text-primary-color-disabled,#64748b)]"
                    >
                      ${this.msg['empty.noResult']}
                    </p>`
                  : html`
                      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <span
                            class="block mb-1 text-xs font-medium text-[var(--text-primary-color-disabled,#64748b)]"
                          >
                            ${this.msg['field.status']}
                          </span>
                          <span class="text-sm text-[var(--text-primary-color,#0f172a)]">
                            ${this.LayoutFldSummaryStatus ||
                            this.OutputVoidMaterialUsage.status ||
                            '—'}
                          </span>
                        </div>
                        <div>
                          <span
                            class="block mb-1 text-xs font-medium text-[var(--text-primary-color-disabled,#64748b)]"
                          >
                            ${this.msg['field.voidedAt']}
                          </span>
                          <span class="text-sm text-[var(--text-primary-color,#0f172a)]">
                            ${this.LayoutFldSummaryVoidedAt ||
                            this.OutputVoidMaterialUsage.voidedAt ||
                            '—'}
                          </span>
                        </div>
                        <div>
                          <span
                            class="block mb-1 text-xs font-medium text-[var(--text-primary-color-disabled,#64748b)]"
                          >
                            ${this.msg['field.voidReason']}
                          </span>
                          <span class="text-sm text-[var(--text-primary-color,#0f172a)]">
                            ${this.voidMaterialUsageVoidReason || '—'}
                          </span>
                        </div>
                      </div>
                    `}
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
