export interface Customer {
  id: string
  name: string
  email: string
  currency: string
}

const customers = new Map<string, Customer>()
let next = 1

export function addCustomer(input: Omit<Customer, 'id'>): Customer {
  const customer = { ...input, id: 'cus_' + next++ }
  customers.set(customer.id, customer)
  return customer
}

export function findCustomer(id: string): Customer | undefined {
  return customers.get(id)
}
