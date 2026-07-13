/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>

// Deterministic initial data for buildFlowFsm. Scenario planned by agentCbSeeds; rows and ids compiled locally.
// TableSeedRows exports are discovered by shape and merged by the persistence registry.

/* <agentCbSeedsPlan>
{
  "version": 1,
  "moduleName": "buildFlowFsm",
  "language": "en",
  "plan": {
    "summary": "Construction project management scenario with 3 clients (MDM), 3 projects (2 active, 1 draft), 3 work tasks (inProgress, assigned, completed), 2 time logs, 2 material usages, 3 change orders (approved, sent, rejected), 2 invoices (issued, draft) with invoice lines, and 2 status reports (shared, generated). All monetary figures in USD, only approved change orders included in costing/invoicing, task due dates within project date ranges, workers assigned before task start, LLM proxy used for status reports.",
    "localTables": [
      {
        "tableId": "Project",
        "rows": [
          {
            "key": "proj-acme-renovation",
            "columns": [
              {
                "name": "project_id",
                "value": "proj-acme-renovation"
              },
              {
                "name": "client_id",
                "value": {
                  "ref": "mdm:Client.client-acme"
                }
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "name",
                "value": "Acme Office Renovation"
              },
              {
                "name": "siteAddress",
                "value": "123 Main St, Springfield, IL"
              },
              {
                "name": "budget",
                "value": 75000
              },
              {
                "name": "startDate",
                "value": "2026-07-01T00:00:00.000Z"
              },
              {
                "name": "endDate",
                "value": "2026-07-07T00:00:00.000Z"
              },
              {
                "name": "completedAt",
                "value": null
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T10:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "proj-riverside-build",
            "columns": [
              {
                "name": "project_id",
                "value": "proj-riverside-build"
              },
              {
                "name": "client_id",
                "value": {
                  "ref": "mdm:Client.client-riverside"
                }
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T09:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "name",
                "value": "Riverside Commercial Build"
              },
              {
                "name": "siteAddress",
                "value": "456 Oak Ave, Portland, OR"
              },
              {
                "name": "budget",
                "value": 120000
              },
              {
                "name": "startDate",
                "value": "2026-07-01T00:00:00.000Z"
              },
              {
                "name": "endDate",
                "value": "2026-07-07T00:00:00.000Z"
              },
              {
                "name": "completedAt",
                "value": null
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T11:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "proj-hilltop-draft",
            "columns": [
              {
                "name": "project_id",
                "value": "proj-hilltop-draft"
              },
              {
                "name": "client_id",
                "value": {
                  "ref": "mdm:Client.client-hilltop"
                }
              },
              {
                "name": "status",
                "value": "draft"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T08:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "name",
                "value": "Hilltop Property Upgrade"
              },
              {
                "name": "siteAddress",
                "value": "789 Pine Rd, Denver, CO"
              },
              {
                "name": "budget",
                "value": 50000
              },
              {
                "name": "startDate",
                "value": "2026-07-04T00:00:00.000Z"
              },
              {
                "name": "endDate",
                "value": "2026-07-06T00:00:00.000Z"
              },
              {
                "name": "completedAt",
                "value": null
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T08:00:00.000Z"
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "WorkTask",
        "rows": [
          {
            "key": "task-framing",
            "columns": [
              {
                "name": "work_task_id",
                "value": "task-framing"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-acme-renovation"
                }
              },
              {
                "name": "status",
                "value": "inProgress"
              },
              {
                "name": "assigned_worker_id",
                "value": {
                  "ref": "actor:fieldWorker.u1"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-01T10:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "title",
                "value": "Framing Installation"
              },
              {
                "name": "description",
                "value": "Install wood framing for interior walls per architectural plans"
              },
              {
                "name": "assignedWorkerName",
                "value": "Field Worker 1"
              },
              {
                "name": "dueDate",
                "value": "2026-07-05T00:00:00.000Z"
              },
              {
                "name": "budgetedCost",
                "value": 4000
              },
              {
                "name": "sequenceNumber",
                "value": 1
              },
              {
                "name": "startedAt",
                "value": "2026-07-03T14:00:00.000Z"
              },
              {
                "name": "completedAt",
                "value": null
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T14:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "task-plumbing",
            "columns": [
              {
                "name": "work_task_id",
                "value": "task-plumbing"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-acme-renovation"
                }
              },
              {
                "name": "status",
                "value": "assigned"
              },
              {
                "name": "assigned_worker_id",
                "value": {
                  "ref": "actor:fieldWorker.u2"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-02T10:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "title",
                "value": "Plumbing Rough-In"
              },
              {
                "name": "description",
                "value": "Rough-in plumbing for restroom and kitchen areas"
              },
              {
                "name": "assignedWorkerName",
                "value": "Field Worker 2"
              },
              {
                "name": "dueDate",
                "value": "2026-07-06T00:00:00.000Z"
              },
              {
                "name": "budgetedCost",
                "value": 3500
              },
              {
                "name": "sequenceNumber",
                "value": 2
              },
              {
                "name": "startedAt",
                "value": null
              },
              {
                "name": "completedAt",
                "value": null
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T12:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "task-foundation",
            "columns": [
              {
                "name": "work_task_id",
                "value": "task-foundation"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-riverside-build"
                }
              },
              {
                "name": "status",
                "value": "completed"
              },
              {
                "name": "assigned_worker_id",
                "value": {
                  "ref": "actor:fieldWorker.u3"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-01T11:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "title",
                "value": "Foundation Pour"
              },
              {
                "name": "description",
                "value": "Pour concrete foundation and footings for commercial structure"
              },
              {
                "name": "assignedWorkerName",
                "value": "Field Worker 3"
              },
              {
                "name": "dueDate",
                "value": "2026-07-03T00:00:00.000Z"
              },
              {
                "name": "budgetedCost",
                "value": 8000
              },
              {
                "name": "sequenceNumber",
                "value": 1
              },
              {
                "name": "startedAt",
                "value": "2026-07-01T13:00:00.000Z"
              },
              {
                "name": "completedAt",
                "value": "2026-07-03T16:00:00.000Z"
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T16:00:00.000Z"
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "TimeLog",
        "rows": [
          {
            "key": "timelog-1",
            "columns": [
              {
                "name": "time_log_id",
                "value": "timelog-1"
              },
              {
                "name": "work_task_id",
                "value": {
                  "ref": "local:WorkTask.task-framing"
                }
              },
              {
                "name": "worker_id",
                "value": {
                  "ref": "actor:fieldWorker.u1"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T18:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "logDate",
                "value": "2026-07-03T00:00:00.000Z"
              },
              {
                "name": "hours",
                "value": 8
              },
              {
                "name": "workerRate",
                "value": 45
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          },
          {
            "key": "timelog-2",
            "columns": [
              {
                "name": "time_log_id",
                "value": "timelog-2"
              },
              {
                "name": "work_task_id",
                "value": {
                  "ref": "local:WorkTask.task-foundation"
                }
              },
              {
                "name": "worker_id",
                "value": {
                  "ref": "actor:fieldWorker.u3"
                }
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T18:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "logDate",
                "value": "2026-07-02T00:00:00.000Z"
              },
              {
                "name": "hours",
                "value": 6
              },
              {
                "name": "workerRate",
                "value": 50
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "MaterialUsage",
        "rows": [
          {
            "key": "mat-1",
            "columns": [
              {
                "name": "material_usage_id",
                "value": "mat-1"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-acme-renovation"
                }
              },
              {
                "name": "unit",
                "value": "unit"
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T12:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "materialName",
                "value": "Lumber 2x4"
              },
              {
                "name": "quantity",
                "value": 50
              },
              {
                "name": "unitCost",
                "value": 15
              },
              {
                "name": "totalCost",
                "value": 750
              },
              {
                "name": "usageDate",
                "value": "2026-07-02T00:00:00.000Z"
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          },
          {
            "key": "mat-2",
            "columns": [
              {
                "name": "material_usage_id",
                "value": "mat-2"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-riverside-build"
                }
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "status",
                "value": "posted"
              },
              {
                "name": "created_at",
                "value": "2026-07-01T14:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "materialName",
                "value": "Concrete Mix"
              },
              {
                "name": "quantity",
                "value": 100
              },
              {
                "name": "unitCost",
                "value": 8
              },
              {
                "name": "totalCost",
                "value": 800
              },
              {
                "name": "usageDate",
                "value": "2026-07-01T00:00:00.000Z"
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "ChangeOrder",
        "rows": [
          {
            "key": "co-approved",
            "columns": [
              {
                "name": "change_order_id",
                "value": "co-approved"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-acme-renovation"
                }
              },
              {
                "name": "status",
                "value": "approved"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T09:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "title",
                "value": "Additional Framing for Conference Room"
              },
              {
                "name": "scopeDescription",
                "value": "Add extra framing to accommodate enlarged conference room per client request"
              },
              {
                "name": "amount",
                "value": 5000
              },
              {
                "name": "sentAt",
                "value": "2026-07-02T14:00:00.000Z"
              },
              {
                "name": "approvedAt",
                "value": "2026-07-04T10:00:00.000Z"
              },
              {
                "name": "rejectedAt",
                "value": null
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "rejectionReason",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-04T10:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "co-sent",
            "columns": [
              {
                "name": "change_order_id",
                "value": "co-sent"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-acme-renovation"
                }
              },
              {
                "name": "status",
                "value": "sent"
              },
              {
                "name": "created_at",
                "value": "2026-07-03T09:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "title",
                "value": "Upgrade Lighting Fixtures"
              },
              {
                "name": "scopeDescription",
                "value": "Replace standard fixtures with LED panel lights throughout office area"
              },
              {
                "name": "amount",
                "value": 3000
              },
              {
                "name": "sentAt",
                "value": "2026-07-03T14:00:00.000Z"
              },
              {
                "name": "approvedAt",
                "value": null
              },
              {
                "name": "rejectedAt",
                "value": null
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "rejectionReason",
                "value": null
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T14:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "co-rejected",
            "columns": [
              {
                "name": "change_order_id",
                "value": "co-rejected"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-riverside-build"
                }
              },
              {
                "name": "status",
                "value": "rejected"
              },
              {
                "name": "created_at",
                "value": "2026-07-02T10:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "title",
                "value": "Premium Floor Finish"
              },
              {
                "name": "scopeDescription",
                "value": "Upgrade from standard to premium epoxy floor finish"
              },
              {
                "name": "amount",
                "value": 2000
              },
              {
                "name": "sentAt",
                "value": "2026-07-02T15:00:00.000Z"
              },
              {
                "name": "approvedAt",
                "value": null
              },
              {
                "name": "rejectedAt",
                "value": "2026-07-04T11:00:00.000Z"
              },
              {
                "name": "cancelledAt",
                "value": null
              },
              {
                "name": "rejectionReason",
                "value": "Client declined due to budget constraints"
              },
              {
                "name": "cancellationReason",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-04T11:00:00.000Z"
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "Invoice",
        "rows": [
          {
            "key": "inv-1",
            "columns": [
              {
                "name": "invoice_id",
                "value": "inv-1"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-acme-renovation"
                }
              },
              {
                "name": "status",
                "value": "issued"
              },
              {
                "name": "currency",
                "value": "usd"
              },
              {
                "name": "created_at",
                "value": "2026-07-05T09:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "laborCost",
                "value": 360
              },
              {
                "name": "materialCost",
                "value": 750
              },
              {
                "name": "changeOrderAmount",
                "value": 5000
              },
              {
                "name": "totalAmount",
                "value": 6110
              },
              {
                "name": "shareLink",
                "value": "https://portal.example.com/invoices/inv-1"
              },
              {
                "name": "clientEmail",
                "value": "john@acmecorp.com"
              },
              {
                "name": "issuedAt",
                "value": "2026-07-05T12:00:00.000Z"
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              },
              {
                "name": "notes",
                "value": "Billing summary for framing phase and approved change order"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-05T12:00:00.000Z"
              }
            ],
            "children": [
              {
                "name": "InvoiceLine",
                "rows": [
                  {
                    "key": "line-labor-1",
                    "fields": [
                      {
                        "name": "invoiceLineId",
                        "value": "line-labor-1"
                      },
                      {
                        "name": "invoiceId",
                        "value": {
                          "ref": "local:Invoice.inv-1"
                        }
                      },
                      {
                        "name": "lineType",
                        "value": "labor"
                      },
                      {
                        "name": "description",
                        "value": "Framing labor - 8 hours at $45/hr"
                      },
                      {
                        "name": "quantity",
                        "value": 8
                      },
                      {
                        "name": "unit",
                        "value": "hour"
                      },
                      {
                        "name": "unitCost",
                        "value": 45
                      },
                      {
                        "name": "lineAmount",
                        "value": 360
                      },
                      {
                        "name": "sourceRecordId",
                        "value": null
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-05T09:00:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-05T09:00:00.000Z"
                      }
                    ]
                  },
                  {
                    "key": "line-material-1",
                    "fields": [
                      {
                        "name": "invoiceLineId",
                        "value": "line-material-1"
                      },
                      {
                        "name": "invoiceId",
                        "value": {
                          "ref": "local:Invoice.inv-1"
                        }
                      },
                      {
                        "name": "lineType",
                        "value": "material"
                      },
                      {
                        "name": "description",
                        "value": "Lumber 2x4 - 50 units at $15/unit"
                      },
                      {
                        "name": "quantity",
                        "value": 50
                      },
                      {
                        "name": "unit",
                        "value": "unit"
                      },
                      {
                        "name": "unitCost",
                        "value": 15
                      },
                      {
                        "name": "lineAmount",
                        "value": 750
                      },
                      {
                        "name": "sourceRecordId",
                        "value": null
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-05T09:00:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-05T09:00:00.000Z"
                      }
                    ]
                  },
                  {
                    "key": "line-co-1",
                    "fields": [
                      {
                        "name": "invoiceLineId",
                        "value": "line-co-1"
                      },
                      {
                        "name": "invoiceId",
                        "value": {
                          "ref": "local:Invoice.inv-1"
                        }
                      },
                      {
                        "name": "lineType",
                        "value": "changeOrder"
                      },
                      {
                        "name": "description",
                        "value": "Approved change order - additional conference room framing"
                      },
                      {
                        "name": "quantity",
                        "value": 1
                      },
                      {
                        "name": "unit",
                        "value": "lumpSum"
                      },
                      {
                        "name": "unitCost",
                        "value": 5000
                      },
                      {
                        "name": "lineAmount",
                        "value": 5000
                      },
                      {
                        "name": "sourceRecordId",
                        "value": {
                          "ref": "local:ChangeOrder.co-approved"
                        }
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-05T09:00:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-05T09:00:00.000Z"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "inv-2",
            "columns": [
              {
                "name": "invoice_id",
                "value": "inv-2"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-riverside-build"
                }
              },
              {
                "name": "status",
                "value": "draft"
              },
              {
                "name": "currency",
                "value": "usd"
              },
              {
                "name": "created_at",
                "value": "2026-07-06T09:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "laborCost",
                "value": 300
              },
              {
                "name": "materialCost",
                "value": 800
              },
              {
                "name": "changeOrderAmount",
                "value": 0
              },
              {
                "name": "totalAmount",
                "value": 1100
              },
              {
                "name": "shareLink",
                "value": null
              },
              {
                "name": "clientEmail",
                "value": "sarah@riversidellc.com"
              },
              {
                "name": "issuedAt",
                "value": null
              },
              {
                "name": "voidedAt",
                "value": null
              },
              {
                "name": "voidReason",
                "value": null
              },
              {
                "name": "notes",
                "value": "Draft invoice for foundation phase - rejected change order excluded"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-06T09:00:00.000Z"
              }
            ],
            "children": [
              {
                "name": "InvoiceLine",
                "rows": [
                  {
                    "key": "line-labor-2",
                    "fields": [
                      {
                        "name": "invoiceLineId",
                        "value": "line-labor-2"
                      },
                      {
                        "name": "invoiceId",
                        "value": {
                          "ref": "local:Invoice.inv-2"
                        }
                      },
                      {
                        "name": "lineType",
                        "value": "labor"
                      },
                      {
                        "name": "description",
                        "value": "Foundation labor - 6 hours at $50/hr"
                      },
                      {
                        "name": "quantity",
                        "value": 6
                      },
                      {
                        "name": "unit",
                        "value": "hour"
                      },
                      {
                        "name": "unitCost",
                        "value": 50
                      },
                      {
                        "name": "lineAmount",
                        "value": 300
                      },
                      {
                        "name": "sourceRecordId",
                        "value": null
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-06T09:00:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-06T09:00:00.000Z"
                      }
                    ]
                  },
                  {
                    "key": "line-material-2",
                    "fields": [
                      {
                        "name": "invoiceLineId",
                        "value": "line-material-2"
                      },
                      {
                        "name": "invoiceId",
                        "value": {
                          "ref": "local:Invoice.inv-2"
                        }
                      },
                      {
                        "name": "lineType",
                        "value": "material"
                      },
                      {
                        "name": "description",
                        "value": "Concrete Mix - 100 kg at $8/kg"
                      },
                      {
                        "name": "quantity",
                        "value": 100
                      },
                      {
                        "name": "unit",
                        "value": "kg"
                      },
                      {
                        "name": "unitCost",
                        "value": 8
                      },
                      {
                        "name": "lineAmount",
                        "value": 800
                      },
                      {
                        "name": "sourceRecordId",
                        "value": null
                      },
                      {
                        "name": "createdAt",
                        "value": "2026-07-06T09:00:00.000Z"
                      },
                      {
                        "name": "updatedAt",
                        "value": "2026-07-06T09:00:00.000Z"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "tableId": "StatusReport",
        "rows": [
          {
            "key": "sr-1",
            "columns": [
              {
                "name": "status_report_id",
                "value": "sr-1"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-acme-renovation"
                }
              },
              {
                "name": "status",
                "value": "shared"
              },
              {
                "name": "created_at",
                "value": "2026-07-04T14:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "content",
                "value": "Project Acme Office Renovation is on track. Framing task is in progress with 8 hours logged. 50 units of lumber consumed. One change order approved for additional conference room framing ($5,000). Plumbing task assigned and pending start. No delay risks identified."
              },
              {
                "name": "reportPeriodStart",
                "value": "2026-07-01T00:00:00.000Z"
              },
              {
                "name": "reportPeriodEnd",
                "value": "2026-07-04T00:00:00.000Z"
              },
              {
                "name": "generatedAt",
                "value": "2026-07-04T14:00:00.000Z"
              },
              {
                "name": "llmModelUsed",
                "value": "platform-llm-proxy/gpt-4o"
              },
              {
                "name": "sharedAt",
                "value": "2026-07-05T10:00:00.000Z"
              },
              {
                "name": "shareLink",
                "value": "https://portal.example.com/reports/sr-1"
              },
              {
                "name": "sharedWithEmail",
                "value": "john@acmecorp.com"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-05T10:00:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "sr-2",
            "columns": [
              {
                "name": "status_report_id",
                "value": "sr-2"
              },
              {
                "name": "project_id",
                "value": {
                  "ref": "local:Project.proj-riverside-build"
                }
              },
              {
                "name": "status",
                "value": "generated"
              },
              {
                "name": "created_at",
                "value": "2026-07-06T14:00:00.000Z"
              }
            ],
            "details": [
              {
                "name": "content",
                "value": "Project Riverside Commercial Build is progressing. Foundation task completed with 6 hours logged. 100 kg of concrete mix consumed. Change order for premium floor finish was rejected by client. No delay risks identified."
              },
              {
                "name": "reportPeriodStart",
                "value": "2026-07-01T00:00:00.000Z"
              },
              {
                "name": "reportPeriodEnd",
                "value": "2026-07-06T00:00:00.000Z"
              },
              {
                "name": "generatedAt",
                "value": "2026-07-06T14:00:00.000Z"
              },
              {
                "name": "llmModelUsed",
                "value": "platform-llm-proxy/gpt-4o"
              },
              {
                "name": "sharedAt",
                "value": null
              },
              {
                "name": "shareLink",
                "value": null
              },
              {
                "name": "sharedWithEmail",
                "value": null
              },
              {
                "name": "updatedAt",
                "value": "2026-07-06T14:00:00.000Z"
              }
            ],
            "children": []
          }
        ]
      }
    ],
    "mdmEntities": [
      {
        "entityId": "Client",
        "rows": [
          {
            "key": "client-acme",
            "fields": [
              {
                "name": "clientId",
                "value": "client-acme"
              },
              {
                "name": "name",
                "value": "John Smith"
              },
              {
                "name": "companyName",
                "value": "Acme Corporation"
              },
              {
                "name": "email",
                "value": "john@acmecorp.com"
              },
              {
                "name": "phone",
                "value": "555-0101"
              },
              {
                "name": "portalAccessEnabled",
                "value": true
              },
              {
                "name": "billingAddress",
                "value": "123 Main St, Springfield, IL 62701"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T07:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T07:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "client-riverside",
            "fields": [
              {
                "name": "clientId",
                "value": "client-riverside"
              },
              {
                "name": "name",
                "value": "Sarah Johnson"
              },
              {
                "name": "companyName",
                "value": "Riverside LLC"
              },
              {
                "name": "email",
                "value": "sarah@riversidellc.com"
              },
              {
                "name": "phone",
                "value": "555-0102"
              },
              {
                "name": "portalAccessEnabled",
                "value": true
              },
              {
                "name": "billingAddress",
                "value": "456 Oak Ave, Portland, OR 97201"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T07:30:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T07:30:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "client-hilltop",
            "fields": [
              {
                "name": "clientId",
                "value": "client-hilltop"
              },
              {
                "name": "name",
                "value": "Mike Davis"
              },
              {
                "name": "companyName",
                "value": "Hilltop Properties"
              },
              {
                "name": "email",
                "value": "mike@hilltopprops.com"
              },
              {
                "name": "phone",
                "value": "555-0103"
              },
              {
                "name": "portalAccessEnabled",
                "value": false
              },
              {
                "name": "billingAddress",
                "value": "789 Pine Rd, Denver, CO 80201"
              },
              {
                "name": "createdAt",
                "value": "2026-07-03T07:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T07:00:00.000Z"
              }
            ],
            "relationships": []
          }
        ]
      }
    ]
  }
}
</agentCbSeedsPlan> */

