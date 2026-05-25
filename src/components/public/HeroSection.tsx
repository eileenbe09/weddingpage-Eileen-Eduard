'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: 'var(--ivory)' }}
    >
      {/* Botanische Ecken-Dekoration oben links */}
      <svg className="absolute top-0 left-0 w-72 md:w-96 opacity-[0.18] pointer-events-none" viewBox="0 0 400 400" fill="none">
        <path d="M0,200 Q60,140 120,100 Q180,60 220,0" stroke="#9C6B3C" strokeWidth="1" fill="none"/>
        <path d="M0,160 Q80,120 140,70 Q190,40 240,0" stroke="#B8944A" strokeWidth="0.8" fill="none"/>
        <path d="M0,240 Q50,190 90,140 Q140,90 180,40 Q210,10 230,0" stroke="#9C6B3C" strokeWidth="0.6" fill="none"/>
        <ellipse cx="130" cy="95" rx="18" ry="8" fill="#B8944A" transform="rotate(-35 130 95)" opacity="0.5"/>
        <ellipse cx="165" cy="65" rx="14" ry="6" fill="#9C6B3C" transform="rotate(-55 165 65)" opacity="0.4"/>
        <ellipse cx="95"  cy="130" rx="16" ry="7" fill="#B8944A" transform="rotate(-20 95 130)"  opacity="0.4"/>
        <ellipse cx="200" cy="40"  rx="12" ry="5" fill="#9C6B3C" transform="rotate(-70 200 40)"  opacity="0.3"/>
        <path d="M60,180 Q90,155 110,125" stroke="#9C6B3C" strokeWidth="0.5" fill="none"/>
        <path d="M40,220 Q75,200 100,170" stroke="#B8944A" strokeWidth="0.5" fill="none"/>
      </svg>

      {/* Botanische Ecken-Dekoration unten rechts */}
      <svg className="absolute bottom-0 right-0 w-72 md:w-96 opacity-[0.18] pointer-events-none" viewBox="0 0 400 400" fill="none" style={{ transform: 'rotate(180deg)' }}>
        <path d="M0,200 Q60,140 120,100 Q180,60 220,0" stroke="#9C6B3C" strokeWidth="1" fill="none"/>
        <path d="M0,160 Q80,120 140,70 Q190,40 240,0" stroke="#B8944A" strokeWidth="0.8" fill="none"/>
        <path d="M0,240 Q50,190 90,140 Q140,90 180,40 Q210,10 230,0" stroke="#9C6B3C" strokeWidth="0.6" fill="none"/>
        <ellipse cx="130" cy="95" rx="18" ry="8" fill="#B8944A" transform="rotate(-35 130 95)" opacity="0.5"/>
        <ellipse cx="165" cy="65" rx="14" ry="6" fill="#9C6B3C" transform="rotate(-55 165 65)" opacity="0.4"/>
        <ellipse cx="95"  cy="130" rx="16" ry="7" fill="#B8944A" transform="rotate(-20 95 130)"  opacity="0.4"/>
      </svg>

      {/* Dünner Rahmen innen */}
      <div
        className="absolute inset-6 md:inset-10 pointer-events-none hidden md:block"
        style={{ border: '1px solid var(--sand)', opacity: 0.6 }}
      />

      {/* Inhalt */}
      <div className="relative z-10 px-6 flex flex-col items-center" style={{ gap: '1.4rem', maxWidth: '780px' }}>

        <p className="eyebrow" style={{ letterSpacing: '0.5em' }}>Wir heiraten</p>

        {/* Great Vibes nur für kleinen Accent */}
        <p className="f-accent" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--gold)', lineHeight: 1 }}>
          Save the Date
        </p>

        {/* Hauptname in Cormorant Garamond Italic – elegant & klar */}
        <h1
          className="f-display"
          style={{
            fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--espresso)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
          }}
        >
          Eileen &amp; Eduard
        </h1>

        {/* Ornament */}
        <div className="ornament w-52 mx-auto" style={{ gap: '16px' }}>
          <span style={{ fontSize: '0.45rem', letterSpacing: '1em', color: 'var(--gold)' }}>◆ ◆ ◆</span>
        </div>

        {/* Datum elegant */}
        <p
          className="f-display"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--sienna)',
            letterSpacing: '0.08em',
          }}
        >
          10. Juli 2026
        </p>

        <p className="eyebrow" style={{ color: 'var(--smoke)', fontSize: '0.58rem', letterSpacing: '0.3em' }}>
          St. Matthäus Kirche · Wulfen
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <Link href="/rsvp" className="btn btn-filled">Zusagen</Link>
          <a href="#programm" className="btn btn-ghost">Zum Ablauf</a>
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="eyebrow" style={{ fontSize: '0.5rem', letterSpacing: '0.35em', color: 'var(--smoke)' }}>Scroll</span>
        <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>
    </section>
  )
}
