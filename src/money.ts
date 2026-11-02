import { loadSettings } from './settings'

export function formatAmount(
  cents: number,
  currency: string = loadSettings().defaultCurrency,
): string {
}

/** Parse "12.34" into cents. */
export function parseAmount(text: string): number {
  const [whole, fraction = '0'] = text.trim().split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0').slice(0, 2))
}
