'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Search, Trash2, Check, X, Clock } from 'lucide-react'

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
}

const statusConfig = {
  confirmed: { label: 'Zugesagt', icon: Check, color: 'var(--terracotta)' },
  declined: { label: 'Abgesagt', icon: X, color: 'var(--muted)' },
  pending: { label: 'Ausstehend', icon: Clock, color: 'var(--gold)' },
}

export default function GaesteSeite() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'declined' | 'pending'>('all')
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
      name: newGuest.name,
      email: newGuest.email || null,
      phone: newGuest.phone || null,
      adults: newGuest.adults,
      children: newGuest.children,
      rsvp_status: 'pending',
      group_name: newGuest.group_name || null,
    })
    setNewGuest({ name: '', email: '', phone: '', adults: 1, children: 0, group_name: '' })
    setShowForm(false)
    loadGuests()
  }

  async function updateStatus(id: string, status: 'confirmed' | 'declined' | 'pending') {
    await supabase.from('guests').update({ rsvp_status: status }).eq('id', id)
    loadGuests()
  }

  async function deleteGuest(id: string) {
    if (!confirm('Gast wirklich löschen?')) return
    await supabase.from('guests').delete().eq('id', id)
    loadGuests()
  }

  const filtered = guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || g.rsvp_status === filter
    return matchSearch && matchFilter
  })

  const totalAdults = guests.filter(g => g.rsvp_status === 'confirmed').reduce((sum, g) => sum + g.adults, 0)
  const totalChildren = guests.filter(g => g.rsvp_status === 'confirmed').reduce((sum, g) => sum + g.children, 0)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light" style={{ color: 'var(--dark-brown)' }}>Gästeliste</h1>
          <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {guests.filter(g => g.rsvp_status === 'confirmed').length} Zusagen · {totalAdults} Erwachsene · {totalChildren} Kinder
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 font-body text-sm tracking-widest uppercase"
          style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}
        >
          <Plus size={16} />
          Gast hinzufügen
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.3)' }}>
          <h3 className="font-heading text-xl mb-4" style={{ color: 'var(--dark-brown)' }}>Neuer Gast</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name *"
              value={newGuest.name}
              onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="Gruppe / Familie"
              value={newGuest.group_name}
              onChange={e => setNewGuest({ ...newGuest, group_name: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="E-Mail"
              value={newGuest.email}
              onChange={e => setNewGuest({ ...newGuest, email: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="Telefon"
              value={newGuest.phone}
              onChange={e => setNewGuest({ ...newGuest, phone: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addGuest}
              className="px-6 py-2 font-body text-sm tracking-widest uppercase"
              style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}
            >
              Hinzufügen
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2 font-body text-sm tracking-widest uppercase border"
              style={{ borderColor: 'var(--muted)', color: 'var(--muted)', borderRadius: '2px' }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div
          className="flex items-center gap-2 px-4 py-2 flex-1 min-w-48"
          style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)', borderRadius: '2px' }}
        >
          <Search size={14} style={{ color: 'var(--muted)' }} />
          <input
            placeholder="Gast suchen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 font-body text-sm bg-transparent outline-none"
            style={{ color: 'var(--dark-brown)' }}
          />
        </div>
        {(['all', 'confirmed', 'declined', 'pending'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 font-body text-xs tracking-widest uppercase transition-all"
            style={{
              background: filter === f ? 'var(--dark-brown)' : 'var(--cream)',
              color: filter === f ? 'var(--cream)' : 'var(--muted)',
              borderRadius: '2px',
              border: '1px solid rgba(184,148,74,0.2)',
            }}
          >
            {f === 'all' ? 'Alle' : statusConfig[f].label}
          </button>
        ))}
      </div>

      {/* Guest List */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Lädt...</p>
        ) : filtered.length === 0 ? (
          <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Keine Gäste gefunden.</p>
        ) : (
          filtered.map(guest => {
            const sc = statusConfig[guest.rsvp_status]
            const Icon = sc.icon
            return (
              <div
                key={guest.id}
                className="p-5 rounded-sm flex items-center justify-between gap-4 flex-wrap"
                style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.15)' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-heading text-lg font-semibold" style={{ color: 'var(--dark-brown)' }}>
                      {guest.name}
                    </p>
                    {guest.group_name && (
                      <span className="font-body text-xs px-2 py-0.5" style={{ background: 'var(--beige)', color: 'var(--muted)', borderRadius: '2px' }}>
                        {guest.group_name}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs mt-1" style={{ color: 'var(--muted)' }}>
                    {guest.adults} Erw. · {guest.children} Kinder
                    {guest.dietary_notes && ` · ${guest.dietary_notes}`}
                    {guest.email && ` · ${guest.email}`}
                  </p>
                  {guest.message && (
                    <p className="font-body italic text-xs mt-1" style={{ color: 'var(--muted)' }}>
                      „{guest.message}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(0,0,0,0.05)' }}>
                    <Icon size={12} style={{ color: sc.color }} />
                    <span className="font-body text-xs" style={{ color: sc.color }}>{sc.label}</span>
                  </div>

                  <select
                    value={guest.rsvp_status}
                    onChange={e => updateStatus(guest.id, e.target.value as Guest['rsvp_status'])}
                    className="font-body text-xs border px-2 py-1.5 bg-transparent outline-none cursor-pointer"
                    style={{ borderColor: 'rgba(184,148,74,0.3)', color: 'var(--dark-brown)', borderRadius: '2px' }}
                  >
                    <option value="confirmed">Zugesagt</option>
                    <option value="declined">Abgesagt</option>
                    <option value="pending">Ausstehend</option>
                  </select>

                  <button
                    onClick={() => deleteGuest(guest.id)}
                    className="p-1.5 transition-colors hover:opacity-70"
                    style={{ color: 'var(--muted)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
