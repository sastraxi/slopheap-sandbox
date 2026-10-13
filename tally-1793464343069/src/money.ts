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

/** Format money, such as 1234 cents of CAD as "$12.34 CAD". */
export function formatMoney(amount: Money): string {
  const dollars = Math.floor(amount.cents / 100)
  const rest = String(amount.cents % 100).padStart(2, '0')
  return '$' + dollars + '.' + rest + ' ' + amount.currency
}

/** Parse "12.34" into cents. */
export function parseAmount(text: string): number {
  const [whole, fraction = '0'] = text.trim().split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0').slice(0, 2))
}
