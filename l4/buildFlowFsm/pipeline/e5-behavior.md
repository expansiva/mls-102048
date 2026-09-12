# E5 — Workflows & Operations: buildFlowFsm

- module: `buildFlowFsm`
- workflows: 5 / operations: 26
- generatedAt: 2026-07-12T13:20:29.669Z

## Workflows

### projectLifecycle — Project Lifecycle

- actor: companyAdmin — trigger: Company admin creates a new project with budget and timeline details.
- states: 4 (draft → active → completed → cancelled)
- transitions: 4
- operations: createProject, updateProjectStatus

### workTaskLifecycle — Work Task Lifecycle

- actor: projectManager, fieldWorker — trigger: A project manager creates a new work task in draft state for a project.
- states: 5 (draft → assigned → inProgress → completed → cancelled)
- transitions: 5
- operations: createTask, assignTask, updateTaskStatus

### changeOrderLifecycle — Change Order Lifecycle

- actor: projectManager, client — trigger: A project manager creates a change order on a project to document a scope change with a cost impact.
- states: 4 (draft → sent → approved → rejected)
- transitions: 3
- operations: createChangeOrder, sendChangeOrder, reviewChangeOrder

### invoiceLifecycle — Invoice Lifecycle

- actor: companyAdmin — trigger: Company admin selects a project and generates an invoice from accumulated time logs, material costs, and approved change orders.
- states: 2 (draft → issued)
- transitions: 1
- operations: generateInvoice, issueInvoice

### statusReportLifecycle — Status Report Lifecycle

- actor: projectManager — trigger: Project manager initiates AI status report generation from the project detail page, compiling tasks, time logs, and material data via the LLM proxy.
- states: 2 (generated → shared)
- transitions: 1
- operations: generateStatusReport, shareStatusReport

## Operations

| operationId | kind | entity | actor | bffName |
| --- | --- | --- | --- | --- |
| createProject | create | Project | companyAdmin | `buildFlowFsm.projectLifecycle.createProject` |
| updateProjectStatus | update | Project | companyAdmin | `buildFlowFsm.projectLifecycle.updateProjectStatus` |
| updateProject | update | Project | companyAdmin | `buildFlowFsm.updateProject.updateProject` |
| viewProject | view | Project | companyAdmin | `buildFlowFsm.viewProject.viewProject` |
| viewDashboard | query | Project | companyAdmin | `buildFlowFsm.viewDashboard.viewDashboard` |
| createTask | create | WorkTask | projectManager | `buildFlowFsm.workTaskLifecycle.createTask` |
| assignTask | update | WorkTask | projectManager | `buildFlowFsm.workTaskLifecycle.assignTask` |
| updateTaskStatus | update | WorkTask | fieldWorker | `buildFlowFsm.workTaskLifecycle.updateTaskStatus` |
| updateTask | update | WorkTask | projectManager | `buildFlowFsm.updateTask.updateTask` |
| browseTasks | query | WorkTask | fieldWorker | `buildFlowFsm.browseTasks.browseTasks` |
| createChangeOrder | create | ChangeOrder | projectManager | `buildFlowFsm.changeOrderLifecycle.createChangeOrder` |
| sendChangeOrder | update | ChangeOrder | projectManager | `buildFlowFsm.changeOrderLifecycle.sendChangeOrder` |
| reviewChangeOrder | update | ChangeOrder | client | `buildFlowFsm.changeOrderLifecycle.reviewChangeOrder` |
| generateInvoice | create | Invoice | companyAdmin | `buildFlowFsm.invoiceLifecycle.generateInvoice` |
| issueInvoice | update | Invoice | companyAdmin | `buildFlowFsm.invoiceLifecycle.issueInvoice` |
| viewInvoice | view | Invoice | client | `buildFlowFsm.viewInvoice.viewInvoice` |
| generateStatusReport | create | StatusReport | projectManager | `buildFlowFsm.statusReportLifecycle.generateStatusReport` |
| shareStatusReport | update | StatusReport | projectManager | `buildFlowFsm.statusReportLifecycle.shareStatusReport` |
| viewStatusReport | view | StatusReport | client | `buildFlowFsm.viewStatusReport.viewStatusReport` |
| browseClients | query | Client | companyAdmin | `buildFlowFsm.browseClients.browseClients` |
| createClient | create | Client | companyAdmin | `buildFlowFsm.createClient.createClient` |
| updateClient | update | Client | companyAdmin | `buildFlowFsm.updateClient.updateClient` |
| createTimeLog | create | TimeLog | fieldWorker | `buildFlowFsm.createTimeLog.createTimeLog` |
| voidTimeLog | update | TimeLog | projectManager | `buildFlowFsm.voidTimeLog.voidTimeLog` |
| createMaterialUsage | create | MaterialUsage | fieldWorker | `buildFlowFsm.createMaterialUsage.createMaterialUsage` |
| voidMaterialUsage | update | MaterialUsage | projectManager | `buildFlowFsm.voidMaterialUsage.voidMaterialUsage` |
