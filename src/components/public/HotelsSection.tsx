'use client'

import { MapPin, ExternalLink } from 'lucide-react'

const hotels = [
  {
    name: 'Hotel Gut Höing',
    address: 'Güterstraße 2, 46499 Hamminkeln',
    dist: 'ca. 3 km zur Feier',
    link: 'https://maps.google.com/?q=Hotel+Gut+Höing+Hamminkeln',
    note: 'Ruhige Lage, Frühstück inklusive',
  },
  {
    name: 'Hotel Zur Post',
    address: 'Marktplatz 1, 46537 Dinslaken',
    dist: 'ca. 15 km zur Feier',
    link: 'https://maps.google.com/?q=Hotel+Zur+Post+Dinslaken',
    note: 'Zentrumsnah, gute Anbindung',
  },
  {
    name: 'ibis Budget Wesel',
    address: 'Schermbecker Landstr. 80, 46485 Wesel',
    dist: 'ca. 12 km zur Feier',
    link: 'https://maps.google.com/?q=ibis+Budget+Wesel',
    note: 'Günstige Option, direkte Buchung online',
  },
]

export default function HotelsSection() {
  return (
    <section id="unterkuenfte" className="section section-white">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div className="section-header">
          <p className="eyebrow">Übernachten</p>
          <h2 className="section-title" style={{ fontStyle: 'italic' }}>Unterkünfte in der Nähe</h2>
          <div className="divider" style={{ width: '140px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.4rem', letterSpacing: '1.2em', color: 'var(--gold)' }}>◆</span>
          </div>
        </div>

        <p className="t-ui" style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 3.5rem' }}>
          Für alle, die von weiter anreisen oder den Abend voll genießen möchten — hier ein paar Empfehlungen in der Nähe.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {hotels.map((h, i) => (
            <div key={i} className="card" style={{ padding: '2rem' }}>
              <h3 className="t-display" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '0.75rem' }}>
                {h.name}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={12} style={{ color: 'var(--gold)', marginTop: '3px', flexShrink: 0 }} />
                <span className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{h.address}</span>
              </div>
              <p className="eyebrow" style={{ fontSize: '0.52rem', color: 'var(--rose)', marginBottom: '0.5rem' }}>{h.dist}</p>
              <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{h.note}</p>
              <a
                href={h.link}
                target="_blank" rel="noopener noreferrer"
                className="eyebrow"
                style={{ color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'underline', textUnderlineOffset: '4px' }}
              >
                Route & Info <ExternalLink size={11} />
              </a>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '3rem', padding: '1.75rem 2.5rem', textAlign: 'center',
          background: 'var(--off)', borderTop: '2px solid var(--gold)',
        }}>
          <p className="t-display" style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--mid)', fontWeight: 400, lineHeight: 1.8 }}>
            Für den Heimweg steht außerdem unser Shuttleservice bereit —
            eure Autos dürfen bis zum nächsten Morgen stehen bleiben.
          </p>
        </div>
      </div>
    </section>
  )
}
