/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/workTaskLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmCreateTaskInput,
  BuildFlowFsmCreateTaskOutput,
  BuildFlowFsmAssignTaskInput,
  BuildFlowFsmAssignTaskOutput,
  BuildFlowFsmUpdateTaskInput,
  BuildFlowFsmUpdateTaskOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.js';

/// **collab_i18n_start**
const message_en = {
  "page.title": "Task Planning & Assignment",
  "section.task_planning": "Task Planning & Assignment",
  "organism.task_list": "Task List",
  "organism.create_task": "Create Task",
  "organism.assign_task": "Assign Task",
  "organism.update_task": "Update Task",
  "organism.task_review": "Task Review",
  "intention.query_tasks.title": "Work Tasks",
  "intention.task_workflow_status.title": "Task Status",
  "intention.create_task_form.title": "Create a Work Task",
  "intention.assign_task_form.title": "Assign Worker & Due Date",
  "intention.update_task_form.title": "Edit Task Details",
  "intention.review_summary.title": "Timeline & Delay Risk Review",
  "field.workTaskId": "Task ID",
  "field.title": "Title",
  "field.description": "Description",
  "field.dueDate": "Due Date",
  "field.assignedWorkerId": "Assigned Worker",
  "field.assignedWorkerName": "Worker Name",
  "field.budgetedCost": "Budgeted Cost",
  "field.sequenceNumber": "Sequence",
  "field.projectId": "Project",
  "field.status": "Status",
  "filter.status": "Filter by Status",
  "action.createTask": "Create Task",
  "action.assignTask": "Assign Task",
  "action.updateTask": "Update Task",
  "empty.task_list": "No work tasks found for this project.",
  "empty.workflow_status": "Select a task to view its lifecycle status.",
  "empty.review_summary": "No tasks available for timeline review.",
  "sec.task.planning.title": "Sec task planning",
  "org.task.list.title": "View existing work tasks for the project and select one for assignment or update",
  "org.create.task.title": "Create a new work task with title, description, and due date within the project date range",
  "org.assign.task.title": "Assign a field worker and set a due date on a selected draft or existing task",
  "org.update.task.title": "Edit task details, reassign worker, or adjust due date and budget",
  "org.task.review.title": "Review the simplified task timeline, delay risk suggestions, and overall project progress"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmWorkTaskLifecycleBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) createTaskState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String }) createTaskTitle: string = '';
  @property({ type: String }) createTaskDescription: string = '';
  @property({ type: String }) createTaskDueDate: string = '';
  @property({ type: String }) createTaskAssignedWorkerId: string = '';
  @property({ type: String }) createTaskAssignedWorkerName: string = '';
  @property({ type: String }) createTaskBudgetedCost: string = '';
  @property({ type: String }) createTaskSequenceNumber: string = '';
  @property({ type: String }) createTaskProjectId: string = '';

  @property({ type: String }) assignTaskState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String }) assignTaskWorkTaskId: string = '';
  @property({ type: String }) assignTaskAssignedWorkerId: string = '';
  @property({ type: String }) assignTaskAssignedWorkerName: string = '';
  @property({ type: String }) assignTaskDueDate: string = '';

  @property({ type: String }) updateTaskState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property({ type: String }) updateTaskWorkTaskId: string = '';
  @property({ type: String }) updateTaskProjectId: string = '';
  @property({ type: String }) updateTaskTitle: string = '';
  @property({ type: String }) updateTaskDescription: string = '';
  @property({ type: String }) updateTaskAssignedWorkerId: string = '';
  @property({ type: String }) updateTaskAssignedWorkerName: string = '';
  @property({ type: String }) updateTaskDueDate: string = '';
  @property({ type: String }) updateTaskBudgetedCost: string = '';
  @property({ type: String }) updateTaskSequenceNumber: string = '';

  @property({ type: Object }) OutputCreateTask: BuildFlowFsmCreateTaskOutput | null = null;
  @property({ type: Object }) OutputAssignTask: BuildFlowFsmAssignTaskOutput | null = null;
  @property({ type: Object }) OutputUpdateTask: BuildFlowFsmUpdateTaskOutput | null = null;

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  // ── Route param parsing ──────────────────────────────────────────

  private parseRouteParams(): { projectId?: string; workTaskId?: string } {
    const pattern = '/buildFlowFsm/workTaskLifecycle/:projectId?/:workTaskId?';
    const patternParts = pattern.split('/').filter((p) => p.length > 0);
    const pathParts = window.location.pathname.split('/').filter((p) => p.length > 0);

    const result: { projectId?: string; workTaskId?: string } = {};

    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':')) {
        const paramName = part.replace(/[:?]/g, '');
        const value = pathParts[i] ? decodeURIComponent(pathParts[i]) : '';
        if (value) {
          if (paramName === 'projectId') result.projectId = value;
          if (paramName === 'workTaskId') result.workTaskId = value;
        }
      }
    }

    return result;
  }

  // ── State setters: createTask ────────────────────────────────────

  setCreateTaskTitle(value: string): void {
    this.createTaskTitle = value;
    setState('ui.workTaskLifecycle.input.createTask.title', value);
    this.requestUpdate();
  }

  handleCreateTaskTitleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskTitle(target.value);
  }

  setCreateTaskDescription(value: string): void {
    this.createTaskDescription = value;
    setState('ui.workTaskLifecycle.input.createTask.description', value);
    this.requestUpdate();
  }

  handleCreateTaskDescriptionChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskDescription(target.value);
  }

  setCreateTaskDueDate(value: string): void {
    this.createTaskDueDate = value;
    setState('ui.workTaskLifecycle.input.createTask.dueDate', value);
    this.requestUpdate();
  }

  handleCreateTaskDueDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskDueDate(target.value);
  }

  setCreateTaskAssignedWorkerId(value: string): void {
    this.createTaskAssignedWorkerId = value;
    setState('ui.workTaskLifecycle.input.createTask.assignedWorkerId', value);
    this.requestUpdate();
  }

  handleCreateTaskAssignedWorkerIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskAssignedWorkerId(target.value);
  }

  setCreateTaskAssignedWorkerName(value: string): void {
    this.createTaskAssignedWorkerName = value;
    setState('ui.workTaskLifecycle.input.createTask.assignedWorkerName', value);
    this.requestUpdate();
  }

  handleCreateTaskAssignedWorkerNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskAssignedWorkerName(target.value);
  }

  setCreateTaskBudgetedCost(value: string): void {
    this.createTaskBudgetedCost = value;
    setState('ui.workTaskLifecycle.input.createTask.budgetedCost', value);
    this.requestUpdate();
  }

  handleCreateTaskBudgetedCostChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskBudgetedCost(target.value);
  }

  setCreateTaskSequenceNumber(value: string): void {
    this.createTaskSequenceNumber = value;
    setState('ui.workTaskLifecycle.input.createTask.sequenceNumber', value);
    this.requestUpdate();
  }

  handleCreateTaskSequenceNumberChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskSequenceNumber(target.value);
  }

  setCreateTaskProjectId(value: string): void {
    this.createTaskProjectId = value;
    setState('ui.workTaskLifecycle.input.createTask.projectId', value);
    this.requestUpdate();
  }

  handleCreateTaskProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateTaskProjectId(target.value);
  }

  // ── State setters: assignTask ────────────────────────────────────

  setAssignTaskWorkTaskId(value: string): void {
    this.assignTaskWorkTaskId = value;
    setState('ui.workTaskLifecycle.input.assignTask.workTaskId', value);
    this.requestUpdate();
  }

  handleAssignTaskWorkTaskIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setAssignTaskWorkTaskId(target.value);
  }

  setAssignTaskAssignedWorkerId(value: string): void {
    this.assignTaskAssignedWorkerId = value;
    setState('ui.workTaskLifecycle.input.assignTask.assignedWorkerId', value);
    this.requestUpdate();
  }

  handleAssignTaskAssignedWorkerIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setAssignTaskAssignedWorkerId(target.value);
  }

  setAssignTaskAssignedWorkerName(value: string): void {
    this.assignTaskAssignedWorkerName = value;
    setState('ui.workTaskLifecycle.input.assignTask.assignedWorkerName', value);
    this.requestUpdate();
  }

  handleAssignTaskAssignedWorkerNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setAssignTaskAssignedWorkerName(target.value);
  }

  setAssignTaskDueDate(value: string): void {
    this.assignTaskDueDate = value;
    setState('ui.workTaskLifecycle.input.assignTask.dueDate', value);
    this.requestUpdate();
  }

  handleAssignTaskDueDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setAssignTaskDueDate(target.value);
  }

  // ── State setters: updateTask ────────────────────────────────────

  setUpdateTaskWorkTaskId(value: string): void {
    this.updateTaskWorkTaskId = value;
    setState('ui.workTaskLifecycle.input.updateTask.workTaskId', value);
    this.requestUpdate();
  }

  handleUpdateTaskWorkTaskIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskWorkTaskId(target.value);
  }

  setUpdateTaskProjectId(value: string): void {
    this.updateTaskProjectId = value;
    setState('ui.workTaskLifecycle.input.updateTask.projectId', value);
    this.requestUpdate();
  }

  handleUpdateTaskProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskProjectId(target.value);
  }

  setUpdateTaskTitle(value: string): void {
    this.updateTaskTitle = value;
    setState('ui.workTaskLifecycle.input.updateTask.title', value);
    this.requestUpdate();
  }

  handleUpdateTaskTitleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskTitle(target.value);
  }

  setUpdateTaskDescription(value: string): void {
    this.updateTaskDescription = value;
    setState('ui.workTaskLifecycle.input.updateTask.description', value);
    this.requestUpdate();
  }

  handleUpdateTaskDescriptionChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskDescription(target.value);
  }

  setUpdateTaskAssignedWorkerId(value: string): void {
    this.updateTaskAssignedWorkerId = value;
    setState('ui.workTaskLifecycle.input.updateTask.assignedWorkerId', value);
    this.requestUpdate();
  }

  handleUpdateTaskAssignedWorkerIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskAssignedWorkerId(target.value);
  }

  setUpdateTaskAssignedWorkerName(value: string): void {
    this.updateTaskAssignedWorkerName = value;
    setState('ui.workTaskLifecycle.input.updateTask.assignedWorkerName', value);
    this.requestUpdate();
  }

  handleUpdateTaskAssignedWorkerNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskAssignedWorkerName(target.value);
  }

  setUpdateTaskDueDate(value: string): void {
    this.updateTaskDueDate = value;
    setState('ui.workTaskLifecycle.input.updateTask.dueDate', value);
    this.requestUpdate();
  }

  handleUpdateTaskDueDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskDueDate(target.value);
  }

  setUpdateTaskBudgetedCost(value: string): void {
    this.updateTaskBudgetedCost = value;
    setState('ui.workTaskLifecycle.input.updateTask.budgetedCost', value);
    this.requestUpdate();
  }

  handleUpdateTaskBudgetedCostChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskBudgetedCost(target.value);
  }

  setUpdateTaskSequenceNumber(value: string): void {
    this.updateTaskSequenceNumber = value;
    setState('ui.workTaskLifecycle.input.updateTask.sequenceNumber', value);
    this.requestUpdate();
  }

  handleUpdateTaskSequenceNumberChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateTaskSequenceNumber(target.value);
  }

  // ── Command: createTask ──────────────────────────────────────────

  async createTask(): Promise<void> {
    // Parse route params for projectId
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId && !this.createTaskProjectId) {
      this.setCreateTaskProjectId(routeParams.projectId);
    }

    // Required route param check
    if (!this.createTaskProjectId) {
      this.createTaskState = 'idle';
      setState('ui.workTaskLifecycle.action.createTask.status', 'idle');
      this.OutputCreateTask = null;
      setState('ui.workTaskLifecycle.output.createTask', null);
      this.requestUpdate();
      return;
    }

    this.createTaskState = 'loading';
    setState('ui.workTaskLifecycle.action.createTask.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmCreateTaskInput = {
      title: this.createTaskTitle,
      description: this.createTaskDescription,
      dueDate: this.createTaskDueDate,
      projectId: this.createTaskProjectId,
    };

    if (this.createTaskAssignedWorkerId) {
      params.assignedWorkerId = this.createTaskAssignedWorkerId;
    }
    if (this.createTaskAssignedWorkerName) {
      params.assignedWorkerName = this.createTaskAssignedWorkerName;
    }
    if (this.createTaskBudgetedCost) {
      const parsed = parseFloat(this.createTaskBudgetedCost);
      if (!isNaN(parsed)) {
        params.budgetedCost = parsed;
      }
    }
    if (this.createTaskSequenceNumber) {
      const parsed = parseInt(this.createTaskSequenceNumber, 10);
      if (!isNaN(parsed)) {
        params.sequenceNumber = parsed;
      }
    }

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<BuildFlowFsmCreateTaskOutput>(
      'buildFlowFsm.workTaskLifecycle.createTask',
      params,
      options,
    );

    if (response.ok) {
      const output = response.data ?? null;
      this.OutputCreateTask = output;
      setState('ui.workTaskLifecycle.output.createTask', output);
      this.createTaskState = 'success';
      setState('ui.workTaskLifecycle.action.createTask.status', 'success');
    } else {
      this.OutputCreateTask = null;
      setState('ui.workTaskLifecycle.output.createTask', null);
      this.createTaskState = 'error';
      setState('ui.workTaskLifecycle.action.createTask.status', 'error');
      if (response.error) {
        console.error('[createTask] BFF error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleCreateTaskClick(e: Event): void {
    e.preventDefault();
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createTask();
    }, { mode: 'blocking' });
  }

  // ── Command: assignTask ──────────────────────────────────────────

  async assignTask(): Promise<void> {
    // selectedEntityInputStateKeys: assignTask.workTaskId — comes from selection context
    if (!this.assignTaskWorkTaskId) {
      this.assignTaskState = 'idle';
      setState('ui.workTaskLifecycle.action.assignTask.status', 'idle');
      this.OutputAssignTask = null;
      setState('ui.workTaskLifecycle.output.assignTask', null);
      this.requestUpdate();
      return;
    }

    this.assignTaskState = 'loading';
    setState('ui.workTaskLifecycle.action.assignTask.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmAssignTaskInput = {
      workTaskId: this.assignTaskWorkTaskId,
      assignedWorkerId: this.assignTaskAssignedWorkerId,
      assignedWorkerName: this.assignTaskAssignedWorkerName,
      dueDate: this.assignTaskDueDate,
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<BuildFlowFsmAssignTaskOutput>(
      'buildFlowFsm.workTaskLifecycle.assignTask',
      params,
      options,
    );

    if (response.ok) {
      const output = response.data ?? null;
      this.OutputAssignTask = output;
      setState('ui.workTaskLifecycle.output.assignTask', output);
      this.assignTaskState = 'success';
      setState('ui.workTaskLifecycle.action.assignTask.status', 'success');
    } else {
      this.OutputAssignTask = null;
      setState('ui.workTaskLifecycle.output.assignTask', null);
      this.assignTaskState = 'error';
      setState('ui.workTaskLifecycle.action.assignTask.status', 'error');
      if (response.error) {
        console.error('[assignTask] BFF error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleAssignTaskClick(e: Event): void {
    e.preventDefault();
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.assignTask();
    }, { mode: 'blocking' });
  }

  // ── Command: updateTask ──────────────────────────────────────────

  async updateTask(): Promise<void> {
    // Parse route params for workTaskId
    const routeParams = this.parseRouteParams();
    if (routeParams.workTaskId && !this.updateTaskWorkTaskId) {
      this.setUpdateTaskWorkTaskId(routeParams.workTaskId);
    }

    // Required route param check
    if (!this.updateTaskWorkTaskId) {
      this.updateTaskState = 'idle';
      setState('ui.workTaskLifecycle.action.updateTask.status', 'idle');
      this.OutputUpdateTask = null;
      setState('ui.workTaskLifecycle.output.updateTask', null);
      this.requestUpdate();
      return;
    }

    this.updateTaskState = 'loading';
    setState('ui.workTaskLifecycle.action.updateTask.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmUpdateTaskInput = {
      workTaskId: this.updateTaskWorkTaskId,
      projectId: this.updateTaskProjectId,
      title: this.updateTaskTitle,
      description: this.updateTaskDescription,
      dueDate: this.updateTaskDueDate,
    };

    if (this.updateTaskAssignedWorkerId) {
      params.assignedWorkerId = this.updateTaskAssignedWorkerId;
    }
    if (this.updateTaskAssignedWorkerName) {
      params.assignedWorkerName = this.updateTaskAssignedWorkerName;
    }
    if (this.updateTaskBudgetedCost) {
      const parsed = parseFloat(this.updateTaskBudgetedCost);
      if (!isNaN(parsed)) {
        params.budgetedCost = parsed;
      }
    }
    if (this.updateTaskSequenceNumber) {
      const parsed = parseInt(this.updateTaskSequenceNumber, 10);
      if (!isNaN(parsed)) {
        params.sequenceNumber = parsed;
      }
    }

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<BuildFlowFsmUpdateTaskOutput>(
      'buildFlowFsm.updateTask.updateTask',
      params,
      options,
    );

    if (response.ok) {
      const output = response.data ?? null;
      this.OutputUpdateTask = output;
      setState('ui.workTaskLifecycle.output.updateTask', output);
      this.updateTaskState = 'success';
      setState('ui.workTaskLifecycle.action.updateTask.status', 'success');
    } else {
      this.OutputUpdateTask = null;
      setState('ui.workTaskLifecycle.output.updateTask', null);
      this.updateTaskState = 'error';
      setState('ui.workTaskLifecycle.action.updateTask.status', 'error');
      if (response.error) {
        console.error('[updateTask] BFF error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleUpdateTaskClick(e: Event): void {
    e.preventDefault();
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateTask();
    }, { mode: 'blocking' });
  }

  // ── Lifecycle ────────────────────────────────────────────────────

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize from global state where useful
    const savedStatus = getState('ui.workTaskLifecycle.status');
    if (savedStatus !== undefined) {
      this.status = savedStatus as string;
    }

    // Parse route params and populate contextual route-based inputs
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId) {
      const existing = getState('ui.workTaskLifecycle.input.createTask.projectId');
      if (!existing) {
        this.setCreateTaskProjectId(routeParams.projectId);
      } else {
        this.createTaskProjectId = existing as string;
      }
    }
    if (routeParams.workTaskId) {
      const existing = getState('ui.workTaskLifecycle.input.updateTask.workTaskId');
      if (!existing) {
        this.setUpdateTaskWorkTaskId(routeParams.workTaskId);
      } else {
        this.updateTaskWorkTaskId = existing as string;
      }
    }

    // No initialLoads defined — nothing to query on connect
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }
}
