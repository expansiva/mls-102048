/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmCreateChangeOrderInput,
  BuildFlowFsmCreateChangeOrderOutput,
  BuildFlowFsmSendChangeOrderInput,
  BuildFlowFsmSendChangeOrderOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/changeOrderLifecycle.js';

/// **collab_i18n_start**
const message_en = {
  "section.changeOrderManagement": "Change Order Management",
  "organism.createChangeOrder.title": "Create Change Order",
  "organism.createChangeOrder.purpose": "Document a scope change with its cost impact",
  "organism.sendChangeOrder.title": "Send to Client",
  "organism.sendChangeOrder.purpose": "Send the draft change order to the client for in-app approval",
  "organism.reviewSummary.title": "Review & Status",
  "organism.reviewSummary.purpose": "Review the change order lifecycle status",
  "intention.createForm.title": "New Change Order Details",
  "intention.draftList.title": "Draft Change Orders",
  "intention.draftList.empty": "No draft change orders available. Create one first.",
  "intention.sendForm.title": "Send Change Order",
  "intention.summary.title": "Change Order Summary",
  "intention.summary.empty": "No change order selected.",
  "intention.workflowStatus.title": "Lifecycle Status",
  "field.projectId.label": "Project",
  "field.title.label": "Title",
  "field.scopeDescription.label": "Scope Description",
  "field.amount.label": "Cost Amount (USD)",
  "field.changeOrderId.label": "Change Order",
  "field.status.label": "Status",
  "field.sentAt.label": "Sent At",
  "field.createdAt.label": "Created At",
  "field.updatedAt.label": "Updated At",
  "field.approvedAt.label": "Approved At",
  "field.rejectedAt.label": "Rejected At",
  "action.createChangeOrder.label": "Create Change Order",
  "action.sendChangeOrder.label": "Send to Client",
  "filter.status.label": "Status",
  "sec.changeOrderManagement.title": "Sec change Order Management",
  "org.createChangeOrder.title": "Create a change order documenting a scope change with title, scope description, and cost amount",
  "org.sendChangeOrder.title": "Org send Change Order",
  "org.sendChangeOrder.inner.title": "Select a draft change order from the list and send it to the client for in app approval",
  "org.reviewSummary.title": "Org review Summary",
  "org.reviewSummary.inner.title": "Review the change order details and lifecycle status after creation and sending"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmChangeOrderLifecycleBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) createChangeOrderState: "idle" | "loading" | "success" | "error" = 'idle';

  @property({ type: String }) createChangeOrderProjectId: string = '';
  @property({ type: String }) createChangeOrderTitle: string = '';
  @property({ type: String }) createChangeOrderScopeDescription: string = '';
  @property({ type: String }) createChangeOrderAmount: string = '';

  @property({ type: String }) sendChangeOrderState: "idle" | "loading" | "success" | "error" = 'idle';

  @property({ type: String }) sendChangeOrderChangeOrderId: string = '';

  @property({ type: Object }) OutputCreateChangeOrder: BuildFlowFsmCreateChangeOrderOutput | null = null;
  @property({ type: Object }) OutputSendChangeOrder: BuildFlowFsmSendChangeOrderOutput | null = null;

  @property({ type: String }) LayoutColListTitle: string = '';
  @property({ type: String }) LayoutColListAmount: string = '';
  @property({ type: String }) LayoutColListStatus: string = '';
  @property({ type: String }) LayoutColListCreatedAt: string = '';
  @property({ type: String }) LayoutFltListStatus: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  private parseRouteParams(): { projectId?: string } {
    const pattern = '/buildFlowFsm/changeOrderLifecycle/:projectId?';
    const patternParts = pattern.split('/').filter((p) => p.length > 0);
    const pathParts = window.location.pathname.split('/').filter((p) => p.length > 0);
    const result: { projectId?: string } = {};
    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':')) {
        const isOptional = part.endsWith('?');
        const paramName = part.replace(/^:/, '').replace(/\?$/, '');
        const value = pathParts[i] ? decodeURIComponent(pathParts[i]) : '';
        if (value) {
          (result as Record<string, string>)[paramName] = value;
        } else if (!isOptional) {
          (result as Record<string, string>)[paramName] = '';
        }
      }
    }
    return result;
  }

  // --- StateSetter actions ---

  setCreateChangeOrderProjectId(value: string): void {
    this.createChangeOrderProjectId = value;
    setState('ui.changeOrderLifecycle.input.createChangeOrder.projectId', value);
    this.requestUpdate();
  }

  handleCreateChangeOrderProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateChangeOrderProjectId(target.value);
  }

  setCreateChangeOrderTitle(value: string): void {
    this.createChangeOrderTitle = value;
    setState('ui.changeOrderLifecycle.input.createChangeOrder.title', value);
    this.requestUpdate();
  }

  handleCreateChangeOrderTitleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateChangeOrderTitle(target.value);
  }

  setCreateChangeOrderScopeDescription(value: string): void {
    this.createChangeOrderScopeDescription = value;
    setState('ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription', value);
    this.requestUpdate();
  }

  handleCreateChangeOrderScopeDescriptionChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateChangeOrderScopeDescription(target.value);
  }

  setCreateChangeOrderAmount(value: string): void {
    this.createChangeOrderAmount = value;
    setState('ui.changeOrderLifecycle.input.createChangeOrder.amount', value);
    this.requestUpdate();
  }

  handleCreateChangeOrderAmountChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateChangeOrderAmount(target.value);
  }

  setSendChangeOrderChangeOrderId(value: string): void {
    this.sendChangeOrderChangeOrderId = value;
    setState('ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId', value);
    this.requestUpdate();
  }

  handleSendChangeOrderChangeOrderIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setSendChangeOrderChangeOrderId(target.value);
  }

  // --- Command actions ---

  async createChangeOrder(): Promise<void> {
    // Parse route params and populate projectId if not already set
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId && !this.createChangeOrderProjectId) {
      this.setCreateChangeOrderProjectId(routeParams.projectId);
    }

    // Validate required route param
    if (!this.createChangeOrderProjectId) {
      this.createChangeOrderState = 'idle';
      setState('ui.changeOrderLifecycle.action.createChangeOrder.status', 'idle');
      this.OutputCreateChangeOrder = null;
      setState('ui.changeOrderLifecycle.output.createChangeOrder', null);
      this.requestUpdate();
      return;
    }

    this.createChangeOrderState = 'loading';
    setState('ui.changeOrderLifecycle.action.createChangeOrder.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmCreateChangeOrderInput = {
      projectId: this.createChangeOrderProjectId,
      title: this.createChangeOrderTitle,
      scopeDescription: this.createChangeOrderScopeDescription,
      amount: Number(this.createChangeOrderAmount) || 0,
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<BuildFlowFsmCreateChangeOrderOutput>(
      'buildFlowFsm.changeOrderLifecycle.createChangeOrder',
      params,
      options,
    );

    if (response.ok && response.data) {
      this.OutputCreateChangeOrder = response.data;
      setState('ui.changeOrderLifecycle.output.createChangeOrder', response.data);
      this.createChangeOrderState = 'success';
      setState('ui.changeOrderLifecycle.action.createChangeOrder.status', 'success');
    } else {
      this.OutputCreateChangeOrder = null;
      setState('ui.changeOrderLifecycle.output.createChangeOrder', null);
      this.createChangeOrderState = 'error';
      setState('ui.changeOrderLifecycle.action.createChangeOrder.status', 'error');
      if (response.error) {
        console.error('[createChangeOrder] error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleCreateChangeOrderClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createChangeOrder();
    }, { mode: 'blocking' });
  }

  async sendChangeOrder(): Promise<void> {
    // Validate required selected entity input
    if (!this.sendChangeOrderChangeOrderId) {
      this.sendChangeOrderState = 'idle';
      setState('ui.changeOrderLifecycle.action.sendChangeOrder.status', 'idle');
      this.OutputSendChangeOrder = null;
      setState('ui.changeOrderLifecycle.output.sendChangeOrder', null);
      this.requestUpdate();
      return;
    }

    this.sendChangeOrderState = 'loading';
    setState('ui.changeOrderLifecycle.action.sendChangeOrder.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmSendChangeOrderInput = {
      changeOrderId: this.sendChangeOrderChangeOrderId,
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<BuildFlowFsmSendChangeOrderOutput>(
      'buildFlowFsm.changeOrderLifecycle.sendChangeOrder',
      params,
      options,
    );

    if (response.ok && response.data) {
      this.OutputSendChangeOrder = response.data;
      setState('ui.changeOrderLifecycle.output.sendChangeOrder', response.data);
      this.sendChangeOrderState = 'success';
      setState('ui.changeOrderLifecycle.action.sendChangeOrder.status', 'success');
    } else {
      this.OutputSendChangeOrder = null;
      setState('ui.changeOrderLifecycle.output.sendChangeOrder', null);
      this.sendChangeOrderState = 'error';
      setState('ui.changeOrderLifecycle.action.sendChangeOrder.status', 'error');
      if (response.error) {
        console.error('[sendChangeOrder] error:', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleSendChangeOrderClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.sendChangeOrder();
    }, { mode: 'blocking' });
  }

  // --- Lifecycle ---

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize state from global state, falling back to defaults
    const savedStatus = getState('ui.changeOrderLifecycle.status');
    this.status = savedStatus !== undefined ? savedStatus : '';

    const savedCreateStatus = getState('ui.changeOrderLifecycle.action.createChangeOrder.status');
    this.createChangeOrderState = savedCreateStatus !== undefined ? savedCreateStatus : 'idle';

    const savedSendStatus = getState('ui.changeOrderLifecycle.action.sendChangeOrder.status');
    this.sendChangeOrderState = savedSendStatus !== undefined ? savedSendStatus : 'idle';

    // Parse route params and populate projectId
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId) {
      const savedProjectId = getState('ui.changeOrderLifecycle.input.createChangeOrder.projectId');
      if (savedProjectId) {
        this.createChangeOrderProjectId = savedProjectId;
      } else {
        this.setCreateChangeOrderProjectId(routeParams.projectId);
      }
    } else {
      const savedProjectId = getState('ui.changeOrderLifecycle.input.createChangeOrder.projectId');
      this.createChangeOrderProjectId = savedProjectId !== undefined ? savedProjectId : '';
    }

    // Initialize other input states from global state
    const savedTitle = getState('ui.changeOrderLifecycle.input.createChangeOrder.title');
    this.createChangeOrderTitle = savedTitle !== undefined ? savedTitle : '';

    const savedScope = getState('ui.changeOrderLifecycle.input.createChangeOrder.scopeDescription');
    this.createChangeOrderScopeDescription = savedScope !== undefined ? savedScope : '';

    const savedAmount = getState('ui.changeOrderLifecycle.input.createChangeOrder.amount');
    this.createChangeOrderAmount = savedAmount !== undefined ? savedAmount : '';

    const savedChangeOrderId = getState('ui.changeOrderLifecycle.input.sendChangeOrder.changeOrderId');
    this.sendChangeOrderChangeOrderId = savedChangeOrderId !== undefined ? savedChangeOrderId : '';

    // Initialize output states from global state
    const savedOutputCreate = getState('ui.changeOrderLifecycle.output.createChangeOrder');
    this.OutputCreateChangeOrder = savedOutputCreate !== undefined ? savedOutputCreate as BuildFlowFsmCreateChangeOrderOutput : null;

    const savedOutputSend = getState('ui.changeOrderLifecycle.output.sendChangeOrder');
    this.OutputSendChangeOrder = savedOutputSend !== undefined ? savedOutputSend as BuildFlowFsmSendChangeOrderOutput : null;

    // Initialize layout states from global state
    const savedColListTitle = getState('ui.changeOrderLifecycle.layout.col_list_title');
    this.LayoutColListTitle = savedColListTitle !== undefined ? savedColListTitle : '';

    const savedColListAmount = getState('ui.changeOrderLifecycle.layout.col_list_amount');
    this.LayoutColListAmount = savedColListAmount !== undefined ? savedColListAmount : '';

    const savedColListStatus = getState('ui.changeOrderLifecycle.layout.col_list_status');
    this.LayoutColListStatus = savedColListStatus !== undefined ? savedColListStatus : '';

    const savedColListCreatedAt = getState('ui.changeOrderLifecycle.layout.col_list_createdAt');
    this.LayoutColListCreatedAt = savedColListCreatedAt !== undefined ? savedColListCreatedAt : '';

    const savedFltListStatus = getState('ui.changeOrderLifecycle.layout.flt_list_status');
    this.LayoutFltListStatus = savedFltListStatus !== undefined ? savedFltListStatus : '';

    // No initialLoads defined — nothing to run on connect
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }
}
