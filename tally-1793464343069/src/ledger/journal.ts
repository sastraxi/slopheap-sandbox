import { newId } from '../lib/ids'
import { err, ok, type Result } from '../lib/result'
import { type Money, money } from '../money'
import type { Entry, Posting } from './entry'

/** Entries in the order they were made. Nothing is changed once journaled. */
export class Journal {
  readonly #entries: Entry[] = []

  /** Journal an entry, if its debits equal its credits in each currency. */
  record(memo: string, postings: readonly Posting[], at = new Date()): Result<Entry> {
    const sums = new Map<string, number>()
    for (const posting of postings) {
      const side = posting.debit ?? posting.credit
      if (side === null) return err('A posting needs a debit or a credit')
      const sign = posting.debit === null ? -1 : 1
      sums.set(side.currency, (sums.get(side.currency) ?? 0) + sign * side.cents)
    }
    for (const [currency, sum] of sums) {
      if (sum !== 0) return err('Unbalanced by ' + sum + ' cents of ' + currency)
    }
    const entry: Entry = { id: newId('je'), at, memo, postings }
    this.#entries.push(entry)
    return ok(entry)
  }

  entries(): readonly Entry[] {
    return this.#entries
  }

  /** What an account holds: its debits less its credits. */
  balance(account: string, currency: string): Money {
    let cents = 0
    for (const entry of this.#entries) {
      for (const posting of entry.postings) {
        if (posting.account !== account) continue
        if (posting.debit?.currency === currency) cents += posting.debit.cents
        if (posting.credit?.currency === currency) cents -= posting.credit.cents
      }
    }
    return money(cents, currency)
  }
}

export const journal = new Journal()
