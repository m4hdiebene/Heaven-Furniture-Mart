# Heaven Furniture Mart — Landing Page

A single, conversion-focused landing page for **Heaven Furniture Mart**, a bespoke furniture
and interior styling house in Chattogram, Bangladesh. Built for the RACDOX Hackathon brief.

## Project Overview

- **Name**: Heaven Furniture Mart landing page
- **Goal**: Make a first-time visitor understand the brand within 30 seconds and push them
  toward **one** clear action — booking a free design consultation.
- **Scope**: Deliberately ONE page, not a website. No catalogue, no cart, no product pages.
- **Positioning**: Should feel like walking into a luxury furniture and interior *studio*,
  not an online furniture shop.

### Brand facts (from the company brief)

| | |
|---|---|
| Tagline | Designed. Crafted. Customized. |
| Founded | 2020, by MD Abul Kalam Bhuiyan |
| Showroom | Opposite RAK Ceramics, Agrabad Access Road, Chattogram |
| Phone / WhatsApp | +880 1960-481983 |
| Email | heavenfurnituremart@gmail.com |
| Socials | facebook.com/HeavenFurnitureMart · instagram.com/heaven_furniture_ltd · youtube.com/@HeavenFurnitureMart |

## Page structure

| # | Section | Purpose |
|---|---------|---------|
| 1 | Hero (`#top`) | Brand, promise, and the primary CTA above the fold |
| 2 | Brand intro (`#intro`) | Who we are, what we sell, founder credit, 4-up proof band |
| 3 | Collections (`#collections`) | 6 categories over a fully-packed 12-column grid |
| 4 | Bespoke (`#bespoke`) | The #1 differentiator, given its own full-bleed moment + 4-step process |
| 5 | Why Heaven (`#why`) | The 6 trust points from the brief |
| 6 | Our story (`#story`) | MD quote (verbatim) + 2020→2026 milestone timeline |
| 7 | Visit / Quote (`#visit`) | Lead-capture form, address, hours, direct contact |
| 8 | Footer | Navigation, socials, legal |

The CTA is repeated (nav, hero, bespoke, form, floating WhatsApp) but never *competes* —
every button funnels to the same free-consultation action.

## Functional entry points

| Method | Path | Body / Params | Returns |
|--------|------|---------------|---------|
| `GET` | `/` | — | The landing page (SSR via Hono JSX) |
| `POST` | `/api/quote` | `{ name, phone, category?, email?, message? }` | `{ ok, stored, message }` — persists a lead to D1 |
| `GET` | `/api/leads` | — | `{ ok, leads[] }` — submitted leads, newest first |
| `GET` | `/api/health` | — | `{ ok, db }` — liveness + D1 binding check |

**Validation** — `name` required; `phone` must match a Bangladeshi mobile
(`/^(?:\+?88)?01[3-9]\d{8}$/`). Enforced on both client and server; the server never
trusts the client copy.

## Data architecture

- **Storage**: Cloudflare D1 (SQLite at the edge), binding `DB`
- **Model** — `leads` table:

  | Column | Type | Notes |
  |---|---|---|
  | `id` | INTEGER PK | autoincrement |
  | `name` | TEXT | required |
  | `phone` | TEXT | required, BD mobile format |
  | `email` | TEXT | optional |
  | `category` | TEXT | optional, one of the 5 collections |
  | `message` | TEXT | optional free text |
  | `created_at` | DATETIME | defaults to `CURRENT_TIMESTAMP` |

- **Flow**: form → client validation → `POST /api/quote` → server re-validation →
  D1 insert → confirmation state rendered in place (no page reload).
- Migrations live in `migrations/`. No KV and no cron `triggers`, so the project stays
  compatible with one-click hosted deploy.

## Design system

- **Palette**: Deep Charcoal-Teal `#101E1C` · Warm Ivory `#F8F4EC` · Muted Brass `#C09248`
  (accent only) · Deep Brown `#211710` · Natural Wood Tan
- **Typography**: **Fraunces** variable serif for display (driven per role through the
  `opsz`, `SOFT` and `WONK` axes, so large cuts get genuine editorial drawing rather than
  one flat weight) + **Instrument Sans** for body, buttons and contact details.
- **Motion**: one shared timing scale (`--t-fast` / `--t` / `--t-slow` with
  `--ease` / `--ease-out`). Hover states animate `opacity` and `transform` on
  pseudo-elements only — never `padding`, `background` or anything that triggers layout —
  so transitions stay on the compositor and feel smooth instead of steppy.
  `@media (hover: none)` neutralises hover on touch devices.
- **No CSS framework**: hand-written CSS, no Tailwind CDN, because an in-browser
  compile step would work against the brief's "clean and fast" criterion.

## Accessibility & performance

- All text passes WCAG AA. Primary buttons use deep ink on brass (6.4:1) rather than
  white on brass (2.82:1, which fails and reads washed-out).
- Verified with automated contrast and layout audits at 320 / 390 / 820 / 1512 / 1920 px:
  no horizontal overflow, no broken images, no console errors.
- Semantic landmarks, labelled form controls, visible focus rings, `prefers-reduced-motion`
  honoured, print stylesheet included.
- All photography served as WebP; unused assets pruned from the bundle.
- SEO: meta description, Open Graph / Twitter cards, and `FurnitureStore` JSON-LD.

## User guide

1. Land on the page — the brand, location and offer are legible immediately.
2. Browse **Collections** to see the five categories plus bespoke one-offs.
3. Read **Bespoke** to understand the four-step commission process.
4. Click any **Book a free consultation** / **Request a quote** button, or jump to **Visit**.
5. Submit name + phone (plus optional category, email, notes). The team replies within
   one working day. **WhatsApp** and **Call** are available for anyone who prefers to talk.

## Local development

```bash
npm install
npm run build                        # required before first start
npx wrangler d1 migrations apply DB --local
pm2 start ecosystem.config.cjs       # serves on :3000
curl http://localhost:3000/api/health
```

## Tech stack & deployment

- **Platform**: Cloudflare Pages / Workers
- **Stack**: Hono 4 + JSX SSR · Vite 8 · Wrangler 4 · Cloudflare D1 · hand-written CSS
- **Status**: ✅ Running locally, ready to deploy
- **Last updated**: 2026-08-28
