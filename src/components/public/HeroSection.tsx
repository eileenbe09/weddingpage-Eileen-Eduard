'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6"
      style={{ background: 'linear-gradient(160deg, var(--warm-white) 0%, var(--linen) 60%, var(--sand) 100%)' }}
    >
      {/* Dekorative Kreise im Hintergrund */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,108,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(164,124,82,0.1) 0%, transparent 70%)' }}
      />

      {/* Dünne dekorative Linien */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 5%, var(--sand) 30%, var(--sand) 70%, transparent 95%)' }} />
        <div className="absolute bottom-[15%] left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 5%, var(--sand) 30%, var(--sand) 70%, transparent 95%)' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center" style={{ gap: '1.6rem', maxWidth: '800px' }}>

        {/* Eyebrow */}
        <p className="eyebrow" style={{ letterSpacing: '0.45em' }}>
          Wir heiraten
        </p>

        {/* Script Name */}
        <h1
          className="f-script leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 10rem)',
            color: 'var(--bark)',
            lineHeight: 1.05,
          }}
        >
          Eileen &amp; Eduard
        </h1>

        {/* Ornament */}
        <div className="ornament w-56 mx-auto">
          <span style={{ color: 'var(--honey)', fontSize: '0.6rem', letterSpacing: '0.5em' }}>✦ ✦ ✦</span>
        </div>

        {/* Datum */}
        <p
          className="f-serif"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: 'var(--espresso)', fontWeight: 400, letterSpacing: '0.12em' }}
        >
          10. Juli 2026
        </p>

        {/* Ort */}
        <p className="f-sans" style={{ fontSize: '0.85rem', color: 'var(--muted)', letterSpacing: '0.15em', fontWeight: 300 }}>
          St. Matthäus Kirche · Wulfen
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <Link href="/rsvp" className="btn-primary">Zusagen</Link>
          <a href="#programm" className="btn-outline">Zum Ablauf</a>
        </div>
      </div>

      {/* Scroll-Pfeil */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="eyebrow" style={{ fontSize: '0.55rem', letterSpacing: '0.4em', color: 'var(--muted)' }}>Scroll</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--honey), transparent)' }} />
      </div>
    </section>
  )
}
