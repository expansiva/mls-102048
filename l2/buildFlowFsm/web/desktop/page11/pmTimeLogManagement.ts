/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/pmTimeLogManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmPmTimeLogManagementBase } from '/_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.js';

@customElement('build-flow-fsm--web--desktop--page11--pm-time-log-management-102048')
export class BuildFlowFsmDesktopPage11PmTimeLogManagementPage extends BuildFlowFsmPmTimeLogManagementBase {
  render() {
    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Section: Time Log Corrections -->
          <section class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#E6E6E6)] shadow-sm">
            <div class="px-6 py-4 border-b border-[var(--grey-color,#E6E6E6)]">
              <h2 class="text-lg font-bold text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['sec.time.log.corrections.title']}
              </h2>
            </div>

            <div class="p-6 space-y-6">
              <!-- Organism: Void Time Log -->
              <div class="space-y-4">
                <h3 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['org.void.time.log.title']}
                </h3>

                <!-- Intention: Selected Log Context (queryList / read-only context) -->
                <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-4">
                  <h4 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)] mb-3">
                    ${this.msg['title.selectedLogContext']}
                  </h4>
                  ${this.voidTimeLogTimeLogId
                    ? html`
                      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['label.timeLogId']}</dt>
                          <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${this.voidTimeLogTimeLogId}</dd>
                        </div>
                        <div>
                          <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['label.workTaskId']}</dt>
                          <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${this.LayoutFldCtxWorkTaskId || '—'}</dd>
                        </div>
                        <div>
                          <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['label.workerId']}</dt>
                          <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${this.LayoutFldCtxWorkerId || '—'}</dd>
                        </div>
                        <div>
                          <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['label.logDate']}</dt>
                          <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${this.LayoutFldCtxLogDate || '—'}</dd>
                        </div>
                        <div>
                          <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['label.hours']}</dt>
                          <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${this.LayoutFldCtxHours || '—'}</dd>
                        </div>
                        <div>
                          <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['label.workerRate']}</dt>
                          <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${this.LayoutFldCtxWorkerRate || '—'}</dd>
                        </div>
                        <div>
                          <dt class="text-xs text-[var(--text-primary-color-lighter,#535353)]">${this.msg['label.status']}</dt>
                          <dd class="text-sm text-[var(--text-primary-color,#403f3f)]">${this.LayoutFldCtxStatus || '—'}</dd>
                        </div>
                      </dl>
                    `
                    : html`
                      <p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">
                        ${this.msg['empty.noLogSelected']}
                      </p>
                    `}
                </div>

                <!-- Intention: Void Form (commandForm) -->
                <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4">
                  <h4 class="text-sm font-semibold text-[var(--text-primary-color,#403f3f)] mb-3">
                    ${this.msg['title.voidForm']}
                  </h4>
                  ${this.voidTimeLogTimeLogId
                    ? html`
                      <form class="space-y-4" @submit=${(e: Event) => this.handleVoidTimeLogClick(e)}>
                        <!-- Hidden timeLogId -->
                        <input type="hidden" .value=${this.voidTimeLogTimeLogId} />

                        <!-- Void Reason -->
                        <div>
                          <label
                            class="block text-xs font-medium text-[var(--text-primary-color-lighter,#535353)] mb-1"
                            for="fld_form_voidReason"
                          >
                            ${this.msg['label.voidReason']}
                          </label>
                          <textarea
                            id="fld_form_voidReason"
                            class="w-full rounded-md border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                            rows="3"
                            .value=${this.voidTimeLogVoidReason}
                            @input=${(e: Event) => this.handleVoidTimeLogVoidReasonChange(e)}
                          ></textarea>
                        </div>

                        <!-- Action buttons -->
                        <div class="flex justify-end">
                          <button
                            type="submit"
                            class="rounded-md bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] hover:bg-[var(--active-color-hover,#1a99ff)] focus:outline-none focus:ring-2 focus:ring-[var(--active-color-focus,#0e80cc)] disabled:opacity-50"
                            ?disabled=${this.voidTimeLogState === 'loading' || !this.voidTimeLogVoidReason}
                          >
                            ${this.voidTimeLogState === 'loading' ? '…' : this.msg['action.voidTimeLog']}
                          </button>
                        </div>

                        ${this.voidTimeLogState === 'success'
                          ? html`<p class="text-sm text-[var(--success-color,#52C41A)]">${this.msg['action.voidTimeLog']} ✓</p>`
                          : null}
                        ${this.voidTimeLogState === 'error'
                          ? html`<p class="text-sm text-[var(--error-color,#FF4D4F)]">Error</p>`
                          : null}
                      </form>
                    `
                    : html`
                      <p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">
                        ${this.msg['empty.noLogSelected']}
                      </p>
                    `}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
