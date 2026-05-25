'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#programm', label: 'Programm' },
  { href: '#location', label: 'Location' },
  { href: '#rsvp', label: 'Zusagen' },
  { href: '/rsvp', label: 'RSVP', highlight: true },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(253,250,245,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(184,148,74,0.2)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-script text-3xl" style={{ color: 'var(--gold)' }}>
          E & E
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.highlight ? (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 rounded-full text-sm font-body tracking-widest uppercase transition-all"
                style={{
                  background: 'var(--terracotta)',
                  color: 'white',
                  letterSpacing: '0.1em',
                }}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-body tracking-widest uppercase transition-colors hover:opacity-70"
                style={{ color: 'var(--dark-brown)', letterSpacing: '0.1em' }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ color: 'var(--dark-brown)' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: 'rgba(253,250,245,0.98)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-body tracking-widest uppercase py-2 border-b"
              style={{ color: 'var(--dark-brown)', borderColor: 'var(--beige)', letterSpacing: '0.1em' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
