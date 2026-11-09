import { expect, test } from 'bun:test'
import { total } from '../src/total'

test('totals whole cents exactly', () => {
  expect(total([10, 20])).toBe(30)
  expect(total([])).toBe(0)
})
