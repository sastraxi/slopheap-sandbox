import { expect, test } from 'bun:test'
import { createInvoice } from '../src/invoice'
import { averageOf, totalOf } from '../src/report'

const customer = { id: 'cus_1', name: 'Acme', currency: 'USD' }
const first = createInvoice(customer, [{ description: 'Design', quantity: 2, unitCents: 5000 }])
const second = createInvoice(customer, [{ description: 'Hosting', quantity: 1, unitCents: 1200 }])

test('totals invoices', () => {
  expect(totalOf([first, second])).toBe(11200)
})

test('averages invoices', () => {
  expect(averageOf([first, second])).toBe(5600)
})

test('averages an empty list to zero', () => {
  expect(averageOf([])).toBe(0)
})
