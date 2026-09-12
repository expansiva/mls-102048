/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/projectManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmCreateProjectInput,
  BuildFlowFsmCreateProjectOutput,
  BuildFlowFsmUpdateProjectStatusInput,
  BuildFlowFsmUpdateProjectStatusOutput,
  BuildFlowFsmUpdateProjectInput,
  BuildFlowFsmUpdateProjectOutput,
  BuildFlowFsmViewProjectOutput,
  BuildFlowFsmViewDashboardOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/projectManagement.js';

/// **collab_i18n_start**
const message_en = {
  "section.dashboard.title": "Project Management & Dashboard",
  "section.createProject.title": "Create Project",
  "section.updateStatus.title": "Update Project Status",
  "section.updateProject.title": "Update Project Details",
  "organism.dashboardList.title": "Active Projects",
  "organism.projectDetail.title": "Project Detail",
  "organism.createProject.title": "New Project Setup",
  "organism.updateStatus.title": "Change Status",
  "organism.updateProject.title": "Edit Project",
  "intent.dashboardContext.title": "Company Context",
  "intent.dashboardCards.title": "Active Project Cards",
  "intent.dashboardCards.empty": "No active projects found.",
  "intent.projectDetail.title": "Project Summary",
  "intent.projectDetail.empty": "Select a project to see details.",
  "intent.createProject.step1.title": "Project Identity",
  "intent.createProject.step2.title": "Budget & Schedule",
  "intent.createProject.step3.title": "Activation",
  "intent.updateStatus.title": "Status Change",
  "intent.updateProject.title": "Project Details",
  "field.activeCompanyId.label": "Active Company",
  "field.project.projectId": "Project ID",
  "field.project.clientId": "Client",
  "field.project.name": "Project Name",
  "field.project.siteAddress": "Site Address",
  "field.project.budget": "Budget (USD)",
  "field.project.startDate": "Start Date",
  "field.project.endDate": "End Date",
  "field.project.status": "Status",
  "field.project.completedAt": "Completed At",
  "field.project.cancelledAt": "Cancelled At",
  "field.project.cancellationReason": "Cancellation Reason",
  "field.project.createdAt": "Created At",
  "field.project.updatedAt": "Updated At",
  "field.project.actualCost": "Actual Cost",
  "field.project.delayRisk": "Next Due Date",
  "action.viewDashboard": "Refresh Dashboard",
  "action.viewProject": "View Project",
  "action.createProject": "Create Project",
  "action.updateProjectStatus": "Update Status",
  "action.updateProject": "Save Changes"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmProjectManagementBase extends CollabLitElement {
  // Page status
  @property({ type: String }) status: string = '';

  // Action statuses
  @property({ type: String }) createProjectState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) updateProjectStatusState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) updateProjectState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) viewProjectState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) viewDashboardState: "idle" | "loading" | "success" | "error" = "idle";

  // Create project form inputs
  @property({ type: String }) createProjectName: string = '';
  @property({ type: String }) createProjectClientId: string = '';
  @property({ type: String }) createProjectSiteAddress: string = '';
  @property({ type: String }) createProjectBudget: string = '';
  @property({ type: String }) createProjectStartDate: string = '';
  @property({ type: String }) createProjectEndDate: string = '';
  @property({ type: String }) createProjectStatus: string = '';

  // Update project status inputs
  @property({ type: String }) updateProjectStatusProjectId: string = '';
  @property({ type: String }) updateProjectStatusStatus: string = '';
  @property({ type: String }) updateProjectStatusCancellationReason: string = '';

  // Update project form inputs
  @property({ type: String }) updateProjectProjectId: string = '';
  @property({ type: String }) updateProjectName: string = '';
  @property({ type: String }) updateProjectClientId: string = '';
  @property({ type: String }) updateProjectSiteAddress: string = '';
  @property({ type: String }) updateProjectBudget: string = '';
  @property({ type: String }) updateProjectStartDate: string = '';
  @property({ type: String }) updateProjectEndDate: string = '';

  // View project route input
  @property({ type: String }) viewProjectProjectId: string = '';

  // Query results
  @property({ type: Object }) viewProjectData: BuildFlowFsmViewProjectOutput | null = null;
  @property({ type: Object }) viewDashboardData: BuildFlowFsmViewDashboardOutput = { items: [], total: 0 };

  // Business context
  @property({ type: String }) activeCompanyId: string = '';

  // Command outputs
  @property({ type: Object }) OutputCreateProject: BuildFlowFsmCreateProjectOutput | null = null;
  @property({ type: Object }) OutputUpdateProjectStatus: BuildFlowFsmUpdateProjectStatusOutput | null = null;
  @property({ type: Object }) OutputUpdateProject: BuildFlowFsmUpdateProjectOutput | null = null;

  // Layout state
  @property({ type: String }) LayoutFldActiveCompanyId: string = '';

  private subscribedKeys: string[] = [];

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  // ---------------------------------------------------------------------------
  // Route parsing
  // ---------------------------------------------------------------------------

  private parseRouteParams(): Record<string, string> {
    const pattern = '/buildFlowFsm/projectManagement/:projectId?';
    const path = window.location.pathname;
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    const result: Record<string, string> = {};
    for (let i = 0; i < patternParts.length; i++) {
      const pPart = patternParts[i];
      if (!pPart) continue;
      if (pPart.startsWith(':')) {
        const paramName = pPart.replace(':', '').replace('?', '');
        const raw = pathParts[i] ? decodeURIComponent(pathParts[i]) : '';
        if (raw) {
          result[paramName] = raw;
        }
      }
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // Query actions
  // ---------------------------------------------------------------------------

  async loadViewProject(): Promise<void> {
    const routeParams = this.parseRouteParams();
    const routeProjectId = routeParams['projectId'];
    if (routeProjectId) {
      this.viewProjectProjectId = routeProjectId;
      setState('ui.projectManagement.input.viewProject.projectId', routeProjectId);
    }

    if (!this.viewProjectProjectId) {
      this.viewProjectState = 'idle';
      setState('ui.projectManagement.action.viewProject.status', 'idle');
      this.viewProjectData = null;
      setState('ui.projectManagement.data.viewProject', null);
      return;
    }

    this.viewProjectState = 'loading';
    setState('ui.projectManagement.action.viewProject.status', 'loading');

    const response = await execBff<BuildFlowFsmViewProjectOutput>(
      'buildFlowFsm.viewProject.viewProject',
      { projectId: this.viewProjectProjectId },
      { mode: 'silent' }
    );

    if (response.ok) {
      this.viewProjectData = response.data ?? null;
      setState('ui.projectManagement.data.viewProject', this.viewProjectData);
      this.viewProjectState = 'success';
      setState('ui.projectManagement.action.viewProject.status', 'success');
    } else {
      this.viewProjectData = null;
      setState('ui.projectManagement.data.viewProject', null);
      this.viewProjectState = 'error';
      setState('ui.projectManagement.action.viewProject.status', 'error');
      if (response.error) {
        console.error('viewProject error:', response.error);
      }
    }
  }

  handleViewProjectClick(): void {
    this.loadViewProject();
  }

  async loadViewDashboard(): Promise<void> {
    this.viewDashboardState = 'loading';
    setState('ui.projectManagement.action.viewDashboard.status', 'loading');

    const response = await execBff<BuildFlowFsmViewDashboardOutput>(
      'buildFlowFsm.viewDashboard.viewDashboard',
      {},
      { mode: 'silent' }
    );

    if (response.ok) {
      this.viewDashboardData = response.data ?? { items: [], total: 0 };
      setState('ui.projectManagement.data.viewDashboard', this.viewDashboardData);
      this.viewDashboardState = 'success';
      setState('ui.projectManagement.action.viewDashboard.status', 'success');
    } else {
      this.viewDashboardState = 'error';
      setState('ui.projectManagement.action.viewDashboard.status', 'error');
      if (response.error) {
        console.error('viewDashboard error:', response.error);
      }
    }
  }

  handleViewDashboardClick(): void {
    this.loadViewDashboard();
  }

  // ---------------------------------------------------------------------------
  // Command actions
  // ---------------------------------------------------------------------------

  async createProject(): Promise<void> {
    this.createProjectState = 'loading';
    setState('ui.projectManagement.action.createProject.status', 'loading');

    const params: BuildFlowFsmCreateProjectInput = {
      name: this.createProjectName,
      clientId: this.createProjectClientId,
      siteAddress: this.createProjectSiteAddress,
      budget: Number(this.createProjectBudget) || 0,
      startDate: this.createProjectStartDate,
      endDate: this.createProjectEndDate,
      status: this.createProjectStatus as "draft" | "active" | "completed" | "cancelled",
    };

    const response = await execBff<BuildFlowFsmCreateProjectOutput>(
      'buildFlowFsm.projectLifecycle.createProject',
      params,
      { mode: 'blocking' }
    );

    if (response.ok) {
      this.OutputCreateProject = response.data ?? null;
      setState('ui.projectManagement.output.createProject', this.OutputCreateProject);

      let refreshFailed = false;
      try {
        await this.loadViewProject();
      } catch {
        refreshFailed = true;
      }
      try {
        await this.loadViewDashboard();
      } catch {
        refreshFailed = true;
      }

      if (refreshFailed) {
        this.createProjectState = 'error';
        setState('ui.projectManagement.action.createProject.status', 'error');
      } else {
        this.createProjectState = 'success';
        setState('ui.projectManagement.action.createProject.status', 'success');
      }
    } else {
      this.createProjectState = 'error';
      setState('ui.projectManagement.action.createProject.status', 'error');
      if (response.error) {
        console.error('createProject error:', response.error);
      }
    }
  }

  handleCreateProjectClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createProject();
    }, { mode: 'blocking' });
  }

  async updateProjectStatus(): Promise<void> {
    this.updateProjectStatusState = 'loading';
    setState('ui.projectManagement.action.updateProjectStatus.status', 'loading');

    const params: BuildFlowFsmUpdateProjectStatusInput = {
      projectId: this.updateProjectStatusProjectId,
      status: this.updateProjectStatusStatus as "draft" | "active" | "completed" | "cancelled",
      cancellationReason: this.updateProjectStatusCancellationReason || undefined,
    };

    const response = await execBff<BuildFlowFsmUpdateProjectStatusOutput>(
      'buildFlowFsm.projectLifecycle.updateProjectStatus',
      params,
      { mode: 'blocking' }
    );

    if (response.ok) {
      this.OutputUpdateProjectStatus = response.data ?? null;
      setState('ui.projectManagement.output.updateProjectStatus', this.OutputUpdateProjectStatus);

      let refreshFailed = false;
      try {
        await this.loadViewProject();
      } catch {
        refreshFailed = true;
      }
      try {
        await this.loadViewDashboard();
      } catch {
        refreshFailed = true;
      }

      if (refreshFailed) {
        this.updateProjectStatusState = 'error';
        setState('ui.projectManagement.action.updateProjectStatus.status', 'error');
      } else {
        this.updateProjectStatusState = 'success';
        setState('ui.projectManagement.action.updateProjectStatus.status', 'success');
      }
    } else {
      this.updateProjectStatusState = 'error';
      setState('ui.projectManagement.action.updateProjectStatus.status', 'error');
      if (response.error) {
        console.error('updateProjectStatus error:', response.error);
      }
    }
  }

  handleUpdateProjectStatusClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateProjectStatus();
    }, { mode: 'blocking' });
  }

  async updateProject(): Promise<void> {
    const routeParams = this.parseRouteParams();
    const routeProjectId = routeParams['projectId'];
    if (routeProjectId) {
      this.updateProjectProjectId = routeProjectId;
      setState('ui.projectManagement.input.updateProject.projectId', routeProjectId);
    }

    if (!this.updateProjectProjectId) {
      this.updateProjectState = 'idle';
      setState('ui.projectManagement.action.updateProject.status', 'idle');
      return;
    }

    this.updateProjectState = 'loading';
    setState('ui.projectManagement.action.updateProject.status', 'loading');

    const params: BuildFlowFsmUpdateProjectInput = {
      projectId: this.updateProjectProjectId,
      name: this.updateProjectName,
      clientId: this.updateProjectClientId,
      siteAddress: this.updateProjectSiteAddress,
      budget: Number(this.updateProjectBudget) || 0,
      startDate: this.updateProjectStartDate,
      endDate: this.updateProjectEndDate,
    };

    const response = await execBff<BuildFlowFsmUpdateProjectOutput>(
      'buildFlowFsm.updateProject.updateProject',
      params,
      { mode: 'blocking' }
    );

    if (response.ok) {
      this.OutputUpdateProject = response.data ?? null;
      setState('ui.projectManagement.output.updateProject', this.OutputUpdateProject);

      let refreshFailed = false;
      try {
        await this.loadViewProject();
      } catch {
        refreshFailed = true;
      }
      try {
        await this.loadViewDashboard();
      } catch {
        refreshFailed = true;
      }

      if (refreshFailed) {
        this.updateProjectState = 'error';
        setState('ui.projectManagement.action.updateProject.status', 'error');
      } else {
        this.updateProjectState = 'success';
        setState('ui.projectManagement.action.updateProject.status', 'success');
      }
    } else {
      this.updateProjectState = 'error';
      setState('ui.projectManagement.action.updateProject.status', 'error');
      if (response.error) {
        console.error('updateProject error:', response.error);
      }
    }
  }

  handleUpdateProjectClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateProject();
    }, { mode: 'blocking' });
  }

  // ---------------------------------------------------------------------------
  // State setters – create project inputs
  // ---------------------------------------------------------------------------

  setCreateProjectName(value: string): void {
    this.createProjectName = value;
    setState('ui.projectManagement.input.createProject.name', value);
    this.requestUpdate();
  }

  handleCreateProjectNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateProjectName(target.value);
  }

  setCreateProjectClientId(value: string): void {
    this.createProjectClientId = value;
    setState('ui.projectManagement.input.createProject.clientId', value);
    this.requestUpdate();
  }

  handleCreateProjectClientIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateProjectClientId(target.value);
  }

  setCreateProjectSiteAddress(value: string): void {
    this.createProjectSiteAddress = value;
    setState('ui.projectManagement.input.createProject.siteAddress', value);
    this.requestUpdate();
  }

  handleCreateProjectSiteAddressChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateProjectSiteAddress(target.value);
  }

  setCreateProjectBudget(value: string): void {
    this.createProjectBudget = value;
    setState('ui.projectManagement.input.createProject.budget', value);
    this.requestUpdate();
  }

  handleCreateProjectBudgetChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateProjectBudget(target.value);
  }

  setCreateProjectStartDate(value: string): void {
    this.createProjectStartDate = value;
    setState('ui.projectManagement.input.createProject.startDate', value);
    this.requestUpdate();
  }

  handleCreateProjectStartDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateProjectStartDate(target.value);
  }

  setCreateProjectEndDate(value: string): void {
    this.createProjectEndDate = value;
    setState('ui.projectManagement.input.createProject.endDate', value);
    this.requestUpdate();
  }

  handleCreateProjectEndDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateProjectEndDate(target.value);
  }

  setCreateProjectStatus(value: string): void {
    this.createProjectStatus = value;
    setState('ui.projectManagement.input.createProject.status', value);
    this.requestUpdate();
  }

  handleCreateProjectStatusChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateProjectStatus(target.value);
  }

  // ---------------------------------------------------------------------------
  // State setters – update project status inputs
  // ---------------------------------------------------------------------------

  setUpdateProjectStatusProjectId(value: string): void {
    this.updateProjectStatusProjectId = value;
    setState('ui.projectManagement.input.updateProjectStatus.projectId', value);
    this.requestUpdate();
  }

  handleUpdateProjectStatusProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectStatusProjectId(target.value);
  }

  setUpdateProjectStatusStatus(value: string): void {
    this.updateProjectStatusStatus = value;
    setState('ui.projectManagement.input.updateProjectStatus.status', value);
    this.requestUpdate();
  }

  handleUpdateProjectStatusStatusChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectStatusStatus(target.value);
  }

  setUpdateProjectStatusCancellationReason(value: string): void {
    this.updateProjectStatusCancellationReason = value;
    setState('ui.projectManagement.input.updateProjectStatus.cancellationReason', value);
    this.requestUpdate();
  }

  handleUpdateProjectStatusCancellationReasonChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectStatusCancellationReason(target.value);
  }

  // ---------------------------------------------------------------------------
  // State setters – update project inputs
  // ---------------------------------------------------------------------------

  setUpdateProjectProjectId(value: string): void {
    this.updateProjectProjectId = value;
    setState('ui.projectManagement.input.updateProject.projectId', value);
    this.requestUpdate();
  }

  handleUpdateProjectProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectProjectId(target.value);
  }

  setUpdateProjectName(value: string): void {
    this.updateProjectName = value;
    setState('ui.projectManagement.input.updateProject.name', value);
    this.requestUpdate();
  }

  handleUpdateProjectNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectName(target.value);
  }

  setUpdateProjectClientId(value: string): void {
    this.updateProjectClientId = value;
    setState('ui.projectManagement.input.updateProject.clientId', value);
    this.requestUpdate();
  }

  handleUpdateProjectClientIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectClientId(target.value);
  }

  setUpdateProjectSiteAddress(value: string): void {
    this.updateProjectSiteAddress = value;
    setState('ui.projectManagement.input.updateProject.siteAddress', value);
    this.requestUpdate();
  }

  handleUpdateProjectSiteAddressChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectSiteAddress(target.value);
  }

  setUpdateProjectBudget(value: string): void {
    this.updateProjectBudget = value;
    setState('ui.projectManagement.input.updateProject.budget', value);
    this.requestUpdate();
  }

  handleUpdateProjectBudgetChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectBudget(target.value);
  }

  setUpdateProjectStartDate(value: string): void {
    this.updateProjectStartDate = value;
    setState('ui.projectManagement.input.updateProject.startDate', value);
    this.requestUpdate();
  }

  handleUpdateProjectStartDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectStartDate(target.value);
  }

  setUpdateProjectEndDate(value: string): void {
    this.updateProjectEndDate = value;
    setState('ui.projectManagement.input.updateProject.endDate', value);
    this.requestUpdate();
  }

  handleUpdateProjectEndDateChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateProjectEndDate(target.value);
  }

  // ---------------------------------------------------------------------------
  // State setters – view project input
  // ---------------------------------------------------------------------------

  setViewProjectProjectId(value: string): void {
    this.viewProjectProjectId = value;
    setState('ui.projectManagement.input.viewProject.projectId', value);
    this.requestUpdate();
  }

  handleViewProjectProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setViewProjectProjectId(target.value);
  }

  // ---------------------------------------------------------------------------
  // Shared state change handler
  // ---------------------------------------------------------------------------

  handleIcaStateChange(key: string, value: unknown): void {
    if (key === 'ui.projectManagement.businessContext.activeCompanyId') {
      this.activeCompanyId = (value as string) ?? '';
    }
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize business context from shared state
    const ctxCompanyId = getState('ui.projectManagement.businessContext.activeCompanyId') as string | undefined;
    if (ctxCompanyId) {
      this.activeCompanyId = ctxCompanyId;
    } else {
      setState('ui.projectManagement.businessContext.activeCompanyId', this.activeCompanyId);
    }

    // Initialize layout state from shared state
    const layoutCompanyId = getState('ui.projectManagement.layout.fld_activeCompanyId') as string | undefined;
    if (layoutCompanyId) {
      this.LayoutFldActiveCompanyId = layoutCompanyId;
    } else {
      setState('ui.projectManagement.layout.fld_activeCompanyId', this.LayoutFldActiveCompanyId);
    }

    // Subscribe to shared business context state
    const ctxKey = 'ui.projectManagement.businessContext.activeCompanyId';
    subscribe(ctxKey, this);
    this.subscribedKeys.push(ctxKey);

    // Run initial loads
    this.loadViewProject();
    this.loadViewDashboard();
  }

  disconnectedCallback(): void {
    for (const key of this.subscribedKeys) {
      unsubscribe(key, this);
    }
    this.subscribedKeys = [];
    super.disconnectedCallback();
  }
}
