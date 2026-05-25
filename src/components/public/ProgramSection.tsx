'use client'

const items = [
  { time: '14:45', title: 'Treffen vor der Kirche',  sub: 'Wir freuen uns, euch zu begrüßen.' },
  { time: '15:00', title: 'Kirchliche Trauung',       sub: 'St. Matthäus Kirche, Wulfen' },
  { time: '17:00', title: 'Sektempfang',              sub: 'Hecheltjens Hof, Hamminkeln' },
  { time: '18:00', title: 'Beginn der Feier',         sub: 'Gemeinsam feiern wir den schönsten Tag.' },
]

export default function ProgramSection() {
  return (
    <section id="programm" className="py-28 px-6" style={{ background: 'var(--warm-white)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="eyebrow mb-5">Der Ablauf</p>
          <h2
            className="f-serif"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--espresso)', fontWeight: 400 }}
          >
            Unser Programm
          </h2>
          <div className="ornament w-28 mx-auto mt-6">
            <span style={{ color: 'var(--honey)', fontSize: '0.55rem', letterSpacing: '0.6em' }}>✦ ✦ ✦</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Mittellinie */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--honey) 15%, var(--honey) 85%, transparent)', transform: 'translateX(-50%)' }}
          />

          <div className="flex flex-col gap-16">
            {items.map((item, i) => (
              <div key={i} className={`flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                {/* Text-Block */}
                <div className={`flex-1 md:px-12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="eyebrow mb-2" style={{ color: 'var(--rose)' }}>
                    {item.time} Uhr
                  </p>
                  <h3
                    className="f-serif mb-1"
                    style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', color: 'var(--espresso)', fontWeight: 500 }}
                  >
                    {item.title}
                  </h3>
                  <p className="f-sans" style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                    {item.sub}
                  </p>
                </div>

                {/* Kreis-Punkt */}
                <div
                  className="hidden md:flex w-4 h-4 rounded-full flex-shrink-0 z-10 relative"
                  style={{ background: 'var(--warm-white)', border: '2px solid var(--honey)', boxShadow: '0 0 0 4px var(--linen)' }}
                />

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Hinweis Shuttle */}
        <div
          className="mt-20 p-8 text-center"
          style={{ background: 'var(--linen)', border: '1px solid var(--sand)' }}
        >
          <p
            className="f-serif italic"
            style={{ fontSize: '1.1rem', color: 'var(--bark)', fontWeight: 400, lineHeight: 1.8 }}
          >
            Für den Heimweg steht ein Shuttleservice bereit.
          </p>
          <p className="f-sans mt-2" style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
            Eure Autos dürfen gerne bis zum nächsten Tag an der Location bleiben.
          </p>
        </div>
      </div>
    </section>
  )
}