import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const changeOrderSeeds: TableSeedRows = {
  "seedFor": "buildFlowFsmChangeOrder",
  "rows": [
    {
      "change_order_id": "fc58d9be-fd58-4b51-8a58-d698fb58d82b",
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "status": "approved",
      "created_at": "2026-07-02T09:00:00.000Z",
      "details": {
        "title": "Additional Framing for Conference Room",
        "scopeDescription": "Add extra framing to accommodate enlarged conference room per client request",
        "amount": 5000,
        "sentAt": "2026-07-02T14:00:00.000Z",
        "approvedAt": "2026-07-04T10:00:00.000Z",
        "rejectedAt": null,
        "cancelledAt": null,
        "rejectionReason": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-04T10:00:00.000Z"
      }
    },
    {
      "change_order_id": "9346da67-9246-48d4-8546-dd8d9446dbfa",
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "status": "sent",
      "created_at": "2026-07-03T09:00:00.000Z",
      "details": {
        "title": "Upgrade Lighting Fixtures",
        "scopeDescription": "Replace standard fixtures with LED panel lights throughout office area",
        "amount": 3000,
        "sentAt": "2026-07-03T14:00:00.000Z",
        "approvedAt": null,
        "rejectedAt": null,
        "cancelledAt": null,
        "rejectionReason": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-03T14:00:00.000Z"
      }
    },
    {
      "change_order_id": "93525b0b-9252-4978-8552-5e3194525c9e",
      "project_id": "32919311-3191-417e-8091-8feb2f918e58",
      "status": "rejected",
      "created_at": "2026-07-02T10:00:00.000Z",
      "details": {
        "title": "Premium Floor Finish",
        "scopeDescription": "Upgrade from standard to premium epoxy floor finish",
        "amount": 2000,
        "sentAt": "2026-07-02T15:00:00.000Z",
        "approvedAt": null,
        "rejectedAt": "2026-07-04T11:00:00.000Z",
        "cancelledAt": null,
        "rejectionReason": "Client declined due to budget constraints",
        "cancellationReason": null,
        "updatedAt": "2026-07-04T11:00:00.000Z"
      }
    }
  ]
};

