'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-16 px-6 text-center" style={{ background: 'var(--warm-white)', borderTop: '1px solid var(--sand)' }}>
      <div className="max-w-xl mx-auto">

        <p className="f-script mb-3" style={{ fontSize: '3.5rem', color: 'var(--honey)', lineHeight: 1 }}>
          Eileen &amp; Eduard
        </p>

        <p className="eyebrow mb-8" style={{ color: 'var(--muted)', letterSpacing: '0.35em' }}>
          10 · 07 · 2026
        </p>

        <div className="ornament w-32 mx-auto mb-8">
          <span style={{ color: 'var(--sand)', fontSize: '0.5rem', letterSpacing: '0.8em' }}>✦ ✦ ✦</span>
        </div>

        <p className="f-sans mb-6" style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.8 }}>
          Mit Liebe gestaltet für unseren besonderen Tag
        </p>

        <div className="flex justify-center gap-8">
          <Link href="/rsvp" className="eyebrow hover:text-[var(--honey)] transition-colors" style={{ color: 'var(--caramel)' }}>
            RSVP
          </Link>
          <Link href="/login" className="eyebrow hover:text-[var(--honey)] transition-colors" style={{ color: 'var(--muted)' }}>
            Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
