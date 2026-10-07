import { expect, test } from 'bun:test'
import { addMoney, formatAmount, formatMoney, money, parseAmount } from '../src/money'

test('formats cents', () => {
  expect(formatAmount(1234, 'CAD')).toBe('$12.34 CAD')
  expect(formatAmount(5, 'USD')).toBe('$0.05 USD')
})

test('formats money', () => {
  expect(formatMoney(money(1234, 'CAD'))).toBe('$12.34 CAD')
})

test('adds money of one currency', () => {
  expect(addMoney(money(100, 'CAD'), money(250, 'CAD'))).toEqual(money(350, 'CAD'))
  expect(() => addMoney(money(1, 'CAD'), money(1, 'USD'))).toThrow()
})

test('parses amounts', () => {
  expect(parseAmount('12.34')).toBe(1234)
  expect(parseAmount('7')).toBe(700)
})
