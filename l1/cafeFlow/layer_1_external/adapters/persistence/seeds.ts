/// <mls fileReference="_102048_/l1/cafeFlow/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>

// Mechanical mock rows for the cafeFlow module. Discovered by shape (TableSeedRows) from
// this tableDefsDir and merged into the matching TableDefinition.seedRows. Applied when
// the tables are (re)created empty: on every Postgres schema rebuild (migrate) and on
// every memory-runtime store init (dev preview). Column-keyed rows; `details` is JSONB.
// Fixed UUIDs so cross-references stay stable and re-runs are deterministic.

import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

// Referenced MDM entities (stock items, menu items, tables) — fixed ids reused below.
const STOCK_ITEM_COFFEE = 'a1000000-0000-4000-8000-000000000001';
const STOCK_ITEM_MILK = 'a1000000-0000-4000-8000-000000000002';
const STOCK_ITEM_CROISSANT = 'a1000000-0000-4000-8000-000000000003';
const MENU_ITEM_ESPRESSO = 'b1000000-0000-4000-8000-000000000001';
const MENU_ITEM_LATTE = 'b1000000-0000-4000-8000-000000000002';
const MENU_ITEM_CROISSANT = 'b1000000-0000-4000-8000-000000000003';
const TABLE_01 = 'c1000000-0000-4000-8000-000000000001';
const TABLE_02 = 'c1000000-0000-4000-8000-000000000002';

const SHIFT_YESTERDAY = 'd1000000-0000-4000-8000-000000000001';
const SHIFT_TODAY = 'd1000000-0000-4000-8000-000000000002';
const ORDER_PAID = 'e1000000-0000-4000-8000-000000000001';
const ORDER_PREPARING = 'e1000000-0000-4000-8000-000000000002';
const ORDER_TAKEOUT = 'e1000000-0000-4000-8000-000000000003';

const T0 = '2026-07-01T08:00:00.000Z';
const T1 = '2026-07-01T12:00:00.000Z';
const T2 = '2026-07-02T08:00:00.000Z';
const T3 = '2026-07-02T09:30:00.000Z';

export const dailyShiftSeeds: TableSeedRows = {
  seedFor: 'cafeFlowDailyShift',
  rows: [
    { daily_shift_id: SHIFT_YESTERDAY, status: 'closed', created_at: T0, details: { date: '2026-07-01', openTime: '08:00', closeTime: '18:00', totalSales: 428.5, updatedAt: T1 } },
    { daily_shift_id: SHIFT_TODAY, status: 'open', created_at: T2, details: { date: '2026-07-02', openTime: '08:00', closeTime: null, totalSales: 63.0, updatedAt: T3 } },
  ],
};

export const stockLevelSeeds: TableSeedRows = {
  seedFor: 'cafeFlowStockLevel',
  rows: [
    { stock_level_id: 'f1000000-0000-4000-8000-000000000001', stock_item_id: STOCK_ITEM_COFFEE, status: 'sufficient', created_at: T2, details: { currentQuantity: 12.5, minQuantity: 3, updatedAt: T3 } },
    { stock_level_id: 'f1000000-0000-4000-8000-000000000002', stock_item_id: STOCK_ITEM_MILK, status: 'low', created_at: T2, details: { currentQuantity: 2, minQuantity: 4, updatedAt: T3 } },
    { stock_level_id: 'f1000000-0000-4000-8000-000000000003', stock_item_id: STOCK_ITEM_CROISSANT, status: 'depleted', created_at: T2, details: { currentQuantity: 0, minQuantity: 10, updatedAt: T3 } },
  ],
};

export const orderSeeds: TableSeedRows = {
  seedFor: 'cafeFlowOrder',
  rows: [
    { order_id: ORDER_PAID, type: 'dineIn', status: 'paid', table_id: TABLE_01, daily_shift_id: SHIFT_YESTERDAY, created_at: T0, details: { total: 24.5, updatedAt: T1 } },
    { order_id: ORDER_PREPARING, type: 'dineIn', status: 'preparing', table_id: TABLE_02, daily_shift_id: SHIFT_TODAY, created_at: T2, details: { total: 31.0, updatedAt: T3 } },
    { order_id: ORDER_TAKEOUT, type: 'takeout', status: 'pending', table_id: null, daily_shift_id: SHIFT_TODAY, created_at: T3, details: { total: 32.0, updatedAt: T3 } },
  ],
};

