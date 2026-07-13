/// <mls fileReference="_102048_/l5/runtimeConfig.ts" enhancement="_blank"/>
// AUTO-GENERATED runtime config. Do not edit by hand:
// composed from l5/project.json + each module.ts by nodejsSaveRuntimeConfig / the register agents.
import type { ProjectsConfig } from '/_102029_/l2/runtimeConfigTypes.js';
import { moduleFrontendDefinition as mod_102034_audit } from "/_102034_/l2/audit/module.js";
import { moduleFrontendDefinition as mod_102034_monitor } from "/_102034_/l2/monitor/module.js";

export const runtimeConfig: ProjectsConfig = {
  "defaultProjectId": "102048",
  "projects": {
    "102027": {
      "root": "../mls-102027",
      "type": "lib"
    },
    "102029": {
      "root": "../mls-102029",
      "type": "lib"
    },
    "102033": {
      "root": "../mls-102033",
      "type": "master frontend"
    },
    "102034": {
      "root": "../mls-102034",
      "type": "master backend",
      "modules": [
        {
          "moduleId": "mdm",
          "basePath": "/mdm",
          "shellMode": "spa",
          "backendRouter": "./_102034_/l1/mdm/layer_2_controllers/router.js"
        },
        {
          "moduleId": "monitor",
          "basePath": "/monitor",
          "shellMode": "spa",
          "backendRouter": "./_102034_/l1/monitor/layer_2_controllers/router.js",
          "navigation": mod_102034_monitor.navigation
        },
        {
          "moduleId": "audit",
          "basePath": "/audit",
          "shellMode": "spa",
          "backendRouter": "./_102034_/l1/audit/layer_2_controllers/router.js",
          "navigation": mod_102034_audit.navigation
        }
      ],
      "persistenceModules": [
        {
          "moduleId": "platform",
          "persistenceEntrypoint": "./_102034_/l1/server/persistence.js"
        },
        {
          "moduleId": "mdm",
          "persistenceEntrypoint": "./_102034_/l1/mdm/persistence.js"
        },
        {
          "moduleId": "monitor",
          "persistenceEntrypoint": "./_102034_/l1/monitor/persistence.js"
        }
      ]
    },
    "102036": {
      "root": "../mls-102036",
      "type": "lib"
    },
    "102048": {
      "root": ".",
      "type": "client",
      "runtime": {
        "projectId": "102048"
      },
      "modules": [
        {
          "moduleId": "buildFlowFsm",
          "basePath": "/buildFlowFsm",
          "shellMode": "spa",
          "backendControllers": "./_102048_/l1/buildFlowFsm/layer_1_external/adapters/http/controllers",
          "navigation": [
            {
              "id": "changeOrderLifecycle",
              "label": "Change Order Management",
              "href": "/buildFlowFsm/changeOrderLifecycle",
              "description": "Change Order Management"
            },
            {
              "id": "clientChangeOrderReview",
              "label": "Change Order Review",
              "href": "/buildFlowFsm/clientChangeOrderReview",
              "description": "Change Order Review"
            },
            {
              "id": "clientInvoiceView",
              "label": "Invoice Review",
              "href": "/buildFlowFsm/clientInvoiceView",
              "description": "Invoice Review"
            },
            {
              "id": "clientManagement",
              "label": "Client Management",
              "href": "/buildFlowFsm/clientManagement",
              "description": "Client Management"
            },
            {
              "id": "clientStatusReportView",
              "label": "Project Status Report",
              "href": "/buildFlowFsm/clientStatusReportView",
              "description": "Project Status Report"
            },
            {
              "id": "fieldWorkerWorkspace",
              "label": "My Tasks & Daily Logs",
              "href": "/buildFlowFsm/fieldWorkerWorkspace",
              "description": "My Tasks & Daily Logs"
            },
            {
              "id": "invoiceLifecycle",
              "label": "Invoice Generation",
              "href": "/buildFlowFsm/invoiceLifecycle",
              "description": "Invoice Generation"
            },
            {
              "id": "pmMaterialUsageManagement",
              "label": "Material Usage Corrections",
              "href": "/buildFlowFsm/pmMaterialUsageManagement",
              "description": "Material Usage Corrections"
            },
            {
              "id": "pmTimeLogManagement",
              "label": "Time Log Corrections",
              "href": "/buildFlowFsm/pmTimeLogManagement",
              "description": "Time Log Corrections"
            },
            {
              "id": "projectManagement",
              "label": "Project Management & Dashboard",
              "href": "/buildFlowFsm/projectManagement",
              "description": "Project Management & Dashboard"
            },
            {
              "id": "statusReportLifecycle",
              "label": "AI Status Report",
              "href": "/buildFlowFsm/statusReportLifecycle",
              "description": "AI Status Report"
            },
            {
              "id": "workTaskLifecycle",
              "label": "Task Planning & Assignment",
              "href": "/buildFlowFsm/workTaskLifecycle",
              "description": "Task Planning & Assignment"
            }
          ],
          "frontend": {
            "layer": "l2",
            "pages": [
              {
                "pageId": "changeOrderLifecycle",
                "route": "/buildFlowFsm/changeOrderLifecycle/:projectId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/changeOrderLifecycle.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/changeOrderLifecycle.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--change-order-lifecycle-102048",
                "title": "Change Order Management"
              },
              {
                "pageId": "clientChangeOrderReview",
                "route": "/buildFlowFsm/clientChangeOrderReview/:changeOrderId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/clientChangeOrderReview.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/clientChangeOrderReview.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--client-change-order-review-102048",
                "title": "Change Order Review"
              },
              {
                "pageId": "clientInvoiceView",
                "route": "/buildFlowFsm/clientInvoiceView/:invoiceId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/clientInvoiceView.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/clientInvoiceView.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--client-invoice-view-102048",
                "title": "Invoice Review"
              },
              {
                "pageId": "clientManagement",
                "route": "/buildFlowFsm/clientManagement",
                "source": "l2/buildFlowFsm/web/desktop/page11/clientManagement.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/clientManagement.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--client-management-102048",
                "title": "Client Management"
              },
              {
                "pageId": "clientStatusReportView",
                "route": "/buildFlowFsm/clientStatusReportView/:statusReportId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/clientStatusReportView.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/clientStatusReportView.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--client-status-report-view-102048",
                "title": "Project Status Report"
              },
              {
                "pageId": "fieldWorkerWorkspace",
                "route": "/buildFlowFsm/fieldWorkerWorkspace/:projectId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/fieldWorkerWorkspace.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/fieldWorkerWorkspace.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--field-worker-workspace-102048",
                "title": "My Tasks & Daily Logs"
              },
              {
                "pageId": "invoiceLifecycle",
                "route": "/buildFlowFsm/invoiceLifecycle",
                "source": "l2/buildFlowFsm/web/desktop/page11/invoiceLifecycle.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/invoiceLifecycle.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--invoice-lifecycle-102048",
                "title": "Invoice Generation"
              },
              {
                "pageId": "pmMaterialUsageManagement",
                "route": "/buildFlowFsm/pmMaterialUsageManagement",
                "source": "l2/buildFlowFsm/web/desktop/page11/pmMaterialUsageManagement.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/pmMaterialUsageManagement.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--pm-material-usage-management-102048",
                "title": "Material Usage Corrections"
              },
              {
                "pageId": "pmTimeLogManagement",
                "route": "/buildFlowFsm/pmTimeLogManagement",
                "source": "l2/buildFlowFsm/web/desktop/page11/pmTimeLogManagement.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/pmTimeLogManagement.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--pm-time-log-management-102048",
                "title": "Time Log Corrections"
              },
              {
                "pageId": "projectManagement",
                "route": "/buildFlowFsm/projectManagement/:projectId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/projectManagement.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/projectManagement.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--project-management-102048",
                "title": "Project Management & Dashboard"
              },
              {
                "pageId": "statusReportLifecycle",
                "route": "/buildFlowFsm/statusReportLifecycle/:projectId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/statusReportLifecycle.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/statusReportLifecycle.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--status-report-lifecycle-102048",
                "title": "AI Status Report"
              },
              {
                "pageId": "workTaskLifecycle",
                "route": "/buildFlowFsm/workTaskLifecycle/:projectId?/:workTaskId?",
                "source": "l2/buildFlowFsm/web/desktop/page11/workTaskLifecycle.ts",
                "definition": "l2/buildFlowFsm/web/desktop/page11/workTaskLifecycle.defs.ts",
                "componentTag": "build-flow-fsm--web--desktop--page11--work-task-lifecycle-102048",
                "title": "Task Planning & Assignment"
              }
            ]
          }
        }
      ],
      "persistenceModules": [
        {
          "moduleId": "buildFlowFsm",
          "tableDefsDir": "./_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence"
        }
      ]
    }
  },
  "shellTemplates": {
    "spa": "./_102033_/l2/shared/spa/index.html",
    "pwa": "./_102033_/l2/shared/pwa/index.html"
  },
  "publication": {
    "defaultTarget": "web",
    "targets": {
      "web": {
        "assetBaseUrl": "",
        "serveStaticFromServer": true,
        "minify": false,
        "sourcemap": true
      }
    }
  },
  "clientShell": {
    "mode": "spa",
    "activeProfile": "production",
    "regions": {
      "aside": {
        "activeProfile": "defaultAura",
        "profiles": {
          "defaultAura": {
            "renderer": {
              "entrypoint": "/_102033_/l2/shared/layout/aura-aside.js",
              "source": "../mls-102033/l2/shared/layout/aura-aside.ts",
              "tag": "collab-aura-aside"
            },
            "widthPx": 280
          }
        }
      }
    }
  }
};
