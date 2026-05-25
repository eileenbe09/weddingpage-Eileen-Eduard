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
    { v: cd.days,    l: 'Tage' },
    { v: cd.hours,   l: 'Stunden' },
    { v: cd.minutes, l: 'Minuten' },
    { v: cd.seconds, l: 'Sekunden' },
  ]

  return (
    <section className="py-28 px-6" style={{ background: 'var(--espresso)' }}>
      <div className="max-w-5xl mx-auto text-center">

        <p className="eyebrow mb-6" style={{ color: 'var(--honey)' }}>
          Noch bis zu unserem großen Tag
        </p>

        {/* Countdown Zahlen */}
        <div className="flex items-end justify-center gap-2 md:gap-10 flex-wrap">
          {units.map((u, i) => (
            <div key={i} className="flex flex-col items-center" style={{ minWidth: '80px' }}>
              <span
                className="f-serif tabular-nums"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                  color: 'var(--warm-white)',
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                {String(u.v).padStart(2, '0')}
              </span>
              <span className="eyebrow mt-3" style={{ color: 'var(--honey)', fontSize: '0.6rem', letterSpacing: '0.3em' }}>
                {u.l}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="ornament w-40 mx-auto mt-16 mb-10" style={{ opacity: 0.4 }} />

        {/* Zitat */}
        <p
          className="f-serif italic"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'rgba(242,234,217,0.7)',
            fontWeight: 400,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          „Das größte Geschenk für uns ist, unseren Tag mit euch zu verbringen."
        </p>
      </div>
    </section>
  )
}
