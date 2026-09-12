/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/statusReportLifecycle.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmStatusReportLifecycleBase } from './statusReportLifecycle.js';
import type { BuildFlowFsmGenerateStatusReportInput, BuildFlowFsmShareStatusReportInput } from '../contracts/statusReportLifecycle.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmStatusReportLifecycleBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_generateStatusReportState = Assert<Assignable<typeof page.generateStatusReportState, "idle" | "loading" | "success" | "error">>;
type _State_generateStatusReportProjectId = Assert<Assignable<typeof page.generateStatusReportProjectId, string | BuildFlowFsmGenerateStatusReportInput["projectId"]>>;
type _State_generateStatusReportReportPeriodStart = Assert<Assignable<typeof page.generateStatusReportReportPeriodStart, string | BuildFlowFsmGenerateStatusReportInput["reportPeriodStart"]>>;
type _State_generateStatusReportReportPeriodEnd = Assert<Assignable<typeof page.generateStatusReportReportPeriodEnd, string | BuildFlowFsmGenerateStatusReportInput["reportPeriodEnd"]>>;
type _State_shareStatusReportState = Assert<Assignable<typeof page.shareStatusReportState, "idle" | "loading" | "success" | "error">>;
type _State_shareStatusReportStatusReportId = Assert<Assignable<typeof page.shareStatusReportStatusReportId, string | BuildFlowFsmShareStatusReportInput["statusReportId"]>>;
type _State_shareStatusReportSharedWithEmail = Assert<Assignable<typeof page.shareStatusReportSharedWithEmail, string | BuildFlowFsmShareStatusReportInput["sharedWithEmail"]>>;
type _State_OutputGenerateStatusReport = Assert<Assignable<typeof page.OutputGenerateStatusReport, unknown>>;
type _State_OutputShareStatusReport = Assert<Assignable<typeof page.OutputShareStatusReport, unknown>>;
type _State_LayoutFldWfStatus = Assert<Assignable<typeof page.LayoutFldWfStatus, string>>;
type _State_LayoutFldResultStatus = Assert<Assignable<typeof page.LayoutFldResultStatus, string>>;
type _State_LayoutFldResultSharedAt = Assert<Assignable<typeof page.LayoutFldResultSharedAt, string>>;
type _State_LayoutFldResultShareLink = Assert<Assignable<typeof page.LayoutFldResultShareLink, string>>;
type _Action_generateStatusReport = Assert<Assignable<typeof page.generateStatusReport, (...args: any[]) => unknown>>;
type _Handler_handleGenerateStatusReportClick = Assert<Assignable<typeof page.handleGenerateStatusReportClick, (...args: any[]) => unknown>>;
type _Action_shareStatusReport = Assert<Assignable<typeof page.shareStatusReport, (...args: any[]) => unknown>>;
type _Handler_handleShareStatusReportClick = Assert<Assignable<typeof page.handleShareStatusReportClick, (...args: any[]) => unknown>>;
type _Action_setGenerateStatusReportProjectId = Assert<Assignable<typeof page.setGenerateStatusReportProjectId, (...args: any[]) => unknown>>;
type _Handler_handleGenerateStatusReportProjectIdChange = Assert<Assignable<typeof page.handleGenerateStatusReportProjectIdChange, (...args: any[]) => unknown>>;
type _Action_setGenerateStatusReportReportPeriodStart = Assert<Assignable<typeof page.setGenerateStatusReportReportPeriodStart, (...args: any[]) => unknown>>;
type _Handler_handleGenerateStatusReportReportPeriodStartChange = Assert<Assignable<typeof page.handleGenerateStatusReportReportPeriodStartChange, (...args: any[]) => unknown>>;
type _Action_setGenerateStatusReportReportPeriodEnd = Assert<Assignable<typeof page.setGenerateStatusReportReportPeriodEnd, (...args: any[]) => unknown>>;
type _Handler_handleGenerateStatusReportReportPeriodEndChange = Assert<Assignable<typeof page.handleGenerateStatusReportReportPeriodEndChange, (...args: any[]) => unknown>>;
type _Action_setShareStatusReportStatusReportId = Assert<Assignable<typeof page.setShareStatusReportStatusReportId, (...args: any[]) => unknown>>;
type _Handler_handleShareStatusReportStatusReportIdChange = Assert<Assignable<typeof page.handleShareStatusReportStatusReportIdChange, (...args: any[]) => unknown>>;
type _Action_setShareStatusReportSharedWithEmail = Assert<Assignable<typeof page.setShareStatusReportSharedWithEmail, (...args: any[]) => unknown>>;
type _Handler_handleShareStatusReportSharedWithEmailChange = Assert<Assignable<typeof page.handleShareStatusReportSharedWithEmailChange, (...args: any[]) => unknown>>;

export {};