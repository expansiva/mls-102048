/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/statusReportLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmStatusReportLifecycleBase } from '/_102048_/l2/buildFlowFsm/web/shared/statusReportLifecycle.js';

@customElement('build-flow-fsm--web--desktop--page11--status-report-lifecycle-102048')
export class BuildFlowFsmDesktopPage11StatusReportLifecyclePage extends BuildFlowFsmStatusReportLifecycleBase {
  render() {
    const genOutput = this.OutputGenerateStatusReport;
    const shareOutput = this.OutputShareStatusReport;
    const genLoading = this.generateStatusReportState === 'loading';
    const shareLoading = this.shareStatusReportState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Generate Status Report -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.generate.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.generate.title']}
            </p>

            <!-- Generate Form -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['intention.generate.title']}
              </h3>

              <input type="hidden" .value="${this.generateStatusReportProjectId}" />

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.projectId.label']}
                </label>
                <input
                  type="text"
                  .value="${this.generateStatusReportProjectId}"
                  @input="${(e: Event) => this.handleGenerateStatusReportProjectIdChange(e)}"
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)]"
                  readonly
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.reportPeriodStart.label']}
                </label>
                <input
                  type="date"
                  .value="${this.generateStatusReportReportPeriodStart}"
                  @input="${(e: Event) => this.handleGenerateStatusReportReportPeriodStartChange(e)}"
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)]"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.reportPeriodEnd.label']}
                </label>
                <input
                  type="date"
                  .value="${this.generateStatusReportReportPeriodEnd}"
                  @input="${(e: Event) => this.handleGenerateStatusReportReportPeriodEndChange(e)}"
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)]"
                />
              </div>

              <button
                type="button"
                ?disabled="${genLoading}"
                @click="${() => this.handleGenerateStatusReportClick()}"
                class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] disabled:opacity-50"
              >
                ${genLoading ? '…' : this.msg['action.generateStatusReport.label']}
              </button>
            </div>

            <!-- Workflow Status -->
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['intention.workflowStatus.title']}
              </h3>
              <div class="flex items-center gap-2">
                <span class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
                  ${this.msg['field.status.label']}:
                </span>
                <span
                  class="inline-flex items-center rounded px-2 py-1 text-xs font-medium bg-[var(--bg-secondary-color,#E6E6E6)] text-[var(--text-primary-color,#0f172a)]"
                >
                  ${this.LayoutFldWfStatus || this.generateStatusReportState || 'idle'}
                </span>
              </div>
            </div>
          </section>

          <!-- Section: Review Generated Report -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.review.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.review.title']}
            </p>

            ${genOutput
              ? html`
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                      ${this.msg['intention.review.title']}
                    </h3>
                    <dl class="space-y-2 text-sm">
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.statusReportId.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${genOutput.statusReportId}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.status.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${genOutput.status}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.reportPeriodStart.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${genOutput.reportPeriodStart}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.reportPeriodEnd.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${genOutput.reportPeriodEnd}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.generatedAt.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${genOutput.generatedAt}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.llmModelUsed.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${genOutput.llmModelUsed}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.createdAt.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${genOutput.createdAt}
                        </dd>
                      </div>
                      <div class="space-y-1">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)]"
                        >
                          ${this.msg['field.content.label']}
                        </dt>
                        <dd
                          class="whitespace-pre-wrap rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color-lighter,#F9F9F9)] p-3 text-[var(--text-primary-color,#0f172a)]"
                        >
                          ${genOutput.content}
                        </dd>
                      </div>
                    </dl>
                  </div>
                `
              : html`
                  <p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic"
                  >
                    ${this.msg['empty.review']}
                  </p>
                `}
          </section>

          <!-- Section: Share Status Report -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
          >
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.share.title']}
            </h2>
            <p class="text-sm text-[var(--text-primary-color-lighter,#535353)]">
              ${this.msg['org.share.title']}
            </p>

            <!-- Share Form -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['intention.share.title']}
              </h3>

              <input type="hidden" .value="${this.shareStatusReportStatusReportId}" />

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.statusReportId.label']}
                </label>
                <input
                  type="text"
                  .value="${this.shareStatusReportStatusReportId}"
                  @input="${(e: Event) => this.handleShareStatusReportStatusReportIdChange(e)}"
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)]"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#0f172a)] mb-1"
                >
                  ${this.msg['field.sharedWithEmail.label']}
                </label>
                <input
                  type="email"
                  .value="${this.shareStatusReportSharedWithEmail}"
                  @input="${(e: Event) => this.handleShareStatusReportSharedWithEmailChange(e)}"
                  class="w-full rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)]"
                />
              </div>

              <button
                type="button"
                ?disabled="${shareLoading}"
                @click="${() => this.handleShareStatusReportClick()}"
                class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--active-color,#1890FF)] disabled:opacity-50"
              >
                ${shareLoading ? '…' : this.msg['action.shareStatusReport.label']}
              </button>
            </div>

            <!-- Share Result -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['intention.shareResult.title']}
              </h3>

              ${shareOutput
                ? html`
                    <dl class="space-y-2 text-sm">
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.status.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${shareOutput.status}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.sharedAt.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${shareOutput.sharedAt}
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.shareLink.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          <a
                            href="${shareOutput.shareLink}"
                            target="_blank"
                            rel="noopener"
                            class="text-[var(--link-color,#1890FF)] underline"
                            >${shareOutput.shareLink}</a
                          >
                        </dd>
                      </div>
                      <div class="flex gap-2">
                        <dt
                          class="font-medium text-[var(--text-primary-color-lighter,#535353)] min-w-[200px]"
                        >
                          ${this.msg['field.sharedWithEmail.label']}
                        </dt>
                        <dd class="text-[var(--text-primary-color,#0f172a)]">
                          ${shareOutput.sharedWithEmail}
                        </dd>
                      </div>
                    </dl>
                  `
                : html`
                    <p
                      class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic"
                    >
                      ${this.msg['empty.shareResult']}
                    </p>
                  `}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
