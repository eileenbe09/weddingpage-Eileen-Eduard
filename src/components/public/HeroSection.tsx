'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        minHeight: '100vh',
        /* Fotorealistischer Dark-Overlay – bereit für ein echtes Bild als background-image */
        background: 'linear-gradient(165deg, #242E1E 0%, #1A2216 40%, #2E3C26 70%, #1A2216 100%)',
      }}
    >
      {/* Subtiles Körnung-Overlay für Foto-Textur-Gefühl */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.4 }}
      />

      {/* Goldene Rand-Linie oben und unten */}
      <div className="absolute top-8 left-8 right-8 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(192,124,104,0.35), transparent)' }} />
      <div className="absolute bottom-8 left-8 right-8 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(192,124,104,0.35), transparent)' }} />

      {/* Inhalt */}
      <div className="relative z-10 flex flex-col items-center px-6" style={{ gap: '1.8rem', maxWidth: '820px' }}>

        <p className="eyebrow" style={{ color: 'rgba(200,169,110,0.8)', letterSpacing: '0.5em' }}>
          Wir heiraten
        </p>

        {/* Paarname – Playfair Display, groß, klar, elegantes Italic */}
        <h1
          className="t-display"
          style={{
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#FDFAF5',
            letterSpacing: '0.03em',
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
          }}
        >
          Eileen &amp; Eduard
        </h1>

        {/* Goldener Divider */}
        <div className="divider" style={{ width: '180px' }}>
          <span style={{ color: 'var(--gold)', fontSize: '0.5rem', letterSpacing: '0.8em' }}>✦ ✦ ✦</span>
        </div>

        {/* Datum */}
        <p
          className="t-display"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 400, color: 'rgba(253,250,245,0.75)', letterSpacing: '0.15em' }}
        >
          10. Juli 2026
        </p>

        <p
          className="t-ui"
          style={{ fontSize: '0.78rem', color: 'rgba(253,250,245,0.45)', letterSpacing: '0.25em', fontWeight: 300 }}
        >
          St. Matthäus Kirche · Wulfen
        </p>

        {/* CTAs */}
        <div className="flex gap-4 flex-wrap justify-center" style={{ marginTop: '1rem' }}>
          <Link href="/rsvp" className="btn btn-gold">Jetzt zusagen</Link>
          <a href="#programm" className="btn btn-light">Zum Ablauf</a>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(200,169,110,0.6), transparent)' }} />
      </div>
    </section>
  )
}
