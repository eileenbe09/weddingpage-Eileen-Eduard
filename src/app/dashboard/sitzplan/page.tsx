'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Search, Trash2, X } from 'lucide-react'

type Table = { id:string; name:string; seats:number; x_pos:number; y_pos:number; shape:'round'|'rect' }
type Guest = { id:string; name:string; table_id:string|null; rsvp_status:string; adults:number; children:number }

const PALETTE = [
  '#5A8A6A','#C8A96E','#C4856A','#7B9E87','#9B7B6E',
  '#6B8E9B','#A07840','#8A7B6A','#6A8A7B','#7B6A8A','#8A6A7B',
]

const TABLE_R = 42   // table circle radius px
const SEAT_R  = 14   // seat circle radius px
const ORBIT   = TABLE_R + SEAT_R + 8   // center → seat center
const WRAP    = (ORBIT + SEAT_R + 12) * 2  // wrapper div (includes seats)

function initials(name: string) {
  const p = name.trim().split(/\s+/)
  return p.length >= 2 ? (p[0][0] + p[p.length-1][0]).toUpperCase() : name.slice(0,2).toUpperCase()
}

function seatPos(total: number, i: number) {
  const a = (i / total) * 2 * Math.PI - Math.PI / 2
  return { x: Math.cos(a) * ORBIT, y: Math.sin(a) * ORBIT }
}

