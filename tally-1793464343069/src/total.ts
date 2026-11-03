/** What the amounts add up to, rounded to the cent. */
export function total(amounts: number[]): number {
  const sum = amounts.reduce((sum, amount) => sum + amount, 0)
  return Math.round(sum * 100) / 100
}
