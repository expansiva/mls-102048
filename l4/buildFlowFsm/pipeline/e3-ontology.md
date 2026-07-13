# E3 — Ontology: BuildFlow FSM

- module: `buildFlowFsm`
- domain: Construction & Field Service Management
- entities: 9 / relationships: 8
- generatedAt: 2026-07-12T13:11:25.233Z

## Entities

### Project (core, moduleOwned) — status: draft → active → completed → cancelled

A construction or remodeling project with a client, site address, budget, timeline, and lifecycle status that serves as the foundation for task planning, cost tracking, and client billing.

- `projectId` (uuid; required) — Unique identifier for the project
- `clientId` (uuid; required) — Reference to the client who owns this project; must be set before the project can be activated
- `name` (string; required) — Project name or title shown on dashboards and reports
- `siteAddress` (text; required) — Physical address of the construction or remodeling site
- `budget` (money; required) — Approved project budget in USD; must be a positive amount
- `startDate` (date; required) — Planned project start date; task due dates must fall on or after this date
- `endDate` (date; required) — Planned project end date; must be on or after the start date and task due dates must fall on or before this date
- `status` (string; required, enum: draft|active|completed|cancelled) — Current lifecycle state of the project; only active projects appear on the dashboard
- `completedAt` (datetime; optional) — Timestamp when the project was marked completed
- `cancelledAt` (datetime; optional) — Timestamp when the project was cancelled
- `cancellationReason` (text; optional) — Reason recorded when the project is cancelled
- `createdAt` (datetime; required) — Timestamp when the project record was created
- `updatedAt` (datetime; required) — Timestamp when the project record was last updated

### Client (mdm, moduleOwned)

A customer of the construction company who owns one or more projects, receives invoices, and approves or rejects change orders.

- `clientId` (uuid; required) — Unique identifier for the client record.
- `name` (string; required) — Full name of the client contact person.
- `companyName` (string; optional) — Legal name of the client's organization, if applicable.
- `email` (string; required) — Primary email address used to send shareable project links and invoices.
- `phone` (string; optional) — Contact phone number for the client.
- `portalAccessEnabled` (boolean; required) — Indicates whether the client may log in to the portal using platform authentication to view project information.
- `billingAddress` (text; optional) — Postal address used on informational invoices sent to the client.
- `createdAt` (datetime; required) — Timestamp when the client record was created.
- `updatedAt` (datetime; required) — Timestamp when the client record was last modified.

### WorkTask (core, moduleOwned) — status: draft → assigned → inProgress → completed → cancelled

A unit of work within a project, assigned to a field worker with a description, due date, and status that drives timeline tracking and delay risk identification.

- `workTaskId` (uuid; required) — Primary identifier for the work task.
- `projectId` (uuid; required) — Reference to the parent project this task belongs to.
- `title` (string; required) — Short name of the task.
- `description` (text; required) — Detailed description of the work to be performed.
- `status` (string; required, enum: draft|assigned|inProgress|completed|cancelled) — Current lifecycle state of the task.
- `assignedWorkerId` (uuid; optional) — Identifier of the field worker assigned to this task, sourced from the platform user profile.
- `assignedWorkerName` (string; optional) — Display name of the assigned field worker, denormalized from the platform user profile.
- `dueDate` (date; required) — Deadline by which the task should be completed; must fall within the project start and end dates.
- `budgetedCost` (money; optional) — Planned cost budgeted for this task used in budget vs actual comparison.
- `sequenceNumber` (number; optional) — Position of the task in the simplified timeline sequence view.
- `startedAt` (datetime; optional) — Timestamp when the task was moved to inProgress.
- `completedAt` (datetime; optional) — Timestamp when the task was marked completed.
- `cancelledAt` (datetime; optional) — Timestamp when the task was cancelled.
- `cancellationReason` (text; optional) — Reason recorded when a task is cancelled.
- `createdAt` (datetime; required) — Record creation timestamp.
- `updatedAt` (datetime; required) — Last update timestamp.

### TimeLog (event, moduleOwned) — status: posted → voided

An append-only record of hours worked by a field worker on a specific task, used as the primary input for labor job costing and budget vs actual comparison.

