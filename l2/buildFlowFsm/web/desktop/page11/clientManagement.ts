/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmClientManagementBase } from '/_102048_/l2/buildFlowFsm/web/shared/clientManagement.js';
import type { BuildFlowFsmBrowseClientsOutputItem } from '/_102048_/l2/buildFlowFsm/web/contracts/clientManagement.js';

@customElement('build-flow-fsm--web--desktop--page11--client-management-102048')
export class BuildFlowFsmDesktopPage11ClientManagementPage extends BuildFlowFsmClientManagementBase {
  render() {
    const items: BuildFlowFsmBrowseClientsOutputItem[] = this.browseClientsData?.items ?? [];
    const hasSelected: boolean = this.updateClientClientId !== '';
    const selectedItem: BuildFlowFsmBrowseClientsOutputItem | undefined = hasSelected
      ? items.find((item: BuildFlowFsmBrowseClientsOutputItem) => item.clientId === this.updateClientClientId)
      : undefined;

    return html`
      <div class="min-h-full bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <!-- Header -->
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#0f172a)]">
            ${this.msg['page.title']}
          </h1>

          <!-- Section: Client Management -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-6">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.clientManagement']}
            </h2>

            <!-- Organism: ClientList -->
            <div class="space-y-6">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['org.clientList.title']}
              </h3>

              <!-- Intention: queryList -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['intention.queryList.title']}
                </h4>

                <!-- Filters + Toolbar -->
                <div class="flex flex-wrap items-end gap-4">
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="flt-searchName">
                      ${this.msg['filter.searchName']}
                    </label>
                    <input
                      id="flt-searchName"
                      type="text"
                      .value="${this.browseClientsSearchName}"
                      @input="${(e: Event) => this.handleBrowseClientsSearchNameChange(e)}"
                      class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    />
                  </div>
                  <div class="flex items-center gap-2">
                    <input
                      id="flt-filterPortalAccess"
                      type="checkbox"
                      .checked="${this.browseClientsFilterPortalAccess === 'true'}"
                      @change="${(e: Event) => this.handleBrowseClientsFilterPortalAccessChange(e)}"
                      class="rounded border-[var(--grey-color,#e2e8f0)]"
                    />
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="flt-filterPortalAccess">
                      ${this.msg['filter.filterPortalAccess']}
                    </label>
                  </div>
                  <button
                    type="button"
                    @click="${() => this.handleBrowseClientsClick()}"
                    class="rounded px-4 py-1.5 text-sm font-medium text-[var(--text-primary-color,#0f172a)] border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color,#e6e6e6)] hover:bg-[var(--bg-secondary-color-hover,#d9d9d9)]"
                  >
                    ${this.msg['action.browseClients']}
                  </button>
                  <button
                    type="button"
                    @click="${() => this.handleCreateClientClick()}"
                    class="rounded px-4 py-1.5 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)]"
                  >
                    ${this.msg['action.createClient']}
                  </button>
                </div>

                <!-- Table -->
                ${items.length > 0
                  ? html`
                      <div class="overflow-x-auto">
                        <table class="w-full text-sm border-collapse">
                          <thead>
                            <tr class="border-b border-[var(--grey-color,#e2e8f0)] text-left">
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.clientId']}</th>
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.name']}</th>
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.companyName']}</th>
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.email']}</th>
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.phone']}</th>
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.portalAccessEnabled']}</th>
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]">${this.msg['column.createdAt']}</th>
                              <th class="py-2 px-3 font-medium text-[var(--text-primary-color,#0f172a)]"></th>
                            </tr>
                          </thead>
                          <tbody>
                            ${items.map((item: BuildFlowFsmBrowseClientsOutputItem) => html`
                              <tr class="border-b border-[var(--grey-color,#e2e8f0)] hover:bg-[var(--bg-primary-color-hover,#f2f2f2)]">
                                <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.clientId}</td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.name}</td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.companyName || '—'}</td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.email}</td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.phone || '—'}</td>
                                <td class="py-2 px-3">
                                  ${item.portalAccessEnabled
                                    ? html`<span class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-[var(--success-color,#52C41A)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">✓</span>`
                                    : html`<span class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-[var(--text-primary-color-disabled,#525151)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)]">—</span>`}
                                </td>
                                <td class="py-2 px-3 text-[var(--text-primary-color,#0f172a)]">${item.createdAt}</td>
                                <td class="py-2 px-3">
                                  <button
                                    type="button"
                                    @click="${() => {
                                      this.setUpdateClientClientId(item.clientId);
                                      this.setUpdateClientName(item.name);
                                      this.setUpdateClientCompanyName(item.companyName || '');
                                      this.setUpdateClientEmail(item.email);
                                      this.setUpdateClientPhone(item.phone || '');
                                      this.setUpdateClientPortalAccessEnabled(String(item.portalAccessEnabled));
                                    }}"
                                    class="rounded px-3 py-1 text-xs font-medium text-[var(--active-color,#1890FF)] border border-[var(--grey-color,#e2e8f0)] hover:bg-[var(--bg-secondary-color,#e6e6e6)]"
                                  >
                                    ${this.msg['action.updateClient']}
                                  </button>
                                </td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      </div>
                    `
                  : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-4">${this.msg['empty.clientList']}</p>`}
              </div>

