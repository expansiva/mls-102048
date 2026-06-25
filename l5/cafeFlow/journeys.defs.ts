/// <mls fileReference="_102048_/l5/cafeFlow/journeys.defs.ts" enhancement="_blank"/>

export const userJourneysPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "userJourneys",
  "artifactId": "journeys",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUserJourneys",
    "stepId": 12,
    "planId": "plan-user-journeys"
  },
  "data": {
    "journeys": [
      {
        "journeyId": "openShiftStartDay",
        "title": "Abrir turno e preparar o dia",
        "actor": "managerOwner",
        "capabilityIds": [
          "dailyShiftOpenClose",
          "viewDashboardToday"
        ],
        "description": "O gerente abre o turno do dia para liberar o POS e começa acompanhando os indicadores de hoje.",
        "steps": [
          {
            "intent": "Confirmar que o caixa está pronto para operar",
            "action": "Acessa o app e entra na área do gerente para ver o status do turno",
            "entities": [
              "DailyShift"
            ],
            "pageHint": "dashboardToday",
            "outcome": "O status atual do turno (aberto/fechado) fica visível com alertas de pendências"
          },
          {
            "intent": "Abrir o turno do dia com valor inicial de caixa",
            "action": "Toca em \"Abrir turno\", informa o valor inicial (e observações, se houver) e confirma",
            "entities": [
              "DailyShift"
            ],
            "pageHint": "shiftOpen",
            "outcome": "DailyShift é criado/atualizado para status open; o POS fica habilitado para lançar pedidos"
          },
          {
            "intent": "Ver o resumo do dia em tempo real",
            "action": "Volta para o Dashboard (Hoje) e confere vendas, itens mais vendidos e alertas de estoque baixo",
            "entities": [
              "DailyShift",
              "Order",
              "InventoryItem"
            ],
            "pageHint": "dashboardToday",
            "outcome": "O gerente tem visão do dia e identifica prioridades (ex.: estoque baixo)"
          }
        ]
      },
      {
        "journeyId": "posCreateOrderSendToKitchen",
        "title": "Lançar pedido no POS (mesa/takeout) e enviar para a cozinha",
        "actor": "attendantCashier",
        "capabilityIds": [
          "takeOrderPos"
        ],
        "description": "O atendente cria um pedido rápido, adiciona itens, revisa e envia para a cozinha.",
        "steps": [
          {
            "intent": "Começar um novo pedido no fluxo mais rápido possível",
            "action": "Abre o POS rápido e toca em \"Novo pedido\"",
            "entities": [
              "DailyShift",
              "Order"
            ],
            "pageHint": "posFast",
            "outcome": "Um Order em estado draft é iniciado (se turno estiver aberto)"
          },
          {
            "intent": "Escolher o tipo do pedido (mesa ou takeout)",
            "action": "Seleciona \"Mesa\" e escolhe uma mesa ativa, ou seleciona \"Takeout\" e informa o nome/senha do cliente (se aplicável)",
            "entities": [
              "Order",
              "DiningTable"
            ],
            "pageHint": "posOrderType",
            "outcome": "Order fica associado ao tipo e, se mesa, à DiningTable"
          },
          {
            "intent": "Adicionar itens do cardápio com variações/observações",
            "action": "Navega por categorias, toca nos itens para adicionar, ajusta quantidade e inclui observações (ex.: sem açúcar)",
            "entities": [
              "MenuCategory",
              "MenuItem",
              "Order",
              "OrderItem"
            ],
            "pageHint": "posMenuPicker",
            "outcome": "OrderItem(s) são adicionados ao Order com preço copiado do MenuItem (snapshot)"
          },
          {
            "intent": "Revisar o pedido antes de enviar",
            "action": "Abre o resumo do pedido, confere itens/quantidades e total; remove ou ajusta itens se necessário",
            "entities": [
              "Order",
              "OrderItem"
            ],
            "pageHint": "posOrderSummary",
            "outcome": "Order draft fica consistente para envio"
          },
          {
            "intent": "Enviar o pedido para a cozinha",
            "action": "Toca em \"Enviar para cozinha\" e confirma",
            "entities": [
              "Order",
              "OrderItem"
            ],
            "pageHint": "posSendToKitchenConfirm",
            "outcome": "Order muda para sentToKitchen e fica visível na tela da cozinha (KDS)"
          },
          {
            "intent": "Lidar com impedimento: turno fechado",
            "action": "Se aparecer bloqueio de turno fechado, toca em \"Chamar gerente\"/\"Voltar\" e aguarda abertura do turno",
            "entities": [
              "DailyShift",
              "Order"
            ],
            "pageHint": "shiftRequiredBlock",
            "outcome": "Pedido não é criado/enviado; operação fica em espera até DailyShift open"
          }
        ]
      },
      {
        "journeyId": "kdsPrepareAndUpdateStatus",
        "title": "Preparar pedidos na cozinha e atualizar status (KDS)",
        "actor": "cook",
        "capabilityIds": [
          "updateOrderStatusKitchen"
        ],
        "description": "O cozinheiro gerencia a fila de pedidos, inicia preparo, marca como pronto e sinaliza problemas.",
        "steps": [
          {
            "intent": "Ver a fila de pedidos que chegaram na cozinha",
            "action": "Abre a Tela da cozinha (KDS) e visualiza os pedidos por colunas de status",
            "entities": [
              "Order",
              "OrderItem"
            ],
            "pageHint": "kdsBoard",
            "outcome": "Pedidos sentToKitchen aparecem na fila com detalhes essenciais"
          },
          {
            "intent": "Começar a preparar um pedido",
            "action": "Toca no cartão do pedido e marca como \"Em preparo\"",
            "entities": [
              "Order"
            ],
            "pageHint": "kdsOrderDetail",
            "outcome": "Order transiciona para inPreparation (transição controlada)"
          },
          {
            "intent": "Conferir detalhes e observações de itens",
            "action": "No detalhe do pedido, expande itens para ler observações e prioridades",
            "entities": [
              "Order",
              "OrderItem"
            ],
            "pageHint": "kdsOrderDetail",
            "outcome": "O cozinheiro reduz erros de preparo ao seguir observações"
          },
          {
            "intent": "Marcar pedido como pronto",
            "action": "Quando finalizar, toca em \"Pronto\"",
            "entities": [
              "Order"
            ],
            "pageHint": "kdsOrderDetail",
            "outcome": "Order transiciona para ready e fica sinalizado para retirada/entrega no balcão"
          },
          {
            "intent": "Lidar com exceção: item indisponível",
            "action": "Se um item faltar, sinaliza \"Problema/Indisponível\" no pedido (e descreve) para o atendente decidir substituição/cancelamento",
            "entities": [
              "Order",
              "OrderItem",
              "InventoryItem"
            ],
            "pageHint": "kdsIssueFlag",
            "outcome": "Pedido fica com alerta operacional; atendente é notificado para ação"
          },
          {
            "intent": "Evitar erro: tentar pular etapas de status",
            "action": "Ao tentar marcar diretamente como \"Pronto\" sem estar \"Em preparo\", o KDS mostra aviso e orienta a seguir o fluxo",
            "entities": [
              "Order"
            ],
            "pageHint": "kdsStatusGuard",
            "outcome": "Transições inválidas são bloqueadas (transições controladas)"
          }
        ]
      },
      {
        "journeyId": "attendantTrackDeliverAndCloseOrder",
        "title": "Acompanhar pedido, entregar/retirar e fechar a venda (com baixa de estoque)",
        "actor": "attendantCashier",
        "capabilityIds": [
          "trackOrderLifecycle",
          "autoInventoryDeduction"
        ],
        "description": "O atendente acompanha o status, entrega/retira e fecha o pedido como venda; a baixa automática de estoque acontece no fechamento.",
        "steps": [
          {
            "intent": "Acompanhar todos os pedidos em andamento",
            "action": "Abre o painel de pedidos e filtra por \"Em andamento\" (enviado/em preparo/pronto)",
            "entities": [
              "Order"
            ],
            "pageHint": "ordersTracker",
            "outcome": "Lista/kanban de pedidos mostra status atual e tempo no estágio"
          },
          {
            "intent": "Abrir um pedido específico para conferir detalhes",
            "action": "Toca no pedido (mesa X ou takeout) para abrir o detalhe",
            "entities": [
              "Order",
              "OrderItem",
              "DiningTable"
            ],
            "pageHint": "orderDetail",
            "outcome": "Detalhes do pedido ficam visíveis para atendimento"
          },
          {
            "intent": "Agir quando o pedido estiver pronto",
            "action": "Quando aparecer como \"Pronto\", chama o cliente/leva à mesa e toca em \"Entregue/Retirado\"",
            "entities": [
              "Order"
            ],
            "pageHint": "orderDetail",
            "outcome": "Order transiciona para delivered"
          },
          {
            "intent": "Fechar o pedido e registrar a venda",
            "action": "Toca em \"Fechar pedido\", seleciona forma de pagamento, confirma o total e finaliza",
            "entities": [
              "Order",
              "OrderItem",
              "InventoryTransaction",
              "InventoryItem",
              "Recipe",
              "RecipeIngredient"
            ],
            "pageHint": "posCheckout",
            "outcome": "Order transiciona para closed; evento de venda dispara a baixa automática de ingredientes conforme a receita"
          },
          {
            "intent": "Lidar com exceção: estoque insuficiente para baixar",
            "action": "Se a baixa automática indicar saldo insuficiente (evitar negativo), escolhe \"Voltar\" para não fechar ou solicita ajuste ao gerente conforme orientação",
            "entities": [
              "InventoryItem",
              "InventoryTransaction",
              "Order"
            ],
            "pageHint": "inventoryDeductionBlock",
            "outcome": "Venda não é concluída até resolver; evita estoque negativo por padrão"
          },
          {
            "intent": "Conferir que o pedido saiu das filas",
            "action": "Volta ao tracker e verifica que o pedido agora aparece em \"Fechados\"",
            "entities": [
              "Order"
            ],
            "pageHint": "ordersTracker",
            "outcome": "Operação confirma encerramento e limpeza da fila"
          }
        ]
      },
      {
        "journeyId": "attendantCancelOrder",
        "title": "Cancelar pedido (antes ou depois de enviar)",
        "actor": "attendantCashier",
        "capabilityIds": [
          "trackOrderLifecycle"
        ],
        "description": "O atendente cancela um pedido e registra o motivo, respeitando regras de status.",
        "steps": [
          {
            "intent": "Encontrar o pedido que precisa ser cancelado",
            "action": "Abre o tracker de pedidos e usa busca por mesa/takeout/status",
            "entities": [
              "Order",
              "DiningTable"
            ],
            "pageHint": "ordersTracker",
            "outcome": "O pedido alvo é localizado rapidamente"
          },
          {
            "intent": "Revisar o estado atual para decidir o cancelamento",
            "action": "Abre o detalhe do pedido e verifica status e itens",
            "entities": [
              "Order",
              "OrderItem"
            ],
            "pageHint": "orderDetail",
            "outcome": "O atendente entende impacto (ex.: já em preparo)"
          },
          {
            "intent": "Cancelar com motivo",
            "action": "Toca em \"Cancelar pedido\", seleciona um motivo (cliente desistiu, erro, falta de item) e confirma",
            "entities": [
              "Order"
            ],
            "pageHint": "orderCancelConfirm",
            "outcome": "Order transiciona para cancelled (se permitido pelas regras de transição)"
          },
          {
            "intent": "Lidar com exceção: cancelamento não permitido pelo status",
            "action": "Se o status bloquear (ex.: já fechado), o app exibe orientação e alternativas (ex.: estorno fora do MVP)",
            "entities": [
              "Order"
            ],
            "pageHint": "orderCancelBlocked",
            "outcome": "Evita operação inválida; atendimento segue procedimento correto"
          }
        ]
      },
      {
        "journeyId": "manageMenuAndRecipeForAutoDeduction",
        "title": "Gerenciar cardápio e definir receita para baixa automática",
        "actor": "managerOwner",
        "capabilityIds": [
          "manageMenuItems",
          "autoInventoryDeduction"
        ],
        "description": "O gerente mantém o cardápio e define a receita/consumo de ingredientes por item para a baixa automática funcionar no fechamento do pedido.",
        "steps": [
          {
            "intent": "Ver e organizar o cardápio por categorias",
            "action": "Acessa Gerenciamento de cardápio e navega pela lista de categorias e itens",
            "entities": [
              "MenuCategory",
              "MenuItem"
            ],
            "pageHint": "menuManagement",
            "outcome": "O gerente visualiza itens ativos/inativos e suas categorias"
          },
          {
            "intent": "Criar um novo item do cardápio",
            "action": "Toca em \"Novo item\", preenche nome, categoria, preço e ativa o item",
            "entities": [
              "MenuItem",
              "MenuCategory"
            ],
            "pageHint": "menuItemEditor",
            "outcome": "MenuItem é criado como active e fica disponível no POS"
          },
          {
            "intent": "Editar preço/descrição sem afetar pedidos antigos",
            "action": "Abre um item existente, altera preço/descrição e salva",
            "entities": [
              "MenuItem"
            ],
            "pageHint": "menuItemEditor",
            "outcome": "MenuItem é atualizado; pedidos futuros usarão o novo preço, e os itens de pedido mantêm snapshot"
          },
          {
            "intent": "Definir/editar receita do item (consumo por venda)",
            "action": "No item, abre a aba de Receita, adiciona ingredientes com quantidades/unidades e ativa a receita",
            "entities": [
              "Recipe",
              "RecipeIngredient",
              "MenuItem",
              "InventoryItem"
            ],
            "pageHint": "recipeEditor",
            "outcome": "Recipe fica active e passa a orientar a baixa automática no evento de venda"
          },
          {
            "intent": "Desativar item do cardápio",
            "action": "Seleciona o item e toca em \"Desativar\" para remover do POS sem apagar histórico",
            "entities": [
              "MenuItem"
            ],
            "pageHint": "menuManagement",
            "outcome": "MenuItem muda para inactive e não aparece para novos pedidos"
          },
          {
            "intent": "Lidar com exceção: item sem receita",
            "action": "Se um item importante ficar sem receita ativa, o sistema alerta que a baixa automática será incompleta e o gerente decide criar/ativar a receita",
            "entities": [
              "Recipe",
              "MenuItem"
            ],
            "pageHint": "menuValidation",
            "outcome": "Risco operacional é sinalizado; gerente corrige antes de impactar estoque"
          }
        ]
      },
      {
        "journeyId": "manageInventoryAndAdjustments",
        "title": "Gerenciar ingredientes e registrar ajuste manual de estoque",
        "actor": "managerOwner",
        "capabilityIds": [
          "manageInventoryItems"
        ],
        "description": "O gerente cadastra ingredientes, acompanha saldo e registra ajustes (entrada, perda, contagem).",
        "steps": [
          {
            "intent": "Ver lista de ingredientes e alertas de estoque baixo",
            "action": "Acessa Gerenciamento de estoque (ingredientes) e ordena/filtra por saldo baixo",
            "entities": [
              "InventoryItem",
              "InventoryBalanceSnapshot"
            ],
            "pageHint": "inventoryManagement",
            "outcome": "Ingredientes críticos ficam evidentes para reposição"
          },
          {
            "intent": "Criar um ingrediente novo",
            "action": "Toca em \"Novo ingrediente\", informa nome, unidade (ex.: g, ml, un) e status ativo",
            "entities": [
              "InventoryItem"
            ],
            "pageHint": "inventoryItemEditor",
            "outcome": "InventoryItem é criado e pode ser usado em receitas"
          },
          {
            "intent": "Atualizar dados de um ingrediente (ex.: unidade, nome)",
            "action": "Abre o ingrediente e salva alterações",
            "entities": [
              "InventoryItem"
            ],
            "pageHint": "inventoryItemEditor",
            "outcome": "Cadastro do ingrediente fica consistente para consumo e relatórios"
          },
          {
            "intent": "Registrar um ajuste manual (entrada/perda/contagem)",
            "action": "No ingrediente, toca em \"Ajustar estoque\", escolhe tipo de ajuste, informa quantidade e motivo, e confirma",
            "entities": [
              "InventoryTransaction",
              "InventoryItem"
            ],
            "pageHint": "inventoryAdjustment",
            "outcome": "InventoryTransaction é posted e o saldo refletido é atualizado"
          },
          {
            "intent": "Lidar com exceção: ajuste levaria saldo negativo",
            "action": "Ao informar ajuste negativo maior que o saldo, o sistema bloqueia por padrão e sugere corrigir quantidade ou habilitar procedimento supervisionado",
            "entities": [
              "InventoryItem",
              "InventoryTransaction"
            ],
            "pageHint": "inventoryNegativeGuard",
            "outcome": "Evita estoque negativo por padrão e reduz inconsistências"
          }
        ]
      },
      {
        "journeyId": "managerMonitorTodayAndLowStock",
        "title": "Ver dashboard do dia e agir em alertas (vendas e estoque)",
        "actor": "managerOwner",
        "capabilityIds": [
          "viewDashboardToday",
          "viewShiftCloseReport"
        ],
        "description": "O gerente acompanha o dia e usa os números para decidir ações operacionais; no fim, confere o relatório do turno.",
        "steps": [
          {
            "intent": "Acompanhar o desempenho do dia em poucos toques",
            "action": "Abre o Dashboard (Hoje) e alterna cartões de métricas (vendas de hoje, itens mais vendidos, estoque baixo)",
            "entities": [
              "Order",
              "DailyShift",
              "InventoryItem"
            ],
            "pageHint": "dashboardToday",
            "outcome": "O gerente tem leitura rápida do estado do negócio"
          },
          {
            "intent": "Investigar um alerta de estoque baixo",
            "action": "Toca no card de \"Estoque baixo\" para abrir a lista filtrada e ver quais itens impactam receitas importantes",
            "entities": [
              "InventoryItem",
              "Recipe",
              "RecipeIngredient"
            ],
            "pageHint": "inventoryLowStock",
            "outcome": "O gerente identifica o que comprar/ajustar para não travar vendas"
          },
          {
            "intent": "Conferir evolução ao longo do turno",
            "action": "Durante o dia, retorna ao dashboard para ver atualização baseada em pedidos fechados",
            "entities": [
              "Order",
              "DailyShift"
            ],
            "pageHint": "dashboardToday",
            "outcome": "Métricas refletem apenas pedidos closed (regra de métricas)"
          }
        ]
      },
      {
        "journeyId": "closeShiftAndGenerateReport",
        "title": "Fechar turno diário e gerar relatório de fechamento",
        "actor": "managerOwner",
        "capabilityIds": [
          "dailyShiftOpenClose",
          "viewShiftCloseReport"
        ],
        "description": "No fim do expediente, o gerente confere os números e fecha o turno, gerando o relatório oficial.",
        "steps": [
          {
            "intent": "Preparar o fechamento conferindo se há pedidos pendentes",
            "action": "Abre o Dashboard (Hoje) e verifica pedidos em aberto/entrega pendente",
            "entities": [
              "DailyShift",
              "Order"
            ],
            "pageHint": "dashboardToday",
            "outcome": "Pendências são identificadas antes do fechamento"
          },
          {
            "intent": "Resolver pedidos ainda não fechados",
            "action": "Se existirem pedidos entregues não fechados, pede ao caixa para finalizar ou ele mesmo abre o tracker para conferir",
            "entities": [
              "Order"
            ],
            "pageHint": "ordersTracker",
            "outcome": "Reduz divergências no relatório ao garantir pedidos closed"
          },
          {
            "intent": "Iniciar fechamento do turno",
            "action": "Acessa a área de Turno e toca em \"Fechar turno\"",
            "entities": [
              "DailyShift"
            ],
            "pageHint": "shiftClose",
            "outcome": "Fluxo de fechamento é iniciado"
          },
          {
            "intent": "Informar contagem de caixa e confirmar fechamento",
            "action": "Informa valores finais (dinheiro/cartão/outros, se aplicável), revisa resumo e confirma",
            "entities": [
              "DailyShift",
              "Order"
            ],
            "pageHint": "shiftCloseConfirm",
            "outcome": "DailyShift muda para closed; novas vendas/pedidos ficam bloqueados até abrir novo turno"
          },
          {
            "intent": "Ver e salvar/compartilhar o relatório do turno",
            "action": "Abre o Relatório de fechamento de turno, revisa totais e exporta/compartilha",
            "entities": [
              "DailyShift",
              "Order",
              "InventoryTransaction"
            ],
            "pageHint": "shiftCloseReport",
            "outcome": "Relatório do turno fica disponível para auditoria e tomada de decisão"
          },
          {
            "intent": "Lidar com exceção: tentativa de fechar com pedidos em aberto",
            "action": "Se o sistema bloquear por pedidos não finalizados, o gerente abre a lista de pendências e decide cancelar ou concluir antes de fechar",
            "entities": [
              "Order",
              "DailyShift"
            ],
            "pageHint": "shiftCloseBlocked",
            "outcome": "Fechamento só acontece quando o estado operacional está consistente"
          }
        ]
      },
      {
        "journeyId": "switchBilingualUi",
        "title": "Usar a interface bilíngue (pt-BR/en) no dia a dia",
        "actor": "managerOwner",
        "capabilityIds": [
          "bilingualUi"
        ],
        "description": "O gerente alterna o idioma da interface para treinar equipe ou atender preferência local, sem mudar dados.",
        "steps": [
          {
            "intent": "Trocar o idioma para facilitar operação/treinamento",
            "action": "No topo do app (ou menu do usuário), seleciona o idioma pt-BR ou en",
            "entities": [],
            "pageHint": "languageSwitcher",
            "outcome": "Textos da interface mudam para o idioma selecionado"
          },
          {
            "intent": "Validar que telas críticas continuam claras",
            "action": "Navega rapidamente por Dashboard, Cardápio e Estoque para conferir rótulos no novo idioma",
            "entities": [
              "MenuItem",
              "InventoryItem",
              "DailyShift"
            ],
            "pageHint": "dashboardToday",
            "outcome": "O gerente confirma consistência do i18n nas telas principais"
          }
        ]
      },
      {
        "journeyId": "aiAssistantSalesAndPromoInsights",
        "title": "Assistente IA: gerar resumo de vendas e sugestões de promoção",
        "actor": "managerOwner",
        "capabilityIds": [
          "aiSalesSummary",
          "aiPromoSuggestions"
        ],
        "description": "O gerente pede à IA um resumo do dia e sugestões de itens para promover, e lida com falhas/retentativas.",
        "steps": [
          {
            "intent": "Pedir um resumo do desempenho de hoje",
            "action": "Abre Assistente IA e toca em \"Resumo de vendas do dia\"",
            "entities": [
              "AiInsightRun",
              "Order",
              "DailyShift"
            ],
            "pageHint": "aiAssistant",
            "outcome": "Uma execução AiInsightRun é criada como requested"
          },
          {
            "intent": "Ler o resumo e transformar em ação",
            "action": "Quando finalizar, lê o texto com pontos-chave (picos, itens mais vendidos, alertas) e salva para consulta",
            "entities": [
              "AiInsightRun"
            ],
            "pageHint": "aiInsightDetail",
            "outcome": "AiInsightRun muda para succeeded e o gerente registra decisões"
          },
          {
            "intent": "Pedir sugestões de itens para promover (7 dias)",
            "action": "Toca em \"Sugestões de promoção (7 dias)\" e confirma o período/objetivo",
            "entities": [
              "AiInsightRun",
              "Order",
              "MenuItem"
            ],
            "pageHint": "aiAssistant",
            "outcome": "Nova AiInsightRun requested para sugestões"
          },
          {
            "intent": "Aplicar sugestões no operacional",
            "action": "Abre a lista sugerida, marca itens como \"promover hoje\" (lista interna) e compartilha com a equipe",
            "entities": [
              "AiInsightRun",
              "MenuItem"
            ],
            "pageHint": "aiPromoSuggestions",
            "outcome": "Plano de promoção fica registrado para o dia/semana"
          },
          {
            "intent": "Lidar com falha da IA",
            "action": "Se a execução falhar, vê a mensagem de erro e toca em \"Tentar novamente\"",
            "entities": [
              "AiInsightRun"
            ],
            "pageHint": "aiInsightError",
            "outcome": "AiInsightRun muda para failed e uma nova tentativa pode ser solicitada"
          }
        ]
      }
    ]
  }
} as const;

export default userJourneysPlan;
