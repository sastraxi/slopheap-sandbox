import type { Customer } from './customers'
import { newId } from './lib/ids'
import { formatMoney, money } from './money'

export interface InvoiceLine {
  description: string
  quantity: number
  unitCents: number
}

export interface Invoice {
  id: string
  customer: Customer
  lines: InvoiceLine[]
  taxRate: number
  issuedAt: Date
}

let next = 1

export function createInvoice(customer: Customer, lines: InvoiceLine[], taxRate = 0): Invoice {
  return { id: 'inv_' + next++, customer, lines, taxRate, issuedAt: new Date() }
}

export function subtotal(invoice: Invoice): number {
  return invoice.lines.reduce((sum, line) => sum + line.quantity * line.unitCents, 0)
}

export function invoiceTotal(invoice: Invoice): number {
  const net = subtotal(invoice)
  return net + net * invoice.taxRate
}

export function renderInvoice(invoice: Invoice): string {
  const currency = invoice.customer.currency
  const lines = invoice.lines.map(
    (line) =>
      line.description + ' x' + line.quantity + '  ' + formatMoney(money(line.quantity * line.unitCents, currency)),
  )
  return [
    'Invoice ' + invoice.id + ' for ' + invoice.customer.name,
    ...lines,
    'Total  ' + formatMoney(money(invoiceTotal(invoice), currency)),
  ].join('\n')
}
