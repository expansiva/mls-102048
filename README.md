# 102048 · BuildFlow FSM — newSolution3 run (client app)

Part of **collab.codes**.

`102048` is a **generated client application** (~308 `.ts` files) — the English,
`agentNewSolution3`-era run of BuildFlow FSM.

> **BuildFlow FSM** — *"…a unified project hub for job costing, field team
> coordination, and client communication. Company admins manage projects and
> budgets, project managers assign tasks and generate AI-powered status reports,
> and field workers log time and materials on-site."*
> Business domain: Construction & Field Service Management. Language: en.

Includes an LLM feature on the project detail screen ("Generate Status Report"
and "tasks at risk of delay").

## Layout

| layer | content |
|---|---|
| `l4/buildFlowFsm/` | the solution model (`module.defs.ts`, `ontology/`, `journeys/`, `pipeline/`) |
| `l4/workflows/` | lifecycle defs: `projectLifecycle`, `workTaskLifecycle`, `changeOrderLifecycle`, `invoiceLifecycle`, `statusReportLifecycle` |
| `l4/actors/`, `l4/rules/`, `l4/operations/` | actors, business rules, operations |
| `l1/`, `l2/` | generated backend and frontend |
| `l4/trace/` | `cb-health-report.json`, `behavior-health-report.json`, `cb-repair-state.json` |

## Careful

- `l5/project.json` here is **not** the usual project config — it is the dump of
  the `newSolution3` task record, and it ends with
  `"status": "failed"` / *"LLM call failed"*. The generation run did not finish.
- Last activity: 2026-07-12 — the oldest client project in the folder.
- Two other projects share the name `buildFlowFsm`:
  [`102046`](../mls-102046) (the pt-BR ns4 app) and
  [`102045`](../mls-102045) (empty).
