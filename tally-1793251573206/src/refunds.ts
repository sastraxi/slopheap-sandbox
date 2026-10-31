import { RECEIVABLE, SALES } from './ledger/accounts'
  return journal.record('Refund of ' + invoice.id + ': ' + reason, [debit(SALES, amount), credit(RECEIVABLE, amount)])
