'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  Users, CheckSquare, DollarSign, Clock, Image, Layout, StickyNote, LogOut, Menu, X, Heart
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Übersicht', icon: Heart },
  { href: '/dashboard/gaeste', label: 'Gästeliste', icon: Users },
  { href: '/dashboard/checkliste', label: 'Checkliste', icon: CheckSquare },
  { href: '/dashboard/budget', label: 'Budget', icon: DollarSign },
  { href: '/dashboard/timeline', label: 'Timeline', icon: Clock },
  { href: '/dashboard/moodboard', label: 'Moodboard', icon: Image },
  { href: '/dashboard/sitzplan', label: 'Sitzplan', icon: Layout },
  { href: '/dashboard/notizen', label: 'Notizen', icon: StickyNote },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <p className="font-script text-4xl" style={{ color: 'var(--gold)' }}>Laden...</p>
      </div>
    )
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full" style={{ background: 'var(--dark-brown)' }}>
      <div className="p-6 border-b" style={{ borderColor: 'rgba(184,148,74,0.2)' }}>
        <p className="font-script text-3xl" style={{ color: 'var(--gold)' }}>E & E</p>
        <p className="font-body text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--muted)' }}>
          Planung
        </p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-body text-sm"
              style={{
                background: active ? 'rgba(184,148,74,0.15)' : 'transparent',
                color: active ? 'var(--gold)' : 'rgba(253,250,245,0.6)',
                borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
              }}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: 'rgba(184,148,74,0.2)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-sm font-body text-sm transition-all hover:opacity-70"
          style={{ color: 'rgba(253,250,245,0.4)' }}
        >
          <LogOut size={16} />
          Abmelden
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 mt-1 rounded-sm font-body text-xs tracking-widest uppercase transition-all hover:opacity-70"
          style={{ color: 'var(--terracotta)' }}
        >
          Zur Hochzeitsseite →
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--beige)' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed left-0 top-0 bottom-0 z-40">
        <Sidebar />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 flex flex-col">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {/* Mobile Header */}
        <div
          className="md:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-30"
          style={{ background: 'var(--dark-brown)', borderColor: 'rgba(184,148,74,0.2)' }}
        >
          <p className="font-script text-2xl" style={{ color: 'var(--gold)' }}>E & E</p>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: 'var(--cream)' }}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
