# E4 — Actors, rules and external refs: buildFlowFsm

- module: `buildFlowFsm`
- actors: 4 / rules: 22
- generatedAt: 2026-07-12T13:12:32.922Z

## Actors

| actorId | roleScope | title | description |
| --- | --- | --- | --- |
| `companyAdmin` | `buildFlowFsm:companyAdmin` | Company Admin / Owner | Sets up projects, defines budgets, manages client billing, and oversees overall job costing and profitability within the buildFlowFsm module. |
| `projectManager` | `buildFlowFsm:projectManager` | Project Manager | Plans work, assigns tasks to field workers, monitors timeline and budget vs actual, generates status reports, and communicates project status to clients. |
| `fieldWorker` | `buildFlowFsm:fieldWorker` | Field Worker | Executes assigned work tasks, logs daily hours against tasks, and records materials used on-site within the buildFlowFsm module. |
| `client` | `buildFlowFsm:client` | Client | Views project progress via shareable links, receives and approves change orders, gets informational invoices, and reads LLM-generated status reports. |

## Rules

### `projectBudgetPositive` (domain) — Project Budget Must Be Positive in USD

A project's budget amount must be a positive value expressed in USD; zero or negative budgets are forbidden when creating or updating a project.

- appliesTo: `Project`
- absorbs journey rules:
  - "Budget must be a positive amount in USD."

### `projectDateRangeValid` (domain) — Project Start Date On or Before End Date

The project start date must be on or before the project end date; a project with a start date after its end date is invalid and cannot be created or activated.

- appliesTo: `Project`
- absorbs journey rules:
  - "Start date must be on or before the end date."

### `projectRequiresClient` (application) — Project Activation Requires Linked Client

A project cannot be activated unless it is linked to a client; the client association must exist before the project transitions to an active state.

- appliesTo: `Project`, `Client`
- absorbs journey rules:
  - "A project must be linked to a client before it can be activated."

### `dashboardShowsActiveOnly` (application) — Dashboard Displays Active Projects Only

Only projects with an active status appear on the project dashboard; inactive, completed, or draft projects are excluded from the dashboard view.

- appliesTo: `Project`
- absorbs journey rules:
  - "Only active projects appear on the dashboard."

### `jobCostCalculation` (domain) — Actual Cost Formula for Job Costing

Budget vs actual and actual cost are calculated as (time log hours × worker rate) + material costs + approved change order amounts; no other cost components are included in the calculation.

- appliesTo: `Project`
- absorbs journey rules:
  - "Budget vs actual is calculated as (time log hours × worker rate) + material costs + approved change order amounts."
  - "Actual cost = (time log hours × worker rate) + material costs + approved change order amounts."

### `invoiceCalculation` (domain) — Invoice Amount Composition

Invoice amounts are calculated as labor cost plus material cost plus approved change order amounts; invoice lines must reflect these three components and no others.

- appliesTo: `Invoice`, `InvoiceLine`
- absorbs journey rules:
  - "Invoice amounts are calculated as labor cost + material cost + approved change order amounts."
  - "Invoices include labor cost, material cost, and approved change order amounts."

### `allFiguresUsdNoTax` (domain) — All Financial Figures in USD, Tax Excluded

All monetary figures in invoices and job costing must be expressed in USD; tax calculation is explicitly excluded from the module and must not be computed or displayed.

- appliesTo: `Invoice`
- absorbs journey rules:
  - "All figures are in USD; tax calculation is excluded."

### `approvedChangeOrdersOnly` (domain) — Only Approved Change Orders Affect Costing and Invoicing

Only change orders with an approved in-app status may be included in job costing calculations, invoice totals, and invoice line items; pending or rejected change orders are excluded from all financial calculations.

- appliesTo: `ChangeOrder`, `Invoice`
- absorbs journey rules:
  - "Only approved change orders are included in invoice totals."
  - "Only approved change orders are included in job costing and invoicing."
  - "Only approved change orders affect job costing and invoicing."

### `taskRequiresWorkerAssignment` (application) — Task Must Be Assigned Before Starting

A work task cannot transition to a started or in-progress state unless it has been assigned to a worker; unassigned tasks are blocked from execution.

- appliesTo: `WorkTask`
- absorbs journey rules:
  - "A task must be assigned to a worker before it can be started."

### `taskDueDateWithinProject` (domain) — Task Due Dates Within Project Date Range

