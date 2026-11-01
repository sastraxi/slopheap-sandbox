/** What the amounts add up to, to the cent. */
export function total(amounts: number[]): number {
  const sum = amounts.reduce((acc, amount) => acc + amount, 0)
  return Math.round(sum * 100) / 100
}
