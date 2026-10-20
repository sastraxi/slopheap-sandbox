import values from '../settings.json'

/** How an amount that falls between cents lands. */
export type Rounding = 'half-up' | 'half-even'

export interface Settings {
  readonly defaultCurrency: string
  readonly rounding: Rounding
}

/** What Tally uses when the settings file says nothing. */
export const DEFAULTS: Settings = {
  defaultCurrency: 'USD',
  rounding: 'half-up',
}

/** The file's settings over the defaults. */
export function loadSettings(overrides: Partial<Settings> = {}): Settings {
  return { ...DEFAULTS, ...values, ...overrides }
}
