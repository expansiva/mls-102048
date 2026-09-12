/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/projectManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmProjectManagementBase } from '/_102048_/l2/buildFlowFsm/web/shared/projectManagement.js';
import type { BuildFlowFsmViewDashboardOutputItem } from '/_102048_/l2/buildFlowFsm/web/contracts/projectManagement.js';

const STATUS_OPTIONS: ReadonlyArray<"draft" | "active" | "completed" | "cancelled"> = [
  "draft",
  "active",
  "completed",
  "cancelled",
];

@customElement('build-flow-fsm--web--desktop--page11--project-management-102048')
export class BuildFlowFsmDesktopPage11ProjectManagementPage extends BuildFlowFsmProjectManagementBase {
  render() {
    const dashboardItems: BuildFlowFsmViewDashboardOutputItem[] =
      this.viewDashboardData?.items ?? [];
    const projectDetail = this.viewProjectData;

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Page header -->
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['section.dashboard.title']}
          </h1>

          <!-- ====================================================== -->
          <!-- Section: Dashboard                                      -->
          <!-- ====================================================== -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['organism.dashboardList.title']}
            </h2>

            <!-- Context badge (businessContext) -->
            <div
              class="flex items-center gap-2 text-sm text-[var(--text-primary-color,#0f172a)]"
            >
              <span class="font-medium"
                >${this.msg['field.activeCompanyId.label']}:</span
              >
              <span
                class="inline-flex items-center rounded-md bg-[var(--bg-secondary-color,#f1f5f9)] px-2 py-1 text-xs font-medium"
              >
                ${this.activeCompanyId || '—'}
              </span>
            </div>

            <!-- Toolbar -->
            <div class="flex justify-end">
              <button
                class="rounded-md bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                ?disabled=${this.viewDashboardState === 'loading'}
                @click=${() => this.handleViewDashboardClick()}
              >
                ${this.msg['action.viewDashboard']}
              </button>
            </div>

            <!-- Dashboard cards table -->
            ${dashboardItems.length === 0
              ? html`<p
                  class="text-sm text-[var(--text-primary-color,#64748b)] py-4 text-center"
                >
                  ${this.msg['intent.dashboardCards.empty']}
                </p>`
              : html`
                  <table class="w-full text-sm">
                    <thead>
                      <tr
                        class="border-b border-[var(--grey-color,#e2e8f0)] text-left text-[var(--text-primary-color,#0f172a)]"
                      >
                        <th class="py-2 pr-4 font-medium">
                          ${this.msg['field.project.name']}
                        </th>
                        <th class="py-2 pr-4 font-medium">
                          ${this.msg['field.project.status']}
                        </th>
                        <th class="py-2 pr-4 font-medium">
                          ${this.msg['field.project.budget']}
                        </th>
                        <th class="py-2 pr-4 font-medium">
                          ${this.msg['field.project.actualCost']}
                        </th>
                        <th class="py-2 pr-4 font-medium">
                          ${this.msg['field.project.endDate']}
                        </th>
                        <th class="py-2 pr-4 font-medium">
                          ${this.msg['field.project.delayRisk']}
                        </th>
                        <th class="py-2 pr-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${dashboardItems.map(
                        (item: BuildFlowFsmViewDashboardOutputItem) => html`
                          <tr
                            class="border-b border-[var(--grey-color,#e2e8f0)]"
                          >
                            <td
                              class="py-2 pr-4 text-[var(--text-primary-color,#0f172a)]"
                            >
                              ${item.name}
                            </td>
                            <td
                              class="py-2 pr-4 text-[var(--text-primary-color,#0f172a)]"
                            >
                              ${item.status}
                            </td>
                            <td
                              class="py-2 pr-4 text-[var(--text-primary-color,#0f172a)]"
                            >
                              $${item.budget}
                            </td>
                            <td
                              class="py-2 pr-4 text-[var(--text-primary-color,#0f172a)]"
                            >
                              ${item.cost ?? '—'}
                            </td>
                            <td
                              class="py-2 pr-4 text-[var(--text-primary-color,#0f172a)]"
                            >
                              ${item.endDate}
                            </td>
                            <td
                              class="py-2 pr-4 text-[var(--text-primary-color,#0f172a)]"
                            >
                              ${item.dueDate}
                            </td>
                            <td class="py-2 pr-4">
                              <button
                                class="rounded-md bg-[var(--active-color,#1890FF)] px-3 py-1 text-xs font-medium text-white hover:opacity-90"
                                @click=${() => {
                                  this.setViewProjectProjectId(item.projectId);
                                  this.handleViewProjectClick();
                                }}
                              >
                                ${this.msg['action.viewProject']}
                              </button>
                            </td>
                          </tr>
                        `,
                      )}
                    </tbody>
                  </table>
                `}
          </section>

          <!-- ====================================================== -->
          <!-- Section: Project Detail                                 -->
          <!-- ====================================================== -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['organism.projectDetail.title']}
            </h2>

            ${projectDetail
              ? html`
                  <div class="flex justify-end">
                    <button
                      class="rounded-md bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                      ?disabled=${this.viewProjectState === 'loading'}
                      @click=${() => this.handleViewProjectClick()}
                    >
                      ${this.msg['action.viewProject']}
                    </button>
                  </div>
                  <dl
                    class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--text-primary-color,#0f172a)]"
                  >
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.projectId']}
                      </dt>
                      <dd class="text-sm">${projectDetail.projectId}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.name']}
                      </dt>
                      <dd class="text-sm">${projectDetail.name}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.clientId']}
                      </dt>
                      <dd class="text-sm">${projectDetail.clientId}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.status']}
                      </dt>
                      <dd class="text-sm">${projectDetail.status}</dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.siteAddress']}
                      </dt>
                      <dd class="text-sm">${projectDetail.siteAddress}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.budget']}
                      </dt>
                      <dd class="text-sm">$${projectDetail.budget}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.startDate']}
                      </dt>
                      <dd class="text-sm">${projectDetail.startDate}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.endDate']}
                      </dt>
                      <dd class="text-sm">${projectDetail.endDate}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.completedAt']}
                      </dt>
                      <dd class="text-sm">
                        ${projectDetail.completedAt || '—'}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.cancelledAt']}
                      </dt>
                      <dd class="text-sm">
                        ${projectDetail.cancelledAt || '—'}
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.cancellationReason']}
                      </dt>
                      <dd class="text-sm">
                        ${projectDetail.cancellationReason || '—'}
                      </dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.createdAt']}
                      </dt>
                      <dd class="text-sm">${projectDetail.createdAt}</dd>
                    </div>
                    <div>
                      <dt
                        class="text-xs font-medium text-[var(--text-primary-color,#64748b)]"
                      >
                        ${this.msg['field.project.updatedAt']}
                      </dt>
                      <dd class="text-sm">${projectDetail.updatedAt}</dd>
                    </div>
                  </dl>
                `
              : html`<p
                  class="text-sm text-[var(--text-primary-color,#64748b)] py-4 text-center"
                >
                  ${this.msg['intent.projectDetail.empty']}
                </p>`}
          </section>

          <!-- ====================================================== -->
          <!-- Section: Create Project                                 -->
          <!-- ====================================================== -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-6"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['organism.createProject.title']}
            </h2>

            <!-- Step 1: Project Identity -->
            <div class="space-y-3">
              <h3
                class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['intent.createProject.step1.title']}
              </h3>
              <div class="grid grid-cols-1 gap-3">
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.name']}</span
                  >
                  <input
                    type="text"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createProjectName}
                    @input=${(e: Event) => this.handleCreateProjectNameChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.clientId']}</span
                  >
                  <input
                    type="text"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createProjectClientId}
                    @input=${(e: Event) =>
                      this.handleCreateProjectClientIdChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.siteAddress']}</span
                  >
                  <textarea
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    rows="2"
                    .value=${this.createProjectSiteAddress}
                    @input=${(e: Event) =>
                      this.handleCreateProjectSiteAddressChange(e)}
                  ></textarea>
                </label>
              </div>
            </div>

            <!-- Step 2: Budget & Schedule -->
            <div class="space-y-3">
              <h3
                class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['intent.createProject.step2.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.budget']}</span
                  >
                  <input
                    type="number"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createProjectBudget}
                    @input=${(e: Event) =>
                      this.handleCreateProjectBudgetChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.startDate']}</span
                  >
                  <input
                    type="date"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createProjectStartDate}
                    @input=${(e: Event) =>
                      this.handleCreateProjectStartDateChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.endDate']}</span
                  >
                  <input
                    type="date"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createProjectEndDate}
                    @input=${(e: Event) =>
                      this.handleCreateProjectEndDateChange(e)}
                  />
                </label>
              </div>
            </div>

            <!-- Step 3: Activation -->
            <div class="space-y-3">
              <h3
                class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['intent.createProject.step3.title']}
              </h3>
              <div class="grid grid-cols-1 gap-3">
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.status']}</span
                  >
                  <select
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createProjectStatus}
                    @change=${(e: Event) =>
                      this.handleCreateProjectStatusChange(e)}
                  >
                    <option value=""></option>
                    ${STATUS_OPTIONS.map(
                      (opt) => html`<option value=${opt}>${opt}</option>`,
                    )}
                  </select>
                </label>
              </div>
              <div class="flex justify-end">
                <button
                  class="rounded-md bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                  ?disabled=${this.createProjectState === 'loading'}
                  @click=${() => this.handleCreateProjectClick()}
                >
                  ${this.msg['action.createProject']}
                </button>
              </div>
            </div>
          </section>

          <!-- ====================================================== -->
          <!-- Section: Update Project Status                          -->
          <!-- ====================================================== -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['organism.updateStatus.title']}
            </h2>

            <div class="space-y-3">
              <h3
                class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['intent.updateStatus.title']}
              </h3>
              <div class="grid grid-cols-1 gap-3">
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.projectId']}</span
                  >
                  <select
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectStatusProjectId}
                    @change=${(e: Event) =>
                      this.handleUpdateProjectStatusProjectIdChange(e)}
                  >
                    <option value=""></option>
                    ${dashboardItems.map(
                      (item: BuildFlowFsmViewDashboardOutputItem) => html`
                        <option value=${item.projectId}>
                          ${item.name} (${item.projectId})
                        </option>
                      `,
                    )}
                  </select>
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.status']}</span
                  >
                  <select
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectStatusStatus}
                    @change=${(e: Event) =>
                      this.handleUpdateProjectStatusStatusChange(e)}
                  >
                    <option value=""></option>
                    ${STATUS_OPTIONS.map(
                      (opt) => html`<option value=${opt}>${opt}</option>`,
                    )}
                  </select>
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.cancellationReason']}</span
                  >
                  <textarea
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    rows="2"
                    .value=${this.updateProjectStatusCancellationReason}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectStatusCancellationReasonChange(e)}
                  ></textarea>
                </label>
              </div>
              <div class="flex justify-end">
                <button
                  class="rounded-md bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                  ?disabled=${this.updateProjectStatusState === 'loading'}
                  @click=${() => this.handleUpdateProjectStatusClick()}
                >
                  ${this.msg['action.updateProjectStatus']}
                </button>
              </div>
            </div>
          </section>

          <!-- ====================================================== -->
          <!-- Section: Update Project Details                         -->
          <!-- ====================================================== -->
          <section
            class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]"
            >
              ${this.msg['organism.updateProject.title']}
            </h2>

            <div class="space-y-3">
              <h3
                class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]"
              >
                ${this.msg['intent.updateProject.title']}
              </h3>
              <input
                type="hidden"
                .value=${this.updateProjectProjectId}
              />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.projectId']}</span
                  >
                  <input
                    type="text"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectProjectId}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectProjectIdChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.name']}</span
                  >
                  <input
                    type="text"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectName}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectNameChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.clientId']}</span
                  >
                  <input
                    type="text"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectClientId}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectClientIdChange(e)}
                  />
                </label>
                <label class="block sm:col-span-2">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.siteAddress']}</span
                  >
                  <textarea
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    rows="2"
                    .value=${this.updateProjectSiteAddress}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectSiteAddressChange(e)}
                  ></textarea>
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.budget']}</span
                  >
                  <input
                    type="number"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectBudget}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectBudgetChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.startDate']}</span
                  >
                  <input
                    type="date"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectStartDate}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectStartDateChange(e)}
                  />
                </label>
                <label class="block">
                  <span
                    class="block text-xs font-medium text-[var(--text-primary-color,#64748b)] mb-1"
                    >${this.msg['field.project.endDate']}</span
                  >
                  <input
                    type="date"
                    class="w-full rounded-md border border-[var(--grey-color,#e2e8f0)] px-3 py-2 text-sm text-[var(--text-primary-color,#0f172a)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.updateProjectEndDate}
                    @input=${(e: Event) =>
                      this.handleUpdateProjectEndDateChange(e)}
                  />
                </label>
              </div>
              <div class="flex justify-end">
                <button
                  class="rounded-md bg-[var(--active-color,#1890FF)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                  ?disabled=${this.updateProjectState === 'loading'}
                  @click=${() => this.handleUpdateProjectClick()}
                >
                  ${this.msg['action.updateProject']}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