export const invoiceSeeds: TableSeedRows = {
  "seedFor": "buildFlowFsmInvoice",
  "rows": [
    {
      "invoice_id": "3c0e96b2-3d0e-4845-8a0e-938c3b0e951f",
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "status": "issued",
      "currency": "usd",
      "created_at": "2026-07-05T09:00:00.000Z",
      "details": {
        "laborCost": 360,
        "materialCost": 750,
        "changeOrderAmount": 5000,
        "totalAmount": 6110,
        "shareLink": "https://portal.example.com/invoices/inv-1",
        "clientEmail": "john@acmecorp.com",
        "issuedAt": "2026-07-05T12:00:00.000Z",
        "voidedAt": null,
        "voidReason": null,
        "notes": "Billing summary for framing phase and approved change order",
        "updatedAt": "2026-07-05T12:00:00.000Z",
        "InvoiceLine": [
          {
            "invoiceLineId": "line-labor-1",
            "invoiceId": "3c0e96b2-3d0e-4845-8a0e-938c3b0e951f",
            "lineType": "labor",
            "description": "Framing labor - 8 hours at $45/hr",
            "quantity": 8,
            "unit": "hour",
            "unitCost": 45,
            "lineAmount": 360,
            "sourceRecordId": null,
            "createdAt": "2026-07-05T09:00:00.000Z",
            "updatedAt": "2026-07-05T09:00:00.000Z"
          },
          {
            "invoiceLineId": "line-material-1",
            "invoiceId": "3c0e96b2-3d0e-4845-8a0e-938c3b0e951f",
            "lineType": "material",
            "description": "Lumber 2x4 - 50 units at $15/unit",
            "quantity": 50,
            "unit": "unit",
            "unitCost": 15,
            "lineAmount": 750,
            "sourceRecordId": null,
            "createdAt": "2026-07-05T09:00:00.000Z",
            "updatedAt": "2026-07-05T09:00:00.000Z"
          },
          {
            "invoiceLineId": "line-co-1",
            "invoiceId": "3c0e96b2-3d0e-4845-8a0e-938c3b0e951f",
            "lineType": "changeOrder",
            "description": "Approved change order - additional conference room framing",
            "quantity": 1,
            "unit": "lumpSum",
            "unitCost": 5000,
            "lineAmount": 5000,
            "sourceRecordId": "fc58d9be-fd58-4b51-8a58-d698fb58d82b",
            "createdAt": "2026-07-05T09:00:00.000Z",
            "updatedAt": "2026-07-05T09:00:00.000Z"
          }
        ]
      }
    },
    {
      "invoice_id": "78ea8983-77ea-47f0-8aea-8ca979ea8b16",
      "project_id": "32919311-3191-417e-8091-8feb2f918e58",
      "status": "draft",
      "currency": "usd",
      "created_at": "2026-07-06T09:00:00.000Z",
      "details": {
        "laborCost": 300,
        "materialCost": 800,
        "changeOrderAmount": 0,
        "totalAmount": 1100,
        "shareLink": null,
        "clientEmail": "sarah@riversidellc.com",
        "issuedAt": null,
        "voidedAt": null,
        "voidReason": null,
        "notes": "Draft invoice for foundation phase - rejected change order excluded",
        "updatedAt": "2026-07-06T09:00:00.000Z",
        "InvoiceLine": [
          {
            "invoiceLineId": "line-labor-2",
            "invoiceId": "78ea8983-77ea-47f0-8aea-8ca979ea8b16",
            "lineType": "labor",
            "description": "Foundation labor - 6 hours at $50/hr",
            "quantity": 6,
            "unit": "hour",
            "unitCost": 50,
            "lineAmount": 300,
            "sourceRecordId": null,
            "createdAt": "2026-07-06T09:00:00.000Z",
            "updatedAt": "2026-07-06T09:00:00.000Z"
          },
          {
            "invoiceLineId": "line-material-2",
            "invoiceId": "78ea8983-77ea-47f0-8aea-8ca979ea8b16",
            "lineType": "material",
            "description": "Concrete Mix - 100 kg at $8/kg",
            "quantity": 100,
            "unit": "kg",
            "unitCost": 8,
            "lineAmount": 800,
            "sourceRecordId": null,
            "createdAt": "2026-07-06T09:00:00.000Z",
            "updatedAt": "2026-07-06T09:00:00.000Z"
          }
        ]
      }
    }
  ]
};

