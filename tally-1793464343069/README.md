# Tally

Invocies for small teams: customers, invoices, and an HTTP API.

## Running

    bun test
    bun run src/server.ts

## Layout

- src/money.ts formats and parses amounts.
- src/invoice.ts builds and totals invoices.
- src/customers.ts keeps customers.
- src/routes/ serves the HTTP API.
- src/total.ts adds up a list of amounts, to the cent.
- src/tax.ts is kept for taxes, run 1794166581479.
