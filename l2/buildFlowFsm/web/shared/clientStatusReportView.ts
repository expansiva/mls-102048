/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmViewStatusReportInput,
  BuildFlowFsmViewStatusReportOutput,
  BuildFlowFsmViewStatusReportOutputItem,
} from '/_102048_/l2/buildFlowFsm/web/contracts/clientStatusReportView.js';

/// **collab_i18n_start**
const message_en = {
  "section.report.title": "Project Status Report",
  "intention.reportInfo.title": "Report Information",
  "intention.reportContent.title": "Report Content",
  "field.statusReportId.label": "Report ID",
  "field.projectId.label": "Project",
  "field.status.label": "Status",
  "field.content.label": "Report Content",
  "field.reportPeriodStart.label": "Period Start",
  "field.reportPeriodEnd.label": "Period End",
  "field.generatedAt.label": "Generated At",
  "field.llmModelUsed.label": "AI Model",
  "field.sharedAt.label": "Shared At",
  "field.shareLink.label": "Share Link",
  "field.sharedWithEmail.label": "Shared With",
  "empty.report": "No status report found for the provided link.",
  "status.generated": "Generated",
  "status.shared": "Shared",
  "org.report.summary.title": "Display report metadata and key information as a summary panel",
  "org.report.detail.title": "Display the full AI generated report content and sharing details"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmClientStatusReportViewBase extends CollabLitElement {
  @property({ type: String }) status: string = "";
  @property({ type: String }) viewStatusReportState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) viewStatusReportStatusReportId: string = "";
  @property({ type: Object }) viewStatusReportData: BuildFlowFsmViewStatusReportOutputItem | null = null;

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  connectedCallback(): void {
    super.connectedCallback();
    const existingStatus = getState("ui.clientStatusReportView.status") as string | undefined;
    if (existingStatus !== undefined && existingStatus !== null) {
      this.status = existingStatus;
    }
    const existingReportId = getState("ui.clientStatusReportView.input.viewStatusReport.statusReportId") as string | undefined;
    if (existingReportId !== undefined && existingReportId !== null && existingReportId !== "") {
      this.viewStatusReportStatusReportId = existingReportId;
    }
    const existingData = getState("ui.clientStatusReportView.data.viewStatusReport") as BuildFlowFsmViewStatusReportOutputItem | undefined;
    if (existingData !== undefined && existingData !== null) {
      this.viewStatusReportData = existingData;
    }
    subscribe("ui.clientStatusReportView.status", this);
    this.loadViewStatusReport();
  }

  disconnectedCallback(): void {
    unsubscribe("ui.clientStatusReportView.status", this);
    super.disconnectedCallback();
  }

  private parseRouteParams(): void {
    const pattern = "/buildFlowFsm/clientStatusReportView/:statusReportId?";
    const pathname = window.location.pathname;
    const patternParts = pattern.split("/").filter((p) => p.length > 0);
    const pathParts = pathname.split("/").filter((p) => p.length > 0);
    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(":")) {
        const paramName = part.replace(":", "").replace("?", "");
        if (i < pathParts.length) {
          const value = decodeURIComponent(pathParts[i]);
          if (value) {
            if (paramName === "statusReportId") {
              if (!this.viewStatusReportStatusReportId) {
                this.viewStatusReportStatusReportId = value;
                setState("ui.clientStatusReportView.input.viewStatusReport.statusReportId", value);
              }
            }
          }
        }
      }
    }
  }

  async loadViewStatusReport(): Promise<void> {
    this.parseRouteParams();
    const statusReportId = this.viewStatusReportStatusReportId;
    if (!statusReportId) {
      this.viewStatusReportState = "idle";
      setState("ui.clientStatusReportView.action.viewStatusReport.status", "idle");
      this.viewStatusReportData = null;
      setState("ui.clientStatusReportView.data.viewStatusReport", null);
      this.requestUpdate();
      return;
    }
    this.viewStatusReportState = "loading";
    setState("ui.clientStatusReportView.action.viewStatusReport.status", "loading");
    this.requestUpdate();

    const params: BuildFlowFsmViewStatusReportInput = {
      statusReportId,
    };
    const options: BffClientOptions = { mode: "silent" };
    const response = await execBff<BuildFlowFsmViewStatusReportOutput>(
      "buildFlowFsm.viewStatusReport.viewStatusReport",
      params,
      options,
    );
    if (response.ok) {
      const data = response.data ?? null;
      this.viewStatusReportData = data as BuildFlowFsmViewStatusReportOutputItem | null;
      setState("ui.clientStatusReportView.data.viewStatusReport", this.viewStatusReportData);
      this.viewStatusReportState = "success";
      setState("ui.clientStatusReportView.action.viewStatusReport.status", "success");
    } else {
      this.viewStatusReportData = null;
      setState("ui.clientStatusReportView.data.viewStatusReport", null);
      this.viewStatusReportState = "error";
      setState("ui.clientStatusReportView.action.viewStatusReport.status", "error");
      if (response.error) {
        console.error("[clientStatusReportView] loadViewStatusReport error:", response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleViewStatusReportClick = (): void => {
    this.loadViewStatusReport();
  };

  setViewStatusReportStatusReportId(value: string): void {
    this.viewStatusReportStatusReportId = value;
    setState("ui.clientStatusReportView.input.viewStatusReport.statusReportId", value);
    this.requestUpdate();
  }

  handleViewStatusReportStatusReportIdChange = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const value = target.value ?? "";
    this.setViewStatusReportStatusReportId(value);
  };
}
