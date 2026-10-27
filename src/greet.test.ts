import { expect, test } from 'bun:test'
import { greet } from './greet'

test('greets by name', () => {
  expect(greet('Ada')).toBe('Hello, Ada!')
})
