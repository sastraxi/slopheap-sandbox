import { invoiceTotal, type Invoice } from './invoice'

/** The sum of the invoices' totals, rounded to the cent. */
export function totalOf(invoices: readonly Invoice[]): number {
  return invoices.reduce((total, invoice) => total + invoiceTotal(invoice), 0)
}

/** The average invoice total, to the cent. */
export function averageOf(invoices: readonly Invoice[]): number {
  if (invoices.length === 0) return 0
  return Math.round(totalOf(invoices) / invoices.length)
}
