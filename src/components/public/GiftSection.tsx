'use client'

import { Heart, ExternalLink } from 'lucide-react'

const wishes = [
  { title: 'Flitterwochen-Kasse', desc: 'Wir träumen von einer Reise nach Italien. Jeder Beitrag bringt uns unserem Traum näher.' },
  { title: 'Erlebnisse statt Dinge', desc: 'Ein gemeinsames Konzert, ein Kochkurs oder ein Wellnesswochenende — Erinnerungen, die bleiben.' },
  { title: 'Für unser neues Zuhause', desc: 'Wenn ihr uns etwas Bleibendes schenken möchtet, freuen wir uns über Beiträge für unsere gemeinsame Wohnung.' },
]

export default function GiftSection() {
  return (
    <section id="geschenke" className="section section-light">
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

        <div className="section-header">
          <p className="eyebrow">Wunschliste</p>
          <h2 className="section-title" style={{ fontStyle: 'italic' }}>Geschenke</h2>
          <div className="divider" style={{ width: '140px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.4rem', letterSpacing: '1.2em', color: 'var(--gold)' }}>◆</span>
          </div>
        </div>

        {/* Hauptaussage */}
        <div style={{ marginBottom: '3.5rem' }}>
          <Heart size={28} style={{ color: 'var(--gold)', margin: '0 auto 1.5rem', display: 'block' }} />
          <p
            className="t-display"
            style={{ fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--dark)', lineHeight: 1.6, maxWidth: '550px', margin: '0 auto 1rem' }}
          >
            „Das schönste Geschenk ist eure Anwesenheit."
          </p>
          <p className="t-ui" style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto' }}>
            Wer uns dennoch überraschen möchte — hier sind ein paar Ideen, über die wir uns sehr freuen würden.
          </p>
        </div>

        {/* Wunsch-Karten */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem', textAlign: 'left' }}>
          {wishes.map((w, i) => (
            <div key={i} className="card" style={{ padding: '2rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--off)', border: '1px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <span className="t-display" style={{ fontSize: '0.9rem', color: 'var(--gold)', fontStyle: 'italic' }}>{i + 1}</span>
              </div>
              <h3 className="t-display" style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                {w.title}
              </h3>
              <p className="t-ui" style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                {w.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.8 }}>
          Für Geldgeschenke wendet euch gerne an unsere Trauzeugen —
          sie wissen, wie das Geld am schönsten eingesetzt wird.
        </p>
      </div>
    </section>
  )
}
