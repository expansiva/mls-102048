/// <mls fileReference="_102048_/l2/buildFlowFsm/web/shared/workTaskLifecycle.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "workTaskLifecycle",
  "pageName": "Task Planning & Assignment",
  "moduleName": "buildFlowFsm",
  "baseClassName": "BuildFlowFsmWorkTaskLifecycleBase",
  "routePattern": "/buildFlowFsm/workTaskLifecycle/:projectId?/:workTaskId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:workTaskLifecycle",
    "operation:createTask",
    "operation:assignTask",
    "operation:updateTask"
  ],
  "operationIds": [
    "createTask",
    "assignTask",
    "updateTask"
  ],
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
  "contractRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.defs.ts",
    "tsPath": "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.ts"
  },
  "layoutRef": {
    "defPath": "_102048_/l2/buildFlowFsm/web/desktop/page11/workTaskLifecycle.defs.ts",
    "layoutId": "wizard_flow_page11"
  },
  "states": [
    {
      "stateKey": "ui.workTaskLifecycle.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.action.createTask.status",
      "name": "createTaskState",
      "kind": "actionStatus",
      "actionRef": "createTask",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.title",
      "name": "createTaskTitle",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "title"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.description",
      "name": "createTaskDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.dueDate",
      "name": "createTaskDueDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "dueDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.assignedWorkerId",
      "name": "createTaskAssignedWorkerId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "assignedWorkerId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.assignedWorkerName",
      "name": "createTaskAssignedWorkerName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "assignedWorkerName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.budgetedCost",
      "name": "createTaskBudgetedCost",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "budgetedCost"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.sequenceNumber",
      "name": "createTaskSequenceNumber",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "sequenceNumber"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.createTask.projectId",
      "name": "createTaskProjectId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "createTask",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.action.assignTask.status",
      "name": "assignTaskState",
      "kind": "actionStatus",
      "actionRef": "assignTask",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.assignTask.workTaskId",
      "name": "assignTaskWorkTaskId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "assignTask",
        "direction": "input",
        "field": "workTaskId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.assignTask.assignedWorkerId",
      "name": "assignTaskAssignedWorkerId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "assignTask",
        "direction": "input",
        "field": "assignedWorkerId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.assignTask.assignedWorkerName",
      "name": "assignTaskAssignedWorkerName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "assignTask",
        "direction": "input",
        "field": "assignedWorkerName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.assignTask.dueDate",
      "name": "assignTaskDueDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "assignTask",
        "direction": "input",
        "field": "dueDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.action.updateTask.status",
      "name": "updateTaskState",
      "kind": "actionStatus",
      "actionRef": "updateTask",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.workTaskId",
      "name": "updateTaskWorkTaskId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "workTaskId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.projectId",
      "name": "updateTaskProjectId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "projectId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.title",
      "name": "updateTaskTitle",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "title"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.description",
      "name": "updateTaskDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.assignedWorkerId",
      "name": "updateTaskAssignedWorkerId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "assignedWorkerId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.assignedWorkerName",
      "name": "updateTaskAssignedWorkerName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "assignedWorkerName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.dueDate",
      "name": "updateTaskDueDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "dueDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.budgetedCost",
      "name": "updateTaskBudgetedCost",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "budgetedCost"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.input.updateTask.sequenceNumber",
      "name": "updateTaskSequenceNumber",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateTask",
        "direction": "input",
        "field": "sequenceNumber"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.workTaskLifecycle.output.createTask",
      "name": "OutputCreateTask",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.workTaskLifecycle.output.assignTask",
      "name": "OutputAssignTask",
      "kind": "commandOutput",
      "defaultValue": null
    },
    {
      "stateKey": "ui.workTaskLifecycle.output.updateTask",
      "name": "OutputUpdateTask",
      "kind": "commandOutput",
      "defaultValue": null
    }
  ],
  "actions": [
    {
      "actionId": "createTask",
      "kind": "command",
      "commandRef": "createTask",
      "routeKey": "buildFlowFsm.workTaskLifecycle.createTask",
      "purpose": "Create a work task",
      "methodName": "createTask",
      "handlerName": "handleCreateTaskClick",
      "inputStateKeys": [
        "ui.workTaskLifecycle.input.createTask.title",
        "ui.workTaskLifecycle.input.createTask.description",
        "ui.workTaskLifecycle.input.createTask.dueDate",
        "ui.workTaskLifecycle.input.createTask.assignedWorkerId",
        "ui.workTaskLifecycle.input.createTask.assignedWorkerName",
        "ui.workTaskLifecycle.input.createTask.budgetedCost",
        "ui.workTaskLifecycle.input.createTask.sequenceNumber",
        "ui.workTaskLifecycle.input.createTask.projectId"
      ],
      "routeParamInputStateKeys": [
        "ui.workTaskLifecycle.input.createTask.projectId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.workTaskLifecycle.output.createTask"
      ],
      "statusStateKey": "ui.workTaskLifecycle.action.createTask.status"
    },
    {
      "actionId": "assignTask",
      "kind": "command",
      "commandRef": "assignTask",
      "routeKey": "buildFlowFsm.workTaskLifecycle.assignTask",
      "purpose": "Assign worker and due date to task",
      "methodName": "assignTask",
      "handlerName": "handleAssignTaskClick",
      "inputStateKeys": [
        "ui.workTaskLifecycle.input.assignTask.workTaskId",
        "ui.workTaskLifecycle.input.assignTask.assignedWorkerId",
        "ui.workTaskLifecycle.input.assignTask.assignedWorkerName",
        "ui.workTaskLifecycle.input.assignTask.dueDate"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.workTaskLifecycle.input.assignTask.workTaskId"
      ],
      "outputStateKeys": [
        "ui.workTaskLifecycle.output.assignTask"
      ],
      "statusStateKey": "ui.workTaskLifecycle.action.assignTask.status"
    },
    {
      "actionId": "updateTask",
      "kind": "command",
      "commandRef": "updateTask",
      "routeKey": "buildFlowFsm.updateTask.updateTask",
      "purpose": "Edit task details or reassign",
      "methodName": "updateTask",
      "handlerName": "handleUpdateTaskClick",
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
      ],
      "routeParamInputStateKeys": [
        "ui.workTaskLifecycle.input.updateTask.workTaskId"
      ],
      "selectedEntityInputStateKeys": [
        "ui.workTaskLifecycle.input.updateTask.projectId"
      ],
      "outputStateKeys": [
        "ui.workTaskLifecycle.output.updateTask"
      ],
      "statusStateKey": "ui.workTaskLifecycle.action.updateTask.status"
    },
    {
      "actionId": "set.createTaskTitle",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.title",
      "methodName": "setCreateTaskTitle",
      "handlerName": "handleCreateTaskTitleChange"
    },
    {
      "actionId": "set.createTaskDescription",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.description",
      "methodName": "setCreateTaskDescription",
      "handlerName": "handleCreateTaskDescriptionChange"
    },
    {
      "actionId": "set.createTaskDueDate",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.dueDate",
      "methodName": "setCreateTaskDueDate",
      "handlerName": "handleCreateTaskDueDateChange"
    },
    {
      "actionId": "set.createTaskAssignedWorkerId",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.assignedWorkerId",
      "methodName": "setCreateTaskAssignedWorkerId",
      "handlerName": "handleCreateTaskAssignedWorkerIdChange"
    },
    {
      "actionId": "set.createTaskAssignedWorkerName",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.assignedWorkerName",
      "methodName": "setCreateTaskAssignedWorkerName",
      "handlerName": "handleCreateTaskAssignedWorkerNameChange"
    },
    {
      "actionId": "set.createTaskBudgetedCost",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.budgetedCost",
      "methodName": "setCreateTaskBudgetedCost",
      "handlerName": "handleCreateTaskBudgetedCostChange"
    },
    {
      "actionId": "set.createTaskSequenceNumber",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.sequenceNumber",
      "methodName": "setCreateTaskSequenceNumber",
      "handlerName": "handleCreateTaskSequenceNumberChange"
    },
    {
      "actionId": "set.createTaskProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.createTask.projectId",
      "methodName": "setCreateTaskProjectId",
      "handlerName": "handleCreateTaskProjectIdChange"
    },
    {
      "actionId": "set.assignTaskWorkTaskId",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.assignTask.workTaskId",
      "methodName": "setAssignTaskWorkTaskId",
      "handlerName": "handleAssignTaskWorkTaskIdChange"
    },
    {
      "actionId": "set.assignTaskAssignedWorkerId",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.assignTask.assignedWorkerId",
      "methodName": "setAssignTaskAssignedWorkerId",
      "handlerName": "handleAssignTaskAssignedWorkerIdChange"
    },
    {
      "actionId": "set.assignTaskAssignedWorkerName",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.assignTask.assignedWorkerName",
      "methodName": "setAssignTaskAssignedWorkerName",
      "handlerName": "handleAssignTaskAssignedWorkerNameChange"
    },
    {
      "actionId": "set.assignTaskDueDate",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.assignTask.dueDate",
      "methodName": "setAssignTaskDueDate",
      "handlerName": "handleAssignTaskDueDateChange"
    },
    {
      "actionId": "set.updateTaskWorkTaskId",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.workTaskId",
      "methodName": "setUpdateTaskWorkTaskId",
      "handlerName": "handleUpdateTaskWorkTaskIdChange"
    },
    {
      "actionId": "set.updateTaskProjectId",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.projectId",
      "methodName": "setUpdateTaskProjectId",
      "handlerName": "handleUpdateTaskProjectIdChange"
    },
    {
      "actionId": "set.updateTaskTitle",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.title",
      "methodName": "setUpdateTaskTitle",
      "handlerName": "handleUpdateTaskTitleChange"
    },
    {
      "actionId": "set.updateTaskDescription",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.description",
      "methodName": "setUpdateTaskDescription",
      "handlerName": "handleUpdateTaskDescriptionChange"
    },
    {
      "actionId": "set.updateTaskAssignedWorkerId",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.assignedWorkerId",
      "methodName": "setUpdateTaskAssignedWorkerId",
      "handlerName": "handleUpdateTaskAssignedWorkerIdChange"
    },
    {
      "actionId": "set.updateTaskAssignedWorkerName",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.assignedWorkerName",
      "methodName": "setUpdateTaskAssignedWorkerName",
      "handlerName": "handleUpdateTaskAssignedWorkerNameChange"
    },
    {
      "actionId": "set.updateTaskDueDate",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.dueDate",
      "methodName": "setUpdateTaskDueDate",
      "handlerName": "handleUpdateTaskDueDateChange"
    },
    {
      "actionId": "set.updateTaskBudgetedCost",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.budgetedCost",
      "methodName": "setUpdateTaskBudgetedCost",
      "handlerName": "handleUpdateTaskBudgetedCostChange"
    },
    {
      "actionId": "set.updateTaskSequenceNumber",
      "kind": "stateSetter",
      "stateKey": "ui.workTaskLifecycle.input.updateTask.sequenceNumber",
      "methodName": "setUpdateTaskSequenceNumber",
      "handlerName": "handleUpdateTaskSequenceNumberChange"
    }
  ],
  "initialLoads": [],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "en",
    "activeLocales": [
      "en"
    ]
  },
  "i18n": {
    "page.title": "Task Planning & Assignment",
    "section.task_planning": "Task Planning & Assignment",
    "organism.task_list": "Task List",
    "organism.create_task": "Create Task",
    "organism.assign_task": "Assign Task",
    "organism.update_task": "Update Task",
    "organism.task_review": "Task Review",
    "intention.query_tasks.title": "Work Tasks",
    "intention.task_workflow_status.title": "Task Status",
    "intention.create_task_form.title": "Create a Work Task",
    "intention.assign_task_form.title": "Assign Worker & Due Date",
    "intention.update_task_form.title": "Edit Task Details",
    "intention.review_summary.title": "Timeline & Delay Risk Review",
    "field.workTaskId": "Task ID",
    "field.title": "Title",
    "field.description": "Description",
    "field.dueDate": "Due Date",
    "field.assignedWorkerId": "Assigned Worker",
    "field.assignedWorkerName": "Worker Name",
    "field.budgetedCost": "Budgeted Cost",
    "field.sequenceNumber": "Sequence",
    "field.projectId": "Project",
    "field.status": "Status",
    "filter.status": "Filter by Status",
    "action.createTask": "Create Task",
    "action.assignTask": "Assign Task",
    "action.updateTask": "Update Task",
    "empty.task_list": "No work tasks found for this project.",
    "empty.workflow_status": "Select a task to view its lifecycle status.",
    "empty.review_summary": "No tasks available for timeline review.",
    "sec.task.planning.title": "Sec task planning",
    "org.task.list.title": "View existing work tasks for the project and select one for assignment or update",
    "org.create.task.title": "Create a new work task with title, description, and due date within the project date range",
    "org.assign.task.title": "Assign a field worker and set a due date on a selected draft or existing task",
    "org.update.task.title": "Edit task details, reassign worker, or adjust due date and budget",
    "org.task.review.title": "Review the simplified task timeline, delay risk suggestions, and overall project progress"
  },
  "automation": {
    "statePrefix": "ui.workTaskLifecycle",
    "stateKeys": [
      "ui.workTaskLifecycle.status",
      "ui.workTaskLifecycle.action.createTask.status",
      "ui.workTaskLifecycle.input.createTask.title",
      "ui.workTaskLifecycle.input.createTask.description",
      "ui.workTaskLifecycle.input.createTask.dueDate",
      "ui.workTaskLifecycle.input.createTask.assignedWorkerId",
      "ui.workTaskLifecycle.input.createTask.assignedWorkerName",
      "ui.workTaskLifecycle.input.createTask.budgetedCost",
      "ui.workTaskLifecycle.input.createTask.sequenceNumber",
      "ui.workTaskLifecycle.input.createTask.projectId",
      "ui.workTaskLifecycle.action.assignTask.status",
      "ui.workTaskLifecycle.input.assignTask.workTaskId",
      "ui.workTaskLifecycle.input.assignTask.assignedWorkerId",
      "ui.workTaskLifecycle.input.assignTask.assignedWorkerName",
      "ui.workTaskLifecycle.input.assignTask.dueDate",
      "ui.workTaskLifecycle.action.updateTask.status",
      "ui.workTaskLifecycle.input.updateTask.workTaskId",
      "ui.workTaskLifecycle.input.updateTask.projectId",
      "ui.workTaskLifecycle.input.updateTask.title",
      "ui.workTaskLifecycle.input.updateTask.description",
      "ui.workTaskLifecycle.input.updateTask.assignedWorkerId",
      "ui.workTaskLifecycle.input.updateTask.assignedWorkerName",
      "ui.workTaskLifecycle.input.updateTask.dueDate",
      "ui.workTaskLifecycle.input.updateTask.budgetedCost",
      "ui.workTaskLifecycle.input.updateTask.sequenceNumber",
      "ui.workTaskLifecycle.output.createTask",
      "ui.workTaskLifecycle.output.assignTask",
      "ui.workTaskLifecycle.output.updateTask"
    ],
    "actionIds": [
      "createTask",
      "assignTask",
      "updateTask",
      "set.createTaskTitle",
      "set.createTaskDescription",
      "set.createTaskDueDate",
      "set.createTaskAssignedWorkerId",
      "set.createTaskAssignedWorkerName",
      "set.createTaskBudgetedCost",
      "set.createTaskSequenceNumber",
      "set.createTaskProjectId",
      "set.assignTaskWorkTaskId",
      "set.assignTaskAssignedWorkerId",
      "set.assignTaskAssignedWorkerName",
      "set.assignTaskDueDate",
      "set.updateTaskWorkTaskId",
      "set.updateTaskProjectId",
      "set.updateTaskTitle",
      "set.updateTaskDescription",
      "set.updateTaskAssignedWorkerId",
      "set.updateTaskAssignedWorkerName",
      "set.updateTaskDueDate",
      "set.updateTaskBudgetedCost",
      "set.updateTaskSequenceNumber"
    ]
  }
};

export const pipeline = [
  {
    "id": "workTaskLifecycle__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102048_/l2/buildFlowFsm/web/shared/workTaskLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/shared/workTaskLifecycle.defs.ts",
    "dependsFiles": [
      "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [
      "workTaskLifecycle__l2_contract"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
