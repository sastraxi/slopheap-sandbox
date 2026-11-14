import { expect, test } from 'bun:test'
import { handle, route } from '../src/routes/router'

route('GET', '/things/:id', (_request, { id }) => new Response(id))

test('routes by method and path', async () => {
  expect(await (await handle(new Request('http://x/things/7'))).text()).toBe('7')
  expect((await handle(new Request('http://x/things/7', { method: 'DELETE' }))).status).toBe(405)
  expect((await handle(new Request('http://x/nothing'))).status).toBe(404)
})
