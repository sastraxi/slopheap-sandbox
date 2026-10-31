/** What the amounts add up to, rounded to the cent. */
export function total(amounts: number[]): number {
  const sum = amounts.reduce((running, amount) => running + amount, 0)
  return Math.round(sum * 100) / 100
}
