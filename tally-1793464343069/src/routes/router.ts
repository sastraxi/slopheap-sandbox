export type Handler = (
  request: Request,
  params: Record<string, string>,
) => Promise<Response> | Response

interface Route {
  method: string
  pattern: RegExp
  keys: string[]
  handler: Handler
}

const routes: Route[] = []

export function route(method: string, path: string, handler: Handler): void {
  const keys: string[] = []
  const source = path.replace(/:(\w+)/g, (_, key: string) => {
    keys.push(key)
    return '([^/]+)'
  })
  routes.push({ method, pattern: new RegExp('^' + source + '$'), keys, handler })
}

export async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url)
  for (const it of routes) {
    if (it.method !== request.method) continue
    const match = it.pattern.exec(url.pathname)
    if (match === null) continue
    const params = Object.fromEntries(it.keys.map((key, index) => [key, match[index + 1] ?? '']))
    return it.handler(request, params)
  }
  const known = routes.some((it) => it.pattern.test(url.pathname))
  return known
    ? new Response('Method not allowed', { status: 405 })
    : new Response('Not found', { status: 404 })
}
