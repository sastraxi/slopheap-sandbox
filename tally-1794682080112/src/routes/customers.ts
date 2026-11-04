import { findCustomer } from '../customers'
import { journal } from '../ledger/journal'
import { renderStatement, statement } from '../statements'
import { allInvoices } from './invoices'
import { route } from './router'

route('GET', '/customers/:id/statement', (request, { id }) => {
  const customer = findCustomer(id ?? '')
  if (customer === undefined) return new Response('No such customer', { status: 404 })
  const month = new URL(request.url).searchParams.get('month') ?? new Date().toISOString().slice(0, 7)
  return new Response(renderStatement(customer, month, statement(journal, customer, allInvoices(), month)))
})
