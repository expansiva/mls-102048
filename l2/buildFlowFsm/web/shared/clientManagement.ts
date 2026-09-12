/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmBrowseClientsInput,
  BuildFlowFsmBrowseClientsOutput,
  BuildFlowFsmCreateClientInput,
  BuildFlowFsmCreateClientOutput,
  BuildFlowFsmUpdateClientInput,
  BuildFlowFsmUpdateClientOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/clientManagement.js';

/// **collab_i18n_start**
const message_en = {
  "page.title": "Client Management",
  "section.clientManagement": "Client Management",
  "section.clientSummary": "Client Summary",
  "intention.queryList.title": "Browse Clients",
  "intention.createForm.title": "Create Client",
  "intention.updateForm.title": "Edit Client",
  "intention.summary.title": "Client Details",
  "column.clientId": "Client ID",
  "column.name": "Name",
  "column.companyName": "Company",
  "column.email": "Email",
  "column.phone": "Phone",
  "column.portalAccessEnabled": "Portal Access",
  "column.createdAt": "Created",
  "filter.searchName": "Search by name",
  "filter.filterPortalAccess": "Portal access only",
  "field.name": "Contact name",
  "field.companyName": "Company name",
  "field.email": "Email",
  "field.phone": "Phone",
  "field.portalAccessEnabled": "Enable portal access",
  "field.billingAddress": "Billing address",
  "field.clientId": "Client ID",
  "field.createdAt": "Created at",
  "field.updatedAt": "Updated at",
  "action.createClient": "Add Client",
  "action.updateClient": "Edit",
  "action.browseClients": "Search",
  "empty.clientList": "No clients found. Adjust your filters or create a new client.",
  "empty.createForm": "Fill in the client details to create a new record.",
  "empty.updateForm": "Select a client from the list to edit their details.",
  "empty.summary": "Select a client to view their details.",
  "org.clientList.title": "Browse, filter and select clients from a paginated table; create new clients via toolbar; edit existing clients via row action",
  "org.clientSummary.title": "Review the selected client's details and the result of the last create or update action"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmClientManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) browseClientsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: String }) browseClientsSearchName: string = '';
  @property({ type: String }) browseClientsFilterPortalAccess: string = '';
  @property({ type: Object }) browseClientsData: BuildFlowFsmBrowseClientsOutput = { items: [], total: 0 };

  @property({ type: String }) createClientState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: String }) createClientName: string = '';
  @property({ type: String }) createClientCompanyName: string = '';
  @property({ type: String }) createClientEmail: string = '';
  @property({ type: String }) createClientPhone: string = '';
  @property({ type: String }) createClientPortalAccessEnabled: string = '';
  @property({ type: String }) createClientBillingAddress: string = '';

  @property({ type: String }) updateClientState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @property({ type: String }) updateClientClientId: string = '';
  @property({ type: String }) updateClientName: string = '';
  @property({ type: String }) updateClientCompanyName: string = '';
  @property({ type: String }) updateClientEmail: string = '';
  @property({ type: String }) updateClientPhone: string = '';
  @property({ type: String }) updateClientPortalAccessEnabled: string = '';
  @property({ type: String }) updateClientBillingAddress: string = '';

  @property({ type: Object }) OutputCreateClient: BuildFlowFsmCreateClientOutput | null = null;
  @property({ type: Object }) OutputUpdateClient: BuildFlowFsmUpdateClientOutput | null = null;

  @property({ type: String }) LayoutFldSumBillingAddress: string = '';
  @property({ type: String }) LayoutFldSumUpdatedAt: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  /* ── Query: browseClients ── */

  async loadBrowseClients(): Promise<void> {
    this.browseClientsState = 'loading';
    setState('ui.clientManagement.action.browseClients.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmBrowseClientsInput = {
      searchName: this.browseClientsSearchName || undefined,
      filterPortalAccess: this.browseClientsFilterPortalAccess === 'true' ? true : undefined,
    };

    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<BuildFlowFsmBrowseClientsOutput>(
      'buildFlowFsm.browseClients.browseClients',
      params,
      options,
    );

    if (response.ok) {
      this.browseClientsData = response.data ?? { items: [], total: 0 };
      setState('ui.clientManagement.data.browseClients', this.browseClientsData);
      this.browseClientsState = 'success';
      setState('ui.clientManagement.action.browseClients.status', 'success');
    } else {
      this.browseClientsData = { items: [], total: 0 };
      setState('ui.clientManagement.data.browseClients', this.browseClientsData);
      this.browseClientsState = 'error';
      setState('ui.clientManagement.action.browseClients.status', 'error');
      if (response.error) {
        console.error('[browseClients]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleBrowseClientsClick(): void {
    this.loadBrowseClients();
  }

  /* ── Command: createClient ── */

  async createClient(): Promise<void> {
    this.createClientState = 'loading';
    setState('ui.clientManagement.action.createClient.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmCreateClientInput = {
      name: this.createClientName,
      companyName: this.createClientCompanyName || undefined,
      email: this.createClientEmail,
      phone: this.createClientPhone || undefined,
      portalAccessEnabled: this.createClientPortalAccessEnabled === 'true',
      billingAddress: this.createClientBillingAddress || undefined,
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<BuildFlowFsmCreateClientOutput>(
      'buildFlowFsm.createClient.createClient',
      params,
      options,
    );

    if (response.ok) {
      this.OutputCreateClient = response.data ?? null;
      setState('ui.clientManagement.output.createClient', this.OutputCreateClient);
      // Refresh browseClients
      await this.loadBrowseClients();
      if (this.browseClientsState === 'error') {
        this.createClientState = 'error';
        setState('ui.clientManagement.action.createClient.status', 'error');
      } else {
        this.createClientState = 'success';
        setState('ui.clientManagement.action.createClient.status', 'success');
      }
    } else {
      this.createClientState = 'error';
      setState('ui.clientManagement.action.createClient.status', 'error');
      if (response.error) {
        console.error('[createClient]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  async handleCreateClientClick(): Promise<void> {
    await runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createClient();
    }, { mode: 'blocking' });
  }

  /* ── Command: updateClient ── */

  async updateClient(): Promise<void> {
    if (!this.updateClientClientId) {
      this.updateClientState = 'idle';
      setState('ui.clientManagement.action.updateClient.status', 'idle');
      this.requestUpdate();
      return;
    }

    this.updateClientState = 'loading';
    setState('ui.clientManagement.action.updateClient.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmUpdateClientInput = {
      clientId: this.updateClientClientId,
      name: this.updateClientName,
      companyName: this.updateClientCompanyName || undefined,
      email: this.updateClientEmail,
      phone: this.updateClientPhone || undefined,
      portalAccessEnabled: this.updateClientPortalAccessEnabled === 'true',
      billingAddress: this.updateClientBillingAddress || undefined,
    };

    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<BuildFlowFsmUpdateClientOutput>(
      'buildFlowFsm.updateClient.updateClient',
      params,
      options,
    );

    if (response.ok) {
      this.OutputUpdateClient = response.data ?? null;
      setState('ui.clientManagement.output.updateClient', this.OutputUpdateClient);
      // Refresh browseClients
      await this.loadBrowseClients();
      if (this.browseClientsState === 'error') {
        this.updateClientState = 'error';
        setState('ui.clientManagement.action.updateClient.status', 'error');
      } else {
        this.updateClientState = 'success';
        setState('ui.clientManagement.action.updateClient.status', 'success');
      }
    } else {
      this.updateClientState = 'error';
      setState('ui.clientManagement.action.updateClient.status', 'error');
      if (response.error) {
        console.error('[updateClient]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  async handleUpdateClientClick(): Promise<void> {
    await runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateClient();
    }, { mode: 'blocking' });
  }

  /* ── State setters: browseClients inputs ── */

  setBrowseClientsSearchName(value: string): void {
    this.browseClientsSearchName = value;
    setState('ui.clientManagement.input.browseClients.searchName', value);
    this.requestUpdate();
  }

  handleBrowseClientsSearchNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setBrowseClientsSearchName(target.value);
  }

  setBrowseClientsFilterPortalAccess(value: string): void {
    this.browseClientsFilterPortalAccess = value;
    setState('ui.clientManagement.input.browseClients.filterPortalAccess', value);
    this.requestUpdate();
  }

  handleBrowseClientsFilterPortalAccessChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? String(target.checked) : target.value;
    this.setBrowseClientsFilterPortalAccess(value);
  }

  /* ── State setters: createClient inputs ── */

  setCreateClientName(value: string): void {
    this.createClientName = value;
    setState('ui.clientManagement.input.createClient.name', value);
    this.requestUpdate();
  }

  handleCreateClientNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateClientName(target.value);
  }

  setCreateClientCompanyName(value: string): void {
    this.createClientCompanyName = value;
    setState('ui.clientManagement.input.createClient.companyName', value);
    this.requestUpdate();
  }

  handleCreateClientCompanyNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateClientCompanyName(target.value);
  }

  setCreateClientEmail(value: string): void {
    this.createClientEmail = value;
    setState('ui.clientManagement.input.createClient.email', value);
    this.requestUpdate();
  }

  handleCreateClientEmailChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateClientEmail(target.value);
  }

  setCreateClientPhone(value: string): void {
    this.createClientPhone = value;
    setState('ui.clientManagement.input.createClient.phone', value);
    this.requestUpdate();
  }

  handleCreateClientPhoneChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateClientPhone(target.value);
  }

  setCreateClientPortalAccessEnabled(value: string): void {
    this.createClientPortalAccessEnabled = value;
    setState('ui.clientManagement.input.createClient.portalAccessEnabled', value);
    this.requestUpdate();
  }

  handleCreateClientPortalAccessEnabledChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? String(target.checked) : target.value;
    this.setCreateClientPortalAccessEnabled(value);
  }

  setCreateClientBillingAddress(value: string): void {
    this.createClientBillingAddress = value;
    setState('ui.clientManagement.input.createClient.billingAddress', value);
    this.requestUpdate();
  }

  handleCreateClientBillingAddressChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setCreateClientBillingAddress(target.value);
  }

  /* ── State setters: updateClient inputs ── */

  setUpdateClientClientId(value: string): void {
    this.updateClientClientId = value;
    setState('ui.clientManagement.input.updateClient.clientId', value);
    this.requestUpdate();
  }

  handleUpdateClientClientIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateClientClientId(target.value);
  }

  setUpdateClientName(value: string): void {
    this.updateClientName = value;
    setState('ui.clientManagement.input.updateClient.name', value);
    this.requestUpdate();
  }

  handleUpdateClientNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateClientName(target.value);
  }

  setUpdateClientCompanyName(value: string): void {
    this.updateClientCompanyName = value;
    setState('ui.clientManagement.input.updateClient.companyName', value);
    this.requestUpdate();
  }

  handleUpdateClientCompanyNameChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateClientCompanyName(target.value);
  }

  setUpdateClientEmail(value: string): void {
    this.updateClientEmail = value;
    setState('ui.clientManagement.input.updateClient.email', value);
    this.requestUpdate();
  }

  handleUpdateClientEmailChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateClientEmail(target.value);
  }

  setUpdateClientPhone(value: string): void {
    this.updateClientPhone = value;
    setState('ui.clientManagement.input.updateClient.phone', value);
    this.requestUpdate();
  }

  handleUpdateClientPhoneChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateClientPhone(target.value);
  }

  setUpdateClientPortalAccessEnabled(value: string): void {
    this.updateClientPortalAccessEnabled = value;
    setState('ui.clientManagement.input.updateClient.portalAccessEnabled', value);
    this.requestUpdate();
  }

  handleUpdateClientPortalAccessEnabledChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? String(target.checked) : target.value;
    this.setUpdateClientPortalAccessEnabled(value);
  }

  setUpdateClientBillingAddress(value: string): void {
    this.updateClientBillingAddress = value;
    setState('ui.clientManagement.input.updateClient.billingAddress', value);
    this.requestUpdate();
  }

  handleUpdateClientBillingAddressChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setUpdateClientBillingAddress(target.value);
  }

  /* ── Lifecycle ── */

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize contextual/selected-entity states from global state
    const savedClientId = getState('ui.clientManagement.input.updateClient.clientId') as string | undefined;
    if (savedClientId) {
      this.updateClientClientId = savedClientId;
    }

    const savedLayoutBillingAddress = getState('ui.clientManagement.layout.fld-sum-billingAddress') as string | undefined;
    if (savedLayoutBillingAddress) {
      this.LayoutFldSumBillingAddress = savedLayoutBillingAddress;
    }

    const savedLayoutUpdatedAt = getState('ui.clientManagement.layout.fld-sum-updatedAt') as string | undefined;
    if (savedLayoutUpdatedAt) {
      this.LayoutFldSumUpdatedAt = savedLayoutUpdatedAt;
    }

    // Run initial loads
    this.loadBrowseClients();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }
}
