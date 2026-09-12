/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/clientManagement.ts" enhancement="_blank"/>

export interface BuildFlowFsmBrowseClientsInput {
  searchName?: string;
  filterPortalAccess?: boolean;
}

export interface BuildFlowFsmBrowseClientsOutputItem {
  clientId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  portalAccessEnabled: boolean;
  createdAt: string;
}

export interface BuildFlowFsmBrowseClientsOutput {
  items: BuildFlowFsmBrowseClientsOutputItem[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface BuildFlowFsmCreateClientInput {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
}

export interface BuildFlowFsmCreateClientOutput {
  clientId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  portalAccessEnabled: boolean;
  billingAddress: string;
  createdAt: string;
}

export interface BuildFlowFsmUpdateClientInput {
  clientId: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  portalAccessEnabled: boolean;
  billingAddress?: string;
}

export interface BuildFlowFsmUpdateClientOutput {
  clientId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  portalAccessEnabled: boolean;
  billingAddress: string;
  updatedAt: string;
}
