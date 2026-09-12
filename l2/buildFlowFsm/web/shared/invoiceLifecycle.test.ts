/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/invoiceLifecycle.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmInvoiceLifecycleBase } from './invoiceLifecycle.js';
import type { BuildFlowFsmGenerateInvoiceInput, BuildFlowFsmIssueInvoiceInput } from '../contracts/invoiceLifecycle.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmInvoiceLifecycleBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_generateInvoiceState = Assert<Assignable<typeof page.generateInvoiceState, "idle" | "loading" | "success" | "error">>;
type _State_generateInvoiceProjectId = Assert<Assignable<typeof page.generateInvoiceProjectId, string | BuildFlowFsmGenerateInvoiceInput["projectId"]>>;
type _State_generateInvoiceClientEmail = Assert<Assignable<typeof page.generateInvoiceClientEmail, string | BuildFlowFsmGenerateInvoiceInput["clientEmail"]>>;
type _State_generateInvoiceNotes = Assert<Assignable<typeof page.generateInvoiceNotes, string | BuildFlowFsmGenerateInvoiceInput["notes"]>>;
type _State_issueInvoiceState = Assert<Assignable<typeof page.issueInvoiceState, "idle" | "loading" | "success" | "error">>;
type _State_issueInvoiceInvoiceId = Assert<Assignable<typeof page.issueInvoiceInvoiceId, string | BuildFlowFsmIssueInvoiceInput["invoiceId"]>>;
type _State_issueInvoiceClientEmail = Assert<Assignable<typeof page.issueInvoiceClientEmail, string | BuildFlowFsmIssueInvoiceInput["clientEmail"]>>;
type _State_OutputGenerateInvoice = Assert<Assignable<typeof page.OutputGenerateInvoice, unknown>>;
type _State_OutputIssueInvoice = Assert<Assignable<typeof page.OutputIssueInvoice, unknown>>;
type _State_LayoutFldWfStatus = Assert<Assignable<typeof page.LayoutFldWfStatus, string>>;
type _State_LayoutFldWfTotal = Assert<Assignable<typeof page.LayoutFldWfTotal, string>>;
type _Action_generateInvoice = Assert<Assignable<typeof page.generateInvoice, (...args: any[]) => unknown>>;
type _Handler_handleGenerateInvoiceClick = Assert<Assignable<typeof page.handleGenerateInvoiceClick, (...args: any[]) => unknown>>;
type _Action_issueInvoice = Assert<Assignable<typeof page.issueInvoice, (...args: any[]) => unknown>>;
type _Handler_handleIssueInvoiceClick = Assert<Assignable<typeof page.handleIssueInvoiceClick, (...args: any[]) => unknown>>;
type _Action_setGenerateInvoiceProjectId = Assert<Assignable<typeof page.setGenerateInvoiceProjectId, (...args: any[]) => unknown>>;
type _Handler_handleGenerateInvoiceProjectIdChange = Assert<Assignable<typeof page.handleGenerateInvoiceProjectIdChange, (...args: any[]) => unknown>>;
type _Action_setGenerateInvoiceClientEmail = Assert<Assignable<typeof page.setGenerateInvoiceClientEmail, (...args: any[]) => unknown>>;
type _Handler_handleGenerateInvoiceClientEmailChange = Assert<Assignable<typeof page.handleGenerateInvoiceClientEmailChange, (...args: any[]) => unknown>>;
type _Action_setGenerateInvoiceNotes = Assert<Assignable<typeof page.setGenerateInvoiceNotes, (...args: any[]) => unknown>>;
type _Handler_handleGenerateInvoiceNotesChange = Assert<Assignable<typeof page.handleGenerateInvoiceNotesChange, (...args: any[]) => unknown>>;
type _Action_setIssueInvoiceInvoiceId = Assert<Assignable<typeof page.setIssueInvoiceInvoiceId, (...args: any[]) => unknown>>;
type _Handler_handleIssueInvoiceInvoiceIdChange = Assert<Assignable<typeof page.handleIssueInvoiceInvoiceIdChange, (...args: any[]) => unknown>>;
type _Action_setIssueInvoiceClientEmail = Assert<Assignable<typeof page.setIssueInvoiceClientEmail, (...args: any[]) => unknown>>;
type _Handler_handleIssueInvoiceClientEmailChange = Assert<Assignable<typeof page.handleIssueInvoiceClientEmailChange, (...args: any[]) => unknown>>;

export {};