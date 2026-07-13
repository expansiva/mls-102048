/// <mls fileReference="_102048_/l4/actors/buildFlowFsmActors.defs.ts" enhancement="_blank"/>

export const buildFlowFsmActors = {
  "moduleName": "buildFlowFsm",
  "actors": [
    {
      "actorId": "companyAdmin",
      "title": "Company Admin / Owner",
      "description": "Sets up projects, defines budgets, manages client billing, and oversees overall job costing and profitability within the buildFlowFsm module.",
      "roleScope": "buildFlowFsm:companyAdmin"
    },
    {
      "actorId": "projectManager",
      "title": "Project Manager",
      "description": "Plans work, assigns tasks to field workers, monitors timeline and budget vs actual, generates status reports, and communicates project status to clients.",
      "roleScope": "buildFlowFsm:projectManager"
    },
    {
      "actorId": "fieldWorker",
      "title": "Field Worker",
      "description": "Executes assigned work tasks, logs daily hours against tasks, and records materials used on-site within the buildFlowFsm module.",
      "roleScope": "buildFlowFsm:fieldWorker"
    },
    {
      "actorId": "client",
      "title": "Client",
      "description": "Views project progress via shareable links, receives and approves change orders, gets informational invoices, and reads LLM-generated status reports.",
      "roleScope": "buildFlowFsm:client"
    }
  ]
} as const;

export default buildFlowFsmActors;
