/**
 * What the amounts add up to, in whole cents.
 *
 * Amounts are whole cents, such as 1234 for $12.34, as elsewhere in tally
 * (see src/money.ts). The sum is integer addition, so it is exact for safe
 * integers; no float rounding is involved.
 */
export function total(amounts: number[]): number {
  return amounts.reduce((sum, cents) => sum + cents, 0)
}
