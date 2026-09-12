/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/workTaskLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmWorkTaskLifecycleBase } from '/_102048_/l2/buildFlowFsm/web/shared/workTaskLifecycle.js';

@customElement('build-flow-fsm--web--desktop--page11--work-task-lifecycle-102048')
export class BuildFlowFsmDesktopPage11WorkTaskLifecyclePage extends BuildFlowFsmWorkTaskLifecycleBase {
  render() {
    type TaskRow = {
      workTaskId: string;
      title: string;
      status: string;
      assignedWorkerName: string;
      dueDate: string;
      budgetedCost: string;
      sequenceNumber: string;
    };

    const taskRows: TaskRow[] = [];
    if (this.OutputCreateTask) {
      taskRows.push({
        workTaskId: this.OutputCreateTask.workTaskId,
        title: this.OutputCreateTask.title,
        status: this.OutputCreateTask.status,
        assignedWorkerName: this.OutputCreateTask.assignedWorkerName,
        dueDate: this.OutputCreateTask.dueDate,
        budgetedCost: '—',
        sequenceNumber: '—',
      });
    }
    if (this.OutputAssignTask) {
      taskRows.push({
        workTaskId: this.OutputAssignTask.workTaskId,
        title: this.OutputAssignTask.title,
        status: this.OutputAssignTask.status,
        assignedWorkerName: this.OutputAssignTask.assignedWorkerName,
        dueDate: this.OutputAssignTask.dueDate,
        budgetedCost: '—',
        sequenceNumber: '—',
      });
    }
    if (this.OutputUpdateTask) {
      taskRows.push({
        workTaskId: this.OutputUpdateTask.workTaskId,
        title: this.OutputUpdateTask.title,
        status: this.OutputUpdateTask.status,
        assignedWorkerName: this.OutputUpdateTask.assignedWorkerName,
        dueDate: this.OutputUpdateTask.dueDate,
        budgetedCost: String(this.OutputUpdateTask.budgetedCost),
        sequenceNumber: String(this.OutputUpdateTask.sequenceNumber),
      });
    }

    const latestOutput = this.OutputUpdateTask ?? this.OutputAssignTask ?? this.OutputCreateTask ?? null;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#F9F9F9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['page.title']}
          </h1>

          <section class="space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]">
              ${this.msg['sec.task.planning.title']}
            </h2>

            <!-- Organism: Task List -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['org.task.list.title']}
              </h3>

