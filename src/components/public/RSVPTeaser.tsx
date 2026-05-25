'use client'

import Link from 'next/link'

export default function RSVPTeaser() {
  return (
    <section
      id="rsvp"
      className="py-24 px-6 text-center"
      style={{ background: 'var(--dark-brown)' }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="font-body text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'var(--terracotta)' }}>
          Seid ihr dabei?
        </p>

        <h2
          className="font-script leading-none mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--cream)' }}
        >
          Seid ihr dabei?
        </h2>

        <p className="font-body font-light text-base mb-4" style={{ color: 'rgba(253,250,245,0.7)' }}>
          Bitte gebt uns bis zum <strong style={{ color: 'var(--gold)' }}>27. Mai 2026</strong> Bescheid,
          ob ihr dabei seid.
        </p>

        <p className="font-body font-light text-sm mb-10" style={{ color: 'rgba(253,250,245,0.5)' }}>
          Bei Fragen sowie für Beiträge und Überraschungen wendet euch bitte an unsere Trauzeugen:<br />
          <span style={{ color: 'var(--terracotta)' }}>Sabrina Loidl · 0163 7359475</span>
          {' '}oder{' '}
          <span style={{ color: 'var(--terracotta)' }}>Edgard Konradi · 01795966083</span>
        </p>

        <Link
          href="/rsvp"
          className="inline-block px-12 py-4 font-body text-sm tracking-widest uppercase transition-all hover:opacity-90"
          style={{
            background: 'var(--terracotta)',
            color: 'white',
            borderRadius: '2px',
            letterSpacing: '0.2em',
          }}
        >
          Jetzt zusagen
        </Link>
      </div>
    </section>
  )
}