export const materialUsageSeeds: TableSeedRows = {
  "seedFor": "buildFlowFsmMaterialUsage",
  "rows": [
    {
      "material_usage_id": "22738a6c-2373-4bff-8473-8d9225738f25",
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "unit": "unit",
      "status": "posted",
      "created_at": "2026-07-02T12:00:00.000Z",
      "details": {
        "materialName": "Lumber 2x4",
        "quantity": 50,
        "unitCost": 15,
        "totalCost": 750,
        "usageDate": "2026-07-02T00:00:00.000Z",
        "voidedAt": null,
        "voidReason": null
      }
    },
    {
      "material_usage_id": "c3dc56a1-c2dc-450e-81dc-537bc0dc51e8",
      "project_id": "32919311-3191-417e-8091-8feb2f918e58",
      "unit": "kg",
      "status": "posted",
      "created_at": "2026-07-01T14:00:00.000Z",
      "details": {
        "materialName": "Concrete Mix",
        "quantity": 100,
        "unitCost": 8,
        "totalCost": 800,
        "usageDate": "2026-07-01T00:00:00.000Z",
        "voidedAt": null,
        "voidReason": null
      }
    }
  ]
};

export const projectSeeds: TableSeedRows = {
  "seedFor": "buildFlowFsmProject",
  "rows": [
    {
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "client_id": "66cfa7a2-67cf-4935-84cf-a47c65cfa60f",
      "status": "active",
      "created_at": "2026-07-01T08:00:00.000Z",
      "details": {
        "name": "Acme Office Renovation",
        "siteAddress": "123 Main St, Springfield, IL",
        "budget": 75000,
        "startDate": "2026-07-01T00:00:00.000Z",
        "endDate": "2026-07-07T00:00:00.000Z",
        "completedAt": null,
        "cancelledAt": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-02T10:00:00.000Z"
      }
    },
    {
      "project_id": "32919311-3191-417e-8091-8feb2f918e58",
      "client_id": "448da321-438d-418e-828d-9ffb418d9e68",
      "status": "active",
      "created_at": "2026-07-01T09:00:00.000Z",
      "details": {
        "name": "Riverside Commercial Build",
        "siteAddress": "456 Oak Ave, Portland, OR",
        "budget": 120000,
        "startDate": "2026-07-01T00:00:00.000Z",
        "endDate": "2026-07-07T00:00:00.000Z",
        "completedAt": null,
        "cancelledAt": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-02T11:00:00.000Z"
      }
    },
    {
      "project_id": "fabd07c1-f9bd-462e-88bd-049bf7bd0308",
      "client_id": "8371c172-8471-4305-8171-be4c8271bfdf",
      "status": "draft",
      "created_at": "2026-07-03T08:00:00.000Z",
      "details": {
        "name": "Hilltop Property Upgrade",
        "siteAddress": "789 Pine Rd, Denver, CO",
        "budget": 50000,
        "startDate": "2026-07-04T00:00:00.000Z",
        "endDate": "2026-07-06T00:00:00.000Z",
        "completedAt": null,
        "cancelledAt": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-03T08:00:00.000Z"
      }
    }
  ]
};

