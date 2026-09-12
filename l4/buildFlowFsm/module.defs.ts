/// <mls fileReference="_102048_/l4/buildFlowFsm/module.defs.ts" enhancement="_blank"/>

export const buildFlowFsmModule = {
  "module": {
    "moduleName": "buildFlowFsm",
    "title": "BuildFlow FSM",
    "purpose": "BuildFlow FSM provides construction and field service companies with a unified project hub for job costing, field team coordination, and client communication. Company admins manage projects and budgets, project managers assign tasks and generate AI-powered status reports, and field workers log time and materials on-site. The module tracks actual costs against budgets, manages change order approvals, and generates client invoices from real job data.",
    "businessDomain": "Construction & Field Service Management",
    "languages": [
      "en"
    ],
    "visualStyle": "Dashboard-first, data-dense, status-driven UI with timeline views, cost tracking panels, and mobile-friendly field logging"
  },
  "designContext": {
    "initialPrompt": "Generate a professional app called BuildFlow FSM for US construction, remodeling and field service companies. Core entities: Project (name, client, address, status, budget, start/end dates), WorkTask (project, assigned_to, description, status, due), Material/Inventory usage, TimeLog (worker, task, hours), ChangeOrder, Invoice. Key screens: Dashboard (active projects, budget vs actual, upcoming tasks), Project list + detail (Gantt-ish timeline or task list), Task assignment & daily log entry, Materials tracking per project, Client billing summary. LLM feature: On project detail, \"Generate Status Report\" button that creates a professional summary from tasks, time logs and materials. Also suggests \"tasks at risk of delay\". Focus: Job costing, field team coordination and client communication — specific to construction/field service.",
    "userLanguage": "en",
    "openDetails": [
      {
        "title": "Do change orders require a formal client e-signature, or is in-app approval status sufficient?",
        "description": "Determines whether a simple status field or a document signing flow is needed."
      },
      {
        "title": "Should invoices or time logs integrate with external accounting software (e.g., QuickBooks)?",
        "description": "Affects whether built-in invoicing is standalone or requires sync APIs and mapping."
      },
      {
        "title": "Should material tracking include vendor purchase orders and stock levels, or only project usage and cost?",
        "description": "Determines the scope of the inventory management capability within the module."
      }
    ],
    "decisions": []
  },
  "ontology": {
    "entities": {
      "Project": {
        "title": "Project",
        "description": "A construction or remodeling project with a client, site address, budget, timeline, and lifecycle status that serves as the foundation for task planning, cost tracking, and client billing.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ],
        "lifecycleStates": [
          "draft",
          "active",
          "completed",
          "cancelled"
        ]
      },
      "Client": {
        "title": "Client",
        "description": "A customer of the construction company who owns one or more projects, receives invoices, and approves or rejects change orders.",
        "kind": "mdm",
        "ownership": "moduleOwned"
      },
      "WorkTask": {
        "title": "Work Task",
        "description": "A unit of work within a project, assigned to a field worker with a description, due date, and status that drives timeline tracking and delay risk identification.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "draft",
          "assigned",
          "inProgress",
          "completed",
          "cancelled"
        ],
        "lifecycleStates": [
          "draft",
          "assigned",
          "inProgress",
          "completed",
          "cancelled"
        ]
      },
      "TimeLog": {
        "title": "Time Log",
        "description": "An append-only record of hours worked by a field worker on a specific task, used as the primary input for labor job costing and budget vs actual comparison.",
        "kind": "event",
        "ownership": "moduleOwned",
        "statusEnum": [
          "posted",
          "voided"
        ]
      },
      "MaterialUsage": {
        "title": "Material Usage",
        "description": "An append-only record of materials consumed on a project site with associated costs, tracked for material job costing and budget variance analysis.",
        "kind": "event",
        "ownership": "moduleOwned",
        "statusEnum": [
          "posted",
          "voided"
        ]
      },
      "ChangeOrder": {
        "title": "Change Order",
        "description": "A documented scope change on a project with a cost impact, sent to the client for in-app approval before it affects job costing and invoicing.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "draft",
          "sent",
          "approved",
          "rejected",
          "cancelled"
        ],
        "lifecycleStates": [
          "draft",
          "sent",
          "approved",
          "rejected",
          "cancelled"
        ]
      },
      "Invoice": {
        "title": "Invoice",
        "description": "A billing document generated from accumulated time logs, material costs, and approved change orders, delivered to the client via shareable link or email for payment.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "draft",
          "issued",
          "voided"
        ],
        "lifecycleStates": [
          "draft",
          "issued",
          "voided"
        ]
      },
      "InvoiceLine": {
        "title": "Invoice Line",
        "description": "An itemized line on an invoice representing a labor, material, or approved change order cost component, snapshotting costs at invoice generation time.",
        "kind": "supporting",
        "ownership": "moduleOwned"
      },
      "StatusReport": {
        "title": "Status Report",
        "description": "An AI-generated plain-language project status report compiled from tasks, time logs, and material data using the platform LLM proxy, reviewed by the PM and shared with the client.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "generated",
          "shared"
        ],
        "lifecycleStates": [
          "generated",
          "shared"
        ]
      }
    }
  },
  "journey": {
    "defPath": "l4/buildFlowFsm/journeys/buildFlowFsmJourneys.defs.ts"
  },
  "relationships": [
    {
      "relationshipId": "projectBelongsToClient",
      "fromEntity": "Project",
      "toEntity": "Client",
      "type": "manyToOne",
      "description": "Each project belongs to one client; a client can own multiple projects."
    },
    {
      "relationshipId": "projectHasWorkTasks",
      "fromEntity": "Project",
      "toEntity": "WorkTask",
      "type": "oneToMany",
      "description": "A project contains multiple work tasks assigned to field workers for execution."
    },
    {
      "relationshipId": "workTaskHasTimeLogs",
      "fromEntity": "WorkTask",
      "toEntity": "TimeLog",
      "type": "oneToMany",
      "description": "A work task accumulates multiple time logs from field workers recording hours spent."
    },
    {
      "relationshipId": "projectHasMaterialUsages",
      "fromEntity": "Project",
      "toEntity": "MaterialUsage",
      "type": "oneToMany",
      "description": "A project tracks multiple material usage records from on-site field work."
    },
    {
      "relationshipId": "projectHasChangeOrders",
      "fromEntity": "Project",
      "toEntity": "ChangeOrder",
      "type": "oneToMany",
      "description": "A project can have multiple change orders documenting scope changes and cost impacts."
    },
    {
      "relationshipId": "projectHasInvoices",
      "fromEntity": "Project",
      "toEntity": "Invoice",
      "type": "oneToMany",
      "description": "A project can have multiple invoices generated from its accumulated job costs."
    },
    {
      "relationshipId": "invoiceHasInvoiceLines",
      "fromEntity": "Invoice",
      "toEntity": "InvoiceLine",
      "type": "oneToMany",
      "description": "An invoice is broken down into itemized lines for labor, materials, and approved change orders."
    },
    {
      "relationshipId": "projectHasStatusReports",
      "fromEntity": "Project",
      "toEntity": "StatusReport",
      "type": "oneToMany",
      "description": "A project can have multiple AI-generated status reports produced over its lifecycle."
    }
  ],
  "approvedArtifacts": {
    "mdm": [],
    "horizontals": [],
    "plugins": [],
    "agents": [
      {
        "title": "Status Report Generator",
        "reason": "The generateStatusReport journey requires an LLM-powered assistant to produce status reports from task, time log, and material data via the platform LLM proxy."
      }
    ]
  }
} as const;

export default buildFlowFsmModule;
