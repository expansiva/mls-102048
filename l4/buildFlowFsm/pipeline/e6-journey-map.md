# E6 — Journey map: buildFlowFsm

- module: `buildFlowFsm`
- workspaces: 12 / landings: 4 / edges: 13
- generatedAt: 2026-07-12T13:22:00.931Z
- Consolidated navigation map derived from workflows/operations stories (view, not source).

## Workspaces by actor

### companyAdmin

- `projectManagement` (workflow, Project) — workflow `projectLifecycle`: Project Management & Dashboard — Create and manage projects, review the dashboard for portfolio health, and drill into project details for cost and delay risk analysis.
  - operations: `createProject`, `updateProjectStatus`, `updateProject`, `viewProject`, `viewDashboard`
- `clientManagement` (entityManagement, Client): Client Management — Maintain client records with contact details and portal access for project linkage and billing.
  - operations: `browseClients`, `createClient`, `updateClient`
- `invoiceLifecycle` (workflow, Invoice) — workflow `invoiceLifecycle`: Invoice Generation — Generate invoices from accumulated job costs and issue them to clients for payment.
  - operations: `generateInvoice`, `issueInvoice`

### projectManager

- `workTaskLifecycle` (workflow, WorkTask) — workflow `workTaskLifecycle`: Task Planning & Assignment — Break down projects into work tasks, assign field workers with due dates, and adjust task details as needed.
  - operations: `createTask`, `assignTask`, `updateTask`
- `changeOrderLifecycle` (workflow, ChangeOrder) — workflow `changeOrderLifecycle`: Change Order Management — Document scope changes with cost impact and send change orders to clients for in-app approval.
  - operations: `createChangeOrder`, `sendChangeOrder`
- `statusReportLifecycle` (workflow, StatusReport) — workflow `statusReportLifecycle`: AI Status Report — Generate AI-powered status reports from project data and share them with clients to keep them informed.
  - operations: `generateStatusReport`, `shareStatusReport`
- `pmTimeLogManagement` (operation, TimeLog): Time Log Corrections — Review and void posted time log entries to correct job costing inaccuracies.
  - operations: `voidTimeLog`
- `pmMaterialUsageManagement` (operation, MaterialUsage): Material Usage Corrections — Review and void posted material usage records to correct job costing inaccuracies.
  - operations: `voidMaterialUsage`

### fieldWorker

- `fieldWorkerWorkspace` (workflow, WorkTask) — workflow `workTaskLifecycle`: My Tasks & Daily Logs — View assigned tasks, log hours and materials worked on-site, and update task status throughout the day.
  - operations: `browseTasks`, `updateTaskStatus`, `createTimeLog`, `createMaterialUsage`

### client

- `clientChangeOrderReview` (workflow, ChangeOrder) — workflow `changeOrderLifecycle`: Change Order Review — Review proposed scope changes and cost impacts, then approve or reject change orders in-app.
  - operations: `reviewChangeOrder`
- `clientInvoiceView` (operation, Invoice): Invoice Review — Review itemized invoice breakdown including labor, materials, and approved change order amounts.
  - operations: `viewInvoice`
- `clientStatusReportView` (operation, StatusReport): Project Status Report — Read shared AI-generated status reports to stay informed on project progress, costs, and risks.
  - operations: `viewStatusReport`

## Landings

- companyAdmin → `projectManagement` — The admin starts by reviewing the project dashboard for portfolio health and managing active projects.
- projectManager → `workTaskLifecycle` — The PM begins by planning and assigning tasks to field workers, then monitors progress throughout the day.
- fieldWorker → `fieldWorkerWorkspace` — The field worker opens their assigned task list to see what work is due and begin logging hours and materials.
- client → `clientStatusReportView` — The client starts by reading the latest shared status report to understand project progress and costs.

## Navigation edges (advisory)

- `projectManagement` → `clientManagement` via `createProject` — When creating a project, the admin may need to browse or create a client to link to the project.
- `projectManagement` → `workTaskLifecycle` via `updateProjectStatus` — Activating a project enables the PM to begin planning and assigning tasks.
- `projectManagement` → `invoiceLifecycle` via `generateInvoice` — From the project detail view, the admin generates an invoice from accumulated job costs.
- `workTaskLifecycle` → `fieldWorkerWorkspace` via `assignTask` — Assigned tasks appear in the field worker's task list for execution.
- `fieldWorkerWorkspace` → `workTaskLifecycle` via `updateTaskStatus` — Field worker status updates are visible to the PM for timeline and delay risk monitoring.
- `workTaskLifecycle` → `changeOrderLifecycle` via `createChangeOrder` — The PM initiates a change order from the project context to document a scope change.
- `changeOrderLifecycle` → `clientChangeOrderReview` via `sendChangeOrder` — Sending a change order makes it available for the client to review and approve or reject.
- `clientChangeOrderReview` → `changeOrderLifecycle` via `reviewChangeOrder` — The client's approval or rejection decision notifies the PM to proceed or adjust.
- `workTaskLifecycle` → `statusReportLifecycle` via `generateStatusReport` — The PM generates an AI status report from project task and cost data.
- `statusReportLifecycle` → `clientStatusReportView` via `shareStatusReport` — Sharing a status report makes it available for the client to read.
- `invoiceLifecycle` → `clientInvoiceView` via `issueInvoice` — Issuing an invoice makes it available for the client to review the billing breakdown.
- `workTaskLifecycle` → `pmTimeLogManagement` via `voidTimeLog` — The PM corrects inaccurate time log entries from the task management context.
- `workTaskLifecycle` → `pmMaterialUsageManagement` via `voidMaterialUsage` — The PM corrects inaccurate material usage records from the task management context.
