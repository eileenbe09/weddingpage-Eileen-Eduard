'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Search, Trash2, Check, X, Clock, Download } from 'lucide-react'

type Guest = {
  id: string
  name: string
  email: string | null
  phone: string | null
  rsvp_status: 'confirmed' | 'declined' | 'pending'
  adults: number
  children: number
  dietary_notes: string | null
  message: string | null
  table_number: number | null
  group_name: string | null
  created_at: string
}

const statusConfig = {
  confirmed: { label: 'Zugesagt',   icon: Check, color: '#5A8A6A' },
  declined:  { label: 'Abgesagt',   icon: X,     color: '#9A8A7A' },
  pending:   { label: 'Ausstehend', icon: Clock,  color: '#C8A96E' },
}

function DonutChart({ confirmed, declined, pending }: { confirmed: number; declined: number; pending: number }) {
  const total = confirmed + declined + pending
  if (total === 0) return null

  const r = 52
  const cx = 70
  const cy = 70
  const circ = 2 * Math.PI * r

  const segments = [
    { value: confirmed, color: '#5A8A6A', label: 'Zusagen' },
    { value: declined,  color: '#C4856A', label: 'Absagen' },
    { value: pending,   color: '#C8A96E', label: 'Offen' },
  ]

  let offset = 0
  const arcs = segments.map(s => {
    const dash = (s.value / total) * circ
    const arc = { ...s, dash, offset }
    offset += dash
    return arc
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--light)" strokeWidth="16" />
        {arcs.map((arc, i) => arc.value > 0 && (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth="16"
            strokeDasharray={`${arc.dash} ${circ - arc.dash}`}
            strokeDashoffset={-arc.offset + circ / 4}
            strokeLinecap="butt"
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontSize: '20px', fontFamily: 'Playfair Display, serif', fill: 'var(--dark)', fontStyle: 'italic' }}>{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: '8px', fontFamily: 'Raleway, sans-serif', fill: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Gesamt</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.78rem', color: 'var(--muted)' }}>
              {s.label} <strong style={{ color: 'var(--dark)' }}>{s.value}</strong>
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.25rem', borderTop: '1px solid var(--light)', paddingTop: '0.4rem' }}>
          <div style={{ width: '10px', height: '10px', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.78rem', color: 'var(--muted)' }}>
            Personen <strong style={{ color: 'var(--dark)' }}>{
              (confirmed > 0
                ? (Math.max(0, confirmed))
                : 0)
            }</strong>
          </span>
        </div>
      </div>
    </div>
  )
}

function exportCSV(guests: Guest[]) {
  const headers = ['Name', 'Status', 'Erwachsene', 'Kinder', 'E-Mail', 'Telefon', 'Ernährung', 'Gruppe', 'Nachricht', 'Datum']
  const rows = guests.map(g => [
    g.name,
    statusConfig[g.rsvp_status].label,
    g.adults,
    g.children,
    g.email ?? '',
    g.phone ?? '',
    g.dietary_notes ?? '',
    g.group_name ?? '',
    g.message ?? '',
    new Date(g.created_at).toLocaleDateString('de-DE'),
  ])
  const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'gaesteliste.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function GaesteSeite() {
  const [guests, setGuests]   = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState<'all' | 'confirmed' | 'declined' | 'pending'>('all')
  const [showForm, setShowForm] = useState(false)
  const [newGuest, setNewGuest] = useState({ name: '', email: '', phone: '', adults: 1, children: 0, group_name: '' })

  async function loadGuests() {
    const { data } = await supabase.from('guests').select('*').order('created_at', { ascending: false })
    if (data) setGuests(data as Guest[])
    setLoading(false)
  }

  useEffect(() => { loadGuests() }, [])

  async function addGuest() {
    if (!newGuest.name) return
    await supabase.from('guests').insert({
      name: newGuest.name, email: newGuest.email || null, phone: newGuest.phone || null,
      adults: newGuest.adults, children: newGuest.children, rsvp_status: 'pending',
      group_name: newGuest.group_name || null,
    })
    setNewGuest({ name: '', email: '', phone: '', adults: 1, children: 0, group_name: '' })
    setShowForm(false)
    loadGuests()
  }

  async function updateStatus(id: string, status: Guest['rsvp_status']) {
    await supabase.from('guests').update({ rsvp_status: status }).eq('id', id)
    loadGuests()
  }

  async function deleteGuest(id: string) {
    if (!confirm('Gast wirklich löschen?')) return
    await supabase.from('guests').delete().eq('id', id)
    loadGuests()
  }

  const confirmed = guests.filter(g => g.rsvp_status === 'confirmed')
  const declined  = guests.filter(g => g.rsvp_status === 'declined')
  const pending   = guests.filter(g => g.rsvp_status === 'pending')
  const totalAdults   = confirmed.reduce((s, g) => s + g.adults, 0)
  const totalChildren = confirmed.reduce((s, g) => s + g.children, 0)

  const filtered = guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || g.rsvp_status === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="t-display" style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--dark)' }}>Gästeliste</h1>
          <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
            {confirmed.length} Zusagen · {totalAdults} Erw. · {totalChildren} Kinder
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => exportCSV(guests)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.2rem', background: 'transparent', border: '1px solid var(--light)', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            <Download size={13} /> CSV
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.4rem', background: 'var(--dark)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            <Plus size={14} /> Gast hinzufügen
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--light)', padding: '1.5rem 2rem', gridColumn: 'span 2' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem', fontSize: '0.52rem' }}>Übersicht</p>
          <DonutChart confirmed={confirmed.length} declined={declined.length} pending={pending.length} />
        </div>
        <div style={{ background: 'var(--white)', border: '1px solid var(--light)', padding: '1.5rem 2rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem', fontSize: '0.52rem' }}>Personen gesamt</p>
          <p className="t-display" style={{ fontSize: '2.5rem', fontStyle: 'italic', color: 'var(--dark)', fontWeight: 400 }}>{totalAdults + totalChildren}</p>
          <p className="t-ui" style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{totalAdults} Erw. · {totalChildren} Kinder</p>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div style={{ background: 'var(--off)', border: '1px solid var(--light)', padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h3 className="t-display" style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--dark)', marginBottom: '1.25rem' }}>Neuer Gast</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Name *', key: 'name', type: 'text', ph: 'Vor- und Nachname' },
              { label: 'Gruppe / Familie', key: 'group_name', type: 'text', ph: 'z. B. Familie Müller' },
              { label: 'E-Mail', key: 'email', type: 'email', ph: 'name@email.de' },
              { label: 'Telefon', key: 'phone', type: 'tel', ph: 'Telefonnummer' },
            ].map(f => (
              <div key={f.key}>
                <label className="eyebrow" style={{ fontSize: '0.52rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>{f.label}</label>
                <input
                  type={f.type} placeholder={f.ph}
                  value={(newGuest as Record<string, string | number>)[f.key] as string}
                  onChange={e => setNewGuest({ ...newGuest, [f.key]: e.target.value })}
                  className="field"
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button onClick={addGuest} className="btn btn-dark" style={{ padding: '0.6rem 1.5rem' }}>Hinzufügen</button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>Abbrechen</button>
          </div>
        </div>
      )}

      {/* Filter & Search */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '180px', background: 'var(--white)', border: '1px solid var(--light)', padding: '0.55rem 1rem' }}>
          <Search size={13} style={{ color: 'var(--muted)' }} />
          <input
            placeholder="Gast suchen…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: 'var(--dark)' }}
          />
        </div>
        {(['all', 'confirmed', 'declined', 'pending'] as const).map(f => (
          <button
            key={f} onClick={() => setFilter(f)}
            style={{
              padding: '0.55rem 1rem', border: '1px solid var(--light)', cursor: 'pointer',
              background: filter === f ? 'var(--dark)' : 'var(--white)',
              color: filter === f ? '#fff' : 'var(--muted)',
              fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}
          >
            {f === 'all' ? `Alle ${guests.length}` : `${statusConfig[f].label} ${f === 'confirmed' ? confirmed.length : f === 'declined' ? declined.length : pending.length}`}
          </button>
        ))}
      </div>

      {/* Guest List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {loading ? (
          <p className="t-ui" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)', fontSize: '0.85rem' }}>Lädt…</p>
        ) : filtered.length === 0 ? (
          <p className="t-ui" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)', fontSize: '0.85rem' }}>Keine Gäste gefunden.</p>
        ) : filtered.map((guest, idx) => {
          const sc = statusConfig[guest.rsvp_status]
          const Icon = sc.icon
          return (
            <div
              key={guest.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
                padding: '1rem 1.25rem',
                background: idx % 2 === 0 ? 'var(--white)' : 'var(--off)',
                borderBottom: '1px solid var(--light)',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span className="t-display" style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--dark)' }}>{guest.name}</span>
                  {guest.group_name && (
                    <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--light)', padding: '0.2rem 0.6rem' }}>
                      {guest.group_name}
                    </span>
                  )}
                </div>
                <p className="t-ui" style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                  {guest.adults} Erw. · {guest.children} Kinder
                  {guest.dietary_notes && ` · ${guest.dietary_notes}`}
                  {guest.email && ` · ${guest.email}`}
                </p>
                {guest.message && (
                  <p className="t-display" style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                    „{guest.message}"
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Icon size={12} style={{ color: sc.color }} />
                  <span className="t-ui" style={{ fontSize: '0.75rem', color: sc.color }}>{sc.label}</span>
                </div>

                <select
                  value={guest.rsvp_status}
                  onChange={e => updateStatus(guest.id, e.target.value as Guest['rsvp_status'])}
                  style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.75rem', border: '1px solid var(--light)', padding: '0.3rem 0.5rem', background: 'var(--white)', color: 'var(--dark)', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="confirmed">Zugesagt</option>
                  <option value="declined">Abgesagt</option>
                  <option value="pending">Ausstehend</option>
                </select>

                <button onClick={() => deleteGuest(guest.id)} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
