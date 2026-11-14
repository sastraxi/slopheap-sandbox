# Tally

Invoices for small teams: customers, invoices, and an HTTP API.

## Running

    bun test
    bun run start

## Layout

- src/money.ts formats and parses amounts.
- src/invoice.ts builds and totals invoices.
- src/customers.ts keeps customers.
- src/routes/ serves the HTTP API.

## Ledger

Every invoice is journaled in src/ledger/ as issued: receivable against
sales and tax, in double entry. The journal refuses an entry whose
debits and credits differ.
