import { Hono } from 'hono'
import { renderer } from './renderer'
import {
  BRAND,
  Logo,
  IconPhone,
  IconMail,
  IconPin,
  IconClock,
  IconArrow,
  IconCheck,
  IconWhatsapp,
  IconFacebook,
  IconInstagram,
  IconYoutube,
  IconSketch,
  IconRuler,
  IconWood,
  IconStore,
  IconTruck,
  IconCard,
  IconHeart
} from './brand'
import { api } from './api'

type Bindings = { DB?: D1Database }
const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)
app.route('/api', api)

/* ---------------- Content model ---------------- */

const NAV = [
  { href: '#collections', label: 'Collections' },
  { href: '#bespoke', label: 'Bespoke' },
  { href: '#why', label: 'Why Heaven' },
  { href: '#story', label: 'Our Story' },
  { href: '#visit', label: 'Visit' }
]

const TRUST = [
  {
    Ico: IconSketch,
    t: 'Free design consultation',
    d: 'Sit with our designers, talk through your space, and see ideas take shape — before you spend anything.'
  },
  {
    Ico: IconRuler,
    t: 'Fully bespoke, never mass-produced',
    d: 'Every piece is built to your room, your measurements and your taste. Nothing here came off a shelf.'
  },
  {
    Ico: IconWood,
    t: 'Premium wood & materials',
    d: 'Seasoned hardwood, considered fabrics and hardware chosen to age beautifully, joined by skilled in-house hands.'
  },
  {
    Ico: IconStore,
    t: 'Large Agrabad showroom',
    d: 'Come and press a cushion, run a hand along a carved edge. Our Chattogram floor is open for you to explore.'
  },
  {
    Ico: IconTruck,
    t: 'Delivery & installation included',
    d: 'We carry it in, place it, and set it up properly. You simply decide where it looks best.'
  },
  {
    Ico: IconCard,
    t: 'Easy payment options',
    d: 'Flexible plans that make a lifetime piece comfortable to commit to today.'
  }
]

const COLLECTIONS = [
  {
    img: '/static/img/living-sofa.webp',
    kicker: 'Collection 01',
    t: 'Living Room',
    d: 'Hand-carved sofa sets, coffee tables, TV units and consoles that anchor the room everyone gathers in.',
    cls: 'coll--wide',
    alt: 'Carved wooden sofa set with cream upholstery and a glass-top coffee table in a Heaven Furniture Mart living room setting'
  },
  {
    img: '/static/img/bedroom-green.webp',
    kicker: 'Collection 02',
    t: 'Bedroom',
    d: 'Beds, wardrobes, dressing tables and bedside pieces — quiet luxury where the day ends.',
    cls: '',
    alt: 'Emerald green velvet upholstered king bed with quilted footboard in a warmly lit bedroom'
  },
  {
    img: '/static/img/dining-marble.webp',
    kicker: 'Collection 03',
    t: 'Dining',
    d: 'Marble-topped tables, statement chairs and cabinets built for long meals and full houses.',
    cls: '',
    alt: 'Marble-top dining table with carved wooden legs and studded burgundy leather high-back chairs'
  },
  {
    img: '/static/img/office.webp',
    kicker: 'Collection 04',
    t: 'Office & Study',
    d: 'Executive tables, bookshelves and workstations with the presence a serious desk deserves.',
    cls: '',
    alt: 'Dark walnut executive desk with tufted leather chair and a tall bookshelf in a luxury home office'
  },
  {
    img: '/static/img/dining-blush.webp',
    kicker: 'Collection 05',
    t: 'Statement Pieces',
    d: 'The one-off designs our clients ask us to make again and again — then ask us to make differently.',
    cls: '',
    alt: 'Marble dining table with blush pink quilted velvet chairs under a chandelier'
  },
  {
    img: '/static/img/bedroom-classic.webp',
    kicker: 'Collection 06',
    t: 'Classic Woodwork',
    d: 'Traditional silhouettes in deep polished timber, carved by hand in our own workshop.',
    cls: '',
    alt: 'Classic dark wood bed with tall carved wardrobe and warm bedside lamp'
  }
]

