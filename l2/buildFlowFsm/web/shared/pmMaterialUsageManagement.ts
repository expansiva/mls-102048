/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  BuildFlowFsmVoidMaterialUsageInput,
  BuildFlowFsmVoidMaterialUsageOutput,
} from '/_102048_/l2/buildFlowFsm/web/contracts/pmMaterialUsageManagement.js';

/// **collab_i18n_start**
const message_en = {
  "page.title": "Material Usage Corrections",
  "section.title": "Material Usage Corrections",
  "organism.title": "Void Material Usage",
  "intent.form.title": "Select Record and Enter Void Reason",
  "intent.summary.title": "Void Confirmation",
  "field.materialUsageId": "Material Usage Record",
  "field.voidReason": "Void Reason",
  "field.materialName": "Material Name",
  "field.quantity": "Quantity",
  "field.unit": "Unit",
  "field.unitCost": "Unit Cost",
  "field.totalCost": "Total Cost",
  "field.usageDate": "Usage Date",
  "field.status": "Status",
  "field.voidedAt": "Voided At",
  "action.voidMaterialUsage": "Void Material Usage",
  "empty.noSelection": "Select a posted material usage record to void",
  "empty.noResult": "No void result yet — submit the form to void the selected record",
  "sec.material.usage.corrections.title": "Sec material usage corrections",
  "org.void.material.usage.title": "Void a material usage record"
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en };
/// **collab_i18n_end**

export class BuildFlowFsmPmMaterialUsageManagementBase extends CollabLitElement {
  @property({ type: String }) status: string = "";
  @property({ type: String }) voidMaterialUsageState: "idle" | "loading" | "success" | "error" = "idle";
  @property({ type: String }) voidMaterialUsageMaterialUsageId: string = "";
  @property({ type: String }) voidMaterialUsageVoidReason: string = "";
  @property({ type: Object }) OutputVoidMaterialUsage: BuildFlowFsmVoidMaterialUsageOutput | null = null;
  @property({ type: String }) LayoutFldMaterialName: string = "";
  @property({ type: String }) LayoutFldQuantity: string = "";
  @property({ type: String }) LayoutFldUnit: string = "";
  @property({ type: String }) LayoutFldUnitCost: string = "";
  @property({ type: String }) LayoutFldTotalCost: string = "";
  @property({ type: String }) LayoutFldUsageDate: string = "";
  @property({ type: String }) LayoutFldStatus: string = "";
  @property({ type: String }) LayoutFldSummaryStatus: string = "";
  @property({ type: String }) LayoutFldSummaryVoidedAt: string = "";

  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_en;
  }

  connectedCallback(): void {
    super.connectedCallback();
    const savedStatus = getState("ui.pmMaterialUsageManagement.status");
    if (savedStatus !== undefined) {
      this.status = savedStatus as string;
    }
    const savedVoidState = getState("ui.pmMaterialUsageManagement.action.voidMaterialUsage.status");
    if (savedVoidState !== undefined) {
      this.voidMaterialUsageState = savedVoidState as "idle" | "loading" | "success" | "error";
    }
    const savedMaterialUsageId = getState("ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId");
    if (savedMaterialUsageId !== undefined) {
      this.voidMaterialUsageMaterialUsageId = savedMaterialUsageId as string;
    }
    const savedVoidReason = getState("ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason");
    if (savedVoidReason !== undefined) {
      this.voidMaterialUsageVoidReason = savedVoidReason as string;
    }
    const savedOutput = getState("ui.pmMaterialUsageManagement.output.voidMaterialUsage");
    if (savedOutput !== undefined) {
      this.OutputVoidMaterialUsage = savedOutput as BuildFlowFsmVoidMaterialUsageOutput | null;
    }
    subscribe(
      [
        "ui.pmMaterialUsageManagement.status",
        "ui.pmMaterialUsageManagement.action.voidMaterialUsage.status",
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId",
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason",
        "ui.pmMaterialUsageManagement.output.voidMaterialUsage",
      ],
      this
    );
  }

  disconnectedCallback(): void {
    unsubscribe(
      [
        "ui.pmMaterialUsageManagement.status",
        "ui.pmMaterialUsageManagement.action.voidMaterialUsage.status",
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId",
        "ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason",
        "ui.pmMaterialUsageManagement.output.voidMaterialUsage",
      ],
      this
    );
    super.disconnectedCallback();
  }

  // --- StateSetter: setVoidMaterialUsageMaterialUsageId ---
  setVoidMaterialUsageMaterialUsageId(value: string): void {
    this.voidMaterialUsageMaterialUsageId = value;
    setState("ui.pmMaterialUsageManagement.input.voidMaterialUsage.materialUsageId", value);
    this.requestUpdate();
  }

  handleVoidMaterialUsageMaterialUsageIdChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLSelectElement | null;
    if (!target) return;
    const value: string = target.value;
    this.setVoidMaterialUsageMaterialUsageId(value);
  }

  // --- StateSetter: setVoidMaterialUsageVoidReason ---
  setVoidMaterialUsageVoidReason(value: string): void {
    this.voidMaterialUsageVoidReason = value;
    setState("ui.pmMaterialUsageManagement.input.voidMaterialUsage.voidReason", value);
    this.requestUpdate();
  }

  handleVoidMaterialUsageVoidReasonChange(e: Event): void {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!target) return;
    const value: string = target.value;
    this.setVoidMaterialUsageVoidReason(value);
  }

  // --- Command: voidMaterialUsage ---
  async voidMaterialUsage(): Promise<void> {
    this.voidMaterialUsageState = "loading";
    setState("ui.pmMaterialUsageManagement.action.voidMaterialUsage.status", "loading");

    const params: BuildFlowFsmVoidMaterialUsageInput = {
      materialUsageId: this.voidMaterialUsageMaterialUsageId,
      voidReason: this.voidMaterialUsageVoidReason,
    };

    const options: BffClientOptions = { mode: "blocking" };

    const response = await execBff<BuildFlowFsmVoidMaterialUsageOutput>(
      "buildFlowFsm.voidMaterialUsage.voidMaterialUsage",
      params,
      options
    );

    if (response.ok) {
      const outputData: BuildFlowFsmVoidMaterialUsageOutput | null = response.data ?? null;
      this.OutputVoidMaterialUsage = outputData;
      setState("ui.pmMaterialUsageManagement.output.voidMaterialUsage", outputData);
      this.voidMaterialUsageState = "success";
      setState("ui.pmMaterialUsageManagement.action.voidMaterialUsage.status", "success");
    } else {
      this.voidMaterialUsageState = "error";
      setState("ui.pmMaterialUsageManagement.action.voidMaterialUsage.status", "error");
      if (response.error) {
        console.error("[voidMaterialUsage] Error:", response.error.code, response.error.message);
      }
    }
    this.requestUpdate();
  }

  handleVoidMaterialUsageClick(e: Event): void {
    e.preventDefault();
    runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.voidMaterialUsage();
    }, { mode: "blocking", busyLabel: this.msg["action.voidMaterialUsage"] });
  }
}
