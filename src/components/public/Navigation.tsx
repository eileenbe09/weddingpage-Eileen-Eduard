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
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(250,247,242,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--sand)' : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="f-display"
          style={{ fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', letterSpacing: '0.05em' }}
        >
          E &amp; E
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="eyebrow hover:text-[var(--gold)] transition-colors"
              style={{ color: scrolled ? 'var(--smoke)' : 'var(--mahogany)' }}
            >
              {l.label}
            </a>
          ))}
          <Link href="/rsvp" className="btn btn-filled" style={{ padding: '0.55rem 1.6rem' }}>
            Zusagen
          </Link>
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: 'var(--espresso)' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden flex flex-col gap-5 px-8 py-6"
          style={{ background: 'var(--ivory)', borderTop: '1px solid var(--sand)' }}
        >
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="eyebrow">
              {l.label}
            </a>
          ))}
          <Link href="/rsvp" className="btn btn-filled text-center" onClick={() => setOpen(false)}>
            Zusagen
          </Link>
        </div>
      )}
    </nav>
  )
}
