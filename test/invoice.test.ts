import { expect, test } from 'bun:test'
import { createInvoice, invoiceTotal, renderInvoice, subtotal } from '../src/invoice'

const customer = { id: 'cus_1', name: 'Acme', currency: 'USD' }
const lines = [
  { description: 'Design', quantity: 2, unitCents: 5000 },
  { description: 'Hosting', quantity: 1, unitCents: 1200 },
]

test('totals the lines', () => {
  const invoice = createInvoice(customer, lines)
  expect(subtotal(invoice)).toBe(11200)
  expect(invoiceTotal(invoice)).toBe(11200)
})

test('rounds a half cent by the rounding rule', () => {
  const invoice = createInvoice(customer, [{ description: 'Sticker', quantity: 1, unitCents: 3 }], 0.5)
  expect(invoiceTotal(invoice)).toBe(4)
})

test('adds tax', () => {
  const invoice = createInvoice(customer, lines, 0.13)
  expect(invoiceTotal(invoice)).toBe(12656)
})

test('renders the lines and the total', () => {
  const invoice = createInvoice(customer, lines)
  expect(renderInvoice(invoice)).toContain('$112.00 USD')
})
