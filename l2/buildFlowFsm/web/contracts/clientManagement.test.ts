/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientManagement.test.ts" enhancement="_blank"/>

import type { BuildFlowFsmBrowseClientsInput, BuildFlowFsmBrowseClientsOutput, BuildFlowFsmBrowseClientsOutputItem, BuildFlowFsmCreateClientInput, BuildFlowFsmCreateClientOutput, BuildFlowFsmUpdateClientInput, BuildFlowFsmUpdateClientOutput } from './clientManagement.js';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// This file is generated from .defs.ts so tsc catches contract drift in the generated .ts.
type ExpectedBuildFlowFsmBrowseClientsInput = {
  searchName?: string;
  filterPortalAccess?: boolean;
};
type ExpectedBuildFlowFsmBrowseClientsOutputItem = {
  clientId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  portalAccessEnabled: boolean;
  createdAt: string;
};
type ExpectedBuildFlowFsmBrowseClientsOutput = { items: ExpectedBuildFlowFsmBrowseClientsOutputItem[]; total: number; page?: number; pageSize?: number; };
type ExpectedBuildFlowFsmCreateClientInput = {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
};
type ExpectedBuildFlowFsmCreateClientOutput = {
  clientId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  portalAccessEnabled: boolean;
  billingAddress: string;
  createdAt: string;
};
type ExpectedBuildFlowFsmUpdateClientInput = {
  clientId: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
};
type ExpectedBuildFlowFsmUpdateClientOutput = {
  clientId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  portalAccessEnabled: boolean;
  billingAddress: string;
  updatedAt: string;
};

type _BuildFlowFsmBrowseClientsInput = Assert<Equal<BuildFlowFsmBrowseClientsInput, ExpectedBuildFlowFsmBrowseClientsInput>>;
type _BuildFlowFsmBrowseClientsOutputItem = Assert<Equal<BuildFlowFsmBrowseClientsOutputItem, ExpectedBuildFlowFsmBrowseClientsOutputItem>>;
type _BuildFlowFsmBrowseClientsOutput = Assert<Equal<BuildFlowFsmBrowseClientsOutput, ExpectedBuildFlowFsmBrowseClientsOutput>>;
type _BuildFlowFsmCreateClientInput = Assert<Equal<BuildFlowFsmCreateClientInput, ExpectedBuildFlowFsmCreateClientInput>>;
type _BuildFlowFsmCreateClientOutput = Assert<Equal<BuildFlowFsmCreateClientOutput, ExpectedBuildFlowFsmCreateClientOutput>>;
type _BuildFlowFsmUpdateClientInput = Assert<Equal<BuildFlowFsmUpdateClientInput, ExpectedBuildFlowFsmUpdateClientInput>>;
type _BuildFlowFsmUpdateClientOutput = Assert<Equal<BuildFlowFsmUpdateClientOutput, ExpectedBuildFlowFsmUpdateClientOutput>>;

export {};