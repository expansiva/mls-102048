/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/statusReportLifecycle.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmGenerateStatusReportInput,
  BuildFlowFsmGenerateStatusReportOutput,
  BuildFlowFsmShareStatusReportInput,
  BuildFlowFsmShareStatusReportOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/statusReportLifecycle.js';

/// **collab_i18n_start**
const message_en = {
  "page.title": "AI Status Report",
  "section.generate.title": "Generate Status Report",
  "section.review.title": "Review Generated Report",
  "section.share.title": "Share Status Report",
  "intention.generate.title": "Generate Report",
  "intention.workflowStatus.title": "Report Status",
  "intention.review.title": "Report Preview",
  "intention.share.title": "Share with Client",
  "intention.shareResult.title": "Share Confirmation",
  "field.projectId.label": "Project",
  "field.reportPeriodStart.label": "Reporting Period Start",
  "field.reportPeriodEnd.label": "Reporting Period End",
  "field.statusReportId.label": "Status Report",
  "field.sharedWithEmail.label": "Client Email",
  "field.status.label": "Status",
  "field.content.label": "Report Content",
  "field.generatedAt.label": "Generated At",
  "field.llmModelUsed.label": "AI Model",
  "field.createdAt.label": "Created At",
  "field.sharedAt.label": "Shared At",
  "field.shareLink.label": "Share Link",
  "action.generateStatusReport.label": "Generate Status Report",
  "action.shareStatusReport.label": "Share with Client",
  "empty.review": "No report generated yet. Complete the generate step above to see the AI-generated report here.",
  "empty.shareResult": "The report has not been shared yet. Enter the client email and click Share with Client.",
  "org.generate.title": "Generate AI status report",
  "org.review.title": "Review the AI generated status report before sharing with the client",
  "org.share.title": "Share status report with client via email"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmStatusReportLifecycleBase extends CollabLitElement {
  @property({ type: String }) status: string = '';

  @property({ type: String }) generateStatusReportState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) generateStatusReportProjectId: string = '';
  @property({ type: String }) generateStatusReportReportPeriodStart: string = '';
  @property({ type: String }) generateStatusReportReportPeriodEnd: string = '';

  @property({ type: String }) shareStatusReportState: "idle" | "loading" | "success" | "error" = "idle";

  @property({ type: String }) shareStatusReportStatusReportId: string = '';
  @property({ type: String }) shareStatusReportSharedWithEmail: string = '';

  @property({ type: Object }) OutputGenerateStatusReport: BuildFlowFsmGenerateStatusReportOutput | null = null;
  @property({ type: Object }) OutputShareStatusReport: BuildFlowFsmShareStatusReportOutput | null = null;

  @property({ type: String }) LayoutFldWfStatus: string = '';
  @property({ type: String }) LayoutFldResultStatus: string = '';
  @property({ type: String }) LayoutFldResultSharedAt: string = '';
  @property({ type: String }) LayoutFldResultShareLink: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  private parseRouteParams(): { projectId?: string } {
    const pattern = '/buildFlowFsm/statusReportLifecycle/:projectId?';
    const patternParts = pattern.split('/').filter((p) => p.length > 0);
    const pathParts = window.location.pathname.split('/').filter((p) => p.length > 0);
    const result: { projectId?: string } = {};
    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':') && part.endsWith('?')) {
        const name = part.slice(1, -1);
        const value = pathParts[i] ? decodeURIComponent(pathParts[i]) : undefined;
        if (value) {
          (result as Record<string, string>)[name] = value;
        }
      } else if (part.startsWith(':')) {
        const name = part.slice(1);
        const value = pathParts[i] ? decodeURIComponent(pathParts[i]) : undefined;
        if (value) {
          (result as Record<string, string>)[name] = value;
        }
      }
    }
    return result;
  }

  // --- StateSetter Actions ---

  setGenerateStatusReportProjectId(value: string): void {
    this.generateStatusReportProjectId = value;
    setState('ui.statusReportLifecycle.input.generateStatusReport.projectId', value);
    this.requestUpdate();
  }

  handleGenerateStatusReportProjectIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setGenerateStatusReportProjectId(target.value);
  }

  setGenerateStatusReportReportPeriodStart(value: string): void {
    this.generateStatusReportReportPeriodStart = value;
    setState('ui.statusReportLifecycle.input.generateStatusReport.reportPeriodStart', value);
    this.requestUpdate();
  }

  handleGenerateStatusReportReportPeriodStartChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setGenerateStatusReportReportPeriodStart(target.value);
  }

  setGenerateStatusReportReportPeriodEnd(value: string): void {
    this.generateStatusReportReportPeriodEnd = value;
    setState('ui.statusReportLifecycle.input.generateStatusReport.reportPeriodEnd', value);
    this.requestUpdate();
  }

  handleGenerateStatusReportReportPeriodEndChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setGenerateStatusReportReportPeriodEnd(target.value);
  }

  setShareStatusReportStatusReportId(value: string): void {
    this.shareStatusReportStatusReportId = value;
    setState('ui.statusReportLifecycle.input.shareStatusReport.statusReportId', value);
    this.requestUpdate();
  }

  handleShareStatusReportStatusReportIdChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setShareStatusReportStatusReportId(target.value);
  }

  setShareStatusReportSharedWithEmail(value: string): void {
    this.shareStatusReportSharedWithEmail = value;
    setState('ui.statusReportLifecycle.input.shareStatusReport.sharedWithEmail', value);
    this.requestUpdate();
  }

  handleShareStatusReportSharedWithEmailChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.setShareStatusReportSharedWithEmail(target.value);
  }

  // --- Command Actions ---

  async generateStatusReport(): Promise<void> {
    // Parse route params
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId) {
      this.generateStatusReportProjectId = routeParams.projectId;
      setState('ui.statusReportLifecycle.input.generateStatusReport.projectId', routeParams.projectId);
    }

    const projectId = this.generateStatusReportProjectId;
    const reportPeriodStart = this.generateStatusReportReportPeriodStart;
    const reportPeriodEnd = this.generateStatusReportReportPeriodEnd;

    if (!projectId) {
      this.generateStatusReportState = "idle";
      setState('ui.statusReportLifecycle.action.generateStatusReport.status', "idle");
      this.requestUpdate();
      return;
    }

    this.generateStatusReportState = "loading";
    setState('ui.statusReportLifecycle.action.generateStatusReport.status', "loading");
    this.requestUpdate();

    const params: BuildFlowFsmGenerateStatusReportInput = {
      projectId,
      reportPeriodStart,
      reportPeriodEnd,
    };

    const options: BffClientOptions = { mode: 'blocking' };

    const response = await execBff<BuildFlowFsmGenerateStatusReportOutput>(
      'buildFlowFsm.statusReportLifecycle.generateStatusReport',
      params,
      options,
    );

    if (response.ok) {
      const output = response.data ?? null;
      this.OutputGenerateStatusReport = output;
      setState('ui.statusReportLifecycle.output.generateStatusReport', output);
      this.generateStatusReportState = "success";
      setState('ui.statusReportLifecycle.action.generateStatusReport.status', "success");
    } else {
      this.generateStatusReportState = "error";
      setState('ui.statusReportLifecycle.action.generateStatusReport.status', "error");
      if (response.error) {
        console.error('[generateStatusReport]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleGenerateStatusReportClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.generateStatusReport();
    }, { mode: 'blocking' });
  }

  async shareStatusReport(): Promise<void> {
    const statusReportId = this.shareStatusReportStatusReportId;
    const sharedWithEmail = this.shareStatusReportSharedWithEmail;

    if (!statusReportId) {
      this.shareStatusReportState = "idle";
      setState('ui.statusReportLifecycle.action.shareStatusReport.status', "idle");
      this.requestUpdate();
      return;
    }

    this.shareStatusReportState = "loading";
    setState('ui.statusReportLifecycle.action.shareStatusReport.status', "loading");
    this.requestUpdate();

    const params: BuildFlowFsmShareStatusReportInput = {
      statusReportId,
      sharedWithEmail,
    };

    const options: BffClientOptions = { mode: 'blocking' };

    const response = await execBff<BuildFlowFsmShareStatusReportOutput>(
      'buildFlowFsm.statusReportLifecycle.shareStatusReport',
      params,
      options,
    );

    if (response.ok) {
      const output = response.data ?? null;
      this.OutputShareStatusReport = output;
      setState('ui.statusReportLifecycle.output.shareStatusReport', output);
      this.shareStatusReportState = "success";
      setState('ui.statusReportLifecycle.action.shareStatusReport.status', "success");
    } else {
      this.shareStatusReportState = "error";
      setState('ui.statusReportLifecycle.action.shareStatusReport.status', "error");
      if (response.error) {
        console.error('[shareStatusReport]', response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleShareStatusReportClick(): void {
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.shareStatusReport();
    }, { mode: 'blocking' });
  }

  // --- Lifecycle ---

  connectedCallback(): void {
    super.connectedCallback();

    // Initialize state from global state where useful
    const savedStatus = getState('ui.statusReportLifecycle.status');
    if (savedStatus !== undefined) {
      this.status = savedStatus as string;
    }

    const savedGenState = getState('ui.statusReportLifecycle.action.generateStatusReport.status');
    if (savedGenState !== undefined) {
      this.generateStatusReportState = savedGenState as "idle" | "loading" | "success" | "error";
    }

    const savedShareState = getState('ui.statusReportLifecycle.action.shareStatusReport.status');
    if (savedShareState !== undefined) {
      this.shareStatusReportState = savedShareState as "idle" | "loading" | "success" | "error";
    }

    const savedProjectId = getState('ui.statusReportLifecycle.input.generateStatusReport.projectId');
    if (savedProjectId !== undefined) {
      this.generateStatusReportProjectId = savedProjectId as string;
    }

    const savedReportPeriodStart = getState('ui.statusReportLifecycle.input.generateStatusReport.reportPeriodStart');
    if (savedReportPeriodStart !== undefined) {
      this.generateStatusReportReportPeriodStart = savedReportPeriodStart as string;
    }

    const savedReportPeriodEnd = getState('ui.statusReportLifecycle.input.generateStatusReport.reportPeriodEnd');
    if (savedReportPeriodEnd !== undefined) {
      this.generateStatusReportReportPeriodEnd = savedReportPeriodEnd as string;
    }

    const savedStatusReportId = getState('ui.statusReportLifecycle.input.shareStatusReport.statusReportId');
    if (savedStatusReportId !== undefined) {
      this.shareStatusReportStatusReportId = savedStatusReportId as string;
    }

    const savedSharedWithEmail = getState('ui.statusReportLifecycle.input.shareStatusReport.sharedWithEmail');
    if (savedSharedWithEmail !== undefined) {
      this.shareStatusReportSharedWithEmail = savedSharedWithEmail as string;
    }

    const savedOutputGen = getState('ui.statusReportLifecycle.output.generateStatusReport');
    if (savedOutputGen !== undefined) {
      this.OutputGenerateStatusReport = savedOutputGen as BuildFlowFsmGenerateStatusReportOutput | null;
    }

    const savedOutputShare = getState('ui.statusReportLifecycle.output.shareStatusReport');
    if (savedOutputShare !== undefined) {
      this.OutputShareStatusReport = savedOutputShare as BuildFlowFsmShareStatusReportOutput | null;
    }

    const savedLayoutWfStatus = getState('ui.statusReportLifecycle.layout.fld_wf_status');
    if (savedLayoutWfStatus !== undefined) {
      this.LayoutFldWfStatus = savedLayoutWfStatus as string;
    }

    const savedLayoutResultStatus = getState('ui.statusReportLifecycle.layout.fld_result_status');
    if (savedLayoutResultStatus !== undefined) {
      this.LayoutFldResultStatus = savedLayoutResultStatus as string;
    }

    const savedLayoutResultSharedAt = getState('ui.statusReportLifecycle.layout.fld_result_sharedAt');
    if (savedLayoutResultSharedAt !== undefined) {
      this.LayoutFldResultSharedAt = savedLayoutResultSharedAt as string;
    }

    const savedLayoutResultShareLink = getState('ui.statusReportLifecycle.layout.fld_result_shareLink');
    if (savedLayoutResultShareLink !== undefined) {
      this.LayoutFldResultShareLink = savedLayoutResultShareLink as string;
    }

    // Parse route params and populate projectId if present
    const routeParams = this.parseRouteParams();
    if (routeParams.projectId && !this.generateStatusReportProjectId) {
      this.generateStatusReportProjectId = routeParams.projectId;
      setState('ui.statusReportLifecycle.input.generateStatusReport.projectId', routeParams.projectId);
    }

    // No initialLoads defined — nothing to run on connect
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }
}
