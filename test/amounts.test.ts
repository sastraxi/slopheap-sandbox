import { expect, test } from 'bun:test'
import { allocate, roundHalfEven, roundHalfUp, sum } from '../src/amounts'

test('rounds half up', () => {
  expect(roundHalfUp(1.5)).toBe(2)
  expect(roundHalfUp(-1.5)).toBe(-2)
})

test('rounds half to even', () => {
  expect(roundHalfEven(2.5)).toBe(2)
  expect(roundHalfEven(3.5)).toBe(4)
})

test('allocates without losing a cent', () => {
  expect(allocate(10, 3)).toEqual([4, 3, 3])
  expect(allocate(9, 3)).toEqual([3, 3, 3])
})

test('sums amounts', () => {
  expect(sum([1, 2, 3])).toBe(6)
  expect(sum([])).toBe(0)
})
