'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ background: 'var(--beige)', borderTop: '1px solid rgba(184,148,74,0.2)' }}>
      <div className="max-w-4xl mx-auto">
        <p className="font-script text-4xl mb-4" style={{ color: 'var(--gold)' }}>
          Eileen & Eduard
        </p>
        <p className="font-body font-light text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          10 · 07 · 2026
        </p>
        <div className="gold-divider w-32 mx-auto my-6">
          <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>✦</span>
        </div>
        <p className="font-body font-light text-xs" style={{ color: 'var(--muted)' }}>
          Mit Liebe gestaltet für unseren besonderen Tag
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/rsvp" className="font-body text-xs tracking-widest uppercase hover:opacity-70" style={{ color: 'var(--terracotta)' }}>
            RSVP
          </Link>
          <Link href="/login" className="font-body text-xs tracking-widest uppercase hover:opacity-70" style={{ color: 'var(--muted)' }}>
            Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
