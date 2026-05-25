'use client'

import Link from 'next/link'

export default function RSVPTeaser() {
  return (
    <section id="rsvp" style={{ background: 'var(--espresso)', padding: '7rem 1.5rem', textAlign: 'center' }}>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '2rem' }}>Seid ihr dabei?</p>

        {/* Großer eleganter Italic-Heading */}
        <h2
          className="f-display"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--ivory)',
            lineHeight: 1.1,
            marginBottom: '2rem',
          }}
        >
          Wir freuen uns
          <br />
          auf euch
        </h2>

        {/* Kleiner Great Vibes Accent */}
        <p className="f-accent" style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: '2.5rem', opacity: 0.7 }}>
          Eileen &amp; Eduard
        </p>

        <div style={{ width: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(184,148,74,0.5), transparent)', margin: '0 auto 2.5rem' }} />

        <p className="f-ui" style={{ fontSize: '0.9rem', color: 'rgba(240,232,216,0.6)', lineHeight: 1.9, marginBottom: '0.75rem', fontWeight: 300 }}>
          Bitte gebt uns bis zum{' '}
          <span style={{ color: 'var(--gold)', fontWeight: 400 }}>27. Mai 2026</span>{' '}
          Bescheid.
        </p>

        <p className="f-ui" style={{ fontSize: '0.78rem', color: 'rgba(240,232,216,0.35)', lineHeight: 1.9, marginBottom: '3rem' }}>
          Fragen &amp; Überraschungen: Sabrina Loidl{' '}
          <span style={{ color: 'var(--rose)' }}>0163 7359475</span>
          {' '}· Edgard Konradi{' '}
          <span style={{ color: 'var(--rose)' }}>01795966083</span>
        </p>

        <Link
          href="/rsvp"
          className="btn btn-filled"
          style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--espresso)', fontWeight: 500 }}
        >
          Jetzt zusagen
        </Link>
      </div>
    </section>
  )
}
