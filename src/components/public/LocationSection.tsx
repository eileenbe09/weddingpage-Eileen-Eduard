'use client'

import { MapPin, Clock, Car } from 'lucide-react'

const locations = [
  {
    name: 'St. Matthäus Kirche',
    subtitle: 'Kirchliche Trauung',
    address: 'Wulfen',
    time: '15:00 Uhr',
    icon: '⛪',
    mapsQuery: 'St.+Matthäus+Kirche+Wulfen',
  },
  {
    name: 'Hecheltjens Hof',
    subtitle: 'Sektempfang & Feier',
    address: 'Isseltalweg 9, 46499 Hamminkeln',
    time: 'ab 17:00 Uhr',
    icon: '🌿',
    mapsQuery: 'Hecheltjens+Hof+Isseltalweg+9+Hamminkeln',
  },
]

export default function LocationSection() {
  return (
    <section id="location" className="py-24 px-6" style={{ background: 'var(--cream)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--terracotta)' }}>
            Wo wir feiern
          </p>
          <h2 className="font-heading font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--dark-brown)' }}>
            Locations
          </h2>
          <div className="gold-divider w-32 mx-auto mt-4">
            <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✦</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="p-8 rounded-sm transition-shadow hover:shadow-lg"
              style={{ background: 'var(--beige)', border: '1px solid rgba(184,148,74,0.2)' }}
            >
              <div className="text-4xl mb-4">{loc.icon}</div>
              <p className="font-body text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--terracotta)' }}>
                {loc.subtitle}
              </p>
              <h3 className="font-heading text-2xl font-semibold mb-4" style={{ color: 'var(--dark-brown)' }}>
                {loc.name}
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                  <span className="font-body font-light text-sm" style={{ color: 'var(--muted)' }}>
                    {loc.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} style={{ color: 'var(--gold)' }} />
                  <span className="font-body font-light text-sm" style={{ color: 'var(--muted)' }}>
                    {loc.time}
                  </span>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=${loc.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-body text-xs tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: 'var(--terracotta)' }}
              >
                <Car size={14} />
                Route planen
              </a>
            </div>
          ))}
        </div>

        {/* Embedded Map Placeholder */}
        <div
          className="mt-8 w-full h-64 rounded-sm flex items-center justify-center"
          style={{ background: 'var(--beige)', border: '1px solid rgba(184,148,74,0.2)' }}
        >
          <div className="text-center">
            <MapPin size={32} style={{ color: 'var(--gold)', margin: '0 auto' }} />
            <p className="font-body font-light text-sm mt-3" style={{ color: 'var(--muted)' }}>
              Hecheltjens Hof · Isseltalweg 9 · 46499 Hamminkeln
            </p>
            <a
              href="https://maps.google.com/?q=Isseltalweg+9+Hamminkeln"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 font-body text-xs tracking-widest uppercase px-4 py-2 border transition-colors hover:opacity-70"
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)', borderRadius: '2px' }}
            >
              In Google Maps öffnen
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
