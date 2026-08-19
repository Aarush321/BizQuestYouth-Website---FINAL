import { lazy, Suspense } from 'react'
import ChaptersIntro from '../components/chapters/ChaptersIntro'
import ChapterList from '../components/chapters/ChapterList'
import StartChapterCta from '../components/chapters/StartChapterCta'

// The map pulls in react-simple-maps/d3-geo/topojson — keep it out of the
// main bundle so the other three routes stay light.
const WorldMap = lazy(() => import('../components/chapters/WorldMap'))

function WorldMapFallback() {
  return (
    <section className="bg-slate/5 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto aspect-[980/551] w-full max-w-6xl animate-pulse rounded-2xl bg-slate/10" />
    </section>
  )
}

export default function Chapters() {
  return (
    <div>
      <ChaptersIntro />
      <Suspense fallback={<WorldMapFallback />}>
        <WorldMap />
      </Suspense>
      <ChapterList />
      <StartChapterCta />
    </div>
  )
}
