import { route } from './router'

route('GET', '/health', () => new Response('ok'))
