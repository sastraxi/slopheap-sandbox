/** What the amounts, in whole cents, add up to, in whole cents. */
export function total(amounts: number[]): number {
  return amounts.reduce((sum, cents) => sum + cents, 0)
}
