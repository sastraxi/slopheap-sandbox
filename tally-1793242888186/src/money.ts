/** Format an amount in cents, such as 1234 in CAD as "$12.34 CAD". */
export function formatAmount(cents: number, currency: string): string {
  const dollars = Math.floor(cents / 100)
  const rest = String(cents % 100).padStart(2, '0')
  return sign + '$' + dollars + '.' + rest + ' ' + amount.currency
}

/** Parse "12.34" into cents. */
export function parseAmount(text: string): number {
  const [whole, fraction = '0'] = text.trim().split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0').slice(0, 2))
}
