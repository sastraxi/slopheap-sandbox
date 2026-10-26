import { expect, test } from 'bun:test'
import { credit, debit } from '../src/ledger/entry'
import { Journal } from '../src/ledger/journal'
import { money } from '../src/money'

test('journals a balanced entry', () => {
  const journal = new Journal()
  const made = journal.record('Sale', [debit('1100', money(1000, 'CAD')), credit('4000', money(1000, 'CAD'))])
  expect(made.ok).toBe(true)
  expect(journal.balance('1100', 'CAD')).toEqual(money(1000, 'CAD'))
  expect(journal.balance('4000', 'CAD')).toEqual(money(-1000, 'CAD'))
})

test('refuses an unbalanced entry', () => {
  const journal = new Journal()
  const made = journal.record('Oops', [debit('1100', money(1000, 'CAD'))])
  expect(made).toEqual({ ok: false, error: 'Unbalanced by 1000 cents of CAD' })
  expect(journal.entries()).toHaveLength(0)
})
