/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "createTask",
    "bffName": "buildFlowFsm.workTaskLifecycle.createTask",
    "routeKey": "buildFlowFsm.workTaskLifecycle.createTask",
    "purpose": "Create a work task",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Short name of the task entered by the project manager.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "description",
        "type": "string",
        "required": true,
        "description": "Detailed description of the work to be performed.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "dueDate",
        "type": "date",
        "required": true,
        "description": "Deadline by which the task should be completed.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "assignedWorkerId",
        "type": "string",
        "required": false,
        "description": "Identifier of the field worker to assign to this task, if known at creation time.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "assignedWorkerName",
        "type": "string",
        "required": false,
        "description": "Display name of the assigned field worker, denormalized from the platform user profile.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "budgetedCost",
        "type": "number",
        "required": false,
        "description": "Planned cost budgeted for this task.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "sequenceNumber",
        "type": "number",
        "required": false,
        "description": "Position of the task in the simplified timeline sequence view.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "Identifier of the parent project this task belongs to, taken from the current route.",
        "source": "routeParam",
        "presentation": "route"
      }
    ],
    "output": [
      {
        "name": "workTaskId",
        "type": "string",
        "description": "Primary identifier for the work task."
      },
      {
        "name": "title",
        "type": "string",
        "description": "Short name of the task."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "assigned",
          "inProgress",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the task."
      },
      {
        "name": "dueDate",
        "type": "date",
        "description": "Deadline by which the task should be completed; must fall within the project start and end dates."
      },
      {
        "name": "assignedWorkerName",
        "type": "string",
        "description": "Display name of the assigned field worker, denormalized from the platform user profile."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:createTask",
      "operationId": "createTask",
      "defPath": "_102048_/l4/operations/createTask.defs.ts",
      "bffName": "buildFlowFsm.workTaskLifecycle.createTask"
    }
  },
  {
    "commandName": "assignTask",
    "bffName": "buildFlowFsm.workTaskLifecycle.assignTask",
    "routeKey": "buildFlowFsm.workTaskLifecycle.assignTask",
    "purpose": "Assign worker and due date to task",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "workTaskId",
        "type": "string",
        "required": true,
        "description": "The work task to assign a worker and due date to.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "assignedWorkerId",
        "type": "string",
        "required": true,
        "description": "Identifier of the field worker selected to perform this task.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "assignedWorkerName",
        "type": "string",
        "required": true,
        "description": "Display name of the selected field worker, denormalized onto the task.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "dueDate",
        "type": "date",
        "required": true,
        "description": "Deadline by which the task should be completed.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "workTaskId",
        "type": "string",
        "description": "Primary identifier for the work task."
      },
      {
        "name": "title",
        "type": "string",
        "description": "Short name of the task."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "assigned",
          "inProgress",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the task."
      },
      {
        "name": "assignedWorkerId",
        "type": "string",
        "description": "Identifier of the field worker assigned to this task, sourced from the platform user profile."
      },
      {
        "name": "assignedWorkerName",
        "type": "string",
        "description": "Display name of the assigned field worker, denormalized from the platform user profile."
      },
      {
        "name": "dueDate",
        "type": "date",
        "description": "Deadline by which the task should be completed; must fall within the project start and end dates."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:assignTask",
      "operationId": "assignTask",
      "defPath": "_102048_/l4/operations/assignTask.defs.ts",
      "bffName": "buildFlowFsm.workTaskLifecycle.assignTask"
    }
  },
  {
    "commandName": "updateTask",
    "bffName": "buildFlowFsm.updateTask.updateTask",
    "routeKey": "buildFlowFsm.updateTask.updateTask",
    "purpose": "Edit task details or reassign",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "workTaskId",
        "type": "string",
        "required": true,
        "description": "Identifier of the work task to update, provided via the route parameter.",
        "source": "routeParam",
        "presentation": "route"
      },
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "Identifier of the parent project, used to validate the due date range.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Updated short name of the task.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "description",
        "type": "string",
        "required": true,
        "description": "Updated detailed description of the work to be performed.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "assignedWorkerId",
        "type": "string",
        "required": false,
        "description": "Identifier of the field worker to assign or reassign to this task.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "assignedWorkerName",
        "type": "string",
        "required": false,
        "description": "Display name of the assigned field worker, denormalized from the platform user profile.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "dueDate",
        "type": "date",
        "required": true,
        "description": "Updated deadline by which the task should be completed.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "budgetedCost",
        "type": "number",
        "required": false,
        "description": "Updated planned cost budgeted for this task.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "sequenceNumber",
        "type": "number",
        "required": false,
        "description": "Updated position of the task in the simplified timeline sequence view.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "workTaskId",
        "type": "string",
        "description": "Primary identifier for the work task."
      },
      {
        "name": "title",
        "type": "string",
        "description": "Short name of the task."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Detailed description of the work to be performed."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "draft",
          "assigned",
          "inProgress",
          "completed",
          "cancelled"
        ],
        "description": "Current lifecycle state of the task."
      },
      {
        "name": "assignedWorkerId",
        "type": "string",
        "description": "Identifier of the field worker assigned to this task, sourced from the platform user profile."
      },
      {
        "name": "assignedWorkerName",
        "type": "string",
        "description": "Display name of the assigned field worker, denormalized from the platform user profile."
      },
      {
        "name": "dueDate",
        "type": "date",
        "description": "Deadline by which the task should be completed; must fall within the project start and end dates."
      },
      {
        "name": "budgetedCost",
        "type": "number",
        "description": "Planned cost budgeted for this task used in budget vs actual comparison."
      },
      {
        "name": "sequenceNumber",
        "type": "number",
        "description": "Position of the task in the simplified timeline sequence view."
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Last update timestamp."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:updateTask",
      "operationId": "updateTask",
      "defPath": "_102048_/l4/operations/updateTask.defs.ts",
      "bffName": "buildFlowFsm.updateTask.updateTask"
    }
  }
];

export const pipeline = [
  {
    "id": "workTaskLifecycle__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/workTaskLifecycle.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
