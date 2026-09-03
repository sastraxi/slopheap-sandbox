import './routes/invoices'
import { handle } from './routes/router'

Bun.serve({ port: Number(process.env.PORT ?? 3000), fetch: handle })
