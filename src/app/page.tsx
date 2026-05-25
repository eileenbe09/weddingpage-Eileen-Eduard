'use client'

import Navigation from '@/components/public/Navigation'
import HeroSection from '@/components/public/HeroSection'
import CountdownSection from '@/components/public/CountdownSection'
import ProgramSection from '@/components/public/ProgramSection'
import LocationSection from '@/components/public/LocationSection'
import HotelsSection from '@/components/public/HotelsSection'
import WitnessSection from '@/components/public/WitnessSection'
import GiftSection from '@/components/public/GiftSection'
import SongSection from '@/components/public/SongSection'
import FAQSection from '@/components/public/FAQSection'
import RSVPTeaser from '@/components/public/RSVPTeaser'
import Footer from '@/components/public/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <ProgramSection />
      <LocationSection />
      <HotelsSection />
      <WitnessSection />
      <GiftSection />
      <SongSection />
      <FAQSection />
      <RSVPTeaser />
      <Footer />
    </main>
  )
}
