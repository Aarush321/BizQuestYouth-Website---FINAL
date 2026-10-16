// Writes dist/<route>/index.html for each page so crawlers get the right
// title, description, canonical URL, and (for /leadership) the officer list
// without running JavaScript. React replaces the #root contents on load.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const site = JSON.parse(await readFile(join(root, 'src/data/site.json'), 'utf8'))
const template = await readFile(join(dist, 'index.html'), 'utf8')

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function leadershipBody() {
  const items = site.leaders
    .map((l) => `<li><h2>${escape(l.name)}</h2><p>${escape(l.title)}, BizQuest Youth</p></li>`)
    .join('')
  return `<main><h1>BizQuest Youth Leadership</h1><p>BizQuest Youth was started in April 2025 by Aarush Ravichandran (CEO) and Uthej Katikaneni (CFO).</p><ul>${items}</ul></main>`
}

function leadershipJsonLd() {
  const people = site.leaders.map((l) => ({
    '@type': 'Person',
    name: l.name,
    jobTitle: l.title,
    worksFor: { '@type': 'Organization', name: 'BizQuest Youth', url: `${site.url}/` },
  }))
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': people })}</script>`
}

for (const [route, meta] of Object.entries(site.pages)) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escape(meta.description)}" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${site.url}${route}" />`,
    )

  if (route === '/leadership') {
    html = html
      .replace('</head>', `${leadershipJsonLd()}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${leadershipBody()}</div>`)
  }

  const out = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, html)
}

console.log(`prerendered ${Object.keys(site.pages).length} pages`)
