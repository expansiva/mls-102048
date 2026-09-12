/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/fieldWorkerWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmFieldWorkerWorkspaceBase } from '/_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.js';

@customElement('build-flow-fsm--web--desktop--page11--field-worker-workspace-102048')
export class BuildFlowFsmDesktopPage11FieldWorkerWorkspacePage extends BuildFlowFsmFieldWorkerWorkspaceBase {
  render() {
    const items = this.browseTasksData?.items ?? [];
    const inProgressCount = items.filter((i) => i.status === 'inProgress').length;
    const completedCount = items.filter((i) => i.status === 'completed').length;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['fieldWorkerWorkspace.section.main.title']}
          </h1>

          <!-- Browse Tasks: Query List + Summary -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h2
                class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
              >
                ${this.msg['fieldWorkerWorkspace.organism.browseTasks.title']}
              </h2>
              <button
                class="px-3 py-1.5 rounded text-sm font-medium text-[var(--text-primary-color,#403f3f)] border border-[var(--grey-color,#e6e6e6)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)] disabled:opacity-50"
                ?disabled=${this.browseTasksState === 'loading'}
                @click=${(e: Event) => this.handleBrowseTasksClick(e)}
              >
                ${this.msg['fieldWorkerWorkspace.action.refreshTasks.label']}
              </button>
            </div>

