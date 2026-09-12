/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/clientInvoiceView.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BuildFlowFsmClientInvoiceViewBase } from '/_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.js';

@customElement('build-flow-fsm--web--desktop--page11--client-invoice-view-102048')
export class BuildFlowFsmDesktopPage11ClientInvoiceViewPage extends BuildFlowFsmClientInvoiceViewBase {
  render() {
    const data = this.viewInvoiceData;
    const loading = this.viewInvoiceState === 'loading';
    const hasError = this.viewInvoiceState === 'error';

    return html`
      <div class="min-h-full bg-[var(--bg-primary-color,#ffffff)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <h1 class="text-2xl font-bold text-[var(--text-primary-color,#403f3f)]">
            ${this.msg['section.invoiceReview']}
          </h1>

          ${loading
            ? html`<div
                 class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-6"
               >
                 <!-- TODO: no loading msg key in shared i18n -->
                 <p class="text-[var(--text-primary-color,#403f3f)]">Loading…</p>
               </div>`
            : ''}

          ${hasError
            ? html`<div
                 class="rounded-lg border border-[var(--error-color,#FF4D4F)] bg-[var(--bg-primary-color,#ffffff)] p-6"
               >
                 <!-- TODO: no error msg key in shared i18n -->
                 <p class="text-[var(--error-color,#FF4D4F)]">Failed to load invoice.</p>
               </div>`
            : ''}

          ${!loading && !hasError && !data
            ? html`<div
                 class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-6"
               >
                 <p class="text-[var(--text-primary-color,#403f3f)]">
                   ${this.msg['empty.invoiceHeader']}
                 </p>
               </div>`
            : ''}

          ${data
            ? html`
                <!-- Invoice Header -->
                <div
                  class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
                >
                  <h2
                    class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['organism.invoiceHeader.title']}
                  </h2>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.invoiceId']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >${data.invoiceId}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.status']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >${data.status === 'draft'
                          ? this.msg['status.draft']
                          : data.status === 'issued'
                            ? this.msg['status.issued']
                            : data.status === 'voided'
                              ? this.msg['status.voided']
                              : data.status}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.issuedAt']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >${data.issuedAt
                          ? new Date(data.issuedAt).toLocaleDateString()
                          : '—'}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.clientEmail']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >${data.clientEmail || '—'}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.projectId']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >${data.projectId || '—'}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.notes']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >${data.notes || '—'}</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Invoice Line Items -->
                <div
                  class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
                >
                  <h2
                    class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['organism.invoiceLineItems.title']}
                  </h2>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead>
                        <tr class="border-b border-[var(--grey-color,#E6E6E6)]">
                          <th
                            class="text-left py-2 px-3 text-[var(--text-primary-color-lighter,#535353)] font-medium"
                          >
                            ${this.msg['column.lineType']}
                          </th>
                          <th
                            class="text-left py-2 px-3 text-[var(--text-primary-color-lighter,#535353)] font-medium"
                          >
                            ${this.msg['column.description']}
                          </th>
                          <th
                            class="text-right py-2 px-3 text-[var(--text-primary-color-lighter,#535353)] font-medium"
                          >
                            ${this.msg['column.quantity']}
                          </th>
                          <th
                            class="text-left py-2 px-3 text-[var(--text-primary-color-lighter,#535353)] font-medium"
                          >
                            ${this.msg['column.unit']}
                          </th>
                          <th
                            class="text-right py-2 px-3 text-[var(--text-primary-color-lighter,#535353)] font-medium"
                          >
                            ${this.msg['column.unitCost']}
                          </th>
                          <th
                            class="text-right py-2 px-3 text-[var(--text-primary-color-lighter,#535353)] font-medium"
                          >
                            ${this.msg['column.lineAmount']}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colspan="6"
                            class="py-6 text-center text-[var(--text-primary-color-lighter,#535353)]"
                          >
                            ${this.msg['empty.invoiceLineItems']}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Invoice Summary -->
                <div
                  class="rounded-lg border border-[var(--grey-color,#E6E6E6)] bg-[var(--bg-primary-color,#ffffff)] p-6 space-y-4"
                >
                  <h2
                    class="text-lg font-semibold text-[var(--text-primary-color,#403f3f)]"
                  >
                    ${this.msg['organism.invoiceSummary.title']}
                  </h2>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.laborCost']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >$${data.laborCost.toFixed(2)}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.materialCost']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >$${data.materialCost.toFixed(2)}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.changeOrderAmount']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >$${data.changeOrderAmount.toFixed(2)}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.totalAmount']}</span
                      >
                      <span
                        class="text-lg font-bold text-[var(--text-primary-color,#403f3f)]"
                        >$${data.totalAmount.toFixed(2)}</span
                      >
                    </div>
                    <div>
                      <span
                        class="block text-sm text-[var(--text-primary-color-lighter,#535353)]"
                        >${this.msg['field.currency']}</span
                      >
                      <span class="text-[var(--text-primary-color,#403f3f)]"
                        >${data.currency.toUpperCase()}</span
                      >
                    </div>
                  </div>
                  <p
                    class="text-sm text-[var(--text-primary-color-lighter,#535353)] italic"
                  >
                    ${this.msg['hint.usdNoTax']}
                  </p>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}
