'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, CheckSquare, DollarSign, Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getCountdown } from '@/lib/utils'

export default function DashboardPage() {
  const [countdown, setCountdown] = useState(getCountdown())
  const [stats, setStats] = useState({ confirmed: 0, declined: 0, pending: 0, totalChecked: 0, totalItems: 0 })

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function loadStats() {
      const [{ data: guests }, { data: checklist }] = await Promise.all([
        supabase.from('guests').select('rsvp_status'),
        supabase.from('checklist_items').select('completed'),
      ])

      if (guests) {
        setStats(prev => ({
          ...prev,
          confirmed: guests.filter(g => g.rsvp_status === 'confirmed').length,
          declined: guests.filter(g => g.rsvp_status === 'declined').length,
          pending: guests.filter(g => g.rsvp_status === 'pending').length,
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
    loadStats()
  }, [])

  const statCards = [
    { label: 'Zusagen', value: stats.confirmed, icon: Heart, color: 'var(--terracotta)', href: '/dashboard/gaeste' },
    { label: 'Absagen', value: stats.declined, icon: Users, color: 'var(--muted)', href: '/dashboard/gaeste' },
    { label: 'Ausstehend', value: stats.pending, icon: Users, color: 'var(--gold)', href: '/dashboard/gaeste' },
    {
      label: 'Checkliste',
      value: `${stats.totalChecked}/${stats.totalItems}`,
      icon: CheckSquare,
      color: 'var(--dark-brown)',
      href: '/dashboard/checkliste',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading font-light" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--dark-brown)' }}>
          Willkommen zurück 💛
        </h1>
        <p className="font-body font-light mt-2" style={{ color: 'var(--muted)' }}>
          Eileen & Eduard · 10. Juli 2026
        </p>
      </div>

      {/* Countdown */}
      <div className="p-8 rounded-sm mb-8" style={{ background: 'var(--dark-brown)' }}>
        <p className="font-body text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'var(--terracotta)' }}>
          Noch bis zum großen Tag
        </p>
        <div className="flex gap-8 flex-wrap">
          {[
            { value: countdown.days, label: 'Tage' },
            { value: countdown.hours, label: 'Stunden' },
            { value: countdown.minutes, label: 'Minuten' },
            { value: countdown.seconds, label: 'Sekunden' },
          ].map((unit, i) => (
            <div key={i}>
              <p className="font-heading tabular-nums" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--cream)', lineHeight: 1 }}>
                {String(unit.value).padStart(2, '0')}
              </p>
              <p className="font-body text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--muted)' }}>
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <Link
              key={i}
              href={card.href}
              className="p-6 rounded-sm transition-shadow hover:shadow-md"
              style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}
            >
              <Icon size={20} style={{ color: card.color }} />
              <p className="font-heading text-3xl font-light mt-3" style={{ color: 'var(--dark-brown)' }}>
                {card.value}
              </p>
              <p className="font-body text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--muted)' }}>
                {card.label}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { href: '/dashboard/gaeste', label: 'Gästeliste', desc: 'RSVP-Status & Verwaltung' },
          { href: '/dashboard/checkliste', label: 'Checkliste', desc: 'Aufgaben im Überblick' },
          { href: '/dashboard/budget', label: 'Budget', desc: 'Kosten verwalten' },
          { href: '/dashboard/timeline', label: 'Timeline', desc: 'Ablauf planen' },
          { href: '/dashboard/moodboard', label: 'Moodboard', desc: 'Inspiration sammeln' },
          { href: '/dashboard/sitzplan', label: 'Sitzplan', desc: 'Tische & Gäste' },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="p-5 rounded-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
            style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}
          >
            <p className="font-heading text-xl font-semibold" style={{ color: 'var(--dark-brown)' }}>
              {item.label}
            </p>
            <p className="font-body font-light text-xs mt-1" style={{ color: 'var(--muted)' }}>
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
