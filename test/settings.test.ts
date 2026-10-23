import { expect, test } from 'bun:test'
import { DEFAULTS, loadSettings } from '../src/settings'

test('reads the settings file', () => {
  expect(loadSettings()).toEqual({ defaultCurrency: 'USD', rounding: 'half-even' })
})

test('falls back to the defaults', () => {
  expect(DEFAULTS.defaultCurrency).toBe('USD')
})

test('rejects an unknown rounding rule', () => {
  expect(() => loadSettings({ rounding: 'half-away' as never })).toThrow()
})

test('rejects a malformed currency', () => {
  expect(() => loadSettings({ defaultCurrency: 'usd' })).toThrow()
})
