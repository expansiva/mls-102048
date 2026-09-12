/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/changeOrderLifecycle.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmChangeOrderLifecycleBase } from './changeOrderLifecycle.js';
import type { BuildFlowFsmCreateChangeOrderInput, BuildFlowFsmSendChangeOrderInput } from '../contracts/changeOrderLifecycle.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmChangeOrderLifecycleBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_createChangeOrderState = Assert<Assignable<typeof page.createChangeOrderState, "idle" | "loading" | "success" | "error">>;
type _State_createChangeOrderProjectId = Assert<Assignable<typeof page.createChangeOrderProjectId, string | BuildFlowFsmCreateChangeOrderInput["projectId"]>>;
type _State_createChangeOrderTitle = Assert<Assignable<typeof page.createChangeOrderTitle, string | BuildFlowFsmCreateChangeOrderInput["title"]>>;
type _State_createChangeOrderScopeDescription = Assert<Assignable<typeof page.createChangeOrderScopeDescription, string | BuildFlowFsmCreateChangeOrderInput["scopeDescription"]>>;
type _State_createChangeOrderAmount = Assert<Assignable<typeof page.createChangeOrderAmount, string | BuildFlowFsmCreateChangeOrderInput["amount"]>>;
type _State_sendChangeOrderState = Assert<Assignable<typeof page.sendChangeOrderState, "idle" | "loading" | "success" | "error">>;
type _State_sendChangeOrderChangeOrderId = Assert<Assignable<typeof page.sendChangeOrderChangeOrderId, string | BuildFlowFsmSendChangeOrderInput["changeOrderId"]>>;
type _State_OutputCreateChangeOrder = Assert<Assignable<typeof page.OutputCreateChangeOrder, unknown>>;
type _State_OutputSendChangeOrder = Assert<Assignable<typeof page.OutputSendChangeOrder, unknown>>;
type _State_LayoutColListTitle = Assert<Assignable<typeof page.LayoutColListTitle, string>>;
type _State_LayoutColListAmount = Assert<Assignable<typeof page.LayoutColListAmount, string>>;
type _State_LayoutColListStatus = Assert<Assignable<typeof page.LayoutColListStatus, string>>;
type _State_LayoutColListCreatedAt = Assert<Assignable<typeof page.LayoutColListCreatedAt, string>>;
type _State_LayoutFltListStatus = Assert<Assignable<typeof page.LayoutFltListStatus, string>>;
type _Action_createChangeOrder = Assert<Assignable<typeof page.createChangeOrder, (...args: any[]) => unknown>>;
type _Handler_handleCreateChangeOrderClick = Assert<Assignable<typeof page.handleCreateChangeOrderClick, (...args: any[]) => unknown>>;
type _Action_sendChangeOrder = Assert<Assignable<typeof page.sendChangeOrder, (...args: any[]) => unknown>>;
type _Handler_handleSendChangeOrderClick = Assert<Assignable<typeof page.handleSendChangeOrderClick, (...args: any[]) => unknown>>;
type _Action_setCreateChangeOrderProjectId = Assert<Assignable<typeof page.setCreateChangeOrderProjectId, (...args: any[]) => unknown>>;
type _Handler_handleCreateChangeOrderProjectIdChange = Assert<Assignable<typeof page.handleCreateChangeOrderProjectIdChange, (...args: any[]) => unknown>>;
type _Action_setCreateChangeOrderTitle = Assert<Assignable<typeof page.setCreateChangeOrderTitle, (...args: any[]) => unknown>>;
type _Handler_handleCreateChangeOrderTitleChange = Assert<Assignable<typeof page.handleCreateChangeOrderTitleChange, (...args: any[]) => unknown>>;
type _Action_setCreateChangeOrderScopeDescription = Assert<Assignable<typeof page.setCreateChangeOrderScopeDescription, (...args: any[]) => unknown>>;
type _Handler_handleCreateChangeOrderScopeDescriptionChange = Assert<Assignable<typeof page.handleCreateChangeOrderScopeDescriptionChange, (...args: any[]) => unknown>>;
type _Action_setCreateChangeOrderAmount = Assert<Assignable<typeof page.setCreateChangeOrderAmount, (...args: any[]) => unknown>>;
type _Handler_handleCreateChangeOrderAmountChange = Assert<Assignable<typeof page.handleCreateChangeOrderAmountChange, (...args: any[]) => unknown>>;
type _Action_setSendChangeOrderChangeOrderId = Assert<Assignable<typeof page.setSendChangeOrderChangeOrderId, (...args: any[]) => unknown>>;
type _Handler_handleSendChangeOrderChangeOrderIdChange = Assert<Assignable<typeof page.handleSendChangeOrderChangeOrderIdChange, (...args: any[]) => unknown>>;

export {};