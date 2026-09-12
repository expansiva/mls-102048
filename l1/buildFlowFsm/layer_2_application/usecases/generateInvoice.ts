/// <mls fileReference="_102048_/l1/buildFlowFsm/layer_2_application/usecases/generateInvoice.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IInvoiceRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/invoiceRepository.js';
import type { IProjectRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/projectRepository.js';
import type { IChangeOrderRepository } from '/_102048_/l1/buildFlowFsm/layer_2_application/ports/changeOrderRepository.js';
import type { Invoice, InvoiceCurrency } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';
import {
  recomputeInvoiceTotal,
  validateInvoiceTotal,
  validateNonNegativeCosts,
} from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/invoice.js';
import type { Project } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/project.js';
import type { ChangeOrder } from '/_102048_/l1/buildFlowFsm/layer_3_domain/entities/changeOrder.js';

export interface GenerateInvoiceInput {
  projectId: string;
  clientEmail?: string;
  notes?: string;
}

export interface GenerateInvoiceOutput {
  invoiceId: string;
  status: string;
  laborCost: number;
  materialCost: number;
  changeOrderAmount: number;
  totalAmount: number;
  currency: string;
  shareLink?: string;
  clientEmail?: string;
}

export async function generateInvoice(
  ctx: RequestContext,
  input: GenerateInvoiceInput,
): Promise<GenerateInvoiceOutput> {
  const invoices = resolveRepository<IInvoiceRepository>(ctx, 'Invoice');
  const projects = resolveRepository<IProjectRepository>(ctx, 'Project');
  const changeOrders = resolveRepository<IChangeOrderRepository>(ctx, 'ChangeOrder');

  // Step 1: Load Project by projectId — validate it exists
  let project: Project;
  try {
    project = await projects.getById(input.projectId);
  } catch {
    throw new AppError('NOT_FOUND', `Project not found: ${input.projectId}`, 404, {
      projectId: input.projectId,
    });
  }

  // Step 2: Extract clientId from the loaded Project
  const clientId = project.clientId;

  // Step 3-4: Load Client master-data via MDM to obtain email; fall back to input.clientEmail
  let clientEmail: string | null = input.clientEmail ?? null;
  if (!clientEmail && clientId) {
    try {
      const clientEntity = await ctx.mdm.entity.get({ mdmId: clientId });
      const clientDetails = clientEntity.details as unknown as Record<string, unknown>;
      const email = clientDetails['email'] as string | undefined;
      if (email) {
        clientEmail = email;
      }
    } catch {
      // Client MDM record not found — continue with null email
    }
  }

  // Step 5-6: Query ChangeOrders for the project; filter to approved only (rule: approvedChangeOrdersOnly)
  const projectChangeOrders: ChangeOrder[] = await changeOrders.findByProjectId(input.projectId);
  const approvedChangeOrders = projectChangeOrders.filter(
    (co) => String(co.status) === 'approved',
  );
  const changeOrderAmount = approvedChangeOrders.reduce((sum, co) => sum + co.amount, 0);

  // Step 7: laborCost and materialCost — modeling gap.
  // TimeLog and MaterialUsage are declared in reads but not in this function's ports.
  // The usecase relies on the prior billing-summary step's computed values, which are not
  // available here. Defaulting to 0 until the flow context or additional ports are wired.
  const laborCost = 0;
  const materialCost = 0;

  // Step 8: Compute totalAmount (rule: invoiceCalculation)
  const totalAmount = recomputeInvoiceTotal(laborCost, materialCost, changeOrderAmount);

  // Step 9: All figures in USD, no tax (rule: allFiguresUsdNoTax)
  const currency: InvoiceCurrency = 'usd';

  // Step 10-11: Generate invoiceId and shareLink
  const invoiceId = ctx.idGenerator.newId();
  const shareToken = ctx.idGenerator.newId();
  const shareLink = `/invoices/share/${shareToken}`;

  // Step 12: Timestamps
  const now = ctx.clock.nowIso();

  // Step 13: status = 'draft' — informational only, no payment (rule: invoiceIsInformational)
  const status = 'draft' as const;

  // Step 14: Build the Invoice aggregate
  const invoice: Invoice = {
    invoiceId,
    projectId: input.projectId,
    status,
    laborCost,
    materialCost,
    changeOrderAmount,
    totalAmount,
    currency,
    shareLink,
    clientEmail,
    issuedAt: null,
    voidedAt: null,
    voidReason: null,
    notes: input.notes ?? null,
    lines: [],
    createdAt: now,
    updatedAt: now,
  };

  // Validate domain invariants
  if (!validateNonNegativeCosts(invoice)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'laborCost, materialCost, and changeOrderAmount must each be non-negative',
      400,
      { ruleId: 'validateNonNegativeCosts' },
    );
  }
  if (!validateInvoiceTotal(invoice)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'totalAmount must equal laborCost + materialCost + changeOrderAmount',
      400,
      { ruleId: 'invoiceCalculation' },
    );
  }

  // Step 15: Persist the Invoice inside a single transaction
  await ctx.data.runInTransaction(async () => {
    await invoices.save(invoice);
  });

  // Step 16: Return projected output fields
  const output: GenerateInvoiceOutput = {
    invoiceId,
    status,
    laborCost,
    materialCost,
    changeOrderAmount,
    totalAmount,
    currency,
    shareLink,
  };

  if (clientEmail) {
    output.clientEmail = clientEmail;
  }

  return output;
}
