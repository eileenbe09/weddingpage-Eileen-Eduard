'use client'

import Link from 'next/link'

export default function RSVPTeaser() {
  return (
    <section id="rsvp" className="py-28 px-6 text-center" style={{ background: 'var(--espresso)' }}>

      {/* Dekorative Linie oben */}
      <div className="ornament w-48 mx-auto mb-16" style={{ opacity: 0.3 }} />

      <div className="max-w-2xl mx-auto">
        <p className="eyebrow mb-6" style={{ color: 'var(--honey)' }}>Seid ihr dabei?</p>

        <h2
          className="f-script leading-none mb-8"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: 'var(--warm-white)' }}
        >
          Wir freuen uns auf euch
        </h2>

        <p
          className="f-sans mb-3"
          style={{ fontSize: '0.95rem', color: 'rgba(242,234,217,0.65)', lineHeight: 1.9, fontWeight: 300 }}
        >
          Bitte gebt uns bis zum{' '}
          <span style={{ color: 'var(--honey)', fontWeight: 400 }}>27. Mai 2026</span>{' '}
          Bescheid, ob ihr dabei seid.
        </p>

        <p
          className="f-sans mb-12"
          style={{ fontSize: '0.82rem', color: 'rgba(242,234,217,0.4)', lineHeight: 1.9 }}
        >
          Bei Fragen und für Überraschungen: Sabrina Loidl{' '}
          <span style={{ color: 'var(--rose)' }}>0163 7359475</span>
          {' '}oder Edgard Konradi{' '}
          <span style={{ color: 'var(--rose)' }}>01795966083</span>
        </p>

        <Link href="/rsvp" className="btn-primary" style={{ background: 'var(--honey)', borderColor: 'var(--honey)', color: 'var(--espresso)', fontWeight: 500 }}>
          Jetzt zusagen
        </Link>
      </div>

      <div className="ornament w-48 mx-auto mt-16" style={{ opacity: 0.3 }} />
    </section>
  )
}
