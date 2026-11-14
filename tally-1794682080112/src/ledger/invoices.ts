import { type Invoice, invoiceTotal, subtotal } from '../invoice'
import type { Result } from '../lib/result'
import { money } from '../money'
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
      debit('1100', money(total, currency)),
      credit('4000', money(net, currency)),
      credit('2200', money(total - net, currency)),
    ],
    invoice.issuedAt,
  )
}