export const statusReportSeeds: TableSeedRows = {
  "seedFor": "buildFlowFsmStatusReport",
  "rows": [
    {
      "status_report_id": "4d87289b-4c87-4708-8f87-2bc14e872a2e",
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "status": "shared",
      "created_at": "2026-07-04T14:00:00.000Z",
      "details": {
        "content": "Project Acme Office Renovation is on track. Framing task is in progress with 8 hours logged. 50 units of lumber consumed. One change order approved for additional conference room framing ($5,000). Plumbing task assigned and pending start. No delay risks identified.",
        "reportPeriodStart": "2026-07-01T00:00:00.000Z",
        "reportPeriodEnd": "2026-07-04T00:00:00.000Z",
        "generatedAt": "2026-07-04T14:00:00.000Z",
        "llmModelUsed": "platform-llm-proxy/gpt-4o",
        "sharedAt": "2026-07-05T10:00:00.000Z",
        "shareLink": "https://portal.example.com/reports/sr-1",
        "sharedWithEmail": "john@acmecorp.com",
        "updatedAt": "2026-07-05T10:00:00.000Z"
      }
    },
    {
      "status_report_id": "10ab35ca-11ab-475d-8eab-32a40fab3437",
      "project_id": "32919311-3191-417e-8091-8feb2f918e58",
      "status": "generated",
      "created_at": "2026-07-06T14:00:00.000Z",
      "details": {
        "content": "Project Riverside Commercial Build is progressing. Foundation task completed with 6 hours logged. 100 kg of concrete mix consumed. Change order for premium floor finish was rejected by client. No delay risks identified.",
        "reportPeriodStart": "2026-07-01T00:00:00.000Z",
        "reportPeriodEnd": "2026-07-06T00:00:00.000Z",
        "generatedAt": "2026-07-06T14:00:00.000Z",
        "llmModelUsed": "platform-llm-proxy/gpt-4o",
        "sharedAt": null,
        "shareLink": null,
        "sharedWithEmail": null,
        "updatedAt": "2026-07-06T14:00:00.000Z"
      }
    }
  ]
};

