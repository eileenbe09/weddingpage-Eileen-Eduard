'use client'

import Link from 'next/link'

export default function RSVPTeaser() {
  return (
    <section id="rsvp" className="section section-dark" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '2rem' }}>Seid ihr dabei?</p>

        <h2
          className="t-display"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#FDFAF5',
            lineHeight: 1.1,
            marginBottom: '2rem',
          }}
        >
          Wir freuen uns
          <br />
          auf euch
        </h2>

        <p
          className="t-display"
          style={{ fontSize: '1.8rem', fontStyle: 'italic', color: 'var(--gold)', marginBottom: '2.5rem', opacity: 0.75, fontWeight: 400 }}
        >
          Eileen &amp; Eduard
        </p>

        <div style={{ width: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)', margin: '0 auto 2.5rem' }} />

        <p className="t-ui" style={{ fontSize: '0.9rem', color: 'rgba(253,250,245,0.6)', lineHeight: 1.9, marginBottom: '0.75rem', fontWeight: 300 }}>
          Bitte gebt uns bis zum{' '}
          <span style={{ color: 'var(--gold)', fontWeight: 400 }}>27. Mai 2026</span>{' '}
          Bescheid.
        </p>

        <p className="t-ui" style={{ fontSize: '0.78rem', color: 'rgba(253,250,245,0.35)', lineHeight: 1.9, marginBottom: '3rem' }}>
          Fragen &amp; Überraschungen: Sabrina Loidl{' '}
          <span style={{ color: 'var(--rose)' }}>0163 7359475</span>
          {' '}· Edgard Konradi{' '}
          <span style={{ color: 'var(--rose)' }}>01795966083</span>
        </p>

        <Link href="/rsvp" className="btn btn-gold">
          Jetzt zusagen
        </Link>
      </div>
    </section>
  )
}
