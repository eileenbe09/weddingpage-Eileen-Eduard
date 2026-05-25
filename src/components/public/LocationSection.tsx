'use client'

import { MapPin, Clock } from 'lucide-react'

const locs = [
  {
    label:   'Kirchliche Trauung',
    name:    'St. Matthäus Kirche',
    address: 'Wulfen',
    time:    '15:00 Uhr',
    q:       'St.+Matthäus+Kirche+Wulfen',
  },
  {
    label:   'Sektempfang & Feier',
    name:    'Hecheltjens Hof',
    address: 'Isseltalweg 9, 46499 Hamminkeln',
    time:    'ab 17:00 Uhr',
    q:       'Hecheltjens+Hof+Isseltalweg+9+Hamminkeln',
  },
]

export default function LocationSection() {
  return (
    <section id="location" className="py-28 px-6" style={{ background: 'var(--linen)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="eyebrow mb-5">Wo wir feiern</p>
          <h2
            className="f-serif"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--espresso)', fontWeight: 400 }}
          >
            Unsere Locations
          </h2>
          <div className="ornament w-28 mx-auto mt-6">
            <span style={{ color: 'var(--honey)', fontSize: '0.55rem', letterSpacing: '0.6em' }}>✦ ✦ ✦</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {locs.map((l, i) => (
            <div key={i} className="card p-10" style={{ background: 'var(--warm-white)' }}>
              <p className="eyebrow mb-4" style={{ color: 'var(--rose)' }}>{l.label}</p>

              <h3
                className="f-serif mb-6"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--espresso)', fontWeight: 500 }}
              >
                {l.name}
              </h3>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={14} style={{ color: 'var(--honey)', marginTop: '3px', flexShrink: 0 }} />
                  <span className="f-sans" style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    {l.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={14} style={{ color: 'var(--honey)', flexShrink: 0 }} />
                  <span className="f-sans" style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>
                    {l.time}
                  </span>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=${l.q}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ padding: '0.6rem 1.6rem', fontSize: '0.65rem' }}
              >
                Route planen
              </a>
            </div>
          ))}
        </div>

        {/* Map-Placeholder */}
        <div
          className="w-full flex flex-col items-center justify-center py-16 gap-4"
          style={{ background: 'var(--sand)', border: '1px solid var(--honey)' }}
        >
          <MapPin size={28} style={{ color: 'var(--caramel)' }} />
          <p className="f-serif" style={{ fontSize: '1.05rem', color: 'var(--bark)', fontWeight: 400 }}>
            Hecheltjens Hof · Isseltalweg 9 · 46499 Hamminkeln
          </p>
          <a
            href="https://maps.google.com/?q=Isseltalweg+9+46499+Hamminkeln"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-1 hover:text-[var(--bark)] transition-colors"
            style={{ color: 'var(--caramel)', textDecoration: 'underline', textUnderlineOffset: '4px' }}
          >
            In Google Maps öffnen
          </a>
        </div>
      </div>
    </section>
  )
}
