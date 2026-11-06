import { expect, test } from 'bun:test'
import { addCustomer } from '../src/customers'
import { createInvoice } from '../src/invoice'
import { postInvoice } from '../src/ledger/invoices'
import { Journal } from '../src/ledger/journal'
import { money } from '../src/money'
import { refund } from '../src/refunds'

const customer = addCustomer({ name: 'Acme', email: 'billing@acme.test', currency: 'CAD' })

test('a refund reduces what the customer owes', () => {
  const journal = new Journal()
  const invoice = createInvoice(customer, [{ description: 'Hosting', quantity: 1, unitCents: 5000 }])
  postInvoice(journal, invoice)
  expect(refund(journal, invoice, 2000, 'Outage').ok).toBe(true)
  expect(journal.balance('1100', 'CAD')).toEqual(money(3000, 'CAD'))
})

test('a refund beyond the invoice is refused', () => {
  const journal = new Journal()
  const invoice = createInvoice(customer, [{ description: 'Hosting', quantity: 1, unitCents: 5000 }])
  postInvoice(journal, invoice)
  expect(refund(journal, invoice, 4000, 'Outage').ok).toBe(true)
  expect(refund(journal, invoice, 1500, 'Again')).toEqual({ ok: false, error: 'A refund cannot exceed the invoice' })
})

test('a refund of nothing is refused', () => {
  const journal = new Journal()
  const invoice = createInvoice(customer, [{ description: 'Hosting', quantity: 1, unitCents: 5000 }])
  expect(refund(journal, invoice, 0, 'None')).toEqual({ ok: false, error: 'A refund must be more than zero' })
})
