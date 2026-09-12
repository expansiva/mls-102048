/// <mls fileReference="_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "browseTasks",
    "bffName": "buildFlowFsm.browseTasks.browseTasks",
    "routeKey": "buildFlowFsm.browseTasks.browseTasks",
    "purpose": "Browse assigned tasks",
    "kind": "query",
    "outputShape": "paginated",
    "input": [],
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
        "name": "dueDate",
        "type": "date",
        "description": "Deadline by which the task should be completed; must fall within the project start and end dates."
      },
      {
        "name": "projectId",
        "type": "string",
        "description": "Reference to the parent project this task belongs to."
      },
      {
        "name": "sequenceNumber",
        "type": "number",
        "description": "Position of the task in the simplified timeline sequence view."
      },
      {
        "name": "assignedWorkerName",
        "type": "string",
        "description": "Display name of the assigned field worker, denormalized from the platform user profile."
      },
      {
        "name": "startedAt",
        "type": "date",
        "description": "Timestamp when the task was moved to inProgress."
      },
      {
        "name": "completedAt",
        "type": "date",
        "description": "Timestamp when the task was marked completed."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:browseTasks",
      "operationId": "browseTasks",
      "defPath": "_102048_/l4/operations/browseTasks.defs.ts",
      "bffName": "buildFlowFsm.browseTasks.browseTasks"
    }
  },
  {
    "commandName": "updateTaskStatus",
    "bffName": "buildFlowFsm.workTaskLifecycle.updateTaskStatus",
    "routeKey": "buildFlowFsm.workTaskLifecycle.updateTaskStatus",
    "purpose": "Update task status",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "workTaskId",
        "type": "string",
        "required": true,
        "description": "The work task selected by the field worker whose status will be updated.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "enum": [
          "draft",
          "assigned",
          "inProgress",
          "completed",
          "cancelled"
        ],
        "description": "The new lifecycle status chosen by the field worker — inProgress or completed.",
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
        "name": "startedAt",
        "type": "date",
        "description": "Timestamp when the task was moved to inProgress."
      },
      {
        "name": "completedAt",
        "type": "date",
        "description": "Timestamp when the task was marked completed."
      },
      {
        "name": "updatedAt",
        "type": "date",
        "description": "Last update timestamp."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:updateTaskStatus",
      "operationId": "updateTaskStatus",
      "defPath": "_102048_/l4/operations/updateTaskStatus.defs.ts",
      "bffName": "buildFlowFsm.workTaskLifecycle.updateTaskStatus"
    }
  },
  {
    "commandName": "createTimeLog",
    "bffName": "buildFlowFsm.createTimeLog.createTimeLog",
    "routeKey": "buildFlowFsm.createTimeLog.createTimeLog",
    "purpose": "Log hours worked on a task",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "workTaskId",
        "type": "string",
        "required": true,
        "description": "The work task the field worker is logging hours against.",
        "source": "selectedEntity",
        "presentation": "selection"
      },
      {
        "name": "logDate",
        "type": "date",
        "required": true,
        "description": "The calendar date on which the work was performed.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "hours",
        "type": "number",
        "required": true,
        "description": "Number of hours worked on the task for this log entry.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "timeLogId",
        "type": "string",
        "description": "Unique identifier for this time log entry."
      },
      {
        "name": "workTaskId",
        "type": "string",
        "description": "Reference to the work task this time log is linked to."
      },
      {
        "name": "workerId",
        "type": "string",
        "description": "Identifier of the field worker who recorded the hours worked."
      },
      {
        "name": "logDate",
        "type": "date",
        "description": "The calendar date on which the work was performed."
      },
      {
        "name": "hours",
        "type": "number",
        "description": "Number of hours worked on the task for this log entry."
      },
      {
        "name": "workerRate",
        "type": "number",
        "description": "Hourly cost rate of the worker captured at the time of logging, used for actual labor cost calculation."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "posted",
          "voided"
        ],
        "description": "Lifecycle state of the time log entry."
      },
      {
        "name": "createdAt",
        "type": "date",
        "description": "Timestamp when the time log entry was created."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:createTimeLog",
      "operationId": "createTimeLog",
      "defPath": "_102048_/l4/operations/createTimeLog.defs.ts",
      "bffName": "buildFlowFsm.createTimeLog.createTimeLog"
    }
  },
  {
    "commandName": "createMaterialUsage",
    "bffName": "buildFlowFsm.createMaterialUsage.createMaterialUsage",
    "routeKey": "buildFlowFsm.createMaterialUsage.createMaterialUsage",
    "purpose": "Record materials used on-site",
    "kind": "command",
    "outputShape": "object",
    "input": [
      {
        "name": "projectId",
        "type": "string",
        "required": true,
        "description": "The project on which the material was consumed, provided via the route parameter.",
        "source": "routeParam",
        "presentation": "route"
      },
      {
        "name": "materialName",
        "type": "string",
        "required": true,
        "description": "Name of the material consumed on site.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "quantity",
        "type": "number",
        "required": true,
        "description": "Quantity of material consumed.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "unit",
        "type": "string",
        "required": true,
        "enum": [
          "kg",
          "liter",
          "meter",
          "portion",
          "unit",
          "bag",
          "box",
          "roll",
          "sheet"
        ],
        "description": "Unit of measure for the material quantity (kg, liter, meter, portion, unit, bag, box, roll, or sheet).",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "unitCost",
        "type": "number",
        "required": true,
        "description": "Cost per unit of the material in USD.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "totalCost",
        "type": "number",
        "required": true,
        "description": "Total cost computed by the frontend as quantity multiplied by unitCost, submitted for server-side validation.",
        "source": "userInput",
        "presentation": "form"
      },
      {
        "name": "usageDate",
        "type": "date",
        "required": true,
        "description": "Date the material was consumed on the project site.",
        "source": "userInput",
        "presentation": "form"
      }
    ],
    "output": [
      {
        "name": "materialUsageId",
        "type": "string",
        "description": "Primary identifier for the material usage record."
      },
      {
        "name": "materialName",
        "type": "string",
        "description": "Name of the material consumed on site."
      },
      {
        "name": "quantity",
        "type": "number",
        "description": "Quantity of material consumed."
      },
      {
        "name": "unit",
        "type": "string",
        "enum": [
          "kg",
          "liter",
          "meter",
          "portion",
          "unit",
          "bag",
          "box",
          "roll",
          "sheet"
        ],
        "description": "Unit of measure for the material quantity."
      },
      {
        "name": "unitCost",
        "type": "number",
        "description": "Cost per unit of the material in USD."
      },
      {
        "name": "totalCost",
        "type": "number",
        "description": "Total cost of this material usage entry (quantity × unitCost) in USD."
      },
      {
        "name": "status",
        "type": "string",
        "enum": [
          "posted",
          "voided"
        ],
        "description": "Lifecycle status of the material usage record."
      },
      {
        "name": "usageDate",
        "type": "date",
        "description": "Date the material was consumed on the project site."
      }
    ],
    "origin": {
      "source": "l4/operations",
      "ownerId": "operation:createMaterialUsage",
      "operationId": "createMaterialUsage",
      "defPath": "_102048_/l4/operations/createMaterialUsage.defs.ts",
      "bffName": "buildFlowFsm.createMaterialUsage.createMaterialUsage"
    }
  }
];

export const pipeline = [
  {
    "id": "fieldWorkerWorkspace__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.ts",
    "defPath": "_102048_/l2/buildFlowFsm/web/contracts/fieldWorkerWorkspace.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeContractTs.ts"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
