# BuildFlow FSM

Module: `buildFlowFsm`
Language: en

## Problem
US construction, remodeling, and field service companies struggle to coordinate field teams, track actual job costs against budgets, manage material usage, and keep clients informed. Disjointed spreadsheets and paper logs lead to budget overruns, missed deadlines, and poor client communication. BuildFlow FSM provides a unified project hub where managers assign work, workers log time and materials in the field, and the office generates accurate invoices and professional status reports—including AI-powered delay risk alerts—so every job stays profitable and transparent.

## Presumed Actors
- Company Admin / Owner (`companyAdmin`): Sets up projects, defines budgets, manages client billing, and oversees overall job costing and profitability.
- Project Manager (`projectManager`): Plans work, assigns tasks to field workers, monitors timeline and budget vs actual, and communicates project status to clients.
- Field Worker (`fieldWorker`): Executes assigned tasks, logs daily hours against tasks, and records materials used on-site.
- Client (`client`): Views project progress, receives and approves change orders, gets invoices, and reads LLM-generated status reports.

## Scope In
- Project lifecycle management with budget, timeline, status, and client linkage
- WorkTask creation, assignment to workers, status tracking, and due dates
- Field time logging linked to tasks and workers for job costing
- Material and inventory usage tracking per project with associated costs
- Change order creation, tracking, and client approval workflow
- Invoice generation and client billing summary based on time and materials
- Dashboard with active projects, budget vs actual, and upcoming/overdue tasks
- Project detail view with task list/timeline and consolidated cost summary
- LLM-powered status report generation from tasks, time logs, and materials
- Delay risk identification and suggestions based on task status and due dates

## Scope Out
- Full accounting general ledger, payroll processing, or tax calculation
- Advanced project scheduling with critical-path method (CPM)
- Payment gateway integration, collections, or merchant processing
- Equipment or fleet asset management
- CRM, lead tracking, sales quoting, or marketing automation
- Multi-location warehouse inventory, purchase orders, or procurement
- Offline-first mobile synchronization
- External accounting software integrations (e.g., QuickBooks)

## Open Questions
- [assumed] Do change orders require a formal client e-signature, or is in-app approval status sufficient? Default: In-app approval status is sufficient; e-signature is out of scope for this phase.
- [assumed] Should invoices or time logs integrate with external accounting software (e.g., QuickBooks)? Default: No external accounting integration in this phase; CSV export can be used if needed.
- [assumed] Should material tracking include vendor purchase orders and stock levels, or only project usage and cost? Default: Track usage and cost per project only; procurement and multi-warehouse stock are out of scope.

## Assumptions
- Platform provides authentication, authorization, RBAC, tenant isolation, file storage, and LLM proxy.
- All financial figures are handled in USD; tax logic is excluded from this module.
- Workers have an hourly cost rate available in their platform user profile.
- The Gantt-ish timeline is a simplified task sequence view, not a CPM scheduling engine.
- Clients can receive reports and invoices via shareable links or email; portal login uses platform auth when enabled.
- Job costing is calculated as (time log hours × worker rate) + material costs + approved change order amounts.
- Photos and documents attached to projects or tasks rely on platform file storage.

