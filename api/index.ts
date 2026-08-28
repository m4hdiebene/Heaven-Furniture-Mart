import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { api } from '../src/api'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')
app.route('/', api)

export default handle(app)
