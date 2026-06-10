'use client'

import Navigation      from '@/components/public/Navigation'
import HeroSection     from '@/components/public/HeroSection'
import CountdownSection from '@/components/public/CountdownSection'
import ProgramSection  from '@/components/public/ProgramSection'
import LocationSection from '@/components/public/LocationSection'
import HotelsSection   from '@/components/public/HotelsSection'
import WitnessSection  from '@/components/public/WitnessSection'
import GiftSection     from '@/components/public/GiftSection'
import SongSection     from '@/components/public/SongSection'
import FAQSection      from '@/components/public/FAQSection'
import RSVPTeaser      from '@/components/public/RSVPTeaser'
import Footer          from '@/components/public/Footer'
import WaveDivider     from '@/components/public/WaveDivider'

// Farbzuordnung der Sektionen
const DARK   = '#1A2216'   // section-dark
const CREAM  = '#EAE0CF'   // section-off
const WHITE  = '#FDFAF5'   // section-white
const SAGE_L = '#B6C8A2'   // section-sage / section-light

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />

      <WaveDivider from={DARK}  to={CREAM} />
      <CountdownSection />

      <WaveDivider from={CREAM} to={WHITE} flip />
      <ProgramSection />

      <WaveDivider from={WHITE} to={CREAM} />
      <LocationSection />

      <WaveDivider from={CREAM} to={WHITE} flip />
      <HotelsSection />

      <WaveDivider from={WHITE} to={SAGE_L} />
      <WitnessSection />

      <WaveDivider from={SAGE_L} to={CREAM} flip />
      <GiftSection />

      <WaveDivider from={CREAM} to={DARK} />
      <SongSection />

      <WaveDivider from={DARK}  to={CREAM} flip />
      <FAQSection />

      <WaveDivider from={CREAM} to={DARK} />
      <RSVPTeaser />

      <Footer />
    </main>
  )
}