            <!-- Task Board -->
            <div>
              <h3
                class="text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-2"
              >
                ${this.msg['fieldWorkerWorkspace.intent.tasksBoard.title']}
              </h3>
              ${items.length === 0
                ? html`<p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] py-4"
                  >
                    —
                  </p>`
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm border-collapse">
                        <thead>
                          <tr class="border-b border-[var(--grey-color,#e6e6e6)]">
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.title.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.description.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.status.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.dueDate.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.assignedWorkerName.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.sequenceNumber.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.startedAt.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.field.completedAt.label']}
                            </th>
                            <th
                              class="text-left py-2 px-2 font-medium text-[var(--text-primary-color,#403f3f)]"
                            >
                              ${this.msg['fieldWorkerWorkspace.action.updateStatus.label']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${items.map(
                            (item) => html`
                              <tr class="border-b border-[var(--grey-color,#e6e6e6)]">
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.title}
                                </td>
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color-lighter,#535353)]"
                                >
                                  ${item.description}
                                </td>
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.status}
                                </td>
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.dueDate}
                                </td>
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.assignedWorkerName}
                                </td>
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color,#403f3f)]"
                                >
                                  ${item.sequenceNumber}
                                </td>
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color-lighter,#535353)]"
                                >
                                  ${item.startedAt}
                                </td>
                                <td
                                  class="py-2 px-2 text-[var(--text-primary-color-lighter,#535353)]"
                                >
                                  ${item.completedAt}
                                </td>
                                <td class="py-2 px-2 space-x-1 whitespace-nowrap">
                                  <button
                                    class="text-xs px-2 py-1 rounded border border-[var(--grey-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]"
                                    @click=${() =>
                                      this.setUpdateTaskStatusWorkTaskId(
                                        item.workTaskId
                                      )}
                                  >
                                    ${this.msg['fieldWorkerWorkspace.action.updateStatus.label']}
                                  </button>
                                  <button
                                    class="text-xs px-2 py-1 rounded border border-[var(--grey-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]"
                                    @click=${() =>
                                      this.setCreateTimeLogWorkTaskId(
                                        item.workTaskId
                                      )}
                                  >
                                    ${this.msg['fieldWorkerWorkspace.action.logTime.label']}
                                  </button>
                                  <button
                                    class="text-xs px-2 py-1 rounded border border-[var(--grey-color,#e6e6e6)] text-[var(--text-primary-color,#403f3f)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]"
                                    @click=${() =>
                                      this.setCreateMaterialUsageProjectId(
                                        item.projectId
                                      )}
                                  >
                                    ${this.msg['fieldWorkerWorkspace.action.logMaterial.label']}
                                  </button>
                                </td>
                              </tr>
                            `
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
            </div>

            <!-- Task Summary -->
            <div class="flex gap-4 pt-2">
              <div
                class="flex-1 rounded bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3"
              >
                <span
                  class="text-sm text-[var(--text-primary-color-lighter,#535353)]"
                  >${this.msg['fieldWorkerWorkspace.summary.inProgress.label']}</span
                >
                <span
                  class="block text-xl font-bold text-[var(--text-primary-color,#403f3f)]"
                  >${inProgressCount}</span
                >
              </div>
              <div
                class="flex-1 rounded bg-[var(--bg-secondary-color-lighter,#f9f9f9)] p-3"
              >
                <span
                  class="text-sm text-[var(--text-primary-color-lighter,#535353)]"
                  >${this.msg['fieldWorkerWorkspace.summary.completed.label']}</span
                >
                <span
                  class="block text-xl font-bold text-[var(--text-primary-color,#403f3f)]"
                  >${completedCount}</span
                >
              </div>
            </div>
          </section>

          <!-- Update Task Status Form -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['fieldWorkerWorkspace.organism.updateTaskStatus.title']}
            </h2>
            <form class="space-y-3" @submit=${(e: Event) => e.preventDefault()}>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.workTaskId.label']}
                </label>
                <select
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.updateTaskStatusWorkTaskId}
                  @change=${(e: Event) =>
                    this.handleUpdateTaskStatusWorkTaskIdChange(e)}
                >
                  <option value="">—</option>
                  ${items.map(
                    (item) => html`
                      <option
                        value=${item.workTaskId}
                        ?selected=${item.workTaskId ===
                        this.updateTaskStatusWorkTaskId}
                      >
                        ${item.title}
                      </option>
                    `
                  )}
                </select>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.status.label']}
                </label>
                <select
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.updateTaskStatusStatus}
                  @change=${(e: Event) =>
                    this.handleUpdateTaskStatusStatusChange(e)}
                >
                  <option value="">—</option>
                  <option
                    value="inProgress"
                    ?selected=${this.updateTaskStatusStatus === 'inProgress'}
                  >
                    inProgress
                  </option>
                  <option
                    value="completed"
                    ?selected=${this.updateTaskStatusStatus === 'completed'}
                  >
                    completed
                  </option>
                </select>
              </div>
              <button
                type="submit"
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${this.updateTaskStatusState === 'loading' ||
                !this.updateTaskStatusWorkTaskId ||
                !this.updateTaskStatusStatus}
                @click=${(e: Event) => this.handleUpdateTaskStatusClick(e)}
              >
                ${this.msg['fieldWorkerWorkspace.action.updateStatus.label']}
              </button>
            </form>
          </section>

          <!-- Create Time Log Form -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['fieldWorkerWorkspace.organism.createTimeLog.title']}
            </h2>
            <form class="space-y-3" @submit=${(e: Event) => e.preventDefault()}>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.workTaskId.label']}
                </label>
                <select
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.createTimeLogWorkTaskId}
                  @change=${(e: Event) =>
                    this.handleCreateTimeLogWorkTaskIdChange(e)}
                >
                  <option value="">—</option>
                  ${items.map(
                    (item) => html`
                      <option
                        value=${item.workTaskId}
                        ?selected=${item.workTaskId ===
                        this.createTimeLogWorkTaskId}
                      >
                        ${item.title}
                      </option>
                    `
                  )}
                </select>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.logDate.label']}
                </label>
                <input
                  type="date"
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.createTimeLogLogDate}
                  @input=${(e: Event) => this.handleCreateTimeLogLogDateChange(e)}
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.hours.label']}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.createTimeLogHours}
                  @input=${(e: Event) => this.handleCreateTimeLogHoursChange(e)}
                />
              </div>
              <button
                type="submit"
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${this.createTimeLogState === 'loading' ||
                !this.createTimeLogWorkTaskId ||
                !this.createTimeLogLogDate ||
                !this.createTimeLogHours}
                @click=${(e: Event) => this.handleCreateTimeLogClick(e)}
              >
                ${this.msg['fieldWorkerWorkspace.action.createTimeLog.label']}
              </button>
            </form>
          </section>

          <!-- Create Material Usage Form -->
          <section
            class="rounded-lg bg-[var(--bg-primary-color,#ffffff)] border border-[var(--grey-color,#e6e6e6)] p-4 space-y-4"
          >
            <h2
              class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
            >
              ${this.msg['fieldWorkerWorkspace.organism.createMaterialUsage.title']}
            </h2>
            <form class="space-y-3" @submit=${(e: Event) => e.preventDefault()}>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.projectId.label']}
                </label>
                <div
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--bg-secondary-color-lighter,#f9f9f9)] border border-[var(--grey-color,#e6e6e6)] text-sm text-[var(--text-primary-color,#403f3f)]"
                >
                  <span>${this.createMaterialUsageProjectId || '—'}</span>
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.materialName.label']}
                </label>
                <input
                  type="text"
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.createMaterialUsageMaterialName}
                  @input=${(e: Event) =>
                    this.handleCreateMaterialUsageMaterialNameChange(e)}
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label
                    class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['fieldWorkerWorkspace.field.quantity.label']}
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createMaterialUsageQuantity}
                    @input=${(e: Event) =>
                      this.handleCreateMaterialUsageQuantityChange(e)}
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['fieldWorkerWorkspace.field.unit.label']}
                  </label>
                  <select
                    class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createMaterialUsageUnit}
                    @change=${(e: Event) =>
                      this.handleCreateMaterialUsageUnitChange(e)}
                  >
                    <option value="">—</option>
                    <option
                      value="kg"
                      ?selected=${this.createMaterialUsageUnit === 'kg'}
                    >
                      kg
                    </option>
                    <option
                      value="liter"
                      ?selected=${this.createMaterialUsageUnit === 'liter'}
                    >
                      liter
                    </option>
                    <option
                      value="meter"
                      ?selected=${this.createMaterialUsageUnit === 'meter'}
                    >
                      meter
                    </option>
                    <option
                      value="portion"
                      ?selected=${this.createMaterialUsageUnit === 'portion'}
                    >
                      portion
                    </option>
                    <option
                      value="unit"
                      ?selected=${this.createMaterialUsageUnit === 'unit'}
                    >
                      unit
                    </option>
                    <option
                      value="bag"
                      ?selected=${this.createMaterialUsageUnit === 'bag'}
                    >
                      bag
                    </option>
                    <option
                      value="box"
                      ?selected=${this.createMaterialUsageUnit === 'box'}
                    >
                      box
                    </option>
                    <option
                      value="roll"
                      ?selected=${this.createMaterialUsageUnit === 'roll'}
                    >
                      roll
                    </option>
                    <option
                      value="sheet"
                      ?selected=${this.createMaterialUsageUnit === 'sheet'}
                    >
                      sheet
                    </option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label
                    class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['fieldWorkerWorkspace.field.unitCost.label']}
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createMaterialUsageUnitCost}
                    @input=${(e: Event) =>
                      this.handleCreateMaterialUsageUnitCostChange(e)}
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                  >
                    ${this.msg['fieldWorkerWorkspace.field.totalCost.label']}
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                    .value=${this.createMaterialUsageTotalCost}
                    @input=${(e: Event) =>
                      this.handleCreateMaterialUsageTotalCostChange(e)}
                  />
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1"
                >
                  ${this.msg['fieldWorkerWorkspace.field.usageDate.label']}
                </label>
                <input
                  type="date"
                  class="w-full rounded border border-[var(--grey-color,#e6e6e6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]"
                  .value=${this.createMaterialUsageUsageDate}
                  @input=${(e: Event) =>
                    this.handleCreateMaterialUsageUsageDateChange(e)}
                />
              </div>
              <button
                type="submit"
                class="px-4 py-2 rounded text-sm font-medium text-white bg-[var(--active-color,#1890ff)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                ?disabled=${this.createMaterialUsageState === 'loading' ||
                !this.createMaterialUsageProjectId ||
                !this.createMaterialUsageMaterialName ||
                !this.createMaterialUsageQuantity ||
                !this.createMaterialUsageUnit ||
                !this.createMaterialUsageUnitCost ||
                !this.createMaterialUsageTotalCost ||
                !this.createMaterialUsageUsageDate}
                @click=${(e: Event) => this.handleCreateMaterialUsageClick(e)}
              >
                ${this.msg['fieldWorkerWorkspace.action.createMaterialUsage.label']}
              </button>
            </form>
          </section>
        </div>
      </div>
    `;
  }
}
