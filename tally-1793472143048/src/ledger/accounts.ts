/** An account of the ledger. Assets and expenses rise with debits; the rest with credits. */
export type AccountKind = 'asset' | 'liability' | 'revenue' | 'expense'

export interface Account {
  readonly code: string
  readonly name: string
  readonly kind: AccountKind
}

export const ACCOUNTS: readonly Account[] = [
  { code: '1000', name: 'Cash', kind: 'asset' },
  { code: '1100', name: 'Receivable', kind: 'asset' },
  { code: '2200', name: 'Tax payable', kind: 'liability' },
  { code: '4000', name: 'Sales', kind: 'revenue' },
]

export function account(code: string): Account {
  const found = ACCOUNTS.find((it) => it.code === code)
  if (found === undefined) throw new Error('No account ' + code)
  return found
}