export const timeLogSeeds: TableSeedRows = {
  "seedFor": "buildFlowFsmTimeLog",
  "rows": [
    {
      "time_log_id": "19e2b02e-1ae2-41c1-87e2-ad0818e2ae9b",
      "work_task_id": "f7b76a9e-f8b7-4c31-85b7-6778f6b7690b",
      "worker_id": "c42001f2-c520-4385-821f-feccc320005f",
      "status": "posted",
      "created_at": "2026-07-03T18:00:00.000Z",
      "details": {
        "logDate": "2026-07-03T00:00:00.000Z",
        "hours": 8,
        "workerRate": 45,
        "voidedAt": null,
        "voidReason": null
      }
    },
    {
      "time_log_id": "56bea2ff-55be-416c-88be-a62557bea492",
      "work_task_id": "311cdd6d-301c-4bda-8f1c-da472e1cd8b4",
      "worker_id": "2944e4a4-2a44-4637-8b44-e7ca2c44e95d",
      "status": "posted",
      "created_at": "2026-07-02T18:00:00.000Z",
      "details": {
        "logDate": "2026-07-02T00:00:00.000Z",
        "hours": 6,
        "workerRate": 50,
        "voidedAt": null,
        "voidReason": null
      }
    }
  ]
};

export const workTaskSeeds: TableSeedRows = {
  "seedFor": "buildFlowFsmWorkTask",
  "rows": [
    {
      "work_task_id": "f7b76a9e-f8b7-4c31-85b7-6778f6b7690b",
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "status": "inProgress",
      "assigned_worker_id": "c42001f2-c520-4385-821f-feccc320005f",
      "created_at": "2026-07-01T10:00:00.000Z",
      "details": {
        "title": "Framing Installation",
        "description": "Install wood framing for interior walls per architectural plans",
        "assignedWorkerName": "Field Worker 1",
        "dueDate": "2026-07-05T00:00:00.000Z",
        "budgetedCost": 4000,
        "sequenceNumber": 1,
        "startedAt": "2026-07-03T14:00:00.000Z",
        "completedAt": null,
        "cancelledAt": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-03T14:00:00.000Z"
      }
    },
    {
      "work_task_id": "3a013fb4-3b01-4147-8c01-42da3d01446d",
      "project_id": "a4a80df1-a3a8-4c5e-82a8-0acba1a80938",
      "status": "assigned",
      "assigned_worker_id": "00fbf4c3-fffb-4330-82fb-f7e901fbf656",
      "created_at": "2026-07-02T10:00:00.000Z",
      "details": {
        "title": "Plumbing Rough-In",
        "description": "Rough-in plumbing for restroom and kitchen areas",
        "assignedWorkerName": "Field Worker 2",
        "dueDate": "2026-07-06T00:00:00.000Z",
        "budgetedCost": 3500,
        "sequenceNumber": 2,
        "startedAt": null,
        "completedAt": null,
        "cancelledAt": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-02T12:00:00.000Z"
      }
    },
    {
      "work_task_id": "311cdd6d-301c-4bda-8f1c-da472e1cd8b4",
      "project_id": "32919311-3191-417e-8091-8feb2f918e58",
      "status": "completed",
      "assigned_worker_id": "2944e4a4-2a44-4637-8b44-e7ca2c44e95d",
      "created_at": "2026-07-01T11:00:00.000Z",
      "details": {
        "title": "Foundation Pour",
        "description": "Pour concrete foundation and footings for commercial structure",
        "assignedWorkerName": "Field Worker 3",
        "dueDate": "2026-07-03T00:00:00.000Z",
        "budgetedCost": 8000,
        "sequenceNumber": 1,
        "startedAt": "2026-07-01T13:00:00.000Z",
        "completedAt": "2026-07-03T16:00:00.000Z",
        "cancelledAt": null,
        "cancellationReason": null,
        "updatedAt": "2026-07-03T16:00:00.000Z"
      }
    }
  ]
};

