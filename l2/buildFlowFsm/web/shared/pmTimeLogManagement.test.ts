/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/pmTimeLogManagement.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmPmTimeLogManagementBase } from './pmTimeLogManagement.js';
import type { BuildFlowFsmVoidTimeLogInput } from '../contracts/pmTimeLogManagement.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmPmTimeLogManagementBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_voidTimeLogState = Assert<Assignable<typeof page.voidTimeLogState, "idle" | "loading" | "success" | "error">>;
type _State_voidTimeLogTimeLogId = Assert<Assignable<typeof page.voidTimeLogTimeLogId, string | BuildFlowFsmVoidTimeLogInput["timeLogId"]>>;
type _State_voidTimeLogVoidReason = Assert<Assignable<typeof page.voidTimeLogVoidReason, string | BuildFlowFsmVoidTimeLogInput["voidReason"]>>;
type _State_OutputVoidTimeLog = Assert<Assignable<typeof page.OutputVoidTimeLog, unknown>>;
type _State_LayoutFldCtxWorkTaskId = Assert<Assignable<typeof page.LayoutFldCtxWorkTaskId, string>>;
type _State_LayoutFldCtxWorkerId = Assert<Assignable<typeof page.LayoutFldCtxWorkerId, string>>;
type _State_LayoutFldCtxLogDate = Assert<Assignable<typeof page.LayoutFldCtxLogDate, string>>;
type _State_LayoutFldCtxHours = Assert<Assignable<typeof page.LayoutFldCtxHours, string>>;
type _State_LayoutFldCtxWorkerRate = Assert<Assignable<typeof page.LayoutFldCtxWorkerRate, string>>;
type _State_LayoutFldCtxStatus = Assert<Assignable<typeof page.LayoutFldCtxStatus, string>>;
type _Action_voidTimeLog = Assert<Assignable<typeof page.voidTimeLog, (...args: any[]) => unknown>>;
type _Handler_handleVoidTimeLogClick = Assert<Assignable<typeof page.handleVoidTimeLogClick, (...args: any[]) => unknown>>;
type _Action_setVoidTimeLogTimeLogId = Assert<Assignable<typeof page.setVoidTimeLogTimeLogId, (...args: any[]) => unknown>>;
type _Handler_handleVoidTimeLogTimeLogIdChange = Assert<Assignable<typeof page.handleVoidTimeLogTimeLogIdChange, (...args: any[]) => unknown>>;
type _Action_setVoidTimeLogVoidReason = Assert<Assignable<typeof page.setVoidTimeLogVoidReason, (...args: any[]) => unknown>>;
type _Handler_handleVoidTimeLogVoidReasonChange = Assert<Assignable<typeof page.handleVoidTimeLogVoidReasonChange, (...args: any[]) => unknown>>;

export {};