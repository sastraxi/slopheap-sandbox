test('rounds a half cent by the rounding rule', () => {
  const invoice = createInvoice(customer, [{ description: 'Sticker', quantity: 1, unitCents: 3 }], 0.5)
  expect(invoiceTotal(invoice)).toBe(4)
})