- `timeLogId` (uuid; required) — Unique identifier for this time log entry.
- `workTaskId` (uuid; required) — Reference to the work task this time log is linked to.
- `workerId` (uuid; required) — Identifier of the field worker who recorded the hours worked.
- `logDate` (date; required) — The calendar date on which the work was performed.
- `hours` (number; required) — Number of hours worked on the task for this log entry.
- `workerRate` (money; required) — Hourly cost rate of the worker captured at the time of logging, used for actual labor cost calculation.
- `status` (string; required, enum: posted|voided) — Lifecycle state of the time log entry.
- `voidedAt` (datetime; optional) — Timestamp when the time log was voided, if applicable.
- `voidReason` (text; optional) — Reason provided when voiding a time log entry.
- `createdAt` (datetime; required) — Timestamp when the time log entry was created.

### MaterialUsage (event, moduleOwned) — status: posted → voided

An append-only record of materials consumed on a project site with associated costs, tracked for material job costing and budget variance analysis.

- `materialUsageId` (uuid; required) — Primary identifier for the material usage record.
- `projectId` (uuid; required) — Project on which the material was consumed.
- `materialName` (string; required) — Name of the material consumed on site.
- `quantity` (number; required) — Quantity of material consumed.
- `unit` (string; required, enum: kg|liter|meter|portion|unit|bag|box|roll|sheet) — Unit of measure for the material quantity.
- `unitCost` (money; required) — Cost per unit of the material in USD.
- `totalCost` (money; required) — Total cost of this material usage entry (quantity × unitCost) in USD.
- `status` (string; required, enum: posted|voided) — Lifecycle status of the material usage record.
- `usageDate` (date; required) — Date the material was consumed on the project site.
- `voidedAt` (datetime; optional) — Timestamp when the material usage record was voided.
- `voidReason` (text; optional) — Reason for voiding the material usage record.
- `createdAt` (datetime; required) — Timestamp when the material usage record was created.

### ChangeOrder (core, moduleOwned) — status: draft → sent → approved → rejected → cancelled

A documented scope change on a project with a cost impact, sent to the client for in-app approval before it affects job costing and invoicing.

- `changeOrderId` (uuid; required) — Primary identifier for the change order record.
- `projectId` (uuid; required) — Reference to the project this change order belongs to.
- `title` (string; required) — Short title summarizing the scope change.
- `scopeDescription` (text; required) — Detailed description of the scope change being requested.
- `amount` (money; required) — Cost impact of the change order in USD; only included in invoicing and job costing when approved.
- `status` (string; required, enum: draft|sent|approved|rejected|cancelled) — In-app approval status of the change order; determines whether it affects job costing and invoicing.
- `sentAt` (datetime; optional) — Timestamp when the change order was sent to the client for approval.
- `approvedAt` (datetime; optional) — Timestamp when the client approved the change order in-app.
- `rejectedAt` (datetime; optional) — Timestamp when the client rejected the change order in-app.
- `cancelledAt` (datetime; optional) — Timestamp when the change order was cancelled.
- `rejectionReason` (text; optional) — Reason provided by the client when rejecting the change order.
- `cancellationReason` (text; optional) — Reason recorded when the change order is cancelled internally.
- `createdAt` (datetime; required) — Timestamp when the change order record was created.
- `updatedAt` (datetime; required) — Timestamp of the last modification to the change order record.

### Invoice (core, moduleOwned) — status: draft → issued → voided

A billing document generated from accumulated time logs, material costs, and approved change orders, delivered to the client via shareable link or email for payment.

- `invoiceId` (uuid; required) — Primary identifier for the invoice record.
- `projectId` (uuid; required) — Reference to the project this invoice belongs to.
- `status` (string; required, enum: draft|issued|voided) — Lifecycle state of the invoice: draft, issued, or voided.
- `laborCost` (money; required) — Total labor cost accumulated from approved time logs on the project.
- `materialCost` (money; required) — Total material cost accumulated from material usage records on the project.
- `changeOrderAmount` (money; required) — Total amount from approved change orders included in this invoice.
- `totalAmount` (money; required) — Calculated total of labor cost plus material cost plus approved change order amounts.
- `currency` (string; required, enum: usd) — Currency code for all monetary figures on the invoice, always USD.
- `shareLink` (string; optional) — Shareable link generated for delivering the invoice to the client.
- `clientEmail` (string; optional) — Email address used to deliver the invoice to the client.
- `issuedAt` (datetime; optional) — Timestamp when the invoice was issued to the client.
- `voidedAt` (datetime; optional) — Timestamp when the invoice was voided.
- `voidReason` (text; optional) — Reason recorded when an invoice is voided.
- `notes` (text; optional) — Optional internal notes about the invoice.
- `createdAt` (datetime; required) — Timestamp when the invoice record was created.
- `updatedAt` (datetime; required) — Timestamp when the invoice record was last updated.