export const mdmEntityIndexSeeds: TableSeedRows = {
  "seedFor": "mdmEntityIndex",
  "rows": [
    {
      "mdmId": "66cfa7a2-67cf-4935-84cf-a47c65cfa60f",
      "subtype": "Product",
      "name": "John Smith",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "Client"
      ],
      "searchVector": "john smith client buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "66cfa7a2-67cf-4935-84cf-a47c65cfa60f",
      "createdAt": "2026-07-01T07:00:00.000Z",
      "updatedAt": "2026-07-01T07:00:00.000Z"
    },
    {
      "mdmId": "448da321-438d-418e-828d-9ffb418d9e68",
      "subtype": "Product",
      "name": "Sarah Johnson",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "Client"
      ],
      "searchVector": "sarah johnson client buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "448da321-438d-418e-828d-9ffb418d9e68",
      "createdAt": "2026-07-01T07:30:00.000Z",
      "updatedAt": "2026-07-01T07:30:00.000Z"
    },
    {
      "mdmId": "8371c172-8471-4305-8171-be4c8271bfdf",
      "subtype": "Product",
      "name": "Mike Davis",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "Client"
      ],
      "searchVector": "mike davis client buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "8371c172-8471-4305-8171-be4c8271bfdf",
      "createdAt": "2026-07-03T07:00:00.000Z",
      "updatedAt": "2026-07-03T07:00:00.000Z"
    },
    {
      "mdmId": "eb9f4422-ec9f-45b5-899f-40fcea9f428f",
      "subtype": "Person",
      "name": "Company Admin / Owner 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "companyAdmin"
      ],
      "searchVector": "company admin / owner 1 companyadmin buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "eb9f4422-ec9f-45b5-899f-40fcea9f428f",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "287b36f3-277b-4560-8a7b-3a19297b3886",
      "subtype": "Person",
      "name": "Company Admin / Owner 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "companyAdmin"
      ],
      "searchVector": "company admin / owner 2 companyadmin buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "287b36f3-277b-4560-8a7b-3a19297b3886",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "52015b54-5301-4ce7-8401-5e7a5501600d",
      "subtype": "Person",
      "name": "Company Admin / Owner 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "companyAdmin"
      ],
      "searchVector": "company admin / owner 3 companyadmin buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "52015b54-5301-4ce7-8401-5e7a5501600d",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "d005e388-d105-451b-8205-e6aed305e841",
      "subtype": "Person",
      "name": "Project Manager 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "projectManager"
      ],
      "searchVector": "project manager 1 projectmanager buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "d005e388-d105-451b-8205-e6aed305e841",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "f059542d-ef59-429a-8e59-5107ed594f74",
      "subtype": "Person",
      "name": "Project Manager 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "projectManager"
      ],
      "searchVector": "project manager 2 projectmanager buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "f059542d-ef59-429a-8e59-5107ed594f74",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "e9cba546-eacb-46d9-87cb-a220e8cba3b3",
      "subtype": "Person",
      "name": "Project Manager 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "projectManager"
      ],
      "searchVector": "project manager 3 projectmanager buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "e9cba546-eacb-46d9-87cb-a220e8cba3b3",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "c42001f2-c520-4385-821f-feccc320005f",
      "subtype": "Person",
      "name": "Field Worker 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "fieldWorker"
      ],
      "searchVector": "field worker 1 fieldworker buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "c42001f2-c520-4385-821f-feccc320005f",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "00fbf4c3-fffb-4330-82fb-f7e901fbf656",
      "subtype": "Person",
      "name": "Field Worker 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "fieldWorker"
      ],
      "searchVector": "field worker 2 fieldworker buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "00fbf4c3-fffb-4330-82fb-f7e901fbf656",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "2944e4a4-2a44-4637-8b44-e7ca2c44e95d",
      "subtype": "Person",
      "name": "Field Worker 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "fieldWorker"
      ],
      "searchVector": "field worker 3 fieldworker buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "2944e4a4-2a44-4637-8b44-e7ca2c44e95d",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "0d75fd85-0c75-4bf2-8b75-fa5f0a75f8cc",
      "subtype": "Person",
      "name": "Client 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "client"
      ],
      "searchVector": "client 1 client buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "0d75fd85-0c75-4bf2-8b75-fa5f0a75f8cc",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "6d235660-6e23-47f3-8f23-598670235b19",
      "subtype": "Person",
      "name": "Client 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "client"
      ],
      "searchVector": "client 2 client buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "6d235660-6e23-47f3-8f23-598670235b19",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "63c473cf-62c4-423c-85c4-76f564c47562",
      "subtype": "Person",
      "name": "Client 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "buildFlowFsm",
        "actor",
        "client"
      ],
      "searchVector": "client 3 client buildflowfsm",
      "mergedInto": null,
      "dynamoPk": "63c473cf-62c4-423c-85c4-76f564c47562",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    }
  ]
};

