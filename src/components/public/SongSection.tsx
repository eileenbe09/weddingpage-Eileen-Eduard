'use client'

import { Music } from 'lucide-react'

export default function SongSection() {
  return (
    <section className="section section-dark" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <Music size={24} style={{ color: 'var(--gold)', marginBottom: '2rem', display: 'block', margin: '0 auto 2rem' }} />

        <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Unser Lieblingslied</p>

        <h2
          className="t-display"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#FDFAF5',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}
        >
          A Thousand Years
        </h2>

        <p className="t-ui" style={{ fontSize: '0.85rem', color: 'rgba(253,250,245,0.4)', letterSpacing: '0.2em', marginBottom: '3rem' }}>
          Christina Perri
        </p>

        <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)', margin: '0 auto 3rem' }} />

        <blockquote
          className="t-display"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(253,250,245,0.7)',
            lineHeight: 1.9,
            maxWidth: '520px',
            margin: '0 auto 1.5rem',
          }}
        >
          „I have loved you for a thousand years,
          <br />I'll love you for a thousand more."
        </blockquote>

        <p className="eyebrow" style={{ color: 'rgba(200,169,110,0.5)', fontSize: '0.5rem' }}>— Christina Perri</p>
      </div>
    </section>
  )
}
