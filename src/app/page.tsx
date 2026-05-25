'use client'

import Navigation from '@/components/public/Navigation'
import HeroSection from '@/components/public/HeroSection'
import CountdownSection from '@/components/public/CountdownSection'
import ProgramSection from '@/components/public/ProgramSection'
import LocationSection from '@/components/public/LocationSection'
import RSVPTeaser from '@/components/public/RSVPTeaser'
import Footer from '@/components/public/Footer'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <Navigation />
      <HeroSection />
      <CountdownSection />
      <ProgramSection />
      <LocationSection />
      <RSVPTeaser />
      <Footer />
    </main>
  )
}
