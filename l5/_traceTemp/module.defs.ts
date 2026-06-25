/// <mls fileReference="_102048_/l5/_traceTemp/module.defs.ts" enhancement="_blank"/>

export const modulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "module",
  "artifactId": "_traceTemp",
  "moduleName": "_traceTemp",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "module": {
      "moduleName": "cafeFlow",
      "title": "CafeFlow",
      "purpose": "Aplicativo profissional para cafeterias e lanchonetes pequenas operarem um POS rápido (mesa/takeout), coordenação de cozinha (KDS), controle simples de estoque por ingrediente com baixa automática, e fechamento de turno com métricas e relatórios; inclui assistente IA para insights de vendas.",
      "businessDomain": "Food service operations (small cafés & snack bars)",
      "languages": [
        "pt-BR",
        "en"
      ],
      "visualStyle": {
        "tone": "Interface limpa e profissional, alto contraste",
        "layout": "Tablet-first, touch-optimized, poucos cliques/toques, componentes grandes",
        "palette": [
          "#111827",
          "#F9FAFB",
          "#F59E0B",
          "#10B981",
          "#EF4444"
        ]
      }
    },
    "actors": [
      {
        "actorId": "attendantCashier",
        "title": "Atendente/Caixa",
        "description": "Registra pedidos rapidamente no POS (mesa/takeout), acompanha status, finaliza venda e coordena retirada/mesa."
      },
      {
        "actorId": "cook",
        "title": "Cozinheiro",
        "description": "Usa a tela da cozinha para ver a fila e atualizar o status de preparo dos pedidos."
      },
      {
        "actorId": "managerOwner",
        "title": "Gerente/Dono",
        "description": "Configura cardápio e receitas, controla estoque por ingrediente, abre/fecha turno e acompanha métricas/relatórios e insights de IA."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "takeOrderPos",
        "title": "Lançar pedido no POS",
        "description": "Criar pedido mesa/takeout, adicionar itens e observações, e enviar para a cozinha com mínimo de toques.",
        "actor": "attendantCashier",
        "priority": "now"
      },
      {
        "capabilityId": "updateOrderStatusKitchen",
        "title": "Atualizar status do pedido (cozinha)",
        "description": "Visualizar fila e mudar status controlado do pedido para sincronizar preparo e entrega/retirada.",
        "actor": "cook",
        "priority": "now"
      },
      {
        "capabilityId": "trackOrderLifecycle",
        "title": "Acompanhar status do pedido",
        "description": "Acompanhar pedidos ativos por mesa/takeout e seus estados; priorização básica.",
        "actor": "attendantCashier",
        "priority": "now"
      },
      {
        "capabilityId": "manageMenuItems",
        "title": "Gerenciar itens do cardápio",
        "description": "CRUD de itens, categorias, preço e vínculo com ingredientes (receita) para baixa automática.",
        "actor": "managerOwner",
        "priority": "now"
      },
      {
        "capabilityId": "manageInventoryItems",
        "title": "Gerenciar itens de estoque (ingredientes)",
        "description": "CRUD de ingredientes/insumos com unidade, saldo atual, limiar de estoque baixo e ajustes manuais.",
        "actor": "managerOwner",
        "priority": "now"
      },
      {
        "capabilityId": "autoInventoryDeduction",
        "title": "Baixa automática de estoque por ingrediente",
        "description": "Ao evento definido de venda/finalização, descontar automaticamente os insumos conforme receita do item vendido.",
        "actor": "managerOwner",
        "priority": "now"
      },
      {
        "capabilityId": "dailyShiftOpenClose",
        "title": "Abrir e fechar turno diário",
        "description": "Iniciar turno e executar fechamento com resumo de vendas do período e geração de relatório.",
        "actor": "managerOwner",
        "priority": "now"
      },
      {
        "capabilityId": "viewDashboardToday",
        "title": "Ver dashboard do dia",
        "description": "Vendas de hoje, itens mais vendidos e estoque baixo (métricas básicas).",
        "actor": "managerOwner",
        "priority": "now"
      },
      {
        "capabilityId": "viewShiftCloseReport",
        "title": "Relatório de fechamento de turno",
        "description": "Gerar/visualizar relatório do turno com totais e breakdown por item/categoria.",
        "actor": "managerOwner",
        "priority": "now"
      },
      {
        "capabilityId": "aiSalesSummary",
        "title": "Assistente IA: resumo de vendas do dia",
        "description": "Gerar resumo textual do desempenho do dia/turno com base nos dados registrados.",
        "actor": "managerOwner",
        "priority": "soon"
      },
      {
        "capabilityId": "aiPromoSuggestions",
        "title": "Assistente IA: sugestões de itens para promover (7 dias)",
        "description": "Sugerir itens para promoção com base em vendas dos últimos 7 dias e, opcionalmente, estoque atual.",
        "actor": "managerOwner",
        "priority": "soon"
      },
      {
        "capabilityId": "bilingualUi",
        "title": "Interface bilíngue",
        "description": "UI e saídas do assistente em Português (pt-BR) e Inglês (en), usando i18n da plataforma.",
        "actor": "managerOwner",
        "priority": "now"
      }
    ],
    "ontology": {
      "entities": {
        "MenuItem": {
          "title": "Item do Cardápio",
          "description": "Produto vendido no POS (ex.: cappuccino, pão de queijo), com categoria e preço; referenciado em pedidos e métricas. Receita/consumo é mantida separadamente para suportar baixa de estoque.",
          "ownership": "mdmOwned",
          "kind": "mdm"
        },
        "MenuCategory": {
          "title": "Categoria de Cardápio",
          "description": "Agrupamento estável para itens do cardápio (ex.: Cafés, Salgados, Doces) usado em navegação do POS e relatórios.",
          "ownership": "mdmOwned",
          "kind": "mdm"
        },
        "InventoryItem": {
          "title": "Item de Estoque (Ingrediente/Insumo)",
          "description": "Ingrediente/insumo controlado por unidade (ex.: café em grãos, leite), com saldo atual e limiar de estoque baixo.",
          "ownership": "mdmOwned",
          "kind": "mdm"
        },
        "Recipe": {
          "title": "Receita / Consumo por Item",
          "description": "Define o consumo padrão de ingredientes por venda de um item do cardápio; base para baixa automática.",
          "ownership": "mdmOwned",
          "kind": "mdm"
        },
        "RecipeIngredient": {
          "title": "Ingrediente da Receita",
          "description": "Linha de receita que relaciona um item do cardápio a um ingrediente/insumo e sua quantidade consumida por unidade vendida.",
          "ownership": "mdmOwned",
          "kind": "mdm"
        },
        "Order": {
          "title": "Pedido",
          "description": "Pedido para mesa ou takeout com itens, observações e status de preparo/atendimento; ligado a um turno e gera venda/métricas conforme regras.",
          "ownership": "moduleOwned",
          "kind": "core"
        },
        "OrderItem": {
          "title": "Item do Pedido",
          "description": "Linha do pedido com item do cardápio, quantidade, preço no momento da venda e observações; base para métricas e baixa de estoque.",
          "ownership": "moduleOwned",
          "kind": "core"
        },
        "DiningTable": {
          "title": "Mesa",
          "description": "Identificador operacional de mesa para pedidos no salão; simples e configurável para operação local.",
          "ownership": "moduleOwned",
          "kind": "supporting"
        },
        "DailyShift": {
          "title": "Turno Diário",
          "description": "Período operacional para consolidação de vendas, controle de abertura/fechamento e geração de relatório.",
          "ownership": "moduleOwned",
          "kind": "core"
        },
        "InventoryTransaction": {
          "title": "Movimentação de Estoque",
          "description": "Registro imutável de entradas/saídas/ajustes de ingredientes, incluindo baixa automática por venda e ajustes manuais com motivo.",
          "ownership": "moduleOwned",
          "kind": "event"
        },
        "InventoryBalanceSnapshot": {
          "title": "Snapshot de Saldo de Estoque",
          "description": "Snapshot periódico/opcional do saldo por ingrediente (ex.: no fechamento de turno) para auditoria simples e relatórios.",
          "ownership": "moduleOwned",
          "kind": "supporting"
        },
        "AiInsightRun": {
          "title": "Execução de Insight de IA",
          "description": "Registro de cada geração de resumo/sugestões (tipo, parâmetros, janela temporal, idioma, prompt/versão) e o resultado gerado para rastreabilidade.",
          "ownership": "moduleOwned",
          "kind": "event"
        }
      }
    },
    "relationships": [
      {
        "relationshipId": "menuItemBelongsToCategory",
        "fromEntity": "MenuItem",
        "toEntity": "MenuCategory",
        "type": "manyToOne",
        "description": "Cada Item do Cardápio pertence a uma Categoria."
      },
      {
        "relationshipId": "recipeForMenuItem",
        "fromEntity": "Recipe",
        "toEntity": "MenuItem",
        "type": "oneToOne",
        "description": "Cada item do cardápio tem uma receita ativa (ou nenhuma, se não consumir estoque)."
      },
      {
        "relationshipId": "recipeHasIngredients",
        "fromEntity": "RecipeIngredient",
        "toEntity": "Recipe",
        "type": "manyToOne",
        "description": "A receita é composta por várias linhas de ingredientes."
      },
      {
        "relationshipId": "recipeIngredientReferencesInventoryItem",
        "fromEntity": "RecipeIngredient",
        "toEntity": "InventoryItem",
        "type": "manyToOne",
        "description": "Cada linha referencia um ingrediente/insumo do estoque."
      },
      {
        "relationshipId": "orderHasItems",
        "fromEntity": "OrderItem",
        "toEntity": "Order",
        "type": "manyToOne",
        "description": "Um pedido possui várias linhas de itens."
      },
      {
        "relationshipId": "orderItemReferencesMenuItem",
        "fromEntity": "OrderItem",
        "toEntity": "MenuItem",
        "type": "manyToOne",
        "description": "Cada item do pedido referencia um item do cardápio."
      },
      {
        "relationshipId": "orderOptionallyReferencesDiningTable",
        "fromEntity": "Order",
        "toEntity": "DiningTable",
        "type": "manyToOne",
        "description": "Pedidos do tipo mesa referenciam uma Mesa; takeout não referencia."
      },
      {
        "relationshipId": "orderBelongsToShift",
        "fromEntity": "Order",
        "toEntity": "DailyShift",
        "type": "manyToOne",
        "description": "Pedidos são associados ao turno aberto para recorte de relatórios."
      },
      {
        "relationshipId": "inventoryTxReferencesInventoryItem",
        "fromEntity": "InventoryTransaction",
        "toEntity": "InventoryItem",
        "type": "manyToOne",
        "description": "Movimentações são por ingrediente/insumo."
      },
      {
        "relationshipId": "inventoryTxOptionallyReferencesOrder",
        "fromEntity": "InventoryTransaction",
        "toEntity": "Order",
        "type": "manyToOne",
        "description": "Baixas automáticas por venda podem referenciar o pedido origem; ajustes manuais não."
      },
      {
        "relationshipId": "snapshotByInventoryItem",
        "fromEntity": "InventoryBalanceSnapshot",
        "toEntity": "InventoryItem",
        "type": "manyToOne",
        "description": "Snapshots registram saldo por item de estoque."
      },
      {
        "relationshipId": "snapshotByShift",
        "fromEntity": "InventoryBalanceSnapshot",
        "toEntity": "DailyShift",
        "type": "manyToOne",
        "description": "Snapshot opcional no fechamento de turno."
      },
      {
        "relationshipId": "aiInsightRunReferencesShift",
        "fromEntity": "AiInsightRun",
        "toEntity": "DailyShift",
        "type": "manyToOne",
        "description": "Resumo do dia/turno referencia o turno (quando aplicável)."
      }
    ]
  }
} as const;

export default modulePlan;