Task due dates must fall within the parent project's start and end dates; a task with a due date outside the project date range is invalid.

- appliesTo: `WorkTask`
- absorbs journey rules:
  - "Task due dates should fall within the project start and end dates."

### `timelineIsSimplified` (application) — Timeline Is Simplified Sequence, Not CPM

The project timeline provides a simplified task sequence view only; it does not implement CPM (Critical Path Method) scheduling or dependency-based critical path analysis.

- appliesTo: `WorkTask`
- absorbs journey rules:
  - "The timeline is a simplified task sequence view, not a CPM scheduling engine."

### `delayRiskCalculation` (application) — Delay Risk From Task Status and Due Dates

Delay risk is determined by evaluating task status and proximity to due dates; no external scheduling data or manual risk assessment is used in the calculation.

- appliesTo: `WorkTask`
- absorbs journey rules:
  - "Delay risk is determined by task status and proximity to due dates."

### `statusReportAutoGenerated` (domain) — Status Report Generated From Data, Not Manual

Status reports must be generated from task, time log, and material data within the module; manually written status reports are not permitted.

- appliesTo: `StatusReport`
- absorbs journey rules:
  - "The status report is generated from tasks, time logs, and material data — not manually written."

### `llmProxyUsage` (application) — LLM Calls Through Platform Proxy

All LLM calls for status report generation must go through the platform LLM proxy; direct LLM API calls from the module are not permitted.

- appliesTo: `StatusReport`
- absorbs journey rules:
  - "LLM calls go through the platform LLM proxy."

### `changeOrderInAppApproval` (domain) — Change Orders Use In-App Approval, No E-Signature

Change orders use an in-app approval status workflow; e-signature integration is explicitly out of scope and must not be required for change order approval.

- appliesTo: `ChangeOrder`
- absorbs journey rules:
  - "Change orders use in-app approval status; e-signature is out of scope."
  - "In-app approval status is sufficient; e-signature is out of scope."

### `changeOrderRequiresProject` (domain) — Change Order Must Be Linked to a Project

A change order must be linked to a project at creation time; standalone change orders without a project association are invalid and cannot be created.

- appliesTo: `ChangeOrder`, `Project`
- absorbs journey rules:
  - "A change order must be linked to a project."

### `timeLogRequiresTaskAndWorker` (domain) — Time Logs Require Task and Worker Linkage

Every time log must be linked to a specific work task and a specific worker; time logs without both associations are invalid and cannot be saved.

- appliesTo: `TimeLog`
- absorbs journey rules:
  - "Time logs must be linked to a specific task and worker."

### `materialUsageRequiresProject` (domain) — Material Usage Requires Project Linkage

Every material usage record must be linked to a specific project; material usage records without a project association are invalid and cannot be saved.

- appliesTo: `MaterialUsage`
- absorbs journey rules:
  - "Material usage must be linked to a specific project."

### `workerRateFromProfile` (application) — Worker Hourly Rate From Platform User Profile

The worker hourly cost rate used in time log cost calculations must be sourced from the platform user profile; the module does not maintain its own rate table.

- appliesTo: `TimeLog`
- absorbs journey rules:
  - "Worker hourly cost rate comes from the platform user profile."

### `clientAccessViaLinksOrAuth` (application) — Client Access Via Shareable Links or Platform Auth

Clients access project information through shareable links or email; when portal login is enabled, it uses platform authentication rather than a module-specific auth system.

- appliesTo: `Client`
- absorbs journey rules:
  - "Clients access project information via shareable links or email; portal login uses platform auth when enabled."

### `clientSeesPmStatusReport` (application) — Client Sees PM-Generated Status Report

Clients must see the exact same status report that the project manager generated and reviewed; no separate or modified report is produced for client viewing.

- appliesTo: `StatusReport`
- absorbs journey rules:
  - "Clients see the same status report the PM generated and reviewed."

### `invoiceIsInformational` (application) — Invoice Is Informational, No Payment Processing

Payment gateway integration and collections are out of scope; the invoice serves as an informational billing summary only and does not initiate or process payments.

- appliesTo: `Invoice`
- absorbs journey rules:
  - "Payment gateway integration and collections are out of scope; the invoice is informational."

## External refs

### mdm

(none)

### horizontals

(none)

### plugins

(none)

### agents

- **Status Report Generator** — The generateStatusReport journey requires an LLM-powered assistant to produce status reports from task, time log, and material data via the platform LLM proxy.
