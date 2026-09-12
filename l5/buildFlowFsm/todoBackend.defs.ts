/// <mls fileReference="_102048_/l5/buildFlowFsm/todoBackend.defs.ts" enhancement="_blank"/>

export const buildFlowFsmTodoBackend = {
  "schemaVersion": "2026-07-02-layer-todo",
  "moduleName": "buildFlowFsm",
  "layer": "backend",
  "updatedAt": "2026-07-12T23:30:26.072Z",
  "owners": [
    {
      "ownerType": "workflow",
      "ownerId": "projectLifecycle",
      "title": "Project Lifecycle",
      "status": "inProgress",
      "defPath": "l4/workflows/projectLifecycle.defs.ts",
      "pageId": "projectLifecycle",
      "capabilityId": "projectLifecycle"
    },
    {
      "ownerType": "workflow",
      "ownerId": "workTaskLifecycle",
      "title": "Work Task Lifecycle",
      "status": "inProgress",
      "defPath": "l4/workflows/workTaskLifecycle.defs.ts",
      "pageId": "workTaskLifecycle",
      "capabilityId": "workTaskLifecycle"
    },
    {
      "ownerType": "workflow",
      "ownerId": "changeOrderLifecycle",
      "title": "Change Order Lifecycle",
      "status": "inProgress",
      "defPath": "l4/workflows/changeOrderLifecycle.defs.ts",
      "pageId": "changeOrderLifecycle",
      "capabilityId": "changeOrderLifecycle"
    },
    {
      "ownerType": "workflow",
      "ownerId": "invoiceLifecycle",
      "title": "Invoice Lifecycle",
      "status": "inProgress",
      "defPath": "l4/workflows/invoiceLifecycle.defs.ts",
      "pageId": "invoiceLifecycle",
      "capabilityId": "invoiceLifecycle"
    },
    {
      "ownerType": "workflow",
      "ownerId": "statusReportLifecycle",
      "title": "Status Report Lifecycle",
      "status": "inProgress",
      "defPath": "l4/workflows/statusReportLifecycle.defs.ts",
      "pageId": "statusReportLifecycle",
      "capabilityId": "statusReportLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "createProject",
      "title": "Create a new project",
      "status": "inProgress",
      "defPath": "l4/operations/createProject.defs.ts",
      "pageId": "projectLifecycle",
      "commandName": "createProject",
      "bffName": "buildFlowFsm.projectLifecycle.createProject",
      "capabilityId": "projectLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateProjectStatus",
      "title": "Update project status",
      "status": "inProgress",
      "defPath": "l4/operations/updateProjectStatus.defs.ts",
      "pageId": "projectLifecycle",
      "commandName": "updateProjectStatus",
      "bffName": "buildFlowFsm.projectLifecycle.updateProjectStatus",
      "capabilityId": "projectLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateProject",
      "title": "Edit project details",
      "status": "inProgress",
      "defPath": "l4/operations/updateProject.defs.ts",
      "pageId": "updateProject",
      "commandName": "updateProject",
      "bffName": "buildFlowFsm.updateProject.updateProject",
      "capabilityId": "updateProject"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewProject",
      "title": "View project detail",
      "status": "inProgress",
      "defPath": "l4/operations/viewProject.defs.ts",
      "pageId": "viewProject",
      "commandName": "viewProject",
      "bffName": "buildFlowFsm.viewProject.viewProject",
      "capabilityId": "viewProject"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewDashboard",
      "title": "Review project dashboard",
      "status": "inProgress",
      "defPath": "l4/operations/viewDashboard.defs.ts",
      "pageId": "viewDashboard",
      "commandName": "viewDashboard",
      "bffName": "buildFlowFsm.viewDashboard.viewDashboard",
      "capabilityId": "viewDashboard"
    },
    {
      "ownerType": "operation",
      "ownerId": "createTask",
      "title": "Create a work task",
      "status": "inProgress",
      "defPath": "l4/operations/createTask.defs.ts",
      "pageId": "workTaskLifecycle",
      "commandName": "createTask",
      "bffName": "buildFlowFsm.workTaskLifecycle.createTask",
      "capabilityId": "workTaskLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "assignTask",
      "title": "Assign worker and due date to task",
      "status": "inProgress",
      "defPath": "l4/operations/assignTask.defs.ts",
      "pageId": "workTaskLifecycle",
      "commandName": "assignTask",
      "bffName": "buildFlowFsm.workTaskLifecycle.assignTask",
      "capabilityId": "workTaskLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateTaskStatus",
      "title": "Update task status",
      "status": "inProgress",
      "defPath": "l4/operations/updateTaskStatus.defs.ts",
      "pageId": "workTaskLifecycle",
      "commandName": "updateTaskStatus",
      "bffName": "buildFlowFsm.workTaskLifecycle.updateTaskStatus",
      "capabilityId": "workTaskLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateTask",
      "title": "Edit task details or reassign",
      "status": "inProgress",
      "defPath": "l4/operations/updateTask.defs.ts",
      "pageId": "updateTask",
      "commandName": "updateTask",
      "bffName": "buildFlowFsm.updateTask.updateTask",
      "capabilityId": "updateTask"
    },
    {
      "ownerType": "operation",
      "ownerId": "browseTasks",
      "title": "Browse assigned tasks",
      "status": "inProgress",
      "defPath": "l4/operations/browseTasks.defs.ts",
      "pageId": "browseTasks",
      "commandName": "browseTasks",
      "bffName": "buildFlowFsm.browseTasks.browseTasks",
      "capabilityId": "browseTasks"
    },
    {
      "ownerType": "operation",
      "ownerId": "createChangeOrder",
      "title": "Create a change order",
      "status": "inProgress",
      "defPath": "l4/operations/createChangeOrder.defs.ts",
      "pageId": "changeOrderLifecycle",
      "commandName": "createChangeOrder",
      "bffName": "buildFlowFsm.changeOrderLifecycle.createChangeOrder",
      "capabilityId": "changeOrderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "sendChangeOrder",
      "title": "Send change order to client",
      "status": "inProgress",
      "defPath": "l4/operations/sendChangeOrder.defs.ts",
      "pageId": "changeOrderLifecycle",
      "commandName": "sendChangeOrder",
      "bffName": "buildFlowFsm.changeOrderLifecycle.sendChangeOrder",
      "capabilityId": "changeOrderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "reviewChangeOrder",
      "title": "Approve or reject change order",
      "status": "inProgress",
      "defPath": "l4/operations/reviewChangeOrder.defs.ts",
      "pageId": "changeOrderLifecycle",
      "commandName": "reviewChangeOrder",
      "bffName": "buildFlowFsm.changeOrderLifecycle.reviewChangeOrder",
      "capabilityId": "changeOrderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "generateInvoice",
      "title": "Generate invoice from job costs",
      "status": "inProgress",
      "defPath": "l4/operations/generateInvoice.defs.ts",
      "pageId": "invoiceLifecycle",
      "commandName": "generateInvoice",
      "bffName": "buildFlowFsm.invoiceLifecycle.generateInvoice",
      "capabilityId": "invoiceLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "issueInvoice",
      "title": "Issue and send invoice to client",
      "status": "inProgress",
      "defPath": "l4/operations/issueInvoice.defs.ts",
      "pageId": "invoiceLifecycle",
      "commandName": "issueInvoice",
      "bffName": "buildFlowFsm.invoiceLifecycle.issueInvoice",
      "capabilityId": "invoiceLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewInvoice",
      "title": "Review invoice details",
      "status": "inProgress",
      "defPath": "l4/operations/viewInvoice.defs.ts",
      "pageId": "viewInvoice",
      "commandName": "viewInvoice",
      "bffName": "buildFlowFsm.viewInvoice.viewInvoice",
      "capabilityId": "viewInvoice"
    },
    {
      "ownerType": "operation",
      "ownerId": "generateStatusReport",
      "title": "Generate AI status report",
      "status": "inProgress",
      "defPath": "l4/operations/generateStatusReport.defs.ts",
      "pageId": "statusReportLifecycle",
      "commandName": "generateStatusReport",
      "bffName": "buildFlowFsm.statusReportLifecycle.generateStatusReport",
      "capabilityId": "statusReportLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "shareStatusReport",
      "title": "Share status report with client",
      "status": "inProgress",
      "defPath": "l4/operations/shareStatusReport.defs.ts",
      "pageId": "statusReportLifecycle",
      "commandName": "shareStatusReport",
      "bffName": "buildFlowFsm.statusReportLifecycle.shareStatusReport",
      "capabilityId": "statusReportLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewStatusReport",
      "title": "View status report",
      "status": "inProgress",
      "defPath": "l4/operations/viewStatusReport.defs.ts",
      "pageId": "viewStatusReport",
      "commandName": "viewStatusReport",
      "bffName": "buildFlowFsm.viewStatusReport.viewStatusReport",
      "capabilityId": "viewStatusReport"
    },
    {
      "ownerType": "operation",
      "ownerId": "browseClients",
      "title": "Browse clients",
      "status": "inProgress",
      "defPath": "l4/operations/browseClients.defs.ts",
      "pageId": "browseClients",
      "commandName": "browseClients",
      "bffName": "buildFlowFsm.browseClients.browseClients",
      "capabilityId": "browseClients"
    },
    {
      "ownerType": "operation",
      "ownerId": "createClient",
      "title": "Create a client",
      "status": "inProgress",
      "defPath": "l4/operations/createClient.defs.ts",
      "pageId": "createClient",
      "commandName": "createClient",
      "bffName": "buildFlowFsm.createClient.createClient",
      "capabilityId": "createClient"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateClient",
      "title": "Edit client details",
      "status": "inProgress",
      "defPath": "l4/operations/updateClient.defs.ts",
      "pageId": "updateClient",
      "commandName": "updateClient",
      "bffName": "buildFlowFsm.updateClient.updateClient",
      "capabilityId": "updateClient"
    },
    {
      "ownerType": "operation",
      "ownerId": "createTimeLog",
      "title": "Log hours worked on a task",
      "status": "inProgress",
      "defPath": "l4/operations/createTimeLog.defs.ts",
      "pageId": "createTimeLog",
      "commandName": "createTimeLog",
      "bffName": "buildFlowFsm.createTimeLog.createTimeLog",
      "capabilityId": "createTimeLog"
    },
    {
      "ownerType": "operation",
      "ownerId": "voidTimeLog",
      "title": "Void a time log",
      "status": "inProgress",
      "defPath": "l4/operations/voidTimeLog.defs.ts",
      "pageId": "voidTimeLog",
      "commandName": "voidTimeLog",
      "bffName": "buildFlowFsm.voidTimeLog.voidTimeLog",
      "capabilityId": "voidTimeLog"
    },
    {
      "ownerType": "operation",
      "ownerId": "createMaterialUsage",
      "title": "Record materials used on-site",
      "status": "inProgress",
      "defPath": "l4/operations/createMaterialUsage.defs.ts",
      "pageId": "createMaterialUsage",
      "commandName": "createMaterialUsage",
      "bffName": "buildFlowFsm.createMaterialUsage.createMaterialUsage",
      "capabilityId": "createMaterialUsage"
    },
    {
      "ownerType": "operation",
      "ownerId": "voidMaterialUsage",
      "title": "Void a material usage record",
      "status": "inProgress",
      "defPath": "l4/operations/voidMaterialUsage.defs.ts",
      "pageId": "voidMaterialUsage",
      "commandName": "voidMaterialUsage",
      "bffName": "buildFlowFsm.voidMaterialUsage.voidMaterialUsage",
      "capabilityId": "voidMaterialUsage"
    }
  ]
} as const;

export default buildFlowFsmTodoBackend;
