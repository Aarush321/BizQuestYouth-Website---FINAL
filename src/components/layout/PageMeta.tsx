import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_DESCRIPTION =
  'BizQuest empowers underserved middle school students with AI, technology, and entrepreneurship skills through real community projects.'

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'BizQuest — Empowering Young Innovators through AI',
    description: DEFAULT_DESCRIPTION,
  },
  '/fundraise': {
    title: 'Reach Out to Support — BizQuest',
    description:
      'Partner with BizQuest to collaborate with local businesses, support underserved entrepreneurs, and fund IT access for underserved students and communities.',
  },
  '/chapters': {
    title: 'Chapters — BizQuest',
    description:
      'Find a BizQuest chapter near you, browse our network across the country, or start a chapter in your community.',
  },
  '/leadership': {
    title: 'Leadership — BizQuest',
    description:
      'Meet the students and mentors leading BizQuest chapters and driving community-powered innovation.',
  },
  '/connect': {
    title: 'Connect — BizQuest',
    description:
      'Get in touch with BizQuest — join schools as a student, donate, partner as an organization, or start a new chapter.',
  },
}

export default function PageMeta() {
  const { pathname } = useLocation()
  const meta = META[pathname] ?? {
    title: 'BizQuest',
    description: DEFAULT_DESCRIPTION,
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
  }, [meta.title, meta.description])

  return null
}