const STEPS = [
  { t: 'We listen', d: 'Your space, how you live in it, what you want it to feel like. Bring a photo or just an idea.' },
  { t: 'We design', d: 'Drawings and material options made for your exact dimensions — reviewed together, free of charge.' },
  { t: 'We craft', d: 'Our in-house artisans build your piece in premium hardwood, detail by detail.' },
  { t: 'We install', d: 'Delivered and set up in your home by our own team. Nothing left for you to figure out.' }
]

const MILESTONES = [
  { y: '2020', t: `Founded in Chattogram by Managing Director ${BRAND.md}.` },
  { y: '2021', t: 'Opened our flagship showroom on Agrabad Access Road.' },
  { y: '2024–25', t: 'Exhibited at the International Furniture Fair, Chattogram.' },
  { y: '2025', t: 'Became a member of the Chamber of Commerce.' },
  { y: '2026', t: 'Received nationwide BFIOA recognition.' }
]

const CATS = ['Living Room', 'Bedroom', 'Dining', 'Office & Study', 'Bespoke / Something else']

/* ---------------- Page ---------------- */

app.get('/', (c) => {
  return c.render(
    <>
      {/* ============ NAV ============ */}
      <header class="nav" id="site-nav">
        <div class="nav-inner wrap">
          <a href="#top" aria-label="Heaven Furniture Mart — home">
            <Logo />
          </a>

          <nav class="nav-links" aria-label="Main navigation">
            {NAV.map((n) => (
              <a href={n.href}>{n.label}</a>
            ))}
          </nav>

          <div class="nav-cta">
            <a class="nav-phone" href={BRAND.phoneHref}>
              <IconPhone />
              <span>{BRAND.phoneDisplay}</span>
            </a>
            <a class="btn" href="#visit">
              <span>Request a Quote</span>
            </a>
          </div>

          <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div class="drawer" id="drawer">
        <nav class="drawer-links" aria-label="Mobile navigation">
          {NAV.map((n) => (
            <a href={n.href} data-close>
              {n.label}
            </a>
          ))}
        </nav>
        <div class="drawer-foot">
          <a href={BRAND.phoneHref}>{BRAND.phoneDisplay}</a>
          <a href={BRAND.emailHref}>{BRAND.email}</a>
          <a class="btn" href="#visit" data-close>
            <span>Request a Quote</span>
          </a>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section class="hero" id="top">
        <div class="hero-media">
          <img
            src="/static/img/hero.webp"
            srcset="/static/img/hero-sm.webp 1100w, /static/img/hero.webp 2000w"
            sizes="100vw"
            alt="Opulent living room with a hand-carved wooden sofa set, marble floor and warm chandelier light in a Heaven Furniture Mart interior"
            width="2000"
            height="1117"
            fetchpriority="high"
            decoding="async"
          />
        </div>

        <div class="hero-inner">
          <div class="hero-grid">
            <div>
              <p class="eyebrow">Chattogram · Since {BRAND.founded}</p>
              <h1 class="display d-xl hero-copy">
                Furniture, <em>crafted</em> around you.
              </h1>
              <p class="lede">
                Bespoke furniture and interior styling from Chattogram — designed for your space, built by hand, and
                delivered to your door.
              </p>
              <div class="hero-actions">
                <a class="btn" href="#visit">
                  <span>Book a free consultation</span>
                </a>
                <a class="btn btn--ghost-light" href="#collections">
                  <span>Explore collections</span>
                </a>
              </div>
            </div>
          </div>

          <div class="hero-strip">
            <div class="hero-stat">
              <span class="n">Bespoke</span>
              <span class="l">Built to your space</span>
            </div>
            <div class="hero-stat">
              <span class="n">Free</span>
              <span class="l">Design consultation</span>
            </div>
            <div class="hero-stat">
              <span class="n">Hundreds</span>
              <span class="l">Of happy homeowners</span>
            </div>
            <div class="hero-stat">
              <span class="n">Agrabad</span>
              <span class="l">Showroom in Chattogram</span>
            </div>
          </div>
        </div>

        <span class="scroll-hint" aria-hidden="true">Scroll</span>
      </section>

      {/* ============ INTRO ============ */}
      <section class="section" id="intro">
        <div class="wrap intro-grid">
          <div class="reveal">
            <p class="eyebrow">Who we are</p>
            <p class="intro-signature" style="margin-top:1.5rem">
              One of Chattogram's leading bespoke furniture houses.
            </p>
            <div class="intro-tagline" aria-label={BRAND.tagline}>
              <span>Designed.</span>
              <i></i>
              <span>Crafted.</span>
              <i></i>
              <span>Customized.</span>
            </div>
          </div>

          <div class="reveal" data-d="1">
            <p class="lede">
              We design and craft custom furniture — sofas, beds, dining sets, office pieces — built around what you
              actually want, not what happened to be in stock. Every commission starts with a conversation and a
              measurement, and ends with a piece that belongs in your room.
            </p>
            <p class="lede" style="margin-top:1.5rem">
              Walk into our Agrabad showroom and you'll find an interior studio rather than a shop floor: real
              materials, real craftsmanship, and designers who would rather understand your home than sell you a
              catalogue number.
            </p>
            <div style="margin-top:2.25rem">
              <a class="tlink" href="#bespoke">
                <span>How a bespoke commission works</span>
                <IconArrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      <section class="section section--tint" id="collections">
        <div class="wrap">
          <div class="why-head">
            <div class="reveal">
              <p class="eyebrow">Collections</p>
              <h2 class="display d-lg" style="margin-top:1.35rem">
                Rooms we make <em>unforgettable</em>
              </h2>
            </div>
            <p class="lede reveal" data-d="1">
              A glimpse of what leaves our workshop. Every piece shown can be rebuilt in your dimensions, your timber
              and your fabric.
            </p>
          </div>

          <div class="coll-grid">
            {COLLECTIONS.map((k, i) => (
              <a class={`coll reveal ${k.cls}`} data-d={String(Math.min(i, 3))} href="#visit">
                <img src={k.img} alt={k.alt} loading="lazy" decoding="async" width="900" height="900" />
                <div class="coll-body">
                  <span class="coll-kicker">{k.kicker}</span>
                  <h3>{k.t}</h3>
                  <p>{k.d}</p>
                  <span class="coll-arrow">
                    <span>Enquire</span>
                    <IconArrow />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BESPOKE MOMENT ============ */}
      <section class="section bespoke" id="bespoke">
        <div class="wrap bespoke-grid">
          <div class="bespoke-media reveal">
            <img
              src="/static/img/craft.webp"
              alt="Close-up of a craftsman's hands carving detail into a dark walnut furniture edge with a chisel"
              loading="lazy"
              decoding="async"
              width="1600"
              height="1073"
            />
          </div>

          <div class="reveal" data-d="1">
            <p class="eyebrow">The bespoke difference</p>
            <h2 class="display d-lg">
              Built for your room, <em>not a warehouse</em>
            </h2>
            <p class="lede">
              Mass-produced furniture asks you to compromise — on size, on finish, on the awkward corner it never quite
              fits. Bespoke asks you a question instead: what would perfect look like here?
            </p>
            <div class="steps">
              {STEPS.map((s, i) => (
                <div class="step">
                  <span class="step-n">0{i + 1}</span>
                  <div>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style="margin-top:2.5rem;display:flex;flex-wrap:wrap;gap:0.85rem">
              <a class="btn" href="#visit">
                <span>Start your commission</span>
              </a>
              <a class="btn btn--ghost-light" href={BRAND.whatsapp} target="_blank" rel="noopener">
                <IconWhatsapp class="btn-ico" />
                <span>WhatsApp us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY HEAVEN ============ */}
      <section class="section" id="why">
        <div class="wrap">
          <div class="why-head">
            <div class="reveal">
              <p class="eyebrow">Why homeowners choose Heaven</p>
              <h2 class="display d-lg" style="margin-top:1.35rem">
                Six reasons this <em>feels different</em>
              </h2>
            </div>
            <p class="lede reveal" data-d="1">
              From first sketch to final installation, the whole thing is handled under one roof — ours.
            </p>
          </div>

          <div class="trust-grid">
            {TRUST.map((t, i) => (
              <article class="trust reveal" data-d={String(Math.min(i, 3))}>
                <t.Ico class="trust-ico" />
                <h3>{t.t}</h3>
                <p>{t.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROOF / STORY ============ */}
      <section class="section section--tint" id="story">
        <div class="wrap">
          <div class="quote-grid">
            <div class="quote-media reveal">
              <img
                src="/static/img/showroom.webp"
                alt="Wide view of the Heaven Furniture Mart showroom floor in Agrabad with styled living and dining sets"
                loading="lazy"
                decoding="async"
                width="1600"
                height="1073"
              />
            </div>

            <div class="reveal" data-d="1">
              <p class="eyebrow">From the Managing Director</p>
              <span class="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote class="pull">
                At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of
                lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the
                homes of our clients.
              </blockquote>
              <div class="quote-attr">
                <IconHeart class="quote-ico" />
                <div>
                  <div class="who">{BRAND.md}</div>
                  <div class="role">Managing Director &amp; Founder</div>
                </div>
              </div>
            </div>
          </div>

          <div class="reveal" data-d="1" style="margin-top:clamp(3rem,8vh,5rem)">
            <p class="eyebrow">Our journey</p>
          </div>
          <div class="timeline">
            {MILESTONES.map((m, i) => (
              <div class="ms reveal" data-d={String(Math.min(i, 4))}>
                <span class="ms-year">{m.y}</span>
                <span class="ms-text">{m.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA / FORM ============ */}
      <section class="section cta" id="visit">
        <div class="cta-bg" aria-hidden="true">
          <img
            src="/static/img/cta-bg.webp"
            alt=""
            loading="lazy"
            decoding="async"
            width="1900"
            height="900"
          />
        </div>

        <div class="wrap cta-grid">
          <div class="reveal">
            <p class="eyebrow">Request a quote</p>
            <h2 class="display d-lg">
              Tell us about <em>your space</em>
            </h2>
            <p class="lede">
              Share a few details and our design team will call you back with ideas and an estimate. The consultation
              is free — and there's no obligation to order.
            </p>

            <div class="cta-contacts">
              <div class="cc">
                <IconPin />
                <div>
                  <span class="lbl">Showroom</span>
                  <a href={BRAND.mapHref} target="_blank" rel="noopener">
                    {BRAND.addressLine1}
                    <br />
                    {BRAND.addressLine2}
                  </a>
                </div>
              </div>
              <div class="cc">
                <IconPhone />
                <div>
                  <span class="lbl">Call us</span>
                  <a href={BRAND.phoneHref}>{BRAND.phoneDisplay}</a>
                </div>
              </div>
              <div class="cc">
                <IconMail />
                <div>
                  <span class="lbl">Email</span>
                  <a href={BRAND.emailHref}>{BRAND.email}</a>
                </div>
              </div>
              <div class="cc">
                <IconClock />
                <div>
                  <span class="lbl">Showroom hours</span>
                  <span>Saturday – Thursday, 10:00 – 20:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div class="form-panel reveal" data-d="1" id="quote-panel">
            <h3>Book your free design consultation</h3>
            <p class="hint">We reply within one working day.</p>

            <form id="quote-form" novalidate>
              <div class="fields">
                <div class="frow">
                  <div class="field">
                    <label for="q-name">Your name</label>
                    <input id="q-name" name="name" type="text" placeholder="e.g. Rahim Ahmed" autocomplete="name" required />
                    <span class="err" data-err-for="name"></span>
                  </div>
                  <div class="field">
                    <label for="q-phone">Phone / WhatsApp</label>
                    <input
                      id="q-phone"
                      name="phone"
                      type="tel"
                      placeholder="01XXX-XXXXXX"
                      autocomplete="tel"
                      inputmode="tel"
                      required
                    />
                    <span class="err" data-err-for="phone"></span>
                  </div>
                </div>

                <div class="frow">
                  <div class="field">
                    <label for="q-cat">What are you furnishing?</label>
                    <select id="q-cat" name="category" required>
                      <option value="">Select a category</option>
                      {CATS.map((x) => (
                        <option value={x}>{x}</option>
                      ))}
                    </select>
                    <span class="err" data-err-for="category"></span>
                  </div>
                  <div class="field">
                    <label for="q-email">Email (optional)</label>
                    <input id="q-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" />
                    <span class="err" data-err-for="email"></span>
                  </div>
                </div>

                <div class="field">
                  <label for="q-msg">Tell us a little more (optional)</label>
                  <textarea
                    id="q-msg"
                    name="message"
                    rows={2}
                    placeholder="Room size, style you like, timeline, budget range…"
                  ></textarea>
                  <span class="err" data-err-for="message"></span>
                </div>
              </div>

              <button class="btn btn--block" type="submit" id="quote-submit">
                <span class="spin" aria-hidden="true"></span>
                <span>Request my free consultation</span>
                <IconArrow class="btn-ico" />
              </button>

              <p class="form-foot">
                By sending this you agree to be contacted about your enquiry. We never share your details.
              </p>

              <div class="form-alt">
                <span>Prefer to talk now?</span>
                <a class="tlink" href={BRAND.whatsapp} target="_blank" rel="noopener">
                  <IconWhatsapp />
                  <span>WhatsApp</span>
                </a>
                <a class="tlink" href={BRAND.phoneHref}>
                  <IconPhone />
                  <span>Call</span>
                </a>
              </div>
            </form>

            <div class="form-success" role="status" aria-live="polite">
              <div class="tick">
                <IconCheck />
              </div>
              <h3>Thank you — request received.</h3>
              <p id="success-note">
                Our design team will call you within one working day to arrange your free consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer class="footer">
        <div class="wrap">
          <div class="foot-grid">
            <div class="foot-col foot-brand">
              <Logo />
              <p>
                Bespoke luxury furniture &amp; interior styling, designed and crafted in Chattogram since{' '}
                {BRAND.founded}.
              </p>
              <div class="socials">
                <a href={BRAND.facebook} target="_blank" rel="noopener" aria-label="Heaven Furniture Mart on Facebook">
                  <IconFacebook />
                </a>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="Heaven Furniture Mart on Instagram"
                >
                  <IconInstagram />
                </a>
                <a href={BRAND.youtube} target="_blank" rel="noopener" aria-label="Heaven Furniture Mart on YouTube">
                  <IconYoutube />
                </a>
                <a href={BRAND.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp Heaven Furniture Mart">
                  <IconWhatsapp />
                </a>
              </div>
            </div>

            <div class="foot-col">
              <h4>Collections</h4>
              <ul>
                <li>
                  <a href="#collections">Living Room</a>
                </li>
                <li>
                  <a href="#collections">Bedroom</a>
                </li>
                <li>
                  <a href="#collections">Dining</a>
                </li>
                <li>
                  <a href="#collections">Office &amp; Study</a>
                </li>
                <li>
                  <a href="#bespoke">Bespoke / Custom</a>
                </li>
              </ul>
            </div>

            <div class="foot-col">
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#why">Why Heaven</a>
                </li>
                <li>
                  <a href="#bespoke">Our process</a>
                </li>
                <li>
                  <a href="#story">Our story</a>
                </li>
                <li>
                  <a href="#visit">Request a quote</a>
                </li>
              </ul>
            </div>

            <div class="foot-col">
              <h4>Visit &amp; contact</h4>
              <ul>
                <li>
                  <a href={BRAND.mapHref} target="_blank" rel="noopener">
                    {BRAND.addressLine1}, {BRAND.addressLine2}
                  </a>
                </li>
                <li>
                  <a href={BRAND.phoneHref}>{BRAND.phoneDisplay}</a>
                </li>
                <li>
                  <a href={BRAND.emailHref}>{BRAND.email}</a>
                </li>
                <li>
                  <p>Sat – Thu, 10:00 – 20:00</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="foot-bar">
            <span>
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </span>
            <span>{BRAND.tagline}</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp CTA */}
      <a class="fab" id="fab" href={BRAND.whatsapp} target="_blank" rel="noopener">
        <IconWhatsapp />
        <span class="fab-txt">WhatsApp us</span>
      </a>

      <script src="/static/app.js" defer></script>
    </>
  )
})

export default app
