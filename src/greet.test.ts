import { expect, test } from 'bun:test'

test('greets by name', () => {
  expect(greet('Ada')).toBe('Hello, Ada!')
})
