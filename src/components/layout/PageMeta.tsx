import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_DESCRIPTION =
  'BizQuest is a student-run nonprofit that teaches coding, business, and AI, with chapters in Tennessee, New Jersey, and Delhi, India.'

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'BizQuest',
    description: DEFAULT_DESCRIPTION,
  },
  '/fundraise': {
    title: 'Support Us | BizQuest',
    description:
      'Ways to help BizQuest: donate, sponsor a project, mentor students, or work with us as a local business.',
  },
  '/chapters': {
    title: 'Chapters | BizQuest',
    description:
      'See where BizQuest chapters meet and how to start one in your area.',
  },
  '/leadership': {
    title: 'Leadership | BizQuest',
    description: 'Meet the students who run BizQuest.',
  },
  '/connect': {
    title: 'Connect | BizQuest',
    description:
      'Contact BizQuest about joining, donating, partnering, or starting a chapter.',
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
