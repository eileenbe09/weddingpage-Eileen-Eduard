'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ivory)', borderTop: '1px solid var(--sand)', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        <p
          className="f-display"
          style={{ fontSize: '2.8rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.75rem' }}
        >
          Eileen &amp; Eduard
        </p>

        <p className="eyebrow" style={{ color: 'var(--smoke)', letterSpacing: '0.4em', marginBottom: '2rem' }}>
          10 · 07 · 2026
        </p>

        <div className="ornament" style={{ width: '100px', margin: '0 auto 2rem' }}>
          <span style={{ fontSize: '0.4rem', letterSpacing: '1em', color: 'var(--sand)' }}>◆</span>
        </div>

        <p className="f-ui" style={{ fontSize: '0.78rem', color: 'var(--smoke)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
          Mit Liebe gestaltet für unseren besonderen Tag
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Link href="/rsvp" className="eyebrow" style={{ color: 'var(--sienna)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>RSVP</Link>
          <Link href="/login" className="eyebrow" style={{ color: 'var(--smoke)' }}>Login</Link>
        </div>
      </div>
    </footer>
  )
}
