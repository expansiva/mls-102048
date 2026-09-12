/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/pmMaterialUsageManagement.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmPmMaterialUsageManagementBase } from './pmMaterialUsageManagement.js';
import type { BuildFlowFsmVoidMaterialUsageInput } from '../contracts/pmMaterialUsageManagement.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmPmMaterialUsageManagementBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_voidMaterialUsageState = Assert<Assignable<typeof page.voidMaterialUsageState, "idle" | "loading" | "success" | "error">>;
type _State_voidMaterialUsageMaterialUsageId = Assert<Assignable<typeof page.voidMaterialUsageMaterialUsageId, string | BuildFlowFsmVoidMaterialUsageInput["materialUsageId"]>>;
type _State_voidMaterialUsageVoidReason = Assert<Assignable<typeof page.voidMaterialUsageVoidReason, string | BuildFlowFsmVoidMaterialUsageInput["voidReason"]>>;
type _State_OutputVoidMaterialUsage = Assert<Assignable<typeof page.OutputVoidMaterialUsage, unknown>>;
type _State_LayoutFldMaterialName = Assert<Assignable<typeof page.LayoutFldMaterialName, string>>;
type _State_LayoutFldQuantity = Assert<Assignable<typeof page.LayoutFldQuantity, string>>;
type _State_LayoutFldUnit = Assert<Assignable<typeof page.LayoutFldUnit, string>>;
type _State_LayoutFldUnitCost = Assert<Assignable<typeof page.LayoutFldUnitCost, string>>;
type _State_LayoutFldTotalCost = Assert<Assignable<typeof page.LayoutFldTotalCost, string>>;
type _State_LayoutFldUsageDate = Assert<Assignable<typeof page.LayoutFldUsageDate, string>>;
type _State_LayoutFldStatus = Assert<Assignable<typeof page.LayoutFldStatus, string>>;
type _State_LayoutFldSummaryStatus = Assert<Assignable<typeof page.LayoutFldSummaryStatus, string>>;
type _State_LayoutFldSummaryVoidedAt = Assert<Assignable<typeof page.LayoutFldSummaryVoidedAt, string>>;
type _Action_voidMaterialUsage = Assert<Assignable<typeof page.voidMaterialUsage, (...args: any[]) => unknown>>;
type _Handler_handleVoidMaterialUsageClick = Assert<Assignable<typeof page.handleVoidMaterialUsageClick, (...args: any[]) => unknown>>;
type _Action_setVoidMaterialUsageMaterialUsageId = Assert<Assignable<typeof page.setVoidMaterialUsageMaterialUsageId, (...args: any[]) => unknown>>;
type _Handler_handleVoidMaterialUsageMaterialUsageIdChange = Assert<Assignable<typeof page.handleVoidMaterialUsageMaterialUsageIdChange, (...args: any[]) => unknown>>;
type _Action_setVoidMaterialUsageVoidReason = Assert<Assignable<typeof page.setVoidMaterialUsageVoidReason, (...args: any[]) => unknown>>;
type _Handler_handleVoidMaterialUsageVoidReasonChange = Assert<Assignable<typeof page.handleVoidMaterialUsageVoidReasonChange, (...args: any[]) => unknown>>;

export {};