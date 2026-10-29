import { findCustomer } from '../customers'
import { createInvoice, type Invoice, invoiceTotal, renderInvoice } from '../invoice'
import { postInvoice } from '../ledger/invoices'
import { journal } from '../ledger/journal'
import { formatMoney, money } from '../money'
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
    total: formatMoney(money(invoiceTotal(invoice), customer.currency)),
  })
})

route('GET', '/invoices/:id', (_request, { id }) => {
  const invoice = invoices.get(id ?? '')
  if (invoice === undefined) return new Response('No such invoice', { status: 404 })
  return new Response(renderInvoice(invoice))
})

export function allInvoices(): Invoice[] {
  return [...invoices.values()]
}
