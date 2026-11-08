/** What the amounts add up to, with the sum taken in whole cents. */
export function total(amounts: number[]): number {
  return amounts.reduce((sum, amount) => sum + Math.round(amount * 100), 0) / 100
}
