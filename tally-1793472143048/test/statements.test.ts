import { expect, test } from 'bun:test'
import { addCustomer } from '../src/customers'
import { createInvoice } from '../src/invoice'
import { postInvoice } from '../src/ledger/invoices'
import { Journal } from '../src/ledger/journal'
import { renderStatement, statement } from '../src/statements'

const customer = addCustomer({ name: 'Acme', email: 'billing@acme.test', currency: 'CAD' })
const hosting = (unitCents: number, issuedAt: string) => ({
  ...createInvoice(customer, [{ description: 'Hosting', quantity: 1, unitCents }]),
  issuedAt: new Date(issuedAt),
})

test('a statement holds the month’s invoices', () => {
  const journal = new Journal()
  const september = hosting(5000, '2026-09-15T12:00:00Z')
  const october = hosting(7000, '2026-10-15T12:00:00Z')
  postInvoice(journal, september)
  postInvoice(journal, october)
  const lines = statement(journal, customer, [september, october], '2026-10')
  expect(lines.map((it) => it.amount.cents)).toEqual([7000])
  expect(renderStatement(customer, '2026-10', lines)).toContain('Owing  $70.00 CAD')
})
