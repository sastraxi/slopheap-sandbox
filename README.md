# slopheap-sandbox
Slopheap's test repository. Safe to break.

## Tally

Invoices for small teams: customers and invoices.

    bun test

- `src/money.ts` formats and parses cents.
- `src/amounts.ts` rounds, sums, and allocates cents.
- `src/settings.ts` reads `settings.json`: the default currency and the rounding rule.
- `src/invoice.ts` builds and totals invoices.
