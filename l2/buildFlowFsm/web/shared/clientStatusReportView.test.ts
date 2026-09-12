/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientStatusReportView.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmClientStatusReportViewBase } from './clientStatusReportView.js';
import type { BuildFlowFsmViewStatusReportInput, BuildFlowFsmViewStatusReportOutput } from '../contracts/clientStatusReportView.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmClientStatusReportViewBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_viewStatusReportState = Assert<Assignable<typeof page.viewStatusReportState, "idle" | "loading" | "success" | "error">>;
type _State_viewStatusReportStatusReportId = Assert<Assignable<typeof page.viewStatusReportStatusReportId, string | BuildFlowFsmViewStatusReportInput["statusReportId"]>>;
type _State_viewStatusReportData = Assert<Assignable<typeof page.viewStatusReportData, BuildFlowFsmViewStatusReportOutput | null>>;
type _Action_loadViewStatusReport = Assert<Assignable<typeof page.loadViewStatusReport, (...args: any[]) => unknown>>;
type _Handler_handleViewStatusReportClick = Assert<Assignable<typeof page.handleViewStatusReportClick, (...args: any[]) => unknown>>;
type _Action_setViewStatusReportStatusReportId = Assert<Assignable<typeof page.setViewStatusReportStatusReportId, (...args: any[]) => unknown>>;
type _Handler_handleViewStatusReportStatusReportIdChange = Assert<Assignable<typeof page.handleViewStatusReportStatusReportIdChange, (...args: any[]) => unknown>>;

export {};