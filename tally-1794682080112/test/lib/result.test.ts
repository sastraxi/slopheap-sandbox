import { expect, test } from 'bun:test'
import { err, ok } from '../../src/lib/result'

test('ok and err', () => {
  expect(ok(1)).toEqual({ ok: true, value: 1 })
  expect(err('no')).toEqual({ ok: false, error: 'no' })
})
