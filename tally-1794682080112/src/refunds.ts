import type { Invoice } from './invoice'
import { credit, debit, type Entry } from './ledger/entry'
import type { Journal } from './ledger/journal'
import { err, type Result } from './lib/result'
import { money } from './money'

/** Refund part of an invoice to its customer: sales and receivable go down. */
export function refund(journal: Journal, invoice: Invoice, cents: number, reason: string): Result<Entry> {
  if (cents <= 0) return err('A refund must be more than zero')
  const amount = money(cents, invoice.customer.currency)
  return journal.record('Refund of ' + invoice.id + ': ' + reason, [debit('4000', amount), credit('1100', amount)])
}
