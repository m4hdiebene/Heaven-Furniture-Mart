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

        {/* Fonts — Fraunces: a high-contrast variable serif with optical-size
            and SOFT/WONK axes, so display cuts get proper editorial drawing
            instead of a flat single-weight webfont. Instrument Sans carries
            body, buttons and contact details. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
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
