import { expect, test } from 'bun:test'
import { DEFAULTS, loadSettings } from '../src/settings'

test('reads the settings file', () => {
  expect(loadSettings()).toEqual({ defaultCurrency: 'USD', rounding: 'half-even' })
})

test('falls back to the defaults', () => {
  expect(DEFAULTS.defaultCurrency).toBe('USD')
})
