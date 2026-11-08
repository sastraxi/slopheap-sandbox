import { expect, test } from 'bun:test'
import { total } from '../src/total'

test('totals amounts to the cent', () => {
  expect(total([0.1, 0.2])).toBe(30)
  expect(total([])).toBe(0)
})
