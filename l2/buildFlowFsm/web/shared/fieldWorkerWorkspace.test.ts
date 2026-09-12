/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/fieldWorkerWorkspace.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { BuildFlowFsmFieldWorkerWorkspaceBase } from './fieldWorkerWorkspace.js';
import type { BuildFlowFsmBrowseTasksOutput, BuildFlowFsmCreateMaterialUsageInput, BuildFlowFsmCreateTimeLogInput, BuildFlowFsmUpdateTaskStatusInput } from '../contracts/fieldWorkerWorkspace.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: BuildFlowFsmFieldWorkerWorkspaceBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_browseTasksState = Assert<Assignable<typeof page.browseTasksState, "idle" | "loading" | "success" | "error">>;
type _State_browseTasksData = Assert<Assignable<typeof page.browseTasksData, BuildFlowFsmBrowseTasksOutput>>;
type _State_updateTaskStatusState = Assert<Assignable<typeof page.updateTaskStatusState, "idle" | "loading" | "success" | "error">>;
type _State_updateTaskStatusWorkTaskId = Assert<Assignable<typeof page.updateTaskStatusWorkTaskId, string | BuildFlowFsmUpdateTaskStatusInput["workTaskId"]>>;
type _State_updateTaskStatusStatus = Assert<Assignable<typeof page.updateTaskStatusStatus, string | BuildFlowFsmUpdateTaskStatusInput["status"]>>;
type _State_createTimeLogState = Assert<Assignable<typeof page.createTimeLogState, "idle" | "loading" | "success" | "error">>;
type _State_createTimeLogWorkTaskId = Assert<Assignable<typeof page.createTimeLogWorkTaskId, string | BuildFlowFsmCreateTimeLogInput["workTaskId"]>>;
type _State_createTimeLogLogDate = Assert<Assignable<typeof page.createTimeLogLogDate, string | BuildFlowFsmCreateTimeLogInput["logDate"]>>;
type _State_createTimeLogHours = Assert<Assignable<typeof page.createTimeLogHours, string | BuildFlowFsmCreateTimeLogInput["hours"]>>;
type _State_createMaterialUsageState = Assert<Assignable<typeof page.createMaterialUsageState, "idle" | "loading" | "success" | "error">>;
type _State_createMaterialUsageProjectId = Assert<Assignable<typeof page.createMaterialUsageProjectId, string | BuildFlowFsmCreateMaterialUsageInput["projectId"]>>;
type _State_createMaterialUsageMaterialName = Assert<Assignable<typeof page.createMaterialUsageMaterialName, string | BuildFlowFsmCreateMaterialUsageInput["materialName"]>>;
type _State_createMaterialUsageQuantity = Assert<Assignable<typeof page.createMaterialUsageQuantity, string | BuildFlowFsmCreateMaterialUsageInput["quantity"]>>;
type _State_createMaterialUsageUnit = Assert<Assignable<typeof page.createMaterialUsageUnit, string | BuildFlowFsmCreateMaterialUsageInput["unit"]>>;
type _State_createMaterialUsageUnitCost = Assert<Assignable<typeof page.createMaterialUsageUnitCost, string | BuildFlowFsmCreateMaterialUsageInput["unitCost"]>>;
type _State_createMaterialUsageTotalCost = Assert<Assignable<typeof page.createMaterialUsageTotalCost, string | BuildFlowFsmCreateMaterialUsageInput["totalCost"]>>;
type _State_createMaterialUsageUsageDate = Assert<Assignable<typeof page.createMaterialUsageUsageDate, string | BuildFlowFsmCreateMaterialUsageInput["usageDate"]>>;
type _State_OutputUpdateTaskStatus = Assert<Assignable<typeof page.OutputUpdateTaskStatus, unknown>>;
type _State_OutputCreateTimeLog = Assert<Assignable<typeof page.OutputCreateTimeLog, unknown>>;
type _State_OutputCreateMaterialUsage = Assert<Assignable<typeof page.OutputCreateMaterialUsage, unknown>>;
type _Action_loadBrowseTasks = Assert<Assignable<typeof page.loadBrowseTasks, (...args: any[]) => unknown>>;
type _Handler_handleBrowseTasksClick = Assert<Assignable<typeof page.handleBrowseTasksClick, (...args: any[]) => unknown>>;
type _Action_updateTaskStatus = Assert<Assignable<typeof page.updateTaskStatus, (...args: any[]) => unknown>>;
type _Handler_handleUpdateTaskStatusClick = Assert<Assignable<typeof page.handleUpdateTaskStatusClick, (...args: any[]) => unknown>>;
type _Action_createTimeLog = Assert<Assignable<typeof page.createTimeLog, (...args: any[]) => unknown>>;
type _Handler_handleCreateTimeLogClick = Assert<Assignable<typeof page.handleCreateTimeLogClick, (...args: any[]) => unknown>>;
type _Action_createMaterialUsage = Assert<Assignable<typeof page.createMaterialUsage, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageClick = Assert<Assignable<typeof page.handleCreateMaterialUsageClick, (...args: any[]) => unknown>>;
type _Action_setUpdateTaskStatusWorkTaskId = Assert<Assignable<typeof page.setUpdateTaskStatusWorkTaskId, (...args: any[]) => unknown>>;
type _Handler_handleUpdateTaskStatusWorkTaskIdChange = Assert<Assignable<typeof page.handleUpdateTaskStatusWorkTaskIdChange, (...args: any[]) => unknown>>;
type _Action_setUpdateTaskStatusStatus = Assert<Assignable<typeof page.setUpdateTaskStatusStatus, (...args: any[]) => unknown>>;
type _Handler_handleUpdateTaskStatusStatusChange = Assert<Assignable<typeof page.handleUpdateTaskStatusStatusChange, (...args: any[]) => unknown>>;
type _Action_setCreateTimeLogWorkTaskId = Assert<Assignable<typeof page.setCreateTimeLogWorkTaskId, (...args: any[]) => unknown>>;
type _Handler_handleCreateTimeLogWorkTaskIdChange = Assert<Assignable<typeof page.handleCreateTimeLogWorkTaskIdChange, (...args: any[]) => unknown>>;
type _Action_setCreateTimeLogLogDate = Assert<Assignable<typeof page.setCreateTimeLogLogDate, (...args: any[]) => unknown>>;
type _Handler_handleCreateTimeLogLogDateChange = Assert<Assignable<typeof page.handleCreateTimeLogLogDateChange, (...args: any[]) => unknown>>;
type _Action_setCreateTimeLogHours = Assert<Assignable<typeof page.setCreateTimeLogHours, (...args: any[]) => unknown>>;
type _Handler_handleCreateTimeLogHoursChange = Assert<Assignable<typeof page.handleCreateTimeLogHoursChange, (...args: any[]) => unknown>>;
type _Action_setCreateMaterialUsageProjectId = Assert<Assignable<typeof page.setCreateMaterialUsageProjectId, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageProjectIdChange = Assert<Assignable<typeof page.handleCreateMaterialUsageProjectIdChange, (...args: any[]) => unknown>>;
type _Action_setCreateMaterialUsageMaterialName = Assert<Assignable<typeof page.setCreateMaterialUsageMaterialName, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageMaterialNameChange = Assert<Assignable<typeof page.handleCreateMaterialUsageMaterialNameChange, (...args: any[]) => unknown>>;
type _Action_setCreateMaterialUsageQuantity = Assert<Assignable<typeof page.setCreateMaterialUsageQuantity, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageQuantityChange = Assert<Assignable<typeof page.handleCreateMaterialUsageQuantityChange, (...args: any[]) => unknown>>;
type _Action_setCreateMaterialUsageUnit = Assert<Assignable<typeof page.setCreateMaterialUsageUnit, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageUnitChange = Assert<Assignable<typeof page.handleCreateMaterialUsageUnitChange, (...args: any[]) => unknown>>;
type _Action_setCreateMaterialUsageUnitCost = Assert<Assignable<typeof page.setCreateMaterialUsageUnitCost, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageUnitCostChange = Assert<Assignable<typeof page.handleCreateMaterialUsageUnitCostChange, (...args: any[]) => unknown>>;
type _Action_setCreateMaterialUsageTotalCost = Assert<Assignable<typeof page.setCreateMaterialUsageTotalCost, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageTotalCostChange = Assert<Assignable<typeof page.handleCreateMaterialUsageTotalCostChange, (...args: any[]) => unknown>>;
type _Action_setCreateMaterialUsageUsageDate = Assert<Assignable<typeof page.setCreateMaterialUsageUsageDate, (...args: any[]) => unknown>>;
type _Handler_handleCreateMaterialUsageUsageDateChange = Assert<Assignable<typeof page.handleCreateMaterialUsageUsageDateChange, (...args: any[]) => unknown>>;

export {};