export default function SitzplanPage() {
  const [tables, setTables]       = useState<Table[]>([])
  const [guests, setGuests]       = useState<Guest[]>([])
  const [loading, setLoading]     = useState(true)
  const [showForm, setShowForm]   = useState(false)
  const [nt, setNt] = useState<{name:string;seats:number;shape:'round'|'rect'}>({name:'',seats:8,shape:'round'})
  const [search, setSearch]       = useState('')
  const [dragGId, setDragGId]     = useState<string|null>(null)
  const [dragTId, setDragTId]     = useState<string|null>(null)
  const [dOff, setDOff]           = useState({x:0,y:0})
  const [hoverT, setHoverT]       = useState<string|null>(null)
  const [dropTarget, setDropTarget] = useState<string|null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  async function load() {
    const [{data:td},{data:gd}] = await Promise.all([
      supabase.from('tables').select('*').order('created_at'),
      supabase.from('guests').select('id,name,table_id,rsvp_status,adults,children').eq('rsvp_status','confirmed'),
    ])
    if (td) setTables(td as Table[])
    if (gd) setGuests(gd as Guest[])
    setLoading(false)
  }
  useEffect(()=>{ load() },[])

  async function addTable() {
    if (!nt.name) return
    const rect = canvasRef.current?.getBoundingClientRect()
    await supabase.from('tables').insert({
      name: nt.name, seats: nt.seats, shape: nt.shape,
      x_pos: (rect?.width  ?? 600) / 2 + (Math.random()-0.5) * 250,
      y_pos: (rect?.height ?? 420) / 2 + (Math.random()-0.5) * 130,
    })
    setNt({name:'',seats:8,shape:'round'})
    setShowForm(false)
    load()
  }

  async function deleteTable(id: string) {
    await supabase.from('tables').delete().eq('id', id)
    await supabase.from('guests').update({table_id: null}).eq('table_id', id)
    load()
  }

  async function assign(guestId: string, tableId: string|null) {
    await supabase.from('guests').update({table_id: tableId}).eq('id', guestId)
    setGuests(p => p.map(g => g.id===guestId ? {...g, table_id: tableId} : g))
  }

  // ── Table drag on canvas ──────────────────────────────
  function tableMouseDown(e: React.MouseEvent, tId: string) {
    e.preventDefault(); e.stopPropagation()
    const t = tables.find(t=>t.id===tId)!
    const rect = canvasRef.current!.getBoundingClientRect()
    setDragTId(tId)
    setDOff({ x: e.clientX - rect.left - t.x_pos, y: e.clientY - rect.top - t.y_pos })
  }
  function canvasMove(e: React.MouseEvent) {
    if (!dragTId) return
    const rect = canvasRef.current!.getBoundingClientRect()
    setTables(p => p.map(t => t.id===dragTId
      ? {...t, x_pos: e.clientX-rect.left-dOff.x, y_pos: e.clientY-rect.top-dOff.y}
      : t))
  }
  async function canvasUp() {
    if (!dragTId) return
    const t = tables.find(t=>t.id===dragTId)
    if (t) await supabase.from('tables').update({x_pos:t.x_pos,y_pos:t.y_pos}).eq('id',dragTId)
    setDragTId(null)
  }

  // ── Guest HTML5 drag & drop ───────────────────────────
  function guestDragStart(e: React.DragEvent, gId: string) {
    setDragGId(gId)
    e.dataTransfer.setData('text/plain', gId)
    e.dataTransfer.effectAllowed = 'move'
  }
  function tableDrop(e: React.DragEvent, tableId: string) {
    e.preventDefault(); e.stopPropagation()
    const gId = e.dataTransfer.getData('text/plain') || dragGId
    if (gId) assign(gId, tableId)
    setDragGId(null); setDropTarget(null)
  }
  function canvasDrop(e: React.DragEvent) {
    // Drop on empty canvas → remove from table
    const gId = e.dataTransfer.getData('text/plain') || dragGId
    if (gId) assign(gId, null)
    setDragGId(null); setDropTarget(null)
  }

  const colorMap = new Map(guests.map((g,i) => [g.id, PALETTE[i % PALETTE.length]]))
  const tableGuests = (tId: string) => guests.filter(g => g.table_id===tId)
  const pool = guests.filter(g => !g.table_id && g.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{display:'flex',flexDirection:'column',height:'calc(100vh - 130px)',minHeight:'520px',maxWidth:'1200px',margin:'0 auto'}}>

      {/* ── Header ── */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.875rem',flexShrink:0,flexWrap:'wrap',gap:'0.5rem'}}>
        <div>
          <h1 className="t-display" style={{fontSize:'2rem',fontStyle:'italic',fontWeight:400,color:'var(--dark)'}}>Sitzplan</h1>
          <p className="t-ui" style={{fontSize:'0.78rem',color:'var(--muted)',marginTop:'0.2rem'}}>
            {tables.length} Tische · {guests.length} Gäste zugesagt · {guests.filter(g=>!g.table_id).length} nicht platziert
          </p>
        </div>
        <button onClick={()=>setShowForm(v=>!v)} className="btn btn-dark"
          style={{display:'flex',alignItems:'center',gap:'0.4rem',padding:'0.5rem 1.25rem'}}>
          <Plus size={13}/> Tisch hinzufügen
        </button>
      </div>

      {/* ── Add Table Form ── */}
      {showForm && (
        <div style={{background:'var(--off)',border:'1px solid var(--light)',padding:'0.875rem 1.25rem',marginBottom:'0.875rem',flexShrink:0}}>
          <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',alignItems:'flex-end'}}>
            <div style={{flex:'2 1 140px'}}>
              <label className="eyebrow" style={{fontSize:'0.48rem',color:'var(--muted)',display:'block',marginBottom:'0.3rem'}}>Name *</label>
              <input placeholder="Tisch 1" value={nt.name} onChange={e=>setNt({...nt,name:e.target.value})}
                onKeyDown={e=>e.key==='Enter'&&addTable()} className="field"/>
            </div>
            <div style={{flex:'1 1 70px'}}>
              <label className="eyebrow" style={{fontSize:'0.48rem',color:'var(--muted)',display:'block',marginBottom:'0.3rem'}}>Plätze</label>
              <input type="number" min={2} max={20} value={nt.seats} onChange={e=>setNt({...nt,seats:+e.target.value})} className="field"/>
            </div>
            <div style={{flex:'1 1 100px'}}>
              <label className="eyebrow" style={{fontSize:'0.48rem',color:'var(--muted)',display:'block',marginBottom:'0.3rem'}}>Form</label>
              <select value={nt.shape} onChange={e=>setNt({...nt,shape:e.target.value as 'round'|'rect'})}
                style={{width:'100%',fontFamily:'Raleway,sans-serif',fontSize:'0.85rem',border:'none',borderBottom:'1px solid var(--light)',padding:'0.7rem 0',background:'transparent',outline:'none',color:'var(--dark)',cursor:'pointer'}}>
                <option value="round">Rund</option>
                <option value="rect">Rechteckig</option>
              </select>
            </div>
            <div style={{display:'flex',gap:'0.4rem'}}>
              <button onClick={addTable} className="btn btn-dark" style={{padding:'0.45rem 1rem'}}>Hinzufügen</button>
              <button onClick={()=>setShowForm(false)} className="btn btn-outline" style={{padding:'0.45rem 0.75rem'}}><X size={13}/></button>
            </div>
          </div>
        </div>
      )}

      {/* ── Canvas ── */}
      <div
        ref={canvasRef}
        style={{
          flex:1, position:'relative', overflow:'hidden',
          background:'#BFA870',
          cursor: dragTId ? 'grabbing' : 'default',
          userSelect:'none',
        }}
        onMouseMove={canvasMove}
        onMouseUp={canvasUp}
        onMouseLeave={canvasUp}
        onDragOver={e=>e.preventDefault()}
        onDrop={canvasDrop}
      >
        {/* Wood grain SVG */}
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:0.12}} preserveAspectRatio="none">
          <defs>
            <pattern id="woodgrain" width="10" height="100%" patternUnits="userSpaceOnUse">
              <line x1="5" y1="0" x2="5" y2="100%" stroke="#5A3808" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#woodgrain)"/>
        </svg>

        {tables.length===0 && !loading && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
            <p style={{fontFamily:'Raleway,sans-serif',fontSize:'0.72rem',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(80,50,10,0.35)'}}>
              Tisch hinzufügen
            </p>
          </div>
        )}

        {tables.map(table => {
          const assigned = tableGuests(table.id)
          const isDropTarget = dropTarget === table.id
          const isRound = table.shape === 'round'

          return (
            <div
              key={table.id}
              style={{
                position:'absolute',
                left: table.x_pos, top: table.y_pos,
                width: WRAP, height: WRAP,
                transform:'translate(-50%,-50%)',
                zIndex: dragTId===table.id ? 20 : 2,
              }}
              onMouseEnter={()=>setHoverT(table.id)}
              onMouseLeave={()=>setHoverT(null)}
              onDragEnter={()=>setDropTarget(table.id)}
              onDragLeave={e=>{ if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropTarget(null) }}
              onDragOver={e=>{ e.preventDefault(); e.stopPropagation() }}
              onDrop={e=>tableDrop(e, table.id)}
            >
              {/* ── Seat circles ── */}
              {Array.from({length: table.seats}, (_,i) => {
                const pos   = seatPos(table.seats, i)
                const guest = assigned[i] ?? null
                const color = guest ? (colorMap.get(guest.id) ?? '#9A8A7A') : 'rgba(255,255,255,0.2)'
                return (
                  <div
                    key={i}
                    draggable={!!guest}
                    onDragStart={guest ? e=>{ e.stopPropagation(); guestDragStart(e, guest.id) } : undefined}
                    title={guest?.name ?? ''}
                    style={{
                      position:'absolute',
                      left: WRAP/2 + pos.x - SEAT_R,
                      top:  WRAP/2 + pos.y - SEAT_R,
                      width: SEAT_R*2, height: SEAT_R*2,
                      borderRadius:'50%',
                      background: color,
                      border:`2px solid ${guest ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      cursor: guest ? 'grab' : 'default',
                      boxShadow: guest ? '0 2px 6px rgba(0,0,0,0.25)' : 'none',
                      zIndex:3,
                      transition:'transform 0.1s',
                    }}
                  >
                    {guest && (
                      <span style={{fontFamily:'Raleway,sans-serif',fontSize:'0.5rem',fontWeight:700,color:'white',letterSpacing:'0.02em'}}>
                        {initials(guest.name)}
                      </span>
                    )}
                  </div>
                )
              })}

              {/* ── Table center ── */}
              <div
                onMouseDown={e=>tableMouseDown(e, table.id)}
                style={{
                  position:'absolute',
                  left: WRAP/2 - TABLE_R, top: WRAP/2 - TABLE_R,
                  width: TABLE_R*2, height: TABLE_R*2,
                  borderRadius: isRound ? '50%' : '6px',
                  background: isDropTarget ? 'rgba(255,248,232,1)' : 'rgba(245,235,205,0.97)',
                  border: `2px solid ${isDropTarget ? 'var(--gold)' : 'rgba(175,135,60,0.6)'}`,
                  boxShadow: isDropTarget
                    ? '0 4px 20px rgba(0,0,0,0.2), 0 0 0 4px rgba(200,169,110,0.35)'
                    : '0 3px 14px rgba(0,0,0,0.2)',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  cursor:'grab', zIndex:4, transition:'box-shadow 0.15s, background 0.15s',
                }}
              >
                <p style={{fontFamily:'Playfair Display,serif',fontSize:'0.72rem',fontStyle:'italic',color:'#4A3820',textAlign:'center',padding:'0 6px',lineHeight:1.2,fontWeight:500}}>
                  {table.name}
                </p>
                <p style={{fontFamily:'Raleway,sans-serif',fontSize:'0.56rem',color:'rgba(90,65,30,0.55)',marginTop:'2px'}}>
                  {assigned.length}/{table.seats}
                </p>
              </div>

              {/* ── Delete button on hover ── */}
              {hoverT===table.id && !dragTId && (
                <button
                  onMouseDown={e=>e.stopPropagation()}
                  onClick={()=>deleteTable(table.id)}
                  style={{
                    position:'absolute',
                    left: WRAP/2 + TABLE_R * Math.cos(-Math.PI/4) - 10,
                    top:  WRAP/2 - TABLE_R * Math.sin(-Math.PI/4) - 10,
                    width:20, height:20, borderRadius:'50%',
                    background:'var(--rose)', border:'2px solid white',
                    cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                    zIndex:10, boxShadow:'0 1px 5px rgba(0,0,0,0.3)',
                  }}
                >
                  <Trash2 size={9} color="white"/>
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Guest Pool ── */}
      <div style={{flexShrink:0, background:'var(--dark)', borderTop:'1px solid rgba(200,169,110,0.12)', padding:'0.75rem 1rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.875rem',marginBottom:'0.5rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.4rem',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'0.28rem 0.65rem'}}>
            <Search size={11} style={{color:'rgba(253,250,245,0.3)'}}/>
            <input
              placeholder="Gast suchen…" value={search} onChange={e=>setSearch(e.target.value)}
              style={{background:'transparent',border:'none',outline:'none',fontFamily:'Raleway,sans-serif',fontSize:'0.75rem',color:'rgba(253,250,245,0.65)',width:'130px'}}
            />
          </div>
          <p style={{fontFamily:'Raleway,sans-serif',fontSize:'0.6rem',letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(253,250,245,0.2)'}}>
            auf Tisch ziehen zum Platzieren
          </p>
        </div>

        <div style={{display:'flex',gap:'0.4rem',overflowX:'auto',paddingBottom:'2px',alignItems:'center'}}>
          {pool.length===0 ? (
            <p style={{fontFamily:'Raleway,sans-serif',fontSize:'0.75rem',color:'rgba(253,250,245,0.25)',padding:'0.2rem 0'}}>
              {guests.filter(g=>!g.table_id).length===0
                ? 'Alle Gäste sind platziert ✓'
                : search ? 'Kein Treffer' : 'Keine Gäste ohne Zuweisung'}
            </p>
          ) : pool.map(g => (
            <div
              key={g.id}
              draggable
              onDragStart={e=>guestDragStart(e,g.id)}
              title={g.name}
              style={{
                flexShrink:0, display:'flex', alignItems:'center', gap:'0.35rem',
                padding:'0.28rem 0.6rem 0.28rem 0.35rem',
                background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.09)',
                cursor:'grab',
              }}
            >
              <div style={{width:22,height:22,borderRadius:'50%',background:colorMap.get(g.id)??'#9A8A7A',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 1px 4px rgba(0,0,0,0.3)'}}>
                <span style={{fontFamily:'Raleway,sans-serif',fontSize:'0.48rem',fontWeight:700,color:'white'}}>{initials(g.name)}</span>
              </div>
              <span style={{fontFamily:'Raleway,sans-serif',fontSize:'0.7rem',color:'rgba(253,250,245,0.65)',whiteSpace:'nowrap'}}>
                {g.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
