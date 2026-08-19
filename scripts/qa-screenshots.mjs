import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const BASE = 'http://127.0.0.1:4173'
const OUT = path.resolve(
  '/Users/aarushravichandran/Desktop/Me/Code/BizQuest Website - FINAL/qa-screenshots',
)

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'fundraise', path: '/fundraise' },
  { name: 'chapters', path: '/chapters' },
  { name: 'connect', path: '/connect' },
]

const WIDTHS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

async function scrollFullPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0
      const step = Math.max(200, Math.floor(window.innerHeight * 0.7))
      const timer = setInterval(() => {
        const { scrollHeight } = document.documentElement
        window.scrollBy(0, step)
        total += step
        if (total >= scrollHeight || window.scrollY + window.innerHeight >= scrollHeight - 2) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve(null)
        }
      }, 80)
    })
  })
  await page.waitForTimeout(400)
}

async function captureSections(page, pageName, widthName) {
  const sections = await page.$$eval('main section, main form, main > div > section', (els) =>
    els.map((el, i) => {
      const heading =
        el.querySelector('h1, h2')?.textContent?.trim().slice(0, 40).replace(/\s+/g, '-') ||
        `section-${i + 1}`
      return { index: i, heading }
    }),
  )

  for (const { index, heading } of sections) {
    const handle = await page.$(
      `main section:nth-of-type(${index + 1}), main > div > section:nth-of-type(${index + 1})`,
    )
    // Prefer direct section listing via evaluate + locator
    const locator = page.locator('main section').nth(index)
    if ((await locator.count()) === 0) continue
    await locator.scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    const safe = heading.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase() || `section-${index + 1}`
    await locator.screenshot({
      path: path.join(OUT, `${pageName}-${widthName}-${String(index + 1).padStart(2, '0')}-${safe}.png`),
    })
    void handle
  }
}

const browser = await chromium.launch()
await mkdir(OUT, { recursive: true })

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width: width.width, height: width.height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  for (const route of PAGES) {
    await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await scrollFullPage(page)

    await page.screenshot({
      path: path.join(OUT, `${route.name}-${width.name}-full.png`),
      fullPage: true,
    })

    // Viewport first-fold
    await page.screenshot({
      path: path.join(OUT, `${route.name}-${width.name}-fold.png`),
      fullPage: false,
    })

    if (width.name !== 'tablet') {
      await captureSections(page, route.name, width.name)
    }

    // Nav check: active underline / solid header
    const title = await page.title()
    const headerClass = await page.locator('header').first().getAttribute('class')
    console.log(
      `${route.name}@${width.name}: title="${title}" headerSolid=${headerClass?.includes('bg-navy')}`,
    )
  }

  await context.close()
}

await browser.close()
console.log('Screenshots written to', OUT)
