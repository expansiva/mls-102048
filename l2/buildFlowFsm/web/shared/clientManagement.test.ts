/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/clientManagement.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmClientManagementBase } from './clientManagement.js';
import type { BuildFlowFsmBrowseClientsInput, BuildFlowFsmBrowseClientsOutput, BuildFlowFsmCreateClientInput, BuildFlowFsmUpdateClientInput } from '../contracts/clientManagement.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmClientManagementBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_browseClientsState = Assert<Assignable<typeof page.browseClientsState, "idle" | "loading" | "success" | "error">>;
type _State_browseClientsSearchName = Assert<Assignable<typeof page.browseClientsSearchName, string | BuildFlowFsmBrowseClientsInput["searchName"]>>;
type _State_browseClientsFilterPortalAccess = Assert<Assignable<typeof page.browseClientsFilterPortalAccess, string | BuildFlowFsmBrowseClientsInput["filterPortalAccess"]>>;
type _State_browseClientsData = Assert<Assignable<typeof page.browseClientsData, BuildFlowFsmBrowseClientsOutput>>;
type _State_createClientState = Assert<Assignable<typeof page.createClientState, "idle" | "loading" | "success" | "error">>;
type _State_createClientName = Assert<Assignable<typeof page.createClientName, string | BuildFlowFsmCreateClientInput["name"]>>;
type _State_createClientCompanyName = Assert<Assignable<typeof page.createClientCompanyName, string | BuildFlowFsmCreateClientInput["companyName"]>>;
type _State_createClientEmail = Assert<Assignable<typeof page.createClientEmail, string | BuildFlowFsmCreateClientInput["email"]>>;
type _State_createClientPhone = Assert<Assignable<typeof page.createClientPhone, string | BuildFlowFsmCreateClientInput["phone"]>>;
type _State_createClientPortalAccessEnabled = Assert<Assignable<typeof page.createClientPortalAccessEnabled, string | BuildFlowFsmCreateClientInput["portalAccessEnabled"]>>;
type _State_createClientBillingAddress = Assert<Assignable<typeof page.createClientBillingAddress, string | BuildFlowFsmCreateClientInput["billingAddress"]>>;
type _State_updateClientState = Assert<Assignable<typeof page.updateClientState, "idle" | "loading" | "success" | "error">>;
type _State_updateClientClientId = Assert<Assignable<typeof page.updateClientClientId, string | BuildFlowFsmUpdateClientInput["clientId"]>>;
type _State_updateClientName = Assert<Assignable<typeof page.updateClientName, string | BuildFlowFsmUpdateClientInput["name"]>>;
type _State_updateClientCompanyName = Assert<Assignable<typeof page.updateClientCompanyName, string | BuildFlowFsmUpdateClientInput["companyName"]>>;
type _State_updateClientEmail = Assert<Assignable<typeof page.updateClientEmail, string | BuildFlowFsmUpdateClientInput["email"]>>;
type _State_updateClientPhone = Assert<Assignable<typeof page.updateClientPhone, string | BuildFlowFsmUpdateClientInput["phone"]>>;
type _State_updateClientPortalAccessEnabled = Assert<Assignable<typeof page.updateClientPortalAccessEnabled, string | BuildFlowFsmUpdateClientInput["portalAccessEnabled"]>>;
type _State_updateClientBillingAddress = Assert<Assignable<typeof page.updateClientBillingAddress, string | BuildFlowFsmUpdateClientInput["billingAddress"]>>;
type _State_OutputCreateClient = Assert<Assignable<typeof page.OutputCreateClient, unknown>>;
type _State_OutputUpdateClient = Assert<Assignable<typeof page.OutputUpdateClient, unknown>>;
type _State_LayoutFldSumBillingAddress = Assert<Assignable<typeof page.LayoutFldSumBillingAddress, string>>;
type _State_LayoutFldSumUpdatedAt = Assert<Assignable<typeof page.LayoutFldSumUpdatedAt, string>>;
type _Action_loadBrowseClients = Assert<Assignable<typeof page.loadBrowseClients, (...args: any[]) => unknown>>;
type _Handler_handleBrowseClientsClick = Assert<Assignable<typeof page.handleBrowseClientsClick, (...args: any[]) => unknown>>;
type _Action_createClient = Assert<Assignable<typeof page.createClient, (...args: any[]) => unknown>>;
type _Handler_handleCreateClientClick = Assert<Assignable<typeof page.handleCreateClientClick, (...args: any[]) => unknown>>;
type _Action_updateClient = Assert<Assignable<typeof page.updateClient, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientClick = Assert<Assignable<typeof page.handleUpdateClientClick, (...args: any[]) => unknown>>;
type _Action_setBrowseClientsSearchName = Assert<Assignable<typeof page.setBrowseClientsSearchName, (...args: any[]) => unknown>>;
type _Handler_handleBrowseClientsSearchNameChange = Assert<Assignable<typeof page.handleBrowseClientsSearchNameChange, (...args: any[]) => unknown>>;
type _Action_setBrowseClientsFilterPortalAccess = Assert<Assignable<typeof page.setBrowseClientsFilterPortalAccess, (...args: any[]) => unknown>>;
type _Handler_handleBrowseClientsFilterPortalAccessChange = Assert<Assignable<typeof page.handleBrowseClientsFilterPortalAccessChange, (...args: any[]) => unknown>>;
type _Action_setCreateClientName = Assert<Assignable<typeof page.setCreateClientName, (...args: any[]) => unknown>>;
type _Handler_handleCreateClientNameChange = Assert<Assignable<typeof page.handleCreateClientNameChange, (...args: any[]) => unknown>>;
type _Action_setCreateClientCompanyName = Assert<Assignable<typeof page.setCreateClientCompanyName, (...args: any[]) => unknown>>;
type _Handler_handleCreateClientCompanyNameChange = Assert<Assignable<typeof page.handleCreateClientCompanyNameChange, (...args: any[]) => unknown>>;
type _Action_setCreateClientEmail = Assert<Assignable<typeof page.setCreateClientEmail, (...args: any[]) => unknown>>;
type _Handler_handleCreateClientEmailChange = Assert<Assignable<typeof page.handleCreateClientEmailChange, (...args: any[]) => unknown>>;
type _Action_setCreateClientPhone = Assert<Assignable<typeof page.setCreateClientPhone, (...args: any[]) => unknown>>;
type _Handler_handleCreateClientPhoneChange = Assert<Assignable<typeof page.handleCreateClientPhoneChange, (...args: any[]) => unknown>>;
type _Action_setCreateClientPortalAccessEnabled = Assert<Assignable<typeof page.setCreateClientPortalAccessEnabled, (...args: any[]) => unknown>>;
type _Handler_handleCreateClientPortalAccessEnabledChange = Assert<Assignable<typeof page.handleCreateClientPortalAccessEnabledChange, (...args: any[]) => unknown>>;
type _Action_setCreateClientBillingAddress = Assert<Assignable<typeof page.setCreateClientBillingAddress, (...args: any[]) => unknown>>;
type _Handler_handleCreateClientBillingAddressChange = Assert<Assignable<typeof page.handleCreateClientBillingAddressChange, (...args: any[]) => unknown>>;
type _Action_setUpdateClientClientId = Assert<Assignable<typeof page.setUpdateClientClientId, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientClientIdChange = Assert<Assignable<typeof page.handleUpdateClientClientIdChange, (...args: any[]) => unknown>>;
type _Action_setUpdateClientName = Assert<Assignable<typeof page.setUpdateClientName, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientNameChange = Assert<Assignable<typeof page.handleUpdateClientNameChange, (...args: any[]) => unknown>>;
type _Action_setUpdateClientCompanyName = Assert<Assignable<typeof page.setUpdateClientCompanyName, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientCompanyNameChange = Assert<Assignable<typeof page.handleUpdateClientCompanyNameChange, (...args: any[]) => unknown>>;
type _Action_setUpdateClientEmail = Assert<Assignable<typeof page.setUpdateClientEmail, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientEmailChange = Assert<Assignable<typeof page.handleUpdateClientEmailChange, (...args: any[]) => unknown>>;
type _Action_setUpdateClientPhone = Assert<Assignable<typeof page.setUpdateClientPhone, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientPhoneChange = Assert<Assignable<typeof page.handleUpdateClientPhoneChange, (...args: any[]) => unknown>>;
type _Action_setUpdateClientPortalAccessEnabled = Assert<Assignable<typeof page.setUpdateClientPortalAccessEnabled, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientPortalAccessEnabledChange = Assert<Assignable<typeof page.handleUpdateClientPortalAccessEnabledChange, (...args: any[]) => unknown>>;
type _Action_setUpdateClientBillingAddress = Assert<Assignable<typeof page.setUpdateClientBillingAddress, (...args: any[]) => unknown>>;
type _Handler_handleUpdateClientBillingAddressChange = Assert<Assignable<typeof page.handleUpdateClientBillingAddressChange, (...args: any[]) => unknown>>;

export {};