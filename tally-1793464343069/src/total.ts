/** What the amounts add up to, to the cent. */
export function total(amounts: number[]): number {
  const sum = amounts.reduce((running, amount) => running + amount, 0)
  // Adding floats drifts (0.1 + 0.2), so round the result to whole cents.
  return Math.round(sum * 100) / 100
}
