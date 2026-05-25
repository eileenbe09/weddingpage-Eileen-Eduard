'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--beige) 100%)' }}
    >
      {/* Decorative Pampas SVG Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <svg
          className="absolute -top-10 -left-10 w-80 h-80 opacity-20"
          viewBox="0 0 300 300"
          fill="none"
        >
          <ellipse cx="150" cy="80" rx="8" ry="120" fill="#C8956C" transform="rotate(-20 150 80)" />
          <ellipse cx="150" cy="80" rx="6" ry="100" fill="#B8944A" transform="rotate(10 150 80)" />
          <ellipse cx="150" cy="80" rx="5" ry="90" fill="#C8956C" transform="rotate(-35 150 80)" />
          <ellipse cx="150" cy="80" rx="4" ry="80" fill="#8B6914" transform="rotate(25 150 80)" />
        </svg>
        <svg
          className="absolute -bottom-10 -right-10 w-96 h-96 opacity-20"
          viewBox="0 0 300 300"
          fill="none"
        >
          <ellipse cx="150" cy="220" rx="8" ry="120" fill="#C8956C" transform="rotate(20 150 220)" />
          <ellipse cx="150" cy="220" rx="6" ry="100" fill="#B8944A" transform="rotate(-10 150 220)" />
          <ellipse cx="150" cy="220" rx="5" ry="90" fill="#C8956C" transform="rotate(35 150 220)" />
          <ellipse cx="150" cy="220" rx="4" ry="80" fill="#8B6914" transform="rotate(-25 150 220)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        <p
          className="font-body text-xs tracking-[0.4em] uppercase"
          style={{ color: 'var(--terracotta)' }}
        >
          Wir heiraten
        </p>

        <h1
          className="font-script leading-none"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', color: 'var(--dark-brown)' }}
        >
          Unsere Hochzeit
        </h1>

        <div className="gold-divider w-64">
          <span className="font-heading text-lg" style={{ color: 'var(--gold)' }}>✦</span>
        </div>

        <h2
          className="font-heading font-light"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: 'var(--dark-brown)', letterSpacing: '0.05em' }}
        >
          Eileen & Eduard
        </h2>

        <p
          className="font-body font-light text-lg tracking-[0.3em] uppercase"
          style={{ color: 'var(--muted)' }}
        >
          10 · 07 · 2026
        </p>

        <p
          className="font-body font-light text-base mt-2"
          style={{ color: 'var(--muted)' }}
        >
          St. Matthäus Kirche Wulfen
        </p>

        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <Link
            href="/rsvp"
            className="px-8 py-3 font-body text-sm tracking-widest uppercase transition-all hover:opacity-90"
            style={{
              background: 'var(--terracotta)',
              color: 'white',
              borderRadius: '2px',
              letterSpacing: '0.15em',
            }}
          >
            Zusagen
          </Link>
          <a
            href="#programm"
            className="px-8 py-3 font-body text-sm tracking-widest uppercase border transition-all hover:opacity-70"
            style={{
              borderColor: 'var(--dark-brown)',
              color: 'var(--dark-brown)',
              borderRadius: '2px',
              letterSpacing: '0.15em',
            }}
          >
            Zum Ablauf
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          Scroll
        </span>
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
        />
      </div>
    </section>
  )
}
