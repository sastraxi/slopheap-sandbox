import { type Invoice, invoiceTotal, subtotal } from '../invoice'
import type { Result } from '../lib/result'
import { money } from '../money'
import { RECEIVABLE, SALES, TAX } from './accounts'
import { credit, debit, type Entry } from './entry'
import type { Journal } from './journal'

/** Journal an invoice as issued: receivable against sales and tax. */
export function postInvoice(journal: Journal, invoice: Invoice): Result<Entry> {
  const currency = invoice.customer.currency
  const total = invoiceTotal(invoice)
  const net = subtotal(invoice)
  return journal.record(
    'Invoice ' + invoice.id,
    [
      debit(RECEIVABLE, money(total, currency)),
      credit(SALES, money(net, currency)),
      credit(TAX, money(total - net, currency)),
    ],
    invoice.issuedAt,
  )
}
