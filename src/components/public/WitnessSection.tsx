'use client'

const witnesses = [
  {
    role: 'Trauzeugin der Braut',
    name: 'Sabrina Loidl',
    desc: 'Unsere beste Freundin — immer mit einem Lächeln und einem guten Rat. Sabrina begleitet Eileen seit der Schulzeit.',
    phone: '0163 7359475',
  },
  {
    role: 'Trauzeuge des Bräutigams',
    name: 'Edgard Konradi',
    desc: 'Eduards treuer Wegbegleiter — seit Jahren an seiner Seite. Bei Fragen und Überraschungen ist Edgard euer Ansprechpartner.',
    phone: '01795966083',
  },
]

export default function WitnessSection() {
  return (
    <section id="trauzeugen" className="section section-sage">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div className="section-header">
          <p className="eyebrow">Die Begleiter</p>
          <h2 className="section-title" style={{ fontStyle: 'italic' }}>Unsere Trauzeugen</h2>
          <div className="divider" style={{ width: '140px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.4rem', letterSpacing: '1.2em', color: 'var(--gold)' }}>◆</span>
          </div>
        </div>

        <p className="t-ui" style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 3.5rem' }}>
          Bei Fragen, Überraschungen oder wenn ihr einfach nicht wisst, wen ihr fragen sollt — hier sind die richtigen Ansprechpartner.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {witnesses.map((w, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
              {/* Initialen-Avatar */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'var(--light)', border: '2px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <span className="t-display" style={{ fontSize: '1.6rem', fontStyle: 'italic', color: 'var(--gold)', fontWeight: 400 }}>
                  {w.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <p className="eyebrow" style={{ color: 'var(--rose)', marginBottom: '0.5rem', fontSize: '0.52rem' }}>{w.role}</p>
              <h3 className="t-display" style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '1rem', fontStyle: 'italic' }}>
                {w.name}
              </h3>
              <p className="t-ui" style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                {w.desc}
              </p>
              <a
                href={`tel:${w.phone.replace(/\s/g, '')}`}
                className="eyebrow"
                style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '4px', fontSize: '0.58rem' }}
              >
                {w.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
