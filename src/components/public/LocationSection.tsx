'use client'

import { MapPin, Clock } from 'lucide-react'

const locs = [
  { label: 'Kirchliche Trauung', name: 'St. Matthäus Kirche', address: 'Wulfen', time: '15:00 Uhr', q: 'St.+Matthaus+Kirche+Wulfen' },
  { label: 'Sektempfang & Feier', name: 'Hecheltjens Hof', address: 'Isseltalweg 9 · 46499 Hamminkeln', time: 'ab 17:00 Uhr', q: 'Isseltalweg+9+46499+Hamminkeln' },
]

export default function LocationSection() {
  return (
    <section id="location" className="section section-off">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <div className="section-header">
          <p className="eyebrow">Wo wir feiern</p>
          <h2 className="section-title" style={{ fontStyle: 'italic' }}>Unsere Locations</h2>
          <div className="divider" style={{ width: '140px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.4rem', letterSpacing: '1.2em', color: 'var(--gold)' }}>◆</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {locs.map((l, i) => (
            <div key={i} className="card" style={{ padding: '2.8rem' }}>
              <p className="eyebrow" style={{ color: 'var(--rose)', marginBottom: '1rem' }}>{l.label}</p>
              <h3
                className="t-display"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, color: 'var(--dark)', marginBottom: '1.6rem', lineHeight: 1.2 }}
              >
                {l.name}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={13} style={{ color: 'var(--gold)', marginTop: '3px', flexShrink: 0 }} />
                  <span className="t-ui" style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{l.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span className="t-ui" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{l.time}</span>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=${l.q}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '0.58rem', padding: '0.65rem 1.4rem' }}
              >
                Route planen
              </a>
            </div>
          ))}
        </div>

        <div style={{
          padding: '2.5rem', textAlign: 'center',
          background: 'var(--white)', border: '1px solid var(--gold)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem',
        }}>
          <MapPin size={20} style={{ color: 'var(--gold)' }} />
          <p className="t-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--dark)', fontWeight: 400 }}>
            Hecheltjens Hof · Isseltalweg 9 · 46499 Hamminkeln
          </p>
          <a
            href="https://maps.google.com/?q=Isseltalweg+9+46499+Hamminkeln"
            target="_blank" rel="noopener noreferrer"
            className="eyebrow"
            style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '4px', marginTop: '0.3rem' }}
          >
            In Google Maps öffnen
          </a>
        </div>
      </div>
    </section>
  )
}
