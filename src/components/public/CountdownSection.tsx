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
    { v: cd.days, l: 'Tage' },
    { v: cd.hours, l: 'Stunden' },
    { v: cd.minutes, l: 'Minuten' },
    { v: cd.seconds, l: 'Sekunden' },
  ]

  return (
    <section className="section section-off" style={{ padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

        <p className="eyebrow" style={{ marginBottom: '3rem' }}>Noch bis zu unserem großen Tag</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'clamp(1rem, 4vw, 4rem)', flexWrap: 'wrap' }}>
          {units.map((u, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
              <span
                className="t-display"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, color: 'var(--dark)', lineHeight: 1 }}
              >
                {String(u.v).padStart(2, '0')}
              </span>
              <span className="eyebrow" style={{ marginTop: '0.7rem', color: 'var(--muted)', fontSize: '0.5rem', letterSpacing: '0.28em' }}>
                {u.l}
              </span>
            </div>
          ))}
        </div>

        <div className="divider" style={{ width: '120px', margin: '3rem auto 2.5rem' }}>
          <span style={{ fontSize: '0.4rem', letterSpacing: '1.2em', color: 'var(--gold)' }}>◆</span>
        </div>

        <p
          className="t-display"
          style={{ fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--mid)', lineHeight: 1.85, maxWidth: '500px', margin: '0 auto' }}
        >
          „Das größte Geschenk für uns ist,<br />unseren Tag mit euch zu verbringen."
        </p>
      </div>
    </section>
  )
}
