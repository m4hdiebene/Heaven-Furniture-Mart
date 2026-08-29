import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  const title = 'Heaven Furniture Mart — Bespoke Luxury Furniture in Chattogram'
  const desc =
    'Designed. Crafted. Customized. Heaven Furniture Mart creates bespoke luxury furniture and interior styling for homes and offices in Chattogram — built to your space, not pulled off a shelf. Free design consultation.'
  const url = 'https://heaven-furniture-mart.pages.dev'

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="theme-color" content="#0F1C1B" />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={`${url}/static/img/hero.webp`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Heaven Furniture Mart" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon — brass crest on dark */}
        <link
          rel="icon"
          href={
            'data:image/svg+xml,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0F1C1B"/><path d="M32 14 46 50h-7.5L32 31.5 25.5 50H18z" fill="#C29B4B"/></svg>`
            )
          }
        />

        {/* Fonts are self-hosted, axis-limited variable subsets (see style.css).
            Preloading the two cuts that draw above-the-fold text — the display
            serif and the body sans — means the hero renders in the real
            typeface on first paint instead of swapping a beat later. The
            italic cut is left to load on demand; it first appears below the
            fold. No third-party font origin sits on the critical path. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/static/fonts/fraunces-roman.woff2"
          crossorigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/static/fonts/instrument-sans.woff2"
          crossorigin="anonymous"
        />

        {/* Preload hero art so the first paint is the photography */}
        <link
          rel="preload"
          as="image"
          href="/static/img/hero.webp"
          imagesrcset="/static/img/hero-sm.webp 1100w, /static/img/hero.webp 2000w"
          imagesizes="100vw"
          fetchpriority="high"
        />

        <link href="/static/style.css" rel="stylesheet" />

        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FurnitureStore',
              name: 'Heaven Furniture Mart',
              description: desc,
              url,
              image: `${url}/static/img/hero.webp`,
              telephone: '+8801960481983',
              email: 'heavenfurnituremart@gmail.com',
              foundingDate: '2020',
              founder: { '@type': 'Person', name: 'Abul Kalam Bhuiyan' },
              priceRange: '$$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Opposite of RAK Ceramics, Agrabad Access Road',
                addressLocality: 'Chattogram',
                addressCountry: 'BD'
              },
              sameAs: [
                'https://facebook.com/HeavenFurnitureMart',
                'https://instagram.com/heaven_furniture_ltd',
                'https://youtube.com/@HeavenFurnitureMart'
              ],
              makesOffer: [
                'Living Room Furniture',
                'Bedroom Furniture',
                'Dining Furniture',
                'Office & Study Furniture',
                'Bespoke Custom Furniture'
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
})
