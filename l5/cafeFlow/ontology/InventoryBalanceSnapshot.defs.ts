/// <mls fileReference="_102048_/l5/cafeFlow/ontology/InventoryBalanceSnapshot.defs.ts" enhancement="_blank"/>

export const InventoryBalanceSnapshotEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "InventoryBalanceSnapshot",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "InventoryBalanceSnapshot",
      "title": "Snapshot de Saldo de Estoque",
      "description": "Snapshot periódico/opcional do saldo por ingrediente (ex.: no fechamento de turno) para auditoria simples e relatórios.",
      "ownership": "moduleOwned",
      "kind": "supporting",
      "fields": [
        {
          "fieldId": "id",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do snapshot de saldo."
        },
        {
          "fieldId": "inventoryItemId",
          "type": "uuid",
          "required": true,
          "description": "Referência ao item de estoque cujo saldo foi registrado."
        },
        {
          "fieldId": "dailyShiftId",
          "type": "uuid",
          "required": false,
          "description": "Referência opcional ao turno em que o snapshot foi capturado (ex.: fechamento de turno)."
        },
        {
          "fieldId": "quantityOnHand",
          "type": "number",
          "required": true,
          "description": "Quantidade em estoque no momento do snapshot."
        },
        {
          "fieldId": "unitCost",
          "type": "money",
          "required": false,
          "description": "Custo unitário opcional no momento do snapshot para valorização."
        },
        {
          "fieldId": "recordedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora em que o snapshot foi registrado."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "rulesApplied": []
    }
  }
} as const;

export default InventoryBalanceSnapshotEntityDefinition;
