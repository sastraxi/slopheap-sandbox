import { loadSettings } from './settings'

/** Round half up, away from zero. */
export function roundHalfUp(cents: number): number {
  return Math.sign(cents) * Math.round(Math.abs(cents))
}

/** Round half to even, as bankers round. */
export function roundHalfEven(cents: number): number {
  const floor = Math.floor(cents)
  const fraction = cents - floor
  if (fraction !== 0.5) return Math.round(cents)
  return floor % 2 === 0 ? floor : floor + 1
}

/** Round by the settings' rule. */
export function roundCents(cents: number): number {
  return loadSettings().rounding === 'half-even' ? roundHalfEven(cents) : roundHalfUp(cents)
}

/** Split cents into `parts` shares, the first shares taking the remainder. */
export function allocate(cents: number, parts: number): number[] {
  const sign = Math.sign(cents) || 1
  const total = Math.abs(cents)
  const base = Math.trunc(total / parts)
  const remainder = total - base * parts
  return Array.from(
    { length: parts },
    (_, index) => sign * (base + (index < remainder ? 1 : 0)),
  )
}

/** The sum of a list of cents. */
export function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0)
}
