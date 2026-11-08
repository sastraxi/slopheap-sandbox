/** What the amounts add up to, taking each amount as whole cents. */
export function total(amounts: number[]): number {
  const cents = amounts.reduce((sum, amount) => sum + Math.round(amount * 100), 0)
  return cents / 100
}