### InvoiceLine (supporting, moduleOwned)

An itemized line on an invoice representing a labor, material, or approved change order cost component, snapshotting costs at invoice generation time.

- `invoiceLineId` (uuid; required) — Primary identifier for the invoice line record.
- `invoiceId` (uuid; required) — Reference to the parent invoice this line belongs to.
- `lineType` (string; required, enum: labor|material|changeOrder) — Category of the cost component: labor, material, or approved change order.
- `description` (text; required) — Human-readable description of what this line item covers.
- `quantity` (number; required) — Quantity of units billed on this line (e.g. hours for labor, units for materials).
- `unit` (string; required, enum: hour|unit|lumpSum) — Unit of measurement for the quantity value.
- `unitCost` (money; required) — Cost per unit in USD at the time of invoice generation.
- `lineAmount` (money; required) — Total amount for this line in USD, calculated as quantity times unitCost.
- `sourceRecordId` (uuid; optional) — Reference to the originating record (TimeLog, MaterialUsage, or ChangeOrder) from which this line was generated.
- `createdAt` (datetime; required) — Timestamp when the invoice line was created.
- `updatedAt` (datetime; required) — Timestamp when the invoice line was last updated.

### StatusReport (core, moduleOwned) — status: generated → shared

An AI-generated plain-language project status report compiled from tasks, time logs, and material data using the platform LLM proxy, reviewed by the PM and shared with the client.

- `statusReportId` (uuid; required) — Primary identifier for the status report record.
- `projectId` (uuid; required) — Reference to the project this status report belongs to.
- `status` (string; required, enum: generated|shared) — Lifecycle state of the report, either generated or shared with the client.
- `content` (text; required) — The AI-generated plain-language status report content covering tasks, time logs, and material usage.
- `reportPeriodStart` (date; required) — Start date of the reporting period covered by this status report.
- `reportPeriodEnd` (date; required) — End date of the reporting period covered by this status report.
- `generatedAt` (datetime; required) — Timestamp when the LLM proxy generated the report content.
- `llmModelUsed` (string; optional) — Identifier of the LLM model used via the platform proxy to generate the report.
- `sharedAt` (datetime; optional) — Timestamp when the PM shared the report with the client.
- `shareLink` (string; optional) — Shareable link generated for client access to the status report.
- `sharedWithEmail` (string; optional) — Email address the report was shared with for client notification.
- `createdAt` (datetime; required) — Timestamp when the status report record was created.
- `updatedAt` (datetime; required) — Timestamp when the status report record was last updated.

## Relationships

- `projectBelongsToClient`: Project manyToOne Client — Each project belongs to one client; a client can own multiple projects.
- `projectHasWorkTasks`: Project oneToMany WorkTask — A project contains multiple work tasks assigned to field workers for execution.
- `workTaskHasTimeLogs`: WorkTask oneToMany TimeLog — A work task accumulates multiple time logs from field workers recording hours spent.
- `projectHasMaterialUsages`: Project oneToMany MaterialUsage — A project tracks multiple material usage records from on-site field work.
- `projectHasChangeOrders`: Project oneToMany ChangeOrder — A project can have multiple change orders documenting scope changes and cost impacts.
- `projectHasInvoices`: Project oneToMany Invoice — A project can have multiple invoices generated from its accumulated job costs.
- `invoiceHasInvoiceLines`: Invoice oneToMany InvoiceLine — An invoice is broken down into itemized lines for labor, materials, and approved change orders.
- `projectHasStatusReports`: Project oneToMany StatusReport — A project can have multiple AI-generated status reports produced over its lifecycle.
