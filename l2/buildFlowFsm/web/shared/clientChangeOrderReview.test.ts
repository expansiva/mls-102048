/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientChangeOrderReview.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmClientChangeOrderReviewBase } from './clientChangeOrderReview.js';
import type { BuildFlowFsmReviewChangeOrderInput } from '../contracts/clientChangeOrderReview.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmClientChangeOrderReviewBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_reviewChangeOrderState = Assert<Assignable<typeof page.reviewChangeOrderState, "idle" | "loading" | "success" | "error">>;
type _State_reviewChangeOrderChangeOrderId = Assert<Assignable<typeof page.reviewChangeOrderChangeOrderId, string | BuildFlowFsmReviewChangeOrderInput["changeOrderId"]>>;
type _State_reviewChangeOrderDecision = Assert<Assignable<typeof page.reviewChangeOrderDecision, string | BuildFlowFsmReviewChangeOrderInput["decision"]>>;
type _State_reviewChangeOrderRejectionReason = Assert<Assignable<typeof page.reviewChangeOrderRejectionReason, string | BuildFlowFsmReviewChangeOrderInput["rejectionReason"]>>;
type _State_OutputReviewChangeOrder = Assert<Assignable<typeof page.OutputReviewChangeOrder, unknown>>;
type _State_LayoutFldSummaryTitle = Assert<Assignable<typeof page.LayoutFldSummaryTitle, string>>;
type _State_LayoutFldSummaryScope = Assert<Assignable<typeof page.LayoutFldSummaryScope, string>>;
type _State_LayoutFldSummaryAmount = Assert<Assignable<typeof page.LayoutFldSummaryAmount, string>>;
type _State_LayoutFldSummaryStatus = Assert<Assignable<typeof page.LayoutFldSummaryStatus, string>>;
type _State_LayoutFldSummarySentAt = Assert<Assignable<typeof page.LayoutFldSummarySentAt, string>>;
type _State_LayoutFldResultStatus = Assert<Assignable<typeof page.LayoutFldResultStatus, string>>;
type _State_LayoutFldResultApprovedAt = Assert<Assignable<typeof page.LayoutFldResultApprovedAt, string>>;
type _State_LayoutFldResultRejectedAt = Assert<Assignable<typeof page.LayoutFldResultRejectedAt, string>>;
type _State_LayoutFldResultUpdatedAt = Assert<Assignable<typeof page.LayoutFldResultUpdatedAt, string>>;
type _Action_reviewChangeOrder = Assert<Assignable<typeof page.reviewChangeOrder, (...args: any[]) => unknown>>;
type _Handler_handleReviewChangeOrderClick = Assert<Assignable<typeof page.handleReviewChangeOrderClick, (...args: any[]) => unknown>>;
type _Action_setReviewChangeOrderChangeOrderId = Assert<Assignable<typeof page.setReviewChangeOrderChangeOrderId, (...args: any[]) => unknown>>;
type _Handler_handleReviewChangeOrderChangeOrderIdChange = Assert<Assignable<typeof page.handleReviewChangeOrderChangeOrderIdChange, (...args: any[]) => unknown>>;
type _Action_setReviewChangeOrderDecision = Assert<Assignable<typeof page.setReviewChangeOrderDecision, (...args: any[]) => unknown>>;
type _Handler_handleReviewChangeOrderDecisionChange = Assert<Assignable<typeof page.handleReviewChangeOrderDecisionChange, (...args: any[]) => unknown>>;
type _Action_setReviewChangeOrderRejectionReason = Assert<Assignable<typeof page.setReviewChangeOrderRejectionReason, (...args: any[]) => unknown>>;
type _Handler_handleReviewChangeOrderRejectionReasonChange = Assert<Assignable<typeof page.handleReviewChangeOrderRejectionReasonChange, (...args: any[]) => unknown>>;

export {};