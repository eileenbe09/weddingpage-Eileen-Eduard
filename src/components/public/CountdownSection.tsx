'use client'

import { useState, useEffect } from 'react'
import { getCountdown } from '@/lib/utils'

export default function CountdownSection() {
  const [countdown, setCountdown] = useState(getCountdown())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { value: countdown.days, label: 'Tage' },
    { value: countdown.hours, label: 'Stunden' },
    { value: countdown.minutes, label: 'Minuten' },
    { value: countdown.seconds, label: 'Sekunden' },
  ]

  return (
    <section className="py-20 px-6" style={{ background: 'var(--dark-brown)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="font-body text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: 'var(--terracotta)' }}
        >
          Noch bis zu unserem großen Tag
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-12 flex-wrap">
          {units.map((unit, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className="font-heading font-light tabular-nums"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--cream)', lineHeight: 1 }}
              >
                {String(unit.value).padStart(2, '0')}
              </span>
              <span
                className="font-body text-xs tracking-[0.3em] uppercase mt-2"
                style={{ color: 'var(--muted)' }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="gold-divider w-48 mx-auto mt-12">
          <span style={{ color: 'var(--gold)' }}>✦</span>
        </div>

        <p
          className="font-heading font-light italic text-xl mt-8"
          style={{ color: 'rgba(253,250,245,0.7)' }}
        >
          „Das größte Geschenk für uns ist, unseren Tag mit euch zu verbringen."
        </p>
      </div>
    </section>
  )
}
