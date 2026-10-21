/** Round half up, away from zero. */
export function roundHalfUp(cents: number): number {
  return Math.sign(cents) * Math.round(Math.abs(cents))
}

/** Split cents into `parts` shares, the first shares taking the remainder. */
export function allocate(cents: number, parts: number): number[] {
  const base = Math.trunc(cents / parts)
  const remainder = cents - base * parts
  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0))
}

/** The sum of a list of cents. */
export function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0)
}