              <!-- Intention: createForm -->
              <div class="space-y-4 border-t border-[var(--grey-color,#e2e8f0)] pt-6">
                <h4 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['intention.createForm.title']}
                </h4>
                <p class="text-xs text-[var(--text-primary-color-disabled,#525151)]">${this.msg['empty.createForm']}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="create-name">
                      ${this.msg['field.name']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                    </label>
                    <input
                      id="create-name"
                      type="text"
                      .value="${this.createClientName}"
                      @input="${(e: Event) => this.handleCreateClientNameChange(e)}"
                      class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="create-email">
                      ${this.msg['field.email']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                    </label>
                    <input
                      id="create-email"
                      type="email"
                      .value="${this.createClientEmail}"
                      @input="${(e: Event) => this.handleCreateClientEmailChange(e)}"
                      class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="create-companyName">
                      ${this.msg['field.companyName']}
                    </label>
                    <input
                      id="create-companyName"
                      type="text"
                      .value="${this.createClientCompanyName}"
                      @input="${(e: Event) => this.handleCreateClientCompanyNameChange(e)}"
                      class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="create-phone">
                      ${this.msg['field.phone']}
                    </label>
                    <input
                      id="create-phone"
                      type="tel"
                      .value="${this.createClientPhone}"
                      @input="${(e: Event) => this.handleCreateClientPhoneChange(e)}"
                      class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    />
                  </div>
                  <div class="flex items-center gap-2 sm:col-span-2">
                    <input
                      id="create-portalAccess"
                      type="checkbox"
                      .checked="${this.createClientPortalAccessEnabled === 'true'}"
                      @change="${(e: Event) => this.handleCreateClientPortalAccessEnabledChange(e)}"
                      class="rounded border-[var(--grey-color,#e2e8f0)]"
                    />
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="create-portalAccess">
                      ${this.msg['field.portalAccessEnabled']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                    </label>
                  </div>
                  <div class="flex flex-col gap-1 sm:col-span-2">
                    <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="create-billingAddress">
                      ${this.msg['field.billingAddress']}
                    </label>
                    <textarea
                      id="create-billingAddress"
                      .value="${this.createClientBillingAddress}"
                      @input="${(e: Event) => this.handleCreateClientBillingAddressChange(e)}"
                      rows="2"
                      class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    @click="${() => this.handleCreateClientClick()}"
                    ?disabled="${this.createClientState === 'loading'}"
                    class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                  >
                    ${this.msg['action.createClient']}
                  </button>
                </div>
              </div>

              <!-- Intention: updateForm -->
              <div class="space-y-4 border-t border-[var(--grey-color,#e2e8f0)] pt-6">
                <h4 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
                  ${this.msg['intention.updateForm.title']}
                </h4>
                ${hasSelected
                  ? html`
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="hidden" .value="${this.updateClientClientId}" />
                        <div class="flex flex-col gap-1">
                          <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="update-clientId">
                            ${this.msg['field.clientId']}
                          </label>
                          <input
                            id="update-clientId"
                            type="text"
                            .value="${this.updateClientClientId}"
                            readonly
                            class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-secondary-color-lighter,#f9f9f9)] px-3 py-1.5 text-sm text-[var(--text-primary-color-disabled,#525151)]"
                          />
                        </div>
                        <div class="flex flex-col gap-1">
                          <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="update-name">
                            ${this.msg['field.name']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                          </label>
                          <input
                            id="update-name"
                            type="text"
                            .value="${this.updateClientName}"
                            @input="${(e: Event) => this.handleUpdateClientNameChange(e)}"
                            class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                          />
                        </div>
                        <div class="flex flex-col gap-1">
                          <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="update-email">
                            ${this.msg['field.email']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                          </label>
                          <input
                            id="update-email"
                            type="email"
                            .value="${this.updateClientEmail}"
                            @input="${(e: Event) => this.handleUpdateClientEmailChange(e)}"
                            class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                          />
                        </div>
                        <div class="flex flex-col gap-1">
                          <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="update-companyName">
                            ${this.msg['field.companyName']}
                          </label>
                          <input
                            id="update-companyName"
                            type="text"
                            .value="${this.updateClientCompanyName}"
                            @input="${(e: Event) => this.handleUpdateClientCompanyNameChange(e)}"
                            class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                          />
                        </div>
                        <div class="flex flex-col gap-1">
                          <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="update-phone">
                            ${this.msg['field.phone']}
                          </label>
                          <input
                            id="update-phone"
                            type="tel"
                            .value="${this.updateClientPhone}"
                            @input="${(e: Event) => this.handleUpdateClientPhoneChange(e)}"
                            class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                          />
                        </div>
                        <div class="flex items-center gap-2 sm:col-span-2">
                          <input
                            id="update-portalAccess"
                            type="checkbox"
                            .checked="${this.updateClientPortalAccessEnabled === 'true'}"
                            @change="${(e: Event) => this.handleUpdateClientPortalAccessEnabledChange(e)}"
                            class="rounded border-[var(--grey-color,#e2e8f0)]"
                          />
                          <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="update-portalAccess">
                            ${this.msg['field.portalAccessEnabled']} <span class="text-[var(--error-color,#FF4D4F)]">*</span>
                          </label>
                        </div>
                        <div class="flex flex-col gap-1 sm:col-span-2">
                          <label class="text-xs text-[var(--text-primary-color,#0f172a)]" for="update-billingAddress">
                            ${this.msg['field.billingAddress']}
                          </label>
                          <textarea
                            id="update-billingAddress"
                            .value="${this.updateClientBillingAddress}"
                            @input="${(e: Event) => this.handleUpdateClientBillingAddressChange(e)}"
                            rows="2"
                            class="rounded border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] px-3 py-1.5 text-sm text-[var(--text-primary-color,#0f172a)] focus:outline-none focus:ring-1 focus:ring-[var(--active-color,#1890FF)]"
                          ></textarea>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          @click="${() => this.handleUpdateClientClick()}"
                          ?disabled="${this.updateClientState === 'loading'}"
                          class="rounded px-4 py-2 text-sm font-medium text-white bg-[var(--active-color,#1890FF)] hover:bg-[var(--active-color-hover,#1a99ff)] disabled:opacity-50"
                        >
                          ${this.msg['action.updateClient']}
                        </button>
                      </div>
                    `
                  : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-2">${this.msg['empty.updateForm']}</p>`}
              </div>
            </div>
          </section>

          <!-- Section: Client Summary -->
          <section class="rounded-lg border border-[var(--grey-color,#e2e8f0)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-primary-color,#0f172a)]">
              ${this.msg['section.clientSummary']}
            </h2>
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['org.clientSummary.title']}
              </h3>
              <h4 class="text-sm font-semibold text-[var(--text-primary-color,#0f172a)]">
                ${this.msg['intention.summary.title']}
              </h4>
              ${selectedItem
                ? html`
                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.clientId']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${selectedItem.clientId}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.name']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${selectedItem.name}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.companyName']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${selectedItem.companyName || '—'}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.email']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${selectedItem.email}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.phone']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${selectedItem.phone || '—'}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.portalAccessEnabled']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${selectedItem.portalAccessEnabled ? '✓' : '—'}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.billingAddress']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldSumBillingAddress || '—'}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.createdAt']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${selectedItem.createdAt}</dd>
                      </div>
                      <div class="flex flex-col gap-0.5">
                        <dt class="text-xs font-medium text-[var(--text-primary-color-disabled,#525151)]">${this.msg['field.updatedAt']}</dt>
                        <dd class="text-sm text-[var(--text-primary-color,#0f172a)]">${this.LayoutFldSumUpdatedAt || '—'}</dd>
                      </div>
                    </dl>
                  `
                : html`<p class="text-sm text-[var(--text-primary-color-disabled,#525151)] py-2">${this.msg['empty.summary']}</p>`}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
