'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Gibt es einen Dresscode?',
    a: 'Wir wünschen uns festliche Kleidung — gerne elegant oder schick. Farbe erlaubt! Nur Weiß bitten wir zu meiden.',
  },
  {
    q: 'Können wir Kinder mitbringen?',
    a: 'Ja, natürlich! Kinder sind herzlich willkommen. Bitte gebt die Anzahl im RSVP-Formular an, damit wir gut planen können.',
  },
  {
    q: 'Wo kann ich parken?',
    a: 'Am Hecheltjens Hof stehen ausreichend Parkplätze zur Verfügung. Außerdem bieten wir einen Shuttleservice an.',
  },
  {
    q: 'Gibt es einen Shuttleservice?',
    a: 'Ja! Für den Heimweg steht ein Shuttle bereit. Details erfahrt ihr rechtzeitig vor der Hochzeit. Eure Autos dürfen über Nacht bleiben.',
  },
  {
    q: 'Was wünscht ihr euch als Geschenk?',
    a: 'Eure Anwesenheit ist das schönste Geschenk. Wer uns trotzdem überraschen möchte, findet auf unserer Wunschliste ein paar Ideen.',
  },
  {
    q: 'Bis wann muss ich zu- oder absagen?',
    a: 'Bitte gebt uns bis zum 27. Mai 2026 Bescheid, damit wir gut planen können. Ihr könnt das RSVP-Formular auf dieser Seite nutzen.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section section-off">
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div className="section-header">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="section-title" style={{ fontStyle: 'italic' }}>Alles Wichtige</h2>
          <div className="divider" style={{ width: '140px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.4rem', letterSpacing: '1.2em', color: 'var(--gold)' }}>◆</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {faqs.map((f, i) => (
            <div
              key={i}
              style={{ borderBottom: '1px solid var(--light)', overflow: 'hidden' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem',
                }}
              >
                <span className="t-display" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 500, color: 'var(--dark)', lineHeight: 1.3 }}>
                  {f.q}
                </span>
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              {open === i && (
                <div style={{ paddingBottom: '1.5rem' }}>
                  <p className="t-ui" style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.85 }}>
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="t-ui" style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--muted)', marginTop: '3rem', lineHeight: 1.8 }}>
          Noch weitere Fragen? Schreibt uns gerne an{' '}
          <span style={{ color: 'var(--gold)' }}>eileen@example.de</span>
        </p>
      </div>
    </section>
  )
}
