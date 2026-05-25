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
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(253,250,246,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--sand)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-8 h-[68px] flex items-center justify-between">
        <Link href="/" className="f-script text-4xl leading-none" style={{ color: 'var(--honey)' }}>
          E &amp; E
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a key={l.href} href={l.href} className="eyebrow hover:text-[var(--honey)] transition-colors">
              {l.label}
            </a>
          ))}
          <Link href="/rsvp" className="btn-primary" style={{ padding: '0.55rem 1.8rem' }}>
            Zusagen
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: 'var(--espresso)' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-8 pb-8 flex flex-col gap-6" style={{ background: 'var(--warm-white)', borderTop: '1px solid var(--sand)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="eyebrow py-1">
              {l.label}
            </a>
          ))}
          <Link href="/rsvp" className="btn-primary text-center" onClick={() => setOpen(false)}>
            Zusagen
          </Link>
        </div>
      )}
    </nav>
  )
}
