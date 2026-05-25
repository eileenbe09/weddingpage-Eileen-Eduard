'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Users, CheckSquare, DollarSign, Clock, Image, Layout, StickyNote, LogOut, Menu, X, LayoutDashboard, ExternalLink } from 'lucide-react'

const navItems = [
  { href: '/dashboard',            label: 'Übersicht',  icon: LayoutDashboard },
  { href: '/dashboard/gaeste',     label: 'Gästeliste', icon: Users },
  { href: '/dashboard/checkliste', label: 'Checkliste', icon: CheckSquare },
  { href: '/dashboard/budget',     label: 'Budget',     icon: DollarSign },
  { href: '/dashboard/timeline',   label: 'Timeline',   icon: Clock },
  { href: '/dashboard/moodboard',  label: 'Moodboard',  icon: Image },
  { href: '/dashboard/sitzplan',   label: 'Sitzplan',   icon: Layout },
  { href: '/dashboard/notizen',    label: 'Notizen',    icon: StickyNote },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [loading, setLoading]       = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/login')
      else setLoading(false)
    })
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark)' }}>
        <p className="t-display" style={{ fontSize: '2.5rem', fontStyle: 'italic', color: 'var(--gold)' }}>Laden…</p>
      </div>
    )
  }

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--dark)' }}>
      {/* Logo */}
      <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(200,169,110,0.15)' }}>
        <p className="t-display" style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)', lineHeight: 1 }}>
          E &amp; E
        </p>
        <p className="eyebrow" style={{ color: 'rgba(253,250,245,0.25)', fontSize: '0.5rem', marginTop: '0.4rem' }}>
          Brautpaar-Bereich
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.7rem 1rem',
                background: active ? 'rgba(200,169,110,0.12)' : 'transparent',
                color: active ? 'var(--gold)' : 'rgba(253,250,245,0.45)',
                borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
                fontFamily: 'Raleway, sans-serif', fontSize: '0.8rem', fontWeight: active ? 500 : 300,
                letterSpacing: '0.06em', textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
        <Link
          href="/"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1rem',
            fontFamily: 'Raleway, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(253,250,245,0.3)', textDecoration: 'none',
          }}
        >
          <ExternalLink size={12} /> Hochzeitsseite
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1rem',
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(253,250,245,0.25)',
          }}
        >
          <LogOut size={12} /> Abmelden
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--off)' }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex"
        style={{ width: '220px', flexShrink: 0, position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40, flexDirection: 'column' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="md:hidden" style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div style={{ width: '220px', flexShrink: 0 }}>
            <SidebarContent />
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 0 }} className="md:ml-[220px] min-h-screen">
        {/* Mobile Header */}
        <div
          className="md:hidden"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', background: 'var(--dark)', borderBottom: '1px solid rgba(200,169,110,0.15)', position: 'sticky', top: 0, zIndex: 30 }}
        >
          <p className="t-display" style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--gold)', fontWeight: 400 }}>E &amp; E</p>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: 'rgba(253,250,245,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div style={{ padding: '2.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
