import Hero from '../components/home/Hero'
import MissionStrip from '../components/home/MissionStrip'
import StatsBand from '../components/home/StatsBand'
import ProgramsPreview from '../components/home/ProgramsPreview'
import Slideshow from '../components/home/Slideshow'
import FeaturedStory from '../components/home/FeaturedStory'
import CtaBanner from '../components/home/CtaBanner'

export default function Home() {
  return (
    <div>
      <Hero />
      <MissionStrip />
      <StatsBand />
      <ProgramsPreview />
      <Slideshow />
      <FeaturedStory />
      <CtaBanner />
    </div>
  )
}
