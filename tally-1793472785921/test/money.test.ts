import { expect, test } from 'bun:test'
import { formatAmount, parseAmount } from '../src/money'

test('formats cents', () => {
  expect(formatAmount(1234, 'CAD')).toBe('$12.34 CAD')
  expect(formatAmount(5, 'USD')).toBe('$0.05 USD')
  expect(formatAmount(123456, 'CAD')).toBe('$1,234.56 CAD')
})

test('parses amounts', () => {
  expect(parseAmount('12.34')).toBe(1234)
  expect(parseAmount('7')).toBe(700)
})
