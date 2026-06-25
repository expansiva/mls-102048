/// <mls fileReference="_102048_/l5/cafeFlow/process.defs.ts" enhancement="_blank"/>

export const cafeFlowProcess = {
  "schemaVersion": "2026-06-08",
  "moduleName": "cafeFlow",
  "runs": [
    {
      "runId": "newSolution",
      "kind": "newSolution",
      "startedAt": "2026-06-25T13:17:25.089Z",
      "initialPrompt": "Gere um app profissional chamado CafeFlow para cafeterias e lanchonetes pequenas.\nEntidades principais: Item do Cardápio (categoria, preço, ingredientes em estoque), Pedido (mesa ou takeout, itens, status), Turno Diário, Item de Estoque.\nTelas chave: Dashboard (vendas de hoje, itens mais vendidos, estoque baixo), Interface rápida de POS (lançamento de pedido + status cozinha), Gerenciamento de cardápio e estoque, Relatório de fechamento de turno.\nFuncionalidade LLM: Assistente IA que gera \"resumo de vendas do dia\" ou sugere \"quais itens promover com base nos últimos 7 dias\".\nFoco: Atendimento rápido de pedidos, coordenação de cozinha e controle simples de estoque para food service.\nlinguagem: en, pt-br",
      "userLanguage": "pt-BR",
      "decisions": [
        {
          "decisionId": "saleEventIsOrderClose",
          "title": "Evento de venda é o fechamento do pedido",
          "decision": "No MVP, a baixa automática de estoque e atualização de métricas ocorrem no fechamento do pedido (closeOrder), não no envio para cozinha nem na entrega.",
          "reason": "O blueprint já modelou o UC closeOrderAndDeductInventoryCommand e a ação closeOrderAsSale para executar fechamento e baixa no mesmo comando, indicando que o fechamento é o evento de venda definido.",
          "affectedArtifacts": [
            "closeOrderAndDeductInventoryCommand",
            "inventoryDeductionHappensOnSaleEvent",
            "metricsDerivedFromClosedOrders",
            "shiftSummaryMetricTable"
          ]
        },
        {
          "decisionId": "mvpSingleStore",
          "title": "MVP para loja única",
          "decision": "O MVP assume uma única loja por conta; não há entidade Store/Location.",
          "reason": "O blueprint não inclui entidade Store/Location e as métricas/turnos/estoque assumem contexto único; a pergunta sobre multi-loja permaneceu em aberto e será adiada.",
          "affectedArtifacts": [
            "DailyShift",
            "Order",
            "InventoryItem",
            "InventoryTransaction"
          ]
        },
        {
          "decisionId": "mvpNoPaymentMethodBreakdown",
          "title": "Fechamento de turno sem contagem por meio de pagamento no MVP",
          "decision": "O relatório de fechamento de turno no MVP apresenta resumo por itens/categorias, sem contagem de caixa por meio de pagamento (dinheiro/cartão/pix).",
          "reason": "O blueprint não contém entidades de pagamento (Payment/PaymentMethod/CashCount) e a pergunta sobre fechamento de caixa por meio de pagamento permaneceu em aberto.",
          "affectedArtifacts": [
            "shiftCloseReportPage",
            "shiftSummaryMetricTable",
            "closeShiftCommand"
          ]
        },
        {
          "decisionId": "orderStatusTransitionsMvp",
          "title": "Status e transições do Pedido no MVP",
          "decision": "Status do MVP: draft → sentToKitchen → inPreparation → ready → delivered → closed; cancelled permitido a partir de draft, sentToKitchen, inPreparation e ready. delivered precede closed.",
          "reason": "O blueprint propôs o default de status e transições na pergunta em aberto e já definiu statusEnum/lifecycleStates correspondentes na entidade Order.",
          "affectedArtifacts": [
            "Order",
            "orderStatusTransitionsControlled",
            "kitchenStatusWorkflow",
            "trackOrderLifecycle"
          ]
        }
      ],
      "deferredItems": [
        {
          "id": "multiStoreSupport",
          "title": "Suporte a múltiplas lojas/unidades",
          "description": "Adicionar entidade Store/Location e relacionar pedidos, estoque, turnos e métricas à loja. Adiado para pós-MVP."
        },
        {
          "id": "paymentMethodBreakdown",
          "title": "Fechamento de caixa por meio de pagamento",
          "description": "Registrar pagamentos por dinheiro/cartão/pix e contagem de caixa no fechamento de turno. Adiado para pós-MVP."
        },
        {
          "id": "deliveryOrderType",
          "title": "Pedidos tipo delivery",
          "description": "Suporte a pedidos delivery além de mesa/takeout. Adiado para pós-MVP conforme regra orderTypeMustBeTableOrTakeout."
        }
      ],
      "openDetails": [
        {
          "title": "Integração LLM",
          "description": "Qual provedor ou modelo de IA usar para o assistente que gera resumos e sugestões?"
        },
        {
          "title": "Suporte a idiomas",
          "description": "Como estruturar o app para suportar en e pt-br conforme indicado?"
        },
        {
          "title": "Modo de operação",
          "description": "O fluxo deve priorizar execução client-side para POS offline?"
        },
        {
          "title": "faltou: aiPromoSuggestions",
          "description": "Qual é a entidade/registro que representa o “plano interno” de promoção e quais campos devem ser gravados ao marcar itens como “promover hoje” (ex.: promoPlanId, data, lista de menuItemIds, observações)? | Existe um usecase já definido para criar/atualizar esse plano (ex.: createPromoPlan/markItemsForPromotion) e quais tabelas moduleOwned ele grava? | As sugestões da IA vêm estruturadas com IDs de MenuItem (para seleção direta) ou apenas texto? Precisamos de um usecase adicional para mapear nomes para menuItemId?"
        }
      ],
      "healthReport": {
        "summary": {
          "passed": false,
          "errorCount": 87,
          "warningCount": 0
        },
        "issues": [
          {
            "severity": "error",
            "code": "page.def.incomplete",
            "message": "page aiPromoSuggestions definition is incomplete; pending questions: Qual é a entidade/registro que representa o “plano interno” de promoção e quais campos devem ser gravados ao marcar itens como “promover hoje” (ex.: promoPlanId, data, lista de menuItemIds, observações)? | Existe um usecase já definido para criar/atualizar esse plano (ex.: createPromoPlan/markItemsForPromotion) e quais tabelas moduleOwned ele grava? | As sugestões da IA vêm estruturadas com IDs de MenuItem (para seleção direta) ou apenas texto? Precisamos de um usecase adicional para mapear nomes para menuItemId?",
            "path": "pageDefinition.aiPromoSuggestions",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "page.readCommand.missing",
            "message": "page shiftOpen declares only write bffCommands (no kind:\"query\") and no metricRefs — it has no data source to display",
            "path": "pageDefinition.shiftOpen",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism inventoryDeductionBlock.InventoryDeductionBlockedNotice references unknown entity OrderAggregate",
            "path": "pageDefinition.inventoryDeductionBlock.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism inventoryDeductionBlock.OrderItemsSummary references unknown entity OrderAggregate",
            "path": "pageDefinition.inventoryDeductionBlock.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism inventoryDeductionBlock.InsufficientIngredientsList references unknown entity InventoryAggregate",
            "path": "pageDefinition.inventoryDeductionBlock.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism inventoryNegativeGuard.negativeStockExplanation references unknown entity InventoryAggregate",
            "path": "pageDefinition.inventoryNegativeGuard.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism inventoryNegativeGuard.inventorySnapshotSummary references unknown entity InventoryAggregate",
            "path": "pageDefinition.inventoryNegativeGuard.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand managerMetricsDashboard.getTodayDashboardMetrics references unknown entity OrderAggregate",
            "path": "pageDefinition.managerMetricsDashboard.bffCommands.getTodayDashboardMetrics.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand managerMetricsDashboard.getTodayDashboardMetrics references unknown entity InventoryAggregate",
            "path": "pageDefinition.managerMetricsDashboard.bffCommands.getTodayDashboardMetrics.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand managerMetricsDashboard.getTodayDashboardMetrics references unknown entity ShiftAggregate",
            "path": "pageDefinition.managerMetricsDashboard.bffCommands.getTodayDashboardMetrics.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism managerMetricsDashboard.tabelasDeMetricasDoDia references unknown entity OrderAggregate",
            "path": "pageDefinition.managerMetricsDashboard.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism managerMetricsDashboard.tabelasDeMetricasDoDia references unknown entity InventoryAggregate",
            "path": "pageDefinition.managerMetricsDashboard.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "organism managerMetricsDashboard.tabelasDeMetricasDoDia references unknown entity ShiftAggregate",
            "path": "pageDefinition.managerMetricsDashboard.requiredEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand menuItemEditor.getMenuItemWithRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.menuItemEditor.bffCommands.getMenuItemWithRecipe.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand menuItemEditor.upsertMenuItemAndRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.menuItemEditor.bffCommands.upsertMenuItemAndRecipe.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand menuItemEditor.upsertMenuItemAndRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.menuItemEditor.bffCommands.upsertMenuItemAndRecipe.writesEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand menuManagement.listMenuItems references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.menuManagement.bffCommands.listMenuItems.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand menuManagement.deactivateMenuItem references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.menuManagement.bffCommands.deactivateMenuItem.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand menuManagement.deactivateMenuItem references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.menuManagement.bffCommands.deactivateMenuItem.writesEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand menuValidation.listMenuItems references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.menuValidation.bffCommands.listMenuItems.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand posMenuPicker.listMenuItems references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.posMenuPicker.bffCommands.listMenuItems.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand recipeEditor.listInventoryItems references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.recipeEditor.bffCommands.listInventoryItems.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand recipeEditor.getMenuItemWithRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.recipeEditor.bffCommands.getMenuItemWithRecipe.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand recipeEditor.upsertMenuItemAndRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.recipeEditor.bffCommands.upsertMenuItemAndRecipe.readsEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "bffCommand recipeEditor.upsertMenuItemAndRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "pageDefinition.recipeEditor.bffCommands.upsertMenuItemAndRecipe.writesEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase createOrderDraft references unknown entity OrderAggregate",
            "path": "usecase.createOrderDraft.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase createOrderDraft references unknown entity OrderAggregate",
            "path": "usecase.createOrderDraft.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase addOrUpdateOrderItems references unknown entity OrderAggregate",
            "path": "usecase.addOrUpdateOrderItems.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase addOrUpdateOrderItems references unknown entity OrderAggregate",
            "path": "usecase.addOrUpdateOrderItems.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase sendOrderToKitchen references unknown entity OrderAggregate",
            "path": "usecase.sendOrderToKitchen.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase sendOrderToKitchen references unknown entity OrderAggregate",
            "path": "usecase.sendOrderToKitchen.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase updateKitchenOrderStatus references unknown entity OrderAggregate",
            "path": "usecase.updateKitchenOrderStatus.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase updateKitchenOrderStatus references unknown entity OrderAggregate",
            "path": "usecase.updateKitchenOrderStatus.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase markOrderDelivered references unknown entity OrderAggregate",
            "path": "usecase.markOrderDelivered.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase markOrderDelivered references unknown entity OrderAggregate",
            "path": "usecase.markOrderDelivered.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase closeOrderAsSaleAndDeductInventory references unknown entity OrderAggregate",
            "path": "usecase.closeOrderAsSaleAndDeductInventory.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase closeOrderAsSaleAndDeductInventory references unknown entity InventoryAggregate",
            "path": "usecase.closeOrderAsSaleAndDeductInventory.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase closeOrderAsSaleAndDeductInventory references unknown entity OrderAggregate",
            "path": "usecase.closeOrderAsSaleAndDeductInventory.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase closeOrderAsSaleAndDeductInventory references unknown entity InventoryAggregate",
            "path": "usecase.closeOrderAsSaleAndDeductInventory.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase cancelOrder references unknown entity OrderAggregate",
            "path": "usecase.cancelOrder.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase cancelOrder references unknown entity OrderAggregate",
            "path": "usecase.cancelOrder.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getOrderById references unknown entity OrderAggregate",
            "path": "usecase.getOrderById.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getOrderById references unknown entity OrderAggregate",
            "path": "usecase.getOrderById.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listOrdersByStatus references unknown entity OrderAggregate",
            "path": "usecase.listOrdersByStatus.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listOrdersByStatus references unknown entity OrderAggregate",
            "path": "usecase.listOrdersByStatus.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listKitchenQueue references unknown entity OrderAggregate",
            "path": "usecase.listKitchenQueue.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listKitchenQueue references unknown entity OrderAggregate",
            "path": "usecase.listKitchenQueue.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listDiningTables references unknown entity OrderAggregate",
            "path": "usecase.listDiningTables.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listDiningTables references unknown entity OrderAggregate",
            "path": "usecase.listDiningTables.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase openDailyShift references unknown entity ShiftAggregate",
            "path": "usecase.openDailyShift.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase openDailyShift references unknown entity ShiftAggregate",
            "path": "usecase.openDailyShift.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase closeDailyShiftAndGenerateReport references unknown entity ShiftAggregate",
            "path": "usecase.closeDailyShiftAndGenerateReport.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase closeDailyShiftAndGenerateReport references unknown entity ShiftAggregate",
            "path": "usecase.closeDailyShiftAndGenerateReport.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getShiftCloseReport references unknown entity ShiftAggregate",
            "path": "usecase.getShiftCloseReport.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getShiftCloseReport references unknown entity ShiftAggregate",
            "path": "usecase.getShiftCloseReport.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getTodayDashboardMetrics references unknown entity OrderAggregate",
            "path": "usecase.getTodayDashboardMetrics.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getTodayDashboardMetrics references unknown entity InventoryAggregate",
            "path": "usecase.getTodayDashboardMetrics.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getTodayDashboardMetrics references unknown entity ShiftAggregate",
            "path": "usecase.getTodayDashboardMetrics.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getTodayDashboardMetrics references unknown entity OrderAggregate",
            "path": "usecase.getTodayDashboardMetrics.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getTodayDashboardMetrics references unknown entity InventoryAggregate",
            "path": "usecase.getTodayDashboardMetrics.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getTodayDashboardMetrics references unknown entity ShiftAggregate",
            "path": "usecase.getTodayDashboardMetrics.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase upsertMenuItemAndRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.upsertMenuItemAndRecipe.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase upsertMenuItemAndRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.upsertMenuItemAndRecipe.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listMenuItems references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.listMenuItems.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listMenuItems references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.listMenuItems.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getMenuItemWithRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.getMenuItemWithRecipe.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getMenuItemWithRecipe references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.getMenuItemWithRecipe.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase upsertInventoryItem references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.upsertInventoryItem.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase upsertInventoryItem references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.upsertInventoryItem.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listInventoryItems references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.listInventoryItems.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listInventoryItems references unknown entity MenuAndRecipeCatalog",
            "path": "usecase.listInventoryItems.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase postInventoryAdjustment references unknown entity InventoryAggregate",
            "path": "usecase.postInventoryAdjustment.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase postInventoryAdjustment references unknown entity InventoryAggregate",
            "path": "usecase.postInventoryAdjustment.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listInventoryTransactions references unknown entity InventoryAggregate",
            "path": "usecase.listInventoryTransactions.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listInventoryTransactions references unknown entity InventoryAggregate",
            "path": "usecase.listInventoryTransactions.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listInventoryBalances references unknown entity InventoryAggregate",
            "path": "usecase.listInventoryBalances.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listInventoryBalances references unknown entity InventoryAggregate",
            "path": "usecase.listInventoryBalances.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getInventorySnapshotByItem references unknown entity InventoryAggregate",
            "path": "usecase.getInventorySnapshotByItem.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getInventorySnapshotByItem references unknown entity InventoryAggregate",
            "path": "usecase.getInventorySnapshotByItem.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase requestAiSalesSummary references unknown entity AiInsightsAggregate",
            "path": "usecase.requestAiSalesSummary.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase requestAiSalesSummary references unknown entity AiInsightsAggregate",
            "path": "usecase.requestAiSalesSummary.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase requestAiPromoSuggestions references unknown entity AiInsightsAggregate",
            "path": "usecase.requestAiPromoSuggestions.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase requestAiPromoSuggestions references unknown entity AiInsightsAggregate",
            "path": "usecase.requestAiPromoSuggestions.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getAiInsightRun references unknown entity AiInsightsAggregate",
            "path": "usecase.getAiInsightRun.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase getAiInsightRun references unknown entity AiInsightsAggregate",
            "path": "usecase.getAiInsightRun.outputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listAiInsightRuns references unknown entity AiInsightsAggregate",
            "path": "usecase.listAiInsightRuns.inputEntities",
            "evidence": []
          },
          {
            "severity": "error",
            "code": "entity.ref.unknown",
            "message": "usecase listAiInsightRuns references unknown entity AiInsightsAggregate",
            "path": "usecase.listAiInsightRuns.outputEntities",
            "evidence": []
          }
        ],
        "checklistResults": null,
        "readyToSaveDefs": false,
        "deterministicOnly": true,
        "refreshedAt": "2026-06-25T13:17:26.002Z",
        "refreshedBy": "agentNewSolutionFinal (T-016 deterministic re-validation)"
      },
      "nextSteps": [
        {
          "id": "recoverIncomplete:page:aiPromoSuggestions",
          "kind": "recoverIncomplete",
          "title": "aiPromoSuggestions",
          "description": "Qual é a entidade/registro que representa o “plano interno” de promoção e quais campos devem ser gravados ao marcar itens como “promover hoje” (ex.: promoPlanId, data, lista de menuItemIds, observações)? | Existe um usecase já definido para criar/atualizar esse plano (ex.: createPromoPlan/markItemsForPromotion) e quais tabelas moduleOwned ele grava? | As sugestões da IA vêm estruturadas com IDs de MenuItem (para seleção direta) ou apenas texto? Precisamos de um usecase adicional para mapear nomes para menuItemId?",
          "status": "dismissed"
        }
      ],
      "finishedAt": "2026-06-25T13:18:30.482Z"
    }
  ]
} as const;

export default cafeFlowProcess;
