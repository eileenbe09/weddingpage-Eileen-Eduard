'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Users, GripVertical } from 'lucide-react'

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
  table_id: string | null
  rsvp_status: string
  adults: number
  children: number
}

export default function SitzplanPage() {
  const [tables, setTables]   = useState<Table[]>([])
  const [guests, setGuests]   = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newTable, setNewTable] = useState<{ name: string; seats: number; shape: 'round' | 'rect' }>({ name: '', seats: 8, shape: 'round' })
  const [dragGuest, setDragGuest] = useState<string | null>(null)
  const [dragTable, setDragTable] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  async function loadData() {
    const [{ data: td }, { data: gd }] = await Promise.all([
      supabase.from('tables').select('*').order('created_at'),
      supabase.from('guests').select('id, name, table_id, rsvp_status, adults, children').eq('rsvp_status', 'confirmed'),
    ])
    if (td) setTables(td as Table[])
    if (gd) setGuests(gd as Guest[])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function addTable() {
    if (!newTable.name) return
    const rect = canvasRef.current?.getBoundingClientRect()
    const cx = rect ? rect.width / 2 : 250
    const cy = rect ? rect.height / 2 : 200
    await supabase.from('tables').insert({
      name: newTable.name, seats: newTable.seats, shape: newTable.shape,
      x_pos: cx + (Math.random() - 0.5) * 200,
      y_pos: cy + (Math.random() - 0.5) * 150,
    })
    setNewTable({ name: '', seats: 8, shape: 'round' })
    setShowForm(false)
    loadData()
  }

  async function deleteTable(id: string) {
    if (!confirm('Tisch löschen? Gäste werden nicht mehr zugewiesen.')) return
    await supabase.from('tables').delete().eq('id', id)
    await supabase.from('guests').update({ table_id: null }).eq('table_id', id)
    loadData()
  }

  async function assignGuest(guestId: string, tableId: string | null) {
    await supabase.from('guests').update({ table_id: tableId }).eq('id', guestId)
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, table_id: tableId } : g))
  }

  // Table drag on canvas
  function onTableMouseDown(e: React.MouseEvent, tableId: string, x: number, y: number) {
    e.preventDefault()
    setDragTable(tableId)
    setDragOffset({ x: e.clientX - x, y: e.clientY - y })
  }

  function onCanvasMouseMove(e: React.MouseEvent) {
    if (!dragTable) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const newX = e.clientX - rect.left - dragOffset.x + (tables.find(t => t.id === dragTable)?.x_pos ?? 0)
    // Actually recalculate properly:
    const x = e.clientX - dragOffset.x
    const y = e.clientY - dragOffset.y
    setTables(prev => prev.map(t => t.id === dragTable ? { ...t, x_pos: x, y_pos: y } : t))
  }

  async function onCanvasMouseUp() {
    if (!dragTable) return
    const t = tables.find(t => t.id === dragTable)
    if (t) await supabase.from('tables').update({ x_pos: t.x_pos, y_pos: t.y_pos }).eq('id', dragTable)
    setDragTable(null)
  }

  // Guest HTML5 drag & drop onto tables
  function onGuestDragStart(e: React.DragEvent, guestId: string) {
    setDragGuest(guestId)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('guestId', guestId)
  }

  function onTableDrop(e: React.DragEvent, tableId: string) {
    e.preventDefault()
    const gId = e.dataTransfer.getData('guestId') || dragGuest
    if (gId) { assignGuest(gId, tableId); setDragGuest(null) }
  }

  function onTableDragOver(e: React.DragEvent) { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }

  const unassigned = guests.filter(g => !g.table_id)
  const tableGuests = (tableId: string) => guests.filter(g => g.table_id === tableId)
  const occupancy   = (tableId: string) => tableGuests(tableId).reduce((s, g) => s + g.adults + g.children, 0)

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="t-display" style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--dark)' }}>Sitzplan</h1>
          <p className="t-ui" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
            {tables.length} Tische · {guests.length} Gäste zugesagt · {unassigned.length} nicht platziert
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-dark"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.4rem' }}
        >
          <Plus size={14} /> Tisch
        </button>
      </div>

      {/* Add Table Form */}
      {showForm && (
        <div style={{ background: 'var(--off)', border: '1px solid var(--light)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Name *</label>
              <input placeholder="z. B. Tisch 1" value={newTable.name} onChange={e => setNewTable({ ...newTable, name: e.target.value })} className="field" />
            </div>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Plätze</label>
              <input type="number" min={2} max={30} value={newTable.seats} onChange={e => setNewTable({ ...newTable, seats: +e.target.value })} className="field" />
            </div>
            <div>
              <label className="eyebrow" style={{ fontSize: '0.5rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Form</label>
              <select value={newTable.shape} onChange={e => setNewTable({ ...newTable, shape: e.target.value as 'round' | 'rect' })}
                style={{ width: '100%', fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', border: 'none', borderBottom: '1px solid var(--light)', padding: '0.7rem 0', background: 'transparent', outline: 'none', color: 'var(--dark)', cursor: 'pointer' }}>
                <option value="round">Rund</option>
                <option value="rect">Rechteckig</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={addTable} className="btn btn-dark" style={{ padding: '0.55rem 1.4rem' }}>Hinzufügen</button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline" style={{ padding: '0.55rem 1.4rem' }}>Abbrechen</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>

        {/* Canvas / Floor Plan */}
        <div
          ref={canvasRef}
          style={{
            position: 'relative', minHeight: '520px', background: '#F5F0E8',
            border: '1px solid var(--light)', overflow: 'hidden', cursor: dragTable ? 'grabbing' : 'default', userSelect: 'none',
          }}
          onMouseMove={onCanvasMouseMove}
          onMouseUp={onCanvasMouseUp}
          onMouseLeave={onCanvasMouseUp}
        >
          {/* Grid pattern */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,169,110,0.12)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Dancefloor */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            width: '150px', height: '70px', border: '1px dashed rgba(200,169,110,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="eyebrow" style={{ color: 'rgba(200,169,110,0.6)', fontSize: '0.45rem' }}>Tanzfläche</span>
          </div>

          {/* Tables */}
          {tables.map(table => {
            const occ = occupancy(table.id)
            const tg  = tableGuests(table.id)
            const over = occ > table.seats
            const isRound = table.shape === 'round'
            const w = isRound ? 90 : 110
            const h = isRound ? 90 : 65
            return (
              <div
                key={table.id}
                onMouseDown={e => onTableMouseDown(e, table.id, table.x_pos, table.y_pos)}
                onDrop={e => onTableDrop(e, table.id)}
                onDragOver={onTableDragOver}
                style={{
                  position: 'absolute',
                  left: table.x_pos, top: table.y_pos,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'grab',
                  zIndex: dragTable === table.id ? 10 : 1,
                }}
                className="group"
              >
                <div style={{
                  width: w, height: h,
                  borderRadius: isRound ? '50%' : '4px',
                  background: 'var(--white)',
                  border: `2px solid ${over ? 'var(--rose)' : 'var(--gold)'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.15s',
                  position: 'relative',
                }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.75rem', fontWeight: 500, color: 'var(--dark)', textAlign: 'center', lineHeight: 1.2, padding: '0 0.4rem' }}>
                    {table.name}
                  </p>
                  <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', color: over ? 'var(--rose)' : 'var(--muted)', marginTop: '2px' }}>
                    {occ}/{table.seats}
                  </p>
                  {tg.length > 0 && (
                    <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.52rem', color: 'var(--muted)', marginTop: '1px', textAlign: 'center', padding: '0 4px', lineHeight: 1.2 }}>
                      {tg.slice(0, 2).map(g => g.name.split(' ')[0]).join(', ')}{tg.length > 2 ? ` +${tg.length - 2}` : ''}
                    </p>
                  )}
                  <button
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => deleteTable(table.id)}
                    style={{
                      position: 'absolute', top: '-8px', right: '-8px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'var(--rose)', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, transition: 'opacity 0.15s',
                    }}
                    className="group-hover:opacity-100"
                  >
                    <Trash2 size={10} color="white" />
                  </button>
                </div>
              </div>
            )
          })}

          {tables.length === 0 && !loading && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p className="eyebrow" style={{ color: 'rgba(200,169,110,0.4)', fontSize: '0.52rem' }}>
                Tisch hinzufügen, dann hier positionieren
              </p>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Unassigned Guests */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--light)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Users size={13} style={{ color: 'var(--muted)' }} />
              <p className="eyebrow" style={{ fontSize: '0.5rem' }}>Nicht platziert ({unassigned.length})</p>
            </div>
            {unassigned.length === 0 ? (
              <p className="t-ui" style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Alle platziert ✓</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                {unassigned.map(g => (
                  <div
                    key={g.id}
                    draggable
                    onDragStart={e => onGuestDragStart(e, g.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.5rem 0.75rem', background: 'var(--off)',
                      cursor: 'grab', border: '1px solid var(--light)',
                    }}
                  >
                    <GripVertical size={12} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="t-ui" style={{ fontSize: '0.8rem', color: 'var(--dark)', fontWeight: 400 }}>{g.name}</p>
                      <p className="t-ui" style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{g.adults} Erw. {g.children > 0 ? `· ${g.children} K.` : ''}</p>
                    </div>
                    {tables.length > 0 && (
                      <select
                        onChange={e => e.target.value && assignGuest(g.id, e.target.value)}
                        style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', border: '1px solid var(--light)', padding: '0.2rem 0.3rem', background: 'var(--white)', color: 'var(--muted)', cursor: 'pointer', outline: 'none', maxWidth: '90px' }}
                      >
                        <option value="">Tisch…</option>
                        {tables.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Table Summaries */}
          {tables.map(table => {
            const tg = tableGuests(table.id)
            const occ = occupancy(table.id)
            const over = occ > table.seats
            return (
              <div key={table.id} style={{ background: 'var(--white)', border: `1px solid ${over ? 'var(--rose)' : 'var(--light)'}`, padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <p className="t-display" style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--dark)' }}>{table.name}</p>
                  <span className="eyebrow" style={{ fontSize: '0.48rem', color: over ? 'var(--rose)' : 'var(--muted)' }}>{occ}/{table.seats}</span>
                </div>
                {tg.length === 0 ? (
                  <p className="t-ui" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Noch leer</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {tg.map(g => (
                      <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className="t-ui" style={{ fontSize: '0.78rem', color: 'var(--dark)' }}>{g.name}</p>
                        <button onClick={() => assignGuest(g.id, null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1rem', lineHeight: 1, padding: '0 0.2rem' }}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <p className="t-ui" style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '1rem', textAlign: 'center' }}>
        Tische auf der Grundriss-Karte verschieben · Gäste per Dropdown oder Drag &amp; Drop zuweisen
      </p>
    </div>
  )
}
