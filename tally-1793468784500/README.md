# Tally

Invocies for small teams: customers, invoices, and an HTTP API.

## Running

    bun test
    bun run src/server.ts

## Layout

- src/money.ts formats and parses amounts.
- src/invoice.ts builds and totals invoices.
- src/customers.ts keeps customers.
