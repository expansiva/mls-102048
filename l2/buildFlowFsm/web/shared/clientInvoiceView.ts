/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmViewInvoiceInput,
  BuildFlowFsmViewInvoiceOutput,
  BuildFlowFsmViewInvoiceOutputItem,
} from '/_102048_/l2/buildFlowFsm/web/contracts/clientInvoiceView.js';

/// **collab_i18n_start**
const message_en = {
  "section.invoiceReview": "Invoice Review",
  "organism.invoiceHeader.title": "Invoice Details",
  "organism.invoiceLineItems.title": "Cost Breakdown",
  "organism.invoiceSummary.title": "Invoice Summary",
  "field.invoiceId": "Invoice ID",
  "field.status": "Status",
  "field.issuedAt": "Issued Date",
  "field.clientEmail": "Client Email",
  "field.projectId": "Project",
  "field.notes": "Notes",
  "field.laborCost": "Labor Cost",
  "field.materialCost": "Material Cost",
  "field.changeOrderAmount": "Approved Change Orders",
  "field.totalAmount": "Total Amount",
  "field.currency": "Currency",
  "column.lineType": "Type",
  "column.description": "Description",
  "column.quantity": "Quantity",
  "column.unit": "Unit",
  "column.unitCost": "Unit Cost",
  "column.lineAmount": "Line Amount",
  "empty.invoiceHeader": "No invoice loaded. Please open the invoice through the shareable link you received.",
  "empty.invoiceLineItems": "No line items found for this invoice.",
  "empty.invoiceSummary": "Invoice summary is not available.",
  "hint.usdNoTax": "All figures are in USD. No tax is applied.",
  "status.draft": "Draft",
  "status.issued": "Issued",
  "status.voided": "Voided",
  "lineType.labor": "Labor",
  "lineType.material": "Material",
  "lineType.changeOrder": "Change Order",
  "unit.hour": "Hour",
  "unit.unit": "Unit",
  "unit.lumpSum": "Lump Sum",
  "org.invoice.header.title": "Load invoice by ID from the shareable link and display invoice header information including status, issue date, and recipient",
  "org.invoice.line.items.title": "Display the itemized cost breakdown as a master list of invoice line items: labor, material, and approved change order amounts",
  "org.invoice.summary.title": "Display the total amount and cost category subtotals, confirming all figures are in USD with no tax line"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmClientInvoiceViewBase extends CollabLitElement {
  @property({ type: String }) status: string = "";
  @property({ type: String }) viewInvoiceState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) viewInvoiceInvoiceId: string = "";
  @property({ type: Object }) viewInvoiceData: BuildFlowFsmViewInvoiceOutput | null = null;
  @property({ type: String }) LayoutColLineType: string = "";
  @property({ type: String }) LayoutColDescription: string = "";
  @property({ type: String }) LayoutColQuantity: string = "";
  @property({ type: String }) LayoutColUnit: string = "";
  @property({ type: String }) LayoutColUnitCost: string = "";
  @property({ type: String }) LayoutColLineAmount: string = "";

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  private subscribedKeys: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();

    const sharedKeys = [
      "ui.clientInvoiceView.status",
      "ui.clientInvoiceView.action.viewInvoice.status",
      "ui.clientInvoiceView.input.viewInvoice.invoiceId",
      "ui.clientInvoiceView.data.viewInvoice",
      "ui.clientInvoiceView.layout.col_line_type",
      "ui.clientInvoiceView.layout.col_description",
      "ui.clientInvoiceView.layout.col_quantity",
      "ui.clientInvoiceView.layout.col_unit",
      "ui.clientInvoiceView.layout.col_unit_cost",
      "ui.clientInvoiceView.layout.col_line_amount",
    ];

    for (const key of sharedKeys) {
      const existing = getState(key);
      if (existing !== undefined && existing !== null) {
        if (key === "ui.clientInvoiceView.status") this.status = existing as string;
        else if (key === "ui.clientInvoiceView.action.viewInvoice.status") this.viewInvoiceState = existing as "idle" | "loading" | "success" | "error";
        else if (key === "ui.clientInvoiceView.input.viewInvoice.invoiceId") this.viewInvoiceInvoiceId = existing as string;
        else if (key === "ui.clientInvoiceView.data.viewInvoice") this.viewInvoiceData = existing as BuildFlowFsmViewInvoiceOutput;
        else if (key === "ui.clientInvoiceView.layout.col_line_type") this.LayoutColLineType = existing as string;
        else if (key === "ui.clientInvoiceView.layout.col_description") this.LayoutColDescription = existing as string;
        else if (key === "ui.clientInvoiceView.layout.col_quantity") this.LayoutColQuantity = existing as string;
        else if (key === "ui.clientInvoiceView.layout.col_unit") this.LayoutColUnit = existing as string;
        else if (key === "ui.clientInvoiceView.layout.col_unit_cost") this.LayoutColUnitCost = existing as string;
        else if (key === "ui.clientInvoiceView.layout.col_line_amount") this.LayoutColLineAmount = existing as string;
      }
    }

    subscribe(sharedKeys, this);
    this.subscribedKeys = sharedKeys;

    this.loadViewInvoice();
  }

  disconnectedCallback(): void {
    if (this.subscribedKeys.length > 0) {
      unsubscribe(this.subscribedKeys, this);
      this.subscribedKeys = [];
    }
    super.disconnectedCallback();
  }

  handleIcaStateChange(key: string, value: unknown): void {
    if (key === "ui.clientInvoiceView.status") this.status = (value as string) ?? "";
    else if (key === "ui.clientInvoiceView.action.viewInvoice.status") this.viewInvoiceState = (value as "idle" | "loading" | "success" | "error") ?? "idle";
    else if (key === "ui.clientInvoiceView.input.viewInvoice.invoiceId") this.viewInvoiceInvoiceId = (value as string) ?? "";
    else if (key === "ui.clientInvoiceView.data.viewInvoice") this.viewInvoiceData = (value as BuildFlowFsmViewInvoiceOutput) ?? null;
    else if (key === "ui.clientInvoiceView.layout.col_line_type") this.LayoutColLineType = (value as string) ?? "";
    else if (key === "ui.clientInvoiceView.layout.col_description") this.LayoutColDescription = (value as string) ?? "";
    else if (key === "ui.clientInvoiceView.layout.col_quantity") this.LayoutColQuantity = (value as string) ?? "";
    else if (key === "ui.clientInvoiceView.layout.col_unit") this.LayoutColUnit = (value as string) ?? "";
    else if (key === "ui.clientInvoiceView.layout.col_unit_cost") this.LayoutColUnitCost = (value as string) ?? "";
    else if (key === "ui.clientInvoiceView.layout.col_line_amount") this.LayoutColLineAmount = (value as string) ?? "";
  }

  private parseRouteParams(): void {
    const pattern = "/buildFlowFsm/clientInvoiceView/:invoiceId?";
    const path = window.location.pathname;
    const patternParts = pattern.split("/").filter((p) => p.length > 0);
    const pathParts = path.split("/").filter((p) => p.length > 0);

    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(":")) {
        const paramName = part.replace(":", "").replace("?", "");
        const rawValue = i < pathParts.length ? decodeURIComponent(pathParts[i]) : "";
        if (rawValue) {
          if (paramName === "invoiceId") {
            this.viewInvoiceInvoiceId = rawValue;
            setState("ui.clientInvoiceView.input.viewInvoice.invoiceId", rawValue);
          }
        }
      }
    }
  }

  async loadViewInvoice(): Promise<void> {
    this.parseRouteParams();

    const invoiceId = this.viewInvoiceInvoiceId;
    if (!invoiceId) {
      this.viewInvoiceState = "idle";
      setState("ui.clientInvoiceView.action.viewInvoice.status", "idle");
      this.viewInvoiceData = null;
      setState("ui.clientInvoiceView.data.viewInvoice", null);
      this.requestUpdate();
      return;
    }

    this.viewInvoiceState = "loading";
    setState("ui.clientInvoiceView.action.viewInvoice.status", "loading");
    this.requestUpdate();

    const params: BuildFlowFsmViewInvoiceInput = {
      invoiceId,
    };

    const options: BffClientOptions = { mode: "silent" };

    const response = await execBff<BuildFlowFsmViewInvoiceOutputItem>(
      "buildFlowFsm.viewInvoice.viewInvoice",
      params,
      options,
    );

    if (response.ok) {
      const data = response.data ?? null;
      this.viewInvoiceData = data;
      setState("ui.clientInvoiceView.data.viewInvoice", data);
      this.viewInvoiceState = "success";
      setState("ui.clientInvoiceView.action.viewInvoice.status", "success");
    } else {
      this.viewInvoiceData = null;
      setState("ui.clientInvoiceView.data.viewInvoice", null);
      this.viewInvoiceState = "error";
      setState("ui.clientInvoiceView.action.viewInvoice.status", "error");
      if (response.error) {
        console.error("[clientInvoiceView] loadViewInvoice error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewInvoiceClick(_event: Event): void {
    this.loadViewInvoice();
  }

  setViewInvoiceInvoiceId(value: string): void {
    this.viewInvoiceInvoiceId = value;
    setState("ui.clientInvoiceView.input.viewInvoice.invoiceId", value);
    this.requestUpdate();
  }

  handleViewInvoiceInvoiceIdChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target?.value ?? "";
    this.setViewInvoiceInvoiceId(value);
  }
}
