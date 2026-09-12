/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientInvoiceView.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmClientInvoiceViewBase } from './clientInvoiceView.js';
import type { BuildFlowFsmViewInvoiceInput, BuildFlowFsmViewInvoiceOutput } from '../contracts/clientInvoiceView.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmClientInvoiceViewBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_viewInvoiceState = Assert<Assignable<typeof page.viewInvoiceState, "idle" | "loading" | "success" | "error">>;
type _State_viewInvoiceInvoiceId = Assert<Assignable<typeof page.viewInvoiceInvoiceId, string | BuildFlowFsmViewInvoiceInput["invoiceId"]>>;
type _State_viewInvoiceData = Assert<Assignable<typeof page.viewInvoiceData, BuildFlowFsmViewInvoiceOutput | null>>;
type _State_LayoutColLineType = Assert<Assignable<typeof page.LayoutColLineType, string>>;
type _State_LayoutColDescription = Assert<Assignable<typeof page.LayoutColDescription, string>>;
type _State_LayoutColQuantity = Assert<Assignable<typeof page.LayoutColQuantity, string>>;
type _State_LayoutColUnit = Assert<Assignable<typeof page.LayoutColUnit, string>>;
type _State_LayoutColUnitCost = Assert<Assignable<typeof page.LayoutColUnitCost, string>>;
type _State_LayoutColLineAmount = Assert<Assignable<typeof page.LayoutColLineAmount, string>>;
type _Action_loadViewInvoice = Assert<Assignable<typeof page.loadViewInvoice, (...args: any[]) => unknown>>;
type _Handler_handleViewInvoiceClick = Assert<Assignable<typeof page.handleViewInvoiceClick, (...args: any[]) => unknown>>;
type _Action_setViewInvoiceInvoiceId = Assert<Assignable<typeof page.setViewInvoiceInvoiceId, (...args: any[]) => unknown>>;
type _Handler_handleViewInvoiceInvoiceIdChange = Assert<Assignable<typeof page.handleViewInvoiceInvoiceIdChange, (...args: any[]) => unknown>>;

export {};