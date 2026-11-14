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

/** The file's settings over the defaults, checked before use. */
export function loadSettings(overrides: Partial<Settings> = {}): Settings {
  const settings: Settings = { ...DEFAULTS, ...values, ...overrides }
  if (!/^[A-Z]{3}$/.test(settings.defaultCurrency)) {
    throw new Error(`settings.defaultCurrency is not a currency code: ${settings.defaultCurrency}`)
  }
  if (settings.rounding !== 'half-up' && settings.rounding !== 'half-even') {
    throw new Error(`settings.rounding is not a rounding rule: ${settings.rounding}`)
  }
  return settings
}
