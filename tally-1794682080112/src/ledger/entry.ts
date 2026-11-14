import type { Money } from '../money'

/** One side of an entry: an amount debited or credited to an account. */
export interface Posting {
  readonly account: string
  readonly debit: Money | null
  readonly credit: Money | null
}

/** A balanced set of postings, made at one time for one reason. */
export interface Entry {
  readonly id: string
  readonly at: Date
  readonly memo: string
  readonly postings: readonly Posting[]
}

export function debit(account: string, amount: Money): Posting {
  return { account, debit: amount, credit: null }
}

export function credit(account: string, amount: Money): Posting {
  return { account, debit: null, credit: amount }
}