export const orderItemSeeds: TableSeedRows = {
  seedFor: 'cafeFlowOrderItem',
  rows: [
    { order_item_id: '01000000-0000-4000-8000-000000000001', order_id: ORDER_PAID, menu_item_id: MENU_ITEM_ESPRESSO, created_at: T0, details: { quantity: 2, unitPrice: 6.0, observations: null, updatedAt: T0 } },
    { order_item_id: '01000000-0000-4000-8000-000000000002', order_id: ORDER_PAID, menu_item_id: MENU_ITEM_CROISSANT, created_at: T0, details: { quantity: 1, unitPrice: 12.5, observations: 'aquecido', updatedAt: T0 } },
    { order_item_id: '01000000-0000-4000-8000-000000000003', order_id: ORDER_PREPARING, menu_item_id: MENU_ITEM_LATTE, created_at: T2, details: { quantity: 2, unitPrice: 9.5, observations: 'sem açúcar', updatedAt: T2 } },
    { order_item_id: '01000000-0000-4000-8000-000000000004', order_id: ORDER_PREPARING, menu_item_id: MENU_ITEM_CROISSANT, created_at: T2, details: { quantity: 1, unitPrice: 12.0, observations: null, updatedAt: T2 } },
    { order_item_id: '01000000-0000-4000-8000-000000000005', order_id: ORDER_TAKEOUT, menu_item_id: MENU_ITEM_LATTE, created_at: T3, details: { quantity: 2, unitPrice: 9.5, observations: null, updatedAt: T3 } },
    { order_item_id: '01000000-0000-4000-8000-000000000006', order_id: ORDER_TAKEOUT, menu_item_id: MENU_ITEM_ESPRESSO, created_at: T3, details: { quantity: 2, unitPrice: 6.5, observations: 'duplo', updatedAt: T3 } },
  ],
};

export const orderStatusEventSeeds: TableSeedRows = {
  seedFor: 'cafeFlowOrderStatusEvent',
  rows: [
    { order_status_event_id: '02000000-0000-4000-8000-000000000001', order_id: ORDER_PAID, status: 'sent_to_kitchen', created_at: T0, details: { previousStatus: 'pending', updatedAt: T0 } },
    { order_status_event_id: '02000000-0000-4000-8000-000000000002', order_id: ORDER_PAID, status: 'delivered', created_at: T1, details: { previousStatus: 'ready', updatedAt: T1 } },
    { order_status_event_id: '02000000-0000-4000-8000-000000000003', order_id: ORDER_PAID, status: 'paid', created_at: T1, details: { previousStatus: 'delivered', updatedAt: T1 } },
    { order_status_event_id: '02000000-0000-4000-8000-000000000004', order_id: ORDER_PREPARING, status: 'preparing', created_at: T3, details: { previousStatus: 'sent_to_kitchen', updatedAt: T3 } },
  ],
};

export const shiftCloseReportSeeds: TableSeedRows = {
  seedFor: 'cafeFlowShiftCloseReport',
  rows: [
    {
      shift_close_report_id: '03000000-0000-4000-8000-000000000001',
      daily_shift_id: SHIFT_YESTERDAY,
      created_at: T1,
      details: {
        totalSales: 428.5,
        totalOrders: 18,
        bestSellingItems: [
          { menuItemId: MENU_ITEM_ESPRESSO, name: 'Espresso', quantity: 22 },
          { menuItemId: MENU_ITEM_LATTE, name: 'Latte', quantity: 15 },
          { menuItemId: MENU_ITEM_CROISSANT, name: 'Croissant', quantity: 11 },
        ],
        stockConsumptionSummary: [
          { stockItemId: STOCK_ITEM_COFFEE, name: 'Café em grãos (kg)', consumed: 1.8 },
          { stockItemId: STOCK_ITEM_MILK, name: 'Leite (L)', consumed: 6.5 },
        ],
        operationalMetrics: { averageTicket: 23.8, averagePreparationMinutes: 7.2, cancelledOrders: 1 },
        updatedAt: T1,
      },
    },
  ],
};
