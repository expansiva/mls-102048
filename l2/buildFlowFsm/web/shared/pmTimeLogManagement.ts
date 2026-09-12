/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmVoidTimeLogInput,
  BuildFlowFsmVoidTimeLogOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/pmTimeLogManagement.js';

/// **collab_i18n_start**
const message_en = {
  "title.selectedLogContext": "Selected Time Log",
  "title.voidForm": "Void Time Log",
  "empty.noLogSelected": "No time log selected. Please select a posted time log entry to void.",
  "label.timeLogId": "Time Log ID",
  "label.workTaskId": "Task",
  "label.workerId": "Worker",
  "label.logDate": "Date",
  "label.hours": "Hours",
  "label.workerRate": "Rate",
  "label.status": "Status",
  "label.voidReason": "Void Reason",
  "action.voidTimeLog": "Void Time Log",
  "sec.time.log.corrections.title": "Sec time log corrections",
  "org.void.time.log.title": "Void a posted time log entry after reviewing its details and providing a void reason"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmPmTimeLogManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = '';
  @property({ type: String }) voidTimeLogState: "idle" | "loading" | "success" | "error" = 'idle';
  @property({ type: String }) voidTimeLogTimeLogId: string = '';
  @property({ type: String }) voidTimeLogVoidReason: string = '';
  @property({ type: Object }) OutputVoidTimeLog: BuildFlowFsmVoidTimeLogOutput | null = null;
  @property({ type: String }) LayoutFldCtxWorkTaskId: string = '';
  @property({ type: String }) LayoutFldCtxWorkerId: string = '';
  @property({ type: String }) LayoutFldCtxLogDate: string = '';
  @property({ type: String }) LayoutFldCtxHours: string = '';
  @property({ type: String }) LayoutFldCtxWorkerRate: string = '';
  @property({ type: String }) LayoutFldCtxStatus: string = '';

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  connectedCallback(): void {
    super.connectedCallback();
    const savedStatus = getState('ui.pmTimeLogManagement.status');
    if (savedStatus !== undefined && savedStatus !== null) {
      this.status = savedStatus as string;
    }
    const savedVoidTimeLogState = getState('ui.pmTimeLogManagement.action.voidTimeLog.status');
    if (savedVoidTimeLogState !== undefined && savedVoidTimeLogState !== null) {
      this.voidTimeLogState = savedVoidTimeLogState as "idle" | "loading" | "success" | "error";
    }
    const savedTimeLogId = getState('ui.pmTimeLogManagement.input.voidTimeLog.timeLogId');
    if (savedTimeLogId !== undefined && savedTimeLogId !== null) {
      this.voidTimeLogTimeLogId = savedTimeLogId as string;
    }
    const savedVoidReason = getState('ui.pmTimeLogManagement.input.voidTimeLog.voidReason');
    if (savedVoidReason !== undefined && savedVoidReason !== null) {
      this.voidTimeLogVoidReason = savedVoidReason as string;
    }
    const savedOutput = getState('ui.pmTimeLogManagement.output.voidTimeLog');
    if (savedOutput !== undefined && savedOutput !== null) {
      this.OutputVoidTimeLog = savedOutput as BuildFlowFsmVoidTimeLogOutput;
    }
    const savedWorkTaskId = getState('ui.pmTimeLogManagement.layout.fld_ctx_workTaskId');
    if (savedWorkTaskId !== undefined && savedWorkTaskId !== null) {
      this.LayoutFldCtxWorkTaskId = savedWorkTaskId as string;
    }
    const savedWorkerId = getState('ui.pmTimeLogManagement.layout.fld_ctx_workerId');
    if (savedWorkerId !== undefined && savedWorkerId !== null) {
      this.LayoutFldCtxWorkerId = savedWorkerId as string;
    }
    const savedLogDate = getState('ui.pmTimeLogManagement.layout.fld_ctx_logDate');
    if (savedLogDate !== undefined && savedLogDate !== null) {
      this.LayoutFldCtxLogDate = savedLogDate as string;
    }
    const savedHours = getState('ui.pmTimeLogManagement.layout.fld_ctx_hours');
    if (savedHours !== undefined && savedHours !== null) {
      this.LayoutFldCtxHours = savedHours as string;
    }
    const savedWorkerRate = getState('ui.pmTimeLogManagement.layout.fld_ctx_workerRate');
    if (savedWorkerRate !== undefined && savedWorkerRate !== null) {
      this.LayoutFldCtxWorkerRate = savedWorkerRate as string;
    }
    const savedLayoutStatus = getState('ui.pmTimeLogManagement.layout.fld_ctx_status');
    if (savedLayoutStatus !== undefined && savedLayoutStatus !== null) {
      this.LayoutFldCtxStatus = savedLayoutStatus as string;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  // --- State setter actions ---

  setVoidTimeLogTimeLogId(value: string): void {
    this.voidTimeLogTimeLogId = value;
    setState('ui.pmTimeLogManagement.input.voidTimeLog.timeLogId', value);
    this.requestUpdate();
  }

  handleVoidTimeLogTimeLogIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (!target) return;
    this.setVoidTimeLogTimeLogId(target.value);
  }

  setVoidTimeLogVoidReason(value: string): void {
    this.voidTimeLogVoidReason = value;
    setState('ui.pmTimeLogManagement.input.voidTimeLog.voidReason', value);
    this.requestUpdate();
  }

  handleVoidTimeLogVoidReasonChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (!target) return;
    this.setVoidTimeLogVoidReason(target.value);
  }

  // --- Command action: voidTimeLog ---

  async voidTimeLog(): Promise<void> {
    this.voidTimeLogState = 'loading';
    setState('ui.pmTimeLogManagement.action.voidTimeLog.status', 'loading');
    this.requestUpdate();

    const params: BuildFlowFsmVoidTimeLogInput = {
      timeLogId: this.voidTimeLogTimeLogId,
      voidReason: this.voidTimeLogVoidReason,
    };

    const options: BffClientOptions = { mode: 'blocking' };

    const response = await execBff<BuildFlowFsmVoidTimeLogOutput>(
      'buildFlowFsm.voidTimeLog.voidTimeLog',
      params,
      options,
    );

    if (response.ok) {
      const outputData: BuildFlowFsmVoidTimeLogOutput | null = response.data ?? null;
      this.OutputVoidTimeLog = outputData;
      setState('ui.pmTimeLogManagement.output.voidTimeLog', outputData);
      this.voidTimeLogState = 'success';
      setState('ui.pmTimeLogManagement.action.voidTimeLog.status', 'success');
    } else {
      if (response.error) {
        console.error('[voidTimeLog] Error:', response.error.message);
      }
      this.voidTimeLogState = 'error';
      setState('ui.pmTimeLogManagement.action.voidTimeLog.status', 'error');
    }
    this.requestUpdate();
  }

  handleVoidTimeLogClick(event: Event): void {
    event.preventDefault();
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.voidTimeLog();
    }, { mode: 'blocking', busyLabel: this.msg['action.voidTimeLog'] });
  }
}
