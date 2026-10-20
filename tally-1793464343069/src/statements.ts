import type { Customer } from './customers'
import type { Invoice } from './invoice'
import type { Journal } from './ledger/journal'
import { formatMoney, type Money, money } from './money'

export interface StatementLine {
  readonly at: Date
  readonly memo: string
  readonly amount: Money
}

/** What a customer was invoiced and refunded in a month, from the journal's receivable. */
export function statement(
  journal: Journal,
  customer: Customer,
  invoices: readonly Invoice[],
  month: string,
): StatementLine[] {
  const ids = new Set(invoices.filter((it) => it.customer.id === customer.id).map((it) => it.id))
  const lines: StatementLine[] = []
  for (const entry of journal.entries()) {
    if (entry.at.toISOString().slice(0, 7) !== month) continue
    const invoiceId = /(inv_\d+)/.exec(entry.memo)?.[1]
    if (invoiceId === undefined || !ids.has(invoiceId)) continue
    for (const posting of entry.postings) {
      if (posting.account !== '1100') continue
      const cents = (posting.debit?.cents ?? 0) - (posting.credit?.cents ?? 0)
      lines.push({ at: entry.at, memo: entry.memo, amount: money(cents, customer.currency) })
    }
  }
  return lines
}

export function renderStatement(customer: Customer, month: string, lines: readonly StatementLine[]): string {
  const total = lines.reduce((sum, line) => sum + line.amount.cents, 0)
  return [
    'Statement for ' + customer.name + ', ' + month,
    ...lines.map((line) => line.at.toISOString().slice(0, 10) + '  ' + line.memo + '  ' + formatMoney(line.amount)),
    'Owing  ' + formatMoney(money(total, customer.currency)),
  ].join('\n')
}