              <!-- Intention: queryList -->
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['intention.query_tasks.title']}
                </h4>
                ${taskRows.length > 0
                  ? html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm text-[var(--text-primary-color,#403f3f)]">
                        <thead>
                          <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                            <th class="text-left py-2 px-3 font-medium">${this.msg['field.workTaskId']}</th>
                            <th class="text-left py-2 px-3 font-medium">${this.msg['field.title']}</th>
                            <th class="text-left py-2 px-3 font-medium">${this.msg['field.status']}</th>
                            <th class="text-left py-2 px-3 font-medium">${this.msg['field.assignedWorkerName']}</th>
                            <th class="text-left py-2 px-3 font-medium">${this.msg['field.dueDate']}</th>
                            <th class="text-left py-2 px-3 font-medium">${this.msg['field.budgetedCost']}</th>
                            <th class="text-left py-2 px-3 font-medium">${this.msg['field.sequenceNumber']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${taskRows.map((row: TaskRow) => html`
                            <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                              <td class="py-2 px-3">${row.workTaskId}</td>
                              <td class="py-2 px-3">${row.title}</td>
                              <td class="py-2 px-3">${row.status}</td>
                              <td class="py-2 px-3">${row.assignedWorkerName}</td>
                              <td class="py-2 px-3">${row.dueDate}</td>
                              <td class="py-2 px-3">${row.budgetedCost}</td>
                              <td class="py-2 px-3">${row.sequenceNumber}</td>
                            </tr>
                          `)}
                        </tbody>
                      </table>
                    </div>
                  `
                  : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">${this.msg['empty.task_list']}</p>`
                }
              </div>

              <!-- Intention: workflowStatus -->
              <div class="space-y-3 border-t border-[var(--grey-color,#E6E6E6)] pt-4">
                <h4 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['intention.task_workflow_status.title']}
                </h4>
                ${latestOutput
                  ? html`
                    <div class="flex flex-wrap gap-4 text-sm text-[var(--text-primary-color,#403f3f)]">
                      <div>
                        <span class="font-medium">${this.msg['field.status']}:</span>
                        <span class="ml-1">${latestOutput.status}</span>
                      </div>
                      <div>
                        <span class="font-medium">${this.msg['field.assignedWorkerName']}:</span>
                        <span class="ml-1">${latestOutput.assignedWorkerName}</span>
                      </div>
                      <div>
                        <span class="font-medium">${this.msg['field.dueDate']}:</span>
                        <span class="ml-1">${latestOutput.dueDate}</span>
                      </div>
                    </div>
                  `
                  : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">${this.msg['empty.workflow_status']}</p>`
                }
              </div>
            </div>

            <!-- Organism: Create Task -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['org.create.task.title']}
              </h3>
              <form class="space-y-3" @submit="${this.handleCreateTaskClick}">
                <input type="hidden" .value="${this.createTaskProjectId}" />
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.title']} *</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.createTaskTitle}" @input="${this.handleCreateTaskTitleChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.description']} *</label>
                  <textarea class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" rows="3" .value="${this.createTaskDescription}" @input="${this.handleCreateTaskDescriptionChange}"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.dueDate']} *</label>
                  <input type="date" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.createTaskDueDate}" @input="${this.handleCreateTaskDueDateChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.assignedWorkerId']}</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.createTaskAssignedWorkerId}" @input="${this.handleCreateTaskAssignedWorkerIdChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.assignedWorkerName']}</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.createTaskAssignedWorkerName}" @input="${this.handleCreateTaskAssignedWorkerNameChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.budgetedCost']}</label>
                  <input type="number" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.createTaskBudgetedCost}" @input="${this.handleCreateTaskBudgetedCostChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.sequenceNumber']}</label>
                  <input type="number" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.createTaskSequenceNumber}" @input="${this.handleCreateTaskSequenceNumberChange}" />
                </div>
                <div class="flex items-center gap-3">
                  <button type="submit" class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--text-secondary-color,#1C91CD)] hover:bg-[var(--text-secondary-color-hover,#2a9edb)] disabled:opacity-50" ?disabled="${this.createTaskState === 'loading'}">
                    ${this.createTaskState === 'loading' ? '...' : this.msg['action.createTask']}
                  </button>
                  ${this.createTaskState === 'success' ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>` : null}
                  ${this.createTaskState === 'error' ? html`<span class="text-sm text-[var(--error-color,#FF4D4F)]">✗</span>` : null}
                </div>
              </form>
            </div>

            <!-- Organism: Assign Task -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['org.assign.task.title']}
              </h3>
              <form class="space-y-3" @submit="${this.handleAssignTaskClick}">
                <input type="hidden" .value="${this.assignTaskWorkTaskId}" />
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.assignedWorkerId']} *</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.assignTaskAssignedWorkerId}" @input="${this.handleAssignTaskAssignedWorkerIdChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.assignedWorkerName']} *</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.assignTaskAssignedWorkerName}" @input="${this.handleAssignTaskAssignedWorkerNameChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.dueDate']} *</label>
                  <input type="date" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.assignTaskDueDate}" @input="${this.handleAssignTaskDueDateChange}" />
                </div>
                <div class="flex items-center gap-3">
                  <button type="submit" class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--text-secondary-color,#1C91CD)] hover:bg-[var(--text-secondary-color-hover,#2a9edb)] disabled:opacity-50" ?disabled="${this.assignTaskState === 'loading'}">
                    ${this.assignTaskState === 'loading' ? '...' : this.msg['action.assignTask']}
                  </button>
                  ${this.assignTaskState === 'success' ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>` : null}
                  ${this.assignTaskState === 'error' ? html`<span class="text-sm text-[var(--error-color,#FF4D4F)]">✗</span>` : null}
                </div>
              </form>
            </div>

            <!-- Organism: Update Task -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['org.update.task.title']}
              </h3>
              <form class="space-y-3" @submit="${this.handleUpdateTaskClick}">
                <input type="hidden" .value="${this.updateTaskWorkTaskId}" />
                <input type="hidden" .value="${this.updateTaskProjectId}" />
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.title']} *</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.updateTaskTitle}" @input="${this.handleUpdateTaskTitleChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.description']} *</label>
                  <textarea class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" rows="3" .value="${this.updateTaskDescription}" @input="${this.handleUpdateTaskDescriptionChange}"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.assignedWorkerId']}</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.updateTaskAssignedWorkerId}" @input="${this.handleUpdateTaskAssignedWorkerIdChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.assignedWorkerName']}</label>
                  <input type="text" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.updateTaskAssignedWorkerName}" @input="${this.handleUpdateTaskAssignedWorkerNameChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.dueDate']} *</label>
                  <input type="date" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.updateTaskDueDate}" @input="${this.handleUpdateTaskDueDateChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.budgetedCost']}</label>
                  <input type="number" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.updateTaskBudgetedCost}" @input="${this.handleUpdateTaskBudgetedCostChange}" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--text-primary-color,#403f3f)] mb-1">${this.msg['field.sequenceNumber']}</label>
                  <input type="number" class="w-full rounded border border-[var(--grey-color,#E6E6E6)] px-3 py-2 text-sm text-[var(--text-primary-color,#403f3f)] bg-[var(--bg-primary-color,#ffffff)]" .value="${this.updateTaskSequenceNumber}" @input="${this.handleUpdateTaskSequenceNumberChange}" />
                </div>
                <div class="flex items-center gap-3">
                  <button type="submit" class="rounded px-4 py-2 text-sm font-medium text-[var(--bg-primary-color,#ffffff)] bg-[var(--text-secondary-color,#1C91CD)] hover:bg-[var(--text-secondary-color-hover,#2a9edb)] disabled:opacity-50" ?disabled="${this.updateTaskState === 'loading'}">
                    ${this.updateTaskState === 'loading' ? '...' : this.msg['action.updateTask']}
                  </button>
                  ${this.updateTaskState === 'success' ? html`<span class="text-sm text-[var(--success-color,#52C41A)]">✓</span>` : null}
                  ${this.updateTaskState === 'error' ? html`<span class="text-sm text-[var(--error-color,#FF4D4F)]">✗</span>` : null}
                </div>
              </form>
            </div>

            <!-- Organism: Task Review -->
            <div class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-4 space-y-4">
              <h3 class="text-base font-medium text-[var(--text-primary-color,#403f3f)]">
                ${this.msg['org.task.review.title']}
              </h3>
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-[var(--text-primary-color,#403f3f)]">
                  ${this.msg['intention.review_summary.title']}
                </h4>
                ${this.OutputUpdateTask
                  ? html`
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-primary-color,#403f3f)]">
                      <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] pb-2">
                        <span class="font-medium">${this.msg['field.title']}</span>
                        <span>${this.OutputUpdateTask.title}</span>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] pb-2">
                        <span class="font-medium">${this.msg['field.status']}</span>
                        <span>${this.OutputUpdateTask.status}</span>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] pb-2">
                        <span class="font-medium">${this.msg['field.assignedWorkerName']}</span>
                        <span>${this.OutputUpdateTask.assignedWorkerName}</span>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] pb-2">
                        <span class="font-medium">${this.msg['field.dueDate']}</span>
                        <span>${this.OutputUpdateTask.dueDate}</span>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] pb-2">
                        <span class="font-medium">${this.msg['field.sequenceNumber']}</span>
                        <span>${this.OutputUpdateTask.sequenceNumber}</span>
                      </div>
                      <div class="flex justify-between border-b border-[var(--grey-color,#E6E6E6)] pb-2">
                        <span class="font-medium">${this.msg['field.budgetedCost']}</span>
                        <span>${this.OutputUpdateTask.budgetedCost}</span>
                      </div>
                    </div>
                  `
                  : html`<p class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic">${this.msg['empty.review_summary']}</p>`
                }
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
