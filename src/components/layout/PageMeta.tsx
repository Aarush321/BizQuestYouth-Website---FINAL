import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import site from '../../data/site.json'

const SITE_URL = site.url
const META: Record<string, { title: string; description: string }> = site.pages

export default function PageMeta() {
  const { pathname } = useLocation()
  const meta = META[pathname] ?? {
    title: 'BizQuest Youth',
    description: site.defaultDescription,
  }

  useEffect(() => {
    document.title = meta.title

    let descriptionTag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.setAttribute('name', 'description')
      document.head.appendChild(descriptionTag)
    }
    descriptionTag.setAttribute('content', meta.description)

    let canonicalTag = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', `${SITE_URL}${pathname}`)
  }, [meta.title, meta.description, pathname])

  return null
}
