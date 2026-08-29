import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = { DB?: D1Database }

export const api = new Hono<{ Bindings: Bindings }>()

api.use('/*', cors())

const TABLE = `CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,
  message TEXT,
  source TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`

/** Bangladeshi mobile numbers: 01XXXXXXXXX, optionally +88 / 88 prefixed. */
function validPhone(raw: string) {
  const d = raw.replace(/[\s\-().]/g, '')
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(d)
}

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

api.post('/quote', async (c) => {
  let body: Record<string, unknown>
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid request.' }, 400)
  }

  // Honeypot: a real visitor never sees the "website" field, so anything in it
  // came from a bot filling every input it found. Answer 200 with the normal
  // shape — telling a scraper it was detected only invites a retry — but skip
  // the database entirely.
  if (clean(body.website, 200)) {
    return c.json({ ok: true, stored: false, message: 'Thank you — we will be in touch shortly.' })
  }

  const name = clean(body.name, 120)
  const phone = clean(body.phone, 40)
  const email = clean(body.email, 160)
  const category = clean(body.category, 80)
  const message = clean(body.message, 2000)

  // Field-level validation so the UI can highlight the offending input.
  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (!validPhone(phone)) errors.phone = 'Enter a valid BD number, e.g. 01712-345678.'
  if (!category) errors.category = 'Please choose a category.'
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'That email looks incomplete.'

  if (Object.keys(errors).length) return c.json({ ok: false, errors }, 422)

  // Persist when D1 is bound; the form still succeeds for the visitor if it isn't,
  // because the phone/WhatsApp CTAs remain the primary conversion path.
  let stored = false
  const db = c.env?.DB
  if (db) {
    try {
      await db.prepare(TABLE).run()
      await db
        .prepare(
          'INSERT INTO leads (name, phone, email, category, message, source) VALUES (?, ?, ?, ?, ?, ?)'
        )
        .bind(name, phone, email || null, category, message || null, 'landing-page')
        .run()
      stored = true
    } catch (err) {
      console.error('D1 insert failed:', err)
    }
  }

  return c.json({
    ok: true,
    stored,
    message: `Thank you, ${name.split(/\s+/)[0]} — we'll be in touch shortly.`
  })
})

/** Lightweight ops endpoint to confirm captured leads. */
api.get('/leads', async (c) => {
  const db = c.env?.DB
  if (!db) return c.json({ ok: false, error: 'No database bound.' }, 503)
  try {
    await db.prepare(TABLE).run()
    const { results } = await db
      .prepare('SELECT id, name, phone, email, category, message, created_at FROM leads ORDER BY id DESC LIMIT 100')
      .all()
    return c.json({ ok: true, count: results?.length ?? 0, leads: results ?? [] })
  } catch (err) {
    return c.json({ ok: false, error: String(err) }, 500)
  }
})

api.get('/health', (c) => c.json({ ok: true, db: Boolean(c.env?.DB) }))
