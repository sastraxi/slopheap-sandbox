import { loadSettings } from './settings'

/** Format cents as "-$12.34 CAD", in the settings' currency by default. */
export function formatAmount(
  cents: number,
  currency: string = loadSettings().defaultCurrency,
): string {
  const sign = cents < 0 ? '-' : ''
  const absolute = Math.abs(cents)
  const dollars = Math.floor(absolute / 100).toLocaleString('en-US')
  const rest = String(absolute % 100).padStart(2, '0')
  return sign + '$' + dollars + '.' + rest + ' ' + currency
}

/** Parse "12.34" into cents. */
export function parseAmount(text: string): number {
  const [whole, fraction = '0'] = text.trim().split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0').slice(0, 2))
}
