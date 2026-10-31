const counters = new Map<string, number>()

/** A short id with a prefix, such as inv_3. Ids count up per prefix, from 1. */
export function newId(prefix: string): string {
  const next = (counters.get(prefix) ?? 0) + 1
  counters.set(prefix, next)
  return prefix + '_' + next
}
