'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(200,169,110,0.15)', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        <p
          className="t-display"
          style={{ fontSize: '2.8rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.75rem' }}
        >
          Eileen &amp; Eduard
        </p>

        <p className="eyebrow" style={{ color: 'rgba(253,250,245,0.3)', letterSpacing: '0.4em', marginBottom: '2rem' }}>
          10 · 07 · 2026
        </p>

        <div className="divider" style={{ width: '80px', margin: '0 auto 2rem' }}>
          <span style={{ fontSize: '0.4rem', letterSpacing: '1em', color: 'rgba(200,169,110,0.3)' }}>◆</span>
        </div>

        <p className="t-ui" style={{ fontSize: '0.78rem', color: 'rgba(253,250,245,0.3)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
          Mit Liebe gestaltet für unseren besonderen Tag
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Link href="/rsvp" className="eyebrow" style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>RSVP</Link>
          <Link href="/login" className="eyebrow" style={{ color: 'rgba(253,250,245,0.3)' }}>Login</Link>
        </div>
      </div>
    </footer>
  )
}
