'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2 } from 'lucide-react'

type TimelineEvent = {
  id: string
  time: string
  title: string
  description: string | null
  location: string | null
  order_index: number
}

const defaultEvents = [
  { time: '14:45', title: 'Treffen vor der Kirche', description: 'Gäste versammeln sich vor der St. Matthäus Kirche', location: 'St. Matthäus Kirche, Wulfen', order_index: 1 },
  { time: '15:00', title: 'Kirchliche Trauung', description: 'Die kirchliche Trauungszeremonie beginnt', location: 'St. Matthäus Kirche, Wulfen', order_index: 2 },
  { time: '16:30', title: 'Anfahrt zur Location', description: 'Gemeinsame Anfahrt zum Hecheltjens Hof', location: '', order_index: 3 },
  { time: '17:00', title: 'Sektempfang', description: 'Willkommen mit Sekt und Häppchen', location: 'Hecheltjens Hof, Hamminkeln', order_index: 4 },
  { time: '18:00', title: 'Beginn der Feier', description: 'Das Abendessen und die große Feier beginnen', location: 'Hecheltjens Hof, Hamminkeln', order_index: 5 },
]

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newEvent, setNewEvent] = useState({ time: '', title: '', description: '', location: '' })

  async function loadEvents() {
    const { data } = await supabase.from('timeline_events').select('*').order('order_index')
    if (data) setEvents(data as TimelineEvent[])
    setLoading(false)
  }

  useEffect(() => { loadEvents() }, [])

  async function addEvent() {
    if (!newEvent.time || !newEvent.title) return
    const maxOrder = Math.max(...events.map(e => e.order_index), 0)
    await supabase.from('timeline_events').insert({
      time: newEvent.time,
      title: newEvent.title,
      description: newEvent.description || null,
      location: newEvent.location || null,
      order_index: maxOrder + 1,
    })
    setNewEvent({ time: '', title: '', description: '', location: '' })
    setShowForm(false)
    loadEvents()
  }

  async function deleteEvent(id: string) {
    await supabase.from('timeline_events').delete().eq('id', id)
    loadEvents()
  }

  async function seedDefaults() {
    for (const event of defaultEvents) {
      await supabase.from('timeline_events').insert(event)
    }
    loadEvents()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light" style={{ color: 'var(--dark-brown)' }}>Timeline</h1>
          <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Ablauf des Hochzeitstages
          </p>
        </div>
        <div className="flex gap-3">
          {events.length === 0 && (
            <button
              onClick={seedDefaults}
              className="px-4 py-2.5 font-body text-sm tracking-widest uppercase border"
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)', borderRadius: '2px' }}
            >
              Standard laden
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-2.5 font-body text-sm tracking-widest uppercase"
            style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}
          >
            <Plus size={16} />
            Ereignis
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.3)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="time"
              value={newEvent.time}
              onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="Bezeichnung *"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="Ort"
              value={newEvent.location}
              onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              placeholder="Beschreibung"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addEvent} className="px-6 py-2 font-body text-sm" style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}>Hinzufügen</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 font-body text-sm border" style={{ borderColor: 'var(--muted)', color: 'var(--muted)', borderRadius: '2px' }}>Abbrechen</button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        <div
          className="absolute left-20 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--gold) 10%, var(--gold) 90%, transparent)' }}
        />

        <div className="flex flex-col gap-0">
          {loading ? (
            <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Lädt...</p>
          ) : events.length === 0 ? (
            <p className="font-body text-sm text-center py-12" style={{ color: 'var(--muted)' }}>Noch keine Ereignisse.</p>
          ) : (
            events.map((event, i) => (
              <div key={event.id} className="flex gap-6 pb-10 relative">
                <div className="w-20 flex-shrink-0 text-right pt-1">
                  <span className="font-body text-sm font-medium" style={{ color: 'var(--terracotta)' }}>
                    {event.time}
                  </span>
                </div>

                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-2 z-10"
                  style={{ background: 'var(--gold)', border: '2px solid var(--cream)', marginLeft: '-1px' }}
                />

                <div
                  className="flex-1 p-4 rounded-sm group"
                  style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-semibold" style={{ color: 'var(--dark-brown)' }}>
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="font-body text-xs mt-0.5" style={{ color: 'var(--terracotta)' }}>
                          📍 {event.location}
                        </p>
                      )}
                      {event.description && (
                        <p className="font-body font-light text-sm mt-2" style={{ color: 'var(--muted)' }}>
                          {event.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      style={{ color: 'var(--muted)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
