/// <mls fileReference="_102048_/l2/buildFlowFsm/web/desktop/page11/workTaskLifecycle.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "workTaskLifecycle",
  "pageName": "Task Planning & Assignment",
  "baseClassName": "BuildFlowFsmWorkTaskLifecycleBase",
  "actor": "projectManager",
  "purpose": "Executar Task Planning & Assignment.",
  "capabilities": [
    "workTaskLifecycle",
    "updateTask"
  ],
  "flowRefs": {
    "experienceFlows": [
      "workTaskLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "workTaskLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "workTaskLifecycle",
    "workspaceKind": "workflow",
    "workflowId": "workTaskLifecycle",
    "actor": "projectManager",
    "entity": "WorkTask",
    "owners": [
      {
        "kind": "workflow",
        "id": "workTaskLifecycle",
        "defPath": "_102048_/l4/workflows/workTaskLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createTask",
        "defPath": "_102048_/l4/operations/createTask.defs.ts"
      },
      {
        "kind": "operation",
        "id": "assignTask",
        "defPath": "_102048_/l4/operations/assignTask.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateTask",
        "defPath": "_102048_/l4/operations/updateTask.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "The project manager opens the project detail view and creates individual work tasks with clear descriptions of what needs to be done.",
        "The project manager assigns each task to a specific field worker and sets a due date that falls within the project start and end dates.",
        "The field worker starts working on the assigned task and updates its status to in progress so the PM and dashboard reflect current progress.",
        "The field worker completes the work and marks the task as completed, recording hours and materials along the way.",
        "The project manager reviews the simplified task timeline and delay risk suggestions to ensure the project stays on track."
      ],
      "operations": [
        {
          "operationId": "createTask",
          "commandName": "createTask",
          "steps": [
            "The project manager opens the project detail view and initiates task creation.",
            "They provide a title, description, due date, and optionally assign a worker and set a budgeted cost and sequence number.",
            "The system validates that the due date falls within the project's start and end dates.",
            "The system creates the task with status draft, a generated UUID, and creation timestamps."
          ]
        },
        {
          "operationId": "assignTask",
          "commandName": "assignTask",
          "steps": [
            "The project manager selects a draft or existing work task from the project task list.",
            "The project manager chooses a field worker from the available workers and sets a due date.",
            "The system validates that the due date falls within the parent project's start and end dates.",
            "The system updates the task with the assigned worker, worker display name, due date, and transitions status to 'assigned'."
          ]
        },
        {
          "operationId": "updateTask",
          "commandName": "updateTask",
          "steps": [
            "The project manager selects a work task from the project detail view.",
            "The system loads the current task details and the parent project's date range for validation.",
            "The project manager modifies editable fields such as title, description, due date, assigned worker, budgeted cost, or sequence number.",
            "The system validates that the due date falls within the project start and end dates and that a worker is assigned if the task is in progress.",
            "The system persists the updated task and refreshes the updatedAt timestamp."
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "sec_task_planning",
      "type": "section",
      "sectionName": "sec_task_planning",
      "titleKey": "sec.task.planning.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org_task_list",
          "type": "organism",
          "organismName": "TaskList",
          "titleKey": "org.task.list.title",
          "purpose": "View existing work tasks for the project and select one for assignment or update",
          "userActions": [],
          "requiredEntities": [
            "WorkTask",
            "Project"
          ],
          "readsFields": [
            "workTaskId",
            "title",
            "status",
            "assignedWorkerName",
            "dueDate",
            "budgetedCost",
            "sequenceNumber"
          ],
          "writesFields": [],
          "rulesApplied": [],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent_query_tasks",
              "intent": "queryList",
              "order": 10
            },
            {
              "id": "intent_task_workflow_status",
              "intent": "workflowStatus",
              "order": 20
            }
          ]
        },
        {
          "id": "org_create_task",
          "type": "organism",
          "organismName": "CreateTask",
          "titleKey": "org.create.task.title",
          "purpose": "Create a new work task with title, description, and due date within the project date range",
          "userActions": [
            "createTask"
          ],
          "requiredEntities": [
            "WorkTask",
            "Project"
          ],
          "readsFields": [
            "projectId"
          ],
          "writesFields": [
            "title",
            "description",
            "dueDate",
            "assignedWorkerId",
            "assignedWorkerName",
            "budgetedCost",
            "sequenceNumber",
            "projectId"
          ],
          "rulesApplied": [
            "taskDueDateWithinProject",
            "taskRequiresWorkerAssignment"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent_create_task_form",
              "intent": "commandForm",
              "stateKey": "ui.workTaskLifecycle.action.createTask.status",
              "action": "createTask",
              "submitAction": "createTask",
              "order": 10
            }
          ]
        },
        {
          "id": "org_assign_task",
          "type": "organism",
          "organismName": "AssignTask",
          "titleKey": "org.assign.task.title",
          "purpose": "Assign a field worker and set a due date on a selected draft or existing task",
          "userActions": [
            "assignTask"
          ],
          "requiredEntities": [
            "WorkTask",
            "Project"
          ],
          "readsFields": [
            "workTaskId",
            "status",
            "dueDate"
          ],
          "writesFields": [
            "workTaskId",
            "assignedWorkerId",
            "assignedWorkerName",
            "dueDate"
          ],
          "rulesApplied": [
            "taskRequiresWorkerAssignment",
            "taskDueDateWithinProject"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent_assign_task_form",
              "intent": "commandForm",
              "stateKey": "ui.workTaskLifecycle.action.assignTask.status",
              "action": "assignTask",
              "submitAction": "assignTask",
              "order": 10
            }
          ]
        },
        {
          "id": "org_update_task",
          "type": "organism",
          "organismName": "UpdateTask",
          "titleKey": "org.update.task.title",
          "purpose": "Edit task details, reassign worker, or adjust due date and budget",
          "userActions": [
            "updateTask"
          ],
          "requiredEntities": [
            "WorkTask",
            "Project"
          ],
          "readsFields": [
            "workTaskId",
            "projectId",
            "title",
            "description",
            "assignedWorkerId",
            "assignedWorkerName",
            "dueDate",
            "budgetedCost",
            "sequenceNumber"
          ],
          "writesFields": [
            "workTaskId",
            "projectId",
            "title",
            "description",
            "assignedWorkerId",
            "assignedWorkerName",
            "dueDate",
            "budgetedCost",
            "sequenceNumber"
          ],
          "rulesApplied": [
            "taskRequiresWorkerAssignment",
            "taskDueDateWithinProject"
          ],
          "order": 40,
          "intentionRefs": [
            {
              "id": "intent_update_task_form",
              "intent": "commandForm",
              "stateKey": "ui.workTaskLifecycle.action.updateTask.status",
              "action": "updateTask",
              "submitAction": "updateTask",
              "order": 10
            }
          ]
        },
        {
          "id": "org_task_review",
          "type": "organism",
          "organismName": "TaskReview",
          "titleKey": "org.task.review.title",
          "purpose": "Review the simplified task timeline, delay risk suggestions, and overall project progress",
          "userActions": [],
          "requiredEntities": [
            "WorkTask",
            "Project"
          ],
          "readsFields": [
            "title",
            "status",
            "dueDate",
            "sequenceNumber",
            "budgetedCost",
            "assignedWorkerName"
          ],
          "writesFields": [],
          "rulesApplied": [
            "timelineIsSimplified",
            "delayRiskCalculation"
          ],
          "order": 50,
          "intentionRefs": [
            {
              "id": "intent_review_summary",
              "intent": "summary",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "layout": {
    "id": "wizard_flow_page11",
    "type": "page",
    "sections": [
      {
        "id": "sec_task_planning",
        "type": "section",
        "sectionName": "sec_task_planning",
        "titleKey": "sec.task.planning.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org_task_list",
            "type": "organism",
            "organismName": "TaskList",
            "titleKey": "org.task.list.title",
            "purpose": "View existing work tasks for the project and select one for assignment or update",
            "userActions": [],
            "requiredEntities": [
              "WorkTask",
              "Project"
            ],
            "readsFields": [
              "workTaskId",
              "title",
              "status",
              "assignedWorkerName",
              "dueDate",
              "budgetedCost",
              "sequenceNumber"
            ],
            "writesFields": [],
            "rulesApplied": [],
            "order": 10,
            "intentions": [
              {
                "id": "intent_query_tasks",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intention.query_tasks.title",
                "emptyKey": "empty.task_list",
                "fields": [],
                "columns": [
                  {
                    "id": "col_workTaskId",
                    "field": "workTaskId",
                    "labelKey": "field.workTaskId",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "uuid"
                  },
                  {
                    "id": "col_title",
                    "field": "title",
                    "labelKey": "field.title",
                    "order": 20,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 30,
                    "required": false,
                    "inputType": "text",
                    "format": "enum"
                  },
                  {
                    "id": "col_assignedWorkerName",
                    "field": "assignedWorkerName",
                    "labelKey": "field.assignedWorkerName",
                    "order": 40,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "col_dueDate",
                    "field": "dueDate",
                    "labelKey": "field.dueDate",
                    "order": 50,
                    "required": false,
                    "inputType": "date"
                  },
                  {
                    "id": "col_budgetedCost",
                    "field": "budgetedCost",
                    "labelKey": "field.budgetedCost",
                    "order": 60,
                    "required": false,
                    "inputType": "number",
                    "format": "money"
                  },
                  {
                    "id": "col_sequenceNumber",
                    "field": "sequenceNumber",
                    "labelKey": "field.sequenceNumber",
                    "order": 70,
                    "required": false,
                    "inputType": "number"
                  }
                ],
                "filters": [
                  {
                    "id": "filter_status",
                    "field": "status",
                    "labelKey": "filter.status",
                    "order": 10,
                    "required": false,
                    "inputType": "select",
                    "format": "enum"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              },
              {
                "id": "intent_task_workflow_status",
                "intent": "workflowStatus",
                "order": 20,
                "titleKey": "intention.task_workflow_status.title",
                "emptyKey": "empty.workflow_status",
                "fields": [
                  {
                    "id": "ws_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 10,
                    "required": false,
                    "inputType": "text",
                    "format": "enum"
                  },
                  {
                    "id": "ws_assignedWorkerName",
                    "field": "assignedWorkerName",
                    "labelKey": "field.assignedWorkerName",
                    "order": 20,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "ws_dueDate",
                    "field": "dueDate",
                    "labelKey": "field.dueDate",
                    "order": 30,
                    "required": false,
                    "inputType": "date"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          },
          {
            "id": "org_create_task",
            "type": "organism",
            "organismName": "CreateTask",
            "titleKey": "org.create.task.title",
            "purpose": "Create a new work task with title, description, and due date within the project date range",
            "userActions": [
              "createTask"
            ],
            "requiredEntities": [
              "WorkTask",
              "Project"
            ],
            "readsFields": [
              "projectId"
            ],
            "writesFields": [
              "title",
              "description",
              "dueDate",
              "assignedWorkerId",
              "assignedWorkerName",
              "budgetedCost",
              "sequenceNumber",
              "projectId"
            ],
            "rulesApplied": [
              "taskDueDateWithinProject",
              "taskRequiresWorkerAssignment"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent_create_task_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intention.create_task_form.title",
                "action": "createTask",
                "submitAction": "createTask",
                "displayHint": "wizard-step",
                "stateKey": "ui.workTaskLifecycle.action.createTask.status",
                "fields": [
                  {
                    "id": "ct_projectId",
                    "field": "projectId",
                    "labelKey": "field.projectId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "routeParam",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.projectId"
                  },
                  {
                    "id": "ct_title",
                    "field": "title",
                    "labelKey": "field.title",
                    "order": 20,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.title"
                  },
                  {
                    "id": "ct_description",
                    "field": "description",
                    "labelKey": "field.description",
                    "order": 30,
                    "required": true,
                    "inputType": "textarea",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.description"
                  },
                  {
                    "id": "ct_dueDate",
                    "field": "dueDate",
                    "labelKey": "field.dueDate",
                    "order": 40,
                    "required": true,
                    "inputType": "date",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.dueDate"
                  },
                  {
                    "id": "ct_assignedWorkerId",
                    "field": "assignedWorkerId",
                    "labelKey": "field.assignedWorkerId",
                    "order": 50,
                    "required": false,
                    "inputType": "select",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.assignedWorkerId"
                  },
                  {
                    "id": "ct_assignedWorkerName",
                    "field": "assignedWorkerName",
                    "labelKey": "field.assignedWorkerName",
                    "order": 60,
                    "required": false,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.assignedWorkerName"
                  },
                  {
                    "id": "ct_budgetedCost",
                    "field": "budgetedCost",
                    "labelKey": "field.budgetedCost",
                    "order": 70,
                    "required": false,
                    "inputType": "number",
                    "format": "money",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.budgetedCost"
                  },
                  {
                    "id": "ct_sequenceNumber",
                    "field": "sequenceNumber",
                    "labelKey": "field.sequenceNumber",
                    "order": 80,
                    "required": false,
                    "inputType": "number",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.createTask.sequenceNumber"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_submit_create",
                    "action": "createTask",
                    "labelKey": "action.createTask",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "createTask"
                  }
                ]
              }
            ]
          },
          {
            "id": "org_assign_task",
            "type": "organism",
            "organismName": "AssignTask",
            "titleKey": "org.assign.task.title",
            "purpose": "Assign a field worker and set a due date on a selected draft or existing task",
            "userActions": [
              "assignTask"
            ],
            "requiredEntities": [
              "WorkTask",
              "Project"
            ],
            "readsFields": [
              "workTaskId",
              "status",
              "dueDate"
            ],
            "writesFields": [
              "workTaskId",
              "assignedWorkerId",
              "assignedWorkerName",
              "dueDate"
            ],
            "rulesApplied": [
              "taskRequiresWorkerAssignment",
              "taskDueDateWithinProject"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent_assign_task_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intention.assign_task_form.title",
                "action": "assignTask",
                "submitAction": "assignTask",
                "displayHint": "wizard-step",
                "stateKey": "ui.workTaskLifecycle.action.assignTask.status",
                "fields": [
                  {
                    "id": "at_workTaskId",
                    "field": "workTaskId",
                    "labelKey": "field.workTaskId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.workTaskLifecycle.input.assignTask.workTaskId"
                  },
                  {
                    "id": "at_assignedWorkerId",
                    "field": "assignedWorkerId",
                    "labelKey": "field.assignedWorkerId",
                    "order": 20,
                    "required": true,
                    "inputType": "select",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.assignTask.assignedWorkerId"
                  },
                  {
                    "id": "at_assignedWorkerName",
                    "field": "assignedWorkerName",
                    "labelKey": "field.assignedWorkerName",
                    "order": 30,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.assignTask.assignedWorkerName"
                  },
                  {
                    "id": "at_dueDate",
                    "field": "dueDate",
                    "labelKey": "field.dueDate",
                    "order": 40,
                    "required": true,
                    "inputType": "date",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.assignTask.dueDate"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_submit_assign",
                    "action": "assignTask",
                    "labelKey": "action.assignTask",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "assignTask"
                  }
                ]
              }
            ]
          },
          {
            "id": "org_update_task",
            "type": "organism",
            "organismName": "UpdateTask",
            "titleKey": "org.update.task.title",
            "purpose": "Edit task details, reassign worker, or adjust due date and budget",
            "userActions": [
              "updateTask"
            ],
            "requiredEntities": [
              "WorkTask",
              "Project"
            ],
            "readsFields": [
              "workTaskId",
              "projectId",
              "title",
              "description",
              "assignedWorkerId",
              "assignedWorkerName",
              "dueDate",
              "budgetedCost",
              "sequenceNumber"
            ],
            "writesFields": [
              "workTaskId",
              "projectId",
              "title",
              "description",
              "assignedWorkerId",
              "assignedWorkerName",
              "dueDate",
              "budgetedCost",
              "sequenceNumber"
            ],
            "rulesApplied": [
              "taskRequiresWorkerAssignment",
              "taskDueDateWithinProject"
            ],
            "order": 40,
            "intentions": [
              {
                "id": "intent_update_task_form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intention.update_task_form.title",
                "action": "updateTask",
                "submitAction": "updateTask",
                "displayHint": "wizard-step",
                "stateKey": "ui.workTaskLifecycle.action.updateTask.status",
                "fields": [
                  {
                    "id": "ut_workTaskId",
                    "field": "workTaskId",
                    "labelKey": "field.workTaskId",
                    "order": 10,
                    "required": true,
                    "inputType": "hidden",
                    "source": "routeParam",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.workTaskId"
                  },
                  {
                    "id": "ut_projectId",
                    "field": "projectId",
                    "labelKey": "field.projectId",
                    "order": 20,
                    "required": true,
                    "inputType": "hidden",
                    "source": "selectedEntity",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.projectId"
                  },
                  {
                    "id": "ut_title",
                    "field": "title",
                    "labelKey": "field.title",
                    "order": 30,
                    "required": true,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.title"
                  },
                  {
                    "id": "ut_description",
                    "field": "description",
                    "labelKey": "field.description",
                    "order": 40,
                    "required": true,
                    "inputType": "textarea",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.description"
                  },
                  {
                    "id": "ut_assignedWorkerId",
                    "field": "assignedWorkerId",
                    "labelKey": "field.assignedWorkerId",
                    "order": 50,
                    "required": false,
                    "inputType": "select",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.assignedWorkerId"
                  },
                  {
                    "id": "ut_assignedWorkerName",
                    "field": "assignedWorkerName",
                    "labelKey": "field.assignedWorkerName",
                    "order": 60,
                    "required": false,
                    "inputType": "text",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.assignedWorkerName"
                  },
                  {
                    "id": "ut_dueDate",
                    "field": "dueDate",
                    "labelKey": "field.dueDate",
                    "order": 70,
                    "required": true,
                    "inputType": "date",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.dueDate"
                  },
                  {
                    "id": "ut_budgetedCost",
                    "field": "budgetedCost",
                    "labelKey": "field.budgetedCost",
                    "order": 80,
                    "required": false,
                    "inputType": "number",
                    "format": "money",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.budgetedCost"
                  },
                  {
                    "id": "ut_sequenceNumber",
                    "field": "sequenceNumber",
                    "labelKey": "field.sequenceNumber",
                    "order": 90,
                    "required": false,
                    "inputType": "number",
                    "source": "userInput",
                    "stateKey": "ui.workTaskLifecycle.input.updateTask.sequenceNumber"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "act_submit_update",
                    "action": "updateTask",
                    "labelKey": "action.updateTask",
                    "order": 10,
                    "displayHint": "primary",
                    "actionKey": "updateTask"
                  }
                ]
              }
            ]
          },
          {
            "id": "org_task_review",
            "type": "organism",
            "organismName": "TaskReview",
            "titleKey": "org.task.review.title",
            "purpose": "Review the simplified task timeline, delay risk suggestions, and overall project progress",
            "userActions": [],
            "requiredEntities": [
              "WorkTask",
              "Project"
            ],
            "readsFields": [
              "title",
              "status",
              "dueDate",
              "sequenceNumber",
              "budgetedCost",
              "assignedWorkerName"
            ],
            "writesFields": [],
            "rulesApplied": [
              "timelineIsSimplified",
              "delayRiskCalculation"
            ],
            "order": 50,
            "intentions": [
              {
                "id": "intent_review_summary",
                "intent": "summary",
                "order": 10,
                "titleKey": "intention.review_summary.title",
                "emptyKey": "empty.review_summary",
                "fields": [],
                "columns": [
                  {
                    "id": "rv_title",
                    "field": "title",
                    "labelKey": "field.title",
                    "order": 10,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rv_status",
                    "field": "status",
                    "labelKey": "field.status",
                    "order": 20,
                    "required": false,
                    "inputType": "text",
                    "format": "enum"
                  },
                  {
                    "id": "rv_assignedWorkerName",
                    "field": "assignedWorkerName",
                    "labelKey": "field.assignedWorkerName",
                    "order": 30,
                    "required": false,
                    "inputType": "text"
                  },
                  {
                    "id": "rv_dueDate",
                    "field": "dueDate",
                    "labelKey": "field.dueDate",
                    "order": 40,
                    "required": false,
                    "inputType": "date"
                  },
                  {
                    "id": "rv_sequenceNumber",
                    "field": "sequenceNumber",
                    "labelKey": "field.sequenceNumber",
                    "order": 50,
                    "required": false,
                    "inputType": "number"
                  },
                  {
                    "id": "rv_budgetedCost",
                    "field": "budgetedCost",
                    "labelKey": "field.budgetedCost",
                    "order": 60,
                    "required": false,
                    "inputType": "number",
                    "format": "money"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ]
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "bind_createTask",
      "source": "buildFlowFsm.workTaskLifecycle.createTask",
      "entity": "WorkTask",
      "command": "createTask",
      "description": "Create a work task with title, description, due date, and optional worker assignment",
      "stateKey": "ui.workTaskLifecycle.output.createTask",
      "inputStateKeys": [
        "ui.workTaskLifecycle.input.createTask.title",
        "ui.workTaskLifecycle.input.createTask.description",
        "ui.workTaskLifecycle.input.createTask.dueDate",
        "ui.workTaskLifecycle.input.createTask.assignedWorkerId",
        "ui.workTaskLifecycle.input.createTask.assignedWorkerName",
        "ui.workTaskLifecycle.input.createTask.budgetedCost",
        "ui.workTaskLifecycle.input.createTask.sequenceNumber",
        "ui.workTaskLifecycle.input.createTask.projectId"
      ]
    },
    {
      "id": "bind_assignTask",
      "source": "buildFlowFsm.workTaskLifecycle.assignTask",
      "entity": "WorkTask",
      "command": "assignTask",
      "description": "Assign a field worker and due date to a selected work task",
      "stateKey": "ui.workTaskLifecycle.output.assignTask",
      "inputStateKeys": [
        "ui.workTaskLifecycle.input.assignTask.workTaskId",
        "ui.workTaskLifecycle.input.assignTask.assignedWorkerId",
        "ui.workTaskLifecycle.input.assignTask.assignedWorkerName",
        "ui.workTaskLifecycle.input.assignTask.dueDate"
      ]
    },
    {
      "id": "bind_updateTask",
      "source": "buildFlowFsm.updateTask.updateTask",
      "entity": "WorkTask",
      "command": "updateTask",
      "description": "Edit task details, reassign worker, or adjust due date and budget",
      "stateKey": "ui.workTaskLifecycle.output.updateTask",
      "inputStateKeys": [
        "ui.workTaskLifecycle.input.updateTask.workTaskId",
        "ui.workTaskLifecycle.input.updateTask.projectId",
        "ui.workTaskLifecycle.input.updateTask.title",
        "ui.workTaskLifecycle.input.updateTask.description",
        "ui.workTaskLifecycle.input.updateTask.assignedWorkerId",
        "ui.workTaskLifecycle.input.updateTask.assignedWorkerName",
        "ui.workTaskLifecycle.input.updateTask.dueDate",
        "ui.workTaskLifecycle.input.updateTask.budgetedCost",
        "ui.workTaskLifecycle.input.updateTask.sequenceNumber"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "workTaskLifecycle__l2_page",
    "type": "l2_page",
    "outputPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/workTaskLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/workTaskLifecycle.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/shared/workTaskLifecycle.defs.ts",
      "_102048_/l2/buildFlowFsm/web/shared/workTaskLifecycle.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.defs.ts",
      "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.ts",
      "_102048_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "workTaskLifecycle__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "Dashboard-first, data-dense, status-driven UI with timeline views, cost tracking panels, and mobile-friendly field logging"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
