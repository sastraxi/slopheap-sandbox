import { expect, test } from 'bun:test'
import { addMoney, formatMoney, money, parseAmount } from '../src/money'

test('formats money', () => {
  expect(formatMoney(money(1234, 'CAD'))).toBe('$12.34 CAD')
  expect(formatMoney(money(5, 'USD'))).toBe('$0.05 USD')
  expect(formatMoney(money(-250, 'CAD'))).toBe('-$2.50 CAD')
  expect(formatMoney(money(123456, 'CAD'))).toBe('$1,234.56 CAD')
})

test('adds money of one currency', () => {
  expect(addMoney(money(100, 'CAD'), money(250, 'CAD'))).toEqual(money(350, 'CAD'))
  expect(() => addMoney(money(1, 'CAD'), money(1, 'USD'))).toThrow()
})

test('parses amounts', () => {
  expect(parseAmount('12.34')).toBe(1234)
  expect(parseAmount('7')).toBe(700)
})
