'use client'

import { useState, useEffect } from 'react'
import { getCountdown } from '@/lib/utils'

export default function CountdownSection() {
  const [cd, setCd] = useState(getCountdown())
  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000)
    return () => clearInterval(t)
  }, [])

  const units = [
    { v: cd.days, l: 'Tage' }, { v: cd.hours, l: 'Stunden' },
    { v: cd.minutes, l: 'Minuten' }, { v: cd.seconds, l: 'Sekunden' },
  ]

  return (
    <section style={{ background: 'var(--espresso)', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

        <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '3.5rem' }}>
          Noch bis zu unserem großen Tag
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 4rem)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {units.map((u, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' }}>
              <span
                className="f-display"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, color: 'var(--ivory)', lineHeight: 1, letterSpacing: '-0.02em' }}
              >
                {String(u.v).padStart(2, '0')}
              </span>
              <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.52rem', letterSpacing: '0.3em', marginTop: '0.8rem' }}>
                {u.l}
              </span>
            </div>
          ))}
        </div>

        <div style={{ width: '160px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(184,148,74,0.4), transparent)', margin: '4rem auto 3rem' }} />

        <p
          className="f-display"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(240,232,216,0.6)', lineHeight: 1.9, maxWidth: '520px', margin: '0 auto' }}
        >
          „Das größte Geschenk für uns ist, unseren Tag mit euch zu verbringen."
        </p>
      </div>
    </section>
  )
}
