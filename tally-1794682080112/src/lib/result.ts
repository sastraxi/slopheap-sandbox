/** What may fail, and why, without throwing. */
export type Result<T, E = string> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E }

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

/** The value, or a throw with the error. */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (!result.ok) throw new Error(String(result.error))
  return result.value
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error }
}
