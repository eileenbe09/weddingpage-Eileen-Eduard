'use client'

const programItems = [
  { time: '14:45', title: 'Treffen vor der Kirche', icon: '✦', description: 'Wir freuen uns, euch vor der Kirche zu begrüßen.' },
  { time: '15:00', title: 'Kirchliche Trauung', icon: '⛪', description: 'St. Matthäus Kirche in Wulfen' },
  { time: '17:00', title: 'Sektempfang', icon: '🥂', description: 'Hecheltjens Hof, Isseltalweg 9, 46499 Hamminkeln' },
  { time: '18:00', title: 'Beginn der Feier', icon: '✨', description: 'Gemeinsam feiern wir den schönsten Tag unseres Lebens.' },
]

export default function ProgramSection() {
  return (
    <section id="programm" className="py-24 px-6" style={{ background: 'var(--beige)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--terracotta)' }}>
            Der Ablauf
          </p>
          <h2 className="font-heading font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--dark-brown)' }}>
            Programm
          </h2>
          <div className="gold-divider w-32 mx-auto mt-4">
            <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✦</span>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)' }}
          />

          <div className="flex flex-col gap-12">
            {programItems.map((item, i) => (
              <div
                key={i}
                className={`flex gap-8 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--terracotta)' }}>
                    {item.time} Uhr
                  </p>
                  <h3 className="font-heading font-semibold text-2xl" style={{ color: 'var(--dark-brown)' }}>
                    {item.title}
                  </h3>
                  <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
                    {item.description}
                  </p>
                </div>

                {/* Center Circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 hidden md:flex"
                  style={{ background: 'var(--cream)', border: '2px solid var(--gold)' }}
                >
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-6 rounded-sm text-center" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.3)' }}>
          <p className="font-heading font-light italic text-lg" style={{ color: 'var(--dark-brown)' }}>
            Für den Heimweg gibt es einen Shuttleservice.
          </p>
          <p className="font-body font-light text-sm mt-2" style={{ color: 'var(--muted)' }}>
            Eure Autos dürfen gerne bis zum nächsten Tag an der Location bleiben.
          </p>
        </div>
      </div>
    </section>
  )
}
