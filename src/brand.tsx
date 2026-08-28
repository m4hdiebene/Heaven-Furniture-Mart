/**
 * Single source of truth for brand facts, straight from the company brief.
 */
export const BRAND = {
  name: 'Heaven Furniture Mart',
  tagline: 'Designed. Crafted. Customized.',
  phoneDisplay: '+880 1960-481983',
  phoneHref: 'tel:+8801960481983',
  whatsapp:
    'https://wa.me/8801960481983?text=' +
    encodeURIComponent("Hi Heaven Furniture Mart — I'd like to book a free design consultation."),
  email: 'heavenfurnituremart@gmail.com',
  emailHref: 'mailto:heavenfurnituremart@gmail.com',
  addressLine1: 'Opposite of RAK Ceramics',
  addressLine2: 'Agrabad Access Road, Chattogram, Bangladesh',
  mapHref:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Heaven Furniture Mart, Agrabad Access Road, Chattogram, Bangladesh'),
  facebook: 'https://facebook.com/HeavenFurnitureMart',
  instagram: 'https://instagram.com/heaven_furniture_ltd',
  youtube: 'https://youtube.com/@HeavenFurnitureMart',
  founded: '2020',
  md: 'Abul Kalam Bhuiyan'
}

/* ---------------- Icons (inline, no icon-font payload) ---------------- */

type I = { class?: string; style?: string }
const S = {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '1.4',
  'stroke-linecap': 'round' as const,
  'stroke-linejoin': 'round' as const,
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true'
}

export const IconPhone = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const IconMail = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2.5 6.5 9.5 6.5 9.5-6.5" />
  </svg>
)

export const IconPin = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="2.75" />
  </svg>
)

export const IconClock = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7v5.2l3.4 2" />
  </svg>
)

export const IconArrow = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const IconCheck = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="m4 12.5 5.2 5.2L20 7" />
  </svg>
)

export const IconWhatsapp = (p: I) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class={p.class} style={p.style}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.1c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.16 1.75 2.79 4.23 3.8 2.06.84 2.48.67 2.93.63.44-.04 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.23-.16-.48-.29-.25-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.55.13-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.01-.39.11-.51.11-.11.25-.29.38-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.16-.39-.33-.4-.48-.4h-.42z" />
  </svg>
)

export const IconFacebook = (p: I) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class={p.class} style={p.style}>
    <path d="M14.1 21v-7.4h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46H17V4.55C16.72 4.5 15.7 4.4 14.5 4.4c-2.4 0-4.05 1.47-4.05 4.16v2.02H7.9v3h2.55V21h3.65z" />
  </svg>
)

export const IconInstagram = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const IconYoutube = (p: I) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class={p.class} style={p.style}>
    <path d="M21.6 7.2s-.2-1.4-.8-2c-.76-.8-1.6-.8-2-.85C16.1 4.2 12 4.2 12 4.2h-.01s-4.1 0-6.8.15c-.4.05-1.24.05-2 .85-.6.6-.8 2-.8 2S2.2 8.8 2.2 10.5v1.6c0 1.65.2 3.3.2 3.3s.2 1.4.8 2c.76.8 1.76.77 2.2.85 1.55.15 6.6.2 6.6.2s4.1 0 6.8-.16c.4-.05 1.24-.05 2-.85.6-.6.8-2 .8-2s.2-1.65.2-3.3v-1.6c0-1.65-.2-3.3-.2-3.3zM9.9 14.6V9l5.35 2.8-5.35 2.8z" />
  </svg>
)

/* --- Trust icons: material / craft themed line art --- */

export const IconSketch = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="M3 20.5h18" />
    <path d="m5 17 3.5-9.5L12 17" />
    <path d="M6.6 13.4h4.3" />
    <path d="M14.5 17V6.2a1.7 1.7 0 0 1 3.4 0V17" />
    <path d="M14.5 11h3.4" />
  </svg>
)

export const IconRuler = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <rect x="2.5" y="8.5" width="19" height="7" rx="1.2" />
    <path d="M7 8.5v3M11 8.5v3M15 8.5v3M19 8.5v3" />
  </svg>
)

export const IconWood = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <circle cx="12" cy="12" r="9.2" />
    <circle cx="12" cy="12" r="5.6" />
    <circle cx="12" cy="12" r="2.1" />
  </svg>
)

export const IconStore = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="M3.2 9.6 5 4.5h14l1.8 5.1" />
    <path d="M4 9.6h16V20H4z" />
    <path d="M9.5 20v-5.4h5V20" />
  </svg>
)

export const IconTruck = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="M2.5 6.5h11v9h-11z" />
    <path d="M13.5 10h4l3 3v2.5h-7z" />
    <circle cx="6.5" cy="17.8" r="1.7" />
    <circle cx="17" cy="17.8" r="1.7" />
  </svg>
)

export const IconCard = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="1.8" />
    <path d="M2.5 10h19" />
    <path d="M6 14.5h3.5" />
  </svg>
)

export const IconHeart = (p: I) => (
  <svg {...S} class={p.class} style={p.style}>
    <path d="M12 20.3s-7.8-4.6-7.8-9.6a4.3 4.3 0 0 1 7.8-2.5 4.3 4.3 0 0 1 7.8 2.5c0 5-7.8 9.6-7.8 9.6z" />
  </svg>
)

/* --- Logo lockup, rebuilt from the brand's own social artwork --- */
export const Logo = (props: { class?: string }) => (
  <span class={`logo ${props.class || ''}`} aria-label="Heaven Furniture Mart">
    <span class="logo-row">
      <svg class="logo-crest" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 4 33 36h-5.6L20 16.6 12.6 36H7z" fill="currentColor" opacity=".95" />
        <path d="M20 12.5 27 30" stroke="currentColor" stroke-width="1.5" opacity=".55" />
      </svg>
      <span class="logo-mark">
        HE<span class="logo-a">A</span>VEN
      </span>
    </span>
    <span class="logo-sub">Furniture Mart</span>
  </span>
)
