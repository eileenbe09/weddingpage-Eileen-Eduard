'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#programm', label: 'Programm' },
  { href: '#location', label: 'Location' },
  { href: '#rsvp',     label: 'RSVP' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isLight = !scrolled  // auf Hero: durchsichtig, Text weiß

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(248,245,240,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--light)' : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link
          href="/"
          className="t-display"
          style={{ fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 400, color: isLight ? 'var(--gold)' : 'var(--dark)', letterSpacing: '0.05em', lineHeight: 1 }}
        >
          E &amp; E
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="eyebrow transition-colors"
              style={{ color: isLight ? 'rgba(253,250,245,0.7)' : 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = isLight ? 'rgba(253,250,245,0.7)' : 'var(--muted)')}
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/rsvp"
            className="btn"
            style={{
              padding: '0.55rem 1.5rem',
              background: isLight ? 'transparent' : 'var(--dark)',
              color: '#fff',
              border: `1px solid ${isLight ? 'rgba(255,255,255,0.5)' : 'var(--dark)'}`,
              fontSize: '0.58rem',
              letterSpacing: '0.24em',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            Zusagen
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: isLight ? '#fff' : 'var(--dark)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--off)', borderTop: '1px solid var(--light)', padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="eyebrow" style={{ color: 'var(--mid)' }}>
              {l.label}
            </a>
          ))}
          <Link href="/rsvp" className="btn btn-dark" style={{ textAlign: 'center' }} onClick={() => setOpen(false)}>
            Zusagen
          </Link>
        </div>
      )}
    </nav>
  )
}
