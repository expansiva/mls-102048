/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmBrowseTasksOutput,
  BuildFlowFsmBrowseTasksOutputItem,
  BuildFlowFsmUpdateTaskStatusInput,
  BuildFlowFsmUpdateTaskStatusOutput,
  BuildFlowFsmCreateTimeLogInput,
  BuildFlowFsmCreateTimeLogOutput,
  BuildFlowFsmCreateMaterialUsageInput,
  BuildFlowFsmCreateMaterialUsageOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.js';

/// **collab_i18n_start**
const message_en = {
  "fieldWorkerWorkspace.section.main.title": "My Tasks & Daily Logs",
  "fieldWorkerWorkspace.organism.browseTasks.title": "Assigned Tasks",
  "fieldWorkerWorkspace.organism.updateTaskStatus.title": "Update Task Status",
  "fieldWorkerWorkspace.organism.createTimeLog.title": "Log Work Hours",
  "fieldWorkerWorkspace.organism.createMaterialUsage.title": "Log Material Usage",
  "fieldWorkerWorkspace.intent.tasksBoard.title": "Task Board by Status",
  "fieldWorkerWorkspace.intent.tasksSummary.title": "Task Summary",
  "fieldWorkerWorkspace.intent.updateStatus.title": "Change Task Status",
  "fieldWorkerWorkspace.intent.createTimeLog.title": "Create Time Log",
  "fieldWorkerWorkspace.intent.createMaterialUsage.title": "Create Material Usage",
  "fieldWorkerWorkspace.field.workTaskId.label": "Work Task",
  "fieldWorkerWorkspace.field.title.label": "Title",
  "fieldWorkerWorkspace.field.description.label": "Description",
  "fieldWorkerWorkspace.field.status.label": "Status",
  "fieldWorkerWorkspace.field.dueDate.label": "Due Date",
  "fieldWorkerWorkspace.field.assignedWorkerName.label": "Assigned Worker",
  "fieldWorkerWorkspace.field.sequenceNumber.label": "Sequence",
  "fieldWorkerWorkspace.field.startedAt.label": "Started At",
  "fieldWorkerWorkspace.field.completedAt.label": "Completed At",
  "fieldWorkerWorkspace.field.logDate.label": "Log Date",
  "fieldWorkerWorkspace.field.hours.label": "Hours",
  "fieldWorkerWorkspace.field.projectId.label": "Project",
  "fieldWorkerWorkspace.field.materialName.label": "Material Name",
  "fieldWorkerWorkspace.field.quantity.label": "Quantity",
  "fieldWorkerWorkspace.field.unit.label": "Unit",
  "fieldWorkerWorkspace.field.unitCost.label": "Unit Cost",
  "fieldWorkerWorkspace.field.totalCost.label": "Total Cost",
  "fieldWorkerWorkspace.field.usageDate.label": "Usage Date",
  "fieldWorkerWorkspace.action.refreshTasks.label": "Refresh Tasks",
  "fieldWorkerWorkspace.action.updateStatus.label": "Update Status",
  "fieldWorkerWorkspace.action.logTime.label": "Log Time",
  "fieldWorkerWorkspace.action.logMaterial.label": "Log Material",
  "fieldWorkerWorkspace.action.createTimeLog.label": "Submit Time Log",
  "fieldWorkerWorkspace.action.createMaterialUsage.label": "Submit Material Usage",
  "fieldWorkerWorkspace.summary.inProgress.label": "In Progress Tasks",
  "fieldWorkerWorkspace.summary.completed.label": "Completed Tasks"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

type ActionStatus = "idle" | "loading" | "success" | "error";

interface PaginatedBrowseTasks {
  items: BuildFlowFsmBrowseTasksOutputItem[];
  total: number;
}

export class BuildFlowFsmFieldWorkerWorkspaceBase extends CollabLitElement {
  @property({ type: String }) status: string = "";

  @property({ type: String }) browseTasksState: ActionStatus = "idle";
  @property({ type: Object }) browseTasksData: PaginatedBrowseTasks = { items: [], total: 0 };

  @property({ type: String }) updateTaskStatusState: ActionStatus = "idle";
  @property({ type: String }) updateTaskStatusWorkTaskId: string = "";
  @property({ type: String }) updateTaskStatusStatus: string = "";

  @property({ type: String }) createTimeLogState: ActionStatus = "idle";
  @property({ type: String }) createTimeLogWorkTaskId: string = "";
  @property({ type: String }) createTimeLogLogDate: string = "";
  @property({ type: String }) createTimeLogHours: string = "";

  @property({ type: String }) createMaterialUsageState: ActionStatus = "idle";
  @property({ type: String }) createMaterialUsageProjectId: string = "";
  @property({ type: String }) createMaterialUsageMaterialName: string = "";
  @property({ type: String }) createMaterialUsageQuantity: string = "";
  @property({ type: String }) createMaterialUsageUnit: string = "";
  @property({ type: String }) createMaterialUsageUnitCost: string = "";
  @property({ type: String }) createMaterialUsageTotalCost: string = "";
  @property({ type: String }) createMaterialUsageUsageDate: string = "";

  @property({ type: Object }) OutputUpdateTaskStatus: BuildFlowFsmUpdateTaskStatusOutput | null = null;
  @property({ type: Object }) OutputCreateTimeLog: BuildFlowFsmCreateTimeLogOutput | null = null;
  @property({ type: Object }) OutputCreateMaterialUsage: BuildFlowFsmCreateMaterialUsageOutput | null = null;

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  // --- Route param parsing ---

  private parseRouteParams(): { projectId?: string } {
    const pattern = "/buildFlowFsm/fieldWorkerWorkspace/:projectId?";
    const path = window.location.pathname;
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    const result: { projectId?: string } = {};
    for (let i = 0; i < patternParts.length; i++) {
      const pPart = patternParts[i];
      if (pPart.startsWith(":")) {
        const rawName = pPart.replace(":", "").replace("?", "");
        const decoded = pathParts[i] ? decodeURIComponent(pathParts[i]) : "";
        if (decoded) {
          (result as Record<string, string>)[rawName] = decoded;
        }
      }
    }
    return result;
  }

  // --- Query action: browseTasks ---

  async loadBrowseTasks(): Promise<void> {
    this.browseTasksState = "loading";
    setState("ui.fieldWorkerWorkspace.action.browseTasks.status", "loading");

    const options: BffClientOptions = { mode: "silent" };
    const response = await execBff<BuildFlowFsmBrowseTasksOutput>(
      "buildFlowFsm.browseTasks.browseTasks",
      {},
      options
    );

    if (response.ok) {
      const data = response.data ?? { items: [], total: 0 };
      this.browseTasksData = data;
      setState("ui.fieldWorkerWorkspace.data.browseTasks", data);
      this.browseTasksState = "success";
      setState("ui.fieldWorkerWorkspace.action.browseTasks.status", "success");
    } else {
      this.browseTasksData = { items: [], total: 0 };
      setState("ui.fieldWorkerWorkspace.data.browseTasks", { items: [], total: 0 });
      this.browseTasksState = "error";
      setState("ui.fieldWorkerWorkspace.action.browseTasks.status", "error");
      if (response.error) {
        console.error("[browseTasks]", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleBrowseTasksClick(_e: Event): void {
    this.loadBrowseTasks();
  }

  // --- Command action: updateTaskStatus ---

  async updateTaskStatus(): Promise<void> {
    this.updateTaskStatusState = "loading";
    setState("ui.fieldWorkerWorkspace.action.updateTaskStatus.status", "loading");

    const params: BuildFlowFsmUpdateTaskStatusInput = {
      workTaskId: this.updateTaskStatusWorkTaskId,
      status: this.updateTaskStatusStatus as BuildFlowFsmUpdateTaskStatusInput["status"],
    };

    const response = await execBff<BuildFlowFsmUpdateTaskStatusOutput>(
      "buildFlowFsm.workTaskLifecycle.updateTaskStatus",
      params,
      { mode: "blocking" }
    );

    if (response.ok) {
      this.OutputUpdateTaskStatus = response.data ?? null;
      setState("ui.fieldWorkerWorkspace.output.updateTaskStatus", this.OutputUpdateTaskStatus);

      // Refresh browseTasks
      let refreshOk = true;
      try {
        await this.loadBrowseTasks();
        if (this.browseTasksState === "error") {
          refreshOk = false;
        }
      } catch {
        refreshOk = false;
      }

      if (refreshOk) {
        this.updateTaskStatusState = "success";
        setState("ui.fieldWorkerWorkspace.action.updateTaskStatus.status", "success");
      } else {
        this.updateTaskStatusState = "error";
        setState("ui.fieldWorkerWorkspace.action.updateTaskStatus.status", "error");
      }
    } else {
      this.updateTaskStatusState = "error";
      setState("ui.fieldWorkerWorkspace.action.updateTaskStatus.status", "error");
      if (response.error) {
        console.error("[updateTaskStatus]", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleUpdateTaskStatusClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateTaskStatus();
    }, { mode: "blocking" });
  }

  // --- Command action: createTimeLog ---

  async createTimeLog(): Promise<void> {
    this.createTimeLogState = "loading";
    setState("ui.fieldWorkerWorkspace.action.createTimeLog.status", "loading");

    const params: BuildFlowFsmCreateTimeLogInput = {
      workTaskId: this.createTimeLogWorkTaskId,
      logDate: this.createTimeLogLogDate,
      hours: Number(this.createTimeLogHours),
    };

    const response = await execBff<BuildFlowFsmCreateTimeLogOutput>(
      "buildFlowFsm.createTimeLog.createTimeLog",
      params,
      { mode: "blocking" }
    );

    if (response.ok) {
      this.OutputCreateTimeLog = response.data ?? null;
      setState("ui.fieldWorkerWorkspace.output.createTimeLog", this.OutputCreateTimeLog);

      let refreshOk = true;
      try {
        await this.loadBrowseTasks();
        if (this.browseTasksState === "error") {
          refreshOk = false;
        }
      } catch {
        refreshOk = false;
      }

      if (refreshOk) {
        this.createTimeLogState = "success";
        setState("ui.fieldWorkerWorkspace.action.createTimeLog.status", "success");
      } else {
        this.createTimeLogState = "error";
        setState("ui.fieldWorkerWorkspace.action.createTimeLog.status", "error");
      }
    } else {
      this.createTimeLogState = "error";
      setState("ui.fieldWorkerWorkspace.action.createTimeLog.status", "error");
      if (response.error) {
        console.error("[createTimeLog]", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleCreateTimeLogClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createTimeLog();
    }, { mode: "blocking" });
  }

  // --- Command action: createMaterialUsage ---

  async createMaterialUsage(): Promise<void> {
    // Parse route params for projectId
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId) {
      this.createMaterialUsageProjectId = routeParams.projectId;
      setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId", routeParams.projectId);
    }

    if (!this.createMaterialUsageProjectId) {
      this.createMaterialUsageState = "idle";
      setState("ui.fieldWorkerWorkspace.action.createMaterialUsage.status", "idle");
      this.requestUpdate();
      return;
    }

    this.createMaterialUsageState = "loading";
    setState("ui.fieldWorkerWorkspace.action.createMaterialUsage.status", "loading");

    const params: BuildFlowFsmCreateMaterialUsageInput = {
      projectId: this.createMaterialUsageProjectId,
      materialName: this.createMaterialUsageMaterialName,
      quantity: Number(this.createMaterialUsageQuantity),
      unit: this.createMaterialUsageUnit as BuildFlowFsmCreateMaterialUsageInput["unit"],
      unitCost: Number(this.createMaterialUsageUnitCost),
      totalCost: Number(this.createMaterialUsageTotalCost),
      usageDate: this.createMaterialUsageUsageDate,
    };

    const response = await execBff<BuildFlowFsmCreateMaterialUsageOutput>(
      "buildFlowFsm.createMaterialUsage.createMaterialUsage",
      params,
      { mode: "blocking" }
    );

    if (response.ok) {
      this.OutputCreateMaterialUsage = response.data ?? null;
      setState("ui.fieldWorkerWorkspace.output.createMaterialUsage", this.OutputCreateMaterialUsage);

      let refreshOk = true;
      try {
        await this.loadBrowseTasks();
        if (this.browseTasksState === "error") {
          refreshOk = false;
        }
      } catch {
        refreshOk = false;
      }

      if (refreshOk) {
        this.createMaterialUsageState = "success";
        setState("ui.fieldWorkerWorkspace.action.createMaterialUsage.status", "success");
      } else {
        this.createMaterialUsageState = "error";
        setState("ui.fieldWorkerWorkspace.action.createMaterialUsage.status", "error");
      }
    } else {
      this.createMaterialUsageState = "error";
      setState("ui.fieldWorkerWorkspace.action.createMaterialUsage.status", "error");
      if (response.error) {
        console.error("[createMaterialUsage]", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleCreateMaterialUsageClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createMaterialUsage();
    }, { mode: "blocking" });
  }

  // --- State setters: updateTaskStatus ---

  setUpdateTaskStatusWorkTaskId(value: string): void {
    this.updateTaskStatusWorkTaskId = value;
    setState("ui.fieldWorkerWorkspace.input.updateTaskStatus.workTaskId", value);
    this.requestUpdate();
  }

  handleUpdateTaskStatusWorkTaskIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setUpdateTaskStatusWorkTaskId(target.value);
  }

  setUpdateTaskStatusStatus(value: string): void {
    this.updateTaskStatusStatus = value;
    setState("ui.fieldWorkerWorkspace.input.updateTaskStatus.status", value);
    this.requestUpdate();
  }

  handleUpdateTaskStatusStatusChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setUpdateTaskStatusStatus(target.value);
  }

  // --- State setters: createTimeLog ---

  setCreateTimeLogWorkTaskId(value: string): void {
    this.createTimeLogWorkTaskId = value;
    setState("ui.fieldWorkerWorkspace.input.createTimeLog.workTaskId", value);
    this.requestUpdate();
  }

  handleCreateTimeLogWorkTaskIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateTimeLogWorkTaskId(target.value);
  }

  setCreateTimeLogLogDate(value: string): void {
    this.createTimeLogLogDate = value;
    setState("ui.fieldWorkerWorkspace.input.createTimeLog.logDate", value);
    this.requestUpdate();
  }

  handleCreateTimeLogLogDateChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateTimeLogLogDate(target.value);
  }

  setCreateTimeLogHours(value: string): void {
    this.createTimeLogHours = value;
    setState("ui.fieldWorkerWorkspace.input.createTimeLog.hours", value);
    this.requestUpdate();
  }

  handleCreateTimeLogHoursChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateTimeLogHours(target.value);
  }

  // --- State setters: createMaterialUsage ---

  setCreateMaterialUsageProjectId(value: string): void {
    this.createMaterialUsageProjectId = value;
    setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId", value);
    this.requestUpdate();
  }

  handleCreateMaterialUsageProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateMaterialUsageProjectId(target.value);
  }

  setCreateMaterialUsageMaterialName(value: string): void {
    this.createMaterialUsageMaterialName = value;
    setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.materialName", value);
    this.requestUpdate();
  }

  handleCreateMaterialUsageMaterialNameChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateMaterialUsageMaterialName(target.value);
  }

  setCreateMaterialUsageQuantity(value: string): void {
    this.createMaterialUsageQuantity = value;
    setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.quantity", value);
    this.requestUpdate();
  }

  handleCreateMaterialUsageQuantityChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateMaterialUsageQuantity(target.value);
  }

  setCreateMaterialUsageUnit(value: string): void {
    this.createMaterialUsageUnit = value;
    setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.unit", value);
    this.requestUpdate();
  }

  handleCreateMaterialUsageUnitChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateMaterialUsageUnit(target.value);
  }

  setCreateMaterialUsageUnitCost(value: string): void {
    this.createMaterialUsageUnitCost = value;
    setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.unitCost", value);
    this.requestUpdate();
  }

  handleCreateMaterialUsageUnitCostChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateMaterialUsageUnitCost(target.value);
  }

  setCreateMaterialUsageTotalCost(value: string): void {
    this.createMaterialUsageTotalCost = value;
    setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.totalCost", value);
    this.requestUpdate();
  }

  handleCreateMaterialUsageTotalCostChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateMaterialUsageTotalCost(target.value);
  }

  setCreateMaterialUsageUsageDate(value: string): void {
    this.createMaterialUsageUsageDate = value;
    setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.usageDate", value);
    this.requestUpdate();
  }

  handleCreateMaterialUsageUsageDateChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    this.setCreateMaterialUsageUsageDate(target.value);
  }

  // --- Lifecycle ---

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize state from global state where useful
    const savedStatus = getState("ui.fieldWorkerWorkspace.status");
    if (savedStatus !== undefined) {
      this.status = savedStatus as string;
    }

    const savedBrowseData = getState("ui.fieldWorkerWorkspace.data.browseTasks");
    if (savedBrowseData !== undefined) {
      this.browseTasksData = savedBrowseData as PaginatedBrowseTasks;
    }

    // Parse route params for projectId
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId) {
      this.createMaterialUsageProjectId = routeParams.projectId;
      setState("ui.fieldWorkerWorkspace.input.createMaterialUsage.projectId", routeParams.projectId);
    }

    // Subscribe to shared states
    const keys = [
      "ui.fieldWorkerWorkspace.status",
      "ui.fieldWorkerWorkspace.data.browseTasks",
    ];
    this.subscribedKeys = keys;
    subscribe(keys, this);

    // Run initial loads
    this.loadBrowseTasks();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
    }
    this.subscribedKeys = [];
    super.disconnectedCallback();
  }
}
