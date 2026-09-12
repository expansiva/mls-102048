/// <mls fileReference="_102048_/l4/operations/createMaterialUsage.defs.ts" enhancement="_blank"/>

export const operationCreateMaterialUsage = {
  "operationId": "createMaterialUsage",
  "title": "Record materials used on-site",
  "actor": "fieldWorker",
  "entity": "MaterialUsage",
  "kind": "create",
  "reads": [
    "Project"
  ],
  "writes": [
    "MaterialUsage"
  ],
  "rulesApplied": [
    "materialUsageRequiresProject"
  ],
  "story": {
    "actor": "fieldWorker",
    "goal": "Record materials consumed on-site with their costs so that material costs are tracked against the project budget.",
    "steps": [
      "Open the material usage form for the current project",
      "Enter the material name, quantity, unit of measure, and unit cost",
      "Review the total cost calculated as quantity multiplied by unit cost",
      "Set the usage date and submit the material usage record"
    ],
    "outcome": "A new material usage record is created with status 'posted', linked to the project, and available for job costing and budget variance analysis."
  },
  "accessPattern": {
    "kind": "commandInput",
    "entity": "MaterialUsage",
    "keyField": "MaterialUsage.materialUsageId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "MaterialUsage.materialUsageId",
      "MaterialUsage.materialName",
      "MaterialUsage.quantity",
      "MaterialUsage.unit",
      "MaterialUsage.unitCost",
      "MaterialUsage.totalCost",
      "MaterialUsage.status",
      "MaterialUsage.usageDate"
    ]
  },
  "inputs": [
    {
      "inputId": "projectId",
      "fieldRef": "MaterialUsage.projectId",
      "required": true,
      "source": "routeParam",
      "description": "The project on which the material was consumed, provided via the route parameter."
    },
    {
      "inputId": "materialName",
      "fieldRef": "MaterialUsage.materialName",
      "required": true,
      "source": "userInput",
      "description": "Name of the material consumed on site."
    },
    {
      "inputId": "quantity",
      "fieldRef": "MaterialUsage.quantity",
      "required": true,
      "source": "userInput",
      "description": "Quantity of material consumed."
    },
    {
      "inputId": "unit",
      "fieldRef": "MaterialUsage.unit",
      "required": true,
      "source": "userInput",
      "description": "Unit of measure for the material quantity (kg, liter, meter, portion, unit, bag, box, roll, or sheet)."
    },
    {
      "inputId": "unitCost",
      "fieldRef": "MaterialUsage.unitCost",
      "required": true,
      "source": "userInput",
      "description": "Cost per unit of the material in USD."
    },
    {
      "inputId": "totalCost",
      "fieldRef": "MaterialUsage.totalCost",
      "required": true,
      "source": "userInput",
      "description": "Total cost computed by the frontend as quantity multiplied by unitCost, submitted for server-side validation."
    },
    {
      "inputId": "usageDate",
      "fieldRef": "MaterialUsage.usageDate",
      "required": true,
      "source": "userInput",
      "description": "Date the material was consumed on the project site."
    },
    {
      "inputId": "materialUsageId",
      "fieldRef": "MaterialUsage.materialUsageId",
      "required": true,
      "source": "systemDefault",
      "description": "System-generated unique identifier for the new material usage record."
    },
    {
      "inputId": "status",
      "fieldRef": "MaterialUsage.status",
      "required": true,
      "source": "systemDefault",
      "description": "Lifecycle status of the material usage record, defaulted to 'posted' on creation."
    },
    {
      "inputId": "createdAt",
      "fieldRef": "MaterialUsage.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp when the material usage record was created."
    }
  ],
  "contextResolution": [
    {
      "targetRef": "MaterialUsage.projectId",
      "source": "routeParam",
      "originRef": "routeParam.projectId",
      "description": "The projectId is extracted from the route parameter identifying the currently viewed project."
    },
    {
      "targetRef": "MaterialUsage.materialUsageId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "A new UUID is generated server-side as the primary identifier for the material usage record."
    },
    {
      "targetRef": "MaterialUsage.status",
      "source": "workflowState",
      "originRef": "MaterialUsage.status",
      "description": "New material usage records are initialized with status 'posted' as the default workflow state upon creation."
    },
    {
      "targetRef": "MaterialUsage.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "The current server timestamp is captured at the moment of record creation."
    }
  ],
  "acceptanceAssertions": [
    "After submission, a new MaterialUsage record exists with status 'posted'.",
    "The created MaterialUsage record is linked to the projectId provided via the route parameter.",
    "The totalCost of the created record equals quantity multiplied by unitCost.",
    "The created record includes materialName, quantity, unit, unitCost, and usageDate as provided by the field worker.",
    "The material usage record cannot be saved without a valid project linkage, enforcing the materialUsageRequiresProject rule."
  ],
  "pageId": "createMaterialUsage",
  "commandName": "createMaterialUsage",
  "bffName": "buildFlowFsm.createMaterialUsage.createMaterialUsage",
  "capability": {
    "capabilityId": "createMaterialUsage",
    "title": "Record materials used on-site",
    "actor": "fieldWorker",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateMaterialUsage;
