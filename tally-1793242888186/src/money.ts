/** An amount of one currency, in its smallest unit. */
export interface Money {
  readonly cents: number
  readonly currency: string
}

export function money(cents: number, currency: string): Money {
  return { cents: Math.round(cents), currency }
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error('Cannot add ' + a.currency + ' to ' + b.currency)
  return money(a.cents + b.cents, a.currency)
}

/** Format an amount in cents, such as 1234 in CAD as "$12.34 CAD". */
export function formatAmount(cents: number, currency: string): string {
  const dollars = Math.floor(cents / 100).toLocaleString('en-US')
  const rest = String(cents % 100).padStart(2, '0')
  return '$' + dollars + '.' + rest + ' ' + currency
}

/** Parse "12.34" into cents. */
export function parseAmount(text: string): number {
  const [whole, fraction = '0'] = text.trim().split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0').slice(0, 2))
}
