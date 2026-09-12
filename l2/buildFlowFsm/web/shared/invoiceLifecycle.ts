/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmGenerateInvoiceInput,
  BuildFlowFsmGenerateInvoiceOutput,
  BuildFlowFsmIssueInvoiceInput,
  BuildFlowFsmIssueInvoiceOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/invoiceLifecycle.js';

/// **collab_i18n_start**
const message_en = {
  "section.projectSelection.title": "Select Project to Bill",
  "section.billingSummary.title": "Billing Summary",
  "section.generateInvoice.title": "Generate Invoice",
  "section.issueInvoice.title": "Issue Invoice",
  "section.invoiceResult.title": "Invoice Result",
  "intent.projectList.title": "Projects",
  "intent.projectList.empty": "No projects available to bill",
  "intent.costBreakdown.title": "Cost Breakdown",
  "intent.costBreakdown.empty": "Select a project to view the cost breakdown",
  "intent.generateForm.title": "Generate Invoice from Job Costs",
  "intent.issueForm.title": "Issue and Send Invoice",
  "intent.workflowStatus.title": "Invoice Status",
  "intent.invoiceSummary.title": "Invoice Details",
  "intent.invoiceSummary.empty": "No invoice has been generated yet",
  "col.projectName": "Project Name",
  "col.projectStatus": "Status",
  "col.projectBudget": "Budget",
  "col.projectClient": "Client",
  "filter.projectStatus": "Filter by Status",
  "field.projectId": "Project",
  "field.clientEmail": "Client Email",
  "field.notes": "Notes",
  "field.invoiceId": "Invoice ID",
  "field.invoiceStatus": "Status",
  "field.laborCost": "Labor Cost",
  "field.materialCost": "Material Cost",
  "field.changeOrderAmount": "Change Order Amount",
  "field.totalAmount": "Total Amount",
  "field.currency": "Currency",
  "field.shareLink": "Share Link",
  "field.issuedAt": "Issued At",
  "action.generateInvoice": "Generate Invoice",
  "action.issueInvoice": "Issue Invoice",
  "org.project.selector.title": "Select the project to bill and view accumulated costs",
  "org.billing.summary.title": "Review consolidated cost breakdown before generating invoice",
  "org.generate.invoice.title": "Generate invoice from confirmed job costs",
  "org.issue.invoice.title": "Issue and send invoice to client via shareable link or email",
  "org.invoice.result.title": "Review the issued invoice details, share link and delivery status"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmInvoiceLifecycleBase extends CollabLitElement {
  @property({ type: String }) status: string = "";
  @property({ type: String }) generateInvoiceState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) generateInvoiceProjectId: string = "";
  @property({ type: String }) generateInvoiceClientEmail: string = "";
  @property({ type: String }) generateInvoiceNotes: string = "";
  @property({ type: String }) issueInvoiceState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) issueInvoiceInvoiceId: string = "";
  @property({ type: String }) issueInvoiceClientEmail: string = "";
  @property({ type: Object }) OutputGenerateInvoice: BuildFlowFsmGenerateInvoiceOutput | null = null;
  @property({ type: Object }) OutputIssueInvoice: BuildFlowFsmIssueInvoiceOutput | null = null;
  @property({ type: String }) LayoutFldWfStatus: string = "";
  @property({ type: String }) LayoutFldWfTotal: string = "";

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  connectedCallback(): void {
    super.connectedCallback();
    const existingStatus = getState("ui.invoiceLifecycle.status") as string | undefined;
    if (existingStatus !== undefined && existingStatus !== null) {
      this.status = existingStatus;
    }
    const existingGenState = getState("ui.invoiceLifecycle.action.generateInvoice.status") as string | undefined;
    if (existingGenState !== undefined && existingGenState !== null) {
      this.generateInvoiceState = existingGenState as "idle" | "loading" | "success" | "error";
    }
    const existingGenProjectId = getState("ui.invoiceLifecycle.input.generateInvoice.projectId") as string | undefined;
    if (existingGenProjectId !== undefined && existingGenProjectId !== null) {
      this.generateInvoiceProjectId = existingGenProjectId;
    }
    const existingGenClientEmail = getState("ui.invoiceLifecycle.input.generateInvoice.clientEmail") as string | undefined;
    if (existingGenClientEmail !== undefined && existingGenClientEmail !== null) {
      this.generateInvoiceClientEmail = existingGenClientEmail;
    }
    const existingGenNotes = getState("ui.invoiceLifecycle.input.generateInvoice.notes") as string | undefined;
    if (existingGenNotes !== undefined && existingGenNotes !== null) {
      this.generateInvoiceNotes = existingGenNotes;
    }
    const existingIssueState = getState("ui.invoiceLifecycle.action.issueInvoice.status") as string | undefined;
    if (existingIssueState !== undefined && existingIssueState !== null) {
      this.issueInvoiceState = existingIssueState as "idle" | "loading" | "success" | "error";
    }
    const existingIssueInvoiceId = getState("ui.invoiceLifecycle.input.issueInvoice.invoiceId") as string | undefined;
    if (existingIssueInvoiceId !== undefined && existingIssueInvoiceId !== null) {
      this.issueInvoiceInvoiceId = existingIssueInvoiceId;
    }
    const existingIssueClientEmail = getState("ui.invoiceLifecycle.input.issueInvoice.clientEmail") as string | undefined;
    if (existingIssueClientEmail !== undefined && existingIssueClientEmail !== null) {
      this.issueInvoiceClientEmail = existingIssueClientEmail;
    }
    const existingOutputGen = getState("ui.invoiceLifecycle.output.generateInvoice") as BuildFlowFsmGenerateInvoiceOutput | null | undefined;
    if (existingOutputGen !== undefined && existingOutputGen !== null) {
      this.OutputGenerateInvoice = existingOutputGen;
    }
    const existingOutputIssue = getState("ui.invoiceLifecycle.output.issueInvoice") as BuildFlowFsmIssueInvoiceOutput | null | undefined;
    if (existingOutputIssue !== undefined && existingOutputIssue !== null) {
      this.OutputIssueInvoice = existingOutputIssue;
    }
    const existingLayoutStatus = getState("ui.invoiceLifecycle.layout.fld_wf_status") as string | undefined;
    if (existingLayoutStatus !== undefined && existingLayoutStatus !== null) {
      this.LayoutFldWfStatus = existingLayoutStatus;
    }
    const existingLayoutTotal = getState("ui.invoiceLifecycle.layout.fld_wf_total") as string | undefined;
    if (existingLayoutTotal !== undefined && existingLayoutTotal !== null) {
      this.LayoutFldWfTotal = existingLayoutTotal;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  // --- StateSetter: setGenerateInvoiceProjectId ---
  setGenerateInvoiceProjectId(value: string): void {
    this.generateInvoiceProjectId = value;
    setState("ui.invoiceLifecycle.input.generateInvoice.projectId", value);
    this.requestUpdate();
  }

  handleGenerateInvoiceProjectIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value: string = target.value ?? "";
    this.setGenerateInvoiceProjectId(value);
  }

  // --- StateSetter: setGenerateInvoiceClientEmail ---
  setGenerateInvoiceClientEmail(value: string): void {
    this.generateInvoiceClientEmail = value;
    setState("ui.invoiceLifecycle.input.generateInvoice.clientEmail", value);
    this.requestUpdate();
  }

  handleGenerateInvoiceClientEmailChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value: string = target.value ?? "";
    this.setGenerateInvoiceClientEmail(value);
  }

  // --- StateSetter: setGenerateInvoiceNotes ---
  setGenerateInvoiceNotes(value: string): void {
    this.generateInvoiceNotes = value;
    setState("ui.invoiceLifecycle.input.generateInvoice.notes", value);
    this.requestUpdate();
  }

  handleGenerateInvoiceNotesChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value: string = target.value ?? "";
    this.setGenerateInvoiceNotes(value);
  }

  // --- StateSetter: setIssueInvoiceInvoiceId ---
  setIssueInvoiceInvoiceId(value: string): void {
    this.issueInvoiceInvoiceId = value;
    setState("ui.invoiceLifecycle.input.issueInvoice.invoiceId", value);
    this.requestUpdate();
  }

  handleIssueInvoiceInvoiceIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value: string = target.value ?? "";
    this.setIssueInvoiceInvoiceId(value);
  }

  // --- StateSetter: setIssueInvoiceClientEmail ---
  setIssueInvoiceClientEmail(value: string): void {
    this.issueInvoiceClientEmail = value;
    setState("ui.invoiceLifecycle.input.issueInvoice.clientEmail", value);
    this.requestUpdate();
  }

  handleIssueInvoiceClientEmailChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const value: string = target.value ?? "";
    this.setIssueInvoiceClientEmail(value);
  }

  // --- Command: generateInvoice ---
  async generateInvoice(): Promise<void> {
    this.generateInvoiceState = "loading";
    setState("ui.invoiceLifecycle.action.generateInvoice.status", "loading");

    const params: BuildFlowFsmGenerateInvoiceInput = {
      projectId: this.generateInvoiceProjectId,
      clientEmail: this.generateInvoiceClientEmail || undefined,
      notes: this.generateInvoiceNotes || undefined,
    };

    const options: BffClientOptions = { mode: "blocking" };
    const response = await execBff<BuildFlowFsmGenerateInvoiceOutput>(
      "buildFlowFsm.invoiceLifecycle.generateInvoice",
      params,
      options,
    );

    if (response.ok) {
      const outputData: BuildFlowFsmGenerateInvoiceOutput | null =
        response.data ?? null;
      this.OutputGenerateInvoice = outputData;
      setState("ui.invoiceLifecycle.output.generateInvoice", outputData);
      this.generateInvoiceState = "success";
      setState("ui.invoiceLifecycle.action.generateInvoice.status", "success");
    } else {
      this.generateInvoiceState = "error";
      setState("ui.invoiceLifecycle.action.generateInvoice.status", "error");
      if (response.error) {
        console.error("[generateInvoice] BFF error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleGenerateInvoiceClick(_event: Event): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.generateInvoice();
    }, { mode: "blocking" });
  }

  // --- Command: issueInvoice ---
  async issueInvoice(): Promise<void> {
    this.issueInvoiceState = "loading";
    setState("ui.invoiceLifecycle.action.issueInvoice.status", "loading");

    const params: BuildFlowFsmIssueInvoiceInput = {
      invoiceId: this.issueInvoiceInvoiceId,
      clientEmail: this.issueInvoiceClientEmail || undefined,
    };

    const options: BffClientOptions = { mode: "blocking" };
    const response = await execBff<BuildFlowFsmIssueInvoiceOutput>(
      "buildFlowFsm.invoiceLifecycle.issueInvoice",
      params,
      options,
    );

    if (response.ok) {
      const outputData: BuildFlowFsmIssueInvoiceOutput | null =
        response.data ?? null;
      this.OutputIssueInvoice = outputData;
      setState("ui.invoiceLifecycle.output.issueInvoice", outputData);
      this.issueInvoiceState = "success";
      setState("ui.invoiceLifecycle.action.issueInvoice.status", "success");
    } else {
      this.issueInvoiceState = "error";
      setState("ui.invoiceLifecycle.action.issueInvoice.status", "error");
      if (response.error) {
        console.error("[issueInvoice] BFF error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleIssueInvoiceClick(_event: Event): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.issueInvoice();
    }, { mode: "blocking" });
  }
}
