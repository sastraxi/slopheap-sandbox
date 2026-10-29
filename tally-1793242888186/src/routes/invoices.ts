import { findCustomer } from '../customers'
import { createInvoice, type Invoice, invoiceTotal, renderInvoice } from '../invoice'
import { postInvoice } from '../ledger/invoices'
import { journal } from '../ledger/journal'
import { formatMoney, money } from '../money'
import { refund } from '../refunds'
import { route } from './router'

const invoices = new Map<string, Invoice>()

route('POST', '/invoices', async (request) => {
  const body = (await request.json()) as {
    customerId: string
    lines: Invoice['lines']
    taxRate?: number
  }
  const customer = findCustomer(body.customerId)
  if (customer === undefined) return new Response('No such customer', { status: 404 })
  const invoice = createInvoice(customer, body.lines, body.taxRate)
  invoices.set(invoice.id, invoice)
  postInvoice(journal, invoice)
  return Response.json({
    id: invoice.id,
    total: formatAmount(invoiceTotal(invoice), customer.currency),
  })
})

route('GET', '/invoices/:id', (_request, { id }) => {
  const invoice = invoices.get(id ?? '')
  if (invoice === undefined) return new Response('No such invoice', { status: 404 })
  return new Response(renderInvoice(invoice))
})

route('POST', '/invoices/:id/refunds', async (request, { id }) => {
  const invoice = invoices.get(id ?? '')
  if (invoice === undefined) return new Response('No such invoice', { status: 404 })
  const body = (await request.json()) as { cents: number; reason: string }
  const made = refund(journal, invoice, body.cents, body.reason)
  if (!made.ok) return new Response(made.error, { status: 422 })
  return Response.json({ id: made.value.id }, { status: 201 })
})

export function allInvoices(): Invoice[] {
  return [...invoices.values()]
}
