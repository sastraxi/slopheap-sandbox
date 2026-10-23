import { expect, test } from 'bun:test'
import { addCustomer } from '../src/customers'
import { createInvoice, invoiceTotal, renderInvoice } from '../src/invoice'

const customer = addCustomer({ name: 'Acme', email: 'billing@acme.test', currency: 'CAD' })

test('totals lines', () => {
  const invoice = createInvoice(customer, [
    { description: 'Hosting', quantity: 2, unitCents: 1500 },
    { description: 'Support', quantity: 1, unitCents: 999 },
  ])
  expect(invoiceTotal(invoice)).toBe(3999)
})

test('rounds tax to the cent', () => {
  const invoice = createInvoice(customer, [{ description: 'Seat', quantity: 1, unitCents: 1999 }], 0.13)
  expect(invoiceTotal(invoice)).toBe(2259)
})

test('rounds half a cent of tax up', () => {
  const invoice = createInvoice(customer, [{ description: 'Stamp', quantity: 1, unitCents: 50 }], 0.05)
  expect(invoiceTotal(invoice)).toBe(53)
})

test('renders an invoice', () => {
  const invoice = createInvoice(customer, [{ description: 'Hosting', quantity: 1, unitCents: 1500 }])
  expect(renderInvoice(invoice)).toContain('Total  $15.00 CAD')
})
