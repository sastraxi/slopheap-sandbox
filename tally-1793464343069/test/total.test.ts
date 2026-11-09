import { expect, test } from 'bun:test'
import { total } from '../src/total'

test('totals whole cents exactly', () => {
  expect(total([10, 20])).toBe(30)
  expect(total([])).toBe(0)
})

test('totals invoice-style amounts without drift', () => {
  expect(total([1299, 850, 425])).toBe(2574)
  expect(total([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(10)
})