export const mdmDocumentSeeds: TableSeedRows = {
  "seedFor": "mdmDocumentCache",
  "rows": [
    {
      "mdmId": "66cfa7a2-67cf-4935-84cf-a47c65cfa60f",
      "version": 1,
      "details": {
        "mdmId": "66cfa7a2-67cf-4935-84cf-a47c65cfa60f",
        "subtype": "Product",
        "name": "John Smith",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "Client"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T07:00:00.000Z",
        "updatedAt": "2026-07-01T07:00:00.000Z",
        "buildFlowFsm": {
          "clientId": "66cfa7a2-67cf-4935-84cf-a47c65cfa60f",
          "name": "John Smith",
          "companyName": "Acme Corporation",
          "email": "john@acmecorp.com",
          "phone": "555-0101",
          "portalAccessEnabled": true,
          "billingAddress": "123 Main St, Springfield, IL 62701",
          "createdAt": "2026-07-01T07:00:00.000Z",
          "updatedAt": "2026-07-01T07:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "448da321-438d-418e-828d-9ffb418d9e68",
      "version": 1,
      "details": {
        "mdmId": "448da321-438d-418e-828d-9ffb418d9e68",
        "subtype": "Product",
        "name": "Sarah Johnson",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "Client"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T07:30:00.000Z",
        "updatedAt": "2026-07-01T07:30:00.000Z",
        "buildFlowFsm": {
          "clientId": "448da321-438d-418e-828d-9ffb418d9e68",
          "name": "Sarah Johnson",
          "companyName": "Riverside LLC",
          "email": "sarah@riversidellc.com",
          "phone": "555-0102",
          "portalAccessEnabled": true,
          "billingAddress": "456 Oak Ave, Portland, OR 97201",
          "createdAt": "2026-07-01T07:30:00.000Z",
          "updatedAt": "2026-07-01T07:30:00.000Z"
        }
      }
    },
    {
      "mdmId": "8371c172-8471-4305-8171-be4c8271bfdf",
      "version": 1,
      "details": {
        "mdmId": "8371c172-8471-4305-8171-be4c8271bfdf",
        "subtype": "Product",
        "name": "Mike Davis",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "Client"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-03T07:00:00.000Z",
        "updatedAt": "2026-07-03T07:00:00.000Z",
        "buildFlowFsm": {
          "clientId": "8371c172-8471-4305-8171-be4c8271bfdf",
          "name": "Mike Davis",
          "companyName": "Hilltop Properties",
          "email": "mike@hilltopprops.com",
          "phone": "555-0103",
          "portalAccessEnabled": false,
          "billingAddress": "789 Pine Rd, Denver, CO 80201",
          "createdAt": "2026-07-03T07:00:00.000Z",
          "updatedAt": "2026-07-03T07:00:00.000Z"
        }
      }
    },
    {
      "mdmId": "eb9f4422-ec9f-45b5-899f-40fcea9f428f",
      "version": 1,
      "details": {
        "mdmId": "eb9f4422-ec9f-45b5-899f-40fcea9f428f",
        "subtype": "Person",
        "name": "Company Admin / Owner 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "companyAdmin"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "companyAdmin"
      }
    },
    {
      "mdmId": "287b36f3-277b-4560-8a7b-3a19297b3886",
      "version": 1,
      "details": {
        "mdmId": "287b36f3-277b-4560-8a7b-3a19297b3886",
        "subtype": "Person",
        "name": "Company Admin / Owner 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "companyAdmin"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "companyAdmin"
      }
    },
    {
      "mdmId": "52015b54-5301-4ce7-8401-5e7a5501600d",
      "version": 1,
      "details": {
        "mdmId": "52015b54-5301-4ce7-8401-5e7a5501600d",
        "subtype": "Person",
        "name": "Company Admin / Owner 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "companyAdmin"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "companyAdmin"
      }
    },
    {
      "mdmId": "d005e388-d105-451b-8205-e6aed305e841",
      "version": 1,
      "details": {
        "mdmId": "d005e388-d105-451b-8205-e6aed305e841",
        "subtype": "Person",
        "name": "Project Manager 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "projectManager"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "projectManager"
      }
    },
    {
      "mdmId": "f059542d-ef59-429a-8e59-5107ed594f74",
      "version": 1,
      "details": {
        "mdmId": "f059542d-ef59-429a-8e59-5107ed594f74",
        "subtype": "Person",
        "name": "Project Manager 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "projectManager"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "projectManager"
      }
    },
    {
      "mdmId": "e9cba546-eacb-46d9-87cb-a220e8cba3b3",
      "version": 1,
      "details": {
        "mdmId": "e9cba546-eacb-46d9-87cb-a220e8cba3b3",
        "subtype": "Person",
        "name": "Project Manager 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "projectManager"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "projectManager"
      }
    },
    {
      "mdmId": "c42001f2-c520-4385-821f-feccc320005f",
      "version": 1,
      "details": {
        "mdmId": "c42001f2-c520-4385-821f-feccc320005f",
        "subtype": "Person",
        "name": "Field Worker 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "fieldWorker"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "fieldWorker"
      }
    },
    {
      "mdmId": "00fbf4c3-fffb-4330-82fb-f7e901fbf656",
      "version": 1,
      "details": {
        "mdmId": "00fbf4c3-fffb-4330-82fb-f7e901fbf656",
        "subtype": "Person",
        "name": "Field Worker 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "fieldWorker"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "fieldWorker"
      }
    },
    {
      "mdmId": "2944e4a4-2a44-4637-8b44-e7ca2c44e95d",
      "version": 1,
      "details": {
        "mdmId": "2944e4a4-2a44-4637-8b44-e7ca2c44e95d",
        "subtype": "Person",
        "name": "Field Worker 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "fieldWorker"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "fieldWorker"
      }
    },
    {
      "mdmId": "0d75fd85-0c75-4bf2-8b75-fa5f0a75f8cc",
      "version": 1,
      "details": {
        "mdmId": "0d75fd85-0c75-4bf2-8b75-fa5f0a75f8cc",
        "subtype": "Person",
        "name": "Client 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "client"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "client"
      }
    },
    {
      "mdmId": "6d235660-6e23-47f3-8f23-598670235b19",
      "version": 1,
      "details": {
        "mdmId": "6d235660-6e23-47f3-8f23-598670235b19",
        "subtype": "Person",
        "name": "Client 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "client"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "client"
      }
    },
    {
      "mdmId": "63c473cf-62c4-423c-85c4-76f564c47562",
      "version": 1,
      "details": {
        "mdmId": "63c473cf-62c4-423c-85c4-76f564c47562",
        "subtype": "Person",
        "name": "Client 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "buildFlowFsm",
          "actor",
          "client"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "client"
      }
    }
  ]
};
