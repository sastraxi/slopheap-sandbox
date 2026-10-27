import { expect, test } from 'bun:test'
import { farewell, greet } from './greet'

test('greets by name', () => {
  expect(greet('Ada')).toBe('Hello, Ada!')
})

test('says goodbye', () => {
  expect(farewell('Ada')).toBe('Goodbye, Ada.')
})
