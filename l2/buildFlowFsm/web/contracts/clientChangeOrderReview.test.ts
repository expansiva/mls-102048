/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientChangeOrderReview.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmReviewChangeOrderInput, BuildFlowFsmReviewChangeOrderOutput } from './clientChangeOrderReview.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmReviewChangeOrderInput = {
  changeOrderId: string;
  decision: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  rejectionReason?: string;
};
type ExpectedBuildFlowFsmReviewChangeOrderOutput = {
  changeOrderId: string;
  title: string;
  scopeDescription: string;
  amount: number;
  status: "draft" | "sent" | "approved" | "rejected" | "cancelled";
  sentAt: string;
};

type _BuildFlowFsmReviewChangeOrderInput = Assert<Equal<BuildFlowFsmReviewChangeOrderInput, ExpectedBuildFlowFsmReviewChangeOrderInput>>;
type _BuildFlowFsmReviewChangeOrderOutput = Assert<Equal<BuildFlowFsmReviewChangeOrderOutput, ExpectedBuildFlowFsmReviewChangeOrderOutput>>;

export {};