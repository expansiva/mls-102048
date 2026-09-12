/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientStatusReportView.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmClientStatusReportViewBase } from '/_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.js';

@customElement('build-flow-fsm--web--desktop--page11--client-status-report-view-102048')
export class BuildFlowFsmDesktopPage11ClientStatusReportViewPage extends BuildFlowFsmClientStatusReportViewBase {
  render() {
    const data = this.viewStatusReportData;
    const isLoading = this.viewStatusReportState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['section.report.title']}
          </h1>

          ${isLoading
            ? html`
                <div class="flex items-center justify-center py-12 text-[var(--text-primary-color-lighter,#535353)]">
                  <span>${this.msg['intention.reportInfo.title']}…</span>
                </div>
              `
            : !data
              ? html`
                  <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6">
                    <p class="text-[var(--text-primary-color-lighter,#535353)] text-center">
                      ${this.msg['empty.report']}
                    </p>
                  </div>
                `
              : html`
                  <!-- Section: Project Status Report -->
                  <section class="space-y-6">
                    <!-- Organism: Report Summary -->
                    <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] shadow-sm">
                      <div class="border-b border-[var(--grey-color,#e2e8f0)] px-5 py-4">
                        <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                          ${this.msg['intention.reportInfo.title']}
                        </h2>
                      </div>
                      <div class="px-5 py-4">
                        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.status.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.status === 'generated'
                                ? this.msg['status.generated']
                                : data.status === 'shared'
                                  ? this.msg['status.shared']
                                  : data.status}
                            </dd>
                          </div>
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.reportPeriodStart.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.reportPeriodStart ?? '—'}
                            </dd>
                          </div>
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.reportPeriodEnd.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.reportPeriodEnd ?? '—'}
                            </dd>
                          </div>
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.generatedAt.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.generatedAt ?? '—'}
                            </dd>
                          </div>
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.sharedAt.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.sharedAt ?? '—'}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <!-- Organism: Report Detail -->
                    <div class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] shadow-sm">
                      <div class="border-b border-[var(--grey-color,#e2e8f0)] px-5 py-4">
                        <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
                          ${this.msg['intention.reportContent.title']}
                        </h2>
                      </div>
                      <div class="px-5 py-4 space-y-4">
                        <!-- Report Content -->
                        <div>
                          <p class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)] mb-1">
                            ${this.msg['field.content.label']}
                          </p>
                          <div class="rounded-lg bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-4 text-sm text-[var(--text-primary-color,#0f172a)] whitespace-pre-wrap leading-relaxed">
                            ${data.content ?? '—'}
                          </div>
                        </div>

                        <!-- Detail fields -->
                        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.projectId.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.projectId ?? '—'}
                            </dd>
                          </div>
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.llmModelUsed.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.llmModelUsed ?? '—'}
                            </dd>
                          </div>
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.shareLink.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)] break-all">
                              ${data.shareLink ?? '—'}
                            </dd>
                          </div>
                          <div>
                            <dt class="text-sm font-medium text-[var(--text-primary-color-lighter,#535353)]">
                              ${this.msg['field.sharedWithEmail.label']}
                            </dt>
                            <dd class="mt-1 text-sm text-[var(--text-primary-color,#0f172a)]">
                              ${data.sharedWithEmail ?? '—'}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </section>
                `}
        </div>
      </div>
    `;
  }
}
