import { useEffect } from 'react'

// Updates document.title and injects/updates OG + description meta tags for the
// current page, restoring the previous values on unmount.
//
// Honest limitation: this runs client-side after React mounts. Real browsers and
// crawlers that execute JS (Google, modern Twitter/X) will see it fine. Some link
// unfurlers (LinkedIn, WhatsApp, older Facebook) fetch raw HTML without running
// JS and may fall back to the static tags in index.html instead. Fixing that
// fully needs prerendering/SSR — worth revisiting if social preview cards matter
// more later, but this covers tab titles, most SEO, and most modern crawlers now.
export function useDocumentMeta({ title, description, image, url }) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title

    const created = []

    function upsert(attr, key, value) {
      if (!value) return
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
        created.push(el)
      }
      el.setAttribute('content', value)
    }

    upsert('name', 'description', description)
    upsert('property', 'og:title', title)
    upsert('property', 'og:description', description)
    upsert('property', 'og:image', image)
    upsert('property', 'og:url', url)
    upsert('name', 'twitter:card', image ? 'summary_large_image' : 'summary')

    return () => {
      document.title = prevTitle
      created.forEach((el) => el.remove())
    }
  }, [title, description, image, url])
}
