'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, CheckSquare, DollarSign, Clock, Image, Layout, StickyNote, UserCheck, UserX, UserMinus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getCountdown } from '@/lib/utils'

const modules = [
  { href: '/dashboard/gaeste',     label: 'Gästeliste', desc: 'RSVP & Verwaltung',      icon: Users },
  { href: '/dashboard/checkliste', label: 'Checkliste', desc: 'Aufgaben im Überblick',   icon: CheckSquare },
  { href: '/dashboard/budget',     label: 'Budget',     desc: 'Kosten & Ausgaben',       icon: DollarSign },
  { href: '/dashboard/timeline',   label: 'Timeline',   desc: 'Ablauf planen',            icon: Clock },
  { href: '/dashboard/moodboard',  label: 'Moodboard',  desc: 'Inspiration sammeln',      icon: Image },
  { href: '/dashboard/sitzplan',   label: 'Sitzplan',   desc: 'Tische & Gäste',          icon: Layout },
  { href: '/dashboard/notizen',    label: 'Notizen',    desc: 'Gedanken festhalten',      icon: StickyNote },
]

export default function DashboardPage() {
  const [cd, setCd] = useState(getCountdown())
  const [stats, setStats] = useState({ confirmed: 0, declined: 0, pending: 0, totalChecked: 0, totalItems: 0, totalPersons: 0 })

  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    async function load() {
      const [{ data: guests }, { data: checklist }] = await Promise.all([
        supabase.from('guests').select('rsvp_status, adults, children'),
        supabase.from('checklist_items').select('completed'),
      ])
      if (guests) {
        const confirmed = guests.filter(g => g.rsvp_status === 'confirmed')
        setStats(prev => ({
          ...prev,
          confirmed: confirmed.length,
          declined: guests.filter(g => g.rsvp_status === 'declined').length,
          pending: guests.filter(g => g.rsvp_status === 'pending').length,
          totalPersons: confirmed.reduce((s, g) => s + (g.adults || 0) + (g.children || 0), 0),
        }))
      }
      if (checklist) {
        setStats(prev => ({
          ...prev,
          totalChecked: checklist.filter(i => i.completed).length,
          totalItems: checklist.length,
        }))
      }
    }
    load()
  }, [])

  const checklistPct = stats.totalItems > 0 ? Math.round((stats.totalChecked / stats.totalItems) * 100) : 0

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Willkommen zurück</p>
        <h1 className="t-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--dark)', lineHeight: 1.1 }}>
          Eileen &amp; Eduard
        </h1>
        <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.3rem' }}>10. Juli 2026</p>
      </div>

      {/* Countdown-Banner */}
      <div style={{
        background: 'var(--dark)', padding: '2rem 2.5rem', marginBottom: '2rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
      }}>
        <p className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>Noch bis zum großen Tag</p>
        <div style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3.5rem)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {[
            { v: cd.days,    l: 'Tage' },
            { v: cd.hours,   l: 'Stunden' },
            { v: cd.minutes, l: 'Minuten' },
            { v: cd.seconds, l: 'Sekunden' },
          ].map((u, i) => (
            <div key={i}>
              <p className="t-display" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', color: '#FDFAF5', fontWeight: 400, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {String(u.v).padStart(2, '0')}
              </p>
              <p className="eyebrow" style={{ color: 'rgba(200,169,110,0.5)', fontSize: '0.48rem', marginTop: '0.4rem' }}>
                {u.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Zusagen',   value: stats.confirmed,   icon: UserCheck,  color: '#5A8A6A', sub: `${stats.totalPersons} Personen` },
          { label: 'Absagen',   value: stats.declined,    icon: UserX,      color: 'var(--rose)', sub: '' },
          { label: 'Ausstehend', value: stats.pending,   icon: UserMinus,  color: 'var(--gold)', sub: '' },
          { label: 'Checkliste', value: `${checklistPct}%`, icon: CheckSquare, color: 'var(--mid)', sub: `${stats.totalChecked}/${stats.totalItems} erledigt` },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--light)', padding: '1.25rem 1.5rem' }}>
              <Icon size={16} style={{ color: s.color, marginBottom: '0.75rem' }} />
              <p className="t-display" style={{ fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--dark)', lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="eyebrow" style={{ color: 'var(--muted)', fontSize: '0.5rem', marginTop: '0.4rem' }}>{s.label}</p>
              {s.sub && <p className="t-ui" style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{s.sub}</p>}
            </div>
          )
        })}
      </div>

      {/* Checkliste Progress Bar */}
      {stats.totalItems > 0 && (
        <div style={{ background: 'var(--white)', border: '1px solid var(--light)', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <p className="eyebrow" style={{ fontSize: '0.5rem' }}>Planungsfortschritt</p>
            <p className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--gold)' }}>{checklistPct}%</p>
          </div>
          <div style={{ height: '4px', background: 'var(--light)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${checklistPct}%`, background: 'var(--gold)', transition: 'width 0.5s ease', borderRadius: '2px' }} />
          </div>
        </div>
      )}

      {/* Module Grid */}
      <div>
        <p className="eyebrow" style={{ marginBottom: '1rem', fontSize: '0.5rem' }}>Schnellzugriff</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {modules.map(m => {
            const Icon = m.icon
            return (
              <Link
                key={m.href}
                href={m.href}
                style={{
                  background: 'var(--white)', border: '1px solid var(--light)', padding: '1.5rem',
                  textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s', display: 'block',
                }}
                className="card"
              >
                <Icon size={18} style={{ color: 'var(--gold)', marginBottom: '0.875rem' }} />
                <p className="t-display" style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--dark)', marginBottom: '0.2rem' }}>
                  {m.label}
                </p>
                <p className="t-ui" style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.5 }}>{m.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
