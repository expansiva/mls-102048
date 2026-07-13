/// <mls fileReference="_102048_/l5/buildFlowFsm/process.defs.ts" enhancement="_blank"/>

export const buildFlowFsmProcess = {
  "schemaVersion": "2026-06-25",
  "moduleName": "buildFlowFsm",
  "runs": [
    {
      "runId": "ns3-1783862521337",
      "kind": "newSolution3-behavior",
      "startedAt": "2026-07-12T13:22:01.335Z",
      "finishedAt": "2026-07-12T13:22:01.337Z",
      "sourceRefs": {
        "module": "l4/buildFlowFsm/module.defs.ts",
        "health": "l4/trace/behavior-health-report.json",
        "journeys": "l4/buildFlowFsm/journeys/buildFlowFsmJourneys.defs.ts",
        "todoFrontend": "l5/buildFlowFsm/todoFrontend.defs.ts",
        "todoBackend": "l5/buildFlowFsm/todoBackend.defs.ts"
      },
      "handoffNotes": [
        "capability.multiowned: capability 'workTaskLifecycle' is owned by 2 workspaces (fieldWorkerWorkspace, workTaskLifecycle)",
        "capability.multiowned: capability 'changeOrderLifecycle' is owned by 2 workspaces (changeOrderLifecycle, clientChangeOrderReview)"
      ],
      "nextSteps": [
        {
          "id": "stage2-experience",
          "kind": "workflowExperience",
          "title": "Generate frontend experience (@@changeFrontend)",
          "description": "Materialize l2 pages from the l4 behavior model.",
          "status": "pending"
        },
        {
          "id": "stage3-backend",
          "kind": "backendImplementation",
          "title": "Generate backend (@@changeBackend)",
          "description": "Materialize l1 hexagonal backend from the l4 behavior model.",
          "status": "pending"
        }
      ]
    }
  ]
} as const;

export default buildFlowFsmProcess;
