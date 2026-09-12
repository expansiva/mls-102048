# E7 — Validation & Closing: buildFlowFsm

- result: PASSED (0 error(s), 2 warning(s))
- entities: 9 / workflows: 5 / operations: 26 / workspaces: 12
- full machine report: `l4/trace/behavior-health-report.json`

## Warnings (do not block)

- `capability.multiowned` capability 'workTaskLifecycle' is owned by 2 workspaces (fieldWorkerWorkspace, workTaskLifecycle)
- `capability.multiowned` capability 'changeOrderLifecycle' is owned by 2 workspaces (changeOrderLifecycle, clientChangeOrderReview)

## Closing artifacts

- `l4/buildFlowFsm/module.defs.ts` — module block + designContext + ontology index + relationships + approvedArtifacts
- `l5/buildFlowFsm/todoFrontend.defs.ts` / `l5/buildFlowFsm/todoBackend.defs.ts` — generation-status source for Stage 2/3
- `l5/buildFlowFsm/process.defs.ts` — run record + handoff notes

## Next steps

- **Generate frontend experience (@@changeFrontend)** — Materialize l2 pages from the l4 behavior model.
- **Generate backend (@@changeBackend)** — Materialize l1 hexagonal backend from the l4 behavior model.
