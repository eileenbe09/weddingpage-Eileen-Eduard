'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Users } from 'lucide-react'

type Table = {
  id: string
  name: string
  seats: number
  x_pos: number
  y_pos: number
  shape: 'round' | 'rect'
}

type Guest = {
  id: string
  name: string
  table_number: number | null
  rsvp_status: string
  adults: number
}

export default function SitzplanPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [showTableForm, setShowTableForm] = useState(false)
  const [newTable, setNewTable] = useState<{ name: string; seats: number; shape: 'round' | 'rect' }>({ name: '', seats: 8, shape: 'round' })
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  async function loadData() {
    const [{ data: tablesData }, { data: guestsData }] = await Promise.all([
      supabase.from('tables').select('*'),
      supabase.from('guests').select('id, name, table_number, rsvp_status, adults').eq('rsvp_status', 'confirmed'),
    ])
    if (tablesData) setTables(tablesData as Table[])
    if (guestsData) setGuests(guestsData as Guest[])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function addTable() {
    if (!newTable.name) return
    await supabase.from('tables').insert({
      name: newTable.name,
      seats: newTable.seats,
      shape: newTable.shape,
      x_pos: Math.random() * 400 + 50,
      y_pos: Math.random() * 300 + 50,
    })
    setNewTable({ name: '', seats: 8, shape: 'round' })
    setShowTableForm(false)
    loadData()
  }

  async function deleteTable(id: string) {
    await supabase.from('tables').delete().eq('id', id)
    await supabase.from('guests').update({ table_number: null }).eq('table_number', parseInt(id))
    loadData()
  }

  async function assignGuestToTable(guestId: string, tableId: string | null) {
    const tableNum = tableId ? parseInt(tableId) : null
    await supabase.from('guests').update({ table_number: tableNum }).eq('id', guestId)
    loadData()
  }

  function handleMouseDown(e: React.MouseEvent, tableId: string, x: number, y: number) {
    setDragging(tableId)
    setDragOffset({ x: e.clientX - x, y: e.clientY - y })
  }

  async function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!dragging) return
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    setTables(prev => prev.map(t => t.id === dragging ? { ...t, x_pos: newX, y_pos: newY } : t))
  }

  async function handleMouseUp() {
    if (!dragging) return
    const table = tables.find(t => t.id === dragging)
    if (table) {
      await supabase.from('tables').update({ x_pos: table.x_pos, y_pos: table.y_pos }).eq('id', dragging)
    }
    setDragging(null)
  }

  const unassignedGuests = guests.filter(g => g.table_number === null)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-light" style={{ color: 'var(--dark-brown)' }}>Sitzplan</h1>
          <p className="font-body font-light text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {tables.length} Tische · {guests.length} Gäste
          </p>
        </div>
        <button
          onClick={() => setShowTableForm(!showTableForm)}
          className="flex items-center gap-2 px-5 py-2.5 font-body text-sm tracking-widest uppercase"
          style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}
        >
          <Plus size={16} />
          Tisch
        </button>
      </div>

      {/* Add Table Form */}
      {showTableForm && (
        <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.3)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Tischname *"
              value={newTable.name}
              onChange={e => setNewTable({ ...newTable, name: e.target.value })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <input
              type="number"
              min={2}
              max={20}
              placeholder="Plätze"
              value={newTable.seats}
              onChange={e => setNewTable({ ...newTable, seats: parseInt(e.target.value) })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            />
            <select
              value={newTable.shape}
              onChange={e => setNewTable({ ...newTable, shape: e.target.value as 'round' | 'rect' })}
              className="px-4 py-2 font-body text-sm border-b-2 bg-transparent outline-none cursor-pointer"
              style={{ borderColor: 'rgba(184,148,74,0.4)', color: 'var(--dark-brown)' }}
            >
              <option value="round">Rund</option>
              <option value="rect">Rechteckig</option>
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addTable} className="px-6 py-2 font-body text-sm" style={{ background: 'var(--terracotta)', color: 'white', borderRadius: '2px' }}>Hinzufügen</button>
            <button onClick={() => setShowTableForm(false)} className="px-6 py-2 font-body text-sm border" style={{ borderColor: 'var(--muted)', color: 'var(--muted)', borderRadius: '2px' }}>Abbrechen</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Floor Plan */}
        <div
          className="lg:col-span-3 relative overflow-hidden rounded-sm cursor-move select-none"
          style={{ background: 'var(--beige)', border: '2px solid rgba(184,148,74,0.2)', minHeight: '500px' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="font-body text-xs tracking-widest uppercase" style={{ color: 'rgba(184,148,74,0.3)' }}>
              Grundriss · Tische verschieben
            </p>
          </div>

          {/* Dancefloor */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center"
            style={{ width: '140px', height: '80px', background: 'rgba(184,148,74,0.15)', border: '1px dashed rgba(184,148,74,0.4)', borderRadius: '4px' }}
          >
            <span className="font-body text-xs" style={{ color: 'var(--gold)' }}>Tanzfläche</span>
          </div>

          {tables.map(table => {
            const tableGuests = guests.filter(g => g.table_number === parseInt(table.id))
            const occupancy = tableGuests.reduce((s, g) => s + g.adults, 0)
            return (
              <div
                key={table.id}
                onMouseDown={(e) => handleMouseDown(e, table.id, table.x_pos, table.y_pos)}
                className="absolute cursor-grab active:cursor-grabbing group"
                style={{ left: table.x_pos, top: table.y_pos, transform: 'translate(-50%, -50%)' }}
              >
                <div
                  className="flex flex-col items-center justify-center gap-1 shadow-md relative"
                  style={{
                    width: table.shape === 'round' ? '80px' : '100px',
                    height: table.shape === 'round' ? '80px' : '60px',
                    background: 'var(--cream)',
                    border: '2px solid var(--gold)',
                    borderRadius: table.shape === 'round' ? '50%' : '4px',
                  }}
                >
                  <p className="font-body text-xs font-medium text-center px-1" style={{ color: 'var(--dark-brown)', fontSize: '0.65rem', lineHeight: 1.2 }}>
                    {table.name}
                  </p>
                  <p className="font-body text-xs" style={{ color: occupancy > table.seats ? 'var(--terracotta)' : 'var(--muted)', fontSize: '0.65rem' }}>
                    {occupancy}/{table.seats}
                  </p>
                  <button
                    onClick={() => deleteTable(table.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ background: 'var(--terracotta)' }}
                    onMouseDown={e => e.stopPropagation()}
                  >
                    <Trash2 size={10} color="white" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Guest Assignment */}
        <div className="flex flex-col gap-4">
          {/* Unassigned */}
          <div className="p-4 rounded-sm" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} style={{ color: 'var(--muted)' }} />
              <p className="font-body text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                Nicht zugewiesen ({unassignedGuests.length})
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {unassignedGuests.map(guest => (
                <div key={guest.id}>
                  <p className="font-body text-xs mb-1" style={{ color: 'var(--dark-brown)' }}>{guest.name}</p>
                  <select
                    onChange={e => assignGuestToTable(guest.id, e.target.value || null)}
                    className="w-full font-body text-xs border px-2 py-1 bg-transparent outline-none cursor-pointer"
                    style={{ borderColor: 'rgba(184,148,74,0.3)', color: 'var(--muted)', borderRadius: '2px' }}
                  >
                    <option value="">Tisch wählen...</option>
                    {tables.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Tables Summary */}
          {tables.map(table => {
            const tableGuests = guests.filter(g => g.table_number === parseInt(table.id))
            return (
              <div key={table.id} className="p-4 rounded-sm" style={{ background: 'var(--cream)', border: '1px solid rgba(184,148,74,0.2)' }}>
                <p className="font-heading text-base font-semibold mb-2" style={{ color: 'var(--dark-brown)' }}>
                  {table.name}
                </p>
                {tableGuests.length === 0 ? (
                  <p className="font-body text-xs" style={{ color: 'var(--muted)' }}>Keine Gäste</p>
                ) : (
                  tableGuests.map(g => (
                    <div key={g.id} className="flex items-center justify-between">
                      <p className="font-body text-xs" style={{ color: 'var(--dark-brown)' }}>{g.name}</p>
                      <button
                        onClick={() => assignGuestToTable(g.id, null)}
                        className="font-body text-xs hover:opacity-70"
                        style={{ color: 'var(--muted)' }}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
