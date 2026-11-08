/** What the amounts add up to. */
export function total(amounts: number[]): number {
  return Math.round(amounts.reduce((sum, amount) => sum + amount, 0) * 100) / 100
}
