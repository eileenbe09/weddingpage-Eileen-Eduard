'use client'

const items = [
  { time: '14:45', title: 'Treffen vor der Kirche',  desc: 'Wir freuen uns, euch zu begrüßen und gemeinsam diesen Moment zu erleben.' },
  { time: '15:00', title: 'Kirchliche Trauung',      desc: 'St. Matthäus Kirche in Wulfen' },
  { time: '17:00', title: 'Sektempfang',             desc: 'Hecheltjens Hof · Isseltalweg 9 · Hamminkeln' },
  { time: '18:00', title: 'Beginn der Feier',        desc: 'Gemeinsam feiern wir den schönsten Tag unseres Lebens.' },
]

export default function ProgramSection() {
  return (
    <section id="programm" style={{ background: 'var(--ivory)', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1.2rem' }}>Der Ablauf</p>
          <h2
            className="f-display"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--espresso)', lineHeight: 1.1 }}
          >
            Unser Programm
          </h2>
          <div className="ornament" style={{ width: '140px', margin: '1.5rem auto 0' }}>
            <span style={{ fontSize: '0.4rem', letterSpacing: '1.2em', color: 'var(--gold)' }}>◆ ◆</span>
          </div>
        </div>

        {/* Timeline – linksbündig, vertikal */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
          {/* Vertikale Linie */}
          <div style={{
            position: 'absolute', left: '0', top: '8px', bottom: '8px', width: '1px',
            background: 'linear-gradient(to bottom, transparent, var(--gold) 10%, var(--gold) 90%, transparent)',
          }} />

          {items.map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < items.length - 1 ? '3.5rem' : 0 }}>
              {/* Punkt */}
              <div style={{
                position: 'absolute', left: '-2.5rem', top: '8px',
                width: '10px', height: '10px', borderRadius: '50%',
                background: 'var(--ivory)', border: '2px solid var(--gold)',
                boxShadow: '0 0 0 3px var(--linen)',
                transform: 'translateX(-4px)',
              }} />

              <p className="eyebrow" style={{ color: 'var(--rose)', marginBottom: '0.5rem', fontSize: '0.58rem' }}>
                {item.time} Uhr
              </p>
              <h3
                className="f-display"
                style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.4rem', lineHeight: 1.2 }}
              >
                {item.title}
              </h3>
              <p className="f-ui" style={{ fontSize: '0.85rem', color: 'var(--smoke)', lineHeight: 1.7, fontWeight: 300 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Shuttle-Hinweis */}
        <div style={{
          marginTop: '4rem', padding: '2rem 2.5rem', textAlign: 'center',
          background: 'var(--linen)', borderLeft: '3px solid var(--gold)',
        }}>
          <p
            className="f-display"
            style={{ fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--mahogany)', lineHeight: 1.8 }}
          >
            Für den Heimweg steht ein Shuttleservice bereit —
            eure Autos dürfen bis zum nächsten Tag bleiben.
          </p>
        </div>
      </div>
    </section>
  )
}
