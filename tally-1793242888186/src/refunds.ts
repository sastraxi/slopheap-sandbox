import { type Invoice, invoiceTotal } from './invoice'
import { RECEIVABLE, SALES } from './ledger/accounts'
import { credit, debit, type Entry } from './ledger/entry'
import type { Journal } from './ledger/journal'
import { err, type Result } from './lib/result'
import { money } from './money'

/** What was refunded of an invoice so far, in cents. */
function refunded(journal: Journal, invoice: Invoice): number {
  return journal
    .entries()
    .filter((entry) => entry.memo.startsWith('Refund of ' + invoice.id + ':'))
    .reduce((sum, entry) => sum + (entry.postings[0]?.debit?.cents ?? 0), 0)
}

/** Refund part of an invoice to its customer: sales and receivable go down. */
export function refund(journal: Journal, invoice: Invoice, cents: number, reason: string): Result<Entry> {
  if (cents <= 0) return err('A refund must be more than zero')
  if (refunded(journal, invoice) + cents > invoiceTotal(invoice)) {
    return err('A refund cannot exceed the invoice')
  }
  const amount = money(cents, invoice.customer.currency)
  return journal.record('Refund of ' + invoice.id + ': ' + reason, [debit(SALES, amount), credit(RECEIVABLE, amount)])
}
